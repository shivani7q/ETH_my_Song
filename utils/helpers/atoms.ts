import { atom } from "recoil";

const accountAtom = atom<string | undefined>({
  key: "accountAtom",
  default: undefined,
});

const loadingAtom = atom<boolean>({
  key: "loading",
  default: true,
});

const byteDataAtom = atom<string | undefined>({
  key: "byteData",
  default: undefined,
});

export { accountAtom, loadingAtom, byteDataAtom };
