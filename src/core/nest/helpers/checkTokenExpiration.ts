/**
 *
 * @param exp - token exp in unix timestamp format
 * @description check expiration of token
 */
export const isTokenTokenExpired = async (exp: number): Promise<boolean> => {
  const now = Math.floor(Date.now() / 1000)
  
  if (exp > now) {
    return false;
  } else {
    return true;
  }
};
