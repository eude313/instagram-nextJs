/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/reels/:reelId*',
                destination: '/reels',
            },
        ];
    },
};

export default nextConfig;
