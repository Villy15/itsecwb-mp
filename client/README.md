# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# ITSECWB Site

## Tech Stack

- [React + Vite](https://vitejs.dev) – Frontend Framework
- [Express](https://expressjs.com) – Backend Framework
- [Tailwind](https://tailwindcss.com/) – CSS Framework
- [ShadCN UI](https://ui.shadcn.com/) – UI Components
- [MySQL](https://www.mysql.com) – Database

## Tools

- Prettier - Formater
- ESlint - Linter
- react-icons - Icons
- Zod - Validation
- Recharts - Charts

## Folder Structure

```
.
├─ public
│  └─ favicon.ico
├─ src                          ## nextjs frontend
│  ├─ app
│  │  ├─ login
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ ui
│  │  │  ├─ button.tsx
│  │  │  └─ input.tsx
│  │  └─ RootHeader.tsx
│  ├─ lib
│  │  └─ utils.ts
│  └─ styles
│     └─ globals.css
├─ .env
├─ .env.example
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc
├─ next-env.d.ts
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json

```

pnpm dlx shadcn-ui@latest add

docker build -t my-app .
docker run -p 3000:3000 my-app

# Local dev

## Install pnpm

`npm install -g pnpm`

## Install dependencies

`pnpm install`

## Run local

`pnpm run dev`
