// require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).send({ error: 'No token provided' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        // console.log(decoded);
        if (err) return res.status(401).send({ error: 'Invalid token' });
        var dateNow = new Date();
        if (decoded.exp < dateNow.getTime() / 1000) return res.status(401).send({ error: 'Token expired' });
        req.userId = decoded.id;
        next();
    });
}

function verifyRefreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).send({ error: 'No token provided' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' });
        var dateNow = new Date();
        if (decoded.exp < dateNow.getTime() / 1000) {
            return res.status(401).send({ error: 'Token expired' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyToken,
    verifyRefreshToken
};