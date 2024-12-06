'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'

interface Message {
  _id: string
  name: string
  message: string
  time: string
  isAnonymous: boolean
}

export default function GuestbookClient() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  useEffect(() => {
    fetch('/api/guestbook')
      .then((res) => res.json())
      .then((data) => setMessages(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message) return alert('메시지를 입력해주세요!')

    try {
      const newMessage = {
        name: session?.user?.name || name || '익명',
        message,
        isAnonymous,
        time: new Date().toISOString(),
      }

      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      })

      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ error: '서버 오류가 발생했습니다.' }))
        throw new Error(error.error || '메시지 등록에 실패했습니다.')
      }

      const savedMessage = await res.json()
      // 화면에 표시할 때는 isAnonymous 값에 따라 이름을 '익명'으로 변경
      const displayMessage = {
        ...savedMessage,
        name: savedMessage.isAnonymous ? '익명' : savedMessage.name,
      }
      setMessages([displayMessage, ...messages])
      setMessage('')
      setName('')
    } catch (error) {
      console.error('Submit Error:', error)
      alert(
        error instanceof Error ? error.message : '메시지 등록에 실패했습니다.'
      )
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">
        방명록
      </h1>

      {/* 로그인/로그아웃 섹션 */}
      <div className="mb-10 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
        {session ? (
          <div className="flex justify-between items-center">
            <p className="text-gray-800 font-medium">
              안녕하세요, {session.user?.name}님!
            </p>
            <button
              onClick={() => signOut()}
              className="bg-white text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
          >
            로그인하고 방명록 남기기
          </button>
        )}
      </div>

      {/* 방명록 작성 폼 */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 space-y-5 bg-gray-50/50 p-7 rounded-xl border border-gray-100"
      >
        {!session && (
          <input
            type="text"
            placeholder="이름 (선택사항)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-gray-200 p-3.5 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
            disabled={isAnonymous}
          />
        )}
        <div className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500/20"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-600">
            익명으로 작성하기
          </label>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-white border border-gray-200 p-3.5 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3.5 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium whitespace-nowrap shadow-sm hover:shadow"
          >
            등록하기
          </button>
        </div>
      </form>

      {/* 방명록 목록 */}
      <ul className="space-y-5">
        {messages.map((msg) => (
          <li
            key={msg._id}
            className="border border-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-200 bg-white group"
          >
            <div className="flex justify-between items-start">
              <p className="font-semibold text-gray-900">
                {msg.isAnonymous ? '익명' : msg.name}
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                {msg.time}
              </p>
            </div>
            <p className="mt-3 text-gray-700 leading-relaxed">{msg.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
