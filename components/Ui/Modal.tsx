import React from 'react';
import { 
    Modal, 
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Heading,
    View,
    Icon,
    CloseIcon,
    Text,
    Button,
    ButtonText
} from '@gluestack-ui/themed';

export default function ModalUi() {
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const ref = React.useRef(null)

    return (
        <View position='relative'>
            <Button onPress={() => setShowModal(true)}>
                <ButtonText>Open</ButtonText>
            </Button>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                finalFocusRef={ref}
                zIndex={99999999}
                position='fixed'
            >
                <ModalBackdrop />
                <ModalContent zIndex={9999999} position='fixed'>
                    <ModalHeader>
                        <Heading size="lg">Engage with Modals</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody  zIndex={9999999} position='fixed'>
                        <Text>
                            Elevate user interactions with our versatile modals.
                            Seamlessly integrate notifications, forms, and media
                            displays. Make an impact effortlessly.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="outline"
                            size="sm"
                            action="secondary"
                            mr="$3"
                            onPress={() => {
                                setShowModal(false);
                            }}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            size="sm"
                            action="positive"
                            borderWidth="$0"
                            onPress={() => {
                                setShowModal(false);
                            }}
                        >
                            <ButtonText>Explore</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </View>
    );
}
