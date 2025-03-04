import { generateKeyPair } from "crypto";
import NodeRSA from "node-rsa";

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

export const generateRandomAESKey = (): string => {
  // Create a 16-byte array to hold the key
  const keyBytes = new Uint8Array(16);

  // Fill the array with random values
  crypto.getRandomValues(keyBytes);

  // Convert the key bytes to base64 URL-safe format using a different approach
  const base64Key = Buffer.from(keyBytes).toString("base64");

  // Convert the base64 string to a URL-safe base64 string
  return base64Key.replace(/\+/g, "-").replace(/\//g, "_");
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
  const rsaPublicKey = await loadPublicKey();
  let aesKey = generateRandomAESKey();
  const encData = await encryptDataByAes(data, aesKey);
  const encrypter = new NodeRSA(rsaPublicKey!, "pkcs1-public-pem");
  const encrypted = encrypter.encrypt(aesKey, "base64");
  aesKey = encrypted;
  return { encData: encData, aesKey: aesKey };
};
