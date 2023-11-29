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

export default function TransactionCreate() {
    const toast = useToast();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [type, setType] = React.useState<string>('income');
    const [fund, setFund] = React.useState<string>('business');
    const [amount, setAmount] = React.useState<string>('');
    const [note, setNote] = React.useState<string>('');
    const [empty, setEmpty] = React.useState<any[]>([]);

    const handleSubmit = async () => {
        // setLoading(true);
        const payload = { type, fund, amount, note };
        console.log(payload);
        // const emptyFields = useValidator().emptyPayloads(payload, [], ['name']);
        // if (emptyFields.length) {
        //     setEmpty(emptyFields);
        //     setLoading(false);
        //     return;
        // }
        // const res: any = await fund.create(payload);
        // if ((res?.status as string) == 'success') {
        //     setLoading(false);
        //     setTimeout(() => {
        //         toast.show({
        //             placement: 'top',
        //             render: ({ id }) => {
        //                 return (
        //                     <Toaster
        //                         id={id}
        //                         title="Success"
        //                         message="Fund successfully created. You can start adding transaction now."
        //                     />
        //                 );
        //             },
        //         });
        //     }, 800);
        //     router.back();
        // }
    };

    return (
        <OverlayProvider>
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
                        onChange={(e) => setType(e)}
                        label="Type"
                        items={[
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
                        ]}
                    />
                    <FormGroupSelect
                        label="Fund"
                        value={fund}
                        onChange={(e) => setFund(e)}
                        options={[
                            {
                                label: 'Personal',
                                value: 'personal',
                            },
                            {
                                label: 'Business',
                                value: 'business',
                            },
                        ]}
                    />
                    <FormGroup
                        label="Amount"
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        value={amount}
                        onChange={(e) => setAmount(e)}
                        error={
                            empty.includes('amount') &&
                            'This field is required!'
                        }
                        appendContent={
                            <Text size="xl" marginLeft={10}>
                                $
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
                </VStack>
                <Button
                    onPress={handleSubmit}
                    disabled={loading}
                    marginVertical={6}
                    size="xl"
                    rounded="$xl"
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
        </OverlayProvider>
    );
}
