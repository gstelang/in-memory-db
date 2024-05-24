class Table {
    constructor(name) {
        this.name = name;
        this.columns = [];
        this.rows = []; 
        this.autoIncrementId = 1;
        this.indexes = new Map();
    }

    addColumn(column) {
        this.columns.push(column)
    }

    addRow(values) {
        // Check if all columns are present in the values and validate their types
        for (const column of this.columns) {
            if (!(column.name in values)) {
                throw new Error(`Missing value for column: ${column.name}`);
            }
            const valueType = typeof values[column.name];
            if (!this.validateType(column.type, valueType)) {
                throw new Error(`Invalid type for column: ${column.name}. Expected ${column.type} but got ${valueType}`);
            }
        }
        
        const row = { id: this.autoIncrementId++, ...values  };
        this.rows.push(row);
        return row.id;
    }

    validateType(expectedType, actualType) {
        const typeMapping = {
            'int': 'number',
            'varchar': 'string'
        };
        return typeMapping[expectedType] === actualType;
    }

    removeRow(id) {
        this.rows = this.rows.filter(row => row.id !== id);
    }

    selectStar() {
        
        const keys = Object.keys(this.rows[0]);
        console.log(keys.join(' '));
        return this.rows.map(row => {
            return Object.values(row).join(' ')
        }).join('\n');
    }

    createIndex(columnName) {
        const index = new Map();
        for (const row of this.rows) {
            const value = row[columnName];
            if (!index.has(value)) {
                index.set(value, []);
            }
            index.get(value).push(row);
        }
        this.indexes.set(columnName, index);
    }

    getIndex(columnName) {
        return this.indexes.get(columnName);
    }
}

export default Table;