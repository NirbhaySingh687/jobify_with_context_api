import { UnAuthenticatedError } from "../errors";
import jwt from "jsonwebtoken";
import { decrypt } from "./helper"

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        //console.log("authenticated Route", authHeader)
        if(!authHeader || !authHeader.startsWith('Bearer')){
            throw new UnAuthenticatedError("Authentication Invalid in Auth")
        }
        const token = authHeader.split(' ')[1]
        const decryptedToken = decrypt(token);
        const payload = jwt.verify(decryptedToken, process.env.JWT_SECRET);
        req.user = { userId: payload.userId }
        next()
    } catch (err) {
        next(err)
    }
}

export default auth;