export default () => {
    const emptyPayloads = (payload: any, except?: any[], only?: any[]) => {
        let empty: any[] = [];
        if (only && only?.length) {
            only.forEach((key) => {
                if (
                    payload[key] == '' ||
                    !payload[key] ||
                    !payload[key].length
                ) {
                    empty.push(key);
                }
            });
            return empty;
        } else {
            Object.keys(payload).forEach((key) => {
                if (!except?.includes(key)) {
                    if (
                        payload[key] == '' ||
                        !payload[key] ||
                        !payload[key].length
                    ) {
                        empty.push(key);
                    }
                }
            });
            return empty;
        }
    };

    return {
        emptyPayloads,
    };
};
