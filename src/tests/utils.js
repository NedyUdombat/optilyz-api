import { deleteUsers } from './test-utils';

export const utilityTests = () => {
  describe('Utility Functions Unit Tests', () => {
    it('should return an object showing that all users have been deleted', async () => {
      const response = await deleteUsers();

      expect(response.ok).toBe(1);
    });
  });
};
