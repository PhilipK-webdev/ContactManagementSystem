import db from "../models";

export default async function getAllContacts() {
  try {
    return await db.User.findAll();
  } catch (error) {
    console.error("getAllContacts - Error:", error);
    throw new Error("getAllContacts - Error");
  }
}
