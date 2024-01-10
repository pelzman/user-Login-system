
import  express from  'express'
import dotenv from "dotenv"
import logger from "morgan"
import { db } from './configs/database'
import  UserRoute from './routes/userRoutes'
import UserAuth   from "./routes/authRoutes"
 dotenv.config()
const app = express()
const Port = process.env.PORT || 3000

const run = async()=> await db
run()
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))

app.use('/api/v1/users', UserRoute)
app.use('/api/v1/userAuth', UserAuth)



app.listen(Port , ()=>console.log(`server running on port ${Port}`))


