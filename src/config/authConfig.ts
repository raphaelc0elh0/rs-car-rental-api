export const authConfig = {
  secret_token: process.env.AUTH_SECRET_TOKEN,
  secret_refresh_token: process.env.AUTH_SECRET_REFRESH_TOKEN,
  expires_in_token: 60 * 15, // 15 min,
  expires_in_refresh_token: 60 * 60 * 24 * 30, // 30 days,
};
