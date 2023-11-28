import { Box, Text } from '@gluestack-ui/themed';
import React from 'react';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export default function MenuUi({
    open,
    close,
    children
}: {
    open: boolean;
    close: () => void;
    children: React.ReactNode
}) {
    return (
        <Box>
            <Menu>
                <MenuTrigger children={children} />
                <MenuOptions>
                    <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                    <MenuOption onSelect={() => alert(`Delete`)}>
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </MenuOption>
                    <MenuOption
                        onSelect={() => alert(`Not called`)}
                        disabled={true}
                        text="Disabled"
                    />
                </MenuOptions>
            </Menu>
        </Box>
    );
}
