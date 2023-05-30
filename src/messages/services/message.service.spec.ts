import { User } from '../../auth/entity/user.entity';
import { Message } from '../entity/message.entity';
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

  describe('Should get a message by its id', () => {
    test('throw NotFound Exception when messsage id does not exist', async () => {
      const messageId = 10;
      messageRepository.findMessageById.mockResolvedValueOnce(null);

      await expect(async () => {
        await messageService.getMessageById(messageId);
      }).rejects.toThrow(`Message with id ${messageId} was not found`);
    });

    test('should get a message by its id sucessfully', async () => {
      const messageId = 10;
      const message = new Message();
      message.id = messageId;
      messageRepository.findMessageById.mockResolvedValueOnce(message);

      await messageService.getMessageById(messageId);
      expect(messageRepository.findMessageById).toHaveBeenCalledTimes(1);
    });
  });

  describe('Should delete a message by its id', () => {
    test('Throw NotFound Exception when user id does not exist', async () => {
      const userId = 7;
      const messageId = 4;
      userRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(async () => {
        await messageService.deleteMessageById(messageId, userId);
      }).rejects.toThrow(`The user with id ${userId} was not found`);
    });

    test('Throw NotFound Exception when message id does not exist', async () => {
      const userId = 7;
      const messageId = 4;
      const user = new User();
      user.id = userId;
      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(null);

      await expect(async () => {
        await messageService.deleteMessageById(messageId, user.id);
      }).rejects.toThrow(
        `Message with id ${messageId} could not be deleted, it was not found`,
      );
    });

    test("Throw BadRequest Exception when a user tries to delete other user's comments", async () => {
      const userId = 7;
      const messageId = 4;
      const user = new User();
      user.id = userId;
      const message = new Message();
      message.id = messageId;
      message.userId = 44;

      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(message);

      await expect(async () => {
        await messageService.deleteMessageById(message.id, user.id);
      }).rejects.toThrow(`You can not delete other person's comments`);
    });

    test('Should delete a message sucessfully', async () => {
      const userId = 7;
      const messageId = 17;
      const user = new User();
      const message = new Message();

      user.id = userId;
      message.id = messageId;
      message.userId = userId;
      message.title = 'Buenos dias';
      message.text = 'Mensaje se acaba de borrar';

      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(message);

      await messageService.deleteMessageById(message.id, user.id);
      expect(messageRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
