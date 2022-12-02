export default {
    origin: "https://rest-api-ui.vercel.app",
    port: process.env.PORT || 1337,
    saltWorkFactor: 10,
    accessTokenLife: "20m",
    refreshTokenLife: "1y",
}
