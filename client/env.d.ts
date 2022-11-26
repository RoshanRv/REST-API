declare namespace NodeJS {
    interface ProcessEnv {
        readonly NEXT_PUBLIC_SERVER_ENDPOINT: string
        readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
        readonly NEXT_PUBLIC_GOOGLE_REDIRECT_URI: string
    }
}
