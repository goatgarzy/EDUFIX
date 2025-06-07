export interface AuthHeader {
  Authorization?: string;
}

export default function authHeader(): Record<string, string> {
  const userStr = localStorage.getItem('user');
  let user = null;
  
  if (userStr) {
    user = JSON.parse(userStr);
  }

  if (user && user.token) {
    // For Spring Boot back-end
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}