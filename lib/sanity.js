import { SanityClient } from '@sanity/client'

const client = SanityClient({
  projectId: 'crpvt959',
  dataset: 'production',
  apiVersion: 'v1', // use current UTC date - see "specifying API version"!
  token: 'SANITY_TOKEN', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})
