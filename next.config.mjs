/** @type {import('next').NextConfig} */
// Static export: `next build` writes the site to out/, which is served from S3 + CloudFront.
// The only server code is the survey endpoint, which runs as a Lambda (see lambda/handler.ts).
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
