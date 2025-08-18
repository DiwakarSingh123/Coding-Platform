

const { createClient } =require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST_ID,
        port: 17899
    }
});



module.exports = redisClient;

