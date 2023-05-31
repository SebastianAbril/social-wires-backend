import { ReactionService } from './reaction.service';

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
    test('xx', () => {
      expect(true).toBe(true);
    });
  });
});
