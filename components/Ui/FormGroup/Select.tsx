import React from 'react';
import {
    Box,
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    Icon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    ChevronDownIcon,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem,
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
} from '@gluestack-ui/themed';

type OptionTyps = {
    label: string,
    value: string
}

type Props = {
    label: string,
    placeholder?: string,
    options: OptionTyps[] | []
}

export default function FormGroupSelect({label, placeholder, options}: Props) {

    const SelectField = () => {
        return (
            <Select>
                <SelectTrigger variant="outline" size="xl" rounded='$xl'>
                    <SelectInput placeholder={placeholder || 'Select option'} pointerEvents='none' />
                    <SelectIcon mr="$3">
                        <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {options?.length > 0 && options ? options.map((item, i) => (
                            <SelectItem key={i} label={item.label} value={item.value} />
                        )) : (
                            <SelectItem label="Option is empty" value="none" disabled={true} />
                        )}
                    </SelectContent>
                </SelectPortal>
            </Select>
        )
    }

    return (
        <Box marginVertical={4}>
            <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
            >
                <FormControlLabel mb="$1">
                    <FormControlLabelText>{label || 'Label'}</FormControlLabelText>
                </FormControlLabel>
                
                <SelectField />

                <FormControlHelper>
                    <FormControlHelperText>
                        Must be at least 6 characters.
                    </FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        At least 6 characters are required.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
        </Box>
    );
}
