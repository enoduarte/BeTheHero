const db = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await db("incidents").count();

    const casos = await db("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.city",
        "ongs.uf",
      ]);

    res.header("X-Total-Count", count["count(*)"]);
    return res.json(casos);
  },

  async profile(req, res) {
    const ong_id = req.headers.auth;
    const casos = await db("incidents").where({ ong_id }).select("*");
    return res.json(casos);
  },

  async create(req, res) {
    const { title, desc, value } = req.body;
    const { auth: ong_id } = req.headers;

    const [id] = await db("incidents").insert({ title, desc, value, ong_id });

    res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.auth;

    const del = await db("incidents").where({ id, ong_id }).del();

    if (del) return res.sendStatus(204);

    res.status(401).json({ error: "No exist or not permitted" });
  },
};
