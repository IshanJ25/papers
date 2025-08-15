/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  swcMinify: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, options) => {
    config.resolve.alias.canvas = false;
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    return config;
  },
    async headers() {
        return [
            {
                source: "/api/upcoming-papers",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "s-maxage=60, stale-while-revalidate=120",
                    },
                ],
            },
        ]
  }
};

export default config;
