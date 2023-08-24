import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { DeleteObjectCommand, GetObjectCommand,PutObjectCommand} from '@aws-sdk/client-s3'
import { s3Client } from "../config/s3Client"
const {AWS_S3_BUCKETS_NAME} = process.env
export const putObject=async (fileName:string,contentType:string,type:string)=>{
    try {
        const path = await types(type)
        const command = new PutObjectCommand({
            Bucket:AWS_S3_BUCKETS_NAME,
            Key:`${path}${Date.now()}-${fileName}`,
            ContentType:contentType
        })
        return await getSignedUrl(s3Client,command)
    } catch (err) {
        throw err
    }
}

export const deleteObject =async (url:string) => {
    try {
        if(!url)throw new Error('url not found')
        console.log(url,'🚀🚀🚀🚀');
        
        const key = url.replace('https://getchat-posts.s3.us-east-1.amazonaws.com/','')
        console.log('👨‍💻👨‍💻👨‍💻',key);
        
        const command = new DeleteObjectCommand({
            Bucket:AWS_S3_BUCKETS_NAME,
            Key:key
        })
        await s3Client.send(command)
        return true
    } catch (err) {
        throw err
    }
    
}

const types = (type:string)=>{
    if(type=='post'){
        return 'getchat/posts/'
    }else if(type=='profile'){
        return 'getchat/profile/'
    }
}

