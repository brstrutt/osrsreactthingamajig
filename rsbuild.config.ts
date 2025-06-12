import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    // This tells RsBuild to use relative paths
    assetPrefix: './',
  },
   html: {
    title: 'Thingamajig',
    favicon: './src/assets/favicon.ico',
  },
});
