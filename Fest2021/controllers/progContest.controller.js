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
            selected
        });
        team
          .save()
          .then(() => {
            error = "Team has been registered successfully!";
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

module.exports = { getPC, postPC, getPCList };