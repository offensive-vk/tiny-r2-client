import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const {
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_R2_ACCESS_KEY_ID,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    CLOUDFLARE_R2_BUCKET_NAME
} = process.env;

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_R2_ACCESS_KEY_ID || !CLOUDFLARE_R2_SECRET_ACCESS_KEY || !CLOUDFLARE_R2_BUCKET_NAME) {
    throw new Error("Missing Cloudflare R2 environment variables.");
}

router.get("/auth", (_req: express.Request, res: express.Response) => {
    res.json({
        cloudflareAccountId: CLOUDFLARE_ACCOUNT_ID,
        cloudflareR2AccessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
        cloudflareR2SecretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
        cloudflareR2BucketName: CLOUDFLARE_R2_BUCKET_NAME,
    });
});

export default router;
