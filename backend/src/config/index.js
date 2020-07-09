export default {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "asidhjaopwdapsijdpai3wj01-9u3d021djhaisjdpi",
    api: process.env.NODE_ENV === "production" ? 'http://localhost:8080' : "http://localhost:8080",
    store: process.env.NODE_ENV === "production" ? process.env.SECRET : "http://localhost:8000"
}