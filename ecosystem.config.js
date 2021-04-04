module.exports = {
  apps: [
    {
      name: 'dev.fluffy.api',
      script: 'cross-env env=dev node dist/main',
      watch: false,
      env: {
        env: 'dev',
      },
    },
  ],
};
