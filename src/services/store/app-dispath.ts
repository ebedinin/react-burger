import { useDispatch } from "react-redux";
import type { store } from "./store.js";

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();