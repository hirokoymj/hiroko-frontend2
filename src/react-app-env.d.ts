/// <reference types="react-scripts" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "develoopment" | "production";
    readonly PUBLIC_URL: string;
  }
}
