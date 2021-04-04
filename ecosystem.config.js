module.exports = {
  apps: [
    {
      name: 'dev.fluffy.api',
      script: 'export env=dev node dist/main',
      watch: false,
      env: {
        env: 'dev',
      },
    },
  ],
};
