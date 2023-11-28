import moment from 'moment'
import useSqlite from "./useSqlite"

export default () => {
    const db = useSqlite().openDatabase()

    const create = async (name:string) => {
        const now = moment().format()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO funds (name, created_at, updated_at) VALUES (?, ?, ?);', [name, now, now], (tx, result) => {
                        resolve({status: 'success', message: 'Fund successfully created!', data: result})
                    }, (_, error): boolean | any => {
                        reject(error)
                    }
                )
            })
        })
    }

    const remove = async (id: number | string) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM funds WHERE id = ?', [id], () => {
                    resolve({status: 'success', message: 'Fund successfully deleted!'})
                }, (error): boolean | any => {
                    reject(error)
                })
            })
        })
    }

    const update = async (id:number | string, name: string) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE funds SET name = ? WHERE id = ?', [name, id], () => {
                    resolve({status: 'success', message: 'Fund successfully updated!'})
                }, (error): boolean | any => {
                    reject(error)
                })
            })
        })
    }

    const getMany = () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM funds;', [], (_, { rows: { _array } }) => {
                    resolve(_array)
                }, (_, error): boolean | any => {
                    reject(error)
                })
            })
        })
    }

    return {
        create,
        remove,
        update,
        getMany
    }
}