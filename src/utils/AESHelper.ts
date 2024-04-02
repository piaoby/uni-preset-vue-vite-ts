import * as CryptoJS from "crypto-js";

const cbc_key = CryptoJS.enc.Utf8.parse("zhgd@bonus@zhgd@bonus@1234567890");
const cbc_iv = CryptoJS.enc.Utf8.parse("1234567812345678");
export default {
  // 加密
  encrypt(word: string) {
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, cbc_key, {
      iv: cbc_iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },

  // 解密
  decrypt(word: string) {
    const decrypt = CryptoJS.AES.decrypt(word, cbc_key, {
      iv: cbc_iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
};
