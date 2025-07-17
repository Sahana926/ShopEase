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

main().catch(console.error); 