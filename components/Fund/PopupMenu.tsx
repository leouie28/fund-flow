import { Box, Icon, Text, View } from '@gluestack-ui/themed';
import { PenSquare, Trash, Plus } from 'lucide-react-native';
import React from 'react';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export default function PopupMenu({
    open,
    items,
    close,
    children,
    onChange,
}: {
    open: boolean;
    items: any[];
    close: () => void;
    children: React.ReactNode;
    onChange: (e: string) => void;
}) {
    return (
        <Box>
            <Menu onSelect={onChange}>
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
                    {items.map((item, i) => (
                        <MenuOption
                            key={i}
                            value={item.value}
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
                            {item.value == 'remove' ? (
                                <>
                                    <Text color="$rose600" fontWeight="$medium">
                                        {item.label}
                                    </Text>
                                    <Icon color="$rose600" as={item.icon} />
                                </>
                            ) : (
                                <>
                                    <Text fontWeight="$medium">
                                        {item.label}
                                    </Text>
                                    <Icon as={item.icon} />
                                </>
                            )}
                        </MenuOption>
                    ))}
                </MenuOptions>
            </Menu>
        </Box>
    );
}
