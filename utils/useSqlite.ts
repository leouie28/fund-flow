import * as SQLite from 'expo-sqlite';

export default () => {
    const openDatabase = () => {
        const db = SQLite.openDatabase('fund.db');
        return db;
    };

    const init = () => {
        const db = openDatabase();

        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS funds (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name TEXT UNIQUE, 
                    currency TEXT NOT NULL,
                    description TEXT NULL,
                    created_at DATETIME DEFAULT (datetime('now', 'localtime')),
                    updated_at DATETIME NULL DEFAULT (datetime('now', 'localtime'))
                );`,
                [],
                () => console.log('fund table created'),
                (_, error): any =>
                    console.log(
                        'failed to create fund table! error at: ',
                        error
                    )
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    fund_id INTEGER NOT NULL,
                    amount FLOAT NOT NULL,
                    type TEXT CHECK(type IN ('income', 'expense')),
                    note TEXT NULL,
                    form TEXT CHECK(form IN ('cash', 'credit')),
                    date DATETIME,
                    created_at DATETIME DEFAULT (datetime('now', 'localtime')),
                    updated_at DATETIME NULL DEFAULT (datetime('now', 'localtime'))
                );`,
                [],
                () => console.log('transaction table created'),
                (_, error): any =>
                    console.log(
                        'failed to create transaction table! error at: ',
                        error
                    )
            );
        });
    };

    return {
        openDatabase,
        init,
    };
};
