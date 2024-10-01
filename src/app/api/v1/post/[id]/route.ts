import { NextRequest, NextResponse } from "next/server";
import { data } from "../data";

export async function GET(request: NextRequest, {params}: {params: {id: string}}){
    const filterData = data.find((item) => item.id == parseInt(params.id))

    const dataResponse = { data: filterData }
    return NextResponse.json(dataResponse, {status: 200})
}

export async function PATCH(request: NextRequest, {params}: {params: {id: string}}){
    const index = data.findIndex((item) => item.id == parseInt(params.id))

    const {content} = await request.json()
    
    data[index].content = content

    const dataResponse = { data: data[index] }
    
    return NextResponse.json(dataResponse, {status: 200})
}
export async function PUT(request: NextRequest, {params}: {params: {id: string}}){
    const index = data.findIndex((item) => item.id == parseInt(params.id))

    const body = await request.json()
    
    data[index] = {id: parseInt(params.id), ...body}

    const dataResponse = { data: data[index] }

    return NextResponse.json(dataResponse, {status: 200})
}
export async function DELETE(request: NextRequest, {params}: {params: {id: string}}){
    const index = data.findIndex((item) => item.id == parseInt(params.id))

    data.splice(index, 1)

    const dataResponse = { data: data}

    return NextResponse.json(dataResponse, {status: 200})
}