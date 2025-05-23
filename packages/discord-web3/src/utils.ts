import assert from "assert";
import * as viem from "viem";
import * as chains from "viem/chains";
export function getId(): string {
  return Math.random().toString(36).substring(2, 9);
}
export function encodeKey(
  arr: (string | number)[],
  delimiter: string = "!",
): string {
  return arr.join(delimiter);
}

export function decodeKey(key: string, delimiter: string = "!"): string[] {
  return key.split(delimiter);
}
export const Chains = [
  { chainId: 1, name: "Ethereum Mainnet", currency: "ETH" },
  // { chainId: 3, name: "Ropsten Testnet", currency: "ETH" },
  // { chainId: 4, name: "Rinkeby Testnet", currency: "ETH" },
  // { chainId: 5, name: "Goerli Testnet", currency: "ETH" },
  // { chainId: 42, name: "Kovan Testnet", currency: "ETH" },
  // { chainId: 56, name: "Binance Smart Chain Mainnet", currency: "BNB" },
  // { chainId: 97, name: "Binance Smart Chain Testnet", currency: "BNB" },
  { chainId: 137, name: "Polygon Mainnet", currency: "MATIC" },
  // { chainId: 80001, name: "Mumbai Testnet", currency: "MATIC" },
  // { chainId: 43114, name: "Avalanche Mainnet", currency: "AVAX" },
  // { chainId: 43113, name: "Avalanche Fuji Testnet", currency: "AVAX" },
  // { chainId: 250, name: "Fantom Opera", currency: "FTM" },
  // { chainId: 4002, name: "Fantom Testnet", currency: "FTM" },
  { chainId: 42161, name: "Arbitrum One", currency: "ETH" },
  // { chainId: 421611, name: "Arbitrum Rinkeby", currency: "ETH" },
  { chainId: 10, name: "Optimism", currency: "ETH" },
  // { chainId: 69, name: "Optimism Kovan", currency: "ETH" },
  // { chainId: 100, name: "xDai Chain", currency: "xDAI" },
  // { chainId: 77, name: "POA Network Sokol", currency: "POA" },
  // { chainId: 99, name: "POA Network Core", currency: "POA" },
  // { chainId: 1666600000, name: "Harmony Mainnet Shard 0", currency: "ONE" },
  // { chainId: 1666700000, name: "Harmony Testnet Shard 0", currency: "ONE" },
  // { chainId: 128, name: "Huobi ECO Chain Mainnet", currency: "HT" },
  // { chainId: 256, name: "Huobi ECO Chain Testnet", currency: "HT" },
  // { chainId: 25, name: "Cronos Mainnet", currency: "CRO" },
  // { chainId: 338, name: "Cronos Testnet", currency: "CRO" },
  // { chainId: 1284, name: "Moonbeam", currency: "GLMR" },
  // { chainId: 1285, name: "Moonriver", currency: "MOVR" },
  // { chainId: 1287, name: "Moonbase Alpha", currency: "DEV" },
  // { chainId: 1663, name: "Metis Andromeda", currency: "METIS" },
  // { chainId: 1088, name: "Metis Stardust", currency: "METIS" },
  { chainId: 8453, name: "Base Mainnet", currency: "ETH" },
  // { chainId: 84531, name: "Base Goerli Testnet", currency: "ETH" },
];

export function mapChainsById(): Record<
  number,
  { name: string; currency: string }
> {
  return Chains.reduce(
    (acc, { chainId, name, currency }) => {
      acc[chainId] = { name, currency };
      return acc;
    },
    {} as Record<number, { name: string; currency: string }>,
  );
}

export const ChainsById = mapChainsById();

export type RpcParams = {
  id: string | undefined;
  ip: string | undefined;
  token: string | undefined;
  params: unknown;
  method: string;
};
export type RpcFunction = (params: RpcParams) => Promise<unknown | void>;

export function RpcFactory(
  api: Record<
    string,
    (...args: unknown[]) => Promise<JSON | void> | JSON | void
  >,
): RpcFunction {
  return async (params: RpcParams) => {
    const method = api[params.method];
    assert(method, "No method by that name");
    return method(params.params);
  };
}


export function getViemChain(chainId: number): viem.Chain{
  const chain = Object.values(chains).find((chain) => chain.id === chainId);
  if (!chain) {
    throw new Error(`Chain ${chainId} not found`)
  }
  return chain
}