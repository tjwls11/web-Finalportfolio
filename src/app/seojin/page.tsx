'use client'

import Link from 'next/link'
import React from 'react'
import { FaBirthdayCake, FaSchool, FaGithub, FaHome } from 'react-icons/fa'
import { MdOutlineMailOutline } from 'react-icons/md'
import { FaInstagram } from 'react-icons/fa6'
import { SiNotion } from 'react-icons/si'
import { GiLion } from 'react-icons/gi'
import Github from '@/components/Github'

// Props 타입 정의
interface InfoItemProps {
  icon: React.ReactNode
  text: string
}

interface LinkItemProps {
  href: string
  icon: React.ReactNode
  text: string
}

export default function SeojinPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white pt-16 p-8 mt-32 pb-9 ">
      {/* About Me 섹션 */}
      <div className="max-w-4xl w-full mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">About Me</h1>
        <h2 className="text-xl text-gray-600 mb-6">
          안녕하세요 정보보호학과 백서진입니다 저는 이번 학기 수업을 들으면서...
        </h2>
        <p className="text-gray-600 space-y-4">
          2024년도 웹서버보안프로그래밍 수업을 들으면서 웹 개발에 관심이
          많아졌습니다.
          <br />
          수업을 들으면서 오류가 발생하는 경우가 많아 힘들었지만 오류를 해결하는
          과정에서 많은 것을 배울 수 있었습니다.
          <br />
          현재 웹보안과 AI 분야에 관심이 생겨 웹서비스에 접목시킬 수 있는
          ai개발을 목표로 공부중입니다.
          <br />
          앞으로도 계속해서 새로운 기술을 배우고 성장하는 개발자가 되고
          싶습니다.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold  text-center mb-6">
          저의 깃허브 기록입니다
        </h2>
        <Github />
      </div>

      {/* 정보 카드 */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem icon={<FaBirthdayCake />} text="2004.09.03" />
          <LinkItem
            href="https://github.com/tjwls11"
            icon={<FaGithub />}
            text="Git Link"
          />
          <InfoItem icon={<FaSchool />} text="중부대학교 정보보호학과 23학번" />
          <InfoItem icon={<GiLion />} text="멋쟁이사자처럼 12기" />
          <InfoItem icon={<MdOutlineMailOutline />} text="rcsj10@naver.com" />
          <LinkItem
            href="https://marble-acapella-568.notion.site/f1608ef20da24d3da95c6a5b1233500f?pvs=25"
            icon={<SiNotion />}
            text="Notion"
          />
          <LinkItem
            href="https://www.instagram.com/seojin___.b/"
            icon={<FaInstagram />}
            text="seojin___.b"
          />
          <InfoItem icon={<FaHome />} text="경기도 고양시 탄현동" />
        </div>
      </div>
    </div>
  )
}

// 일반 정보 아이템 컴포넌트
const InfoItem = ({ icon, text }: InfoItemProps) => (
  <div className="flex items-center space-x-4 p-2">
    <div className="text-2xl text-gray-600">{icon}</div>
    <span className="text-gray-700">{text}</span>
  </div>
)

// 링크 아이템 컴포넌트
const LinkItem = ({ href, icon, text }: LinkItemProps) => (
  <Link href={href}>
    <div className="flex items-center space-x-4 p-2">
      <div className="text-2xl text-gray-600">{icon}</div>
      <span className="text-gray-700">{text}</span>
    </div>
  </Link>
)
