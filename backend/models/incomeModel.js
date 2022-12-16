const mongoose = require('mongoose');

const incomeRecord = mongoose.Schema({
    category: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
    },{
        timestamps: true,
})

const incomeSchema = mongoose.Schema({
    email_income: { type: String, required: true , unique: true },
    incomeRecord: [incomeRecord]
});

const Income = mongoose.model("income", incomeSchema);

module.exports = Income;