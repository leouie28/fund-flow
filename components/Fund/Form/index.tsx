import React from 'react';
import {
    Box,
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
import useFund from '../../../utils/useFund';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FundProps } from '../../../models/types/fund';
import { Save } from 'lucide-react-native';

type Props = {
    data?: FundProps;
    isLoading: boolean;
    submit: (e: FundProps) => void;
};

export default function FundForm({ data, isLoading, submit }: Props) {
    const [name, setName] = React.useState<string | undefined>('');
    const [currency, setCurrency] = React.useState<string | undefined>('');
    const [description, setDescription] = React.useState<string | undefined>(
        ''
    );
    const [empty, setEmpty] = React.useState<any[]>([]);

    React.useEffect(() => {
        setName(data?.name);
        setCurrency(data?.currency);
        setDescription(data?.description);
    }, [data?.id]);

    const handleSubmit = async () => {
        const payload = { name, currency, description };
        const emptyFields = useValidator().emptyPayloads(payload, [], ['name']);
        if (emptyFields.length) {
            setEmpty(emptyFields);
            return;
        }
        submit(payload as FundProps);
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
                    disabled={isLoading}
                    marginVertical={6}
                    size="xl"
                    rounded="$xl"
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
                    // borderWidth={0}
                >
                    <ButtonText>Cancel</ButtonText>
                </Button>
            </Box>
        </TouchableWithoutFeedback>
    );
}
