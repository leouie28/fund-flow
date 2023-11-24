import React from 'react';
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogBody,
    Heading,
    Icon,
    CloseIcon,
    Text,
    ButtonGroup,
    Button,
    ButtonText
} from '@gluestack-ui/themed';

interface PropsType {
    open: boolean,
    title: string,
    message: string,
    close: () => void,
    onOk: () => void,
    okText?: string
}

const Alert = ({open, title, message, close, onOk, okText}: PropsType) => {
    return (
        <AlertDialog
            isOpen={open}
            onClose={close}
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading size="lg">{title}</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={CloseIcon} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text size="sm">{message}</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup space="lg">
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={close}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            bg="$error600"
                            action="negative"
                            onPress={close}
                        >
                            <ButtonText>{okText || 'Ok'}</ButtonText>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Alert;
