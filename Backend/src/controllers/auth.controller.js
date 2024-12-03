import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export async function register(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
      isMfaActive: false,
    });

    newUser.password = undefined;

    res.status(201).json({
      message: "User registred",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Signup",
      error,
    });
  }
}
export async function login(req, res) {
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
}
export async function authStatus(req, res) {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({
      message: "Unauthroize user",
    });
  }
}
export async function logout(req, res) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized user" });

  req.logout((err) => {
    if (err) return res.status(400).json({ message: "user not logged in" });
    res.status(200).json({ message: "User logout successful" });
  });
}
export async function setup2FA(req, res) {
  try {
    const user = req.user;
    const secret = speakeasy.generateSecret();
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.deepakTala.com",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Error setting up 2FA" });
  }
}
export async function verify2FA(req, res) {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({ message: "2FA successful", token: jwtToken });
  } else {
    res.status(400).json({
      message: "Invalid 2FA token",
    });
  }
}
export async function reset2FA(req, res) {
  try {
    const { user } = req;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();
    res.status(200).json({
      message: "2FA reset Successful",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error reseting 2FA",
      message: error,
    });
  }
}
