const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./src/proto/auth.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

async function Register(usernameParam, passwordParam) {
    const AuthService = grpc.loadPackageDefinition(packageDefinition).AuthService;
    const client = new AuthService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );

    const clientPromise = new Promise((resolve, reject) => client.Register({username: usernameParam, password: passwordParam}, (error, res) => {
        if (error) reject(error);
        else resolve(res);
        
    }));

    try {
        const tokens = await clientPromise;
        return tokens;
    }
    catch(e) {
        return e.code;
    }
}

async function Auth(usernameParam, passwordParam) {
    const AuthService = grpc.loadPackageDefinition(packageDefinition).AuthService;
    const client = new AuthService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );

    const clientPromise = new Promise((resolve, reject) => client.Login({username: usernameParam, password: passwordParam}, (error, res) => {
        if (error) reject(error);
        else resolve(res);
        
    }));
    try {
        const tokens = await clientPromise;
        return tokens;
    }
    catch(e) {
        return e.code;
    }
}


async function Coins(accessTokenParam) {
    const CoinService = grpc.loadPackageDefinition(packageDefinition).CoinService;
    const client = new CoinService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );

    const clientPromise = new Promise((resolve, reject) => client.GetCoins({token: accessTokenParam}, (error, res) => {
        if (error) reject(error);
        else {
            resolve(res);
        }
    }));

    try {
        const coins = await clientPromise;
        return coins;
    }
    catch(e) {
        return e.code;
    }
}

async function RefreshToken(refreshToken) {
    const AuthService = grpc.loadPackageDefinition(packageDefinition).AuthService;
    const client = new AuthService(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );

    const clientPromise = new Promise((resolve, reject) => client.Token({token: refreshToken}, (error, res) => {
        if (error) reject(error);
        else resolve(res);
        
    }));
    try {
        const tokens = await clientPromise;
        return tokens;
    }
    catch(e) {
        return e.code;
    }
}

export {Register, Auth, Coins, RefreshToken}