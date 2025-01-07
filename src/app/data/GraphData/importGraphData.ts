'use client'

import { useEffect, useState } from 'react'
import { ImportGraphData } from '@components/actions/useraction'

interface GraphData {
    userId: string;
    months: {
        month: string;
        values: { amount: number, date: Date, add: number }[];  // 'values' includes 'add' as well
    }[];
}

const ImportGraphDataFunc = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const userid = "user123"

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const response: GraphData | null = await ImportGraphData(userid)
                if (response) {
                    setGraphData(response)
                }
            } catch (error) {
                console.error("Error fetching graph data", error)
            }
        }

        fetchGraphData()

        return () => {
            // Cleanup if necessary
        }
    }, [userid])  // You can add more dependencies if necessary

    return graphData;
}

export default ImportGraphDataFunc;
