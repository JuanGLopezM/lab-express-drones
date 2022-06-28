const express = require("express");
const Drone = require("../models/Drone.model");
const router = express.Router();

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here

  Drone.find()
    .then((response) => {
      console.log(response);
      res.render("drones/list.hbs", { response });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone

  res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone

  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((error) => {
      console.log(error);
      res.render("drones/create-form.hbs");
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone

  const { id } = req.params;

  Drone.findById(id)
    .then((response) => {
      console.log(response);
      res.render("drones/update-form.hbs", response);
    })
    .catch(() => {
      res.redirect("/drones/create");
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      res.redirect("/drones/create");
    });
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      res.redirect("/drones/:id/delete");
    });
});

module.exports = router;
