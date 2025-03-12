import { generateKeyPair } from "crypto";
import crypto from "crypto";
import NodeRSA from "node-rsa";
import forge from "node-forge";

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
export const generateRandomAESKey = (): string => {
  // توليد مفتاح AES بطول 128 بت (16 بايت)
  const key = forge.random.getBytesSync(16);

  // تحويل المفتاح إلى Base64 (مع تعديل ليتوافق مع URL-safe encoding)
  return forge.util.encode64(key).replace(/\+/g, "-").replace(/\//g, "_");
};

// export const encryptDataByAes = async (data: string, aesKey: string) => {
//   const aesKeyBuffer = new TextEncoder().encode(aesKey);
//   // const iv = crypto.getRandomValues(new Uint8Array(12));
//   const ivBytes = forge.random.getBytesSync(12); // توليد IV بطول 12 بايت
//   const iv = new Uint8Array(ivBytes.split("").map((c) => c.charCodeAt(0)));

//   const key = await crypto.subtle.importKey(
//     "raw", // The format of the key
//     aesKeyBuffer, // The raw key data (ArrayBuffer)
//     { name: "AES-GCM" }, // Algorithm: AES-GCM
//     false, // Not extractable
//     ["encrypt"] // The key will be used for encryption
//   );
//   const dataBuffer = new TextEncoder().encode(data);
//   // تشفير البيانات باستخدام AES-GCM في JavaScript
//   const encryptedData = await crypto.subtle.encrypt(
//     {
//       name: "AES-GCM", // خوارزمية AES-GCM
//       iv: iv, // IV العشوائي
//     },
//     key, // المفتاح (AES key)
//     dataBuffer // البيانات التي نريد تشفيرها (محولة إلى ArrayBuffer)
//   );
//   const encryptedArray = new Uint8Array(encryptedData);

//   // تحويل البيانات المشفرة و IV إلى Base64
//   const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
//   const ivBase64 = btoa(String.fromCharCode(...iv));

//   // إرجاع البيانات المشفرة و IV في تنسيق "encryptedData.iv"
//   return `${encryptedBase64}.${ivBase64}`;
// };

export const encryptDataByAes = async (data: string, aesKey: string) => {
  // Generate a 12-byte IV using node-forge
  const ivBytes = forge.random.getBytesSync(12);

  // Create AES-GCM cipher with the provided key and generated IV
  const cipher = forge.cipher.createCipher("AES-GCM", aesKey);
  cipher.start({ iv: ivBytes });

  // Encrypt the data
  cipher.update(forge.util.createBuffer(data, "utf8"));
  cipher.finish();

  // Get the encrypted data
  const encryptedBytes = cipher.output.getBytes();
  // Get the authentication tag (GCM-specific)
  const tag = cipher.mode.tag.getBytes();

  // Concatenate encrypted data and tag
  const encryptedWithTag = encryptedBytes + tag;

  // Convert to Base64
  const encryptedBase64 = forge.util.encode64(encryptedWithTag);
  const ivBase64 = forge.util.encode64(ivBytes);

  // Return in the same format: "encryptedData.iv"
  return `${encryptedBase64}.${ivBase64}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encryptData = async (data: any) => {
  const rsaPublicKey = (await loadPublicKey()) as unknown as string;
  console.log("load public key ", rsaPublicKey);
  let aesKey = await generateRandomAESKey();
  console.log("generate rsa key ", aesKey);
  const encData = await encryptDataByAes(data, aesKey);
  console.log("encryptData", encData);

  const dataBuffer = Buffer.from(aesKey, "utf8");
  console.log("dataBuffer", dataBuffer);
  // -------------this from debug--------------------------
  const encryptedDataBuffer = crypto.publicEncrypt(
    {
      key: rsaPublicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    dataBuffer
  );

  console.log("encrypted buffer key", encryptedDataBuffer);

  const encryprtedData = forge.util.encode64(
    forge.pki.publicKeyFromPem(rsaPublicKey).encrypt(aesKey, "RSAES-PKCS1-V1_5")
  );
  console.log("encrpt aes", encryprtedData);
  // Convert the encrypted Buffer to a Base64 string
  aesKey = encryptedDataBuffer.toString("base64");
  console.log("aesKey in base64", aesKey);
  return { encData: encData, aesKey: aesKey };
};

export const decryptDataByAes = async (
  encryptedDataWithIv: string,
  aesKeyBase64: string
): Promise<string> => {
  try {
    // Split the encrypted data and IV
    const [encryptedBase64, ivBase64] = encryptedDataWithIv.split(".");

    // Decode from Base64
    const encryptedWithTag = forge.util.decode64(encryptedBase64);
    const ivBytes = forge.util.decode64(ivBase64);

    // Decode the Base64 AES key back to raw bytes
    const aesKey = forge.util.decode64(
      aesKeyBase64.replace(/-/g, "+").replace(/_/g, "/")
    );

    // Extract encrypted data and tag (GCM tag is typically 16 bytes)
    const tagLength = 16;
    const encryptedBytes = encryptedWithTag.slice(0, -tagLength);
    const tag = encryptedWithTag.slice(-tagLength);

    // Create decipher
    const decipher = forge.cipher.createDecipher("AES-GCM", aesKey);
    decipher.start({
      iv: ivBytes,
      tag: forge.util.createBuffer(tag),
    });

    // Decrypt the data
    decipher.update(forge.util.createBuffer(encryptedBytes));
    const success = decipher.finish();

    if (!success) {
      throw new Error("Decryption failed - invalid key or corrupted data");
    }

    return decipher.output.toString();
  } catch (error) {
    throw new Error(`AES decryption failed: ${(error as Error).message}`);
  }
};

// ---------------------------------------- is working very good in local ---------------------------------
// import { generateKeyPair } from "crypto";
// import crypto from "crypto";
// import NodeRSA from "node-rsa";
// import forge from "node-forge";

// // // ------------ يعمل بشكل صحيح---------------------------
// export async function generateKeys() {
//   return new Promise((resolve, reject) => {
//     generateKeyPair(
//       "rsa",
//       {
//         modulusLength: 2048,
//         publicKeyEncoding: {
//           type: "spki",
//           format: "pem",
//         },
//         privateKeyEncoding: {
//           type: "pkcs1",
//           format: "pem",
//         },
//       },
//       (err, publicKey, privateKey) => {
//         if (err) {
//           reject(err);
//         } else {
//           // console.log("result:", privateKey);

//           resolve([publicKey, privateKey]);
//         }
//       }
//     );
//   });
// }

// // export const generateRandomAESKey = (): string => {
// //   // Create a 16-byte array to hold the key
// //   const keyBytes = new Uint8Array(16);

// //   // Fill the array with random values
// //   crypto.getRandomValues(keyBytes);

// //   // Convert the key bytes to base64 URL-safe format using a different approach
// //   const base64Key = Buffer.from(keyBytes).toString("base64");

// //   // Convert the base64 string to a URL-safe base64 string
// //   return base64Key.replace(/\+/g, "-").replace(/\//g, "_");
// // };
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
// export const generateRandomAESKey = (): string => {
//   // توليد مفتاح AES بطول 128 بت (16 بايت)
//   const key = forge.random.getBytesSync(16);

//   // تحويل المفتاح إلى Base64 (مع تعديل ليتوافق مع URL-safe encoding)
//   return forge.util.encode64(key).replace(/\+/g, "-").replace(/\//g, "_");
// };

// // export const encryptDataByAes = async (data: string, aesKey: string) => {
// //   const aesKeyBuffer = new TextEncoder().encode(aesKey);
// //   // const iv = crypto.getRandomValues(new Uint8Array(12));
// //   const ivBytes = forge.random.getBytesSync(12); // توليد IV بطول 12 بايت
// //   const iv = new Uint8Array(ivBytes.split("").map((c) => c.charCodeAt(0)));

// //   const key = await crypto.subtle.importKey(
// //     "raw", // The format of the key
// //     aesKeyBuffer, // The raw key data (ArrayBuffer)
// //     { name: "AES-GCM" }, // Algorithm: AES-GCM
// //     false, // Not extractable
// //     ["encrypt"] // The key will be used for encryption
// //   );
// //   const dataBuffer = new TextEncoder().encode(data);
// //   // تشفير البيانات باستخدام AES-GCM في JavaScript
// //   const encryptedData = await crypto.subtle.encrypt(
// //     {
// //       name: "AES-GCM", // خوارزمية AES-GCM
// //       iv: iv, // IV العشوائي
// //     },
// //     key, // المفتاح (AES key)
// //     dataBuffer // البيانات التي نريد تشفيرها (محولة إلى ArrayBuffer)
// //   );
// //   const encryptedArray = new Uint8Array(encryptedData);

// //   // تحويل البيانات المشفرة و IV إلى Base64
// //   const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
// //   const ivBase64 = btoa(String.fromCharCode(...iv));

// //   // إرجاع البيانات المشفرة و IV في تنسيق "encryptedData.iv"
// //   return `${encryptedBase64}.${ivBase64}`;
// // };

// export const encryptDataByAes = async (data: string, aesKey: string) => {
//   // Generate a 12-byte IV using node-forge
//   const ivBytes = forge.random.getBytesSync(12);

//   // Create AES-GCM cipher with the provided key and generated IV
//   const cipher = forge.cipher.createCipher("AES-GCM", aesKey);
//   cipher.start({ iv: ivBytes });

//   // Encrypt the data
//   cipher.update(forge.util.createBuffer(data, "utf8"));
//   cipher.finish();

//   // Get the encrypted data
//   const encryptedBytes = cipher.output.getBytes();
//   // Get the authentication tag (GCM-specific)
//   const tag = cipher.mode.tag.getBytes();

//   // Concatenate encrypted data and tag
//   const encryptedWithTag = encryptedBytes + tag;

//   // Convert to Base64
//   const encryptedBase64 = forge.util.encode64(encryptedWithTag);
//   const ivBase64 = forge.util.encode64(ivBytes);

//   // Return in the same format: "encryptedData.iv"
//   return `${encryptedBase64}.${ivBase64}`;
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const encryptData = async (data: any) => {
//   // Your encryption logic here
//   const rsaPublicKey = (await loadPublicKey()) as unknown as string;
//   let aesKey = await generateRandomAESKey();
//   const encData = await encryptDataByAes(data, aesKey);
//   // const encrypter = new NodeRSA(rsaPublicKey!, "pkcs1-public-pem");
//   // const encrypted = encrypter.encrypt(aesKey, "base64");
//   // aesKey = encrypted;
//   const dataBuffer = Buffer.from(aesKey, "utf8");

//   const encryptedDataBuffer = crypto.publicEncrypt(
//     {
//       key: rsaPublicKey,
//       padding: crypto.constants.RSA_PKCS1_PADDING,
//     },
//     dataBuffer
//   );

//   // Convert the encrypted Buffer to a Base64 string
//   aesKey = encryptedDataBuffer.toString("base64");

//   return { encData: encData, aesKey: aesKey };
// };

// export const decryptDataByAes = async (
//   encryptedDataWithIv: string,
//   aesKeyBase64: string
// ): Promise<string> => {
//   try {
//     // Split the encrypted data and IV
//     const [encryptedBase64, ivBase64] = encryptedDataWithIv.split(".");

//     // Decode from Base64
//     const encryptedWithTag = forge.util.decode64(encryptedBase64);
//     const ivBytes = forge.util.decode64(ivBase64);

//     // Decode the Base64 AES key back to raw bytes
//     const aesKey = forge.util.decode64(
//       aesKeyBase64.replace(/-/g, "+").replace(/_/g, "/")
//     );

//     // Extract encrypted data and tag (GCM tag is typically 16 bytes)
//     const tagLength = 16;
//     const encryptedBytes = encryptedWithTag.slice(0, -tagLength);
//     const tag = encryptedWithTag.slice(-tagLength);

//     // Create decipher
//     const decipher = forge.cipher.createDecipher("AES-GCM", aesKey);
//     decipher.start({
//       iv: ivBytes,
//       tag: forge.util.createBuffer(tag),
//     });

//     // Decrypt the data
//     decipher.update(forge.util.createBuffer(encryptedBytes));
//     const success = decipher.finish();

//     if (!success) {
//       throw new Error("Decryption failed - invalid key or corrupted data");
//     }

//     return decipher.output.toString();
//   } catch (error) {
//     throw new Error(`AES decryption failed: ${(error as Error).message}`);
//   }
// };
