/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  // Other Next.js configurations...
  sassOptions: {
    includePaths: ["styles"],
  },
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
    ],
  },
};
