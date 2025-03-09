import { generateKeyPair, randomBytes } from "crypto";
import crypto from "crypto";
import NodeRSA from "node-rsa";
import forge from "node-forge";

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";
// // ------------ يعمل بشكل صحيح---------------------------
export async function generateKeys() {
  return new Promise((resolve, reject) => {
    generateKeyPair(
      "rsa",
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        } else {
          // console.log("result:", privateKey);

          resolve([publicKey, privateKey]);
        }
      }
    );
  });
}

export const loadPublicKey = () => {
  try {
    // Fetch the public key from the environment variable
    const publicKeyString = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY || "";

    if (!publicKeyString) {
      throw new Error("RSA Public Key is not defined in the environment");
    }

    // Initialize NodeRSA with the public key from the .env file
    const key = new NodeRSA();
    key.importKey(publicKeyString, "pkcs1-public-pem");
    return publicKeyString;
  } catch (error) {
    console.error("Error loading public key:", error);
  }
};

// export const generateRandomAESKey = (): string => {
//   // Create a 16-byte array to hold the key
//   const keyBytes = new Uint8Array(16);

//   // Fill the array with random values
//   crypto.getRandomValues(keyBytes);

//   // Convert the key bytes to base64 URL-safe format using a different approach
//   const base64Key = Buffer.from(keyBytes).toString("base64");

//   // Convert the base64 string to a URL-safe base64 string
//   return base64Key.replace(/\+/g, "-").replace(/\//g, "_");
// };

// export const generateRandomAESKey = async (): Promise<string> => {
//   // تأكد من توفر Web Crypto API
//   if (!crypto || !crypto.subtle) {
//     throw new Error("Web Crypto API is not available in this environment.");
//   }

//   // توليد مفتاح AES عشوائي باستخدام `crypto.subtle.generateKey`
//   const key = await crypto.subtle.generateKey(
//     { name: "AES-GCM", length: 128 },
//     true, // المفتاح يمكن استخدامه للتشفير وفك التشفير
//     ["encrypt", "decrypt"]
//   );

//   // تحويل المفتاح إلى بيانات قابلة للتخزين (مثل base64 URL-safe format)
//   const exportedKey = await crypto.subtle.exportKey("raw", key);
//   const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));

//   // تحويل base64 إلى base64 URL-safe format
//   return base64Key.replace(/\+/g, "-").replace(/\//g, "_");
// };

export const generateRandomAESKey = async (): Promise<string> => {
  if (isBrowser) {
    if (!crypto || !crypto.subtle) {
      throw new Error("Web Crypto API is not available in this environment.");
    }
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 128 },
      true,
      ["encrypt", "decrypt"]
    );
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
    return base64Key.replace(/\+/g, "-").replace(/\//g, "_");
  } else {
    const key = randomBytes(16);
    return key.toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
  }
};
export const encryptDataByAes = async (data: string, aesKey: string) => {
  const aesKeyBuffer = new TextEncoder().encode(aesKey);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey(
    "raw", // The format of the key
    aesKeyBuffer, // The raw key data (ArrayBuffer)
    { name: "AES-GCM" }, // Algorithm: AES-GCM
    false, // Not extractable
    ["encrypt"] // The key will be used for encryption
  );
  const dataBuffer = new TextEncoder().encode(data);
  // تشفير البيانات باستخدام AES-GCM في JavaScript
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM", // خوارزمية AES-GCM
      iv: iv, // IV العشوائي
    },
    key, // المفتاح (AES key)
    dataBuffer // البيانات التي نريد تشفيرها (محولة إلى ArrayBuffer)
  );
  const encryptedArray = new Uint8Array(encryptedData);

  // تحويل البيانات المشفرة و IV إلى Base64
  const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
  const ivBase64 = btoa(String.fromCharCode(...iv));

  // إرجاع البيانات المشفرة و IV في تنسيق "encryptedData.iv"
  return `${encryptedBase64}.${ivBase64}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encryptData = async (data: any) => {
  // Your encryption logic here
  const rsaPublicKey = (await loadPublicKey()) as unknown as string;
  let aesKey = await generateRandomAESKey();

  const encData = await encryptDataByAes(data, aesKey);
  // const encrypter = new NodeRSA(rsaPublicKey!, "pkcs1-public-pem");
  // const encrypted = encrypter.encrypt(aesKey, "base64");
  // aesKey = encrypted;
  const dataBuffer = Buffer.from(aesKey, "utf8");

  const encryptedDataBuffer = crypto.publicEncrypt(
    {
      key: rsaPublicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    dataBuffer
  );

  // Convert the encrypted Buffer to a Base64 string
  aesKey = encryptedDataBuffer.toString("base64");

  return { encData: encData, aesKey: aesKey };
};

export const decryptDataByAes = (
  encryptedData: string,
  aesKeyBase64: string
): string => {
  try {
    // تحويل مفتاح AES من Base64 إلى Bytes
    const aesKey = forge.util.decode64(aesKeyBase64);

    // تقسيم النص المشفر للحصول على `encryptedBase64` و `ivBase64`
    const [encryptedBase64, ivBase64] = encryptedData.split(".");

    // تحويل `encryptedBase64` و `ivBase64` من Base64 إلى Bytes
    const encryptedBytesWithTag = forge.util.decode64(encryptedBase64);
    const iv = forge.util.decode64(ivBase64);

    // استخراج النص المشفر و Tag المصادقة (آخر 16 بايت من النص المشفر)
    const tagLength = 16; // AES-GCM يستخدم 16 بايت لـ Tag
    const encryptedBytes = encryptedBytesWithTag.slice(0, -tagLength);
    const tag = encryptedBytesWithTag.slice(
      -tagLength
    ) as unknown as forge.util.ByteStringBuffer;
    // const tag = encryptedBytesWithTag.slice(-tagLength) ;

    // تهيئة الـ Decipher
    const decipher = forge.cipher.createDecipher("AES-GCM", aesKey);
    decipher.start({ iv: iv, tag: tag });

    // إدخال البيانات المشفرة لفك التشفير
    decipher.update(forge.util.createBuffer(encryptedBytes));

    // التحقق مما إذا كان فك التشفير ناجحًا
    const success = decipher.finish();
    if (!success) {
      throw new Error("Decryption failed: Authentication tag does not match.");
    }

    // إرجاع النص المفكوك تشفيره
    return decipher.output.toString();
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
