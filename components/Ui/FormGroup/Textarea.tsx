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
    InputIcon,
    Text,
} from '@gluestack-ui/themed';

type Props = {
    label: string,
    placeholder?: string,
    error?: string,
    description?: string,
    optional?: boolean
}

export default function FormGroupTextarea({label, placeholder, error, description, optional}: Props) {
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
                    {optional && (<Text size='xs'> Optional</Text>)}
                </FormControlLabel>
                
                <Textarea
                    size="xl"
                    rounded='$xl'
                    isReadOnly={false}
                    isInvalid={error ? true : false}
                    isDisabled={false}
                    w='$full'
                >
                    <TextareaInput placeholder={placeholder||'Type text here'} />
                </Textarea>

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
