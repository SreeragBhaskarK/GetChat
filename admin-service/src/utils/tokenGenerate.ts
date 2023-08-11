import jwt from "jsonwebtoken"


export const tokenGenerate=(authId:string)=>{
    try {
        const secrete_key:string =  process.env.TOKEN_SECRETE_KEY !
        const maxAge = 7 * 24 * 60 * 60 * 1000
        return jwt.sign({ authId }, secrete_key ,{
            expiresIn: maxAge
            
        })
    }
    catch (err) {
        throw err
    }
}
