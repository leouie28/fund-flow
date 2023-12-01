import React from 'react'
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native'

type Props = {
    children: React.ReactNode
}

export default function ContainerAccount({children}: Props) {
    return (
        <View style={{ flex: 1, backgroundColor: '#DADADA' }}>
            <SafeAreaView>
                {/* <ScrollView> */}
                    <View style={styles.container}>
                        {children}
                    </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: 60,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: 'white'
    }
})