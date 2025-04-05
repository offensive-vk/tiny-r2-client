import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    accountId: "",
    accessKeyId: "",
    secretAccessKey: "",
    bucketName: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (Object.values(formData).some(value => !value.trim())) {
        throw new Error("All fields are required");
      }

      await login({
        cloudflareAccountId: formData.accountId,
        cloudflareR2AccessKeyId: formData.accessKeyId,
        cloudflareR2SecretAccessKey: formData.secretAccessKey,
        cloudflareR2BucketName: formData.bucketName
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 cursor-pointer p-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <h1 className="text-2xl mb-6 text-black dark:text-white">Cloudflare R2 Client</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4">
        <input
          id="accountId"
          name="accountId"
          type="text"
          value={formData.accountId}
          onChange={handleInputChange}
          className="border border-black dark:border-white p-2 rounded bg-white dark:bg-black text-black dark:text-white"
          placeholder="Cloudflare Account ID"
          required
        />

        <input
          id="accessKeyId"
          name="accessKeyId"
          type="text"
          value={formData.accessKeyId}
          onChange={handleInputChange}
          className="border border-black dark:border-white p-2 rounded bg-white dark:bg-black text-black dark:text-white"
          placeholder="R2 Access Key ID"
          required
        />

        <input
          id="secretAccessKey"
          name="secretAccessKey"
          type="password"
          value={formData.secretAccessKey}
          onChange={handleInputChange}
          className="border border-black dark:border-white p-2 rounded bg-white dark:bg-black text-black dark:text-white"
          placeholder="R2 Secret Access Key"
          required
          autoComplete=""
        />

        <input
          id="bucketName"
          name="bucketName"
          type="text"
          value={formData.bucketName}
          onChange={handleInputChange}
          className="border border-black dark:border-white p-2 rounded bg-white dark:bg-black text-black dark:text-white"
          placeholder="R2 Bucket Name"
          required
        />

        <button 
          type="submit"
          disabled={isLoading}
          className={`mt-4 p-2 rounded transition-all duration-300 ${
            isLoading 
              ? 'bg-white dark:bg-black text-black dark:text-white cursor-not-allowed' 
              : 'bg-black dark:bg-white text-white dark:text-black cursor-pointer hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border border-black dark:border-white'
          }`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
)}