const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 5000;

// Serve built Vue files from dist/
app.use(express.static(path.join(__dirname, "dist")));

// Handle SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
