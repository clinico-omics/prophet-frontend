export const parseJwt = token => {
  try {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  } catch (error) {
    return {};
  }
};

export const tokenExp = token => {
  if (token) {
    const parsed = parseJwt(token);
    return parsed.exp ? parsed.exp * 1000 : null;
  }
  return null;
};

export const tokenIsExpired = token => {
  const tokenExpiryTime = tokenExp(token);
  if (tokenExpiryTime) {
    return tokenExpiryTime < new Date().getTime();
  }
  return false;
};
