import { getCollection } from "@/lib/mongodb";
import { getUserByID } from "@/utils/userFunctions";
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

    const reviews = await getCollection('reviews');

    const review = await reviews.findOne({ _id });
    if (!review) {
        return NextResponse.json({ error: 'Not Found'}, {status: 404});
    }
    const userId = request.headers.get('userId');

    if(userId !== review.userId) {
        return NextResponse.json({error: 'Forbidden'}, { status: 403});
    }

    return NextResponse.json(review);
}

export async function PUT(request, {params}) {
    const {_id, error} = await resolveId(params);
    if (error) {
        return error;
    }

    const body = await request.json();
    delete body._id;
    const userId = request.headers.get('userId');

    const reviews = await getCollection('reviews');
    const review_to_edit = await reviews.findOne({_id});

    if(userId !== review_to_edit.userId) {
        return NextResponse.json({error: 'Forbidden'}, { status: 403});
    }


    const updatedReview = await reviews.findOneAndUpdate(
        { _id }, 
        { $set: body }, 
        { returnDocument: 'after' }
    )

    if (!updatedReview) {
        return NextResponse.json({ error: 'Not found'}, {status: 404});
    }

    return NextResponse.json(updatedReview);
}

export async function DELETE(request, { params }) {
    const {_id, error} = await resolveId(params);
    if (error) {
        return error;
    }

    const reviews = await getCollection('reviews');
    const userId = request.headers.get('userId');

    const review = await reviews.findOne({_id});
    if(!review) {
        return NextResponse.json({error: 'Not Found'}, { status: 404});
    }

    if(userId !== review.userId) {
        return NextResponse.json({error: 'Forbidden'}, { status: 403});
    }

    const { deletedCount } = await reviews.deleteOne({ _id });

    return NextResponse.json({ deleted: _id.toString()});
}