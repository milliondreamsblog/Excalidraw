import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";

const authMiddleware = (req ,res , next) :any  =>{

    const authHeader =  req.headers.authrization;

    if(!authHeader || !authHeader.startwith("Berear")){
        res.status(411).json({
            message : "Invaild login attempts"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded =  jwt.verify(token , JWT_SECRET);
        req.userId = decoded.userId;
        next()
    }catch(err){
        res.status(411).json({
            message : "could'nt verify token"
        })
    }


}


export {authMiddleware}