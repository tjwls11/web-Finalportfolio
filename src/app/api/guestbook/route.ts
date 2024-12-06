import { NextResponse } from 'next/server'
import { connectToDB } from '@/libs/mongodb'
import mongoose from 'mongoose'
import { auth } from '@/auth'

interface IMessage {
  _id: mongoose.Types.ObjectId
  name: string
  message: string
  time: string
  isAnonymous: boolean
}

const messageSchema = new mongoose.Schema({
  name: String,
  message: {
    type: String,
    required: true,
    maxlength: 30,
  },
  time: { type: String, default: () => new Date().toISOString() },
  isAnonymous: { type: Boolean, default: false },
})

const Message =
  mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema)

export async function GET() {
  try {
    await connectToDB()
    const messages = await Message.find().sort({ time: -1 }).lean()
    return NextResponse.json(messages)
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: '메시지를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    await connectToDB()
    const body = await request.json()

    if (!body.message || body.message.length > 30) {
      return NextResponse.json(
        { error: '메시지는 1-30글자 사이여야 합니다.' },
        { status: 400 }
      )
    }

    const newMessage = await Message.create({
      name: session.user.name, // 실제 이름 저장
      message: body.message,
      isAnonymous: body.isAnonymous, // 익명 여부
      time: new Date().toISOString(),
    })

    return NextResponse.json(newMessage)
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json(
      { error: '메시지 저장에 실패했습니다.' },
      { status: 500 }
    )
  }
}
