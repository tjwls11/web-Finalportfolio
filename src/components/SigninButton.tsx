import { signIn } from '@/auth'
import Image from 'next/image'

export default function SigninButton() {
  return (
    <div className="flex flex-col gap-4 mt-10 items-center ">
      {/* 구글 */}
      <form
        action={async () => {
          'use server'
          await signIn('google', { redirectTo: '/mypage' })
        }}
      >
        <button
          type="submit"
          className="flex items-center justify-center gap-4 rounded-lg pl-3 mb-4 "
        >
          <Image src="/google-logo.png" height={30} width={30} alt="google" />
          <span className="bg-green-800 text-white px-4 py-3 rounded-lg">
            Sign in with Google
          </span>
        </button>
      </form>

      {/* 깃허브 */}
      <form
        action={async () => {
          'use server'
          await signIn('github', { redirectTo: '/mypage' })
        }}
      >
        <button
          type="submit"
          className="flex items-center justify-center gap-4 rounded-lg pl-3 mb-4"
        >
          <Image src="/github-logo.png" height={30} width={30} alt="google" />
          <span className="bg-green-800 text-white px-4 py-3 rounded-lg">
            Sign in with Github
          </span>
        </button>
      </form>
    </div>
  )
}
