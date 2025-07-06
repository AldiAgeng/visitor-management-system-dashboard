import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  baseUrl: 'https://aldiageng.xyz/api/v1'
};
