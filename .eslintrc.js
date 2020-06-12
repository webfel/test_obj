module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      // '@vue/standard'
    ],
    rules: {
      'indent':[0,4],
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
      // parser: 'babel-eslint'
    }
  }
  
