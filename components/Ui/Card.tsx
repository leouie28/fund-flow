import { Box } from '@gluestack-ui/themed'
import React from 'react'

interface PropsType {
    children: React.ReactNode
}

const Card = ({
    children
}: PropsType) => {
    return (
        <Box>
            {children}
        </Box>
    )
}

export default Card