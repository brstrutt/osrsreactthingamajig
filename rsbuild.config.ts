import { defineConfig } from '@rsbuild/core';
import { pluginBasicSsl } from '@rsbuild/plugin-basic-ssl';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact(), pluginBasicSsl()],
  server: {
    proxy: {
      '/osrs': {
        target: 'https://prices.runescape.wiki/api/v1',
        changeOrigin: true,
      },
    },
  },
});
