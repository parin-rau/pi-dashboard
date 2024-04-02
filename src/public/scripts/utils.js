import { parseIconSrc } from "./weatherHelpers.js";

const okException = (res) => [400, 404].includes(res.status);

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const shortenDay = (day) => {
	switch (day) {
		case "Sunday":
			return "Sun";
		case "Monday":
			return "Mon";
		case "Tuesday":
			return "Tue";
		case "Wednesday":
			return "Wed";
		case "Thursday":
			return "Thu";
		case "Friday":
			return "Fri";
		case "Saturday":
			return "Sat";
		default: {
			const d = new Date();
			return days[d.getDay()];
		}
	}
};

export const getData = (() => {
	const updateElement = async ({ elementId, url, dataParser }) => {
		const el = document.getElementById(elementId);
		const res = await fetch(url);

		if (!res.ok && !okException(res)) {
			return (el.innerText = `Bad response trying to get data from ${url}`);
		}

		const data = await res.json();
		console.log({ data });
		el.innerText =
			(dataParser ? dataParser(data) : data) ??
			`Unable to get data from ${url}`;
	};

	const createElement = async ({
		parentId,
		elementType,
		url,
		dataParser,
	}) => {
		const parentEl = document.getElementById(parentId);
		const el = document.createElement(elementType);
		const res = await fetch(url);

		if (res.ok || okException(res)) {
			const data = await res.json();
			el.innerText =
				(dataParser ? dataParser(data) : data) ??
				`Unable to get data from ${url}`;
		} else {
			el.innerText = `Bad response trying to get data from ${url}`;
		}

		parentEl.appendChild(el);
	};

	const createMultipleElements = async ({
		parentId,
		elementType,
		url,
		dataParser,
		dataKey,
	}) => {
		const parentEl = document.getElementById(parentId);
		const res = await fetch(url);

		if (res.ok || okException(res)) {
			const data = await res.json();
			console.log({ data });
			const arr = data[dataKey];

			if (!Array.isArray(arr)) {
				return (parentEl.innerText = `Fetched data is not an array`);
			}

			dataArr.forEach((d) => {
				const el = document.createElement(elementType);
				el.innerText =
					(dataParser ? dataParser(d) : d) ??
					`Unable to get data from ${url}`;
				parentEl.appendChild(el);
			});
		} else {
			parentEl.innerText = `Bad response trying to get data from ${url}`;
		}
	};

	const updateMultipleElementsSingleSource = async ({
		//parentId,
		url,
		elementSchemas,
	}) => {
		//const parentEl = document.getElementById(parentId);
		//if (!Array.isArray(elementSchemas))
		//return (parentEl.innerText = `Need to provide multiple element schemas`);

		const res = await fetch(url);
		if (!res.ok && !okException(res))
			return console.log(`Bad response trying to get data from ${url}`);

		const data = await res.json();
		console.log({ data });
		elementSchemas.forEach((e) => {
			const {
				elementId,
				elementType,
				dataKey,
				dataParser,
				classes,
				order,
			} = e;
			const elData = data[dataKey];

			if (elementId === "upcoming" && data.upcoming) {
				const containerEl = document.getElementById("upcoming");

				const getChildEl = (id, suffix) =>
					document.getElementById(`${id}-${suffix}`);

				const { srcDirectory } = e;

				//console.log(containerEl);
				//console.log(containerEl.children);
				for (const child of containerEl.children) {
					const count = child.id.split("-")[1];
					const d = data.upcoming[count];

					// const iconId = `${child.id}-icon`
					// const tempId = `${child.id}-temp`
					// const windId = `${child.id}-wind`
					// const descId = `${child.id}-desc`

					const name = getChildEl(child.id, "name");
					const icon = getChildEl(child.id, "icon");
					const temp = getChildEl(child.id, "temp");
					//const wind = getChildEl(child.id, "wind");
					//const desc = getChildEl(child.id, "desc");

					name.innerText = shortenDay(d.name);
					icon.src = parseIconSrc({
						isDaytime: d.isDaytime,
						shortForecast: d.shortForecast,
						srcDirectory,
					});
					temp.innerText = `${d.temperature}\xB0${d.temperatureUnit}`;
					//wind.innerText = `${d.windSpeed} ${d.windDirection}`;
					//desc.innerText = d.shortForecast;
				}
				//elArr.push(document.getElementById())
			} else if (!elData) {
				return console.log(
					`"${dataKey}" data not received. Check app settings at /config`
				);
			} else if (elData && elementType) {
				if (elementType === "svg") {
					const { srcDirectory } = e;
					const { isDaytime, shortForecast } = elData;
					const el = document.getElementById(elementId);
					el.src = parseIconSrc({
						isDaytime,
						shortForecast,
						srcDirectory,
					});

					// const el2 = document.createElement("svg");
					// el2.href = parseIconSrc({
					// 	isDaytime,
					// 	shortForecast,
					// 	srcDirectory,
					// });

					// const el3 = document.createElement("p");
					// el3.innerText = el2.src;

					// const parentEl = el.parentElement.parentElement;
					// parentEl.appendChild(el2);
					// parentEl.appendChild(el3);
				}
			} else if (Array.isArray(elData)) {
				elData.forEach((d) => {
					const el = document.getElementById(elementId);
					el.innerText =
						(dataParser ? dataParser(d) : d) ??
						`Something went wrong trying to get "${elData}" from ${url}`;
					//parentEl.appendChild(el);
				});
			} else {
				const el = document.getElementById(elementId);
				el.innerText =
					(dataParser ? dataParser(elData) : elData) ??
					`Something went wrong trying to get ${elData} from ${url}`;
				//parentEl.appendChild(el);
			}
		});
	};

	return {
		createElement,
		updateElement,
		createMultipleElements,
		updateMultipleElementsSingleSource,
	};
})();

export const getTime = (() => {
	const timeEl = document.getElementById("time");
	const timeOptions = {
		weekday: "short",
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		//second: "2-digit",
	};

	const clock = (updateInterval) => {
		const d = new Date();

		timeEl.innerText = d.toLocaleString([], timeOptions);
		setInterval(clock, updateInterval * 1000);
	};

	return { clock };
})();

export const refreshPageTimer = (updateInterval) => {
	setInterval(() => window.location.reload(), updateInterval * 1000);
};

export const populateForm = async ({ url, inputIds }) => {
	const res = await fetch(url);

	if (!res.ok && !okException(res)) {
		return console.log(`Unable to fetch form data from ${url}`);
	}

	const data = await res.json();
	inputIds.forEach((id) => {
		document.getElementById(id).value = data[id] ?? "";
	});
};
