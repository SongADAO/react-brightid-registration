import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

class BrightIDRegistrationModel {
    contractAbi = [
        {
            type: "constructor",
            stateMutability: "nonpayable",
            inputs: [
                {
                    type: "address",
                    name: "_verifierToken",
                    internalType: "contract IERC20",
                },
                { type: "bytes32", name: "_app", internalType: "bytes32" },
            ],
        },
        {
            type: "event",
            name: "OwnershipTransferred",
            inputs: [
                {
                    type: "address",
                    name: "previousOwner",
                    internalType: "address",
                    indexed: true,
                },
                {
                    type: "address",
                    name: "newOwner",
                    internalType: "address",
                    indexed: true,
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "Sponsor",
            inputs: [
                {
                    type: "address",
                    name: "addr",
                    internalType: "address",
                    indexed: true,
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "Verified",
            inputs: [
                {
                    type: "address",
                    name: "addr",
                    internalType: "address",
                    indexed: true,
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "VerifierTokenSet",
            inputs: [
                {
                    type: "address",
                    name: "verifierToken",
                    internalType: "contract IERC20",
                    indexed: false,
                },
            ],
            anonymous: false,
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "uint32", name: "", internalType: "uint32" }],
            name: "REGISTRATION_PERIOD",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
            name: "app",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "address", name: "", internalType: "address" }],
            name: "history",
            inputs: [{ type: "address", name: "", internalType: "address" }],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "bool", name: "", internalType: "bool" }],
            name: "isVerifiedUser",
            inputs: [
                { type: "address", name: "_user", internalType: "address" },
            ],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [{ type: "address", name: "", internalType: "address" }],
            name: "owner",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "renounceOwnership",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "setVerifierToken",
            inputs: [
                {
                    type: "address",
                    name: "_verifierToken",
                    internalType: "contract IERC20",
                },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "sponsor",
            inputs: [
                { type: "address", name: "addr", internalType: "address" },
            ],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "transferOwnership",
            inputs: [
                { type: "address", name: "newOwner", internalType: "address" },
            ],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [
                { type: "uint256", name: "time", internalType: "uint256" },
                { type: "bool", name: "isVerified", internalType: "bool" },
            ],
            name: "verifications",
            inputs: [{ type: "address", name: "", internalType: "address" }],
        },
        {
            type: "function",
            stateMutability: "view",
            outputs: [
                { type: "address", name: "", internalType: "contract IERC20" },
            ],
            name: "verifierToken",
            inputs: [],
        },
        {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "verify",
            inputs: [
                { type: "address[]", name: "addrs", internalType: "address[]" },
                { type: "uint256", name: "timestamp", internalType: "uint256" },
                { type: "uint8", name: "v", internalType: "uint8" },
                { type: "bytes32", name: "r", internalType: "bytes32" },
                { type: "bytes32", name: "s", internalType: "bytes32" },
            ],
        },
    ];

    web3Modal;

    web3Instance;

    walletAddress = "";

    ensName = "";

    chainId = 0;

    gasBalance = 0.0;

    brightIDLinkedWallets = [];

    isBrightIDIdchainLinked = false;

    isBrightIDLinked = false;

    isSponsoredViaContract = false;

    isVerifiedViaContract = false;

    context = "";

    contractAddr = "";

    mainnetRpcUrl = "";

    walletConnectInfuraId = "";

    relaySponsorURL = "";

    relayVerificationURL = "";

    appStoreAndroid = "";

    appStoreIos = "";

    brightIdMeetUrl = "";

    deepLinkPrefix = "";

    faucetClaimURL = "";

    registrationBlockExplorerUrl = "";

    registrationBlockExplorerTxnPath = "";

    registrationChainId = "";

    registrationChainName = "";

    registrationIconUrl = "";

    registrationRpcUrl = "";

    registrationTokenDecimal = "";

    registrationTokenName = "";

    verificationUrl = "";

    constructor(
        context = "",
        contractAddr = "",
        mainnetRpcUrl = "",
        walletConnectInfuraId = "",
        relaySponsorURL = "",
        relayVerificationURL = "",
        appStoreAndroid = "https://play.google.com/store/apps/details?id=org.brightid",
        appStoreIos = "https://apps.apple.com/us/app/brightid/id1428946820",
        brightIdMeetUrl = "https://meet.brightid.org",
        deepLinkPrefix = "brightid://link-verification/http:%2f%2fnode.brightid.org",
        faucetClaimURL = "https://idchain.one/begin/api/claim",
        registrationBlockExplorerTxnPath = "/tx/",
        registrationBlockExplorerUrl = "https://explorer.idchain.one",
        registrationChainId = "74",
        registrationChainName = "IDChain",
        registrationIconUrl = "https://apps.brightid.org/logos/idchain.png",
        registrationRpcUrl = "https://idchain.one/rpc/",
        registrationTokenDecimal = "18",
        registrationTokenName = "Eidi",
        verificationUrl = "https://app.brightid.org/node/v5/verifications"
    ) {
        this.context = context;
        this.contractAddr = contractAddr;
        this.mainnetRpcUrl = mainnetRpcUrl;
        this.walletConnectInfuraId = walletConnectInfuraId;
        this.relaySponsorURL = relaySponsorURL;
        this.relayVerificationURL = relayVerificationURL;

        this.appStoreAndroid = appStoreAndroid;
        this.appStoreIos = appStoreIos;
        this.brightIdMeetUrl = brightIdMeetUrl;
        this.deepLinkPrefix = deepLinkPrefix;
        this.faucetClaimURL = faucetClaimURL;
        this.registrationBlockExplorerTxnPath =
            registrationBlockExplorerTxnPath;
        this.registrationBlockExplorerUrl = registrationBlockExplorerUrl;
        this.registrationChainId = registrationChainId;
        this.registrationChainName = registrationChainName;
        this.registrationIconUrl = registrationIconUrl;
        this.registrationRpcUrl = registrationRpcUrl;
        this.registrationTokenDecimal = registrationTokenDecimal;
        this.registrationTokenName = registrationTokenName;
        this.verificationUrl = verificationUrl;
    }

    resetWalletData() {
        this.walletAddress = "";
        this.ensName = "";
        this.chainId = 0;
        this.gasBalance = 0.0;
        this.isBrightIDIdchainLinked = false;
        this.isBrightIDLinked = false;
        this.isSponsoredViaContract = false;
        this.isVerifiedViaContract = false;
    }

    /* Web3 Modal & Instances */
    /* ---------------------------------------------------------------------- */

    async initWeb3Modal() {
        if (typeof this.web3Modal === "object") {
            return;
        }

        console.log("initWeb3Modal");

        const providerOptions = {
            "custom-metamask": {
                display: {
                    name: "MetaMask",
                    description: "Connect to your MetaMask Wallet",
                    // logo: process.env.PUBLIC_URL + "/metamask.svg",
                    logo: "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjM1NSIgdmlld0JveD0iMCAwIDM5NyAzNTUiIHdpZHRoPSIzOTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMSkiPjxwYXRoIGQ9Im0xMTQuNjIyNjQ0IDMyNy4xOTU0NzIgNTIuMDA0NzE3IDEzLjgxMDE5OHYtMTguMDU5NDlsNC4yNDUyODMtNC4yNDkyOTJoMjkuNzE2OTgydjIxLjI0NjQ1OSAxNC44NzI1MjNoLTMxLjgzOTYyNGwtMzkuMjY4ODY4LTE2Ljk5NzE2OXoiIGZpbGw9IiNjZGJkYjIiLz48cGF0aCBkPSJtMTk5LjUyODMwNSAzMjcuMTk1NDcyIDUwLjk0MzM5NyAxMy44MTAxOTh2LTE4LjA1OTQ5bDQuMjQ1MjgzLTQuMjQ5MjkyaDI5LjcxNjk4MXYyMS4yNDY0NTkgMTQuODcyNTIzaC0zMS44Mzk2MjNsLTM5LjI2ODg2OC0xNi45OTcxNjl6IiBmaWxsPSIjY2RiZGIyIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSA0ODMuOTYyMjcgMCkiLz48cGF0aCBkPSJtMTcwLjg3MjY0NCAyODcuODg5NTIzLTQuMjQ1MjgzIDM1LjA1NjY1NyA1LjMwNjYwNC00LjI0OTI5Mmg1NS4xODg2OGw2LjM2NzkyNSA0LjI0OTI5Mi00LjI0NTI4NC0zNS4wNTY2NTctOC40OTA1NjUtNS4zMTE2MTUtNDIuNDUyODMyIDEuMDYyMzIzeiIgZmlsbD0iIzM5MzkzOSIvPjxwYXRoIGQ9Im0xNDIuMjE2OTg0IDUwLjk5MTUwMjIgMjUuNDcxNjk4IDU5LjQ5MDA4NTggMTEuNjc0NTI4IDE3My4xNTg2NDNoNDEuMzkxNTExbDEyLjczNTg0OS0xNzMuMTU4NjQzIDIzLjM0OTA1Ni01OS40OTAwODU4eiIgZmlsbD0iI2Y4OWMzNSIvPjxwYXRoIGQ9Im0zMC43NzgzMDIzIDE4MS42NTcyMjYtMjkuNzE2OTgxNTMgODYuMDQ4MTYxIDc0LjI5MjQ1MzkzLTQuMjQ5MjkzaDQ3Ljc1OTQzNDN2LTM3LjE4MTMwM2wtMi4xMjI2NDEtNzYuNDg3MjUzLTEwLjYxMzIwOCA4LjQ5ODU4M3oiIGZpbGw9IiNmODlkMzUiLz48cGF0aCBkPSJtODcuMDI4MzAzMiAxOTEuMjE4MTM0IDg3LjAyODMwMjggMi4xMjQ2NDYtOS41NTE4ODYgNDQuNjE3NTYzLTQxLjM5MTUxMS0xMC42MjMyMjl6IiBmaWxsPSIjZDg3YzMwIi8+PHBhdGggZD0ibTg3LjAyODMwMzIgMTkyLjI4MDQ1NyAzNi4wODQ5MDU4IDMzLjk5NDMzNHYzMy45OTQzMzR6IiBmaWxsPSIjZWE4ZDNhIi8+PHBhdGggZD0ibTEyMy4xMTMyMDkgMjI3LjMzNzExNCA0Mi40NTI4MzEgMTAuNjIzMjI5IDEzLjc5NzE3IDQ1LjY3OTg4OC05LjU1MTg4NiA1LjMxMTYxNS00Ni42OTgxMTUtMjcuNjIwMzk4eiIgZmlsbD0iI2Y4OWQzNSIvPjxwYXRoIGQ9Im0xMjMuMTEzMjA5IDI2MS4zMzE0NDgtOC40OTA1NjUgNjUuODY0MDI0IDU2LjI1LTM5LjMwNTk0OXoiIGZpbGw9IiNlYjhmMzUiLz48cGF0aCBkPSJtMTc0LjA1NjYwNiAxOTMuMzQyNzggNS4zMDY2MDQgOTAuMjk3NDUxLTE1LjkxOTgxMi00Ni4yMTEwNDl6IiBmaWxsPSIjZWE4ZTNhIi8+PHBhdGggZD0ibTc0LjI5MjQ1MzkgMjYyLjM5Mzc3MSA0OC44MjA3NTUxLTEuMDYyMzIzLTguNDkwNTY1IDY1Ljg2NDAyNHoiIGZpbGw9IiNkODdjMzAiLz48cGF0aCBkPSJtMjQuNDEwMzc3NyAzNTUuODc4MTkzIDkwLjIxMjI2NjMtMjguNjgyNzIxLTQwLjMzMDE5MDEtNjQuODAxNzAxLTczLjIzMTEzMzEzIDUuMzExNjE2eiIgZmlsbD0iI2ViOGYzNSIvPjxwYXRoIGQ9Im0xNjcuNjg4NjgyIDExMC40ODE1ODgtNDUuNjM2NzkzIDM4LjI0MzYyNy0zNS4wMjM1ODU4IDQyLjQ5MjkxOSA4Ny4wMjgzMDI4IDMuMTg2OTY5eiIgZmlsbD0iI2U4ODIxZSIvPjxwYXRoIGQ9Im0xMTQuNjIyNjQ0IDMyNy4xOTU0NzIgNTYuMjUtMzkuMzA1OTQ5LTQuMjQ1MjgzIDMzLjk5NDMzNHYxOS4xMjE4MTNsLTM4LjIwNzU0OC03LjQzNjI2eiIgZmlsbD0iI2RmY2VjMyIvPjxwYXRoIGQ9Im0yMjkuMjQ1Mjg2IDMyNy4xOTU0NzIgNTUuMTg4NjgtMzkuMzA1OTQ5LTQuMjQ1MjgzIDMzLjk5NDMzNHYxOS4xMjE4MTNsLTM4LjIwNzU0OC03LjQzNjI2eiIgZmlsbD0iI2RmY2VjMyIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgNTEzLjY3OTI1MiAwKSIvPjxwYXRoIGQ9Im0xMzIuNjY1MDk2IDIxMi40NjQ1OTMtMTEuNjc0NTI4IDI0LjQzMzQyNyA0MS4zOTE1MS0xMC42MjMyMjl6IiBmaWxsPSIjMzkzOTM5IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAyODMuMzcyNjQ2IDApIi8+PHBhdGggZD0ibTIzLjM0OTA1NyAxLjA2MjMyMjk2IDE0NC4zMzk2MjUgMTA5LjQxOTI2NTA0LTI0LjQxMDM3OC01OS40OTAwODU4eiIgZmlsbD0iI2U4OGYzNSIvPjxwYXRoIGQ9Im0yMy4zNDkwNTcgMS4wNjIzMjI5Ni0xOS4xMDM3NzM5MiA1OC40Mjc3NjI5NCAxMC42MTMyMDc3MiA2My43MzkzNzgxLTcuNDI5MjQ1NDEgNC4yNDkyOTIgMTAuNjEzMjA3NzEgOS41NjA5MDYtOC40OTA1NjYxNyA3LjQzNjI2MSAxMS42NzQ1Mjg0NyAxMC42MjMyMjktNy40MjkyNDU0IDYuMzczOTM4IDE2Ljk4MTEzMjMgMjEuMjQ2NDU5IDc5LjU5OTA1NzctMjQuNDMzNDI4YzM4LjkxNTA5Ni0zMS4xNjE0NzMgNTguMDE4ODY5LTQ3LjA5NjMxOCA1Ny4zMTEzMjItNDcuODA0NTMzLS43MDc1NDgtLjcwODIxNS00OC44MjA3NTYtMzcuMTgxMzAzNi0xNDQuMzM5NjI1LTEwOS40MTkyNjUwNHoiIGZpbGw9IiM4ZTVhMzAiLz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAzOTkuMDU2NjExIDApIj48cGF0aCBkPSJtMzAuNzc4MzAyMyAxODEuNjU3MjI2LTI5LjcxNjk4MTUzIDg2LjA0ODE2MSA3NC4yOTI0NTM5My00LjI0OTI5M2g0Ny43NTk0MzQzdi0zNy4xODEzMDNsLTIuMTIyNjQxLTc2LjQ4NzI1My0xMC42MTMyMDggOC40OTg1ODN6IiBmaWxsPSIjZjg5ZDM1Ii8+PHBhdGggZD0ibTg3LjAyODMwMzIgMTkxLjIxODEzNCA4Ny4wMjgzMDI4IDIuMTI0NjQ2LTkuNTUxODg2IDQ0LjYxNzU2My00MS4zOTE1MTEtMTAuNjIzMjI5eiIgZmlsbD0iI2Q4N2MzMCIvPjxwYXRoIGQ9Im04Ny4wMjgzMDMyIDE5Mi4yODA0NTcgMzYuMDg0OTA1OCAzMy45OTQzMzR2MzMuOTk0MzM0eiIgZmlsbD0iI2VhOGQzYSIvPjxwYXRoIGQ9Im0xMjMuMTEzMjA5IDIyNy4zMzcxMTQgNDIuNDUyODMxIDEwLjYyMzIyOSAxMy43OTcxNyA0NS42Nzk4ODgtOS41NTE4ODYgNS4zMTE2MTUtNDYuNjk4MTE1LTI3LjYyMDM5OHoiIGZpbGw9IiNmODlkMzUiLz48cGF0aCBkPSJtMTIzLjExMzIwOSAyNjEuMzMxNDQ4LTguNDkwNTY1IDY1Ljg2NDAyNCA1NS4xODg2OC0zOC4yNDM2MjZ6IiBmaWxsPSIjZWI4ZjM1Ii8+PHBhdGggZD0ibTE3NC4wNTY2MDYgMTkzLjM0Mjc4IDUuMzA2NjA0IDkwLjI5NzQ1MS0xNS45MTk4MTItNDYuMjExMDQ5eiIgZmlsbD0iI2VhOGUzYSIvPjxwYXRoIGQ9Im03NC4yOTI0NTM5IDI2Mi4zOTM3NzEgNDguODIwNzU1MS0xLjA2MjMyMy04LjQ5MDU2NSA2NS44NjQwMjR6IiBmaWxsPSIjZDg3YzMwIi8+PHBhdGggZD0ibTI0LjQxMDM3NzcgMzU1Ljg3ODE5MyA5MC4yMTIyNjYzLTI4LjY4MjcyMS00MC4zMzAxOTAxLTY0LjgwMTcwMS03My4yMzExMzMxMyA1LjMxMTYxNnoiIGZpbGw9IiNlYjhmMzUiLz48cGF0aCBkPSJtMTY3LjY4ODY4MiAxMTAuNDgxNTg4LTQ1LjYzNjc5MyAzOC4yNDM2MjctMzUuMDIzNTg1OCA0Mi40OTI5MTkgODcuMDI4MzAyOCAzLjE4Njk2OXoiIGZpbGw9IiNlODgyMWUiLz48cGF0aCBkPSJtMTMyLjY2NTA5NiAyMTIuNDY0NTkzLTExLjY3NDUyOCAyNC40MzM0MjcgNDEuMzkxNTEtMTAuNjIzMjI5eiIgZmlsbD0iIzM5MzkzOSIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMjgzLjM3MjY0NiAwKSIvPjxwYXRoIGQ9Im0yMy4zNDkwNTcgMS4wNjIzMjI5NiAxNDQuMzM5NjI1IDEwOS40MTkyNjUwNC0yNC40MTAzNzgtNTkuNDkwMDg1OHoiIGZpbGw9IiNlODhmMzUiLz48cGF0aCBkPSJtMjMuMzQ5MDU3IDEuMDYyMzIyOTYtMTkuMTAzNzczOTIgNTguNDI3NzYyOTQgMTAuNjEzMjA3NzIgNjMuNzM5Mzc4MS03LjQyOTI0NTQxIDQuMjQ5MjkyIDEwLjYxMzIwNzcxIDkuNTYwOTA2LTguNDkwNTY2MTcgNy40MzYyNjEgMTEuNjc0NTI4NDcgMTAuNjIzMjI5LTcuNDI5MjQ1NCA2LjM3MzkzOCAxNi45ODExMzIzIDIxLjI0NjQ1OSA3OS41OTkwNTc3LTI0LjQzMzQyOGMzOC45MTUwOTYtMzEuMTYxNDczIDU4LjAxODg2OS00Ny4wOTYzMTggNTcuMzExMzIyLTQ3LjgwNDUzMy0uNzA3NTQ4LS43MDgyMTUtNDguODIwNzU2LTM3LjE4MTMwMzYtMTQ0LjMzOTYyNS0xMDkuNDE5MjY1MDR6IiBmaWxsPSIjOGU1YTMwIi8+PC9nPjwvZz48L3N2Zz4=",
                },
                package: true,
                connector: async () => {
                    // Case 1: There is no injected provider available
                    // Resolution: Open MetaMask download in new tab
                    if (window.ethereum == undefined) {
                        //console.log("No Injected Providers Available");
                        window.open(
                            "https://metamask.app.link/dapp/www.ethbox.org/app/",
                            "_blank"
                        );
                        return;
                    }
                    // Case 2: There are multiple providers available.
                    // Resolution: Check if an injected provider is Metamask,
                    //  if true, return the provider. If false, open MetaMask download
                    //  in new tab.
                    else if (window.ethereum.providers !== undefined) {
                        let providers = window.ethereum.providers;
                        let provider = providers.find((p) => p.isMetaMask); // <-- LOOK HERE
                        if (provider) {
                            //console.log("MetaMask provider located");
                            try {
                                await provider.request({
                                    method: "eth_requestAccounts",
                                });
                                return provider;
                            } catch (error) {
                                throw new Error("User Rejected");
                            }
                        } else {
                            let provider = providers[0];
                            await provider.request({
                                method: "eth_requestAccounts",
                            });
                            return provider;
                            //console.log("MetaMask not an available provider");
                            window.open(
                                "https://metamask.app.link/dapp/www.ethbox.org/app/",
                                "_blank"
                            );
                            return;
                        }
                    }
                    // Case 3: There is one injected provider available.
                    // Resolution: If it is MetaMask, return the provider.
                    //  Otherwise, open download in new tab.
                    else if (
                        window.ethereum.providers == undefined &&
                        window.ethereum.isMetaMask == true
                    ) {
                        //console.log("MetaMask is the single injected provider");
                        let provider = window.ethereum;
                        try {
                            await provider.request({
                                method: "eth_requestAccounts",
                            });
                            return provider;
                        } catch (error) {
                            throw new Error("User Rejected");
                        }
                    } else {
                        let provider = window.ethereum;
                        await provider.request({
                            method: "eth_requestAccounts",
                        });
                        return provider;
                        window.open(
                            "https://metamask.app.link/dapp/www.ethbox.org/app/",
                            "_blank"
                        );
                        return;
                    }
                },
            },
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: this.walletConnectInfuraId, // required
                    rpc: {},
                    // network: this.registrationChainName,
                },
            },
        };

