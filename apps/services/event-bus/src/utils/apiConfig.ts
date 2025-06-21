// config/apiConfig.ts
export const API_BASE_URLS = {
  users: process.env.USERS_API || 'http://localhost:3001/api',
  blogs: process.env.BLOGS_API || 'http://localhost:3002/api',
};
