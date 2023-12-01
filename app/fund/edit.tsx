import React from 'react';
import { View } from 'react-native';
import { useToast } from '@gluestack-ui/themed';
import FundForm from '../../components/Fund/Form';
import Toaster from '../../components/Toast';
import useFund from '../../utils/useFund';
import { router } from 'expo-router';
import { FundProps } from '../../models/types/fund';
import { useRoute } from '@react-navigation/native';

export default function FundEdit() {
    const route = useRoute();
    const toast = useToast();
    const [data, setData] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        const getFund = async () => {
            const fund = await useFund().getUnique(
                (route.params as any)?.fund_id
            );
            setData(fund);
        };
        getFund();
    });

    const handleSubmit = async (payload: FundProps) => {
        setIsLoading(true);
        const id = (route.params as any)?.fund_id;
        const res: any = await useFund().update(id, payload);
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
                                message="Transaction successfully updated."
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
            <FundForm data={data} isLoading={isLoading} submit={handleSubmit} />
        </View>
    );
}
