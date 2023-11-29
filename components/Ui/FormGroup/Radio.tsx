import React from 'react';
import {
    Box,
    Icon,
    FormControl,
    Text,
    VStack,
    HStack,
    RadioGroup,
    Radio,
    RadioIndicator,
    RadioIcon,
    RadioLabel,
    CircleIcon,
} from '@gluestack-ui/themed';
import { AlertCircle } from 'lucide-react-native';

type OptionTyps = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    placeholder?: string;
    options: OptionTyps[] | [];
    value?: string;
    onChange?: (e: string) => void;
    error?: string | boolean;
    description?: string;
};

export default function FormGroupRadio({
    label,
    placeholder,
    options,
    value,
    error,
    description,
    onChange,
}: Props) {

    return (
        <Box marginVertical={4}>
            <FormControl isInvalid={error ? true : false}>
                <VStack space="md">
                    <Text size="lg" fontWeight='$semibold' color='$secondary800'>
                        {label}
                    </Text>
                    <RadioGroup value={value} onChange={(e) => onChange && onChange(e)}>
                        <HStack space="2xl">
                            <Radio value="cash" size="lg">
                                <RadioIndicator mr="$2">
                                    <RadioIcon as={CircleIcon} />
                                </RadioIndicator>
                                <RadioLabel>Cash</RadioLabel>
                            </Radio>
                            <Radio value="credit" size="lg">
                                <RadioIndicator mr="$2">
                                    <RadioIcon as={CircleIcon} />
                                </RadioIndicator>
                                <RadioLabel>Credit</RadioLabel>
                            </Radio>
                        </HStack>
                    </RadioGroup>
                    {error ? (
                        <Text color="$red700" alignItems='center' flexDirection='row'>
                            <Icon as={AlertCircle} marginRight={4} color='$red700' />
                            {error}
                        </Text>
                    ) : (
                        description && (
                            <Text color="$red700" alignItems='center' flexDirection='row'>
                                {description}
                            </Text>
                        )
                    )}
                </VStack>
            </FormControl>
        </Box>
    );
}
