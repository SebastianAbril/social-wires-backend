import { User } from '../../auth/entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  const userRepository = {
    findOneByUsername: jest.fn(),
    save: jest.fn(),
  };
  const passwordService = {
    hash: jest.fn(),
  };

  beforeEach(() => {
    userService = new UserService(
      userRepository as any,
      passwordService as any,
    );
  });

  describe('Should create a User', () => {
    test('Throw Exception when username already exits', async () => {
      const username = 'jhondoe';
      const password = '123456';
      const fullname = 'Jhon Doe';
      const user = new User();
      userRepository.findOneByUsername.mockResolvedValueOnce(user);

      await expect(async () => {
        await userService.createUser(username, password, fullname);
      }).rejects.toThrow(`Username already used`);
    });

    test('Should create a User sucessfully', async () => {
      const username = 'jhondoe';
      const password = '123456';
      const fullname = 'Jhon Doe';

      userRepository.findOneByUsername.mockResolvedValueOnce(null);
      passwordService.hash.mockResolvedValueOnce('any hash value');

      await userService.createUser(username, password, fullname);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          username: username,
          password: 'any hash value',
          fullname: fullname,
        }),
      );
    });
  });
});
