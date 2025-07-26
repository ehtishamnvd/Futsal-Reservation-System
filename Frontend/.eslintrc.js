module.exports = {
  extends: [
    "react-app",
    "react-app/jest"
  ],
  rules: {
    // This will hide all the warnings you don't want to see
    'no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/alt-text': 'off',
    'eqeqeq': 'off',
    'no-loop-func': 'off'
  },
};