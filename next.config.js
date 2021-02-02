const APIHOST = process.env.APIHOST ?? 'http://localhost';

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${APIHOST}:8080/:path*`,
      },
    ];
  },
};
