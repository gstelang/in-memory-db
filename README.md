# in-memory-db


```php
+-----------------------------------+
|             DatabaseManager       |
+-----------------------------------+
| - databases: Map<string, Database>|
| - transactions: Map<string, Map<string, Array<{type: string, rowId: number}>>> |
+-----------------------------------+
| + createDatabase(name: string)    |
| + beginTransaction(dbName: string)|
| + commitTransaction(dbName: string)|
| + rollbackTransaction(dbName: string)|
| + createTable(dbName: string, tableName: string) |
| + addColumn(dbName: string, tableName: string, columnName: string, columnType: string) |
| + addRow(dbName: string, tableName: string, values: Object) |
| + createIndex(dbName: string, tableName: string, columnName: string) |
| + getIndex(dbName: string, tableName: string, columnName: string): Map |
+-----------------------------------+

+-----------------------------------+
|              Database             |
+-----------------------------------+
| - name: string                    |
| - tables: Map<string, Table>      |
+-----------------------------------+
| + createTable(name: string): void |
| + getTable(name: string): Table  |
+-----------------------------------+

+-----------------------------------+
|                Table              |
+-----------------------------------+
| - name: string                    |
| - columns: Array<Column>          |
| - rows: Array<Object>              |
| - autoIncrementId: number          |
| - indexes: Map<string, Map<any, Array<Object>>> |
+-----------------------------------+
| + addRow(values: Object): number  |
| + addColumn(column: Column): void |
| + createIndex(columnName: string): void |
| + getIndex(columnName: string): Map |
| + removeRow(id: number): void      |
+-----------------------------------+

+-----------------------------------+
|              Column               |
+-----------------------------------+
| - name: string                    |
| - type: string                    |
+-----------------------------------+
| + constructor(name: string, type: string) |
+-----------------------------------+
```