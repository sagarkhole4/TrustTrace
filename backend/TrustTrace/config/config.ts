export const config = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  SERVICE_NAME: process.env.SERVICE_NAME,
});
