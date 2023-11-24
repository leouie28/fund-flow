import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { router } from 'expo-router';

import { Wallet, ListTodo, AlignLeft, Plus } from 'lucide-react-native';

import Colors from '../../constants/Colors';

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

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerTitle: '',
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
                        router.push('/modal');
                    },
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Transactions',
                    headerTransparent: true,
                    tabBarIcon: ({ color }) => <ListTodo color={color} />,
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
        </Tabs>
    );
}
