const { createClient } =require('redis');
require('dotenv').config();
const redisClient = createClient({
     username: 'default',
    password: 'k5dMisGH2IABusW9Eu0LpSUUR4eRBsuB',
    socket: {
        host: 'redis-10121.c10.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 10121
    }
});

module.exports=redisClient;