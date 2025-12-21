import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { encrypt, decrypt, hashAadhar } from "../utils/encryption.js";

// API to register user
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, aadhar } = req.body;
//     //check if all fields are available
//     if (!name || !email || !password || !aadhar) {
//       return res.status(400).json({ message: "All fields required" });
//     }
//     //validation aadhar length
//     if (aadhar.length !== 12) {
//       return res.status(400).json({ message: "Invalid Aadhar number" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     //HASHING PASSWORD
//     const hashedPassword = await bcrypt.hash(password, 10);

//     //ENCRYPTING AADHAR TO STORE IN DB
//     const encryptedAadhar = encrypt(aadhar);
//     const aadharExists=await User.findOne({encryptedAadhar});
//     if(aadharExists){
//       return res.status(400).json({ message: "Aadhar already exists" });
//     }

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       aadhar: encryptedAadhar.content,
//       iv: encryptedAadhar.iv,
//     });

//     res.status(201).json({ message: "User Registered" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, aadhar } = req.body;

    if (!name || !email || !password || !aadhar) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!/^\d{12}$/.test(aadhar)) {
      return res.status(400).json({ message: "Invalid Aadhaar number" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔑 HASH Aadhaar (deterministic)
    const aadharHash = hashAadhar(aadhar);

    // ✅ Correct duplicate check
    if (await User.findOne({ aadharHash })) {
      return res.status(400).json({ message: "Aadhaar already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔐 Encrypt Aadhaar
    const encryptedAadhar = encrypt(aadhar);

    await User.create({
      name,
      email,
      password: hashedPassword,
      aadhar: encryptedAadhar.content,
      iv: encryptedAadhar.iv,
      aadharHash
    });

    res.status(201).json({ message: "User Registered" });

  } catch (err) {
    // MongoDB unique index protection
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate Aadhaar or Email" });
    }
    res.status(500).json({ message: err.message });
  }
};

// API TO LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* API TO GET USER DATA */
export const getUserData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let decryptedAadhar = "Not available";
    if (req.user.aadhar && req.user.iv) {
      decryptedAadhar = decrypt(req.user.aadhar, req.user.iv);
    }

    res.json({
      name: req.user.name,
      email: req.user.email,
      aadhar: decryptedAadhar,
    });
  } catch (error) {
    console.error("getUserData error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
