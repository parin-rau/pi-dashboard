import {
	toInsertString,
	toWhereString,
	toSelectString,
	toExcludedString,
} from "./stringHelpers.js";

const select = ({ table, condition, columns }) => {
	const select = `SELECT ${toSelectString(columns)}`;
	const from = `FROM ${table}`;
	const where = condition ? `WHERE ${toWhereString(condition)}` : ``;

	return [select, from, where].join(" ");
};

const insert = ({ table, set }) => {
	const { keys, values } = toInsertString(set);
	return `INSERT INTO ${table} (${keys}) VALUES (${values})`;
};

const update = ({ table, set, condition }) => {
	const update = `UPDATE ${table}`;
	const SET = `SET ${toWhereString(set)}`;
	const where = `WHERE ${toWhereString(condition)}`;
	return [update, SET, where].join(" ");
};

const upsert = ({ table, set, conflictKey }) => {
	const { keys, values } = toInsertString(set);
	const insert = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
	const conflict = `ON CONFLICT (${conflictKey}) DO UPDATE SET`;
	const excluded = toExcludedString(set);
	return [insert, conflict, excluded].join(" ");
};

const deleteRows = ({ table, condition }) =>
	`DELETE FROM ${table} WHERE ${toWhereString(condition)}`;

const createTable = ({ table, schema }) =>
	`CREATE TABLE IF NOT EXISTS ${table} (${schema})`;

const dropTable = ({ table }) => `DROP TABLE IF EXISTS ${table}`;

export const query = {
	select,
	insert,
	update,
	upsert,
	deleteRows,
	createTable,
	dropTable,
};
