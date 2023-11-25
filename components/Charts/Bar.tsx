import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Text, View } from '@gluestack-ui/themed';
import { BarChart } from 'react-native-chart-kit';

export default function Bar() {
    const chartWidth = (Dimensions.get('window').width / 100) * 80;

    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
            width: chartWidth
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    }
    
    return (
        <View>
            
        </View>
    )
}