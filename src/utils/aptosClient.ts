import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const network =
  process.env.NEXT_PUBLIC_APP_NETWORK === "mainnet"
    ? Network.MAINNET
    : Network.TESTNET;

const config = new AptosConfig({
  network,
});

export const aptosClient = new Aptos(config);
