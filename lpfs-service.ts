import { create } from 'ipfs-http-client'

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET

if (!projectId || !projectSecret) {
  throw new Error('IPFS project ID or secret is not set in environment variables')
}

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

export async function uploadToIPFS(data: any) {
  try {
    const result = await client.add(JSON.stringify(data))
    return result.path
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    throw error
  }
}

export async function getFromIPFS(hash: string) {
  try {
    const stream = client.cat(hash)
    let data = ''
    for await (const chunk of stream) {
      data += new TextDecoder().decode(chunk)
    }
    return JSON.parse(data)
  } catch (error) {
    console.error('Error getting from IPFS:', error)
    throw error
  }
}