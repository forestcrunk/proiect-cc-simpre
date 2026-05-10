import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

function validateData(userdata) {
    const email = userdata?.email?.trim();
    const password = userdata?.password?.trim();

    if (!email || !password) {
        return ({error:'Email and password are required'});
    }

    if(!(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email))) {
        return ({error:'Invalid email.'});
    }
    return ({email, password})
}

export async function POST(request) {
  
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid data.' }, { status: 400 });
    }

    const validated = validateData(body);
    if (validated.error) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const {email, password } = validated;
    const users = await getCollection('users');

    
    const existingUser = await users.findOne({ email });
    const passwordCheck = await bcrypt.compare(password, existingUser.password);
    if(!passwordCheck || !existingUser) {
        return NextResponse.json({error:"Invalid email or password."}, {status: 404});
    }

    console.log(existingUser);
    return NextResponse.json({
        message: 'Login successful.',
        userId: existingUser._id})
}