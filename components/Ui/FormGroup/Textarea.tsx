import {
    Box,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Textarea,
    TextareaInput,
    FormControlHelper,
    FormControlHelperText,
    AlertCircleIcon,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    Text,
} from '@gluestack-ui/themed';

type Props = {
    label: string;
    placeholder?: string;
    error?: string;
    description?: string;
    optional?: boolean;
    value?: string;
    onChange?: (e: string) => void;
};

export default function FormGroupTextarea({
    label,
    placeholder,
    error,
    description,
    optional,
    value,
    onChange,
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
                    {optional && <Text size="xs"> Optional</Text>}
                </FormControlLabel>

                <Textarea size="xl" rounded="$xl" w="$full">
                    <TextareaInput
                        value={value}
                        onChangeText={(e) => onChange && onChange(e)}
                        placeholder={placeholder || 'Type text here'}
                    />
                </Textarea>

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
