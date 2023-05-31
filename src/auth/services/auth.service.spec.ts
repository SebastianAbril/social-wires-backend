import { User } from '../../auth/entity/user.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  const userRepository = {
    findOneByUsername: jest.fn(),
    save: jest.fn(),
  };

  const jwtService = {
    signAsync: jest.fn(),
  };
  const passwordService = {
    compare: jest.fn(),
  };

  beforeEach(() => {
    authService = new AuthService(
      userRepository as any,
      jwtService as any,
      passwordService as any,
    );
  });

  describe('Should create a User', () => {
    test('Throw Exception when username already exits', async () => {
      const username = 'jhondoe';
      const password = '123456';

      userRepository.findOneByUsername.mockResolvedValueOnce(null);

      await expect(async () => {
        await authService.signIn(username, password);
      }).rejects.toThrow(`The user or password is not valid`);
    });

    test('Throw Exception when username already exits', async () => {
      const username = 'jhondoe';
      const password = '123456';
      const user = new User();

      userRepository.findOneByUsername.mockResolvedValueOnce(user);
      passwordService.compare.mockResolvedValueOnce(false);

      await expect(async () => {
        await authService.signIn(username, password);
      }).rejects.toThrow(`The user or password is not valid`);
    });

    test('Should make  a signIn sucessfully', async () => {
      const username = 'jhondoe';
      const password = '123456';
      const user = new User();
      user.id = 2;
      user.username = username;

      userRepository.findOneByUsername.mockResolvedValueOnce(user);
      passwordService.compare.mockResolvedValueOnce(true);

      await authService.signIn(username, password);
      expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          username: username,
          userId: user.id,
        }),
      );
    });
  });
});
