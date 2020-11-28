'use strict';

const assert = require('assert');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: Boolean(process.env.ANALYZE),
});

const svgoConfig = {
  floatPrecision: 2,
  multipass: true,
  plugins: [
    {
      convertPathData: {
        makeArcs: false,
      },
    },
    { removeViewBox: false },
    { sortAttrs: true },
  ],
};

module.exports = withBundleAnalyzer({
  webpack(config, { isServer }) {
    addCodeMirrorAlias(config, isServer);
    addReactSvgRule(config);
    return config;
  },
});

function addCodeMirrorAlias(config, isServer) {
  if (isServer) {
    const runmodeNodePath = require.resolve('codemirror/addon/runmode/runmode.node');
    config.resolve.alias[require.resolve('codemirror/lib/codemirror')] = runmodeNodePath;
    config.resolve.alias[require.resolve('codemirror/addon/runmode/runmode')] = runmodeNodePath;
  }
}

const moduleTest = String.raw`/\.(tsx|ts|js|mjs|jsx)$/`;

function addReactSvgRule(config) {
  const moduleRule = config.module.rules.find((rule) => String(rule.test) === moduleTest);
  assert.notStrictEqual(
    moduleRule,
    undefined,
    'Could not find the main module rule (check the regular expression)',
  );

  const moduleLoaders = Array.isArray(moduleRule.use) ? moduleRule.use : [moduleRule.use];

  config.module.rules.push({
    test: /\.react\.svg$/,
    use: [
      ...moduleLoaders,
      {
        loader: '@svgr/webpack',
        options: { svgoConfig },
      },
    ],
  });
}
