const db = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index(req, res) {
    const ongs = await db("ongs").select("*");
    return res.json(ongs);
  },

  async login(req, res) {
    const { id } = req.body;
    const ong = await db("ongs")
      .where({ id })
      .select("name")
      .first();

    if (!ong) return res.status(400).json({ error: "No ONG found!" });
    return res.json(ong);
  },

  async create(req, res) {
    const id = crypto.randomBytes(4).toString("HEX");

    const { body } = req;

    await db("ongs").insert({
      ...body,
      id
    });

    return res.json({ id });
  }
};
