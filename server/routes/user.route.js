import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser, updateUser } from "../controllers/user.controller.js"


const userRouter = express.Router()


userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.put("/update",isAuth,updateUser)

export default userRouter