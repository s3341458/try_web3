import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';

const companyCommonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Welcome = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
          Send Crypto <br /> across the world
        </h1>
      </div>
      {true && (
        <button
          type="button"
          onClick={() => {
            console.log('debug here ');
          }}
          className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          <AiFillPlayCircle className="text-white mr-2" />
          <p className="text-white text-base font-semibold">Connect Wallet</p>
        </button>
      )}

      <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
        <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
          Reliability
        </div>
        <div className={companyCommonStyles}>Security</div>
        <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
          Ethereum
        </div>
        <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
          Web 3.0
        </div>
        <div className={companyCommonStyles}>Low Fees</div>
        <div className={`rounded-br-2xl ${companyCommonStyles}`}>
          Blockchain
        </div>
      </div>
    </div>
  );
};

export default Welcome;
