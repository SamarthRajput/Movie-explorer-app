const jwt = require("jsonwebtoken");
const JWT_SECRET =  require("../config");
const { model } = require("mongoose");

const authMiddleware = (req, res, next) => {
    //get the jwt token in the header
    const authHeader = req.headers.authorization;

    //make sure the header starts with bearer, checks for the Authorization header <Bearer token>
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        } 
        else{
            return res.status(403).json({});
        }
    }
    catch(err){
        return res.status(403).json(err);
    }
}

module.exports = {
    authMiddleware
};