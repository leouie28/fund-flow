import moment from 'moment';
import useSqlite from './useSqlite';
import { FundProps } from '../models/types/fund';

export default () => {
    const db = useSqlite().openDatabase();

    const create = async (data: FundProps) => {
        const now = moment().format();
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO funds (name, currency, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?);',
                    [
                        data.name,
                        data.currency,
                        data.description as string,
                        now,
                        now,
                    ],
                    (tx, result) => {
                        resolve({
                            status: 'success',
                            message: 'Fund successfully created!',
                            data: result,
                        });
                    },
                    (_, error): boolean | any => {
                        reject(error);
                    }
                );
            });
        });
    };

    const remove = async (id: number | string) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'DELETE FROM funds WHERE id = ?',
                    [id],
                    () => {
                        resolve({
                            status: 'success',
                            message: 'Fund successfully deleted!',
                        });
                    },
                    (error): boolean | any => {
                        reject(error);
                    }
                );
            });
        });
    };

    const update = async (id: number | string, data: FundProps) => {
        return new Promise((resolve, reject) => {
            const now = moment().format();
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE funds SET name = ?, currency = ?, description = ?, updated_at = ? WHERE id = ?',
                    [
                        data.name,
                        data.currency,
                        data.description as string,
                        now,
                        id,
                    ],
                    () => {
                        resolve({
                            status: 'success',
                            message: 'Fund successfully updated!',
                        });
                    },
                    (error): boolean | any => {
                        reject(error);
                    }
                );
            });
        });
    };

    const getManyForDashboard = () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT
                        funds.id AS id,
                        funds.name AS name,
                        funds.currency AS currency,
                        funds.description AS description,
                        funds.created_at AS created_at,
                        funds.updated_at AS updated_at,
                        SUM(CASE WHEN transactions.type = 'income' THEN transactions.amount ELSE 0 END) AS income_amount_sum,
                        SUM(CASE WHEN transactions.type = 'expense' THEN transactions.amount ELSE 0 END) AS expense_amount_sum
                    FROM 
                        funds 
                    LEFT JOIN 
                        transactions ON funds.id = transactions.fund_id
                    GROUP BY
                        funds.id
                    ORDER BY funds.id DESC;`,
                    [],
                    (_, { rows: { _array } }) => {
                        resolve(_array);
                    },
                    (_, error): boolean | any => {
                        reject(error);
                    }
                );
            });
        });
    };

    const getMany = () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM funds ORDER BY id DESC;',
                    [],
                    (_, { rows: { _array } }) => {
                        resolve(_array);
                    },
                    (_, error): boolean | any => {
                        reject(error);
                    }
                );
            });
        });
    };

    const getUnique = (id: string | number) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM funds WHERE id = ?;',
                    [id],
                    (_, { rows: { _array } }) => {
                        resolve(_array.length ? _array[0] : null);
                    },
                    (_, error): boolean | any => {
                        reject(error);
                    }
                );
            });
        });
    };

    return {
        create,
        remove,
        update,
        getMany,
        getManyForDashboard,
        getUnique,
    };
};
