import 'regenerator-runtime';
import CacheHelper from './helper/cache';

const {assets} = global.serviceWorkerOption;

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([
    ...assets, './',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
  ]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});

