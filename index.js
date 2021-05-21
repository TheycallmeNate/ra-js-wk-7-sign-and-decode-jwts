const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

const secret = "goDyzaLehTrevOdepmuJxoFnworBkciuQehT";

app.post(
  "/sign-token",
  body("firstName", "First name is required").isLength({ min: 1 }),
  body("lastName", "Last name is required").notEmpty(),
  body("id", "ID is required and must be a number").isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(418).json({ errors: errors.array() });
    }
    const payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: req.body.id,
    };

    // This was set to 600 and it expired before I was done with this assignment 😅
    const expiry = 604800;

    jwt.sign(payload, secret, { expiresIn: expiry }, (error, token) => {
      if (error) return res.status(500).json({ error });

      return res.status(200).json({ token });
    });
  }
);

app.get("/decode-token", (req, res) => {
  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(403).json({ message: "Bearer scheme required" });

  const token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) return res.status(500).json({ error });

    return res.status(200).json({ user: decodedToken });
  });
});

app.listen(5000, () => console.log("app started"));
