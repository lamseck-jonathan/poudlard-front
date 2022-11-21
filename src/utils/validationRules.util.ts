/**
 * @desc check if value is given
 */
export const required = (val: unknown): boolean | string =>
  !!val || 'Champ requis';

/**
 * @desc check if email is valid
 */
export const isValidEmail = (val: string): boolean | string =>
  !val ||
  (val &&
    /^[\w!#$%&'*+\/=?`{|}~^-]+(?:\.[\w!#$%&'*+\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/.test(
      val
    )) ||
  'Adresse email invalide';
