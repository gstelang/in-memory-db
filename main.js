import DatabaseManager from './db/DatabaseManager.js'
// Usage
const dbManager = new DatabaseManager();

// create db
dbManager.createDatabase('main_db');

// get db
const main_db = dbManager.getDatabase('main_db');

// create table
main_db.createTable('person');

// add columns
dbManager.addColumn("main_db", "person", "name", "varchar");
dbManager.addColumn("main_db", "person", "age", "int");

// add rows
dbManager.addRow('main_db', 'person', { name: "John", age: 39 });
dbManager.addRow('main_db', 'person', { name: "Joe", age: 39 });

console.log("Select * from person", dbManager.selectAllRows('main_db', 'person'));

console.log("**** BEGIN TRANSACTION ****")
dbManager.beginTransaction('main_db');
dbManager.addRow('main_db', 'person', { name: 'Sam', age: 20 });
dbManager.addRow('main_db', 'person', { name: 'Sammy', age: 20 });

console.log('Before rollback:');
console.log("**** Before Rollback TRANSACTION ****")
console.log("Select * from person", dbManager.selectAllRows('main_db', 'person'));

console.log("**** AFTER Rollback TRANSACTION ****")
dbManager.rollbackTransaction('main_db');
console.log("Select * from person \n", dbManager.selectAllRows('main_db', 'person'));



dbManager.createIndex("main_db", "person", "age");

// should throw error
// dbManager.addRow('main_db', 'person', { name: "Virat", age: "33" });

main_db.createTable('salary');

const personTable = main_db.getTable('person');
personTable.addColumn()

console.log(personTable);
console.log("Main_db tables:", main_db.getAllTables());

dbManager.createDatabase('secondary_db');
const secondary_db = dbManager.getDatabase('secondary_db');
secondary_db.createTable('sales');
secondary_db.createTable('transaction');

console.log("Secondary_db tables: ", secondary_db.getAllTables());

console.log(dbManager);
console.log(dbManager.getAllDatabase());