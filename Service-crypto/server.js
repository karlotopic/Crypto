const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const { generateTokens, authenticateToken, getUserFromRefreshToken, deleteRefreshToken } = require('./helpers/token');
const axios = require('axios');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const PROTO_PATH = "./proto/crypto.proto";


dotenv.config();

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

let packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const cryptoProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

// Endpoints

server.addService(cryptoProto.AuthService.service, {
    Login: async (call, callback) => {
        let { username, password } = call.request;
        const userExists = await prisma.users.findFirst({
            where: {
                username: username,
                password: password
            }
        })

        if (userExists) {
            const tokens = await generateTokens(call.request, prisma)
            callback(null, tokens);
        }
        else {
            callback({
                code: grpc.status.UNAUTHENTICATED 
            })
        }
    },
    Register: async (call, callback) => {
        let { username, password } = call.request;
        const userExists = await prisma.users.findFirst({
            where: {
                username: username,
                password: password
            }
        })

        if (!userExists) {
            const insertUser = await prisma.users.create({
                data: {
                    username: username,
                    password: password
                }
            })
            .catch((err) =>{
                console.log("implement error handler", err);
            })
            const tokens = await generateTokens(call.request, prisma)
            callback(null, tokens);
        }
        else {
            callback({
                code: grpc.status.ALREADY_EXISTS 
            })
        }
    },
    Token: async (call, callback) => {
        console.log("tu smo");
        let { token } = call.request;
        const response = await prisma.auth.findFirst({
            where: {
                refresh_token: token
            }
        })

        if (response) {
            let expiryDate = new Date('2021-12-11T11:48:47.314Z');
            const currentDate = new Date();
            // check if the refresh token expired
            if (currentDate < expiryDate) {
                const {username, password} = getUserFromRefreshToken(token);
                if (!username || !password) callback({code: grpc.status.UNAUTHENTICATED })
                await deleteRefreshToken(token, prisma);
                const tokens = await generateTokens({username: username, password:password}, prisma);
                callback(null, tokens);
            }
            else {
                await deleteRefreshToken(token, prisma);
                callback({code: grpc.status.UNAUTHENTICATED })
            }
        }
        else {
            callback({code: grpc.status.PERMISSION_DENIED })
        }
    }
});

server.addService(cryptoProto.CoinService.service, {
    GetCoins: async (call, callback) => {
        let isValidToken = authenticateToken(call.request.token);
        if (isValidToken) {
            axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false")
            .then((response) => {
                const coins = response.data.map(el => {
                    return {
                        id: el.id,
                        symbol: el.symbol,
                        name: el.name,
                        image: el.image,
                        current_price: el.current_price,
                        market_cap: el.market_cap,
                        price_change_percentage_24h: el.price_change_percentage_24h,
                        total_volume: el.total_volume
                    }
                });
                
                const res = {
                    coins: coins
                }
                callback(null, res) 
            })
            .catch((error) => {
                console.log(error)
            })
        }
        else {
            callback({ code: grpc.status.PERMISSION_DENIED })
        }
    }
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://127.0.0.1:50051");
        server.start();
    }
);