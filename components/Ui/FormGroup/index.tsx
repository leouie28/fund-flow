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

export default function FormGroup() {
    return (
        <Box>
            <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
            >
                <FormControlLabel mb="$1">
                    <FormControlLabelText>Label</FormControlLabelText>
                </FormControlLabel>
                <Input rounded='$xl' size='xl'>
                    <InputField placeholder="Type here" />
                </Input>
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
