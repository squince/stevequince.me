# SteveQuince.me

## My blogging homepage

This is an Astro based content site that is the home to my musings about software development and other topics of interest to me..

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run deploy`          | Deploy to S3 and invalidate CloudFront cache     |

## 🚀 Deploy
1. Ensure you have AWS CLI installed and configured with appropriate credentials
2. Set your CloudFront distribution ID as an environment variable:
   ```sh
   echo "CLOUDFRONT_DISTRIBUTION_ID=<your-distribution-id>" > .env
   ```
3. Build and deploy:
   ```sh
   npm run build
   npm run deploy
   ```
4. Confirm deployment at https://stevequince.me where it is served via CloudFront & Route 53

## 👀 About Astro

Feel free to check the [Astro documentation](https://docs.astro.build) or jump into the [Astro Discord server](https://astro.build/chat).
