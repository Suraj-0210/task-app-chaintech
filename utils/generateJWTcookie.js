import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 14 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "Local",
  });
};

export default generateTokenAndSetCookie;
