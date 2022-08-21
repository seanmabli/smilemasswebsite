const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

const db = admin.firestore();

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
    const emailList = [];
    db.doc("email/contact")
      .get()
      .then(async (documentSnapshot) => {
        await documentSnapshot.ref.get().then((doc) => {
          emailList.push.apply(emailList, doc.data().email);
        });
      })
      .then(() => {
        db.collection("tosend").add({
          sender: "SMILE Mass Website <smilemasssite@gmail.com>",
          email: emailList,
          sendtype: "bcc",
          subject: `Contact Form Submission ${snap.id}`,
          html: `
          <div>
            <p><b>Name: </b>${snap.data().name}</p>
            <p><b>Email: </b>${snap.data().email}</p>
            <p><b>Phone: </b>${snap.data().phone}</p>
            <p style="white-space: pre-wrap"><b>Message: </b>${
              snap.data().message
            }</p>
          </div>`,
        });
      });

    return "Added to queue";
  });

exports.volunteer = functions.firestore
  .document("volunteer/{volunteerId}")
  .onCreate((snap, context) => {
    const emailList = [];
    db.doc("email/volunteer")
      .get()
      .then((documentSnapshot) => {
        documentSnapshot.ref.get().then((doc) => {
          emailList.push.apply(emailList, doc.data().email);
        });
      })
      .then(() => {
        db.collection("tosend").add({
          sender: "SMILE Mass Website <smilemasssite@gmail.com>",
          email: emailList,
          sendtype: "bcc",
          subject: `Volunteer Form Submission ${snap.id}`,
          html: `
          <div>
            <p><b>Name: </b>${snap.data().name}</p>
            <p><b>Email: </b>${snap.data().email}</p>
            <p><b>Phone: </b>${snap.data().phone}</p>
            <p><b>Address: </b>${snap.data().address}</p>
            <p><b>Birthday: </b>${snap.data().birthday}</p>
            <p style="white-space: pre-wrap"><b>Which events are you interested in volunteering for: </b>${
              snap.data().events
            }</p>
            <p style="white-space: pre-wrap"><b>When are you availability to volunteer: </b>${
              snap.data().availability
            }</p>
          </div>`,
        });

        return "Added to queue";
      });
  });

exports.beachnomination = functions.firestore
  .document("beachnomination/{beachnominationId}")
  .onCreate((snap, context) => {
    const emailList = [];
    db.doc("email/beachnomination")
      .get()
      .then((documentSnapshot) => {
        documentSnapshot.ref.get().then((doc) => {
          emailList.push.apply(emailList, doc.data().email);
          console.log(emailList);
        });
      })
      .then(() => {
        const mailOptions = {
          from: `SMILE Mass Website <smilemasssite@gmail.com>`,
          bcc: emailList,
          subject: `Beach Nomination Form Submission ${snap.id}`,
          html: `
          <div>
            <p><b>Name: </b>${snap.data().name}</p>
            <p><b>Email: </b>${snap.data().email}</p>
            <p><b>Phone: </b>${snap.data().phone}</p>
            <p><b>Address: </b>${snap.data().address}</p>
            <p><b>Beach Name: </b>${snap.data().beach}</p>
            <p><b>Beach Address: </b>${snap.data().beachAddress}</p>
            <p><b>Contact Person / Town Official: </b>${snap.data().contact}</p>
            <p><b>Why are you nominating this beach community: </b>${
              snap.data().why
            }</p>
          </div>`,
        };

        transporter.sendMail(mailOptions, (error, data) => {
          if (error) {
            console.log(error);
          }
          console.log("Sent Beach Nomination Email");
        });
      });

    return "Added to queue";
  });

exports.equiptmentloaner = functions.firestore
  .document("equiptmentloaner/{equiptmentloanerId}")
  .onCreate((snap, context) => {
    const emailList = [];
    db.doc("email/equiptmentloaner")
      .get()
      .then((documentSnapshot) => {
        documentSnapshot.ref.get().then((doc) => {
          emailList.push.apply(emailList, doc.data().email);
          console.log(emailList);
        });
      })
      .then(() => {
        console.log("emailList", emailList);
        const mailOptions = {
          from: `SMILE Mass Website <smilemasssite@gmail.com>`,
          bcc: emailList,
          subject: `Equiptment Loaner Form Submission ${snap.id}`,
          html: `
          <div>
            <p><b>Name: </b>${snap.data().name}</p>
            <p><b>Email: </b>${snap.data().email}</p>
            <p><b>Phone: </b>${snap.data().phone}</p>
            <p><b>Address: </b>${snap.data().address}</p>
            <p><b>Equiptment: </b>${snap.data().equiptment.join(", ")}</p>
            <p><b>Requested Pickup Date: </b>${snap.data().pickup}</p>
            <p><b>Return Date: </b>${snap.data().dropoff}</p>
            <p><b>Do you need delivery: </b>${
              snap.data().delivery ? "Yes" : "No"
            }</p>
            <p><b>Delivery Address: </b>${snap.data().deliveryAddress}</p>
            <p><b>Birthday: </b>${snap.data().birthday}</p>
            <p><b>Have you used this program before: </b>${snap.data().used}</p>
            <p><b>Questions / Comments: </b>${snap.data().questions}</p>
          </div>`,
        };

        transporter.sendMail(mailOptions, (error, data) => {
          if (error) {
            console.log(error);
          }
          console.log("Sent Equiptment Loaner Email");
        });
      });

    return "Success";
  });

exports.sendmail = functions.pubsub.schedule("*/5 * * * *").onRun((context) => {
  db.collection("tosend")
    .get()
    .then((querySnapshot) => {
      var num = 0;
      querySnapshot.forEach((doc) => {
        if (num < 5) {
          if (doc.data().sendtype === "bcc") {
            const mailOptions = {
              from: doc.data().sender,
              bcc: doc.data().email,
              subject: doc.data().subject,
              html: doc.data().html,
            };
            transporter.sendMail(mailOptions, (error, data) => {
              if (error) {
                console.log(error);
              }
              console.log("Sent Email");
            });
            doc.ref.delete();
          } else if (doc.data().sendtype === "to") {
            const mailOptions = {
              from: doc.data().sender,
              to: doc.data().email,
              subject: doc.data().subject,
              html: doc.data().html,
            };
            transporter.sendMail(mailOptions, (error, data) => {
              if (error) {
                console.log(error);
              }
              console.log("Sent Email");
            });
            doc.ref.delete();
          } else if (doc.data().sendtype === "cc") {
            const mailOptions = {
              from: doc.data().sender,
              cc: doc.data().email,
              subject: doc.data().subject,
              html: doc.data().html,
            };
            transporter.sendMail(mailOptions, (error, data) => {
              if (error) {
                console.log(error);
              }
              console.log("Sent Email");
            });
            doc.ref.delete();
          }
          num++;
        }
      });
    });
  return;
});
