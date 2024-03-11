import sqlite3 from "sqlite3";
import path from "path";
import { quotify, arrayJoin } from "../utils/stringHelpers.js";

const __dirname = import.meta.dirname;
const filename = path.join(__dirname, "app.db");
const separator = ", ";

export const connectToDb = () => {
	const db = new sqlite3.Database(filename, (e) => {
		if (e) {
			console.error(e.message);
		}

		console.log(`Connected to db: ${filename}`);
	});

	const close = () =>
		db.close((e) => {
			if (e) {
				return console.error(e.message);
			}

			console.log("closing db connection");
		});

	const run = (sql, { log } = { log: false }) =>
		db.run(sql, (e) => {
			if (e) {
				return console.error(e.message);
			}

			if (log === true) console.log("ran query: ", sql);
		});

	const readOneRow = (sql, rowCallback) =>
		db.get(sql, (err, row) => {
			if (err) {
				return console.error(e.message);
			}

			const result = rowCallback ? rowCallback(row) : row;

			//close();
			return result;
		});

	const readAllRows = (sql, rowCallback) =>
		db.all(sql, (err, rows) => {
			if (err) {
				return console.error(e.message);
			}

			const result = rowCallback
				? rows.forEach((row) => rowCallback(row))
				: rows;

			return result;
		});

	const upsertRows = ({ table, set, where }) => {
		const updateSql = `
            UPDATE ${table}
            SET ${Object.keys(set).reduce((prev, s) => prev + s + ", ", "")}
            WHERE ${where.key + "=" + where.val}
        `;

		const keys = Object.keys(set); //.reduce((prev, k) => prev + k + ", ");
		const vals = Object.values(set); //.map((prev, v) => prev + v + ", ");

		const keyString = keys.reduce((prev, k) => prev + k + ", ", "");
		const valString = vals.reduce((prev, v) => prev + v + ", ", "");

		const upsertSql = `
            INSERT INTO ${table} (${keyString}) VALUES (${valString})
            ON CONFLICT("id") DO UPDATE SET ${keys
				.filter((k) => k !== "id")
				.map((k) => k + "=excluded." + k)
				.reduce((prev, k) => prev + k + ", ", "")}
        `;

		const result = run(upsertSql);
		//close();

		return result;
	};

	// const arrayJoin = (arr, separator, callback) =>
	// 	arr.reduce((acc, item, counter) => {
	// 		if (counter === arr.length - 1) {
	// 			return callback ? acc + callback(item) : acc + item;
	// 		} else {
	// 			return callback
	// 				? acc + callback(item) + separator
	// 				: acc + item + separator;
	// 		}
	// 	}, "");

	// const quotify = (value) => {
	// 	if (typeof value !== "string") {
	// 		return value;
	// 	} else {
	// 		return `"${value}"`;
	// 	}
	// };

	const insertRow = ({ table, set }) => {
		const keys = Object.keys(set);
		const vals = Object.values(set);
		// const keyString = keys.reduce((prev, k, counter) => {
		// 	if (counter === keys.length - 1) {
		// 		return prev + k;
		// 	} else {
		// 		return prev + k + sep;
		// 	}
		// }, "");

		const keyString = arrayJoin(keys, separator);
		const valString = arrayJoin(vals, separator, quotify);

		// const valString = vals.reduce(
		// 	(prev, v, counter) =>
		// 		`${prev} ${typeof v !== "string" ? v : '"' + v + '"'}, `,
		// 	""
		// );

		const sql = `INSERT INTO ${table} (${keyString}) VALUES (${valString});`;
		console.log(sql);
		run(sql);
	};

	const initTable = (tableName, columnSchemaStr) => {
		const sql = `
            CREATE TABLE IF NOT EXISTS ${tableName}(
                ${columnSchemaStr}
            );`;

		const result = run(sql);
		return result;
	};

	const dropTable = (table) => {
		run(`DROP TABLE IF EXISTS ${table}`);
		console.log("Dropped table");
	};

	return {
		initTable,
		readAllRows,
		readOneRow,
		upsertRows,
		insertRow,
		dropTable,
		close,
	};
};
