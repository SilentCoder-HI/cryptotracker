'use client'

import { useCallback, useEffect, useState } from 'react'
import { ImportGraphData } from '@components/actions/useraction'

interface GraphData {
    userId: string;
    months: {
        month: string;
        values: { amount: number; date: Date; add: number }[];
    }[];
}

const ImportGraphDataFunc = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);

    const userid = "user123"

    const fetchGraphData = useCallback(async () => {
        try {
            const response: GraphData | null = await ImportGraphData(userid)
            if (response) {
                setGraphData(response)
            }
        } catch (error) {
            console.error("Error fetching graph data", error)
        }
    }, [userid]);
    useEffect(() => {
        fetchGraphData();
    }, [fetchGraphData]);
    // You can return JSX or data as needed
    return graphData;
}

export default ImportGraphDataFunc;
