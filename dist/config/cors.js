export const corsConfig = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL];
        if (!origin || whitelist.includes(origin)) {
            // if (whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("CORS Error"));
        }
    },
};
//# sourceMappingURL=cors.js.map