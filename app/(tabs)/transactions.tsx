import { View } from '@gluestack-ui/themed';
import {
    ScrollView,
    Input,
    InputField,
    InputSlot,
    InputIcon,
    SearchIcon
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import ListItem from '../../components/Transaction/ListItem';

export default function Tranactions() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1, paddingTop: 50, paddingHorizontal: 18}}>
                <Input
                    variant="rounded"
                    size="xl"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    // marginBottom={4}
                >
                    <InputSlot pl="$3">
                        <InputIcon as={SearchIcon} />
                    </InputSlot>
                    <InputField placeholder="Search" />
                </Input>
                    <ScrollView marginTop={6}>
                        {Array.of('4545', '3444', '1000', '4000', '10000').map((item,i) => (
                            <ListItem key={i} data={item} />
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
