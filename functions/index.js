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
    pass: functions.config().gmail.password,
  },
});

exports.contact = functions.firestore
  .document("contact/{contactId}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `SMILE Mass Website <smilemasssite@gmail.com>`,
      to: "smdrone1@gmail.com",
      subject: `Contact Form Submission ${snap.id}`,
      html: `
<p style="white-space: pre-wrap">
<b>Name: </b>${snap.data().name}<br>
<b>Email: </b>${snap.data().email}<br>
<b>Phone: </b>${snap.data().phone}<br>
<b>Your Request/Questions/Comments: </b>${snap.data().message}
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
  .document("volunteer/{volunteerId}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `SMILE Mass Website <smilemasssite@gmail.com>`,
      to: "smdrone1@gmail.com",
      subject: `Volunteer Form Submission ${snap.id}`,
      html: `
<p style="white-space: pre-wrap">
<b>Name: </b>${snap.data().name}<br>
<b>Email: </b>${snap.data().email}<br>
<b>Phone: </b>${snap.data().phone}<br>
<b>Address: </b>${snap.data().address}<br>
<b>Birthday: </b>${snap.data().birthday}<br>
<b>Which events are you interested in volunteering for: </b>${
  snap.data().events
}<br>
<b>When are you availability to volunteer: </b>${
  snap.data().availability
}
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

exports.beachnomination = functions.firestore
  .document("beachnomination/{beachnominationId}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `SMILE Mass Website <smilemasssite@gmail.com>`,
      to: "smdrone1@gmail.com",
      subject: `Beach Nomination Form Submission ${snap.id}`,
      html: `
<p style="white-space: pre-wrap">
<b>Name: </b>${snap.data().name}<br>
<b>Email: </b>${snap.data().email}<br>
<b>Phone: </b>${snap.data().phone}<br>
<b>Address: </b>${snap.data().address}<br>
<b>Beach Name: </b>${snap.data().beach}<br>
<b>Beach Address: </b>${snap.data().beachAddress}<br>
<b>Contact Person / Town Official: </b>${snap.data().contact}<br>
<b>Why are you nominating this beach community: </b>${snap.data().why}<br>
</p>`,
    };

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent Beach Nomination Email");
    });
  });

exports.equiptmentloaner = functions.firestore
  .document("equiptmentloaner/{equiptmentloanerId}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `SMILE Mass Website <smilemasssite@gmail.com>`,
      to: "smdrone1@gmail.com",
      subject: `Equiptment Loaner Form Submission  ${snap.id}`,
      html: `
<p style="white-space: pre-wrap">
<b>Name: </b>${snap.data().name}<br>
<b>Email: </b>${snap.data().email}<br>
<b>Phone: </b>${snap.data().phone}<br>
<b>Address: </b>${snap.data().address}<br>
<b>Equiptment: </b>${snap.data().equiptment.join(", ")}<br>
<b>Requested Pickup Date: </b>${snap.data().pickup}<br>
<b>Return Date: </b>${snap.data().dropoff}<br>
<b>Return Date: </b>${snap.data().dropoff}<br>
<b>Do you need delivery: </b>${snap.data().delivery}<br>
<b>Delivery Address: </b>${snap.data().deliveryAddress}<br>
<b>Birthday: </b>${snap.data().birthday}<br>
<b>Have you used this program before: </b>${snap.data().used}<br>
<b>Questions / Comments: </b>${snap.data().questions}
</p>`,
    };

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent Beach Nomination Email");
    });
  });
