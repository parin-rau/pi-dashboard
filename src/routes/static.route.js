import express from "express";
import path from "path";
import { existsSync } from "fs";

export const staticRouter = express.Router();
const __dirname = import.meta.dirname;

staticRouter.use(express.static(path.join(__dirname, "public")));

staticRouter.get("/:fileName?", (req, res) => {
	const { fileName } = req.params;
	const hasHtmlExtension = fileName.slice(-5) === ".html";
	const fileExists = existsSync(
		path.join(
			__dirname,
			"..",
			"public",
			hasHtmlExtension ? fileName : `${fileName}.html`
		)
	);

	//console.log({ fileName, fileExists });

	if (!hasHtmlExtension && fileExists) {
		//console.log("missing .html extension, but file exists");
		return res.redirect(`/${fileName}.html`);
	} else if (!fileName || !fileExists) {
		//console.log("No filename provided or filename doesn't exist");
		return res.redirect("/index.html");
	} else {
		//console.log("else fall through");
		return res.redirect("/index.html");
	}
});
