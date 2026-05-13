import UserModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"


export const googleAuth = async (req,res) => {
    try {
        
        const {name , email} = req.body
        let user = await UserModel.findOne({email})
        if(!user){
            user = await UserModel.create({
                name , email
            })
        }
        let token = await getToken(user._id)
        
        // Cookie options for production (HTTPS) and cross-site compatibility
        const cookieOptions = {
            httpOnly: true,
            secure: true, // Required for sameSite: "none"
            sameSite: "none", // Required for cross-site cookies between different Render domains
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };

        res.cookie("token", token, cookieOptions);
        
        return res.status(200).json(user)
    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(500).json({ message: "Internal server error during authentication" });
    }
    
}

export const logOut = async (req,res) => {
    try {
        await res.clearCookie("token")
         return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
        return res.status(500).json({message:`Logout Error  ${error}`})
    }
}
