const Coupon = require("../models/Coupon");
const User = require("../models/User");
const Brand = require("../models/Brands");
const updateUserLevel = require("../utils/updateUserLevel");

const getCouponsByCategory = async (req, res) => {
    const { categoryName } = req.query;

    try {
        const coupons = await Coupon.find({ categoryName });

        if (coupons.length === 0) {
            return res.status(404).json({ message: "No coupons found for this category" });
        }

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({}, 'couponId userId brandName couponCode expireDate price termsAndConditionImage');
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCoupon = async (req, res) => {
  try {
    const {
      title,
      description,
      discount,
      expiryDate,
      brandName,
      categoryName,
      terms
    } = req.body;

    if (!brandName) {
      return res.status(400).json({ message: "brandName is required" });
    }

    // Find brand using case-insensitive match
    const brand = await Brand.findOne({
      brandName: { $regex: new RegExp(`^${brandName}$`, "i") }
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const newCoupon = new Coupon({
      title,
      description,
      discount,
      expiryDate,
      brandId: brand.brandId,
      categoryName,
      terms
    });

    const savedCoupon = await newCoupon.save();
    res.status(201).json(savedCoupon);
  } catch (error) {
    res.status(500).json({ message: "Failed to add coupon", error: error.message });
  }
};

const updateCouponStatus = async (req, res) => {
    const { couponId, status } = req.query;

    const allowedStatuses = ["approved", "rejected"];
    if (!couponId || !status) {
        return res.status(400).json({ message: "couponId and status are required in query" });
    }
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}` });
    }

    try {
        const coupon = await Coupon.findOneAndUpdate(
            { couponId },
            { status },
            { new: true }
        );

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.status(200).json({ message: `Coupon ${status}`, data: coupon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCouponById = async (req, res) => {
    const { couponId } = req.params;

    if (!couponId) {
        return res.status(400).json({ message: "Coupon ID is required" });
    }

    try {
        const coupon = await Coupon.findOne({ couponId });

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editCoupon = async (req, res) => {
    const { couponId } = req.params;
    const updates = req.body;

    try {
        const coupon = await Coupon.findOneAndUpdate(
            { couponId },
            updates,
            { new: true }
        );

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.status(200).json({ message: "Coupon updated successfully", data: coupon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCouponsByUser = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const coupons = await Coupon.find({ userId });

        if (coupons.length === 0) {
            return res.status(404).json({ message: "No coupons found for this user" });
        }

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addCoupon,
    getAllCoupons,
    getCouponsByCategory,
    updateCouponStatus,
    getCouponById,
    editCoupon,
    getCouponsByUser
};
