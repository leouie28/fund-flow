import React from 'react';
import { View } from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import Card from '../../components/Fund/Card';
import useSqlite from '../../utils/useSqlite';
import Toaster from '../../components/Toast';

const db = useSqlite().openDatabase()

export default function TabOneScreen() {

    React.useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS funds (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name TEXT UNIQUE, 
                    currency TEXT,
                    description TEXT NULL,
                    created_at DATETIME CURRENT_TIMESTAMP,
                    updated_at DATETIME NULL CURRENT_TIMESTAMP
                );`
            )
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    fund_id INTEGER NOT NULL,
                    amount FLOAT NOT NULL,
                    type TEXT CHECK(type IN ('income', 'expense')),
                    note TEXT NULL,
                    form TEXT CHECK(form IN ('cash', 'credit')),
                    date DATETIME,
                    created_at DATETIME CURRENT_TIMESTAMP,
                    updated_at DATETIME NULL CURRENT_TIMESTAMP
                );`
            )
        })
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1, paddingTop: 50, paddingHorizontal: 18}}>
                    <ScrollView>
                        {Array.of('Personal','Business','Company Outing','Francise Fund').map((item,i) => (
                            <Card key={i} data={item} />
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
