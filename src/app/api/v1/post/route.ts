import { NextRequest, NextResponse } from "next/server";
import { data } from "./data";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const headerList = new Headers(request.headers)
    console.log(headerList.get('Authorization'))
    const token = headerList.get('Authorization')
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    cookies().set('token', token || 'no-token')

    if(query){
        const postFilter = data.filter((item) => item.id == parseInt(query))
        const result = {data: postFilter}
        return NextResponse.json(result,{status: 200})
    }

    return NextResponse.json(data, {status: 200, headers: {'Content-Type': 'application/json'}})
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const newPost = {
        id: data.length + 1,
        ...body
    }

    data.push(newPost)
    const dataResponse = { data: newPost }

    return NextResponse.json(dataResponse, {
        status: 201
    })
}