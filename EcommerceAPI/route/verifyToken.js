const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    //console.log('aaa')
    const tokenHeader = req.headers.token;
    if (!tokenHeader)
        return res.status(401).json('Missing Token');

    const token = tokenHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err || !data)
            return res.status(401).json('Invalid Token');

        req.data = data;
        next();
    });
}

const verifyTokenAndPermission = (req, res, next) => {
    verifyToken(req, res, () => {
        //console.log(req.data);
        if (req.data.id === req.params.id || req.data.isAdmin)
            next();
        else
            return res.status(402).json('Not Permit');
    });
}

const verifyAdminToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.data.isAdmin)
            next();
        else
            return res.status(400).json('Not Admin');
    });
}

module.exports = { verifyToken, verifyTokenAndPermission, verifyAdminToken } 