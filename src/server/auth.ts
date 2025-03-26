import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const {
    VITE_ACCOUNT_ID,
    VITE_R2_ACCESS_KEY_ID,
    VITE_R2_SECRET_ACCESS_KEY,
    VITE_R2_BUCKET_NAME
} = process.env;

if (!VITE_ACCOUNT_ID || !VITE_R2_ACCESS_KEY_ID || !VITE_R2_SECRET_ACCESS_KEY || !VITE_R2_BUCKET_NAME) {
    throw new Error("Missing Cloudflare R2 environment variables.");
}

router.post("/auth", (_req: express.Request, res: express.Response) => {
    res.json({
        cloudflareAccountId: VITE_ACCOUNT_ID,
        cloudflareR2AccessKeyId: VITE_R2_ACCESS_KEY_ID,
        cloudflareR2SecretAccessKey: VITE_R2_SECRET_ACCESS_KEY,
        cloudflareR2BucketName: VITE_R2_BUCKET_NAME,
    });
});

export default router;
