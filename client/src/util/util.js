import { useLocalStorage } from "@uidotdev/usehooks"

const useUserStorage = () => {
  return useLocalStorage("user", null);
};

export {useUserStorage};