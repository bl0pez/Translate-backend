export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  openApiKey: process.env.OPENAI_API_KEY,
});
