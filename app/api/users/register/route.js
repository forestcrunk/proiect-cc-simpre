import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

function validateData(userdata) {
    const username = userdata?.username?.trim();
    const email = userdata?.email?.trim();
    const password = userdata?.password?.trim();

    if (!username || !email || !password) {
        return ({error:'Username, email, and password are required'});
        }
        
    if(!(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email))) {
        return ({error:'Invalid email.'});
    }

    if(!(/^[a-zA-Z0-9_]{4,32}$/.test(username))) {
        return ({error:'Username must be between 4-32 characters and consist of alphanumerics and underscores.'});
    }
    if (password.length < 8) {
        return ({error:'Password must contain at least 8 characters.'});
    }

    return({username, email, password})
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

    const { username, email, password } = validated;
    const users = await getCollection('users');

    
    const existingEmail = await users.findOne({ email });
    const existingName = await users.findOne({ username });
    if (existingEmail) {
      return NextResponse.json({error:"User with this email already exists."}, {status: 409});
    }
    if (existingName) {
      return NextResponse.json({error:"User with this username already exists."}, {status: 409});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    try {
      const {insertedId} = await users.insertOne(newUser);
      return NextResponse.json({_id: insertedId, ...newUser});
    }
    catch (err) {
      return NextResponse.json({error: 'Failed to register user'}, { status: 500});
    }
}