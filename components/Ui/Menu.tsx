import { Box, Icon, Text, View } from '@gluestack-ui/themed';
import { PenSquare, Trash, Plus } from 'lucide-react-native';
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
                <MenuTrigger
                    style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                    children={children}
                />
                <MenuOptions
                    customStyles={{
                        optionsWrapper: {
                            padding: 4,
                        },
                        optionsContainer: {
                            borderRadius: 12,
                        },
                    }}
                >
                    <MenuOption
                        customStyles={{
                            optionWrapper: {
                                flexDirection: 'row',
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            },
                        }}
                    >
                        <Text fontWeight="$medium">Add transaction</Text>
                        <Icon as={Plus} />
                    </MenuOption>
                    <MenuOption
                        customStyles={{
                            optionWrapper: {
                                flexDirection: 'row',
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            },
                        }}
                    >
                        <Text fontWeight="$medium">Edit</Text>
                        <Icon as={PenSquare} />
                    </MenuOption>
                    <MenuOption
                        customStyles={{
                            optionWrapper: {
                                flexDirection: 'row',
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            },
                        }}
                    >
                        <Text fontWeight="$medium" color="$rose600">
                            Remove
                        </Text>
                        <Icon color="$rose600" as={Trash} />
                    </MenuOption>
                    {/* <MenuOption onSelect={() => alert(`Delete`)}>
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </MenuOption>
                    <MenuOption
                        onSelect={() => alert(`Not called`)}
                        disabled={true}
                        text="Disabled"
                    /> */}
                </MenuOptions>
            </Menu>
        </Box>
    );
}
