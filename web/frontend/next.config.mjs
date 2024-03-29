/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@celeritaz/ui"],
  images: {
    domains: ["localhost", "res.cloudinary.com", "s.gravatar.com"]
  }
};

export default nextConfig;
