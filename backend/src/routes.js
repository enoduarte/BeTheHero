const express = require("express");
const route = express.Router();

const casos = require("./controllers/casos");
const ongs = require("./controllers/ongs");

route.post("/login", ongs.login);
route.get("/ongs", ongs.index);
route.post("/ongs", ongs.create);

route.get("/profile", casos.profile);
route.get("/casos", casos.index);
route.post("/casos", casos.create);
route.delete("/casos/:id", casos.delete);

module.exports = route;
