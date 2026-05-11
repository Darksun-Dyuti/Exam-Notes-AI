import UserModel from "../models/user.model.js"

export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        const user = await UserModel.findById(userId)
        if(!user){
            return res.status(404).json({message:"Current User is not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({message:`getCurrentUser error  ${error}`})
        
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { bio, educationLevel, targetExam } = req.body;
        
        const user = await UserModel.findByIdAndUpdate(
            userId, 
            { bio, educationLevel, targetExam },
            { new: true }
        );
        
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `updateUser error: ${error}`});
    }
}