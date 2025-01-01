"use client"
import { useEffect } from 'react'
import { ImportGraphData } from '@components/actions/useraction'

// interface GraphData {
//     userId: string;
//     date: string;
//     values: any[];
// }

const ImportGraphDataFunc = () => {
    // const [graphData, setGrapshData] = useState<GraphData | null>(null)
    const userid = "12345"

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const response = await ImportGraphData(userid)
                if (response) {
                    console.log(response)
                    // setGraphData(data)
                }
            } catch (error) {
                console.error("Error fetching graph data", error)
            }
        }

        fetchGraphData()

        return () => {
            // Cleanup if necessary
        }
    }, [userid])
}

export default ImportGraphDataFunc
