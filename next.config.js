// next.config.tsx

module.exports = {
    images: {
        domains: ["static.tvmaze.com"],
    },
    env: {
        HTTPS: process.env.HTTPS === "true",
    },
};
