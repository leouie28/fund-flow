import React from 'react';
import { View } from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import Card from '../../components/Fund/Card';
import { useIsFocused } from '@react-navigation/native';
import useFund from '../../utils/useFund';

export default function TabOneScreen() {
    const isFocus = useIsFocused();
    const { getMany } = useFund();
    const [funds, setFunds] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetchFund();
    }, [isFocus]);

    const fetchFund = async () => {
        const data = await getMany();
        if (Array.isArray(data)) setFunds(data);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{ flex: 1, paddingTop: 50, paddingHorizontal: 18 }}
                >
                    <ScrollView>
                        {funds.map((item, i) => (
                            <Card key={i} data={item} />
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
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
