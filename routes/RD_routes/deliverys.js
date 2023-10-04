const express = require("express");
const Deliverys = require("../../models/RD_models/deliverys");
const Order = require("../../models/ND_models/Order");

const router = express.Router();

//Add new delivery
router.route("/deliveryadd").post((req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  let newDelivery = new Deliverys(req.body);
  newDelivery.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: "Deliverys saved successfully!!",
    });
  });
});

//get deliverys
router.route("/displaydeliverys").get((req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  Deliverys.find().exec((err, deliverys) => {
    if (err) {
      return (
        res.status(400),
        json({
          error: err,
        })
      );
    }

    return res.status(200).json({
      success: true,
      existingDeliverys: deliverys,
    });
  });
});

//get a specific delivery

router.route("/:deliveryID").get((req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  let deliveryID = req.params.deliveryID;

  Deliverys.findById(deliveryID, (err, deliverys) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      deliverys,
    });
  });
});

//update deliverys
router.route("/update/:deliveryID").put((req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  Deliverys.findByIdAndUpdate(
    req.params.deliveryID,
    {
      $set: req.body,
    },
    (err, delivery) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Update Successfully",
      });
    }
  );
});

//Delete deliverys
router.route("/delete/:deliveryID").delete((req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  Deliverys.findByIdAndRemove(req.params.deliveryID).exec(
    (err, deleteDelivery) => {
      if (err)
        return res.status(400).json({
          message: "Delete Unsuccessfully",
          err,
        });

      return res.json({
        message: "Delete Successfull",
        deleteDelivery,
      });
    }
  );
});

module.exports = router;
