import express, { Request, Response } from "express";
import db from "../models";

const router = express.Router();

router.get("/contacts", async (req: Request, res: Response) => {
  try {
    const contacts = await db.User.findAll();
    res.json(contacts);
  } catch (error) {
    console.error("GET route - Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req: Request, res: Response) => {
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

    await db.User.create({
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

router.put("/edit", async (req: Request, res: Response) => {
  try {
    const { id, ...data } = req.body;
    await db.User.update(
      {
        ...data,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ message: "EDIT" });
  } catch (error) {
    console.error("EDIT route - Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.User.destroy({
      where: {
        id,
      },
    });

    res.json({ message: "DELETED" });
  } catch (error) {
    console.error("DELETE route - Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

export = router;
