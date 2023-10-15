import client from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  try {
    const newUser = await req.json();
    if (!newUser.name || !newUser.email || !newUser.password) {
      return NextResponse.json({ message: "validate invalid" });
    }
    if (newUser.password) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    const user = await client.user.create({ data: newUser });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
