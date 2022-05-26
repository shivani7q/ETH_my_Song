import { atom } from "recoil";

const accountAtom = atom({
  key: "accountAtom",
  default: "",
});

const loadingAtom = atom({
  key: "loading",
  default: true,
});

const byteDataAtom = atom({
  key: "byteData",
  default: ""
})

export { accountAtom, loadingAtom, byteDataAtom };
