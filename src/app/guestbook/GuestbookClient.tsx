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
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const messagesPerPage = 12 // 3x4 그리드

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  useEffect(() => {
    fetch('/api/guestbook')
      .then((res) => res.json())
      .then((data) => setMessages(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      alert('로그인이 필요합니다!')
      signIn()
      return
    }

    if (!message) {
      alert('메시지를 입력해주세요!')
      return
    }

    if (message.length > 30) {
      alert('메시지는 30글자를 초과할 수 없습니다!')
      return
    }

    try {
      const newMessage = {
        message,
        isAnonymous,
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
      const displayMessage = {
        ...savedMessage,
        name: savedMessage.isAnonymous ? '익명' : savedMessage.name,
      }
      setMessages([displayMessage, ...messages])
      setMessage('')
      setCurrentPage(1) // 새 메시지 작성 후 첫 페이지로 이동
    } catch (error) {
      console.error('Submit Error:', error)
      alert(
        error instanceof Error ? error.message : '메시지 등록에 실패했습니다.'
      )
    }
  }

  // 페이지네이션 계산
  const indexOfLastMessage = currentPage * messagesPerPage
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  )
  const totalPages = Math.ceil(messages.length / messagesPerPage)

  // 페이지 번호 배열 생성 (최대 5개 페이지 번호만 표시)
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPages = 5 // 한 번에 보여줄 최대 페이지 번호 수

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2))
    const endPage = Math.min(totalPages, startPage + maxPages - 1)

    // startPage 조정
    startPage = Math.max(1, endPage - maxPages + 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        방명록
      </h1>
      <p className="text-center text-gray-600 mb-8">
        저의 포트폴리오 페이지에 오신걸 환영합니다
        <br className="pt-4" />
        방명록을 남겨주세요
      </p>
      {/* 로그인/로그아웃 섹션 */}
      <div className="mb-8 bg-white/50 p-5 rounded-2xl border border-gray-100 backdrop-blur-sm shadow-sm">
        {session ? (
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">
              안녕하세요, {session.user?.name}님!
            </p>
            <button
              onClick={() => signOut()}
              className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-200 font-medium text-sm shadow-sm"
          >
            로그인하고 방명록 남기기
          </button>
        )}
      </div>

      {/* 방명록 작성 폼 */}
      {session && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-white/50 p-6 rounded-2xl border border-gray-100 backdrop-blur-sm shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="form-checkbox h-4 w-4 text-gray-600 rounded border-gray-300"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-600">
              익명으로 작성하기
            </label>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요 (30글자 이내)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={30}
                className="flex-1 bg-white px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all duration-200 text-sm"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2.5 rounded-lg hover:bg-gray-900 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                등록
              </button>
            </div>
            <div className="text-xs text-gray-500 text-right">
              {message.length}/30
            </div>
          </div>
        </form>
      )}

      {/* 방명록 목록 - 3x4 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currentMessages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white/50 p-5 rounded-2xl border border-gray-100 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 h-[140px] flex flex-col justify-between"
          >
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {msg.message}
            </p>
            <div className="flex justify-between items-center gap-4 mt-2 pt-2 border-t border-gray-100">
              <p className="font-medium text-gray-800 text-sm">
                {msg.isAnonymous ? '익명' : msg.name}
              </p>
              <p className="text-xs text-gray-500">{formatDate(msg.time)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            &lt;
          </button>
          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            &gt;
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            &gt;&gt;
          </button>
        </div>
      )}
    </div>
  )
}
