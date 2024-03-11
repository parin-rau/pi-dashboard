export const getData = (() => {
	const updateElement = async ({ elementId, url, dataParser }) => {
		const el = document.getElementById(elementId);
		const res = await fetch(url);

		if (!res.ok) {
			return (el.innerText = `Bad response trying to get data from ${url}`);
		}

		const data = await res.json();
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

		if (res.ok) {
			const data = await res.json();
			el.innerText =
				(dataParser ? dataParser(data) : data) ??
				`Unable to get data from ${url}`;
		} else {
			el.innerText = `Bad response trying to get data from ${url}`;
		}

		parentEl.appendChild(el);
	};

	return { createElement, updateElement };
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
