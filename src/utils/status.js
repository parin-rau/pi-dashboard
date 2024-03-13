export const code = (result) => {
	const data = [];
	let dataCount = 0;

	for (const x in result) {
		if (x !== "success") {
			data.push({ [x]: result[x] });
			dataCount++;
		}
	}

	console.log({ data, dataCount });

	if (data.length > 0 && result.success) {
		return 200;
	} else if (!data && result.success) {
		return 404;
	} else {
		return 400;
	}
};
