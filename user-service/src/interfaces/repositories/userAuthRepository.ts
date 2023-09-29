import { User } from "../../entities/userEntity";
import userModel from "../../frameworks/mongoose/models/userModel";

import { userProducer } from "../messageBrokers/userProducer";
import bcrypt from 'bcryptjs'
class UserAuthRepository {
    public userModel
    private verifyModel
    constructor (userModel:any,verifyModel:any){
        this.userModel = userModel
        this.verifyModel = verifyModel

    }

    async findUser(phoneOrusernameOremail: string) {
        try {

            let userData
            // Check if the inputValue is a valid email address
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrusernameOremail)) {
                userData = await this.userModel.find({ email: phoneOrusernameOremail });
                if (!userData.length) throw new Error('user no found')
                if (userData[0].verification_status === 'verification processing') throw new Error('not verified account')
                console.log(userData, '///////');

                return userData.pop()
            }

            // Check if the inputValue is a valid phone number (you might need a more sophisticated validation)
            else if (/^\d{10}$/.test(phoneOrusernameOremail)) {
                console.log(phoneOrusernameOremail);

                userData = await this.userModel.find({ phone: phoneOrusernameOremail });
                console.log(userData);

                if (!userData.length) throw new Error('user no found')
                if (userData[0].verification_status === 'verification processing') throw new Error('not verified account')
                return userData.pop()
            }

            // If the above conditions fail, assume it's a username
            else {
                userData = await this.userModel.find({ username: phoneOrusernameOremail });
                if (!userData.length) throw new Error('user no found')
                if (userData[0].verification_status === 'verification processing') throw new Error('not verified account')
                return userData.pop()
            }



        } catch (err: any) {
            throw err
        }
    }

    async insertUser(mobileOrEmail: string, fullName: string, username: string, password: string) {
        console.log(mobileOrEmail);

        try {
            let userData = new this.userModel({
                full_name: fullName,
                username: username,
                password: password
            })
            // Check if mobileOrEmail is a valid email address
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileOrEmail)) {
                let check: User[] = await this.userModel.find({ $or: [{ email: mobileOrEmail }, { username: username }] })
                console.log(check, '////////');

                if (check.length) {
                    if (check[0].verification_status == 'verification processing') {
                        await this.userModel.deleteOne({ _id: check[0]._id })
                    } else {

                        throw new Error(`already signup account ${check[0].email ?? check[0].username}`)
                    }
                }
                userData.email = mobileOrEmail;

            } else if (/^\d{10}$/.test(mobileOrEmail)) {
                let check = await this.userModel.find({ $or: [{ phone: mobileOrEmail }, { username: username }] })
                console.log(check, '//////phone');
                if (check.length) {
                    if (check[0].verification_status == 'verification processing') {
                        await this.userModel.deleteOne({ _id: check[0]._id })
                    } else {
                        throw new Error(`already signup account ${check[0].phone ?? check[0].username}`)
                    }
                }
                userData.phone = mobileOrEmail;
            }

            userData.save();
            console.log(userData);
            await userProducer(userData, 'add-admin', 'insertUser').catch((err)=>{
                
            })
            return userData
        } catch (err) {
            throw err
        }
    }

    async verifyToken(email: string, token: string, type: string) {
        try {
            const result = await this.verifyModel.find({ email, token })
            console.log(result);

            if (result.length) {
                await this.verifyModel.deleteOne({ email })


                const updatedDocument = await this.userModel.findOneAndUpdate(
                    { email },
                    { $set: { status: 'active', verification_status: 'verified' } },
                    { new: true } // This option returns the updated document
                );

                return updatedDocument

            } else {
                return false
            }
        } catch (err) {
            throw err
        }
    }

    async statusChange(status: string, phone: string) {
        try {
            const updatedDocument = await this.userModel.findOneAndUpdate(
                { phone },
                { $set: { status, verification_status: 'verified' } },
                { new: true } // This option returns the updated document
            );
            console.log('/////');
            return updatedDocument
        } catch (err) {
            throw err
        }
    }

    static async googleAuth(profile: any) {
        try {
            console.log('///////');
            const result = await userModel.findOne({ email: profile.emails[0].value })
                if (result) {
                    if(!result.google_auth)throw new Error('already used account')
                    console.log(result, '///////');
                    const userData = await userModel.findOneAndUpdate({ googleId: profile.id }, { full_name: profile.displayName, profile_pic: profile.photos[0].value }, { new: true })
                    console.log(userData);
                    return userData

                } else {


                    const min = 1000; // Minimum 4-digit number (inclusive)
                    const max = 9999; // Maximum 4-digit number (inclusive)

                    // Generate a random number between min and max
                    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                    const usernameSet = profile.displayName.replace(/\s/g, '') + randomNumber
                    const userData = new userModel({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        username: usernameSet,
                        status: 'active',
                        verification_status: 'verified',
                        profile_pic: profile.photos[0].value,
                        full_name: profile.displayName,
                        google_auth: true
                    })

                    await userData.save()
                    console.log(userData);
                    return userData

                }

        } catch (err) {
            throw err

        }
    }

    async setNewPassword(email:string,newPassword:string,confirmPassword:string){
        try {
            if(newPassword!=confirmPassword){
                throw new Error('Please check password and confirm password not match')
            }
            const salt = 10
            const password = await bcrypt.hashSync(newPassword, salt)
            console.log(password,'password');
            
            const result:any = await this.userModel.updateOne({email},{$set:{password}})
            console.log(result,'serer🥰🥰🥰',email);
            
            if (result.modifiedCount === 1) {
               return true
              } else if (result.modifiedCount === 0) {
                return false
              } else {
                throw new Error('Update operation did not modify any document.')
              }
            
        } catch (err) {
            throw err
            
        }

    }



}

export default UserAuthRepository