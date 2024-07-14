import { appURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { signedMessage, messageToSign, address } = body;
  const redirectUrl = new URL(appURL());
  redirectUrl.searchParams.append("signature", signedMessage as string);
  redirectUrl.searchParams.append("message", messageToSign as string);
  redirectUrl.searchParams.append("address", address as string);
  return NextResponse.json({
    url: redirectUrl,
  });
};
