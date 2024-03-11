import { getData, getTime } from "./utils.js";

const parent = document.getElementById("content");

// TODO: GET TIME / WEATHER FROM WEATHER API WITH FIXED LOCATION
// TODO: CHECK FOR LOCATION IN SQLITE ELSE PROMPT FOR CONFIG LOCATION ENTRY

//getTime({ parentId: "content" });

getTime.clock(5);

await getData.updateElement({
	elementId: "device-ip",
	url: "/system/ip",
	dataParser: (address) => address.ip,
});
