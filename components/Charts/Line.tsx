import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Center, Text, View } from '@gluestack-ui/themed';
import { LineChart } from 'react-native-chart-kit';

export default function Line() {
    const chartWidth = (Dimensions.get('window').width / 100) * 80;

    const chartConfig = {
        // backgroundColor: '#fff',
        // backgroundGradientFrom: '#fff',
        // backgroundGradientTo: '#fff',
        strokeWidth: 4,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            // r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };

    return (
        <View>
            <Center>
                <LineChart
                    data={{
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 10,
                                    Math.random() * 10,
                                    Math.random() * 10,
                                    Math.random() * 10,
                                    Math.random() * 10,
                                    Math.random() * 10,
                                    Math.random() * 10,
                                ],
                                color: (opacity = 1) =>
                                    `rgba(134, 65, 244, ${opacity})`, // optional
                            },
                        ],
                    }}
                    width={chartWidth} // from react-native
                    height={180}
                    yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={chartConfig}
                    bezier
                    segments={4}
                    style={{
                        marginVertical: 8,
                        width: 'auto',
                        backgroundColor: 'white',
                        borderRadius: 16,
                    }}
                />
            </Center>
        </View>
    );
}
