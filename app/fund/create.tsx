import { Box, Center, Heading, Text, VStack, View } from "@gluestack-ui/themed";
import FormGroup from "../../components/Ui/FormGroup";
import FormGroupSelect from "../../components/Ui/FormGroup/Select";
import ModalUi from "../../components/Ui/Modal";
import { OverlayProvider } from "@gluestack-ui/overlay"

export default function FundCreate() {
    return (
        <OverlayProvider>
            <Box padding={12} position="relative">
                <Center>
                    <Heading color="$coolGray500">New Fund</Heading>
                </Center>
                <VStack>
                    <FormGroup />
                    <FormGroupSelect 
                        label="Fund"
                        placeholder="Select fund"
                        options={[
                            {label: "Personal", value: "personal"},
                            {label: "Business", value: "business"},
                        ]}
                    />
                    <ModalUi />
                </VStack>
            </Box>
        </OverlayProvider>
    )
}