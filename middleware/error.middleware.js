const errorMiddleware = (err, req, res, next) => {
    console.error(err);
  
    // Неверный MongoDB ObjectId
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID"
      });
    }
  
    // Ошибка валидации Mongoose
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message
      }));
  
      return res.status(400).json({
        success: false,
        message: "Ошибка валидации",
        errors
      });
    }
  
    // Остальные ошибки
    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера"
    });
  };
  
  module.exports = errorMiddleware;