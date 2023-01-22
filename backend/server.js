const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 1010;

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log("JSON Server is running");
});
