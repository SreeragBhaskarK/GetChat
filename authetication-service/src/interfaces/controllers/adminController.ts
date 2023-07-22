import { Request, Response } from "express";
import AdminRepository from "../repositories/adminRepository";
import CheckAdmin from "../../useCases/adminUseCase/checkAdmin";
import { bcryptCheck } from "../../utils/bcryptCheck";
import { tokenGenerate } from "../../utils/tokenGenerate";
import mongoose from "mongoose";
const adminRepository = new AdminRepository()
class AdminController{
    static async postLogin(req:Request,res:Response){
        const {email,password} = req.body
        try{
            const checkAdmin = new CheckAdmin(adminRepository)
            let adminData = await checkAdmin.execute(email)
            let result = await bcryptCheck(adminData?.password,password)
            if(result&& adminData){
                const adminId = adminData._id
                const token = await tokenGenerate(adminId)
                const maxAge = 7 * 24 * 60 * 60 * 1000
                await res.cookie('admin',token,{
                    httpOnly: true,
                    maxAge: maxAge
                })
                res.status(200).json({message:'success',success:true,data:adminData})
            }else{
                res.status(400).json({message:'failed',success:false})
            }

        }catch(err:any){
            res.status(400).json({message:err.message,success:false})
        }

    }

    static async deleteLogout(req:Request,res:Response){
        try{
            await res.cookie('admin','',{
                maxAge:1
            })

            res.status(200).json({success:true,message:'success'})

        }catch(err:any){
            res.status(400).json({message:err.message,success:false})
        }
    }
}

export default AdminController