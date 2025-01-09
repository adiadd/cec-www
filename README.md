# cec-www

The official landing page for **crackedengineers.club**. Built for the cracked, the curious, and the building-loving engineers of the world.

## tech stack

- **framework**: next.js
- **styling**: tailwindcss
- **components**: shadcn/ui
- **form handling**: react-hook-form + zod
- **deployment**: vercel

## getting started

1. clone the repo:

   ```bash
   git clone git@github.com:adiadd/cec-www.git
   ```

2. install dependencies:

   ```bash
   cd cec-www
   bun install
   ```

3. run the dev server:

   ```bash
   bun run dev
   ```

4. open your browser and go to `http://localhost:3000`.

## contributing

1. fork the repo
2. create a new branch following conventional commits:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```
3. make your changes
4. commit using conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug in component"
   ```
5. push your changes:
   ```bash
   git push origin feat/your-feature-name
   ```
6. open a pull request

## deployment

the site is automatically deployed to vercel on every push to `main`.

## license

mit license. do whatever you want, just give credit.

made with 🛠️ by the cracked engineers club
