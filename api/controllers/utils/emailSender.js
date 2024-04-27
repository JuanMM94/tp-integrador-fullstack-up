require("dotenv").config();

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Juan Martín",
    link: "https://www.linkedin.com/in/juanmartinmonasterio/",
    logo: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*cjguYFzj66gVSqMQpxLEAw.png",
  },
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

exports.sendEmail = async (email, token) => {
  const emailTemplate = {
    body: {
      greeting: "Hola",
      signature: "Sinceramente tuyo",
      intro: "Bienvenido al TP de Juan Martin!",
      action: {
        instructions: "Para confirmar tu cuenta, pulsa el boton:",
        button: {
          color: "#22BC66",
          text: "Confirma tu cuenta",
          link: `http://localhost:5000/api/auth/confirmation/${token}`,
        },
      },
    },
  };

  const emailBody = mailGenerator.generate(emailTemplate);

  try {
    const message = {
      from: EMAIL_USER,
      to: email,
      subject: "Confirmacion de cuenta: ",
      text: "Verify your mail",
      html: emailBody,
    };

    await transporter.sendMail(message);
  } catch (error) {
    console.error(error);
  }
};
