export const arrayJoin = (arr, separator, callback) =>
	arr.reduce((acc, item, counter) => {
		if (counter === arr.length - 1) {
			return callback ? acc + callback(item) : acc + item;
		} else {
			return callback
				? acc + callback(item) + separator
				: acc + item + separator;
		}
	}, "");

export const quotify = (value) => {
	if (typeof value !== "string") {
		return value;
	} else {
		return `"${value}"`;
	}
};
