import { Schema, model, Document, models } from 'mongoose';

// Define the GraphDataDaily schema
const graphDataDailySchema = new Schema({
  userId: { type: String, required: true },
  values: { type: [Schema.Types.Mixed], required: true },  // Schema.Types.Mixed allows any type of data
  date: { type: Date, default: Date.now },
});

// Pre-save hook to limit the 'values' array to 144 items
graphDataDailySchema.pre('save', function (next) {
  const document = this as GraphDataDaily;
  if (document.values.length > 144) {
    document.values.shift(); // Remove the first (oldest) value
  }
  next();
});

// Check if the model already exists before defining it again
const GraphDataDailyModel = models.GraphDataDaily || model<GraphDataDaily>('GraphDataDaily', graphDataDailySchema);

// Combine the interface with the model export
interface GraphDataDaily extends Document {
  userId: string;
  values: unknown[]; // 'unknown' allows any type of data in values
  date: Date;
}

// Exporting the model and the interface separately
export { GraphDataDailyModel };
export type { GraphDataDaily };
