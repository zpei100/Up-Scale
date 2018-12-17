require('babel-register')({
  presets: ['env', 'react'],
  plugins: ['transform-react-constant-elements', 'transform-react-inline-elements']
});

require(process.env.LAUNCH === 'cluster' ? './cluster' : './index');