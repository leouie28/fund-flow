import {
    Box,
    Text,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    FormControlHelper,
    FormControlHelperText,
    AlertCircleIcon,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    InputSlot,
} from '@gluestack-ui/themed';
import React from 'react';
import { KeyboardTypeOptions } from 'react-native';

type Props = {
    label: string;
    placeholder?: string;
    error?: string | boolean;
    description?: string;
    value?: string;
    onChange?: (e: string) => void;
    keyboardType?: KeyboardTypeOptions;
    appendContent?: React.ReactNode;
};

export default function FormGroup({
    label,
    placeholder,
    error,
    description,
    value,
    onChange,
    keyboardType,
    appendContent,
}: Props) {
    return (
        <Box marginVertical={4}>
            <FormControl
                size="lg"
                isDisabled={false}
                isInvalid={error ? true : false}
                isReadOnly={false}
                isRequired={false}
            >
                <FormControlLabel mb="$1">
                    <FormControlLabelText>{label}</FormControlLabelText>
                </FormControlLabel>
                <Input rounded="$xl" size="xl">
                    {appendContent && <InputSlot>{appendContent}</InputSlot>}
                    <InputField
                        placeholder={placeholder || 'Type here'}
                        keyboardType={keyboardType}
                        value={value}
                        onChangeText={(e) => onChange && onChange(e)}
                    />
                </Input>
                {error ? (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>{error}</FormControlErrorText>
                    </FormControlError>
                ) : (
                    description && (
                        <FormControlHelper>
                            <FormControlHelperText>
                                {description}
                            </FormControlHelperText>
                        </FormControlHelper>
                    )
                )}
            </FormControl>
        </Box>
    );
}
