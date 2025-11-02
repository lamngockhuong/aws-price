import type { NextConfig } from "next";

// Deployment platform detection
// Options: "github-pages", "github-pages-custom", "cloudflare", "vercel", "other"
// Auto-detect Cloudflare Pages via CF_PAGES env variable
// Default: "github-pages-custom" for backward compatibility
const deploymentPlatform = process.env.CF_PAGES
  ? "cloudflare"
  : process.env.DEPLOYMENT_PLATFORM || "github-pages-custom";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "aws-price";

// Determine basePath based on deployment platform
// - github-pages: Use basePath for GitHub subdomain (username.github.io/repo-name)
// - github-pages-custom: No basePath (custom domain)
// - cloudflare: No basePath (root domain or subdomain)
let basePath = "";
let assetPrefix = "";

if (isProduction) {
  switch (deploymentPlatform) {
    case "github-pages":
      // GitHub Pages with default subdomain (needs basePath)
      basePath = `/${repoName}`;
      assetPrefix = `/${repoName}`;
      break;
    case "github-pages-custom":
      // GitHub Pages with custom domain (no basePath)
      basePath = "";
      assetPrefix = "";
      break;
    case "cloudflare":
      // Cloudflare Pages (no basePath)
      basePath = "";
      assetPrefix = "";
      break;
    default:
      // Default to no basePath
      basePath = "";
      assetPrefix = "";
  }
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
