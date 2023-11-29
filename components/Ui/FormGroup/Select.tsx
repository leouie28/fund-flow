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
    FormControlHelper,
    FormControlHelperText,
    AlertCircleIcon,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    Text,
    onChange,
} from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

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
};

export default function FormGroupSelect({
    label,
    placeholder,
    options,
    value,
    onChange,
}: Props) {
    const SelectField = () => {
        const selectedLabel = (): string => {
            if (value && options) {
                const index = options.findIndex((x) => x.value == value);
                if (index > -1) {
                    return options[index].label;
                }
            }
            return '';
        };

        return (
            <Select
                selectedLabel={selectedLabel()}
                selectedValue={value}
                onValueChange={(e) => onChange && onChange(e)}
            >
                <SelectTrigger variant="outline" size="xl" rounded="$xl">
                    <SelectInput
                        placeholder={placeholder || 'Select option'}
                        pointerEvents="none"
                    />
                    <SelectIcon mr="$3">
                        <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent paddingBottom={100}>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <Box
                            w="$full"
                            paddingHorizontal={10}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box w={20}></Box>
                            <Text size="sm">
                                {placeholder || `Select ${label}`}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.replace('/fund/create')}
                                style={{ width: 20 }}
                            >
                                <Plus />
                            </TouchableOpacity>
                        </Box>
                        {options?.length > 0 && options ? (
                            options.map((item, i) => (
                                <SelectItem
                                    key={i}
                                    label={item.label}
                                    value={item.value}
                                />
                            ))
                        ) : (
                            <SelectItem
                                label="Option is empty"
                                value="none"
                                disabled={true}
                            />
                        )}
                    </SelectContent>
                </SelectPortal>
            </Select>
        );
    };

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
                    <FormControlLabelText>
                        {label || 'Label'}
                    </FormControlLabelText>
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
