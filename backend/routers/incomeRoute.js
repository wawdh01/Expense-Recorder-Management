const router = require('express').Router();
const Income = require('../models/incomeModel');
const auth = require('../middleware/auth');
const fs = require("fs");
const PDFDocument = require("../templates/pdfkit-tables");
const nodemailer = require('nodemailer');

router.post('/', auth, async (req, res)=> {
    try {
        const {email} = req.body;
        const incomes = await Income.findOne({email_income: email});
        res.json(incomes.incomeRecord);
    }
    catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

router.post('/addIncome', async (req, res)=>{
    try {
        const {email, category, price, description} = req.body;
        const incomes_all = await Income.findOne({email_income: email});

        const incomerecord = {
            category,
            price,
            description
        }

        console.log(incomerecord);

        await Income.findByIdAndUpdate(
            {_id: incomes_all._id},
            {$addToSet: {incomeRecord: incomerecord}}
        )

        res.json(incomerecord);
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

        const incomes_all = await Income.findOne({email_expense: email});
        const income_of_month = []
        const income_monthAll = income_all.incomeRecord;

        month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (var i in income_monthAll) {
            var date_string = income_monthAll[i].updatedAt;
            date_string = String(date_string).split(' ');
            //console.log(date_string)
            if (date_string[3] == String(year) && date_string[1] == month_name[month]) {
                income_of_month.push(income_monthAll[i]);
            }
        }

        res.json(income_of_month);
    }
    catch(e) {
        console.log(e);
        res.status(500).send();
    }

    
})


router.post('/currentMonthPDF', async(req, res)=>{
    try {
        const {email} = req.body;
        const today = new Date()
        var month = today.getMonth()
        const year = today.getFullYear()

        const incomes_all = await Income.findOne({email_expense: email});
        const income_of_month = []
        const income_monthAll = incomes_all.incomeRecord;

        month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (var i in income_monthAll) {
            var date_string = income_monthAll[i].updatedAt;
            date_string = String(date_string).split(' ');
            //console.log(date_string)
            if (date_string[3] == String(year) && date_string[1] == month_name[month]) {
                income_of_month.push(income_monthAll[i]);
            }
        }

        //Creating a PDF for that.....................
        const doc = new PDFDocument();
        const filename = 'incomes_' + email + '.pdf'
        doc.pipe(fs.createWriteStream(filename));

        doc
            .image("./templates/logo2.png", 50, 45, { width: 50 })
            .fillColor("#444444")
            .fontSize(20)
            .text("INCOME Information.", 110, 57)
            .fontSize(10)
            .text("Month : " + String(month_name[month]), 200, 65, { align: "right" })
            .text("Year  : " + String(year), 200, 80, { align: "right" })
            .moveDown();

        const table = {
            headers: ["Category", "Description", "Price"],
            rows: []
        };
        var totalAmount = 0;
        for (const income of income_of_month) {
            table.rows.push([income.category, income.description, String(income.price)]);
            totalAmount += income.price
        }
        
        table.rows.push(['','Total Income', String(totalAmount)]);
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
            subject: 'Income record of Month ' + month_name[month],
            html: "<p>Dear User,<br>This is your monthly income record mail.<br>PFA<br><br><br><br>Thanks,<br>Expense Recorder System<br></p>",
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