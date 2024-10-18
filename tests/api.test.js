import { login } from "../src/js/api/auth/login.js";
import { logout } from "../src/js/api/auth/logout.js";

describe("Login and Logout Tests", () => {
  const email = "user@example.com";
  const password = "password123";
  const mockAccessToken = "mockUserToken";

  const mockProfile = {
    accessToken: mockAccessToken,
    name: "Inge Brigt",
    email: "ingeBrigt@example.com",
  };

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProfile),
    });

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("should store the token in localStorage when provided valid credentials", async () => {
    await login(email, password);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify(mockAccessToken),
    );
  });

  it("should clear the token from browser storage after logout", async () => {
    await login(email, password);
    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });
});
