/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Lisää tuki mp4-tiedostoille
      config.module.rules.push({
        test: /\.(mp4|webm)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192, // Koko rajan yläpuolella tiedosto käytetään perinteisen tiedostolataajan sijaan
              publicPath: '/_next',
              outputPath: 'static/videos',
              name: '[name].[ext]',
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  module.exports = nextConfig;