import SigninButton from '../../components/SigninButton'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">로그인</h1>
      <SigninButton />
    </div>
  )
}
