import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Box,
    Heading,
    HStack,
    Text,
    View,
    Badge,
    BadgeText,
    BadgeIcon,
    Icon,
} from '@gluestack-ui/themed';
import {
    MoreHorizontal,
    Banknote,
    CreditCard,
    TrendingDown,
    TrendingUp,
} from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Line from '../Charts/Line';
import moment from 'moment';
import { formatNumber } from '../../utils/useNumber';

type DataType = {
    id: string | number;
    amount: string | number;
    type: 'expense' | 'income';
    form: 'cash' | 'credit';
    date: string;
    fund_name?: string;
    fund_currency?: string;
};

interface PropsType {
    data: DataType;
}

export default function ListItem({ data }: PropsType) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <Pressable>
            {({ pressed }) => (
                <Box
                    borderRadius="$lg"
                    style={{
                        backgroundColor: pressed ? '#F6F6F6' : 'transparent',
                        opacity: pressed ? 0.5 : 1,
                        ...style.container,
                    }}
                >
                    <View
                        style={{
                            flex: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <View flex={5}>
                            <Text
                                numberOfLines={1}
                                fontWeight="$semibold"
                                size="lg"
                            >
                                {data.fund_name}
                            </Text>
                            <Text size="sm">
                                {moment(data.date).format('lll')}
                            </Text>
                        </View>
                        <View flex={5} alignItems="flex-end">
                            <View flexDirection="row" alignItems="center">
                                <Text
                                    color={
                                        data.type == 'income'
                                            ? '#4AA9FF'
                                            : '#fb7185'
                                    }
                                    size="md"
                                    marginRight={2}
                                >
                                    {`${data.fund_currency} ${formatNumber(
                                        data.amount
                                    )}`}
                                </Text>
                                {data.type == 'income' ? (
                                    <Icon as={TrendingUp} color="#4AA9FF" />
                                ) : (
                                    <Icon as={TrendingDown} color="#fb7185" />
                                )}
                            </View>
                            <Badge
                                size="md"
                                variant="solid"
                                borderRadius="$lg"
                                action="muted"
                            >
                                <BadgeText>{data.form} </BadgeText>
                                <BadgeIcon
                                    as={
                                        data.form == 'cash'
                                            ? Banknote
                                            : CreditCard
                                    }
                                />
                            </Badge>
                        </View>
                    </View>
                </Box>
            )}
        </Pressable>
    );
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
    },
});
