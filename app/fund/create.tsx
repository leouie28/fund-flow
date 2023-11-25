import { Box, Center, Heading, Text, VStack, View } from "@gluestack-ui/themed";
import FormGroup from "../../components/Ui/FormGroup";
import FormGroupSelect from "../../components/Ui/FormGroup/Select";
import ModalUi from "../../components/Ui/Modal";

export default function FundCreate() {
    return (
        <Box padding={12} position="relative">
            <Center>
                <Heading color="$coolGray500">New Fund</Heading>
            </Center>
            <VStack>
                <FormGroup />
                <FormGroupSelect />
                <ModalUi />
            </VStack>
        </Box>
    )
}