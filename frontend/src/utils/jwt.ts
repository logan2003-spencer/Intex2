

export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(base64);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};


// utils/jwt.ts

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  const decoded = parseJwt(token);
  if (!decoded?.exp) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp > currentTime;
};


interface DecodedToken {
  sub: string,
  name: string,
  admin: boolean,
  iat: number
}
