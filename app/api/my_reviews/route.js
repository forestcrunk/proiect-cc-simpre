import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const userId = request.headers.get('userId');
    const reviews = await getCollection('reviews');
    const myReviews = await reviews.find({userId: userId}).toArray();
    return NextResponse.json(myReviews);
}

export async function POST(request) {
    const body = await request.json();

    const reviews = await getCollection('reviews');

    const { insertedId } = await reviews.insertOne(body);

    return NextResponse.json({_id: insertedId, ...body }, { status: 201});
}