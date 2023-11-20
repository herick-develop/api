export default (request, response, next) => {
    const allowedOrigins = "*";
    response.setHeader("Access-Control-Allow-Origin", allowedOrigins);
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Access-Control-Max-Age", "10");
    next();
}
