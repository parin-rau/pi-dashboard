import { populateForm } from "./utils.js";

await populateForm({
	url: `/system/settings`,
	inputIds: ["location", "locationiq_api_key", "port"],
});
