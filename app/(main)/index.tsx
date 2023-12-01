import React from 'react';
import { Center, Text, View } from '@gluestack-ui/themed';
import { ScrollView } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import Card from '../../components/Fund/Card';
import { useIsFocused } from '@react-navigation/native';
import useFund from '../../utils/useFund';

export default function TabOneScreen() {
    const isFocus = useIsFocused();
    const { getMany, getManyForDashboard } = useFund();
    const [funds, setFunds] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetchFund();
    }, [isFocus]);

    const fetchFund = async () => {
        const data = await getManyForDashboard();
        if (Array.isArray(data)) setFunds(data);
    };

    return (
        <View bg="$secondary50" style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingTop: 58 }}>
                    <ScrollView paddingHorizontal={18}>
                        {funds.length ? (
                            funds.map((item, i) => <Card key={i} data={item} />)
                        ) : (
                            <Center>
                                <Text>No Fund found</Text>
                            </Center>
                        )}
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
