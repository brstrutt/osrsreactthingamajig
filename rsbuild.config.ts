import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginBabel } from '@rsbuild/plugin-babel';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginTypeCheck(),
    pluginBabel({
        include: /\.(?:jsx|tsx)$/,
        babelLoaderOptions(opts) {
          opts.plugins?.unshift('babel-plugin-react-compiler');
        },
      }),
    ],
  output: {
    // This tells RsBuild to use relative paths
    assetPrefix: './',
  },
  html: {
    title: 'Thingamajig',
    favicon: './src/assets/favicon.ico',
  },
});
