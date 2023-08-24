


class MessageRepository{
    private userModel// Use the correct parameter name here

    constructor(userModel: any) {
        this.userModel = userModel; // Use the correct parameter name here
    }

    async insertPost(data:any){
        try {
            console.log(data,'///////');
            await this.userModel.updateOne({username:data.username},{$push:{posts:data}})
            return true
            
        } catch (err) {
            throw err
        }
    }

    async updateUser(data:any){
        try {
            console.log(data,'///data');
            
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.phoneOrEmail)) {
                console.log('email',data.phoneOrEmail);
                
                return await this.userModel.updateOne({username:data.username},{set:{full_name:data.fullName,email:data.phoneOrEmail}})
              
            }

            // Check if the inputValue is a valid phone number (you might need a more sophisticated validation)
            else if (/^\d{10}$/.test(data.phoneOrEmail)) {
                console.log('phone',data.phoneOrEmail);
                return await this.userModel.updateOne({username:data.username},{set:{full_name:data.fullName,phone:data.phoneOrEmail}})
            }
          
        } catch (error) {
            throw error
        }
    }
   
}

export default MessageRepository