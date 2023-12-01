import React from 'react'
import ContainerAccount from '../../components/Containers/Account'
import { Rocket } from 'lucide-react-native'
import { Avatar, AvatarFallbackText, Center, Box, AvatarBadge, Text, Heading, VStack, Divider, Button, ButtonText, ButtonIcon } from '@gluestack-ui/themed'

export default function AccountProfile() {
    return (
        <ContainerAccount>
            <Center marginTop={-50}>
                <Avatar size='xl' borderWidth={3} borderColor='$secondary200'>
                    <AvatarFallbackText>
                        Mark Leouie
                    </AvatarFallbackText>
                    <AvatarBadge />
                </Avatar>
            </Center>
            <VStack paddingHorizontal={22} paddingVertical={10} space='lg'>
                <Box>
                    <Text color='$secondary400'>Name</Text>
                    <Box  padding={6}>
                        <Heading fontWeight='$medium' color='$secondary800'>Mark Leouie D. Tabique</Heading>
                    </Box>
                </Box>
                <Box>
                    <Text color='$secondary400'>Phone</Text>
                    <Box  padding={6}>
                        <Heading fontWeight='$medium' color='$secondary800'>+639776994752</Heading>
                    </Box>
                </Box>
                <Box>
                    <Text color='$secondary400'>Email</Text>
                    <Box  padding={6}>
                        <Heading fontWeight='$medium' fontStyle='italic' color='$secondary800'>leouietabique@gmail.com</Heading>
                    </Box>
                </Box>
                <Box>
                    <Text color='$secondary400'>Address</Text>
                    <Box  padding={6}>
                        <Heading fontWeight='$medium' color='$secondary800'>P7 Brgy. Carayman Calbayog City</Heading>
                    </Box>
                </Box>
                <Box>
                    <Text color='$secondary400'>Birthday</Text>
                    <Box  padding={6}>
                        <Heading fontWeight='$medium' color='$secondary800'>February 10, 1998</Heading>
                    </Box>
                </Box>
                <Divider />
                <Button size='xl' variant='link' rounded='$3xl'>
                    <ButtonText>Update Profile</ButtonText>
                </Button>
                <Button size='xl' variant='solid' action='positive' rounded='$3xl'>
                    <ButtonText>Upgrade to premium 🚀</ButtonText>
                </Button>
            </VStack>
        </ContainerAccount>
    )
}