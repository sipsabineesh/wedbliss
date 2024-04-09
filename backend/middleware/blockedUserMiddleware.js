import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const verifyBlocked = async (req,res,next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user.isBlocked === true){
       next(errorHandler(401,'You have been blocked by the Admin.Please contact the admin'))
    }
    else
        next()
}


