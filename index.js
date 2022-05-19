import express from "express"
import dotenv from "dotenv"
import notFoundMiddleware from "./middlewares/NotFound";
import errorHandlerMiddleware from "./middlewares/error-handler";
import connectDB from "./db/connect";
import authRoute from "./routes/authRoute";
import jobsRoute from "./routes/jobsRoute";
import "express-async-errors"
import morgan from "morgan"
import cors from "cors"
import authenticateUser from "./middlewares/auth"

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) =>{
    // throw new Error("error")
    res.send("Welcome")
})
app.use(cors())
app.use(express.json())
if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"))
}

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/jobs', authenticateUser, jobsRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


connectDB(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Up and running on PORT ${PORT}`)
    })
}).catch(err => {
    console.log(err)
})
