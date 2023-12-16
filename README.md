## Assumptions

* No tests
* No error handling
* No pagination/virtualisation

If any of those things are required, please contact the author.

## Getting Started

First, set process.env.LOTR_TOKEN for Lord of the Rings api. Use .env.local.example, remove .example extension and include token inside "" on the line 1.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
