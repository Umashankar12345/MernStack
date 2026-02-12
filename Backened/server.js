// const express = require("express");

// const app = express();
// // const PORT = 5000;


// app.use(express.json());


// app.get("/", (req, res) => {
//     res.send("API is running...");
// });


// app.get("/users", (req, res) => {
//     res.json([
//         { id: 1, name: "Uma" },
//         { id: 2, name: "Rahul" }
//     ]);
// });


// app.post("/users", (req, res) => {
//     const newUser = req.body;
//     res.json({
//         message: "User created successfully",
//         user: newUser
//     });
// });


// app.listen(5000, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const app = express();

const studentRoutes = require("./Studentmangement/routes/studentRoutes");

app.use(express.json());

// Use Routes
app.use("/api", studentRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
