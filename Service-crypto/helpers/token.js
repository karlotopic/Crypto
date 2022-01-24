const jwt = require('jsonwebtoken');

exports.generateTokens = async (user, prisma) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    
    // set expiry date 2 days from now
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 2)
    
    const isCreated = await prisma.auth.create({
        data: {
            refresh_token: refreshToken,
            timestamp: expiryDate.toISOString()
        }
    })
    .catch((err) => {
        // TO DO: implement error handler
        console.log(err, "error handler!");
    })
    
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

exports.authenticateToken = (accessToken) => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            return false;
        }
        return true;
    })
}

exports.getUserFromRefreshToken = (refreshToken) => {
    let user = {};
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, usr) => {
        if (err) return false;
        user = usr;
    })
    return user;
}


exports.deleteRefreshToken = async (refreshToken, prisma) => {
    await prisma.auth.delete({
        where: {
            refresh_token: refreshToken
        }
    })
    .catch((err) => {
        // TO DO: implement error handler
        console.log("did not delete", err);
    })
}