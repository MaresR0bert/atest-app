import * as CryptoJS from "crypto-js";
import {environment} from "../../environments/environment.development";

export default class Utils {
  static encryptQuestion = (currentQuestion: any): string => {
    return encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(currentQuestion),
      environment.AES_ENCRYPTION_KEY).toString());
  }

  static decryptQuestion = (encryptedQuestion: any): any => {
    const decryptedQuestion = CryptoJS.AES.decrypt(
      decodeURIComponent(encryptedQuestion), environment.AES_ENCRYPTION_KEY
    );
    return JSON.parse(decryptedQuestion.toString(CryptoJS.enc.Utf8));
  }

  static compareQuestionsByCreateDate = (q1: any, q2: any) => {
    if (q1.createdAt < q2.createdAt) {
      return -1;
    }
    if (q1.createdAt > q2.createdAt) {
      return 1;
    }
    return 0;
  }
}
