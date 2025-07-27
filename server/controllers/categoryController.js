const Category = require("../models/Category");
const Coupon = require("../models/Coupon");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, 'categoryId name');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await Category.findOne({ name });

    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = new Category({ name });
    await category.save();

    res.status(201).json({ message: "Category added successfully", category });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getCouponsByCategory = async (req, res) => {
  const { categoryName } = req.query;

  try {
    if (!categoryName) {
      return res.status(400).json({ message: "categoryName query parameter is required" });
    }

    const coupons = await Coupon.find({ categoryName });

    if (!coupons || coupons.length === 0) {
      return res.status(404).json({ message: "No coupons found for this category" });
    }

    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getCategories, addCategory, getCouponsByCategory };