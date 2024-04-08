export const getTime = (() => {
	const longOptions = {
		weekday: "short",
		month: "2-digit",
		day: "2-digit",
		year: "2-digit",
		hour: "numeric",
		minute: "numeric",
		//second: "numeric",
		hour12: true,
	};

	const shortOptions = {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	const d = new Date();

	const long = () => {
		const d = new Date();
		return d.toLocaleString("en-US", longOptions);
	};
	const short = () => {
		const d = new Date();
		return d.toLocaleString("en-US", shortOptions);
	};

	return { long, short };
})();
