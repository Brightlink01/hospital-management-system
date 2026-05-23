import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const result = await pool.query(
      `
      SELECT *
      FROM patients
      WHERE
        is_active = TRUE
        AND LOWER(name) LIKE LOWER($1)
      ORDER BY id DESC
      `,
      [`%${search}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    const result = await pool.query(
      `
      INSERT INTO patients (
        name,
        age,
        gender
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, age, gender]
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM patients
      WHERE id = $1
      `,
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:id/visits", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM visits
      WHERE patient_id = $1
      ORDER BY visit_date DESC
      `,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/:id/visits", async (req, res) => {
  try {
    const { id } = req.params;

    const { reason, doctor } =
      req.body;

    const result = await pool.query(
      `
      INSERT INTO visits (
        patient_id,
        reason,
        doctor
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [id, reason, doctor]
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, age, gender } =
      req.body;

    const result = await pool.query(
      `
      UPDATE patients
      SET
        name = $1,
        age = $2,
        gender = $3
      WHERE id = $4
      RETURNING *
      `,
      [name, age, gender, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `
      UPDATE patients
      SET is_active = FALSE
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message:
        "Patient archived successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.get(
  "/visits/:visitId/notes",
  async (req, res) => {
    try {
      const { visitId } = req.params;

      const result = await pool.query(
        `
        SELECT *
        FROM clinical_notes
        WHERE visit_id = $1
        ORDER BY created_at DESC
        `,
        [visitId]
      );

      res.json(result.rows);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

router.post(
  "/visits/:visitId/notes",
  async (req, res) => {
    try {
      const { visitId } = req.params;

      const {
        symptoms,
        diagnosis,
        prescription,
        treatment_plan,
      } = req.body;

      const result = await pool.query(
        `
        INSERT INTO clinical_notes (
          visit_id,
          symptoms,
          diagnosis,
          prescription,
          treatment_plan
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
          visitId,
          symptoms,
          diagnosis,
          prescription,
          treatment_plan,
        ]
      );

      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

export default router;