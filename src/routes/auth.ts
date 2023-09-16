const Router = require("express");
import User from "../database/schemas/User";
import { comparePassword, hashPassword } from "../utils/helper";
export const router = Router();

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password)
    return response
      .status(400)
      .send({ message: "Email or Password required!" });

  const userDB = await User.findOne({ email });
  if (!userDB) return response.send(401);

  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    request.session.user = userDB;
    return response.send(200);
  } else {
    return response.send(401);
  }
});

router.post("/register", async (request, response) => {
  const { password, email } = request.body;
  const userDB = await User.findOne({ $or: [{ email }] });
  if (userDB) {
    response.status(400).send({ message: "User already exists!" });
  } else {
    const hashedPassword = hashPassword(password);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    response
      .status(201)
      .send({ message: `Hi ${email}, you have already registered` });
    // const savedUser = (await newUser).save(); You can just not do this shit. Create handles it
  }
});
