export const getData = async ({ parentId, elementType, url, dataParser }) => {
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

export const getTime = async ({ parentId }) => {
	const parent = document.getElementById(parentId);
	const date = document.createElement("span");
	const d = new Date();

	const options = {
		weekday: "short",
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	date.innerText = d.toLocaleString([], options);

	parent.appendChild(date);
};
