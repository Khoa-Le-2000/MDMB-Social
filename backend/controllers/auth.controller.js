const jwt = require('jsonwebtoken');

function refreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        
        res.status(200).send({
            accessToken: jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        });
    });
}

module.exports = {
    refreshToken
};