declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      JWT_SECRET: string;
      ADMIN_CODE: string;
      REDIS_URL: string;
    }
  }
}

export {};
