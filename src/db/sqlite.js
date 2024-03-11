import sqlite3 from "sqlite3";
import path from "path";

const __dirname = import.meta.dirname;
const filename = path.join(__dirname, "app.db");

export const connectToDb = () => {
	const db = new sqlite3.Database(filename, (e) => {
		if (e) {
			return console.error(e.message);
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

	const run = (sql) =>
		db.run(sql, (e) => {
			if (e) {
				return console.error(e.message);
			}

			close();

			console.log("ran query: ", sql);
		});

	const readOneRow = (sql, rowCallback) =>
		db.get(sql, (err, row) => {
			if (err) {
				return console.error(e.message);
			}

			const result = rowCallback ? rowCallback(row) : row;

			close();
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

			close();
			return result;
		});

	const upsertRows = ({ table, set, where }) => {
		const updateSql = `
            UPDATE ${table}
            SET ${Object.keys(set).reduce((prev, s) => prev + s + ", ")}
            WHERE ${where.key + "=" + where.val}
        `;

		const keys = Object.keys(set); //.reduce((prev, k) => prev + k + ", ");
		const vals = Object.values(set); //.map((prev, v) => prev + v + ", ");

		const keyString = keys.reduce((prev, k) => prev + k + ", ");
		const valString = vals.reduce((prev, v) => prev + v + ", ");

		const upsertSql = `
            INSERT INTO ${table}(${keyString}) VALUES(${valString})
            ON CONFLICT("id") DO UPDATE SET ${keys
				.filter((k) => k !== "id")
				.map((k) => k + "=excluded." + k)
				.reduce((prev, k) => prev + k + ", ")}
        `;

		const result = run(upsertSql);
		close();

		return result;
	};

	const insertRow = ({ table, set }) => {};

	const initTable = (tableName, columnSchemaStr) => {
		// const sql = `
		//     CREATE TABLE IF NOT EXISTS ${table_name}(
		//         ${columns.reduce((prev, c) => prev + c + ", ")}
		//     );`;

		const sql = `
            CREATE TABLE IF NOT EXISTS ${tableName}(
                ${columnSchemaStr}
            );`;

		// const s = `
		//     CREATE TABLE IF NOT EXISTS ${table_name}(
		//         id INTEGER NOT NULL PRIMARY KEY,
		//         port INTEGER,
		//         lat REAL,
		//         lon REAL,
		//         location TEXT
		//         locationiq_api_key TEXT,
		//     );`;

		// const s2 = `
		// id INTEGER NOT NULL PRIMARY KEY,
		// port INTEGER,
		// lat REAL,
		// lon REAL,
		// location TEXT
		// locationiq_api_key TEXT,
		// `;

		const result = run(sql);
		close();
		return result;
	};

	// const select = (columns, table_name) => {
	// 	const sql = `
	//         SELECT ${columns.map((c) => (columns.length > 1 ? c : c + ", "))}
	//         FROM ${table_name};
	//     `;
	// 	return get(sql);
	// };

	const dropTable = (table) => db.run(`DROP TABLE ${table}`);
	//const updateRow = () => run();

	return {
		initTable,
		readAllRows,
		readOneRow,
		upsertRows,
		insertRow,
		dropTable,
	};
};
