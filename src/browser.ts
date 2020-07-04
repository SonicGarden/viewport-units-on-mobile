import debounceFn from 'debounce-fn';

// SEE: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const setCssProperty = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export function viewportUnitOnMobile() {
  setCssProperty();
  window.addEventListener('resize', debounceFn(setCssProperty, {wait: 50}));
}
