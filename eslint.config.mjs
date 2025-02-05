import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended", // Tambahkan aturan dasar ESLint
    "plugin:@typescript-eslint/recommended", // Tambahkan aturan khusus TypeScript
    "plugin:prettier/recommended" // Integrasi Prettier dengan ESLint
  ),
  {
    rules: {
      // Aturan kustom untuk meningkatkan best practice
      "no-console": "warn", // Peringatan jika ada console.log
      "react/no-unescaped-entities": "off", // Izinkan penggunaan karakter seperti ' & "
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Hindari error pada variabel yang tidak terpakai

      // Aturan tambahan untuk meningkatkan kode
      "prettier/prettier": ["error", { "singleQuote": true, "semi": false }], // Gunakan single quote, tanpa titik koma
      "react-hooks/rules-of-hooks": "error", // Pastikan hooks digunakan dengan benar
      "react-hooks/exhaustive-deps": "warn", // Peringatan jika ada dependensi useEffect yang kurang lengkap

      "quotes": ["error", "single"], // Pakai tanda ' (single quote)
      "jsx-quotes": ["error", "prefer-single"] // Pakai ' dalam TSX
    }
  }
];

export default eslintConfig;
