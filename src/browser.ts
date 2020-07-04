import debounceFn from 'debounce-fn';

// SEE: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const setCssProperty = () => {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  const root = document.documentElement;

  root.style.setProperty('--vh', `${vh}px`);
  if (vh > vw) {
    root.style.setProperty('--vmax', `${vh}px`);
    root.style.setProperty('--vmin', `${vw}px`);
  } else {
    root.style.setProperty('--vmax', `${vw}px`);
    root.style.setProperty('--vmin', `${vh}px`);
  }
};

export function viewportUnitOnMobile() {
  setCssProperty();
  window.addEventListener('resize', debounceFn(setCssProperty, {wait: 50}));
}
