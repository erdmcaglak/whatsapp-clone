const isDev = process.env.NODE_ENV === 'development'

export const SERVER_URL = isDev ? "" : 'https://test.whapi.chat';

export const whapiNumber = "905526070175";