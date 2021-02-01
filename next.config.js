const APIHOST = process.env.APIHOST ?? 'http://localhost';

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${APIHOST}:8080/:path*`,
      },
    ];
  },
};
