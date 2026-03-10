import express from "express";
import cors from "cors";
import "dotenv/config";

import studentRoutes from "./routes/student.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
