import { User } from '../../auth/entity/user.entity';
import { Message } from '../entity/message.entity';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let commentService: CommentService;

  const messageRepository = {
    findMessageById: jest.fn(),
    save: jest.fn(),
  };

  const userRepository = {
    findOneBy: jest.fn(),
  };

  const commentRepository = {
    save: jest.fn(),
  };

  beforeEach(() => {
    commentService = new CommentService(
      messageRepository as any,
      userRepository as any,
      commentRepository as any,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('CommentService', () => {
    test('Throw NotFoundExceptio when user does not exist', async () => {
      const messageId = 6;
      const userId = 1;
      const comment = 'Este es el comentario';
      userRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(async () => {
        await commentService.createComment(messageId, userId, comment);
      }).rejects.toThrow(`User with id ${userId} was not found`);
    });

    test('Throw NotFoundExceptio when message does not exist', async () => {
      const messageId = 6;
      const userId = 1;
      const comment = 'Este es el comentario';
      const user = new User();
      user.id = userId;

      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(null);

      await expect(async () => {
        await commentService.createComment(messageId, userId, comment);
      }).rejects.toThrow(`The Message with id ${messageId} was not found`);
    });

    test('Throw BadRequestException when user tries to create a comment in his own message', async () => {
      const messageId = 6;
      const userId = 1;
      const comment = 'Este es el comentario';
      const user = new User();
      user.id = userId;
      const message = new Message();
      message.userId = userId;

      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(message);

      await expect(async () => {
        await commentService.createComment(messageId, userId, comment);
      }).rejects.toThrow(`You can not create a comment in your own message`);
    });

    test('Should create a comment sucessfully', async () => {
      const messageId = 6;
      const userId = 1;
      const comment = 'Este es el comentario';
      const user = new User();
      user.id = userId;
      const message = new Message();
      message.id = messageId;
      message.userId = 55;
      message.title = 'Titulo del mensaje';
      message.text = 'Texto del mensaje';

      userRepository.findOneBy.mockResolvedValueOnce(user);
      messageRepository.findMessageById.mockResolvedValueOnce(message);

      await commentService.createComment(messageId, userId, comment);
      expect(commentRepository.save).toHaveBeenCalledTimes(1);
      expect(commentRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          author: userId,
          message: message,
          comment: comment,
        }),
      );
      expect(messageRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
