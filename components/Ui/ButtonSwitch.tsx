import React, { useRef, useState } from 'react';
import {
    DimensionValue,
    LayoutChangeEvent,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Text } from '@gluestack-ui/themed';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from 'react-native-reanimated';

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
    const viewRef = useRef<any>(null);
    const [activeColor, setActiveColor] = useState<string>('');
    const [sliderWidth, setSliderWidth] = useState<number>(0);
    const positionX = useSharedValue<number>(0);

    const tabWidthItem = (): number => {
        const val = 100 / items.length;
        return val;
    };

    const onViewLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        const slider = (width - 8) / items.length;
        setSliderWidth(slider);
    };

    const handleToggle = (val: any, index: number) => {
        if (onChange) onChange(val.value);
        positionX.value = index * sliderWidth;
    };

    const translateAnim = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(positionX.value),
                },
            ],
        };
    });

    React.useEffect(() => {
        if (items.length) {
            const color = items.find((x: ItemType) => x.value === value);
            setActiveColor(color?.color || 'gray');
        }
    }, [value, items]);

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
            <View style={styles.container} onLayout={onViewLayout}>
                <Animated.View
                    style={[
                        styles.sliderContainer,
                        {
                            width: sliderWidth,
                            backgroundColor: activeColor,
                        },
                        translateAnim,
                    ]}
                />
                {items.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => handleToggle(item, i)}
                        style={{
                            width: `${tabWidthItem()}%` as DimensionValue,
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
        position: 'relative',
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
    sliderContainer: {
        padding: 20,
        margin: 4,
        borderRadius: 15,
        position: 'absolute',
        top: 0,
        left: -1,
    },
});
