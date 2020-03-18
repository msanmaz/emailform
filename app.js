const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();



//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//headers
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//server req
app.get('/', (req,res) => {
    res.send('Hello');
});

app.post('/send', (req, res) => {
    main();
    res.send('Email has been sent');
});


// async..await is not allowed in global scope, must use a wrapper
async function main(res) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'stroykarealestate.de@gmail.com', // generated ethereal user
        pass: 'cvintwblvgqjqfwl'        // generated ethereal password
      },
      tls:{
        rejectedUnauthorized : false
    }
    });

  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Stroyka" <stroykarealestate.de@gmail.com>', // sender address
      to: 'osanmaz4992@gmail.com', // list of receivers
      subject: "Hello Test ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<h1>Hej</h1>" // html body
    });
  
   

  transporter.sendMail(mailOptions, (err, info) => {
      if (error){
          return console.log(err)
      }

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });


};
  


app.listen(3000, () => console.log('Server started'));