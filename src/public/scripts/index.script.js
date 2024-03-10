import { getData, getTime } from "./utils.js";

const parent = document.getElementById("content");

// TODO: GET TIME / WEATHER FROM WEATHER API WITH FIXED LOCATION
// TODO: CHECK FOR LOCATION IN SQLITE ELSE PROMPT FOR CONFIG LOCATION ENTRY

getTime({ parentId: "content" });

await getData({
	parentId: "content",
	elementType: "span",
	url: "/system/ip",
	dataParser: (address) => address.ip,
});

// await getData({
// 	parentId: "content",
// 	elementType: "p",
// 	url: `/api/weather/${encodeURI("San Francisco, CA")}`,
// });
