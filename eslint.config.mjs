import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {

    files: ["/.ts", "/.tsx"],
    rules: {
   
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",

      "@typescript-eslint/ban-ts-comment": "off", 
    },
  },
  {
    // 3. إزالة تحليل TypeScript (الخيار الأقوى)
    languageOptions: {
      parserOptions: {
        project: null, // تعطيل ربط ESLint بـ tsconfig.json
      },
    },
  },
];

export default eslintConfig;