import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const connectDB = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {if (mongoose.connections[0].readyState) {
            // Use current db connection
            return handler(req, res);
          }

          // Use new db connection
          await mongoose.connect(process.env.MONGODB_URL!, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true
          });} catch (error) {
            return res.status(500).json({error: `Database connecting failed: ${error.message}`})
          }


          await handler(req, res);
    }
}

export async function dbConnect() {
  try {if (mongoose.connections[0].readyState) {
    return 
  }

  // Use new db connection
  await mongoose.connect(process.env.MONGODB_URL!, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  });} catch (error) {
    return new Error(`Database connecting failed: ${error.message}`)
  }
}

export default connectDB