/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "img.1hd.to",
            "bizweb.dktcdn.net",
            "multi-step-form-tawny.vercel.app",
            "i.ibb.co",
            "utfs.io"
        ]
    },
    output: "standalone"
}

module.exports = nextConfig
