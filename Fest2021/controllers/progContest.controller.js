require("dotenv").config();

const crypto = require('crypto')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

const mailSend = (memName, email, confCode) => {
  let mailOptions = {
    from: "sabrinaislam22@iut-dhaka.edu",
    to: email,
    subject: "Math Olympiad Registration Successful!",
    text: `Congratulations ${memName}!,
      You have successfully registered to IUT ICT Fest Programming Contest! Your confirmation code is ${confCode}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const progContest = require("../models/progContest.model");

const getPC = (req, res) => {
    res.render('prog-contest/register.ejs', { error: req.flash("error") });
};

const postPC = (req, res) => {
  const {
    teamname,
    institute,
    coachname,
    coachcontact,
    coachmail,
    coachshirt,
    leadername,
    leadercontact,
    leadermail,
    leadershirt,
    mem1name,
    mem1contact,
    mem1mail,
    mem1shirt,
    mem2name,
    mem2contact,
    mem2mail,
    mem2shirt,
  } = req.body;

  console.log(req.body);
  
  const total = 600;
  const paid = 0;
  const selected = false;
  let error = "";
  const confCode = crypto.randomBytes(20).toString("hex");

  progContest.findOne({ teamname: teamname, institute: institute }).then(
    (team) => {
      if (team) {
        error = "Team with this name and institution exists!";
        req.flash("error", error);
        res.redirect("/ProgContest/register");
      } else {
        const team = new progContest({
            teamname,
            institute,
            coachname,
            coachcontact,
            coachmail,
            coachshirt,
            leadername,
            leadercontact,
            leadermail,
            leadershirt,
            mem1name,
            mem1contact,
            mem1mail,
            mem1shirt,
            mem2name,
            mem2contact,
            mem2mail,
            mem2shirt,
            total,
            paid,
            selected,
            confCode
        });
        team
          .save()
          .then(() => {
            error = "Team has been registered successfully!";

            mailSend(coachname,coachmail,confCode);
            mailSend(leadername, leadermail, confCode);
            mailSend(mem1name, mem1mail,confCode);
            mailSend(mem2name, mem2mail, confCode);


            req.flash("error", error);
            res.redirect("/ProgContest/register");
          })
          .catch(() => {
            error = "Unexpected error occured while registering team!";
            req.flash("error", error);
            res.redirect("/ProgContest/register");
          });
      }
    }
  );
};


const getPCList = (req, res) => {
    let all_teams = [];
    let error = "";
    progContest.find()
      .then((data) => {
        all_teams = data;
        res.render("prog-contest/list.ejs", {
          error: req.flash("error"),
          teams: all_teams,
        });
      })
      .catch(() => {
        error = "Failed to fetch participants";
        res.render("prog-contest/list.ejs", {
          error: req.flash("error", error),
          teams: all_teams,
        });
      });
};

const deletePC = (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    let error = "";
    progContest.deleteOne({ _id: req.params.id })
      .then(() => {
        error = "Team deleted successfully!";
        req.flash("error", error);
        res.redirect("/ProgContest/list");
      })
      .catch(() => {
        error = "Failed to delete data!";
        req.flash("error", error);
        res.redirect("/ProgContest/list");
      });
  };


  const getInfoPC = (req, res) => {
    const id = req.params.id;
    
    let info = [];
    let error = "";
    progContest.findOne({ _id: id })
      .then((data) => {
        info = data;
        res.render("prog-contest/edit-team.ejs", {
          error: req.flash("error"),
          team: info,
        });
      })
      .catch((e) => {
        console.log(e);
        error = "Failed to fetch team details";
        res.render("prog-contest/edit-team.ejs", {
          error: req.flash("error", error),
          team: info,
        });
      });
  };
  
  const editPC = async (req, res) => {
    const id = req.params.id;
    const { teamname,
        institute,
        coachname,
        coachcontact,
        coachmail,
        coachshirt,
        leadername,
        leadercontact,
        leadermail,
        leadershirt,
        mem1name,
        mem1contact,
        mem1mail,
        mem1shirt,
        mem2name,
        mem2contact,
        mem2mail,
        mem2shirt } = req.body;
    console.log(req.body);

    let error = "";

    progContest.findOne({ teamname: teamname, institute: institute }).then(
        (team) => {
          if (team) {
            error = "Team with this name and institution exists!";
            req.flash("error", error);
            res.redirect("/ProgContest/editTeam/"+id);
          } else {
            progContest.findOneAndUpdate(
                { _id: id }, 
                { teamname,
                  institute,
                  coachname,
                  coachcontact,
                  coachmail,
                  coachshirt,
                  leadername,
                  leadercontact,
                  leadermail,
                  leadershirt,
                  mem1name,
                  mem1contact,
                  mem1mail,
                  mem1shirt,
                  mem2name,
                  mem2contact,
                  mem2mail,
                  mem2shirt })
                .then((data) => {
                  error = "Team updated successfully!";
                      req.flash("error", error);
                      res.redirect("/ProgContest/list");
                })
                .catch((e) => {
                  console.log(e);
                  error = "Failed to update team details";
                  res.redirect("/ProgContest/list");
                });
          }
        })

    
  };

  const selectPC = (req, res) => {
    const id = req.params.id;
  
    progContest.findOne({ _id: id })
      .then((team) => {
        team.selected = true;
        team
          .save()
          .then(() => {
            let error = "Team has been selected succesfully!";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
          })
          .catch(() => {
            let error = "Data could not be updated";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
          });
      })
      .catch(() => {
        let error = "Data could not be updated";
        req.flash("error", error);
        res.redirect("/ProgContest/list");
      });
  };


  const paymentDonePC = (req, res) => {
    const id = req.params.id;
  
    progContest.findOne({ _id: id })
      .then((team) => {
        team.paid = team.total;
        team
          .save()
          .then(() => {
            let error = "Payment completed succesfully!";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
          })
          .catch(() => {
            let error = "Data could not be updated!";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
          });
      })
      .catch(() => {
        let error = "Data could not be updated!";
        req.flash("error", error);
        res.redirect("/ProgContest/list");
      });
  };

module.exports = { getPC, postPC, getPCList, deletePC, getInfoPC, editPC, selectPC, paymentDonePC };