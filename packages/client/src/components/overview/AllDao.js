
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown } from 'react-feather'
import ButtonDropdown from '../ButtonDropdown'



const NoDAO = () => (
    <div class="rounded-lg h-[300px] border-2 border-gray-600 flex w-full p-6 py-6 m-1 bg-gray-900 ">
        <div className="text-center max-w-sm m-auto">
            <h2 className=" text-2xl font-bold">
                No DAO Found
            </h2>
            <p className="text-sm my-2 text-gray-400">
                No DAO is made or managed by your account. Please proceed to set up a new one.
            </p>

            {/* <a href="https://docs.astar.network/docs/build/zkEVM/quickstart" target="_blank" className="text-xs underline my-2 text-gray-400">
                How to connect
            </a> */}
        </div>
    </div>
)

const AllDao = () => {
    return (
        <div className="ml-auto mr-auto w-full p-2 max-w-4xl mb-20">

            <ButtonDropdown
                title="Setup New..."
                items={["DAO", "Token"]}
                links={["/new/dao", "/new/token"]}
            />
            <NoDAO

            />

            {/* DISCLAIMER */}

            <div className='max-w-lg ml-auto mr-auto text-sm mt-4 text-center text-neutral-400'>
            You're using a development version that is available only on the zKatana Testnet. Please note that some functions may not work as intended.
            </div>




        </div>
    )
}

export default AllDao