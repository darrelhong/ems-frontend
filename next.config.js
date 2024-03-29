const APIHOST = process.env.APIHOST ?? 'http://localhost:8080';

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${APIHOST}/api/:path*`,
      },
    ];
  },
  env: {
    HOSTNAME: process.env.HOSTNAME || 'http://localhost:3000',
  },
};
