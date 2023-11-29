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
    useToast,
    AddIcon,
    ButtonSpinner,
} from '@gluestack-ui/themed';
import { OverlayProvider } from '@gluestack-ui/overlay';
import FormGroup from '../../components/Ui/FormGroup';
import FormGroupTextarea from '../../components/Ui/FormGroup/Textarea';
import { router } from 'expo-router';
import Toaster from '../../components/Toast';
import useValidator from '../../utils/useValidator';
import ButtonSwitch from '../../components/Ui/ButtonSwitch';
import FormGroupSelect from '../../components/Ui/FormGroup/Select';
import useFund from '../../utils/useFund';
import useTransaction from '../../utils/useTransaction';
import { FundProps } from '../../models/types/fund';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import FormGroupRadio from '../../components/Ui/FormGroup/Radio';
import { TranxProps } from '../../models/types/transaction';

export default function TransactionCreate() {
    const toast = useToast();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [type, setType] = React.useState<'income' | 'expense'>('income');
    const [fund_id, setFundId] = React.useState<string>('');
    const [form, setForm] = React.useState<'cash' | 'credit'>('cash');
    const [amount, setAmount] = React.useState<string>('');
    const [note, setNote] = React.useState<string>('');

    const [fundsOpt, setFundsOpt] = React.useState<any[]>([])
    const [selectedFund, setSelectedFund] = React.useState<FundProps | null>(null)
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
    ]
    
    React.useEffect(() => {
        async function getFund() {
            const funds = await useFund().getMany()
            if(funds && Array.isArray(funds)) {
                setFundsOpt(funds.map(item => ({label: item.name, value: item.id})));
            }
        }

        getFund()
    }, [])

    React.useEffect(() => {
        if (fund_id) {
            useFund().getUnique(fund_id).then((data) => {
                setSelectedFund(data as FundProps)
            })
        }
    }, [fund_id])

    const handleSubmit = async () => {
        setLoading(true);
        const payload = { type, fund_id, amount, form, note };
        const emptyFields = useValidator().emptyPayloads(payload, ['note']);
        if (emptyFields.length) {
            setEmpty(emptyFields);
            setLoading(false);
            return;
        }
        const res: any = await useTransaction().create(payload)
        if ((res?.status as string) == 'success') {
            setLoading(false);
            setTimeout(() => {
                toast.show({
                    placement: 'top',
                    render: ({ id }) => {
                        return (
                            <Toaster
                                id={id}
                                title="Success"
                                message="Transaction successfully created."
                            />
                        );
                    },
                });
            }, 1000);
            router.back();
        }
    };

    return (
        <OverlayProvider>
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
                            onChange={(e:any) => setType(e)}
                            label="Type"
                            items={typesOpt}
                        />
                        <FormGroupSelect
                            label="Fund"
                            value={fund_id}
                            placeholder='Select fund'
                            onChange={(e) => setFundId(e)}
                            error={empty.includes('fund_id') && 'This field is required!'}
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
                            placeholder='Select form'
                            error={empty.includes('form') && 'This field is required!'}
                            onChange={(e:any) => setForm(e)}
                            options={fundsOpt}
                        />
                    </VStack>
                    <Button
                        onPress={handleSubmit}
                        disabled={loading}
                        marginVertical={6}
                        size="xl"
                        rounded="$xl"
                        bg={type == 'income' ? '#4AA9FF' : '#fb7185'}
                    >
                        {loading ? (
                            <>
                                <ButtonSpinner mr="$1" />
                                <ButtonText>Creating ...</ButtonText>
                            </>
                        ) : (
                            <>
                                <ButtonText>Create </ButtonText>
                                <ButtonIcon size="xl" as={AddIcon} />
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
                        // borderWidth={0}
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                </Box>
            </TouchableWithoutFeedback>
        </OverlayProvider>
    );
}
