import React from 'react'
import { View, SafeAreaView } from 'react-native'

type Props = {
    children: React.ReactNode
}

export default function ContainerScreen({children}: Props) {
    return (
        <View style={{flex: 1}}>
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </View>
    )
}