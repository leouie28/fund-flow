import { Button, StyleSheet } from 'react-native';
import { Box, Heading, HStack } from '@gluestack-ui/themed'
import { MoreHorizontal } from 'lucide-react-native';
import React from 'react'

interface PropsType {
    data: any
}

export default function Card({ data }:PropsType ) {
    return (
        <Box borderRadius='$lg' style={style.container}>
            <HStack>
                <Heading>Hello</Heading>
                <MoreHorizontal />
            </HStack>
            <HStack>
                <Button title='Edit' />
                <Button title='Delete' />
            </HStack>
        </Box>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f8fafc',
        shadowColor: '#000',
        shadowOffset: { width: 0.2, height: 0.6 },

    }
})