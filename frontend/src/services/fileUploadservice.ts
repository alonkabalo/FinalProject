import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";


export async function uploadFile(path: string, file: File) {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = async () => {
            try {
                const result = fileReader.result as ArrayBuffer 
                const uploadedRef = await uploadBytes(ref(storage, path), result)
                const downloadUrl = await getDownloadURL(uploadedRef.ref)
                resolve(downloadUrl)
            } catch(e) {
                reject(e)
            }
        }
        fileReader.onerror = () => {
            reject(fileReader.error)
        }

        fileReader.readAsArrayBuffer(file)
    })
}