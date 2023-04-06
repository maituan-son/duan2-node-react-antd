import Category from "../models/categories";
import categorySchema from "../schemas/categories";
import Product from "../models/products";

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Lấy danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Lấy danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors.message,
      });
    }
    const categories = await Category.create(req.body);
    if (!categories) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const categories = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!categories) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Cập nhật danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const categories = await Category.findByIdAndDelete(req.params.id);
    if (!categories) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Xóa danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
