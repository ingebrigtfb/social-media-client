import { login } from "../src/js/api/auth/login.js";
import { logout } from "../src/js/api/auth/logout.js";
import { save } from "../src/js/storage/save.js";
import { remove } from "../src/js/storage/remove.js";

jest.mock("../src/js/storage/save.js", () => ({
  save: jest.fn(),
}));

jest.mock("../src/js/storage/remove.js", () => ({
  remove: jest.fn(),
}));

global.fetch = jest.fn();

describe('login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should store the token when provided with valid credentials', async () => {
    const mockProfile = { accessToken: 'mocked_token', name: 'Inge Brigt' };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    const result = await login('test@example.com', 'password123');

    expect(save).toHaveBeenCalledWith('token', 'mocked_token');
    expect(save).toHaveBeenCalledWith('profile', { name: 'Inge Brigt' });

    expect(result).toEqual({ name: 'Inge Brigt' });
  });
});

describe('logout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove token and profile from storage', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });
});