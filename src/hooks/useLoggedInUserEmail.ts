import { useLoggedInUser } from './useLoggedInUser';

export const useLoggedInUserEmail = (): string => {
  const user = useLoggedInUser();
  if (!user.email) {
    throw new Error('Unreachable: Email does not exist');
  }
  return user.email;
};
