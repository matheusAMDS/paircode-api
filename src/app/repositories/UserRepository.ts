import { 
  EntityRepository, 
  Repository, 
  FindConditions, 
  FindOneOptions 
} from 'typeorm'

import User from '@app/models/User'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public findOneWithPassword(
    query: FindConditions<User | undefined>, 
    options?: FindOneOptions<User | undefined>
  ) {
    return this.findOne(query, { 
      ...options,
      select: [ 
        'avatar', 'bio', 'whatsapp', 'email', 'firstName', 'lastName', 'id', 'passwordHash' 
      ]
    })
  }
}