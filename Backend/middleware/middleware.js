// middleware.js

import cors from 'cors';

const allowedOrigins = [
  'https://www.indiashometuition.com',
  'http://localhost:3000',
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    // allow requests with no origin like Postman or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy blocked this origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // important if you send cookies or auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
