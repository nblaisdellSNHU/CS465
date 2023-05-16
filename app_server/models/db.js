const mongoose = require("mongoose");
const readLine = require("readline");

const host = process.env.DB_HOST || "127.0.0.1";
const dbURI = `mongodb://${host}/travlr`;

const { seed } = require("./seed");

// Bring in our Trips schema
require("./travlr");

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose disconnected`);
});

mongoose.set("strictQuery", false);

// Handle the SIGINT code, which is usually only available on UNIX-based machines,
// but the "readLine" package will allow us to capture it
if (process.platform === "win32") {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("SIGINT", () => {
    process.emit("SIGINT");
  });
}

// Write a "graceful" shutdown callback, which will be called when various signal codes
// are detected, which will shut down the Mongoose connection
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// Use the "gracefulShutdown" function when various "shutdown" signals are detected
// on the various different platforms that our NodeJS app can run on
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});
process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});

async function main() {
  await mongoose.connect(dbURI);
  await seed();
}

main().catch(console.log);
