const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "smilemasssite@gmail.com",
    pass: "xumnstojjmyreoca",
  },
});

exports.contact = functions.firestore
  .document("contact/{contactId}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `SMILE Mass Website <smilemasssite@gmail.com>`,
      to: "smdrone1@gmail.com",
      subject: "Contact Form Submission",
      html: `
                                <p>
                                  <b>Name: </b>${snap.data().name}<br>
                                  <b>Email: </b>${snap.data().email}<br>
                                  <b>Phone: </b>${snap.data().phone}<br>
                                  <b>Time: </b>${new Date(snap.data().time)}<br>
                                  <b>Message: </b>${snap.data().message}
                                </p>`,
    };

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent Contact Email");
    });
  });

exports.volunteer = functions.firestore
  .document("contact/{contactId}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `SMILE Mass Website <smilemasssite@gmail.com>`,
      to: "smdrone1@gmail.com",
      subject: "Volunteer Form Submission",
      html: `
                                <p>
                                  <b>Name: </b>${snap.data().name}<br>
                                  <b>Email: </b>${snap.data().email}<br>
                                  <b>Phone: </b>${snap.data().phone}<br>
                                  <b>Time: </b>${snap.data().time}<br>
                                  <b>Address: </b>${snap.data().address}<br>
                                  <b>Birthday: </b>${snap.data().birthday}<br>
                                  <b>Time: </b>${new Date(snap.data().time)}<br>
                                  <b>Available: </b>${snap.data().available}<br>
                                  <b>Events: </b>${snap.data().events}
                                </p>`,
    };

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent Volunteer Email");
    });
  });