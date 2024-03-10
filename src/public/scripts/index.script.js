import { getData, getTime } from "./utils.js";

const parent = document.getElementById("content");

// const getIp = async () => {
// 	const p = document.createElement("p");

// 	const res = await fetch(`/system/ip`);
// 	if (res.ok) {
// 		const address = await res.json();
// 		p.innerText = address.ip ?? "Unable to get device IP address";
// 	} else {
// 		p.innerText = "Bad response when getting IP address";
// 	}

// 	parent.appendChild(p);
// };

// TODO: GET TIME / WEATHER FROM WEATHER API WITH FIXED LOCATION
// TODO: CHECK FOR LOCATION IN SQLITE ELSE PROMPT FOR CONFIG LOCATION ENTRY

// const getTime = async () => {
// 	const p = document.createElement("p");
// 	const res = await fetch("/api/weather");
// 	if (res.ok) {
// 		const data = await res.json();
// 		p.innerText = data ?? "Unable to get current time";
// 	} else {
// 		p.innerText = "Bad response when getting current time";
// 	}

// 	parent.appendChild(p);
// };

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
