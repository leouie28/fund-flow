import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import {
    AddIcon,
    Box,
    Button,
    ButtonIcon,
    ButtonText,
    Divider,
    Heading,
    HStack,
    Icon,
    Text,
    View,
    Progress,
    ProgressFilledTrack,
} from '@gluestack-ui/themed';
import { MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Line from '../Charts/Line';
import MenuUi from '../Ui/Menu';
import { formatNumber } from '../../utils/useNumber';
import { router } from 'expo-router';

type DataType = {
    id?: number | string;
    name: string;
    description?: string;
    currency: string;
    created_at?: string;
    updated_at?: string;
    income_amount_sum?: string | number;
    expense_amount_sum?: string | number;
};
interface PropsType {
    data: any;
}

export default function Card({ data }: PropsType) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const getIncomePercent = () => {
        const total = data.income_amount_sum + data.expense_amount_sum;
        return (data.income_amount_sum / total) * 100;
    };

    return (
        <TouchableOpacity activeOpacity={0.5}>
            <Box borderRadius="$xl" style={style.container}>
                <View style={{ flex: 10, flexDirection: 'row' }}>
                    <Heading
                        size="xl"
                        // color="$primary700"
                        fontWeight="$semibold"
                        flex={9}
                        numberOfLines={2}
                    >
                        {data.name}
                    </Heading>
                    <View>
                        <MenuUi open={isOpen} close={() => setIsOpen(false)}>
                            <MoreHorizontal color={Colors.slate['600']} />
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
                <View>
                    <Text>Click to view more details</Text>
                </View>
                {/* <Line /> */}
                {/* <Bar /> */}
                <View marginTop={10}>
                    <Progress
                        marginVertical={4}
                        bg={ getIncomePercent() >= 0 ? "#fb7185" : "#DADADA" }
                        value={getIncomePercent()}
                        w="$full"
                        size="sm"
                    >
                        <ProgressFilledTrack bg="#4AA9FF" />
                    </Progress>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                >
                    <View style={{ backgroundColor: '#F6F6F6', ...style.type }}>
                        <Icon size="xl" as={TrendingUp} color="#4AA9FF" />
                        <Text fontWeight="$semibold">{`${
                            data.currency
                        } ${formatNumber(data.income_amount_sum)}`}</Text>
                        <Text size="sm" color="$secondary400">
                            Income
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#F6F6F6', ...style.type }}>
                        <Icon size="xl" as={TrendingDown} color="#fb7185" />
                        <Text fontWeight="$semibold">{`${
                            data.currency
                        } ${formatNumber(data.expense_amount_sum)}`}</Text>
                        <Text size="sm" color="$secondary400">
                            Expense
                        </Text>
                    </View>
                </View>
                {/* <Divider marginTop="$4" /> */}
                <Button
                    onPress={() => router.push({pathname: "/transaction/create", params: {fund_id: data.id}})}
                    rounded="$2xl"
                    marginTop={6}
                    variant="link"
                    // action="secondary"
                >
                    <ButtonIcon as={AddIcon} />
                    <ButtonText> Add transaction</ButtonText>
                </Button>
            </Box>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 14,
        marginVertical: 8,
        backgroundColor: '#fff',
        position: 'relative',
        // shadowColor: '#000',
        // shadowOffset: { width: 0.1, height: 0.2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 6,
        // borderWidth: 1,
        // borderColor: '#e5e5e5',
    },
    type: {
        flex: 2,
        alignItems: 'center',
        padding: 6,
        borderRadius: 10,
    },
});
