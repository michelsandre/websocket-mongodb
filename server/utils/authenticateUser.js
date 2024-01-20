import { scryptSync, timingSafeEqual } from "crypto";

function authenticateUser(password, user) {
  const hashTest = scryptSync(password, user.saltPass, 64);

  const hashReal = Buffer.from(user.hashPass, "hex");

  const authenticate = timingSafeEqual(hashTest, hashReal);

  return authenticate;
}

export default authenticateUser;
