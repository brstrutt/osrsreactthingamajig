import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";

export default defineConfig({
  plugins: [pluginReact(), pluginTypeCheck()],
  output: {
    // This tells RsBuild to use relative paths
    assetPrefix: './',
  },
  html: {
    title: 'Thingamajig',
    favicon: './src/assets/favicon.ico',
  },
});
