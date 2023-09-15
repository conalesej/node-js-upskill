const Router = require("express");
import User from "../database/schemas/User";
import { hashPassword } from "../utils/helper";
export const router = Router();

router.post("/login", (request, response) => {
  const { username, password } = request.body;

  if (username && password) {
    if (request.session.user) {
      response.send("You are already logged in");
    } else {
      request.session.user = {
        username: username,
      };
    }
    response.send(request.session);
  } else {
    response.send(401);
  }
});

router.post("/register", async (request, response) => {
  const { username, password, email } = request.body;
  const userDB = await User.findOne({ $or: [{ username }, { email }] });
  if (userDB) {
    response.status(400).send({ message: "User already exists!" });
  } else {
    const hashedPassword = hashPassword(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    response
      .status(201)
      .send({ message: `Hi ${username}, you have already registered` });
    // const savedUser = (await newUser).save(); You can just not do this shit. Create handles it
  }
});
