# 🌩️ Tiny R2 Client - Cloudflare R2 File Uploader

A **secure, fast, and modular** web application to upload files to **Cloudflare R2 Storage** using **React, Vite, and Node.js**. This project follows **best practices** for authentication and upload efficiency, featuring **conditional uploads using MD5 hashing**. 🚀

## 🛠️ Tech Stack

- **Frontend:** React + Vite ⚛️
- **Backend:** Node.js + Express 🖥️
- **Storage:** Cloudflare R2 ☁️
- **Authentication:** Secure API endpoint 🔐
- **UI Framework:** Tailwind CSS 🎨
- **Animations:** Framer Motion ✨
- **Bundler:** pnpm 📦

## 📂 Project Structure

```text
├── src/
│   ├── api/            # Handles file uploads using AWS SDK
│   ├── pages/          # Login & file upload pages
│   ├── server/         # Express API for authentication
│   ├── context/        # Auth state management
│   ├── styles/         # TailwindCSS configurations
│   ├── components/     # Reusable UI components
│   ├── App.tsx         # Root application
│   ├── main.tsx        # Entry point
│
├── .env               # Stores Cloudflare R2 credentials
├── package.json       # Dependencies & scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configurations
└── README.md          # You are here! 📖
```

## 🔑 Authentication & Environment Variables

Ensure you have a `.env` file with the following values:

```env
CLOUDFLARE_ACCOUNT_ID=<your-account-id>
CLOUDFLARE_R2_ACCESS_KEY_ID=<your-access-key>
CLOUDFLARE_R2_SECRET_ACCESS_KEY=<your-secret-key>
CLOUDFLARE_R2_BUCKET_NAME=<your-bucket-name>
```

## 📥 How to Run

### 1️⃣ Install Dependencies
```sh
pnpm i
```

### 2️⃣ Start the Development Server
```sh
pnpm run dev
```

### 3️⃣ Build for Production
```sh
pnpm run build
```

## 📤 Uploading Files

1. **Login** using your Cloudflare R2 API key.
2. Select a **file** from your system.
3. Click **Upload** – The app will check for duplicates using **MD5 hashing** before uploading.

## 👤 Author

👨‍💻 **Vedansh**  
🚀 Passionate developer crafting efficient cloud solutions!

Feel free to contribute & enhance this project! 🌍✨

## About the Template

React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
