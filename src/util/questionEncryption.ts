import * as CryptoJS from "crypto-js";

export const decryptQuestion = (encryptedQuestion: string): any => {
    const decryptedData =
        CryptoJS.AES.decrypt(decodeURIComponent(encryptedQuestion), process.env.AES_ENCRYPTION_KEY!);
    return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
}

export const encryptQuestion = (question: any): any => {
    return encodeURIComponent(
        CryptoJS.AES.encrypt(JSON.stringify(question), process.env.AES_ENCRYPTION_KEY!).toString()
    );
}