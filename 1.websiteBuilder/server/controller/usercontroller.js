import { User } from '../models/user.model.js'
import{generateResponse} from "../config/openRouter.js"
import {extractJson} from '../utils/extractJson.js'
export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ user: null, message: 'No user logged in' })
        }

        const user = await User.findById(req.user._id).select('-password')
        return res.json(user || req.user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `get current user error ${error.message}` })
    }
}

  

