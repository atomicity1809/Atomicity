import { NextResponse,NextRequest } from 'next/server';



export async function GET(req:NextRequest) {
    
    try {
        return NextResponse.json({ success: true, "hello": "world" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
