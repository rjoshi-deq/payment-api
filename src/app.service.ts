import { Injectable, Logger } from '@nestjs/common';

import { createRaribleSdk } from '@rarible/protocol-ethereum-sdk';
const Web3 = require('web3');
import { Web3Ethereum } from '@rarible/web3-ethereum';
import {
  // isErc1155v1Collection,
  // isErc1155v2Collection,
  // isErc721v1Collection,
  // isErc721v2Collection,
  // isErc721v3Collection,
  RaribleSdk,
} from '@rarible/protocol-ethereum-sdk';
// import types from '@rarible/types';

const HDWalletProvider = require('@truffle/hdwallet-provider');

@Injectable()
export class AppService {
  private readonly logger = new Logger('BulkUploadService');
  private accounts: string[];
  private sdk: RaribleSdk;
  private provider;
  private web3;
  mnemonicPhrase =
    'flag junior fiction green advance entire impact rhythm nation next unique smoke'; // 12 word mnemonic

  constructor() {
    this.provider = new HDWalletProvider({
      mnemonic: this.mnemonicPhrase,
      providerOrUrl:
        'https://rinkeby.infura.io/v3/0e98d8955b2740e39719bd6b965be3e7',
    });
    this.web3 = new Web3(this.provider);
    this.sdk = createRaribleSdk(
      new Web3Ethereum({ web3: this.web3 }),
      'rinkeby',
    );
    global.FormData = require('form-data');
    global.window = {
      fetch: require('node-fetch'),
      dispatchEvent: () => {},
    };
    global.CustomEvent = function CustomEvent() {
      return;
    };
  }

  async buy(hash, amount) {
    const order = await this.sdk.apis.order.getOrderByHash({
      hash: hash,
    });
    switch (order.type) {
      case 'RARIBLE_V1':
        await this.sdk.order.buy({
          order,
          amount: parseInt(amount),
          originFee: 0,
        });
        break;
      case 'RARIBLE_V2':
        await this.sdk.order.buy({
          order,
          amount: parseInt(amount),
        });
        break;
    }
  }

  async mint(id: string) {
    let tokenId;
    // const accounts = await this.web3.eth.getAccounts();
    const nftCollection =
      await this.sdk.apis.nftCollection.getNftCollectionById({
        collection: id,
      });
    console.log(nftCollection);
    // if (isErc721v3Collection(nftCollection)) {
    //   const resp = await this.sdk.nft.mint({
    //     collection: nftCollection,
    //     uri: 'ipfs://ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
    //     creators: [{ account: types.toAddress(accounts[0]), value: 10000 }],
    //     royalties: [],
    //     lazy: nftCollection.isLazy,
    //   });
    //   tokenId = resp.tokenId;
    // } else if (isErc1155v2Collection(nftCollection)) {
    //   const resp = await this.sdk.nft.mint({
    //     collection: nftCollection,
    //     uri: '/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
    //     creators: [{ account: types.toAddress(accounts[0]), value: 10000 }],
    //     royalties: [],
    //     supply: 1,
    //     lazy: nftCollection.isLazy,
    //   });
    //   tokenId = resp.tokenId;
    // } else if (isErc721v2Collection(nftCollection)) {
    //   const resp = await this.sdk.nft.mint({
    //     collection: nftCollection,
    //     uri: '/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
    //     royalties: [],
    //   });
    //   tokenId = resp.tokenId;
    // } else if (isErc1155v1Collection(nftCollection)) {
    //   const resp = await this.sdk.nft.mint({
    //     collection: nftCollection,
    //     uri: '/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
    //     royalties: [],
    //     supply: 1,
    //   });
    //   tokenId = resp.tokenId;
    // } else if (isErc721v1Collection(nftCollection)) {
    //   const resp = await this.sdk.nft.mint({
    //     collection: nftCollection,
    //     uri: '/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
    //     supply: 1,
    //   });
    //   tokenId = resp.tokenId;
    // } else {
    //   tokenId = '';
    //   console.log('Wrong collection');
    // }

    if (tokenId) {
      /**
       * Get minted nft through SDK
       */
      // if (nftCollection.isLazySupported && !nftCollection.isLazy) {
      //   await retry(30, async () => {
      //     // wait when indexer aggregate an onChain nft
      //     await getTokenById(tokenId);
      //   });
      // } else {
      //   await getTokenById(tokenId);
      // }
      console.log(tokenId);
    }
    return;
  }
}
