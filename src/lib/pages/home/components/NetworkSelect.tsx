import React, { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';

import { Box, Flex, Select } from "@chakra-ui/react";
// @ts-ignore
import { usePioneer } from "pioneer-react";

type BlockchainType = {
  name: string;
  chain_id: number;
  symbol: string;
};

const ALL_CHAINS = [
  { name: "ethereum", chain_id: 1, symbol: "ETH" },
  // { name: "dogechain", chain_id: 2000, symbol: "DC" },
  { name: "polygon", chain_id: 137, symbol: "MATIC" },
  { name: "pulsechain", chain_id: 369, symbol: "PLS" },
  { name: "optimism", chain_id: 10, symbol: "ETH" },
  { name: "gnosis", chain_id: 100, symbol: "xDAI" },
  { name: "binance-smart-chain", chain_id: 56, symbol: "BNB" },
  { name: "smart-bitcoin-cash", chain_id: 10000, symbol: "BCH" },
  // { name: "arbitrum", chain_id: 42161, symbol: "ARB" }, //TODO push node
  { name: "fuse", chain_id: 122, symbol: "FUSE" },
  // { name: "bittorrent", chain_id: 199, symbol: "BTT" },//TODO push node
  { name: "celo", chain_id: 42220, symbol: "CELO" },
  { name: "avalanche-c-chain", chain_id: 43114, symbol: "AVAX" },
  // { name: "görli", chain_id: 5, symbol: "GOR" },
  { name: "eos", chain_id: 59, symbol: "EOS" },
  // { name: "ethereum-classic", chain_id: 61, symbol: "ETC" }, //TODO push node
  { name: "evmos", chain_id: 9001, symbol: "EVMOS" },
  // { name: "poa-core", chain_id: 99, symbol: "POA" }, //TODO push node
];

interface NetworkSelectProps {
  setService: Dispatch<SetStateAction<string>>;
  setChainId: Dispatch<SetStateAction<number>>;
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ setService, setChainId }) => {
  const { state } = usePioneer();
  const { app, api } = state;
  const [blockchain, setBlockchain] = useState<string>("ethereum");

  const setBlockchainContext = async (selectedBlockchain: string) => {
    try {
      // eslint-disable-next-line no-console
      console.log(`Setting context for: ${selectedBlockchain}`);
      if (api) {
        const selectChainInfo = ALL_CHAINS.find(
          (chain) => chain.name === selectedBlockchain
        );

        const nodesForChainId = await api.GetEvmNode({
          chainId: selectChainInfo?.chain_id,
        });
        console.log("result: ", nodesForChainId.data.length);
        console.log("result: ", nodesForChainId.data[0]);
        //get pings for each node
        for (let i = 0; i < nodesForChainId.data.length; i++) {
          const node = nodesForChainId.data[i].service;
          console.log("node: ", node);
          setService(node);
          // @ts-ignore
          setChainId(selectChainInfo?.chain_id);
        }

        //await app.setBlockchainContext(blockchainFromPioneer);
      } else {
        console.error("API not inited! missing api");
      }
    } catch (e) {
      console.error(`Error setting blockchain context:`, e);
    }
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedBlockchain = event.target.value;
    setBlockchain(selectedBlockchain);
    setBlockchainContext(selectedBlockchain);
  };

  return (
    <Box textAlign="center">
      <Flex>
        <Select
          placeholder={`selected: ${blockchain}`}
          defaultValue="ethereum"
          onChange={handleSelect}
        >
          {ALL_CHAINS.map((blockchain) => (
            <option key={blockchain.name} value={blockchain.name}>
              {blockchain.name} ({blockchain.symbol})
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default NetworkSelect;
