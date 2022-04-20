const JWT = require('jsonwebtoken');
const redis = require('redis');
const createError = require('http-errors');

//connect to redis
const redisClient = redis.createClient({
    legacyMode: true,
    port: 6379,
    host: '127.0.0.1'
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect()
    .then(() => console.log("Redis Connection Established...!"))
    .catch((error) => console.log("Error: Redis connection can not be established...!\n", error.message));

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "15s",
                audience: userId
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                resolve(token)
            })
        })
    }, signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                audience: userId
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                redisClient.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                    if (err) {
                        console.log(err.message);
                        reject(createError.InternalServerError());
                        return
                    }
                    resolve(token)
                });
            })
        })
    }, verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(createError.Unauthorized());
                const userId = payload.aud;
                redisClient.GET(userId, (err, result) => {
                    if (err) {
                        console.log(err.message)
                        reject(createError.InternalServerError())
                        return
                    }
                    if (refreshToken === result) return resolve(userId)
                    reject(createError.Unauthorized())
                })
            })
        })
    }, redisClient
}
