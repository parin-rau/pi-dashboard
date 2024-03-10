import express from "express";
import path from "path";

export const staticRouter = express.Router();
const __dirname = import.meta.dirname;

staticRouter.get("/:fileName?", (req, res) => {
	const options = {
		root: path.join(__dirname, "..", "public"),
	};

	const { fileName } = req.params;
	if (!fileName) return res.redirect("/index.html");

	res.sendFile(fileName, options, (err) => {
		if (err) {
			console.error(err.message);
		} else {
			console.log("Sent: ", fileName);
		}
	});
});

//staticRouter.use("/config");
