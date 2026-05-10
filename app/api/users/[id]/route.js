import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

function toObjectId(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    return new ObjectId(id);
}

async function resolveId(params) {
    const { id } = await params;
    const _id = toObjectId(id);

    if(!_id) {
        return { _id: null, error: NextResponse.json({error: 'Invalid ID'}, { status: 400 })};
    }

    return { _id, error: null};
}

export async function GET(request, { params }) {
    const {_id, error} = await resolveId(params);
    if (error) {
        return error;
    }

    const users = await getCollection('users');

    const user = await users.findOne({ _id });

    if (!user) {
        return NextResponse.json({ error: 'Not Found'}, {status: 404});
    }

    return NextResponse.json(user);
}