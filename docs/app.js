// Service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

let deferredPrompt;
const btn = document.getElementById('install');
const banner = document.getElementById('install-banner');
const bannerCta = document.getElementById('install-cta');
const bannerDismiss = document.getElementById('install-dismiss');
const iosBanner = document.getElementById('ios-banner');
const iosDismiss = document.getElementById('ios-dismiss');
const toast = document.getElementById('toast');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (btn) btn.hidden = false;
  if (banner && !localStorage.getItem('installBannerDismissed')) {
    banner.hidden = false;
  }
});

async function doInstall() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  if (btn) btn.hidden = true;
  if (banner) banner.hidden = true;
}

btn?.addEventListener('click', doInstall);
bannerCta?.addEventListener('click', doInstall);
bannerDismiss?.addEventListener('click', () => {
  if (banner) banner.hidden = true;
  localStorage.setItem('installBannerDismissed', '1');
});

// iOS guidance (no beforeinstallprompt). Show only if not standalone.
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isStandalone = (window.navigator.standalone === true) || (matchMedia('(display-mode: standalone)').matches);
if (iosBanner && isIOS && !isStandalone && !localStorage.getItem('iosBannerDismissed')) {
  iosBanner.hidden = false;
}
iosDismiss?.addEventListener('click', () => {
  if (iosBanner) iosBanner.hidden = true;
  localStorage.setItem('iosBannerDismissed', '1');
});

window.addEventListener('appinstalled', () => {
  if (banner) banner.hidden = true;
  if (btn) btn.hidden = true;
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }
});

