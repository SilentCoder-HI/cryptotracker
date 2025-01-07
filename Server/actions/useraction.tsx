"use server"
import { trackError } from "@components/utils/errorTracking";
import connectDB from "../database/connectDB";
import { GraphDataDailyModel } from "@components/models/graphData";

// Function to save user graph data (create or update)
export async function saveGraphValues(userId: string, values: [{ date: string, amount: number }]) {
    try {
        console.log(userId, values)
    } catch (graphError) {
        trackError(graphError, { userId, action: 'saveGraphValues' });
        throw graphError;
    }
}

// Function to import user graph data from database
export async function ImportGraphData(userId: string) {
    try {
        await connectDB(); // Connect to the database
        const graphData = await GraphDataDailyModel.findOne({ userId: userId }).lean(); // Using .lean() to return plain object
        if (graphData) {
            // Ensure plain object structure
            const serializedData = JSON.parse(JSON.stringify(graphData));
            return serializedData;
        }
    } catch (error) {
        trackError(error, { userId, action: 'ImportGraphData' });
        throw error;
    }
}
