import { ResponseSuccess, ResponseError } from './ApiResponses';

describe('ApiResponse', () => {
  it('should return ResponseSuccess', () => {
    expect(ResponseSuccess({ id: 1, username: 'johndoe' })).toEqual({
      success: true,
      result: { id: 1, username: 'johndoe' },
    });
  });

  it('should return ResponseError', () => {
    const error = new Error('Error !');
    error.name = 'error name';
    expect(ResponseError(error)).toEqual({
      success: false,
      name: expect.any(String),
      error: expect.any(String),
    });
  });
});
