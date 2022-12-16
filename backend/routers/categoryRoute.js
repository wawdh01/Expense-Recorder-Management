const router = require('express').Router();
const Category = require('../models/categoryModel');
const auth = require('../middleware/auth');

router.post('/', async(req, res)=>{
    try {
        const {email} = req.body;
        const categories = await Category.findOne({email_category: email});
        res.send(categories);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

router.post('/addIncomeCategory', auth, async(req, res)=>{
    try {
        
        const {email, category} = req.body;

        const categories = await Category.findOne({email_category: email});
        if (! categories.incomeCategory.includes(category)) {
            await Category.findByIdAndUpdate(
                {_id: categories._id},
                {$push: {incomeCategory: category}},
            )
            res.send("Category has been Updated !");
        }
        else {
            res.send("Category has already been added !");
        }
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

router.post('/addExpenseCategory', auth, async(req, res)=>{
    try {
        
        const {email, category} = req.body;
        const categories = await Category.findOne({email_category: email});
        if (! categories.expenseCategory.includes(category)) {
            await Category.findByIdAndUpdate(
                {_id: categories._id},
                {$push: {expenseCategory: category}},
            )
            res.send("Category has been Updated !");
        }
        else {
            res.send("Category has already been added !");
        }
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})


module.exports = router;