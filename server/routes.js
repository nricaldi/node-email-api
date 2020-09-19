console.log("hello from routes.js");
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const importData = require('../app.json');

module.exports = app => { 
    app.post('/send/:_token', (req, res) => {
        // console.log("data recieved");




        console.log('--------------')
        console.log('--------------')
        console.log('--------------')
        console.log('--------------')
        console.log('--------------')
        // console.log(res);
        // console.log(req.params._token);
        console.log('--------------')
        console.log('--------------')
        console.log('--------------')
        console.log('--------------')
        console.log('--------------')

        // Secret Key
        const secretKey = importData['secretKey'];

        // Token
        const token = req.params._token;
        // Verify URL
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;


        fetch(url, {
            method: 'post',
        })
            .then(response => response.json())
            .then(google_response => {
                res.json(google_response.success);
                // if(google_response.success) sendMail();
                console.log(google_response);
            })
            .catch(error => res.json({ error }));


        const sendMail = () => {
            const output = `
                <p>You have a new contact request</p>
                <h3>Contact Details</h3>
                <ul>  
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
                </ul>
                <h3>Message</h3>
                <p>${req.body.message}</p>
            `;
            
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                // service: 'gmail',
                auth: {
                    user: importData['email'], // generated ethereal user
                    pass: importData['password']  // generated ethereal password
                },
                tls:{
                rejectUnauthorized:false
                }
            });
            
            // setup email data with unicode symbols
            let mailOptions = {
                from: `"Nodemailer Contact" <${importData['email']}>`, // sender address
                to: 'nr.ricaldi@gmail.com', // list of receivers
                subject: 'Node Contact Request', // Subject line
                text: 'Hello world?', // plain text body
                html: output // html body
            };
            
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.json(error);
                }
                // console.log('Message sent: %s', info.messageId);   
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            
                res.json({'msg':'Email has been sent'});
            });

        }
    });
}