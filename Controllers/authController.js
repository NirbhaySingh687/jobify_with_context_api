import User from "../models/User";
import {BadRequestError, UnAuthenticatedError } from "../errors";
import {StatusCodes} from "http-status-codes";

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            throw new BadRequestError("Provide all values please")
        }
        const userAlreadyExist = await User.findOne({ email })
        if(userAlreadyExist){
            throw new BadRequestError("Email Already in use")
        }
        const user = await User.create(req.body);
        const data = await User.findOne({email}).select({ name: 1, email: 1, location: 1, lastName: 1})
        const token = user.createJWT()
        res.status(201).json({ user: data, token, location: user["location"] })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            throw new BadRequestError("Provide all values please")
        }
        const user = await User.findOne({ email }).select("+password")
        if(!user){
            throw new UnAuthenticatedError("Email not exists")
        }
        console.log(`######`,user)
        const isPassword = await user.comparePassword(password)
        if(!isPassword){
            throw new UnAuthenticatedError("Invalid Credential")
        }
        const token = user.createJWT()
        user.password = undefined
        res.status(201).json({ user, token, location: user["location"]})
    } catch (err) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { name, email, lastName, location } = req.body;
        if(!name || !email || !lastName || !location){
            throw new BadRequestError("Provide all values please")
        }
        const user = await User.findOne({ _id : req.user.userId });
        user.email = email;
        user.name = name;
        user.lastName = lastName;
        user.location = location;
        await user.save();
        const token = user.createJWT()
        res.status(StatusCodes.OK).json({
            user, token,location
        })
    } catch (err) {
        next(err)
    }
}

export { register, login, updateUser }