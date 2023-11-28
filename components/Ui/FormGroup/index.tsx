import {
    Box,
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
    InputIcon,
} from '@gluestack-ui/themed';

type Props = {
    label: string,
    placeholder?: string,
    error?: string,
    description?: string
}

export default function FormGroup({label, placeholder, error, description}: Props) {
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
                <Input rounded='$xl' size='xl'>
                    <InputField placeholder={placeholder || "Type here"} />
                </Input>
                {error ? (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                            {error}
                        </FormControlErrorText>
                    </FormControlError>
                ) : 
                     description && (
                        <FormControlHelper>
                            <FormControlHelperText>
                                {description}
                            </FormControlHelperText>
                        </FormControlHelper>
                    )
                }
            </FormControl>
        </Box>
    );
}
