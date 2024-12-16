// Server.js

const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const DATA_FILE = "users.json";

const readUsers = () => {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
};

const writeUsers = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET /users - Fetch all users
app.get("/users", (req, res) => {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.json(JSON.parse(data).users); // Send users array
  });
});

app.post("/user", (req, res) => {
  const data = readUsers();
  const newUser = { id: Date.now(), ...req.body };
  data.users.push(newUser);
  writeUsers(data);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const data = readUsers();

  const userIndex = data.users.findIndex((user) => user.id === userId);
  if (userIndex === -1) return res.status(404).send("User not found");

  data.users[userIndex] = { id: userId, ...updatedUser };
  writeUsers(data);
  res.json(data.users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const data = readUsers();

  const userIndex = data.users.findIndex((user) => user.id === userId);
  if (userIndex === -1) return res.status(404).send("User not found");

  data.users.splice(userIndex, 1);
  writeUsers(data);
  res.send(`User with ID ${userId} deleted successfully`);
});

app.patch("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const data = readUsers();

  const user = data.users.find((user) => user.id === userId);
  if (!user) return res.status(404).send("User not found");

  Object.assign(user, req.body);
  writeUsers(data);
  res.json(user);
});

app.put("/users/:id/email", (req, res) => {
  const userId = parseInt(req.params.id);
  const newEmail = req.body.email;

  const data = readUsers();
  const user = data.users.find((user) => user.id === userId);

  if (!user) return res.status(404).send("User not found");

  user.email = newEmail; // Update only the email
  writeUsers(data);
  res.json({ message: "Email updated successfully", user });
});

app.patch("/users/:id/email", (req, res) => {
  const userId = parseInt(req.params.id);
  const newEmail = req.body.email;

  const data = readUsers();
  const user = data.users.find((user) => user.id === userId);

  if (!user) return res.status(404).send("User not found");

  user.email = newEmail; // Update only the email
  writeUsers(data);
  res.json({ message: "Email updated successfully", user });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
