import { settingsSchema } from "../db/schema.js";
import { writeSettings, readSettings } from "../utils/settingsApiHelpers.js";
import { port as fallbackPort } from "../index.js";

// //import { Db } from "../db/sqlite";

// //const { initTable, readAllRows, readOneRow, upsertRows } = openDb();
// const table = "settings";

// export const writeSettings = (formData) => {
// 	//	const createTable = initTable(table, settingsSchema);
// 	const updateRowsResult = upsertRows({
// 		table,
// 		set,
// 		where: { key: "id", val: 0 },
// 	});
// };

// export const readSettings = () => {
// 	try {
// 		//		const rows = readAllRows(`SELECT * FROM ${table}`);

// 		console.log(rows);
// 	} catch (e) {
// 		console.error(e);
// 	}
// };

export const readConfig = async () => {
	const fallbackData = {
		success: false,
		location: undefined,
		locationiq_api_key: undefined,
		port: fallbackPort,
	};

	try {
		const data = await readSettings([
			"location",
			"locationiq_api_key",
			"port",
		]);

		if (!data) {
			return fallbackData;
		} else {
			return data;
		}
	} catch (e) {
		console.error(e);
		return fallbackData;
	}
};

export const postConfig = async ({ port, location, locationiq_api_key }) => {
	try {
		const sanitized = {
			port:
				Number.isInteger(Number(port)) && Number(port) <= 2 ** 16 - 1
					? Number(port)
					: fallbackPort,
			location: location.trim(),
			locationiq_api_key: locationiq_api_key.trim(),
		};

		const result = await writeSettings({
			port: sanitized.port,
			location: sanitized.location,
			locationiq_api_key: sanitized.locationiq_api_key,
		});
		return result;
	} catch (e) {
		console.error(e);
		return { success: false };
	}
};
