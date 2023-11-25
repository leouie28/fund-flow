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
} from '@gluestack-ui/themed';

export default function FormGroupSelect() {
    return (
        <Box>
            <Select zIndex={999}>
                <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select option" />
                    <SelectIcon mr="$3">
                        <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                </SelectTrigger>
                <SelectPortal zIndex={999}>
                    <SelectBackdrop />
                    <SelectContent zIndex={999}>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="UX Research" value="ux" />
                        <SelectItem label="Web Development" value="web" />
                        <SelectItem
                            label="Cross Platform Development Process"
                            value="Cross Platform Development Process"
                        />
                        <SelectItem
                            label="UI Designing"
                            value="ui"
                            isDisabled={true}
                        />
                        <SelectItem
                            label="Backend Development"
                            value="backend"
                        />
                    </SelectContent>
                </SelectPortal>
            </Select>
        </Box>
    );
}