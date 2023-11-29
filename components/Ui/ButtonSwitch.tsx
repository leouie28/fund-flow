import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@gluestack-ui/themed';

type ItemType = {
    label: string;
    value: string;
    color?: string;
};

type Props = {
    value?: string;
    onChange?: (e: string) => void;
    label: string;
    items: ItemType[];
};

export default function ({ value, onChange, label, items }: Props) {
    const tabItem = '50%';

    return (
        <View>
            <Text
                size="lg"
                fontWeight="$semibold"
                marginBottom={4}
                color="$secondary700"
            >
                {label}
            </Text>
            <View style={styles.container}>
                {items.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => onChange && onChange(item.value)}
                        style={{
                            width: tabItem,
                            backgroundColor:
                                value == item.value
                                    ? item.color
                                    : 'transparent',
                            ...styles.item,
                        }}
                    >
                        <Text
                            fontWeight="$semibold"
                            color={
                                value == item.value ? 'white' : '$secondary600'
                            }
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderWidth: 1,
        borderColor: '#B0B0B0',
        borderRadius: 16,
    },
    item: {
        padding: 10,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
