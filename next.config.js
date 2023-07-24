module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
    env: {
      NEXTAUTH_SECRET:"OyKrNlKkss6Mdlt+6ittislH5Zj+YBcs5P7MdE3Vcqg=",
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      }
    ]
  }
};
