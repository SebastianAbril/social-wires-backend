import { User } from '../../auth/entity/user.entity';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;
  const messageRepository = {
    save: jest.fn(),
    findAllMessages: jest.fn(),
    findMessagesByUser: jest.fn(),
    findMessageById: jest.fn(),
    remove: jest.fn(),
  };

  const userRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(() => {
    messageService = new MessageService(
      messageRepository as any,
      userRepository as any,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create message', () => {
    test('throw not found exception when user does not exists', async () => {
      const userId = 1;
      const title = 'Este es el mensaje';
      const content = 'bla bla bla, y entonces bla';

      userRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(async () => {
        await messageService.createMessage(userId, title, content);
      }).rejects.toThrow(`User with id ${userId} not found`);
    });

    test('should create a message', async () => {
      const userId = 10;
      const title = 'Este es el mensaje';
      const content = 'bla bla bla, y entonces bla';
      const user = new User();
      user.id = userId;

      userRepository.findOneBy.mockResolvedValueOnce(user);

      await messageService.createMessage(userId, title, content);
      expect(messageRepository.save).toHaveBeenCalledTimes(1);
      expect(messageRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: userId,
          title: title,
          text: content,
        }),
      );
    });
  });

  describe('Shoud get all the messages', () => {
    test('Get all the messages sucessfully', async () => {
      await messageRepository.findAllMessages();
      expect(messageRepository.findAllMessages).toHaveBeenCalledTimes(1);
    });
  });

  describe('Should get all the messages by User', () => {
    test('Throw not found exception when user does not exist', async () => {
      const userId = 5;
      userRepository.findOneBy.mockResolvedValueOnce(undefined);

      await expect(async () => {
        await messageService.getMessagesByUser(userId);
      }).rejects.toThrow(`User with id ${userId} was not found`);
    });

    test('Get messages by the user sucessfully', async () => {
      const userId = 5;
      const user = new User();
      user.id = userId;
      userRepository.findOneBy.mockResolvedValueOnce(user);

      await messageService.getMessagesByUser(userId);
      expect(messageRepository.findMessagesByUser).toHaveBeenCalledTimes(1);
    });
  });
});
