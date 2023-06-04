const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { 
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, "jwtPrivateKey");
            req.user = decoded;
        } catch (err) { 
            return res.status(401).send({error: `Token expired ${req.user}    ${token}`});
        }
    } else {
        return res.status(401).send({error: "Access denied. No token provided"});
    }
    next();
};