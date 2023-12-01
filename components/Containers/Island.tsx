import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

type Props = {
    children: React.ReactNode,
    bg?: string,
    borderRadius?: number,
    paddingHorizontal?: number,
    paddingVertical?: number,
    padding?: number,
    marginHorizontal?: number,
    marginVertical?: number,
    margin?: number,
    style?: StyleProp<ViewStyle>
}

export default function ContainerIsland({
    children,
    bg,
    borderRadius,
    paddingHorizontal,
    paddingVertical,
    padding,
    marginHorizontal,
    marginVertical,
    margin,
    style
}: Props) {
    return (
        <View
            style={{
                borderRadius: borderRadius || 12,
                backgroundColor: bg || 'white',
                padding: padding || 4,
                margin: margin,
                borderWidth: 1,
                borderColor: '#DADADA'
            }}
        >
            {children}
        </View>
    )
}