import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { 
    Box,
    Heading,
    HStack, 
    Text, 
    View,
    Badge,
    BadgeText
} from '@gluestack-ui/themed'
import { MoreHorizontal } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Line from '../Charts/Line';

interface PropsType {
    data: any
}

export default function ListItem({ data }:PropsType ) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    return (
        <Pressable>
            {({ pressed }) => (
                <Box borderRadius='$lg' style={{ backgroundColor: pressed ? 'white' : 'transparent', ...style.container }}>
                    <View style={{flex: 10, flexDirection: 'row'}}>
                        <View flex={7}>
                            <Text fontWeight='$semibold' size='lg'>Fund Name</Text>
                            <Text size='sm'>Nov 25, 2023</Text>
                        </View>
                        <View flex={3} alignItems='flex-end'>
                            <Text fontWeight='$bold' size='lg'>₱{data}</Text>
                            <Badge size="md" variant="solid" borderRadius="$lg"  action="success">
                                <BadgeText>Expense</BadgeText>
                            </Badge>
                        </View>
                    </View>
                </Box>
            )}
        </Pressable>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 8,
        marginVertical: 2,
        // marginVertical: 4,
        // borderWidth: 1,
        // borderColor: '#d1d5db'
        // backgroundColor: 'white',
        // shadowColor: '#000',
        // shadowOffset: { width: 0.2, height: 0.6 },
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        // borderWidth: 1,
        // borderColor: '#e5e5e5'
    },
    type: {
        flex: 2,
        alignItems: 'center',
        padding: 6,
        borderRadius: 10,
    }
})