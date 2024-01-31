import express, { Request, Response } from "express";
import db from "../models";
import { Params } from "express-serve-static-core";
const router = express.Router();
interface TypedRequestBody<T> extends Express.Request {
  body: T;
}
interface TypedRequestParams<T extends Params> extends Express.Request {
  params: T;
}
router.get("/contacts", async (req: Request, res: Response) => {
  try {
    const contacts = await db.User.findAll();
    res.json(contacts);
  } catch (error) {
    console.error("GET route - Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/create",
  async (
    req: TypedRequestBody<{
      firstname: string;
      lastname: string;
      country: string;
      city: string;
      street: string;
      zipcode: number;
      phone: string;
      email: string;
    }>,
    res: Response
  ) => {
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

      res.sendStatus(200);
    } catch (error) {
      console.error("CREATE route - Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put(
  "/edit",
  async (
    req: TypedRequestBody<{
      id: string;
    }>,
    res: Response
  ) => {
    try {
      const { id, ...data } = req.body;
      const contacts = await db.User.findAll();
      const contactExists = contacts.some(
        (contact: { id: string }) => contact.id === id
      );
      if (!contactExists) {
        return res.status(400).send("invalid user id");
      }
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

      res.sendStatus(200);
    } catch (error) {
      console.error("EDIT route - Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.delete(
  "/delete/:id",
  async (req: TypedRequestParams<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const contacts = await db.User.findAll();
      const contactExists = contacts.some(
        (contact: { id: string }) => contact.id === id
      );
      if (!contactExists) {
        return res.status(400).send("Id not found");
      }
      await db.User.destroy({
        where: {
          id,
        },
      });

      res.sendStatus(200);
    } catch (error) {
      console.error("DELETE route - Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export = router;
