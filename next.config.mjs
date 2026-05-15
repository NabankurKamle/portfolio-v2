/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    experimental: {
        optimizePackageImports: [
            "framer-motion",
            "zustand",
        ],
    },

    // webpack(config, { dev, isServer }) {
    //     if (!dev && !isServer) {
    //         config.optimization.splitChunks = {
    //             chunks: "all",
    //             maxInitialRequests: 20,
    //             minSize: 20_000,

    //             cacheGroups: {
    //                 motion: {
    //                     test:
    //                         /[\\/]node_modules[\\/](framer-motion|lenis)[\\/]/,
    //                     name: "motion",
    //                     priority: 30,
    //                     reuseExistingChunk: true,
    //                 },

    //                 vendor: {
    //                     test: /[\\/]node_modules[\\/]/,
    //                     name: "vendor",
    //                     priority: 10,
    //                     reuseExistingChunk: true,
    //                 },
    //             },
    //         };
    //     }

    //     return config;
    // },
};

export default nextConfig;