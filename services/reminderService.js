import nodemailer from "nodemailer";

const sendEmail = async (userEmail, message) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Follow-up Reminder",
        text: message,
    });
};

reminderSent: {
    type: Boolean,
    default: false,
},

app.reminderSent = true;
await app.save();