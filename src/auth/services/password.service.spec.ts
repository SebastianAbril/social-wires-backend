import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(() => {
    passwordService = new PasswordService();
  });

  test('should hash a password', async () => {
    const hash = await passwordService.hash('123456');
    expect(hash).not.toBeNull();
  });

  test('should compare a passwords', async () => {
    const originalPassword = '123456';
    const hash = await passwordService.hash(originalPassword);
    const isEqual = await passwordService.compare(originalPassword, hash);

    expect(isEqual).toBeTruthy();
  });

  test('should compare a passwords', async () => {
    const originalPassword = '123456';
    const hash = await passwordService.hash(originalPassword);
    const isEqual = await passwordService.compare('54321', hash);

    expect(isEqual).toBeFalsy();
  });
});
