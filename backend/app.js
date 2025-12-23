if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

/**
 * Trust proxy (quan trọng khi deploy trên Vercel / Render / Railway)
 */
app.set("trust proxy", 1);

/**
 * CORS
 * Mở cho frontend (Vercel domain) + local
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL, // ví dụ: https://timesheet-bachho.vercel.app
    ],
    credentials: true,
  })
);

/**
 * Body parser
 */
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * Health check (bắt buộc khi deploy)
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * Routes
 */
app.use(require("./routes"));

/**
 * Global error handler (đỡ crash prod)
 */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
