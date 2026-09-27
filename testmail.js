<<<<<<< HEAD
const nodemailer = require('nodemailer');

async function main() {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  let info = await transporter.sendMail({
    from: '"Ethnickart" <no-reply@ethnickart.com>',
    to: 'your@email.com',
    subject: 'Test Email',
    text: 'This is a test email.'
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

=======
const nodemailer = require('nodemailer');

async function main() {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  let info = await transporter.sendMail({
    from: '"ethnickart926@gmail.com" <no-reply@ethnickart.com>',
    to: 'ethnickart926@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email.'
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

>>>>>>> 3d99d7d (Initial commit: full-stack ecommerce app with API fixes and deployment configs)
main().catch(console.error); 