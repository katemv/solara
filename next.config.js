/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "amzn-s3-solara-bucket.s3.us-east-2.amazonaws.com",
                port: "",
                pathname: "/products/**"
            }
        ]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    }
};

module.exports = nextConfig;
