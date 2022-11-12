import { User } from '../../users/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { hashPassword } from 'utils/BcryptService';

const isActive = [true, false];

export default setSeederFactory(User, async (faker) => {
  const user = new User();
  user.firstName = faker.name.firstName('male');
  user.lastName = faker.name.lastName('male');
  user.email = faker.internet.email(user.firstName, user.lastName);
  user.username = (user.firstName[0] + user.lastName).toLowerCase();
  user.password = await hashPassword('Password123!');
  user.isActive = isActive[Math.floor(Math.random() * isActive.length)];
  user.isAdmin = false;

  return user;
});
