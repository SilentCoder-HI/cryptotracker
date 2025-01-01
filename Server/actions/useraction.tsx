"use server"
import connectDB from "../database/connectDB";
import { GraphDataDaily } from '../models/graphData';
import { Model, ClientSession } from 'mongoose';
import { trackError } from '../utils/errorTracking';
import { checkRateLimit } from "@components/utils/rateLimiter";
import { getFromCache, setToCache } from "@components/utils/cache";
import { GraphDataDailyModel } from 'Server/models/graphData';

// // Explicit type casting for GraphDataDailyModel
// const GraphDataDailyModelTyped = GraphDataDailyModel as Model<GraphDataDaily>;

// // Reusable transaction handler
// async function withTransaction(callback: Function, session: ClientSession) {
//     try {
//         await session.startTransaction();
//         const result = await callback(session);
//         await session.commitTransaction();
//         return result;
//     } catch (error) {
//         await session.abortTransaction();
//         throw error;
//     } finally {
//         session.endSession();
//     }
// }

// // Function to save user graph data (create or update)
// export async function saveGraphValues(userId: string, values: GraphValue[]): Promise<GraphDataDaily> {
//     let session: ClientSession | null = null;
//     try {
//         if (!userId || typeof userId !== 'string') {
//             throw new Error('Invalid user ID');
//         }

//         await connectDB(); // Connect to the database

//         // Start session for transaction
//         session = await GraphDataDailyModelTyped.startSession();

//         // Transaction handling with withTransaction function
//         return await withTransaction(async () => {
//             const existingData = await GraphDataDailyModelTyped.findOne({ userId }).session(session);

//             let result: GraphDataDaily;
//             if (existingData) {
//                 existingData.values = values;
//                 existingData.date = new Date();
//                 result = await existingData.save({ session });
//             } else {
//                 const newData = new GraphDataDailyModelTyped({
//                     userId,
//                     values,
//                     date: new Date(),
//                 });
//                 result = await newData.save({ session });
//             }

//             setToCache(userId, values); // Cache the updated data
//             return result;
//         }, session); // Pass session to the transaction handler
//     } catch (graphError) {
//         trackError(graphError, { userId, action: 'saveGraphValues' });
//         throw graphError;
//     }
// }

// Function to import user graph data from database
export async function ImportGraphData(userId: string) {
    try {
        await connectDB(); // Connect to the database
        const graphData = await GraphDataDailyModel.findOne({ userId: userId });
        console.log(graphData.values)
        if (graphData) {
            return graphData.values;
        }
    } catch (error) {
        trackError(error, { userId, action: 'ImportGraphData' });
        throw error;
    }
}