import express, { Request, Response } from "express";
const path = require('path');

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

function shutdown(signal: string): void {
  console.log(`\n${signal} received, shutting down...`);
  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
  setTimeout(() => process.exit(1), 500);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.get("/", (req: Request, res: Response) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});








