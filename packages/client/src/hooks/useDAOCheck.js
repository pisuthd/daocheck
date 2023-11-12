import { useCallback } from "react"
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from "ethers";
import DAORegistryABI from "../abi/DAORegistry.json"
import DAOCheckABI from "../abi/DAOCheck.json"

import { DAOCHECK_ADDRESS, DAOREGISTRY_ADDRESS } from "../constants"
import { hashCommitment } from "@/utils";

const ETH_PRICE = 2000

const useDAOCheck = () => {

    const [{ wallet }] = useConnectWallet()

    const registerDao = useCallback(async ({
        name,
        address,
        jurisdiction,
        isParent = true,
        parentId = 0
    }) => {

        if (!wallet) {
            return
        }

        const provider = new ethers.BrowserProvider(wallet.provider)
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(DAOREGISTRY_ADDRESS, DAORegistryABI, signer);

        const tx = await contract.register(
            ethers.encodeBytes32String(name),
            ethers.encodeBytes32String(address),
            ethers.encodeBytes32String(jurisdiction),
            isParent,
            parentId
        )

        await tx.wait()

        const daoCount = await contract.daoCount()

        return (Number(daoCount))
    }, [wallet])

    const createWallet = useCallback(async (commitment, duty) => {

        if (!wallet) {
            return
        }

        const provider = new ethers.BrowserProvider(wallet.provider)
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(DAOCHECK_ADDRESS, DAOCheckABI, signer)

        const tx = await contract.create(commitment, duty)

        await tx.wait()

    }, [wallet])

    const listWallet = useCallback(async (daoId, secret) => {

        if (!wallet) {
            return
        }

        const provider = new ethers.BrowserProvider(wallet.provider)
        const contract = new ethers.Contract(DAOCHECK_ADDRESS, DAOCheckABI, provider)

        let wallets = []

        for (let i = 0; i < 3; i++) {
            const commitment = await hashCommitment(`${daoId}${i}`, secret)

            const address = await contract.walletToAddress(commitment)

            if (address === "0x0000000000000000000000000000000000000000") {
                break
            }

            const dutyRate = await contract.walletToDuty(commitment)
            const balance = await contract.balances(commitment)
            const duty = await contract.duties(commitment)

            wallets.push({
                address,
                dutyRate: Number(dutyRate),
                balance : `${balance}`,
                duty: `${duty}`,
                balanceInUsd: Number(ethers.formatEther(balance)) * ETH_PRICE,
                dutyInUsd: Number(ethers.formatEther(duty)) * ETH_PRICE
            })
        }

        return wallets

    }, [wallet])

    const listDAO = useCallback(async () => {

        const provider = wallet ? new ethers.BrowserProvider(wallet.provider) : new ethers.JsonRpcProvider("https://rpc.startale.com/zkatana")
        const contract = new ethers.Contract(DAOREGISTRY_ADDRESS, DAORegistryABI, provider)

        const total = await contract.daoCount()

        let items = []

        for (let i = 1; i <= Number(total); i++) {
            const daoData = await contract.gazettes(i)
            items.push({
                daoId: i,
                name: ethers.decodeBytes32String(daoData["name"]),
                address: ethers.decodeBytes32String(daoData["addr"]),
                jurisdiction: ethers.decodeBytes32String(daoData["jurisdiction"]),
                isParent: daoData["isParent"],
                parentId: Number(daoData["parentId"]),
                owner: daoData["representative"]
            })
        }

        const parsed = items.reverse()
        return parsed
    }, [wallet])

    return {
        registerDao,
        createWallet,
        listWallet,
        listDAO
    }
}

export default useDAOCheck