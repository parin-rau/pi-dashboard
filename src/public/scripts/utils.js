const okException = (res) => [400, 404].includes(res.status);

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

	const createMultipleElementsSingleSource = async ({
		parentId,
		url,
		elementSchemas,
	}) => {
		const parentEl = document.getElementById(parentId);
		if (!Array.isArray(elementSchemas))
			return (parentEl.innerText = `Need to provide multiple element schemas`);

		const res = await fetch(url);
		if (!res.ok && !okException(res))
			return (parentEl.innerText = `Bad response trying to get data from ${url}`);

		const data = await res.json();
		elementSchemas.forEach((e) => {
			const { elementType, dataKey, dataParser, order } = e;
			const elData = data[dataKey];

			elData.forEach((d) => {
				const el = document.createElement(elementType);
				el.innerText =
					(dataParser ? dataParser(d) : d) ??
					`Something went wrong trying to get data from ${url}`;
				parentEl.appendChild(el);
			});
		});
	};

	return {
		createElement,
		updateElement,
		createMultipleElements,
		createMultipleElementsSingleSource,
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
