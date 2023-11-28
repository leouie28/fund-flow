import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { router } from 'expo-router';

import { Wallet, ListTodo, AlignLeft, Plus, Filter, Banknote, X } from 'lucide-react-native';

import Colors from '../../constants/Colors';
import React from 'react';
import {
    Box,
    Text,
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicatorWrapper,
    ActionsheetDragIndicator,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetIcon,
    Button,
    ButtonText,
    ButtonIcon,
    Center,
    Icon,
    Heading
} from '@gluestack-ui/themed';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const [showActionsheet, setShowActionsheet] = React.useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)

    const navigateCreate = (route: '/fund/create' | '/transaction/create') => {
        handleClose()
        router.push(route)
    }

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarStyle: { borderWidth: 0 },
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Funds',
                        headerTitle: 'Fundflow',
                        headerTransparent: true,
                        tabBarIcon: ({ color }) => <Wallet color={color} />,
                        headerLeft: () => (
                            <Link href="/modal" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <AlignLeft
                                            size={30}
                                            color={
                                                Colors[colorScheme ?? 'light'].text
                                            }
                                            style={{
                                                marginLeft: 15,
                                                opacity: pressed ? 0.5 : 1,
                                            }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="blank"
                    options={{
                        title: 'Add New',
                        tabBarIcon: ({ color }) => (
                            <Plus
                                color={color}
                                size={30}
                                style={{ marginBottom: -3 }}
                            />
                        ),
                        tabBarIconStyle: {
                            borderRadius: 50,
                            borderWidth: 3,
                            borderColor: Colors[colorScheme ?? 'light'].tint,
                            width: 60,
                            height: 60,
                            top: -30,
                            position: 'absolute',
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: { width: -2, height: 1 },
                            shadowOpacity: 0.3,
                            shadowRadius: 3,
                            elevation: 3,
                        },
                    }}
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault();
                            // router.push('/modal');
                            handleClose()
                        },
                    }}
                />
                <Tabs.Screen
                    name="transactions"
                    options={{
                        title: 'Transactions',
                        headerTransparent: true,
                        tabBarIcon: ({ color }) => <Banknote color={color} />,
                        headerLeft: () => (
                            <Link href="/modal" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <AlignLeft
                                            size={30}
                                            color={
                                                Colors[colorScheme ?? 'light'].text
                                            }
                                            style={{
                                                marginLeft: 15,
                                                opacity: pressed ? 0.5 : 1,
                                            }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
                        ),
                        headerRight: () => (
                            <Link href="/modal" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <Filter
                                            size={25}
                                            color={
                                                Colors[colorScheme ?? 'light'].text
                                            }
                                            style={{
                                                marginRight: 15,
                                                opacity: pressed ? 0.5 : 1,
                                            }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
                        ),
                    }}
                />
            </Tabs>
            <Box>
                <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent backgroundColor='#f3f4f6' h='$64' zIndex={999}>
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <Center marginTop={10}>
                            <Heading>Create New</Heading>
                        </Center>
                        <ActionsheetItem onPress={() => navigateCreate('/transaction/create')}>
                            <ActionsheetIcon>
                                <Icon as={Banknote} />
                            </ActionsheetIcon>
                            <ActionsheetItemText>Transaction</ActionsheetItemText>
                        </ActionsheetItem>
                        <ActionsheetItem onPress={() => navigateCreate('/fund/create')}>
                            <ActionsheetIcon>
                                <Icon as={Wallet} />
                            </ActionsheetIcon>
                            <ActionsheetItemText>Fund</ActionsheetItemText>
                        </ActionsheetItem>
                        <ActionsheetItem onPress={handleClose}>
                            <ActionsheetIcon>
                                <Icon as={X} />
                            </ActionsheetIcon>
                            <ActionsheetItemText>Cancel</ActionsheetItemText>
                        </ActionsheetItem>
                    </ActionsheetContent>
                </Actionsheet>
            </Box>
        </>
    );
}