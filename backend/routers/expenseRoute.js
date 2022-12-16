const router = require('express').Router();
const Expense = require('../models/expenseModel');
const auth = require('../middleware/auth');
const fs = require("fs");
const PDFDocument = require("../templates/pdfkit-tables");
const nodemailer = require('nodemailer');


router.post('/', auth, async (req, res)=> {
    try {
        const {email} = req.body;
        const expenses = await Expense.findOne({email_expense: email});
        res.json(expenses.expenseRecord);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

router.post('/addExpense', async (req, res)=>{
    try {
        const {email, category, price, description} = req.body;
        const expense_all = await Expense.findOne({email_expense: email});

        const expenserecord = {
            category,
            price,
            description
        }

        await Expense.findByIdAndUpdate(
            {_id: expense_all._id},
            {$addToSet: {expenseRecord: expenserecord}}
        )

        res.json(expenserecord);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }
})


router.post('/currentMonth', auth, async(req, res)=>{
    try {
        const {email} = req.body;
        const today = new Date()
        var month = today.getMonth()
        const year = today.getFullYear()

        const expense_all = await Expense.findOne({email_expense: email});
        const expense_of_month = []
        const expense_monthAll = expense_all.expenseRecord;

        month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (var i in expense_monthAll) {
            var date_string = expense_monthAll[i].updatedAt;
            date_string = String(date_string).split(' ');
            //console.log(date_string)
            if (date_string[3] == String(year) && date_string[1] == month_name[month]) {
                expense_of_month.push(expense_monthAll[i]);
            }
        }

        res.json(expense_of_month);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }

    
})



router.post('/currentMonthPDF', auth, async(req, res)=>{
    try {
        const {email} = req.body;
        const today = new Date()
        var month = today.getMonth()
        const year = today.getFullYear()

        const expense_all = await Expense.findOne({email_expense: email});
        const expense_of_month = []
        const expense_monthAll = expense_all.expenseRecord;

        month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (var i in expense_monthAll) {
            var date_string = expense_monthAll[i].updatedAt;
            date_string = String(date_string).split(' ');
            //console.log(date_string)
            if (date_string[3] == String(year) && date_string[1] == month_name[month]) {
                expense_of_month.push(expense_monthAll[i]);
            }
        }

        //Creating PDF........
        const doc = new PDFDocument();
        const filename = 'expenses_' + email + '.pdf'
        doc.pipe(fs.createWriteStream(filename));

        doc
            .image("./templates/logo2.png", 50, 45, { width: 50 })
            .fillColor("#444444")
            .fontSize(20)
            .text("EXPENSE Information.", 110, 57)
            .fontSize(10)
            .text("Month : " + String(month_name[month]), 200, 65, { align: "right" })
            .text("Year  : " + String(year), 200, 80, { align: "right" })
            .moveDown();

        const table = {
            headers: ["Category", "Description", "Price"],
            rows: []
        };
        var totalAmount = 0;
        for (const expense of expense_of_month) {
            table.rows.push([expense.category, expense.description, String(expense.price)]);
            totalAmount += expense.price
        }
        
        table.rows.push(['','Total Expense', String(totalAmount)]);
        // Draw the table
        doc.moveDown().table(table, 10, 125, { width: 590 });
        
        // Finalize the PDF and end the stream
        doc.end();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Expense record of Month ' + month_name[month],
            html: "<p>Dear User,<br>This is your monthly expense record mail.<br>PFA<br><br><br><br>Thanks,<br>Expense Recorder System<br></p>",
            attachments: [
                {
                    filename: filename,
                    path: filename,
                    cid: filename
                }
            ]
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              fs.unlinkSync(filename);
            }
          });
        res.send('Document has been created and Mailed to ' + email + ' !');
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }

    
})


module.exports = router;