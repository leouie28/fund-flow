import { VStack, Toast, ToastTitle, ToastDescription } from "@gluestack-ui/themed"
import React from 'react'

type Props = {
    id: string,
    title: string,
    message: string
}

const Toaster = ({id, title, message}: Props) => {

    return (
        <Toast nativeID={"toast-" + id} action="success" variant="solid">
            <VStack space="xs">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>
                {message}
            </ToastDescription>
            </VStack>
        </Toast>
    )
}

export default Toaster