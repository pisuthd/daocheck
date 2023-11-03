import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'
import { Puff } from 'react-loading-icons'


const Header = () => {

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

    const router = useRouter()

    const { pathname } = router

    return (
        <nav
            class="w-full grid grid-cols-5 p-2 gap-3">
            <div className='py-2 col-span-1'>
                <Link href="https://daocheck.co">
                    <Image
                        src="/daocheck-logo-2.png"
                        width={200}
                        height={50}
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className='col-span-3'>
                <div class="text-md font-bold text-blue-700 lg:flex-grow">
                    <div class="container flex items-center justify-center p-4 mx-auto  capitalize  text-gray-300">
                        <Link className={`border-b-2 ${pathname === ("/") ? "text-gray-200 border-cyan-500" : "border-transparent hover:text-gray-200 hover:border-cyan-500"} mx-1.5 sm:mx-6`} href="/">
                            Overview
                        </Link>
                        <Link className={`border-b-2 ${pathname.includes("/activity") ? "text-gray-200 border-cyan-500" : "border-transparent hover:text-gray-200 hover:border-cyan-500"} mx-1.5 sm:mx-6`} href="/activity">
                            Activity
                        </Link>
                        <Link className={`border-b-2 ${pathname.includes("/settings") ? "text-gray-200 border-cyan-500" : "border-transparent hover:text-gray-200 hover:border-cyan-700"} mx-1.5 sm:mx-6`} href="/settings">
                            Settings
                        </Link>
                    </div>
                </div>
            </div>
            <div className='py-2 col-span-1 flex'>
                <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())} class={`${wallet ? "bg-transparent border" : "bg-cyan-500"} ml-auto mr-2 font-bold  text-white text-sm py-2 px-8 rounded-md`}>
                    {connecting ? <><Puff stroke="#ffffff" style={{ height: "18px", width: "18px" }} className='mx-10' /></> : wallet ? 'Disconnect' : 'Connect Wallet'}
                </button>
            </div>
        </nav>
    )
}

export default Header