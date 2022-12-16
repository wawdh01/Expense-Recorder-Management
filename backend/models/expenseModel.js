const mongoose = require('mongoose');

const expenseRecord = mongoose.Schema({
    category: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
    },{
        timestamps: true,
})

const expenseSchema = mongoose.Schema({
    email_expense: { type: String, required: true , unique: true },
    expenseRecord: [expenseRecord]
});

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;