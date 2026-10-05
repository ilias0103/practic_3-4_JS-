const Product = require("../models/product.model");

// Создать товар
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Товар успешно создан",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Получить все товары
const getProducts = async (req, res, next) => {
    try {
      const {
        category,
        search,
        sort,
        page = 1,
        limit = 5
      } = req.query;
  
      const filter = {};
  
      // Фильтрация по категории
      if (category) {
        filter.category = category;
      }
  
      // Поиск по названию
      if (search) {
        filter.name = {
          $regex: search,
          $options: "i"
        };
      }
  
      // Сортировка
      let sortOption = {};
  
      if (sort === "price_asc") {
        sortOption = { price: 1 };
      }
  
      if (sort === "price_desc") {
        sortOption = { price: -1 };
      }
  
      const pageNumber = Math.max(Number(page), 1);
      const limitNumber = Math.max(Number(limit), 1);
      const skip = (pageNumber - 1) * limitNumber;
  
      // Общее количество с учётом фильтров
      const total = await Product.countDocuments(filter);
  
      // Получение товаров
      const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber);
  
      const pages = Math.ceil(total / limitNumber);
  
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total,
          pages
        }
      });
    } catch (error) {
      next(error);
    }
  };

// Получить товар по ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Товар не найден"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Изменить товар
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Товар не найден"
      });
    }

    res.status(200).json({
      success: true,
      message: "Товар успешно изменён",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Удалить товар
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Товар не найден"
      });
    }

    res.status(200).json({
      success: true,
      message: "Товар успешно удалён",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};