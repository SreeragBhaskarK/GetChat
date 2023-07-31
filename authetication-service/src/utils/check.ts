import twilio from 'twilio';
export const otpCheck = (phone: string, otp: string) => {

    try {
        const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICES } = process.env
        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_SERVICES) throw new Error('otp service credentials are missing.')
        const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        return new Promise((resolve,reject)=>{
            client.verify.v2.services(TWILIO_SERVICES)
            .verificationChecks
            .create({ to: '+91' + phone, code: otp })
            .then((verification_check:any) => {
                console.log(verification_check,'kdjfkdjf',verification_check.status);
                if (verification_check.status == 'approved') {
                    console.log('approved');
                    
                    resolve(true) 
                }
                else {
                    resolve(false)
                }
            }).catch((err: any) => {
                console.log(err,'kkjk');
                reject(err) 
            })
        })
      


    } catch (err: any) {
        throw err
    }

}