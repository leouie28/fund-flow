import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import { 
    Box,
    Heading,
    HStack, 
    Text, 
    View,
} from '@gluestack-ui/themed'
import { MoreHorizontal } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Line from '../Charts/Line';
import MenuUi from '../Ui/Menu';

interface PropsType {
    data: any
}

export default function Card({ data }:PropsType ) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    return (
        <Box borderRadius='$lg' style={style.container}>
            <View style={{flex: 10, flexDirection: 'row'}}>
                <Heading color={Colors.slate[600]} flex={9} numberOfLines={2}>
                    {data}
                </Heading>
                <View>
                    <MenuUi open={isOpen} close={() => setIsOpen(false)}>
                        <MoreHorizontal 
                            color={Colors.slate["600"]} 
                        />
                        {/* <Pressable
                            // onPress={() => setIsOpen(true)}
                        >
                            {({ pressed }) => (
                                <MoreHorizontal 
                                    color={Colors.slate["600"]} 
                                    style={{ opacity: pressed ? 0.5 : 1 }} 
                                />
                            )}
                        </Pressable> */}
                    </MenuUi>
                </View>
            </View>
            <Line />
            {/* <Bar /> */}
            <View 
                style={{flex: 1, flexDirection: 'row', gap: 10, alignItems: 'center'}}
            >
                <View style={{backgroundColor: '#d1fae5', ...style.type}}>
                    <Text fontWeight='$bold'>₱483.00</Text>
                    <Text size='sm'>Income</Text>
                </View>
                <View style={{backgroundColor: '#ffe4e6', ...style.type}}>
                    <Text fontWeight='$bold'>₱483.00</Text>
                    <Text size='sm'>Expense</Text>
                </View>
            </View>
        </Box>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: 'white',
        position: 'relative',
        // shadowColor: '#000',
        // shadowOffset: { width: 0.2, height: 0.6 },
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    type: {
        flex: 2,
        alignItems: 'center',
        padding: 6,
        borderRadius: 10,
    }
})