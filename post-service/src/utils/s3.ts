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
        const {AWS_BASE_URL} = process.env
        if(!AWS_BASE_URL) throw new Error('missing aws base url')
        if(!url)throw new Error('url not found')
        console.log(url,'🚀🚀🚀🚀');
        
        const key = url.replace(AWS_BASE_URL,'')
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
    }else if(type=='audio'){
        return 'getchat/chat/audio'
    }else if('chatImage'){
        return 'getchat/chat/image'
    }
}

