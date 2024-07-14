import { SIWEMessage } from "@/lib/siwe";
import { appURL } from "@/lib/utils";
import Privy, { InMemoryCache } from "@privy-io/js-sdk-core";
import { NextRequest, NextResponse } from "next/server";
import { baseSepolia } from "viem/chains";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { address } = body;
  const privy = new Privy({
    appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
    storage: new InMemoryCache(),
  });

  const chainId = `eip155:${baseSepolia.id}`;

  const nonceRes = await privy.auth.siwe.init(
    {
      chainId,
      address,
    },
    `${appURL().replace("https://", "")}`,
    appURL()
  );
  return NextResponse.json(nonceRes);
};
