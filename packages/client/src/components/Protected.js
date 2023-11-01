import { useConnectWallet } from "@web3-onboard/react"
import Image from 'next/image'


const Protected = ({ children }) => {

    const [{ wallet, connecting }] = useConnectWallet()

    if (!wallet || wallet && wallet.chains[0] && wallet.chains[0].id !== "0x133e40" ) {
        return (
            <div class="rounded-3xl h-[300px] border border-gray-600 ml-auto mr-auto max-w-2xl flex w-full p-6 py-6 m-1 bg-gray-900 ">

                <div className="text-center max-w-sm m-auto">
                    <h2 className=" text-2xl font-bold">
                        Wrong Network
                    </h2>
                    <p className="text-sm my-2 text-gray-400">
                        We're unable to see that you have connected any Web3 wallet on the following network:
                    </p>
                    <div class="w-full mb-1 bg-gray-800 rounded-lg border border-gray-600 ml-auto mr-auto grid grid-cols-4 p-2 mt-4 gap-3 text-lg">
                        <div className="col-span-1 py-1 px-2">
                            <Image
                                src="/astar-logo.png"
                                width={100}
                                height={100}
                                alt="Astar"
                            />
                        </div>
                        <div className="col-span-3 flex flex-col font-semibold text-left">
                            <div className="mt-auto">
                                zKatana Testnet
                            </div>
                            <div className="text-xs p-0 m-0  text-gray-400 mb-auto">
                                Chain ID: 1261120
                            </div> 
                        </div>
                    </div>
                    <a href="https://docs.astar.network/docs/build/zkEVM/quickstart" target="_blank" className="text-xs underline my-2 text-gray-400">
                        How to connect
                    </a>
                </div>


            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default Protected