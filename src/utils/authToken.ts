enum KEYS {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
}

// TODO: Добавить refresh токен
const authToken = {
  get access(): string {
    return localStorage.getItem(KEYS.ACCESS_TOKEN) ?? '';
  },
  set access(token: string) {
    localStorage.setItem(KEYS.ACCESS_TOKEN, token);
  },
};

export default authToken;
