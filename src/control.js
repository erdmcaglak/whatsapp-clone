const isDev = process.env.NODE_ENV === 'development'

export const SERVER_URL = isDev ? "http://localhost:8081" : '';

export const whapiNumber = "905315677183";