import React from 'react';
import {
    Box,
    Text,
    Button,
    ButtonIcon,
    ButtonText,
    Center,
    Heading,
    VStack,
    AddIcon,
    ButtonSpinner,
} from '@gluestack-ui/themed';
import FormGroup from '../../Ui/FormGroup';
import FormGroupTextarea from '../../Ui/FormGroup/Textarea';
import { router } from 'expo-router';
import useValidator from '../../../utils/useValidator';
import ButtonSwitch from '../../Ui/ButtonSwitch';
import FormGroupSelect from '../../Ui/FormGroup/Select';
import useFund from '../../../utils/useFund';
import { FundProps } from '../../../models/types/fund';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import FormGroupRadio from '../../Ui/FormGroup/Radio';
import { useRoute } from '@react-navigation/native';
import { TranxProps } from '../../../models/types/transaction';
import { Save } from 'lucide-react-native';

type Props = {
    data?: TranxProps;
    isLoading: boolean;
    submit: (e: TranxProps) => void;
};

export default function TransactionForm({ data, isLoading, submit }: Props) {
    const route = useRoute();
    const [type, setType] = React.useState<'income' | 'expense'>('income');
    const [fund_id, setFundId] = React.useState<string>('');
    const [form, setForm] = React.useState<'cash' | 'credit'>('cash');
    const [amount, setAmount] = React.useState<string>('');
    const [note, setNote] = React.useState<string>('');

    const [fundsOpt, setFundsOpt] = React.useState<any[]>([]);
    const [selectedFund, setSelectedFund] = React.useState<FundProps | null>(
        null
    );
    const [empty, setEmpty] = React.useState<any[]>([]);
    const typesOpt: any[] = [
        {
            label: 'Income',
            value: 'income',
            color: '#4AA9FF',
        },
        {
            label: 'Expense',
            value: 'expense',
            color: '#fb7185',
        },
        {
            label: 'Transfer',
            value: 'transfer',
            color: 'gray',
        },
    ];

    React.useEffect(() => {
        async function getFund() {
            const funds = await useFund().getMany();
            if (funds && Array.isArray(funds)) {
                setFundsOpt(
                    funds.map((item) => ({ label: item.name, value: item.id }))
                );
                if ((route.params as any)?.fund_id) {
                    setFundId((route.params as any).fund_id);
                }
            }
        }

        getFund();
    }, []);

    React.useEffect(() => {
        if (fund_id) {
            useFund()
                .getUnique(fund_id)
                .then((data) => {
                    setSelectedFund(data as FundProps);
                });
        }
    }, [fund_id]);

    const handleSubmit = async () => {
        const payload = { type, fund_id, amount, form, note };
        const emptyFields = useValidator().emptyPayloads(payload, ['note']);
        if (emptyFields.length) {
            setEmpty(emptyFields);
            return;
        }
        submit(payload);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Box padding={12}>
                <Center>
                    <Box
                        rounded="$xl"
                        padding={6}
                        bg="$secondary200"
                        w="$20"
                    ></Box>
                </Center>
                <Center>
                    <Heading>New Transaction</Heading>
                </Center>
                <VStack paddingVertical={10}>
                    <ButtonSwitch
                        value={type}
                        onChange={(e: any) => setType(e)}
                        label="Type"
                        items={typesOpt}
                    />
                    <FormGroupSelect
                        label="Fund"
                        value={fund_id}
                        placeholder="Select fund"
                        onChange={(e) => setFundId(e)}
                        error={
                            empty.includes('fund_id') &&
                            'This field is required!'
                        }
                        options={fundsOpt}
                    />
                    <FormGroup
                        label="Amount"
                        placeholder="00.00"
                        keyboardType="numeric"
                        value={amount}
                        onChange={(e) => setAmount(e)}
                        error={
                            empty.includes('amount') &&
                            'This field is required!'
                        }
                        appendContent={
                            <Text size="xl" marginLeft={12}>
                                {selectedFund?.currency || '?'}
                            </Text>
                        }
                    />
                    <FormGroupTextarea
                        label="Note"
                        placeholder="Enter note"
                        optional
                        value={note}
                        onChange={(e) => setNote(e)}
                    />
                    <FormGroupRadio
                        label="Form"
                        value={form}
                        placeholder="Select form"
                        error={
                            empty.includes('form') && 'This field is required!'
                        }
                        onChange={(e: any) => setForm(e)}
                        options={fundsOpt}
                    />
                </VStack>
                <Button
                    onPress={handleSubmit}
                    disabled={isLoading}
                    marginVertical={6}
                    size="xl"
                    rounded="$xl"
                    bg={type == 'income' ? '#4AA9FF' : '#fb7185'}
                >
                    {isLoading ? (
                        <>
                            <ButtonSpinner mr="$1" />
                            <ButtonText>Processing ...</ButtonText>
                        </>
                    ) : (
                        <>
                            {data && Object.keys(data).length ? (
                                <>
                                    <ButtonText>Update </ButtonText>
                                    <ButtonIcon size="xl" as={Save} />
                                </>
                            ) : (
                                <>
                                    <ButtonText>Create </ButtonText>
                                    <ButtonIcon size="xl" as={AddIcon} />
                                </>
                            )}
                        </>
                    )}
                </Button>
                <Button
                    onPress={() => router.back()}
                    marginVertical={6}
                    size="xl"
                    variant="link"
                    action="secondary"
                    rounded="$xl"
                >
                    <ButtonText>Cancel</ButtonText>
                </Button>
            </Box>
        </TouchableWithoutFeedback>
    );
}
