import dotenv from 'dotenv'
import express from 'express'
import userRouter from './src/modules/user/user.routes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(userRouter)

app.listen(process.env.PORT, () =>
  console.log('App Running=>', process.env.PORT)
)
