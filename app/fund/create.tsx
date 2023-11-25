import { Box, Center, Heading, Text, VStack, View } from "@gluestack-ui/themed";
import FormGroup from "../../components/Ui/FormGroup";
import FormGroupSelect from "../../components/Ui/FormGroup/Select";

export default function FundCreate() {
    return (
        <Box padding={12}>
            <Center>
                <Heading color="$coolGray500">New Fund</Heading>
            </Center>
            <VStack>
                <FormGroup />
                <FormGroupSelect />
            </VStack>
        </Box>
    )
}