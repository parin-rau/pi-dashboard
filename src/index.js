import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello from pi server");
});

app.listen(port, () => console.log(`App listening on PORT ${port}`));
