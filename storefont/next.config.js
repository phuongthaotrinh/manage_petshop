/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "img.1hd.to",
            "bizweb.dktcdn.net",
            "multi-step-form-tawny.vercel.app",
            "i.ibb.co",
            "utfs.io",
            "img.freepik.com",
            "petshop.fringestudio.com"
        ]
    },
    output: "standalone",
    logging: {
        fetches: {
          fullUrl: true
        }
      }
}

module.exports = nextConfig
