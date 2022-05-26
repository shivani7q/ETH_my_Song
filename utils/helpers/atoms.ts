import { atom } from "recoil";

const accountAtom = atom({
  key: "accountAtom",
  default: "",
});

const loadingAtom = atom({
  key: "loading",
  default: true,
});

export { accountAtom, loadingAtom };
