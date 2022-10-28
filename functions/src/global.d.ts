// / <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly CLIENT_URL: string
    readonly LINE_LOGIN_REDIRECT: string
    readonly LINE_LOGIN_ID: string
    readonly LINE_SECRET: string
    readonly LINEBOT_ACCESSTOKEN: string
    readonly LINE_ACCESSTOKEN_URL: string
    readonly LINE_PROFILE_URL: string
  }
}
