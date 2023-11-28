import * as SQLite from 'expo-sqlite';

export default () => {

    const openDatabase = () => {
        const db = SQLite.openDatabase('fund.db');
        return db;
    }

    return {
        openDatabase
    }
}