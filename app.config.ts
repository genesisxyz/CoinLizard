import type { ConfigContext, ExpoConfig } from '@expo/config';

import pkg from './package.json';

const VERSION = pkg.version;

export default (_: ConfigContext): ExpoConfig => ({
  name: 'coinlizard',
  slug: 'coinlizard',
  version: VERSION,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.genesisxyz.coinlizard',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.genesisxyz.coinlizard',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      '@config-plugins/detox',
      {
        // https://github.com/expo/expo/issues/19585#issuecomment-1281075300
        subdomains: '*',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: 'da41b593-6838-44cf-a4e3-1c5d5f886903',
    },
  },
  updates: {
    url: 'https://u.expo.dev/da41b593-6838-44cf-a4e3-1c5d5f886903',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  owner: 'genesisxyz',
});
