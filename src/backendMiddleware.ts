import { JolocomLib } from 'jolocom-lib'
import { IdentityWallet } from 'jolocom-lib/js/identityWallet/identityWallet'
import { EthereumLib, EthereumLibInterface } from 'src/lib/ethereum'
import { EncryptionLib, EncryptionLibInterface } from 'src/lib/crypto'
import { Storage } from 'src/lib/storage/storage'
import { KeyChain, KeyChainInterface } from 'src/lib/keychain'

import {TypeOrmConfig} from './TypeOrmConfig'
import { ConnectionOptions } from 'typeorm/browser'

// TODO Type config better
export class BackendMiddleware {
  identityWallet!: IdentityWallet
  ethereumLib: EthereumLibInterface
  storageLib: Storage
  encryptionLib: EncryptionLibInterface
  keyChainLib: KeyChainInterface


  // create type interface for typeOrm config
  constructor(config: { fuelingEndpoint: string, typeOrmConfig: TypeOrmConfig }) {
    this.ethereumLib = new EthereumLib(config.fuelingEndpoint)
    // typecasting is needed for the Storage class to avoid modifying node_modules d.ts files
    this.storageLib = new Storage(config.typeOrmConfig as ConnectionOptions),
    this.encryptionLib = new EncryptionLib(),
    this.keyChainLib = new KeyChain()
  }

  async setIdentityWallet(privKey: Buffer): Promise<void> {
    const registry = JolocomLib.registry.jolocom.create()
    this.identityWallet = await registry.authenticate(privKey)
  }
}