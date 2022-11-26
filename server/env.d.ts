declare namespace NodeJS {
    interface ProcessEnv {
        readonly MONGO_URI: string
        readonly PRIVATE_ACCESS_KEY: string
        readonly PUBLIC_ACCESS_KEY: string
        readonly PRIVATE_REFRESH_KEY: string
        readonly PUBLIC_REFRESH_KEY: string
        readonly GOOGLE_CLIENT_ID: string
        readonly GOOGLE_CLIENT_SECRET: string
        readonly GOOGLE_REDIRECT_URI: string
    }
}
