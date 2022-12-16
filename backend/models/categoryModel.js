const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    email_category: {type: String, required: true},
    incomeCategory: [String],
    expenseCategory: [String]
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;