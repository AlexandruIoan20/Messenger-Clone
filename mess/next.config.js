/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      swcPlugins: [
        [
          "next-superjson-plugin", {}
        ]
      ], 
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: [
          'lh3.googleusercontent.com',
          'res.cloudinary.com', 
          'avatars.githubusercontent.com'
        ],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig