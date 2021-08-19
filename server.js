require ("dotenv").config()
const express = require('express');
const app = express();
const log = console.log;
const path = require('path');
const nodemailer = require('nodemailer');
const PORT = 8080;

app.use(express.urlencoded({
    extend: false
}));

app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.post('/email', (req, res) => {
    //Send an email here but currently dummy email
    const { subject, email, message } = req.body;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: `Sharon Jebitok  Resume <noreply@sharon-resume.com>`,
        to: `sharonkosgei4@gmail.com`,
        subject: `New Message from Resume`,
        html: `<p>Hey! Sharon, you have a new message from ${email} on your resume page.</p> <p>Message Contents: ${message}</p>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  
});

app.listen(PORT, () => log( 'Server is listening on port', 8080));
