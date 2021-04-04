module.exports = {
  apps: [
    {
      name: 'dev.fluffy.api',
      script: 'dist/main.js',
      watch: false,
      env: {
        env: 'dev',
      },
    },
  ],
};
