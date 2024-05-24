import Database from "./Database.js";
import Column from "./Column.js";
class DatabaseManager {
    constructor() {
        this.databases = new Map();
        this.transactions = new Map();
    }

    createDatabase(name) {
        if (!this.databases.has(name)) {
            const database = new Database(name);
            this.databases.set(name, database);
        }
    }

    addColumn(dbName, tableName, columnName, columnType) {
        const database = this.databases.get(dbName);
        if (database) {
            const table = database.getTable(tableName);
            if (table) {
                const column = new Column(columnName, columnType);
                table.addColumn(column);
            }
        }
    }

    getDatabase(name) {
        return this.databases.get(name);
    }

    getAllDatabase() {
        return [...this.databases.keys()];
    }

    addRow(dbName, tableName, values) {
        const database = this.databases.get(dbName);
        if (database) {
            const table = database.getTable(tableName);
            if (table) {
                const rowId = table.addRow(values);
                const transaction = this.transactions.get(dbName);
                if (transaction) {
                    const operations = transaction.get(tableName) || [];
                    operations.push({ type: 'insert', rowId: rowId });
                    transaction.set(tableName, operations);
                }
            }
        }
    }

    selectAllRows(dbName, tableName) {
        const database = this.databases.get(dbName);
        if (database) {
            const table = database.getTable(tableName);
            if (table) {
                return table.selectStar();
            }
        }
    }

    beginTransaction(dbName) {
        const db = this.databases.get(dbName);
        if (db) {
            const transaction = new Map();
            this.transactions.set(dbName, transaction);
        }
    }

    commitTransaction(dbName) {
        const transaction = this.transactions.get(dbName);
        if (transaction) {
            transaction.clear();
            this.transactions.delete(dbName);
        }
    }

    rollbackTransaction(dbName) {
        const transaction = this.transactions.get(dbName);
        if (transaction) {
            for (const [tableName, operations] of transaction.entries()) {
                const table = this.databases.get(dbName).getTable(tableName);
                if (table) {
                    for (const operation of operations) {
                        if (operation.type === 'insert') {
                            table.removeRow(operation.rowId);
                        }
                    }
                }
            }
            transaction.clear();
            this.transactions.delete(dbName);
        }
    }

    createIndex(dbName, tableName, columnName) {
        const database = this.databases.get(dbName);
        if (database) {
            const table = database.getTable(tableName);
            if (table) {
                table.createIndex(columnName);
            }
        }
    }

    getIndex(dbName, tableName, columnName) {
        const database = this.databases.get(dbName);
        if (database) {
            const table = database.getTable(tableName);
            if (table) {
                return table.getIndex(columnName);
            }
        }
        return null; // Error: Database, table, or index not found
    }
}

export default DatabaseManager;