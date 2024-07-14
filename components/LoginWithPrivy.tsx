"use client";
import Privy, { LocalStorage } from "@privy-io/js-sdk-core";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { baseSepolia } from "viem/chains";

export default function LoginWithPrivy() {
  const searchParams = useSearchParams();
  const signature = searchParams.get("signature");
  const message = searchParams.get("message");
  const address = searchParams.get("address");

  const privy = new Privy({
    appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
    storage: new LocalStorage(),
  });



  const { connectOrCreateWallet, authenticated, user } = usePrivy();

  useEffect(() => {
    const signInUsingParams = async () => {
      if (!signature || !message || !address) return;
      const res = await privy.auth.siwe.loginWithSiwe(
        signature as string,
        {
          address: address as string,
          chainId: `eip155:${baseSepolia.id}`,
        },
        message as string
      );
      // This redirect will trigger react-auth to automatically load the user state
      window.location.href = window.location.origin + "/";
    };
    signInUsingParams();
  }, [signature, address, message, privy.auth.siwe]);
  return (
    <>
      {!authenticated && (
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => connectOrCreateWallet()}
        >
          Login
        </button>
      )}
      {authenticated && user && (
        <p className="text-black">
          Welcome back <span className="font-bold">{user.wallet?.address}</span>
        </p>
      )}
    </>
  );
}
