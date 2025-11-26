import { NextResponse } from "next/server"

let projects: any[] = [] 

export async function POST(request: Request) {
  const data = await request.json()
  data.id = Date.now()
  projects.push(data)
  return NextResponse.json(data, { status: 201 })
}

export async function GET() {
  return NextResponse.json(projects)
}
