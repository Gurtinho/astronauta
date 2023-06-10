// import mongoose, { ConnectOptions } from 'mongoose';
// import * as dotenv from 'dotenv';
// dotenv.config();

// type IconnectProps = ConnectOptions & {
//     useNewUrlParser: boolean,
//     useUnifiedTopology: boolean
// }

// export const databaseConnection = async () => {
//     try {
//         const connectProps = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         };
//         await mongoose.connect(process.env.DB_CONNECT as string, connectProps as IconnectProps);
//         console.log(`🟢 Database connected succefully`.green);
//     } catch (error) {
//         console.log(`🟢 Database error erro com o banco: ${error}`.red);
//     }
// }