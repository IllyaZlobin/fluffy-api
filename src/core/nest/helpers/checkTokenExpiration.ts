/**
 *
 * @param exp - token exp in unix timestamp format
 * @description check expiration of token
 */
export const isTokenTokenExpired = async (exp: number): Promise<boolean> => {
  const now = new Date(Date.now()).toLocaleString();
  const expiration = new Date(exp * 1000).toLocaleString();

  if (expiration < now) {
    return true;
  } else {
    return false;
  }
};
