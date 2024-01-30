const express = require("express");
const router = express.Router();
const db = require("../models");
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await db.User.findAll();
    res.json(contacts);
  } catch (error) {
    console.error("GET route - Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/create", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      country,
      city,
      street,
      zipcode,
      phone,
      email,
    } = req.body;
    db.User.create({
      firstname,
      lastname,
      country,
      city,
      street,
      zipcode,
      phone,
      email,
    });
    res.json({ message: "Done" });
  } catch (error) {
    console.error("CREATE route - Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit", async (req, res) => {
  try {
    const { country, id } = req.body;
    await db.User.update(
      {
        country,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({ message: "EDIT" });
  } catch (error) {
    console.error("EDIT route - Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.User.destroy({
      where: {
        id,
      },
    });
    res.json({ message: "DELETED" });
  } catch (error) {
    console.error("DELET route - Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
