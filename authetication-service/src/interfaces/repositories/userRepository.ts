import { User } from "../../entities/userEntity";
import userModel from "../../frameworks/mongoose/models/userModel"
import verifyModel from "../../frameworks/mongoose/models/verifyModel";
import { produceUser } from "../messageBrokers/userProducer";
class UserRepository {

    async findUser(phoneOrusernameOremail: string) {
        try {

            let userData
            // Check if the inputValue is a valid email address
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrusernameOremail)) {
                userData = await userModel.find({ email: phoneOrusernameOremail });
                if(!userData.length)throw new Error('user no found')
                return userData.pop()
            }

            // Check if the inputValue is a valid phone number (you might need a more sophisticated validation)
            else if (/^\d{10}$/.test(phoneOrusernameOremail)) {
                console.log(phoneOrusernameOremail);
                
                userData = await userModel.find({ phone: phoneOrusernameOremail });
                console.log(userData);
                
                if(!userData.length)throw new Error('user no found')
                return userData.pop()
            }

            // If the above conditions fail, assume it's a username
            else {
                userData = await userModel.find({ username: phoneOrusernameOremail });
                if(!userData.length)throw new Error('user no found')
                return userData.pop()
            }



        } catch (err: any) {
            throw err
        }
    }

    async insertUser(mobileOrEmail: string, fullName: string, username: string, password: string) {
        console.log(mobileOrEmail);

        try {
            let userData = new userModel({
                full_name: fullName,
                username: username,
                password: password
            })
            // Check if mobileOrEmail is a valid email address
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileOrEmail)) {
                let check:User[] = await userModel.find({ $or: [{ email: mobileOrEmail }, { username: username }] })
                console.log(check, '////////');
                
                if (check.length) {
                    if(check[0].status=='verification processing')return check.pop()
                    throw new Error(`already signup account ${check[0].email ??check[0].username}`)
                }
                userData.email = mobileOrEmail;

            } else if (/^\d{10}$/.test(mobileOrEmail)) {
                let check = await userModel.find({ $or: [{ phone: mobileOrEmail }, { username: username }] })
                console.log(check, '//////phone');
                if (check.length) {
                    if(check[0].status=='verification processing')return check.pop()
                    throw new Error(`already signup account ${check[0].phone ?? check[0].username}`)

                }
                userData.phone = mobileOrEmail;
            }

            userData.save();
            return userData
        } catch (err) {
            throw err
        }
    }

    async verifyToken(email: string, token: string,type:string) {
        try {
           const result = await verifyModel.find({ email, token })
           console.log(result);
           
           if(result.length){
            await verifyModel.deleteOne({email})
            if(type=='signup') await userModel.updateOne({email},{$set:{status:'active'}})
            return true
           }else{
            return false
           }
        } catch (err) {
            throw err
        }
    }

    async statusChange(status:string,username:string){
        try{
            await userModel.updateOne({username},{$set:{status}})
            return true
        }catch(err){
            throw err
        }
    }



}

export default UserRepository