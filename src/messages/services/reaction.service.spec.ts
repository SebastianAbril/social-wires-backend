import { User } from '../../auth/entity/user.entity';
import { ReactionService } from './reaction.service';
import { Message } from '../entity/message.entity';

describe('ReactionService', () => {
  let reactionService: ReactionService;

  const messageRepository = {
    findMessageById: jest.fn(),
    save: jest.fn(),
  };
  const userRepository = {
    findOneBy: jest.fn(),
  };
  const reactionRepository = {
    save: jest.fn(),
  };

  beforeEach(() => {
    reactionService = new ReactionService(
      messageRepository as any,
      userRepository as any,
      reactionRepository as any,
    );
  });

  describe('Should create a Reaction', () => {
    test('Throw NotFound Exception when user id does not exist', async () => {
      const userId = 7;
      const messageId = 4;
      const reaction = 'hello';
      userRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(async () => {
        await reactionService.createReaction(messageId, userId, reaction);
      }).rejects.toThrow(`User with id ${userId} not found`);
    });

    test('Throw NotFound Exception when the meesage id does not exist', async () => {
      const userId = 7;
      const messageId = 4;
      const reaction = 'hello';

      const user = new User();

      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(null);

      await expect(async () => {
        await reactionService.createReaction(messageId, userId, reaction);
      }).rejects.toThrow(`message with id ${messageId} not found`);
    });

    test('Throw Exception when the user is trying to react to hiw own message', async () => {
      const userId = 7;
      const messageId = 4;
      const reaction = 'hello';

      const user = new User();
      user.id = userId;

      const message = new Message();
      message.userId = userId;

      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(message);

      await expect(async () => {
        await reactionService.createReaction(messageId, userId, reaction);
      }).rejects.toThrow(`you cant not react to your message`);
    });

    test('Should create a reaction sucessfully', async () => {
      const messageId = 6;
      const userId = 1;
      const reaction = 'hello';
      const user = new User();
      user.id = userId;
      const message = new Message();
      message.id = messageId;
      message.userId = 55;
      message.title = 'Titulo del mensaje';
      message.text = 'Texto del mensaje';

      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(message);

      await reactionService.createReaction(messageId, userId, reaction);
      expect(reactionRepository.save).toHaveBeenCalledTimes(1);
      expect(reactionRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          author: userId,
          message: message,
          reaction: reaction,
        }),
      );
      expect(messageRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
