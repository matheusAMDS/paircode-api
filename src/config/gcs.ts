import path from 'path'

export const BUCKET = process.env.GCLOUD_BUCKET as string

export default {
  keyFilename: path.resolve(__dirname, '..', '..', 'paircode-288519-716ad9d7ddc0.json'),
  projectId: process.env.GCLOUD_PROJECT_ID
}