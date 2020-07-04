# viewport-units-on-mobile

## Install

```
yarn add https://github.com/SonicGarden/viewport-units-on-mobile.git
```

## Usage

`application.js`
```javascript
import { viewportUnitOnMobile } from '@sonicgarden/viewport-units-on-mobile';

viewportUnitOnMobile();
```

`postcss.config.js`
```javascript
module.exports = {
  plugins: [
    require('@sonicgarden/viewport-units-on-mobile/lib/postcss-plugin').postcssPlugin,
  ],
}

```

## Example

`before.css`
```css
.a {
  height: 100vh;
}
.b {
  height: calc(100vh - 10px);
}
```

`after.css`
```css
.a {
  height: 100vh;
  height: calc(100 * var(--vh, 1vh));
}
.b {
  height: calc(100vh - 10px);
  height: calc(calc(100 * var(--vh, 1vh)) - 10px);
}
```
