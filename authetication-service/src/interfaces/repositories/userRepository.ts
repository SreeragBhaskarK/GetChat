import mongoose from "mongoose";
import userModel from "../../frameworks/mongoose/models/userModel"
import jwt from "jsonwebtoken";
class UserRepository {

    async findUser(phoneOrusernameOremail: string) {
        try {
            console.log(phoneOrusernameOremail);

            let userData
            // Check if the inputValue is a valid email address
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrusernameOremail)) {
                userData = await userModel.findOne({ email: phoneOrusernameOremail });
                return userData
            }

            // Check if the inputValue is a valid phone number (you might need a more sophisticated validation)
            else if (/^\d{10}$/.test(phoneOrusernameOremail)) {
                userData = await userModel.findOne({ phone: phoneOrusernameOremail });
                return userData
            }

            // If the above conditions fail, assume it's a username
            else {
                userData = await userModel.findOne({ username: phoneOrusernameOremail });
                return userData
            }

        } catch (err: any) {
            throw err
        }
    }

    async insertUser(mobileOrEmail: string, fullName: string, username: string, password: string) {
        try {
            let userData = new userModel({
                full_name: fullName,
                username: username,
                password: password
            })
            // Check if mobileOrEmail is a valid email address
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileOrEmail)) {
                userData.email = mobileOrEmail;
            } else {
                // If it's not an email, assume it's a mobile number
                userData.phone = mobileOrEmail;
            }

           userData.save();
            return true
        } catch (err) {
            throw err
        }
    }



}

export default UserRepository