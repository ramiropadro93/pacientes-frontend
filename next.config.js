const API_PATH = 'https://localhost:44339/api';

const nextConfig = {
  reactStrictMode: false,
  env: {
      API_BASE_PATH: API_PATH,
  }
}

module.exports = nextConfig
