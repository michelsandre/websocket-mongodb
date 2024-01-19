import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import "./db/dbConnect.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = url.fileURLToPath(import.meta.url);
app.use(express.static(path.join(__dirname, "../..", "public")));

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

const io = new Server(httpServer);

export default io;
