const Router = require("express");

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
  }
});
