import React from 'react';
import { Center, Text, View } from '@gluestack-ui/themed';
import {
    ScrollView,
    Input,
    InputField,
    InputSlot,
    InputIcon,
    SearchIcon,
} from '@gluestack-ui/themed';
import { RefreshControl, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import ListItem from '../../components/Transaction/ListItem';
import useTransaction from '../../utils/useTransaction';
import { useIsFocused } from '@react-navigation/native';

export default function Tranactions() {
    const isFocus = useIsFocused();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tranx, setTranx] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetchTranx();
    }, [isFocus]);

    const fetchTranx = async () => {
        const data = await useTransaction().getMany();
        if (Array.isArray(data)) setTranx(data);
        setTimeout(() => {
            setLoading(false);
        }, 400);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{ flex: 1, paddingTop: 50, paddingHorizontal: 18 }}
                >
                    <Input
                        variant="rounded"
                        size="xl"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                    >
                        <InputSlot pl="$3">
                            <InputIcon as={SearchIcon} />
                        </InputSlot>
                        <InputField placeholder="Search" />
                    </Input>
                    <ScrollView
                        marginTop={6}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() => {
                                    setLoading(true);
                                    fetchTranx();
                                }}
                            />
                        }
                    >
                        {tranx.length ? (
                            tranx.map((item, i) => (
                                <ListItem key={i} data={item} />
                            ))
                        ) : (
                            <Center>
                                <Text>No Transaction yet</Text>
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
