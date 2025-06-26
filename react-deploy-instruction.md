# Deploying a Vite + React App to GitHub Pages

# 1. Install `gh-pages`
```js
npm install --save-dev gh-pages
```
## 2. Update `vite.config.js`
```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/front-end-inspiration-board/',  // <- Important
  plugins: [react()],
})
```

or use this
```js
    base: 'https://smilesmilejin.github.io/front-end-inspiration-board/',  // <- Important
```

## 3. Update package.json
Make sure to add or update these scripts:
```js
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

And add the homepage field if it’s not already there:
```js
"homepage": "https://smilesmilejin.github.io/front-end-inspiration-board/"
```

## 4. Build the Project
This generates the dist/ folder — your production-ready website.
```js
$ npm run build
```

## 5. Deploy to GitHub Pages
```js
$ npm run deploy
```
This script (defined in your package.json):

"deploy": "gh-pages -d dist"
...does the following:

Builds your React app (if you're using predeploy)
Takes all files from the dist/ folder
Pushes them to a special branch: gh-pages
GitHub uses this branch to serve your website at:

## 6. use gh-pages branch for deploy in Github Pages

## This only works for Chrome, not Safari.

Your React app on GitHub Pages is trying to fetch from http://localhost:5000 (an insecure HTTP URL on the local machine).
Safari blocks this request because:
It enforces stricter mixed content policies (HTTPS page requesting HTTP resource).
It blocks insecure requests to localhost from an HTTPS site.
Chrome might be more lenient or cached older requests, so it seems to “work” there but not Safari.
Other browsers like Firefox can also block these requests.