import sqlite3 from "sqlite3";
import path from "path";
import { query } from "../utils/queryBuilder.js";

const __dirname = import.meta.dirname;
const filename = path.join(__dirname, "app.db");

sqlite3.verbose();

export const openDb = async () => {
	const db = new sqlite3.Database(filename, (e) => {
		if (e) {
			console.error(e.message);
		}

		console.log(`Connected to db: ${filename}`);
	});

	const close = () =>
		new Promise((resolve, reject) =>
			db.close((e) => {
				if (e) {
					console.error(e.message);
					reject(e);
				}

				console.log("Closing db connection");
				resolve();
			})
		);

	const getOne = ({ table, condition, columns }) =>
		new Promise((resolve, reject) => {
			const sql = query.select({ table, condition, columns });

			db.get(sql, (err, data) => {
				if (err) {
					console.error(err.message);
					reject({ success: false });
				} else {
					data &&
						console.log(
							`Found row matching conditions in "${table}"`
						);
					resolve({ data, success: true });
				}
			});
		});

	const getMany = ({ table, condition, columns }) =>
		new Promise((resolve, reject) => {
			const sql = query.select({ table, condition, columns });

			db.all(sql, (err, data) => {
				if (err) {
					console.error(err.message);
					reject({ success: false });
				} else {
					const foundCount = rows.length;
					console.log(
						`Found ${foundCount} matching rows in "${table}"`
					);
					resolve({ data, foundCount, success: true });
				}
			});
		});

	const defaultInsertOptions = { suppressLog: false };
	const insertOne = ({ table, set, options = defaultInsertOptions }) =>
		new Promise((resolve, reject) => {
			const isArr = Array.isArray(set);

			if (isArr) {
				reject({
					success: false,
					insertedCount: 0,
					message: "Use insertMany for multiple row insertion",
				});
			} else {
				const sql = query.insert({ table, set });
				db.run(sql, (err) => {
					if (err) {
						console.error(err.message);
						reject({ success: false, insertedCount: 0 });
					} else {
						!options.suppressLog &&
							console.log(`Inserted row into ${table}`);
						resolve({ success: true, insertedCount: 1 });
					}
				});
			}
		});

	const insertMany = ({ table, set }) =>
		new Promise((resolve, reject) => {
			const isArr = Array.isArray(set);
			let insertedCount = 0;
			if (!isArr) {
				reject({
					success: false,
					message: "Set input is not an array",
				});
			} else {
				try {
					set.forEach(async (s) => {
						await insertOne({
							table,
							set: s,
							options: { suppressLog: true },
						});
						insertedCount++;
						if (insertedCount === set.length) {
							console.log(
								`Inserted ${insertedCount} rows into ${table}`
							);
							resolve({ success: true, insertedCount });
						}
					});
				} catch (e) {
					reject({ success: false, insertedCount });
				}
			}
		});

	const updateOne = ({ table, set, condition }) =>
		new Promise((resolve, reject) => {
			const sql = query.update({ table, set, condition });
			db.run(sql, (e) => {
				if (e) {
					console.error(e.message);
					reject({ success: false });
				} else {
					console.log("Updated rows in ", table);
					resolve({ sucess: true });
				}
			});
		});

	const upsertOne = ({ table, set, conflictKey }) =>
		new Promise((resolve, reject) => {
			const sql = query.upsert({ table, set, conflictKey });
			console.log(sql);
			db.run(sql, (e) => {
				if (e) {
					console.error(e.message);
					reject({ success: false });
				} else {
					console.log(`Upserted rows in "${table}"`);
					resolve({ success: true });
				}
			});
		});

	const deleteRows = ({ table, condition }) =>
		new Promise((resolve, reject) => {
			const sql = query.deleteRows({ table, condition });
			console.log(sql);
			db.run(sql, (e) => {
				if (e) {
					console.error(e);
					reject({ success: false });
				} else {
					console.log("Deleted row(s) from ", table);
					resolve({ success: true });
				}
			});
		});

	const makeTable = ({ table, schema }) =>
		new Promise((resolve, reject) => {
			const sql = query.createTable({ table, schema });
			db.run(sql, (err) => {
				if (err) {
					console.error(err.message);
					reject({ success: false });
				} else {
					console.log(`Found/created table: ${table}`);
					resolve({ success: true });
				}
			});
		});

	const dropTable = (table) =>
		new Promise((resolve, reject) => {
			const sql = query.dropTable({ table });
			db.run(sql, (err) => {
				if (err) {
					console.error(err.message);
					reject({ success: false });
				} else {
					console.log(`Dropped table: ${table}`);
					resolve({ success: true });
				}
			});
		});

	return {
		makeTable,
		dropTable,
		getOne,
		getMany,
		insertOne,
		insertMany,
		updateOne,
		upsertOne,
		deleteRows,
		close,
	};
};
