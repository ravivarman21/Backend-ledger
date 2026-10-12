

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});



// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend-ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



async function sendRegistrationEmail(userEmail, name) {
  const subject = 'welcome to backend Ledger!';
  const text = `Hello ${name} , \n\n thank you for your registering at backend ledger.
  we'r exited to have you on board! \n\n Best regards , \n The Backend ledger team`;
  const html = `
        <p>Hello <strong>${name}</strong>,</p>

        <p>
            Thank you for registering at <strong>Backend Ledger</strong>.
            We're excited to have you on board!
        </p>

        <p>
            Best regards,<br>
            The Backend Ledger Team
        </p>
    `;
  await sendEmail(userEmail, subject, text, html);

}



async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Successful";

  const text = `Hello ${name},

Your transaction of ₹${amount} to account ${toAccount} was successful.

Best regards,
The Backend Ledger Team`;

  const html = `
        <p>Hello <strong>${name}</strong>,</p>

        <p>
            Your transaction of <strong>₹${amount}</strong>
            to account <strong>${toAccount}</strong>
            was successful.
        </p>

        <p>
            Best regards,<br>
            The Backend Ledger Team
        </p>
    `;

  await sendEmail(userEmail, subject, text, html);
}


async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Failed";

  const text = `Hello ${name},

We regret to inform you that your transaction of ₹${amount} to account ${toAccount} has failed.

Please try again later or contact support if the issue persists.

Best regards,
The Backend Ledger Team`;

  const html = `
    <p>Hello <strong>${name}</strong>,</p>

    <p>
      We regret to inform you that your transaction of
      <strong>₹${amount}</strong> to account
      <strong>${toAccount}</strong> has failed.
    </p>

    <p>
      Please try again later or contact our support team if the issue persists.
    </p>

    <p>
      Best regards,<br>
      <strong>The Backend Ledger Team</strong>
    </p>
  `;

  await sendEmail(userEmail, subject, text, html);
}







module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail
};









