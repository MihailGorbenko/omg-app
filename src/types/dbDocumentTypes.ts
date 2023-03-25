import mongoose, { Types } from "mongoose";

export type UserRecord = (mongoose.Document<unknown, {}, {
    name: string;
    lastName: string;
    email: string;
    avatar_url: string;
}> & Omit<{
    name: string;
    lastName: string;
    email: string;
    avatar_url: string;
} & {

}, never>) | null