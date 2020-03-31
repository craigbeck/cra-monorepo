const { override } = require('customize-cra');
const path = require('path');


const appSrc = path.join(__dirname, '../..');

const adjustLoaderForWorkspace = includePath => config => {
  const rules = config.module.rules.map(r => {
    // want the rule defining the loaders
    // this is the rule with `oneOf` attibute
    // anything else ignored  
    if (!r.oneOf) {
      return r;
    }

    return {
      oneOf: r.oneOf.map(o => {
        // ignore if not using babel-loader
        if (!/babel-loader/.test(o.loader)) {
          return o;
        }

        // babel-loader can be used without include path
        // but we want the one with the defined include
        if (!o.include) {
          return o;
        }

        // this is the rule we want
        return {
          ...o,
          // set include path to the `packages` directory so
          // we transpile any of our dependent packages within
          // the monorepo 
          include: includePath,
          options: {
            ...o.options,
            // adding this preset enabling typescript compilation
            presets: [
              [
                require.resolve('babel-preset-react-app'),
                { helpers: true, flow: false, typescript: true },
              ],
            ],
          }
        };
      })
    };
  });

  return {
    ...config,
    module: {
      ...config.module,
      rules,
    },
  };
}

module.exports = override(
  adjustLoaderForWorkspace(appSrc)
);
