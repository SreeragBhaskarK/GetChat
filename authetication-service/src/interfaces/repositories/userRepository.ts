import mongoose from "mongoose";
import userModel from "../../frameworks/mongoose/models/userModel"
import jwt from "jsonwebtoken";
import verifyModel from "../../frameworks/mongoose/models/verifyModel";
class UserRepository {

    async findUser(phoneOrusernameOremail: string) {
        try {
           
        
            
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
                let check  = await userModel.findOne({email:mobileOrEmail})
                console.log(check);
                
                if(check){
                    throw new Error ('already signup account')
                }
                userData.email = mobileOrEmail;
                
            } else {
                let check  = await userModel.findOne({phone:mobileOrEmail})
                if(check){
                    throw new Error ('already signup account')
                    
                }
                userData.phone = mobileOrEmail;
            }

           userData.save();
            return true
        } catch (err) {
            throw err
        }
    }

    async verifyToken (email:string,token:string){
        try{
            return await verifyModel.findOne({email,token})
        }catch(err){
            throw err
        }
    }



}

export default UserRepository