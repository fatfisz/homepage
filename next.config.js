'use strict';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: Boolean(process.env.ANALYZE),
});

module.exports = withBundleAnalyzer({
  webpack(config, { isServer }) {
    if (isServer) {
      const runmodeNodePath = require.resolve('codemirror/addon/runmode/runmode.node');
      config.resolve.alias[require.resolve('codemirror/lib/codemirror')] = runmodeNodePath;
      config.resolve.alias[require.resolve('codemirror/addon/runmode/runmode')] = runmodeNodePath;
    }

    return config;
  },
});
