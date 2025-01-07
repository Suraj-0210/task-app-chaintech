import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token expiration
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Prevent access to the cookie via client-side JS
    sameSite: process.env.NODE_ENV === "Prod" ? "strict" : "lax", // Use lax in development
    secure: process.env.NODE_ENV === "Prod", // Use secure cookies in production
  });

  console.log("Token and cookie successfully generated");
};

export default generateTokenAndSetCookie;
