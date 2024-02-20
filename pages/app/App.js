import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import { Avalanche } from "@particle-network/chains";
import {
  AAWrapProvider,
  SendTransactionMode,
  SmartAccount,
} from "@particle-network/aa";
import { ethers } from "ethers";
import { notification } from "antd";
import "./App.css";
import { safeMint1 } from "../../utils/contract";
const App = () => {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();

  const smartAccount = new SmartAccount(provider, {
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    clientKey: import.meta.env.VITE_APP_CLIENT_KEY,
    appId: import.meta.env.VITE_APP_APP_ID,
    aaOptions: {
      simple: [{ chainId: Avalanche.id, version: "1.0.0" }],
    },
  });
  const customProvider = new ethers.providers.Web3Provider(
    new AAWrapProvider(smartAccount, SendTransactionMode.Gasless),
    "any"
  );
  const [trxHash, setTrxHash] = useState(null);
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo, smartAccount, customProvider]);
  const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);
    setBalance(ethers.utils.formatEther(balanceResponse));
  };
  const handleLogin = async (authType) => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: Avalanche,
      });
    }
  };
  const executeUserOp = async () => {
    const signer = customProvider.getSigner();
    const tx = {
      to: "0x000000000000000000000000000000000000dEaD",
      value: ethers.utils.parseEther("0.0001"),
    };
    const txResponse = await signer.sendTransaction(tx);
    const txReceipt = await txResponse.wait();
    notification.success({
      message: "Transaction Successful",
      description: _jsxs("div", {
        children: [
          "Transaction Hash:",
          " ",
          _jsx("a", {
            href: `https://snowtrace.io/tx/${txReceipt.transactionHash}`,
            target: "_blank",
            rel: "noopener noreferrer",
            children: txReceipt.transactionHash,
          }),
        ],
      }),
    });
  };
  const executeBatchUserOp = async () => {
    const tx = {
      tx: [
        {
          to: "0x000000000000000000000000000000000000dEaD",
          value: ethers.utils.parseEther("0.0001"),
        },
        {
          to: "0x000000000000000000000000000000000000dEaD",
          value: ethers.utils.parseEther("0.0001"),
        },
      ],
    };
    const txResponse = await smartAccount.sendTransaction(tx);
    notification.success({
      message: "Transaction Successful",
      description: _jsxs("div", {
        children: [
          "Transaction Hash:",
          " ",
          _jsx("a", {
            href: `https://snowtrace.io/tx/${txResponse}`,
            target: "_blank",
            rel: "noopener noreferrer",
            children: txResponse,
          }),
        ],
      }),
    });
  };
  const claimReward = async () => {
    try {
      const public_address = userInfo.wallets[0].public_address;
      const res = await safeMint1(public_address);
      setTrxHash(res);
    } catch (error) {
      console.log(error);
    }
  };
  const copyTrxLink = () => {
    navigator.clipboard.writeText(`https://testnet.snowtrace.io/tx/${trxHash}`);
  };
  return _jsxs("div", {
    className: "App",
    children: [
      _jsxs("div", {
        className: "logo-section",
        children: [
          _jsx("img", {
            src: "https://i.imgur.com/EerK7MS.png",
            alt: "Logo 1",
            className: "logo logo-big",
          }),
          _jsx("img", {
            src: "https://i.imgur.com/eBJAx0s.png",
            alt: "Logo 2",
            className: "logo logo-big",
          }),
        ],
      }),
      !userInfo
        ? _jsxs("div", {
            className: "login-section",
            children: [
              _jsxs("button", {
                className: "sign-button google-button",
                onClick: () => handleLogin("google"),
                children: [
                  _jsx("img", {
                    src: "https://i.imgur.com/nIN9P4A.png",
                    alt: "Google",
                    className: "icon",
                  }),
                  "Sign in with Google",
                ],
              }),
              _jsxs("button", {
                className: "sign-button twitter-button",
                onClick: () => handleLogin("twitter"),
                children: [
                  _jsx("img", {
                    src: "https://i.imgur.com/afIaQJC.png",
                    alt: "Twitter",
                    className: "icon",
                  }),
                  "Sign in with X",
                ],
              }),
              _jsx("button", {
                className: "sign-button other-button",
                onClick: () => handleLogin(""),
                children: _jsx("img", {
                  src: "https://i.imgur.com/VRftF1b.png",
                  alt: "Twitter",
                  className: "icon",
                }),
              }),
            ],
          })
        : _jsxs("div", {
            className: "profile-card",
            children: [
              _jsx("h2", { children: userInfo.name }),
              _jsxs("div", {
                className: "balance-section",
                children: [
                  _jsxs("small", { children: [balance, " AVAX"] }),
                  trxHash !== null
                    ? _jsxs("button", {
                        className: "transaction-details",
                        onClick: copyTrxLink,
                        children: "Copy transaction link",
                      })
                    : _jsx("button", {
                        className: "sign-message-button",
                        onClick: claimReward,
                        children: "Claim Reward",
                      }),
                  _jsx("button", {
                    className: "disconnect-button",
                    onClick: disconnect,
                    children: "Logout",
                  }),
                ],
              }),
            ],
          }),
    ],
  });
};
export default App;
