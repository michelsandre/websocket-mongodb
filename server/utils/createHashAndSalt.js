import { randomBytes, scryptSync } from "crypto";

function createHashAndSalt(password) {
  //Salt e Hash ajudam a criptografar a senha digitada

  const saltPass = randomBytes(16).toString("hex");

  const hashPass = scryptSync(password, saltPass, 64).toString("hex");

  return { saltPass, hashPass };
}

export default createHashAndSalt;
