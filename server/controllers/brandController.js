const Brand = require('../models/Brands');
const Coupon = require("../models/Coupon");

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ message: "Error fetching brands", error: err.message });
  }
};

const getCouponsByBrand = async (req, res) => {
  const { brandName } = req.query;

  if (!brandName) {
    return res.status(400).json({ message: "brandName is required" });
  }

  try {
    const brand = await Brand.findOne({
      brandName: { $regex: new RegExp(brandName, "i") }
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Search by brandId
    let coupons = await Coupon.find({ brandId: brand.brandId });

    // If not found by brandId, fallback to brandName (temporary support)
    if (coupons.length === 0) {
      coupons = await Coupon.find({
        brandName: { $regex: new RegExp(brandName, "i") }
      });
    }

    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Error fetching coupons by brand", error: err.message });
  }
};


module.exports = {
  getAllBrands,
  getCouponsByBrand
};