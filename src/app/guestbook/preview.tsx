import mongoose from 'mongoose'
import { connectToDB } from '@/libs/mongodb'
import Link from 'next/link'

interface IMessage {
  _id: mongoose.Types.ObjectId
  name: string
  message: string
  time: string
  isAnonymous: boolean
}

const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
  time: { type: String, default: () => new Date().toISOString() },
  isAnonymous: { type: Boolean, default: false },
})

const Message =
  mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema)

export default async function GuestbookPreview() {
  try {
    await connectToDB()

    const messages = (await Message.find()
      .sort({ time: -1 })
      .limit(3)
      .lean()) as unknown as IMessage[]

    if (messages.length === 0) {
      return (
        <div className="text-white text-center p-4">
          아직 작성된 메시지가 없습니다.
          <div className="mt-4">
            <Link
              href="/guestbook"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              첫 메시지를 남겨보세요! →
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {messages.map((msg: IMessage) => (
            <div
              key={msg._id.toString()}
              className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <p className="text-white text-lg mb-3">{msg.message}</p>
              <p className="text-sm text-gray-400">
                {msg.isAnonymous ? '익명' : msg.name}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(msg.time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching messages:', error)
    return (
      <div className="text-white text-center p-4">
        방명록을 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }
}
