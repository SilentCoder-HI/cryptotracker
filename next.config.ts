import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cryptologos.cc','s2.coinmarketcap.com','assets.coingecko.com','static.coingecko.com'], // Add the external domain here
  },
  // other configuration options can go here
};

export default nextConfig;
