import { clusterApiUrl, PublicKey } from '@solana/web3.js'
import programs from './programs.json'

export const CLUSTER = 'devnet'
export const SOLANA_HOST = 'https://api.devnet.solana.com/'

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
  '6gJjDRBJZHEgxB7Wzk4dHQJwwy9XoMdKiAnEBxxgG71L'
)

export const STABLE_POOL_IDL = programs
