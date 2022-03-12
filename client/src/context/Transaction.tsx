import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../util/constants';

declare const window: any;

export interface FormData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

export interface Transaction {
  id: number;
  url: string;
  message: string;
  keyword: string;
  timestamp: string;
  addressFrom: string;
  amount: string;
  addressTo: string;
}

interface ContextInterface {
  currentAccount: string;
  connectWallet: () => void;
  checkIfWalletAvailable: () => void;
  sendTransaction: () => void;
  getAllTransactions: () => void;
  formData: FormData;
  setFormData: (data: FormData | ((prevState: FormData) => FormData)) => void;
  loading: boolean;
  transactions: Transaction[];
}

export interface GifPayload {
  id: number;
  url: string;
  message: string;
  keyword: string;
  timestamp: string;
  addressFrom: string;
  amount: string;
  addressTo: string;
}

export const TransactionContext = React.createContext<ContextInterface | null>(
  null
);

const getEthereumContract = (): ethers.Contract => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const constractionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log(provider, contractABI, signer);
  return constractionContract;
};

interface TransactionProviderProps {
  children: JSX.Element;
}

export const TransactionProvider = (props: TransactionProviderProps) => {
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  });
  const [currentAccount, setCurrentAccount] = useState('');
  const [loading, setloading] = useState(false);
  const [transactionCount, settransactionCount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const checkIfWalletAvailable = async () => {
    if (!window.ethereum) return alert('Please install metamask');
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    console.log(accounts, 'debug here check account available');
    setCurrentAccount(accounts[0]);
    getAllTransactions();
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert('Please install MetaMask.');

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
      getAllTransactions();
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!window.ethereum) return alert('Please install meta mask');
      const transactionsContract = getEthereumContract();

      const availableTransactions =
        await transactionsContract.getAllTransactions();

      console.log(availableTransactions);
      const structuredTransactions = availableTransactions.map(
        (transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );
      setTransactions(structuredTransactions);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const sendTransaction = async () => {
    const { addressTo, amount, keyword, message } = formData;
    const transactionContract = getEthereumContract();
    const parsedAmount = ethers.utils.parseEther(amount);

    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAccount,
          to: addressTo,
          gas: '0x5208',
          value: parsedAmount._hex,
        },
      ],
    });
    const transactionHash = await transactionContract.addToBlockchain(
      addressTo,
      parsedAmount,
      message,
      keyword
    );
    setloading(true);
    console.log(`Loading - ${transactionHash.hash}`);
    await transactionHash.wait();
    console.log(`Success - ${transactionHash.hash}`);
    setloading(false);

    const transactionsCount = await transactionContract.getTransactionCount();
    settransactionCount(transactionsCount);
  };

  useEffect(() => {
    checkIfWalletAvailable();
  }, []);

  const contextValue: ContextInterface = {
    currentAccount,
    checkIfWalletAvailable,
    connectWallet,
    sendTransaction,
    transactions,
    getAllTransactions,
    formData,
    setFormData,
    loading,
  };
  return (
    <TransactionContext.Provider value={contextValue}>
      {props.children}
    </TransactionContext.Provider>
  );
};
