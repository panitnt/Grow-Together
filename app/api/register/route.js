import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { username, email, password } = await req.json();

    // const checkUsername = await User.exists({ username: username });
    // console.log(checkUsername);
    const existingUser = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });

    if (existingUser) {
      return NextResponse.json(
          { success: false, message: "Username/Email Already exits" },
          { status: 200 },
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      provider: "growtogether"
    });

    return NextResponse.json({ success:true,  message: "Register already!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success:false, message: "Error from register" },
      { status: 500 }
    );
  }
}
