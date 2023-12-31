import React from 'react';
import { View } from 'react-native';
import { useToast } from '@gluestack-ui/themed';
import FundForm from '../../components/Fund/Form';
import Toaster from '../../components/Toast';
import useFund from '../../utils/useFund';
import { router } from 'expo-router';
import { FundProps } from '../../models/types/fund';

export default function FundCreate() {
    const toast = useToast();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSubmit = async (payload: FundProps) => {
        setIsLoading(true);
        const res: any = await useFund().create(payload);
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
        <View>
            <FundForm isLoading={isLoading} submit={handleSubmit} />
        </View>
    );
}
