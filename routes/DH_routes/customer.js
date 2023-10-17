const express = require("express");
const router = require("express").Router();
let customer = require("../../models/DH_models/customer");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/cus_middleware/auth");
const helperUtil = require("../../utils/helper.util");
//sign up

router.post("/signup", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    const {
      name,
      add1,
      add2,
      city,
      area,
      pscode,
      country,
      phone,
      DOB,
      email,
      pwd,
      imageUrl,
    } = req.body;

    let customer1 = await customer.findOne({ email });
    if (customer1) {
      throw new Error("User already exists");
    }

    const genSalt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(pwd, genSalt);

    customer1 = {
      name: name,
      add1: add1,
      add2: add2,
      city: city,
      area: area,
      pscode: pscode,
      country: country,
      phone: phone,
      DOB: DOB,
      email: email,
      pwd: hashPassword,
      imageUrl: imageUrl,
    };

    const newcustomer = new customer(customer1);
    await newcustomer.save();
    
    res.status(201).send({
      status: "customer Created",
      customer: newcustomer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//login

router.post("/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    const { email, pwd } = req.body;
    console.log(email, pwd);

    // const Cus = await customer.findByCredentials(res, email, pwd);

    const customer1 = await customer.findOne({ email });

    if (!customer1) {
      return res.status(400).send({ error: "There is no customer account" });
    }

    if (customer1.tryCount >= 3) {
      return res.status(400).send({
        error: "Account is locked..! Please contact Admin",
      });
    }

    const isPasswordCheck = await bcrypt.compare(pwd, customer1.pwd);

    if (!isPasswordCheck) {
      customer1.tryCount = customer1.tryCount + 1;
      await customer1.save();

      return res.status(400).send({ error: "Invalid password" });
    }

    const token = await helperUtil.createToken(customer1);

    customer1.tryCount = 0;
    await customer1.save();


    //set the max age and the cookie
    res.cookie("computer", token, {
      maxAge: 3600000,
    }); //1 hour
    customer1.pwd = "";
    res.status(200).send({ token: token, Cus: customer1 });
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
});

//logout
router.post("/logout", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    req.Cus.tokens = req.Cus.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.Cus.save();
    res.status(200).send("Logout successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//get customer profile

router.get("/profile", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    res.status(201).send({ status: "Profile fetched", Cus: req.Cus });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error with /profile", error: error.message });
  }
});

//update

router.put("/update", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    const {
      name,
      add1,
      add2,
      city,
      area,
      pscode,
      country,
      phone,
      DOB,
      email,
      imageUrl,
    } = req.body;

    let Cus = await customer.findOne({ email });

    if (!Cus) {
      throw new Error("There is no customer account");
    }

    const customerUpdate = await customer.findByIdAndUpdate(req.Cus.id, {
      name: name,
      add1: add1,
      add2: add2,
      city: city,
      area: area,
      pscode: pscode,
      country: country,
      phone: phone,
      DOB: DOB,
      email: email,
      imageUrl: imageUrl,
    });

    res
      .status(200)
      .send({ status: "Customer Profile Updated", Cus: customerUpdate });
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
});

//delete customer profile

router.delete("/delete", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    const Cus = await customer.findById(req.Cus.id);
    if (!Cus) {
      throw new Error("There is no customer to delete");
    }
    const deleteProfile = await customer.findByIdAndDelete(req.Cus.id);
    res.status(200).send({ status: "customer deleted", Cus: deleteProfile });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
});

module.exports = router;
