const User = require("../models/User");
const admin = require("../confiq/fireBase");
const adminPhoneNumbers = process.env.ADMIN_PHONES?.split(",") || [];

const createUserWithPhone = async (req, res) => {
  try {
    const { idToken } = req.query;
    if (!idToken) {
      return res.status(400).json({ message: "idToken is required in query" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const phoneNumber = decodedToken.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number not found in token" });
    }

    const adminPhoneNumbers = process.env.ADMIN_PHONES?.split(",") || [];

    let user = await User.findOne({ phone: phoneNumber });
    let isNewUser = false;

    if (!user) {
      const role = adminPhoneNumbers.includes(phoneNumber) ? "admin" : "user";
      user = new User({ phone: phoneNumber, role });
      await user.save();
      isNewUser = true;
    }

    res.status(200).json({ 
      message: "User logged in", 
      phone: phoneNumber,
      isNewUser,
      user 
    });
  } catch (error) {
    console.error("Error in verifying token:", error);
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

const completeUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, dob, upi } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.dob = dob || user.dob;
    user.upi = upi || user.upi;
    user.isProfileCompleted = true;

    await user.save();

    res.status(200).json({ message: "Profile completed", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v -_id -createdAt -updatedAt");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, dob, upi } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (dob) user.dob = dob;
    if (upi) user.upi = upi;

    await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email query is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndDelete({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserWithPhone,
  completeUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUser,
  getUserByEmail,
};
