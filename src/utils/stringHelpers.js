// export const arrayJoin = (arr, separator, callback) =>
// 	arr.reduce((acc, item, counter) => {
// 		if (counter === arr.length - 1) {
// 			return callback ? acc + callback(item) : acc + item;
// 		} else {
// 			return callback
// 				? acc + callback(item) + separator
// 				: acc + item + separator;
// 		}
// 	}, "");

export const range = (firstNum, lastNum) => {
	const output = [];
	for (let i = firstNum; i <= lastNum; i++) output.push(i);
	return output;
};

export const arrayJoin = (arr, separator, callback) => {
	if (callback) {
		const modifiedArr = arr.map((i) => callback(i));
		return modifiedArr.join(separator);
	} else {
		return arr.join(separator);
	}
};

export const quotify = (value) => {
	if (typeof value !== "string") {
		return value;
	} else {
		return `"${value}"`;
	}
};

export const joinStr = (strArr, separator) => strArr.join(separator);

export const toSelectString = (columns) => {
	if (columns && columns.length > 0) {
		return columns.join(", ");
	} else {
		return "*";
	}
};

export const toWhereString = (condition, separator = "OR") => {
	const arr = [];
	for (const x in condition) {
		const isArr = Array.isArray(condition[x]);
		if (isArr) {
			condition[x].forEach((c) => arr.push(`${x} = ${quotify(c)}`));
		} else {
			arr.push(`${x} = ${quotify(condition[x])}`);
		}
	}
	return joinStr(arr, ` ${separator} `);
};

export const toInsertString = (set, separator = ", ") => {
	const keys = arrayJoin(Object.keys(set), separator);
	const values = arrayJoin(Object.values(set), separator, quotify);
	return { keys, values };
};

// export const toUpsertString = (set) => {
// 	const keys = Object.keys(set);
// };

export const toExcludedString = (set) => {
	const keys = Object.keys(set);
	const arr = [];
	keys.forEach((k) => arr.push(`${k} = excluded.${k}`));
	return arr.join(", ");
};
