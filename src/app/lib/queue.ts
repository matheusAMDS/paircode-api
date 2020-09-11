import Queue from 'bull'

import jobs from '@app/jobs'
import redisConfig from '@config/redis'

interface QueueHandler {
  key: string;
  handle: (args: Queue.Job) => Promise<void>;
  bull: Queue.Queue;
}

const queues = jobs.map(job => ({
  key: job.key,
  handle: job.handle,
  bull: new Queue(job.key, { redis: redisConfig })
}))

class QueueManager {
  queues: QueueHandler[]

  constructor(queues: QueueHandler[]) {
    this.queues = queues
  }

  public async add(key: string, data: any) {
    const queue = queues.find(queue => queue.key === key)

    await queue?.bull.add(data)
  }

  public process() {
    this.queues.forEach(async queue => {
      queue.bull.process(queue.handle)

      queue.bull.on('error', error => {
        console.log(queue.key, error)
      })
    })
  }
}

export default new QueueManager(queues)