import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

import useSqlite from '../utils/useSqlite';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { init } = useSqlite();
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        init();
    }, []);

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        // <ThemeProvider
        //     value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        // >
        //     <Stack>
        //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        //         <Stack.Screen
        //             name="modal"
        //             options={{ presentation: 'modal' }}
        //         />
        //     </Stack>
        // </ThemeProvider>

        <GluestackUIProvider config={config}>
            <MenuProvider>
                <Stack>
                    <Stack.Screen
                        name="(main)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="fund/create"
                        options={{ headerShown: false, presentation: 'modal' }}
                    />
                    <Stack.Screen
                        name="fund/edit"
                        options={{ headerShown: false, presentation: 'modal' }}
                    />
                    <Stack.Screen
                        name="transaction/create"
                        options={{ headerShown: false, presentation: 'modal' }}
                    />
                    <Stack.Screen
                        name="account/profile"
                        options={{ headerTransparent: true, headerTitle: "Account Profile" }}
                    />
                    <Stack.Screen
                        name="setting/index"
                        options={{
                            title: 'App Settings',
                            headerTransparent: true,
                            animation: 'slide_from_left',
                        }}
                    />
                    <Stack.Screen
                        name="modal"
                        options={{
                            title: 'Fundflow',
                            headerShown: true,
                            // presentation: 'modal',
                            animation: 'slide_from_left',
                        }}
                    />
                </Stack>
            </MenuProvider>
        </GluestackUIProvider>
    );
}
