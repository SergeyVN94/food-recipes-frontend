import { User } from 'types/user';
import ApiDataService from './common/ApiDataService';

class UserService extends ApiDataService<User> {
  constructor() {
    super({ apiUrl: '/api/v1/user' });
  }
}

export default UserService;
