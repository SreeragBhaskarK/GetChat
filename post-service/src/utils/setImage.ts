/* import { firebaseConfig } from '../config/firebase'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const imageUploadFirebase = async (files:any) => {
    await initializeApp(firebaseConfig)
    const storage = getStorage();

    try {
        const storageRef = ref(storage, 'images/' + `${Date.now()}-${files.originalname}`);
        const snapshot = await uploadBytes(storageRef, files.buffer);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        throw error
    }
}

export default imageUploadFirebase */