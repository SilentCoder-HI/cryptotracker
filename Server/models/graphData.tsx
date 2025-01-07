import { Schema, model, Document, models } from 'mongoose';

// Define the GraphDataDaily schema
const graphDataDailySchema = new Schema({
  userId: { type: String, required: true },
  months: { 
    type: [
      {
        month: { type: String, required: true },
        values: {
          type: [
            {
              amount: { type: Number, required: true },
              date: { type: Date, required: true },
              add: { type: Number, required: true }  // 'add' field as per the provided structure
            }
          ],
          required: true
        }
      }
    ],
    required: true
  },
  date: { type: Date, default: Date.now },
});
// Check if the model already exists before defining it again
const GraphDataDailyModel = models.GraphDataDaily || model<GraphDataDaily>('GraphDataDaily', graphDataDailySchema);

// Combine the interface with the model export
interface GraphDataDaily extends Document {
  userId: string;
  months: { 
    month: string; 
    values: { amount: number, date: Date, add: number }[];  // 'values' includes 'add' as well
  }[];
}

// Exporting the model and the interface separately
export { GraphDataDailyModel };
export type { GraphDataDaily };
