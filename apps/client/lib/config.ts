export const HTTP_URL = process.env.NEXT_PUBLIC_HTTP_URL || (process.env.NODE_ENV === "production" ? "https://syncboard-api.example.com" : "http://localhost:4000");           

export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || (process.env.NODE_ENV === "production" ? "wss://syncboard-api.example.com" : "ws://localhost:8080");
