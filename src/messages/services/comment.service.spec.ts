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
  });
});
