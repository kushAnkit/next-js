import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Link  className='text-3xl mt-10 text-center' href={'/signup'}>Signup</Link>
      <Link  className='text-3xl mt-10 text-center'  href={'/profile'}>Profile</Link>
    </main>
  )
}
