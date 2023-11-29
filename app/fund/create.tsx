import React from 'react';
import {
    Box,
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
import useFund from '../../utils/useFund';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function FundCreate() {
    const fund = useFund();
    const toast = useToast();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>('');
    const [currency, setCurrency] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [empty, setEmpty] = React.useState<any[]>([]);

    const handleSubmit = async () => {
        setLoading(true);
        const payload = { name, currency, description };
        const emptyFields = useValidator().emptyPayloads(payload, [], ['name']);
        if (emptyFields.length) {
            setEmpty(emptyFields);
            setLoading(false);
            return;
        }
        const res: any = await fund.create(payload);
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
                                message="Fund successfully created. You can start adding transaction now."
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
                        <Heading>New Fund</Heading>
                    </Center>
                    <VStack>
                        <FormGroup
                            label="Fund Name"
                            placeholder="Enter fund name"
                            description="Ex. Personal Fund"
                            value={name}
                            onChange={(e) => setName(e)}
                            error={
                                empty.includes('name') && 'This field is required!'
                            }
                        />
                        <FormGroup
                            label="Currency Symbol"
                            placeholder="Enter currency symbol"
                            description="Ex. $ default is set to ₱"
                            value={currency}
                            onChange={(e) => setCurrency(e)}
                        />
                        <FormGroupTextarea
                            label="Description"
                            placeholder="Enter fund description"
                            optional
                            description="Describe your fund"
                            value={description}
                            onChange={(e) => setDescription(e)}
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
                                <ButtonText>Create Fund </ButtonText>
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
