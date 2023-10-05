const express = require("express");
const discount = require("../../models/NT_models/discount");
const router = require("express").Router();
const Product = require("../../models/SS_models/products");

//add discount
router.post("/add", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  let newdiscount = new discount(req.body);

  newdiscount.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "discount save successfully",
    });
  });
});

//Display discount
router.get("/display", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  discount.find().exec((err, discount) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingdiscount: discount,
    });
  });
});

//update Discount
router.route("/update/:id").put(async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");

  const discountId = escape(req.params.id);
  const discounts = await discount.findById(discountId);
  const { ammount } = req.body;

  discount.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, discount) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "update succesfully",
      });
    }
  );
  await Product.updateOne({ _id: discounts.itemId }, { offerPrice: ammount });
});

// delete discount

router.delete("/delete/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");

  const discountId = escape(req.params.id);
  const discounts = await discount.findById(discountId);

  await Product.updateOne({ _id: discounts.itemId }, { offerPrice: 0 });

  discount.findByIdAndRemove(req.params.id).exec((err, deletediscount) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessfull",
        err,
      });
    return res.json({
      message: "Delete successful",
      deletediscount,
    });
  });
});

//get a specific products

router.route("/display/:id").get((req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");

  let id = escape(req.params.id);

  discount.findById(id, (err, discount) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      discount,
    });
  });
});

//get all
router.get("/getallproductname", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    const products = await Product.find({}, "productName");
    res.status(200).send({ items: products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/addOffers", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    const { itemId, ammount } = req.body;
    const products = await Product.findById(itemId);
    if (!products) {
      throw new Error("There is no product");
    }
    await Product.findOneAndUpdate({ _id: itemId }, { offerPrice: ammount });
    res.status(200).send({ status: "offer added to the product" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
