module.exports = {
   "env": {
      "browser": true,
      "es2021": true
   },
   "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended"
   ],
   "overrides": [
      {
         "env": {
            "node": true
         },
         "files": [
            ".eslintrc.{js,cjs}"
         ],
         "parserOptions": {
            "sourceType": "script"
         }
      }
   ],
   "parser": "@typescript-eslint/parser",
   "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
   },
   "plugins": [
      "@typescript-eslint",
      "react",
      "simple-import-sort"
   ],
   "rules": {
      "indent": ["error", 3], // Використовувати 3 пробіли для відступів
      "linebreak-style": ["error", "unix"], // Символи нового рядка UNIX
      "quotes": ["error", "double"], // Подвійні лапки для рядків
      "semi": ["error", "always"], // Крапка з комою в кінці речення
      "no-console": "off", // Дозволити використання console.log
      "simple-import-sort/imports": "error", // Сортування import
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }], // Між блоками максимум 2 рядки порожніх
   }
};
