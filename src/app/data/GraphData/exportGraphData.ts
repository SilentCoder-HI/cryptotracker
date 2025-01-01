// import { saveGraphValues, GraphValue } from "@components/actions/useraction";
// import { trackError } from "@components/utils/errorTracking";

// interface ExportGraphDataParams {
//     userId: string;
//     values: GraphValue[];
// }

// // Function that exports Graph data
// async function exportGraphData({ userId, values }: ExportGraphDataParams): Promise<boolean> {
//     try {
//         // Call the saveGraphValues function to save the graph data
//         const result = await saveGraphValues(userId, values);

//         // Optionally log the result or perform additional actions if necessary
//         console.log("Graph data exported successfully:", result);

//         return true;
//     } catch (error) {
//         // Enhanced error handling
//         const errorMessage = error instanceof Error ? error.message : "Unknown error";
//         console.error("Error exporting graph data:", errorMessage);

//         // Track the error with more detailed context
//         trackError(error, { userId, action: 'exportGraphData', message: errorMessage });

//         return false;
//     }
// }

// export { exportGraphData };
