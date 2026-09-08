import type { NextConfig } from "next";

// GitHub Pages serves this project from https://<user>.github.io/kalkulatory/
// so all routes and assets need that repo-name prefix in production.
const repoName = "kalkulatory";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
};

export default nextConfig;
