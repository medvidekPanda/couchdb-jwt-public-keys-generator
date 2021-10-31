import { createPublicKey } from "crypto";
import got from "got";

const getPublicKey = (key, value) => {
  const publicKey = createPublicKey(value).export({
    type: "spki",
    format: "pem",
  });
  const objectKey = `rsa:${key}`;
  return { [objectKey]: publicKey };
};

export const getCertificates = async (url) => {
  let finalCertificates = {};
  const response = await got(url);
  const certificates = JSON.parse(response.body);
  for (const [key, value] of Object.entries(certificates)) {
    Object.assign(finalCertificates, getPublicKey(key, value));
  }
  return finalCertificates;
};

export const putDatabaseSettings = async (certificates) => {
  const baseUrl =
    "https://admin:<pass>@<host>:<port>/_node/nonode@nohost/_config/jwt_keys";
  for (const [key, value] of Object.entries(certificates)) {
    const url = `${baseUrl}/${key}`;
    const finalValue = JSON.stringify(value).replace(/\"/g, "");
    const response = await got.put(url, { json: finalValue });
    console.log("response", response);
  }
};
