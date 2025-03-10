import {
    PutObjectCommand,
    S3Client,
    type PutObjectCommandInput,
    type S3ClientConfig
} from "@aws-sdk/client-s3";
import md5 from "md5";

// Types
export interface CloudflareAuth {
    cloudflareAccountId: string;
    cloudflareR2AccessKeyId: string;
    cloudflareR2SecretAccessKey: string;
    cloudflareR2BucketName: string;
}

interface UploadProgress {
    onProgress?: (progress: number) => void;
}

// Constants
const API_URL = "/api/auth";
const DEFAULT_CONTENT_TYPE = "application/octet-stream";

// S3 Client Factory
class S3ClientFactory {
    static createClient(auth: CloudflareAuth): S3Client {
        const config: S3ClientConfig = {
            region: "auto",
            endpoint: `https://${auth.cloudflareAccountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: auth.cloudflareR2AccessKeyId,
                secretAccessKey: auth.cloudflareR2SecretAccessKey,
            },
        };
        return new S3Client(config);
    }
}

// File Upload Handler
class FileUploadHandler {
    private readonly file: File;
    private readonly auth: CloudflareAuth;
    private readonly onProgress?: (progress: number) => void;
    private readonly s3Client: S3Client;

    constructor(file: File, auth: CloudflareAuth, { onProgress }: UploadProgress = {}) {
        this.file = file;
        this.auth = auth;
        this.onProgress = onProgress;
        this.s3Client = S3ClientFactory.createClient(auth);
    }

    private async prepareFileData() {
        const fileBuffer = await this.file.arrayBuffer();
        const fileDigest = md5(Buffer.from(fileBuffer));
        return { fileBuffer, fileDigest };
    }

    private createUploadCommand(fileBuffer: ArrayBuffer, fileDigest: string) {
        const uploadParams: PutObjectCommandInput = {
            Bucket: this.auth.cloudflareR2BucketName,
            Key: this.file.name,
            Body: new Uint8Array(fileBuffer),
            ContentLength: this.file.size,
            ContentType: this.file.type || DEFAULT_CONTENT_TYPE,
        };

        const cmd = new PutObjectCommand(uploadParams);

        // Add ETag middleware
        cmd.middlewareStack.add(
            (next) => async (args) => {
                const typedArgs = args as { request: { headers: Record<string, string> } };
                typedArgs.request.headers["if-none-match"] = `"${fileDigest}"`;
                return await next(args);
            },
            {
                step: "build",
                name: "addETag",
            }
        );

        return cmd;
    }

    async upload() {
        try {
            const { fileBuffer, fileDigest } = await this.prepareFileData();
            const command = this.createUploadCommand(fileBuffer, fileDigest);
            const result = await this.s3Client.send(command);
            this.updateProgress(100);
            return result;
        } catch (error) {
            this.updateProgress(0);
            throw this.handleError(error);
        }
    }

    private updateProgress(progress: number) {
        if (this.onProgress) {
            this.onProgress(progress);
        }
    }

    private handleError(error: unknown): Error {
        if (error instanceof Error) {
            return new Error(`Upload failed: ${error.message}`);
        }
        return new Error('Upload failed with unknown error');
    }
}

// Authentication Service
class AuthenticationService {
    static async getAuth(apiKey: string): Promise<CloudflareAuth> {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`Authentication failed: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    private static handleAuthError(error: unknown): Error {
        if (error instanceof Error) {
            return new Error(`Authentication failed: ${error.message}`);
        }
        return new Error('Authentication failed with unknown error');
    }
}

// Public API
export async function getAuth(apiKey: string): Promise<CloudflareAuth> {
    return AuthenticationService.getAuth(apiKey);
}

export async function uploadFile(
    file: File, 
    auth: CloudflareAuth, 
    onProgress?: (progress: number) => void
) {
    const uploader = new FileUploadHandler(file, auth, { onProgress });
    return uploader.upload();
}
