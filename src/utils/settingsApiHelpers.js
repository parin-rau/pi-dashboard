import { openDb } from "../db/sqlite.js";
import { settingsSchema } from "../db/schema.js";

export const readSettings = async (fields = null) => {
	const { close, getOne, makeTable } = await openDb();
	try {
		const table = "settings";

		await makeTable({ table, schema: settingsSchema });

		const { data } = await getOne({
			table,
			condition: { id: 1 },
			columns: fields,
		});

		await close();

		return data;
	} catch (e) {
		console.error(e);
		await close();
	}
};

export const writeSettings = async (set) => {
	//IN: settings object from html form
	//UPSERT, id = 1

	const { close, upsertOne, makeTable } = await openDb();
	try {
		const table = "settings";
		await makeTable({ table, schema: settingsSchema });
		const result = await upsertOne({
			table,
			set: { ...set, id: 1 },
			conflictKey: "id",
		});

		await close();
		return result;
	} catch (e) {
		console.error(e);
		await close();
	}
};
