"use strict";

import { Model, UUIDV4 } from "sequelize";

interface UserAttributes {
  id: string;
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  street: string;
  zipcode: number;
  phone: string;
  email: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string;
    firstname!: string;
    lastname!: string;
    country!: string;
    city!: string;
    street!: string;
    zipcode!: number;
    phone!: string;
    email!: string;
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isOnlyLetters(value: string) {
            if (!/^[A-Za-z ]+$/.test(value)) {
              throw new Error("First name should only contain letters.");
            }
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isOnlyLetters(value: string) {
            if (!/^[A-Za-z ]+$/.test(value)) {
              throw new Error(
                "Last name should only contain letters and spaces."
              );
            }
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "Country should only contain letters.",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Zipcode should only contain numbers.",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
