import React from 'react';
import { View } from 'react-native';
import { useToast } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { TranxProps } from '../../models/types/transaction';
import { OverlayProvider } from '@gluestack-ui/overlay';
import useTransaction from '../../utils/useTransaction';
import Toaster from '../../components/Toast';
import TransactionForm from '../../components/Transaction/Form';

export default function CreateTransaction() {
    const toast = useToast();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSubmit = async (payload: TranxProps) => {
        setIsLoading(true);
        const res: any = await useTransaction().create(payload);
        if ((res?.status as string) == 'success') {
            setIsLoading(false);
            setTimeout(() => {
                toast.show({
                    placement: 'top',
                    render: ({ id }) => {
                        return (
                            <Toaster
                                id={id}
                                title="Success"
                                message="Transaction successfully created."
                            />
                        );
                    },
                });
            }, 1000);
            router.back();
        }
    };

    return (
        <OverlayProvider>
            <View>
                <TransactionForm
                    isLoading={isLoading}
                    submit={(e) => handleSubmit(e)}
                />
            </View>
        </OverlayProvider>
    );
}
