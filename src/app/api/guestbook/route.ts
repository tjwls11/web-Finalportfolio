import { NextResponse } from 'next/server'
import connectMongoDB from '@/libs/mongodb'
import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
  time: { type: String, default: () => new Date().toISOString() },
  isAnonymous: { type: Boolean, default: false },
})

const Message =
  mongoose.models.Message || mongoose.model('Message', messageSchema)

export async function GET() {
  try {
    await connectMongoDB()
    const messages = await Message.find().sort({ time: -1 })
    return NextResponse.json(messages)
  } catch {
    return NextResponse.json(
      { error: '메시지를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB()
    const body = await request.json()

    const newMessage = await Message.create({
      name: body.name,
      message: body.message,
      isAnonymous: body.isAnonymous,
      time: new Date().toISOString(),
    })

    return NextResponse.json(newMessage)
  } catch (err) {
    console.error('POST Error:', err)
    return NextResponse.json(
      { error: '메시지 저장에 실패했습니다.' },
      { status: 500 }
    )
  }
}
