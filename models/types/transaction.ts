export interface TranxProps {
    id?: string | number;
    fund_id: string | number;
    amount: string | number;
    type: 'income' | 'expense';
    form: 'cash' | 'credit';
    note?: string;
    date?: string;
    created_at?: string;
    updated_at?: string;
}
