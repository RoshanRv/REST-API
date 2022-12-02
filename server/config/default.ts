export default {
    origin: "http://localhost:3000",
    port: process.env.PORT || 1337,
    saltWorkFactor: 10,
    accessTokenLife: "20m",
    refreshTokenLife: "1y",
}
