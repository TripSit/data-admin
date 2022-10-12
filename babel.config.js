'use strict';

module.exports = function babelConfig(api) {
  api.cache(process.env.NODE_ENV !== 'production');

  return {
    presets: [
      ['@babel/preset-env', { modules: false }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ['babel-plugin-styled-components', { ssr: false }],
    ],
  };
};
