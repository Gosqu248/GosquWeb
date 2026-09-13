import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Buduje .next/standalone z minimalnym server.js — obraz nie potrzebuje
  // pelnego node_modules. Dockerfile dokopiowuje public/ i .next/static,
  // bo standalone ich nie zabiera.
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
  },

  poweredByHeader: false,
};

export default nextConfig;
