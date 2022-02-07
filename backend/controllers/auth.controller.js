const jwt = require('jsonwebtoken');

function refreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).send({ error: 'No token provided' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' });
        if (decoded.exp < Date.now()) return res.status(401).send({ error: 'Token expired' });
        
        res.status(200).send({
            accessToken: jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        });
    });
}

module.exports = {
    refreshToken
};