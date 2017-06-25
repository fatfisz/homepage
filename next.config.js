'use strict';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = {
  onDemandEntries: {
    maxInactiveAge: Infinity,
  },

  webpack(config) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: 'stats.json',
      })
    );

    return config;
  },
};
