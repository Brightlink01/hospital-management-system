import express from "express";

import jwt from "jsonwebtoken";

import pool from "../config/db.js";

const router = express.Router();

router.post(
  "/login",
  async (req, res) => {
    try {
      const { email, password } =
        req.body;

      const result =
        await pool.query(
          `
          SELECT *
          FROM admins
          WHERE email = $1
          `,
          [email]
        );

      if (result.rows.length === 0) {
        return res.status(401).json({
          message:
            "Invalid credentials",
        });
      }

      const admin = result.rows[0];

      if (
        admin.password !== password
      ) {
        return res.status(401).json({
          message:
            "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
        admin: {
          id: admin.id,
          email: admin.email,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

export default router;