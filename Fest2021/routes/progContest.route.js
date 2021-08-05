const express = require("express");
const router = express.Router();

const { ensureAuthenticated, addUserData } = require("./../middlewares/auth.middleware");

const { getPC, postPC, getPCList, deletePC, getInfoPC, editPC, selectPC, paymentDonePC } = require('../controllers/progContest.controller');

router.get("/register", ensureAuthenticated, addUserData, getPC);
router.post("/register", ensureAuthenticated, addUserData, postPC);
router.get("/list", ensureAuthenticated, addUserData, getPCList);
router.get("/delete/:id", ensureAuthenticated, addUserData, deletePC);
router.get('/editTeam/:id',ensureAuthenticated,addUserData,getInfoPC);
router.post('/editTeam/:id',ensureAuthenticated,addUserData,editPC);
router.get('/select/:id',ensureAuthenticated,addUserData,selectPC);
router.get('/paymentDone/:id',ensureAuthenticated,addUserData,paymentDonePC);

module.exports = router;