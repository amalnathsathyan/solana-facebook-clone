import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { Programs } from '../target/types/programs'

const { TOKEN_PROGRAM_ID } = require('@solana/spl-token')
const _ = require('lodash')
const { web3 } = anchor
const { SystemProgram } = web3
const assert = require('assert')
const utf8 = anchor.utils.bytes.utf8
const provider = anchor.Provider.local()

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
  // rent: anchor.web3.SYSVAR_RENT_PUBKEY,
}
// Configure the client to use the local cluster.
anchor.setProvider(provider)
const program = anchor.workspace.Programs as Program<Programs>
let creatorKey = provider.wallet.publicKey
let stateSigner

describe('programs', () => {
  it('Create State', async () => {
    ;[stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('state')],
      program.programId
    )

    try {
      const stateInfo = await program.account.stateAccount.fetch(stateSigner)
    } catch {
      await program.rpc.createState({
        accounts: {
          state: stateSigner,
          authority: creatorKey,
          ...defaultAccounts,
        },
      })

      const stateInfo = await program.account.stateAccount.fetch(stateSigner)
      assert(
        stateInfo.authority.toString() === creatorKey.toString(),
        'State Creator is Invalid'
      )
    }
  })
})
