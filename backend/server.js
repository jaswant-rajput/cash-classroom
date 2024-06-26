const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const dataRouter = require("./routes/fetchdataRoute");
const courseRouter = require("./routes/courseRoutes");
const lessonRouter = require("./routes/lessonRoute");
const goalsRouter = require("./routes/goalRoutes");
const blogsRouter = require("./routes/blogRoutes");
const chatRouter = require("./routes/chatRoutes");
const movieRouter = require("./routes/moviePitchRoutes");

require("dotenv").config(); // Load environment variables from a .env file

const app = express();

app.use(
	cors({
		origin: [
			"https://cash-classroom.vercel.app",
			"http://localhost:5173",
			// "https://warm-snickerdoodle-ee4999.netlify.app",
			"https://main--warm-snickerdoodle-ee4999.netlify.app",
		],
	})
);

//main--warm-snickerdoodle-ee4999.netlify.app
https: app.use(morgan("dev"));
app.use(express.json());
app.use("/auth", userRouter);
app.use("/data", dataRouter);
app.use("/course", courseRouter);
app.use("/lesson", lessonRouter);
app.use("/goals", goalsRouter);
app.use("/blogs", blogsRouter);
app.use("/chat", chatRouter);
//another project api
app.use("/movies", movieRouter);
const imagesPath = path.join(__dirname, "images");
app.use("/images", express.static(imagesPath));

const dbUri = process.env.MONGODB_URI;
mongoose
	.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("connected"))
	.catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Express on Vercel"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = app;
