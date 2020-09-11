import "dotenv/config"
import QueueManager from '@app/lib/queue'

QueueManager.process()

console.log('Running Queues')