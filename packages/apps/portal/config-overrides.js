const path = require('path');

const additionalPresets = [
  [
    require.resolve('babel-preset-react-app'),
    { helpers: true, flow: false, typescript: true },
  ],
];

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // console.log('env =', env);
  
  const [
    rule0,
    rule1,
    rule2,
    ...otherRules
  ] = config.module.rules;

  const [
    opt0,
    target,
    ...otherOpts
  ] = rule2.oneOf;

  // const target = config.module.rules[2].oneOf[1];
  console.log(JSON.stringify(target, null, 2));

  const newOptions = {
    ...target,
    include: path.resolve(target.include, '../../..'),
    options: {
      ...target.options,
      presets: additionalPresets,
    }
  };

  console.log(JSON.stringify(newOptions, null, 2));

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        rule0,
        rule1,
        {
          ...rule2,
          oneOf: [
            opt0,
            newOptions,
            ...otherOpts,
          ]
        },
        ...otherRules,
      ],
    }
  };
}
