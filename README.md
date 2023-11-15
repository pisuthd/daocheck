# DAOCheck

DAOCheck is a non-custodial payment gateway for real-world LLC DAO utilizing zk-SNARK and Astar blockchain, created during the [Web3 Global Hackathon 2023](https://key3.eventos.tokyo/web/portal/744/event/7845). The project is on the Shibuya Testnet and live at [https://dev.daocheck.co](https://dev.daocheck.co).

- [YouTube](https://youtu.be/-983lSJsctQ)
- [Akindo](https://app.akindo.io/communities/La2pLrojPT497x1m/products/q3elgKWB1ikGpMkM)

## Background

As of now, many countries allow the registration of the DAO, from Singapore, the Marshall Islands to U.S. states like Wyoming (and soon in Japan). Implementing the legal wrapper allows the DAO to receive payments at physical branches, like coffee shops within its jurisdiction and fulfill tax responsibilities. The benefits of doing it right help DAO token holders avoid further legal issues.

## Problem

But there are two main problems for the real-world LLC DAO at the moment.

The first issue is using the public blockchain, meaning anyone can access financial transactions that are supposed to be confidential. We don't want our competitors to access it when we're just launching campaigns and so on.

The second issue is that, by default, crypto payments have no tax deduction, every transaction is at 0% tax, and we can't track where it comes from, making it super difficult to file taxes.

## Solution

Introducing DAOCheck, we provide a non-custodial payment gateway solution that allows the creation of on-chain wallets for each jurisdiction and tax duty.

For example, for the DAO incorporated in Singapore, it can have two on-chain wallets - one to receive payments within Singapore with GST 8% and another wallet to receive payments from abroad without tax. And when someone pays to the wallet, the wallet will redirect all tokens to the DAOCheck main contract where all tokens coming from every wallet in the system reside. Only individuals who can provide the correct secret phrase will be able to access their owned DAO's financial transactions and withdraw the payment.

This technique is called the token mixer and has been used in [Tornado Cash](https://github.com/tornadocash/tornado-core) project. We're extending it to protect confidential data for the DAO and enable a truly non-custodial payment gateway for the real-world DAO.

## How It Works

The project utilizes a token mixer concept from Tornado Cash as its core and works through 3 smart contracts.

- DAORegistry.sol - This contract maintains the public records of the DAO, including the name, address, and jurisdiction.
- Verifier.sol - An auto-generated contract from the snark.js framework, utilizing the withdraw.circom circuit, allowing verification of the Merkle Tree of commitments.
- DAOCheck.sol - The main contract inherits Verifier.sol from above, enabling the anonymous generation of on-chain wallets from the secret phase hashed together with DAO ID from DAORegistry.sol. 

The ZK-proof helps decouple the wallets from each other. There is no way to link the QR code address and the wallet that the DAO manages to withdraw the payment, ensuring the DAO's remaining privacy of its confidential information.

## Getting started

Before getting started, ensure you have all the dependencies required to run the command:

```
npm run bootstrap
```

We can then run all tests for all smart contracts and circuits by:

```
npm run test
```

And to start the frontend application:

```
npm run package:client
```

## Deployment

### Shibuya Testnet

Name | Address 
--- | --- 
DAORegistry | 0x1514DF4C03058624a0226ECCc9B03b4F30BA4753
DAOCheck | 0x4fa1778466C0Cf2CAd2c35fB0E5BB42E03685d00
Verifier | 0xffA94555F448964D67483Aae242F9aCf3331dAF7
