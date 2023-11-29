import moment from 'moment';
import useSqlite from './useSqlite';
import { TranxProps } from '../models/types/transaction';

export default () => {
    const db = useSqlite().openDatabase();

    const create = async (data: TranxProps) => {
        const now = moment().format();
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO transactions (fund_id, amount, type, note, form, date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
                    [
                        data.fund_id,
                        data.amount,
                        data.type,
                        data.note as string,
                        data.form,
                        now,
                        now,
                    ],
                    (tx, result) => {
                        resolve({
                            status: 'success',
                            message: 'Transaction successfully created!',
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

    const update = async (id: number | string, name: string) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE funds SET name = ? WHERE id = ?',
                    [name, id],
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
    }

    return {
        create,
        remove,
        update,
        getMany,
        getUnique
    };
};