        providerOptions.walletconnect.options.rpc[this.registrationChainId] =
            this.registrationRpcUrl;

        this.web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            disableInjectedProvider: true,
            providerOptions, // required
        });
    }

    async initInstance() {
        if (typeof this.web3Instance === "object") {
            return;
        }

        console.log("initInstance");

        await this.initWeb3Modal();

        const web3Instance = await this.web3Modal.connect();

        this.web3Instance = web3Instance;
    }

    async initFreshInstance() {
        console.log("initFreshInstance");

        await this.initWeb3Modal();

        await this.web3Modal.clearCachedProvider();
        localStorage.removeItem("walletconnect");
        localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
        localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");

        const web3Instance = await this.web3Modal.connect();

        this.web3Instance = web3Instance;
    }

    /* Providers */
    /* ---------------------------------------------------------------------- */

    async getProvider() {
        await this.initInstance();

        return new ethers.providers.Web3Provider(this.web3Instance);
    }

    getMainnetProvider() {
        return new ethers.providers.JsonRpcProvider(this.mainnetRpcUrl);
    }

    getIdchainProvider() {
        return new ethers.providers.JsonRpcProvider(this.registrationRpcUrl);
    }

    /* Contracts */
    /* ---------------------------------------------------------------------- */

    async getIdchainProviderContract() {
        const provider = await this.getIdchainProvider();

        return new ethers.Contract(
            this.contractAddr,
            this.contractAbi,
            provider
        );
    }

    async getContract() {
        const provider = await this.getProvider();

        return new ethers.Contract(
            this.contractAddr,
            this.contractAbi,
            provider
        );
    }

    async getContractRw() {
        const provider = await this.getProvider();

        return new ethers.Contract(
            this.contractAddr,
            this.contractAbi,
            provider.getSigner()
        );
    }

    /* Provider Feature Detection */
    /* ---------------------------------------------------------------------- */

    getProviderType() {
        return JSON.parse(localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER"));
    }

    canAutoSwitchNetworks() {
        return this.getProviderType() !== "walletconnect";
    }

    hasReconnectableWallet() {
        return (
            this.getProviderType() === "injected" ||
            this.getProviderType() === "walletconnect"
        );
    }

    /* Data Query */
    /* ---------------------------------------------------------------------- */

    async getWalletAddress() {
        if (
            typeof this.walletAddress === "string" &&
            this.walletAddress !== ""
        ) {
            return this.walletAddress;
        }

        console.log("getWalletAddress");

        this.walletAddress = await this.queryWalletAddress();

        return this.walletAddress;
    }

    async getQrCodeUrl() {
        const addr = await this.getWalletAddress();

        return `${this.deepLinkPrefix}/${this.context}/${addr}`;
    }

    async getQrCodeIdchainUrl() {
        const addr = await this.getWalletAddress();

        return `${this.deepLinkPrefix}/idchain/${addr}`;
    }

    async queryWalletAddress() {
        try {
            console.log("queryWalletAddress");

            const provider = await this.getProvider();

            const accounts = await provider.listAccounts();

            if (accounts.length === 0) {
                throw new Error("No WalAddress Found");
            }

            return accounts[0];
        } catch (e) {
            // console.error(e);
            // console.log(e);

            return "";
        }
    }

    async queryENSName() {
        try {
            console.log("queryENSName");

            const addr = await this.getWalletAddress();

            const provider = this.getMainnetProvider();

            const name = await provider.lookupAddress(addr);

            // console.log(name);

            return name;
        } catch (e) {
            // console.error(e);
            // console.log(e);

            return "";
        }
    }

    async queryChainId() {
        try {
            console.log("queryChainId");

            const provider = await this.getProvider();

            const { chainId } = await provider.getNetwork();

            return chainId;
        } catch (e) {
            // console.error(e);
            // console.log(e);

            return 0;
        }
    }

    async queryGasBalance() {
        try {
            console.log("checkGas");

            const addr = await this.getWalletAddress();

            const provider = await this.getIdchainProvider();

            const balanceRaw = await provider.getBalance(addr);

            const balanceFormatted = await ethers.utils.formatEther(balanceRaw);

            return parseFloat(balanceFormatted);
        } catch (e) {
            // console.error(e);
            // console.log(e);

            return 0.0;
        }
    }

    async queryBrightIDIdchainLink(contextId) {
        try {
            console.log("queryBrightIDIdchainLink");

            const userVerificationUrl = `${this.verificationUrl}/idchain/${contextId}?signed=null&timestamp=null`;

            // console.log(userVerificationUrl);

            const request = new Request(userVerificationUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const response = await fetch(request);

            // console.log(response);

            if (response.ok === true) {
                const responseJson = await response.json();

                // console.log(responseJson);

                this.brightIDLinkedWallets = responseJson.data.contextIds;

                return (
                    responseJson.data.contextIds[0].toLowerCase() ===
                    contextId.toLowerCase()
                );
            }

            if (response.status === 403) {
                this.brightIDLinkedWallets = [];

                return true;
            }

            this.brightIDLinkedWallets = [];

            return false;
        } catch (e) {
            // console.error(e);
            // console.log(e);

            return false;
        }
    }

    async queryBrightIDLink(contextId) {
        try {
            console.log("queryBrightIDLink");

            const userVerificationUrl = `${this.verificationUrl}/${this.context}/${contextId}?signed=null&timestamp=null`;

            // console.log(userVerificationUrl);

            const request = new Request(userVerificationUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const response = await fetch(request);

            // console.log(response);

            if (response.ok === true) {
                const responseJson = await response.json();

                // console.log(responseJson);

                return (
                    responseJson.data.contextIds[0].toLowerCase() ===
                    contextId.toLowerCase()
                );
            }

            if (response.status === 403) {
                return true;
            }

            return false;
        } catch (e) {
            // console.error(e);
            // console.log(e);

            return false;
        }
    }

    async queryBrightIDSponsorship(contextId) {
        try {
            console.log("queryBrightIDSponsorship");

            const userVerificationUrl = `${this.verificationUrl}/${this.context}/${contextId}?signed=eth&timestamp=seconds`;

            // console.log(userVerificationUrl);

            const request = new Request(userVerificationUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const response = await fetch(request);

            // console.log(response);

            return response.ok;
        } catch (e) {
            // console.error(e);
            // console.log(e);

            return false;
        }
    }

    async queryBrightIDVerification(contextId) {
        try {
            console.log("queryBrightIDVerification");

            const addr = await this.getWalletAddress();

            const contract = await this.getIdchainProviderContract();

            const isVerified = await contract.isVerifiedUser(addr);

            // console.log(isVerified);

            return isVerified;
        } catch (e) {
            // console.error(e);
            // console.log(e);

            return false;
        }
    }

    async queryBrightIDSignature(contextId) {
        try {
            const userVerificationUrl = `${this.verificationUrl}/${this.context}/${contextId}?signed=eth&timestamp=seconds`;

            // console.log(userVerificationUrl);

            const request = new Request(userVerificationUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const response = await fetch(request);

            const body = await response.json();

            if (response.ok === false) {
                throw new Error(body.errorMessage);
            }

            return body;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /* State Data Query */
    /* ---------------------------------------------------------------------- */

    async initWalletAddress() {
        try {
            console.log("initWalletAddress");

            this.walletAddress = await this.queryWalletAddress();

            return this.walletAddress;
        } catch (e) {
            // console.error(e);
            // console.log(e);
        }
    }

    async initENSName() {
        try {
            this.ensName = await this.queryENSName();

            return this.ensName;
        } catch (e) {
            // console.error(e);
            // console.log(e);
        }
    }

    async initChainId() {
        try {
            this.chainId = await this.queryChainId();

            return this.chainId;
        } catch (e) {
            // console.error(e);
            // console.log(e);
        }
    }

    async initGasBalance() {
        try {
            this.gasBalance = await this.queryGasBalance();

            return this.gasBalance;
        } catch (e) {
            // console.error(e);
            // console.log(e);
        }
    }

    async initIsBrightIDIdchainLinked() {
        try {
            const addr = await this.getWalletAddress();

            this.isBrightIDIdchainLinked = await this.queryBrightIDIdchainLink(
                addr
            );

            return this.isBrightIDIdchainLinked;
        } catch (e) {
            // console.error(e);
            // console.log(e);
        }
    }

    async initIsBrightIDLinked() {
        try {
            const addr = await this.getWalletAddress();

            this.isBrightIDLinked = await this.queryBrightIDLink(addr);

            return this.isBrightIDLinked;
        } catch (e) {
            // console.error(e);
            // console.log(e);
        }
    }

    async initIsSponsoredViaContract() {
        try {
            const addr = await this.getWalletAddress();

            this.isSponsoredViaContract = await this.queryBrightIDSponsorship(
                addr
            );

            return this.isSponsoredViaContract;
        } catch (e) {
            // console.error(e);
            // console.log(e);
        }
    }

    async initIsVerifiedViaContract() {
        try {
            const addr = await this.getWalletAddress();

            this.isVerifiedViaContract = await this.queryBrightIDVerification(
                addr
            );

            return this.isVerifiedViaContract;
        } catch (e) {
            // console.error(e);
            // console.log(e);
        }
    }

    /* Interactive Events */
    /* ---------------------------------------------------------------------- */

    async connectWallet() {
        await this.initInstance();
    }

    async chooseWallet() {
        await this.initFreshInstance();
    }

    async faucetClaim() {
        const addr = await this.getWalletAddress();

        const request = new Request(this.faucetClaimURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ addr: addr }),
        });

        return await fetch(request);
    }

    async switchToMainnetNetwork() {
        const provider = await this.getProvider();

        return await provider.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
        });
    }

    async switchToIDChainNetwork() {
        const registrationHexChainId = ethers.utils.hexlify(
            Number(this.registrationChainId)
        );

        const provider = await this.getProvider();

        return await provider.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: registrationHexChainId }],
        });
    }

    async addIDChainNetwork() {
        const registrationHexChainId = ethers.utils.hexlify(
            Number(this.registrationChainId)
        );

        const provider = await this.getProvider();

        return await provider.provider.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: registrationHexChainId,
                    chainName: this.registrationChainName,
                    nativeCurrency: {
                        name: this.registrationTokenName,
                        symbol: this.registrationTokenName,
                        decimals: Number(this.registrationTokenDecimal),
                    },
                    rpcUrls: [this.registrationRpcUrl],
                    blockExplorerUrls: [this.registrationBlockExplorerUrl],
                    iconUrls: [this.registrationIconUrl],
                },
            ],
        });
    }

    async sponsorViaContract() {
        const chainId = await this.initChainId();

        if (chainId !== Number(this.registrationChainId)) {
            throw new Error(
                `Please switch to the ${this.registrationChainName} network first.`
            );
        }

        const addr = await this.getWalletAddress();

        const contract = await this.getContractRw();

        return await contract.sponsor(addr, {
            gasLimit: 50000,
            gasPrice: 10000000000,
        });
    }

    async verifyViaContract() {
        const chainId = await this.initChainId();

        if (chainId !== Number(this.registrationChainId)) {
            throw new Error(
                `Please switch to the ${this.registrationChainName} network first.`
            );
        }

        const addr = await this.getWalletAddress();

        const verificationData = await this.queryBrightIDSignature(addr);

        const contract = await this.getContractRw();

        // const addrs = [addr];
        const addrs = verificationData.data.contextIds;
        const timestamp = verificationData.data.timestamp;
        const v = verificationData.data.sig.v;
        const r = "0x" + verificationData.data.sig.r;
        const s = "0x" + verificationData.data.sig.s;

        // // console.log("-------------------------------");
        // // console.log(addrs);
        // // console.log(timestamp);
        // // console.log(v);
        // // console.log(r);
        // // console.log(s);
        // // console.log("-------------------------------");

        return await contract.verify(addrs, timestamp, v, r, s, {
            gasLimit: 200000,
            gasPrice: 10000000000,
        });
    }

    async sponsorViaRelay() {
        const addr = await this.getWalletAddress();

        const request = new Request(this.relaySponsorURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ addr: addr }),
        });

        return await fetch(request);
    }

    async verifyViaRelay() {
        const addr = await this.getWalletAddress();

        const request = new Request(this.relayVerificationURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ addr: addr }),
        });

        return await fetch(request);
    }
}

export default BrightIDRegistrationModel;
