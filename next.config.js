module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

module.exports = {
  publicRuntimeConfig: {
    BACKEND_URL: process.env.BACKEND_URL,
  }
};