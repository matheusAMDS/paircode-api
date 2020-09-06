import { StorageOptions } from '@google-cloud/storage'

export const BUCKET = process.env.GCLOUD_BUCKET as string

const private_key = process.env.GCLOUD_PRIVATE_KEY?.replace(new RegExp("\\\\n", "\g"), "\n")

export default {
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key
  },
  projectId: process.env.GCLOUD_PROJECT_ID
} as StorageOptions