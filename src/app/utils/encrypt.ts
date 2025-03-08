import { generateKeyPair } from "crypto";

import forge from "node-forge";

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

// export const loadPublicKey = () => {
//   try {
//     // Fetch the public key from the environment variable
//     const publicKeyString = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY || "";
//     if (!publicKeyString) {
//       throw new Error("RSA Public Key is not defined in the environment");
//     }
//     // Initialize NodeRSA with the public key from the .env file
//     const key = new NodeRSA();
//     key.importKey(publicKeyString, "pkcs1-public-pem");
//     return publicKeyString;
//   } catch (error) {
//     console.error("Error loading public key:", error);
//   }
// };

export const loadPublicKey = () => {
  try {
    // جلب المفتاح العام من المتغير البيئي
    const publicKeyString = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY || "";
    if (!publicKeyString) {
      throw new Error("RSA Public Key is not defined in the environment");
    }

    // تحويل المفتاح العام من PEM إلى كائن مفتاح عام باستخدام node-forge
    const publicKey = forge.pki.publicKeyFromPem(publicKeyString);

    return publicKey;
  } catch (error) {
    console.error("Error loading public key:", error);
    return null;
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
export const generateRandomAESKey = (): string => {
  // توليد مفتاح AES عشوائي بحجم 16 بايت (128 بت)
  const keyBytes = forge.random.getBytesSync(16);

  // تحويل المفتاح إلى Base64
  const base64Key = forge.util.encode64(keyBytes);

  // تحويل Base64 إلى صيغة URL-safe
  return base64Key.replace(/\+/g, "-").replace(/\//g, "_");
};

export const encryptDataByAesOld = async (data: string, aesKey: string) => {
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

export const encryptDataByAes = (
  data: string,
  aesKeyBase64: string
): string => {
  try {
    // تحويل مفتاح AES من Base64 إلى Bytes
    const aesKey = forge.util.decode64(aesKeyBase64);

    // توليد IV عشوائي بحجم 12 بايت (كما في AES-GCM)
    const iv = forge.random.getBytesSync(12);

    // تهيئة Cipher باستخدام AES-GCM
    const cipher = forge.cipher.createCipher("AES-GCM", aesKey);
    cipher.start({ iv: iv });

    // إدخال البيانات وتشفيرها
    cipher.update(forge.util.createBuffer(data, "utf8"));
    cipher.finish();

    // استخراج النص المشفر ووسم المصادقة (Tag)
    const encryptedBytes = cipher.output.getBytes();
    const tag = cipher.mode.tag.getBytes(); // الحصول على Tag من AES-GCM

    // تحويل البيانات إلى Base64
    const encryptedBase64 = forge.util.encode64(encryptedBytes + tag);
    const ivBase64 = forge.util.encode64(iv);

    // إرجاع النص المشفر + IV بنفس الصيغة `encryptedData.iv`
    return `${encryptedBase64}.${ivBase64}`;
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};

// ----------------------------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const encryptDataold = async (data: any) => {
//   // Your encryption logic here
//   const rsaPublicKey = await loadPublicKey();
//   let aesKey = generateRandomAESKey();
//   console.log("from old", aesKey);
//   const encData = await encryptDataByAes(data, aesKey);
//   const encrypter = new NodeRSA(rsaPublicKey!, "pkcs1-public-pem");
//   const encrypted = encrypter.encrypt(aesKey, "base64");
//   aesKey = encrypted;
//   return { encData: encData, aesKey: aesKey };
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encryptData = async (data: any) => {
  try {
    // تحميل المفتاح العام
    const rsaPublicKey = loadPublicKey();
    if (!rsaPublicKey) {
      throw new Error("Failed to load RSA public key");
    }

    // توليد مفتاح AES عشوائي
    let aesKey = generateRandomAESKey();
    console.log(aesKey);
    // تشفير البيانات باستخدام AES-GCM
    const encData = encryptDataByAes(data, aesKey);

    // تشفير مفتاح AES باستخدام المفتاح العام RSA
    const encryptedAesKey = rsaPublicKey.encrypt(
      forge.util.decode64(aesKey),
      "RSAES-PKCS1-V1_5"
    );

    // تحويل المفتاح المشفر إلى Base64
    aesKey = forge.util.encode64(encryptedAesKey);

    return { encData: encData, aesKey: aesKey };
  } catch (error) {
    console.error("Encryption process error:", error);
    return null;
  }
};

// ------------ يعمل بشكل صحيح----------------------------
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
    const tag = encryptedBytesWithTag.slice(-tagLength);

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
