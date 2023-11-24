import { useToast, Button, ButtonText, VStack, Toast, ToastTitle, ToastDescription, View } from "@gluestack-ui/themed"
import React from 'react'

const Toaster = () => {
    const toast = useToast()

    return (
        <Button
            onPress={() => {
                toast.show({
                placement: "top",
                render: ({ id }) => {
                    return (
                        <Toast nativeID={"toast-" + id} action="success" variant="solid">
                            <VStack space="xs">
                            <ToastTitle>New Message {id}</ToastTitle>
                            <ToastDescription>
                                Hey, just wanted to touch base and see how you're doing.
                                Let's catch up soon!
                            </ToastDescription>
                            </VStack>
                        </Toast>
                    )
                },
                })
            }}
        >
            <ButtonText>Press Me</ButtonText>
        </Button>
    )
}

export default Toaster