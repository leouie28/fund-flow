export const formatNumber = (num: string | number) => {
    const hasDecimal = num.toString().includes('.');

    if (!hasDecimal) {
        num = num.toString() + '.00';
    }

    // Split the number by decimal point (if exists)
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands separator

    parts[1] = parts[1] ? parts[1].padEnd(2, '0').slice(0, 2) : '00';

    return parts.join('.'); // Join the parts back together
};
