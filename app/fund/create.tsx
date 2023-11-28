import React from "react";
import { 
    Box, 
    Button, 
    ButtonIcon, 
    ButtonText, 
    Center, 
    Heading, 
    VStack, 
    useToast,
    AddIcon, 
    ButtonSpinner
} from "@gluestack-ui/themed";
import { OverlayProvider } from "@gluestack-ui/overlay"
import FormGroup from "../../components/Ui/FormGroup";
import FormGroupTextarea from "../../components/Ui/FormGroup/Textarea";
import { router } from "expo-router";
import Toaster from "../../components/Toast";

export default function FundCreate() {
    const toast = useToast()
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        // setLoading(true)
        setTimeout(() => {
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    return (
                        <Toaster 
                            id={id} 
                            title="Success" 
                            message="Fund successfully created. You can start adding transaction now."
                        />
                    )
                }
            })
        }, 800)
        router.push("/")
    }

    return (
        <OverlayProvider>
            <Box padding={12}>
                <Center>
                    <Box rounded="$xl" padding={6} bg="$secondary200" w="$20"></Box>
                </Center>
                <Center>
                    <Heading>New Fund</Heading>
                </Center>
                <VStack>
                    <FormGroup 
                        label="Fund Name"
                        placeholder="e.g. Personal Fund"
                        // description="Fund name that you want to track"
                    />
                    <FormGroup 
                        label="Currency Symbol"
                        placeholder="e.g. $"
                        // description="Symbol of currency that will be use"
                    />
                    <FormGroupTextarea 
                        label="Description"
                        placeholder="Describe your fund"
                        optional
                        // description="Describe your fund"
                    />
                </VStack>
                <Button onPress={handleSubmit} disabled={loading} marginVertical={6} size="xl" rounded="$xl">
                    {loading ? (
                        <>
                            <ButtonSpinner mr="$1" />
                            <ButtonText>Creating ...</ButtonText>
                        </>
                    ) : (
                        <>
                            <ButtonText>Create Fund </ButtonText>
                            <ButtonIcon size="xl" as={AddIcon} />
                        </>
                    )}
                </Button>
            </Box>
        </OverlayProvider>
    )
}