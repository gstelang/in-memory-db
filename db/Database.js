import Table from './Table.js';

class Database {
    constructor(name) {
        this.dbName = name;
        this.tableMap = new Map();
    }

    createTable(name) {
        let table = new Table(name);
        this.tableMap.set(name, table);
    }

    getTable(name) {
        return this.tableMap.get(name);
    }

    getAllTables() {
        return [...this.tableMap.keys()]
    }
}

export default Database;