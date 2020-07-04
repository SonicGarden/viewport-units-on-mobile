import postcss from 'postcss';

// SEE: https://qiita.com/ota-meshi/items/0738f2089009b150134c

function replacer(original: string, snum: string, unit: string): string {
  if (Number.isNaN(snum)) {
    return original;
  }

  return `calc(${snum} * var(--${unit}, 1${unit}))`;
}

type Replace = {
  decl: postcss.Declaration;
  newValue: string;
};

function createPlugin(): postcss.Transformer {
  return root => {
    const replaces: Replace[] = [];
    root.walkDecls(decl => {
      const newValue = decl.value.replace(/\b([+-]?[\d.]+)(vh|vmax|vmin)\b/g, replacer);
      if (decl.value !== newValue) {
        replaces.push({decl, newValue});
      }
    });
    for (const {decl, newValue} of replaces) {
      decl.parent.insertAfter(decl, decl.clone({value: newValue}));
    }
  };
}

const postcssPlugin = postcss.plugin('postcss-viewport-units-on-mobile', () => createPlugin());

export {postcssPlugin};
