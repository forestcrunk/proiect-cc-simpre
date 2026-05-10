import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const reviews = await getCollection('reviews');
    const allReviews = await reviews.find({}).toArray();
    return NextResponse.json(allReviews);
}