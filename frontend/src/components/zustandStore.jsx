import React from "react";
import { create } from "zustand";

export const useScrollStore = create((set) => ({
  targetRef: null,
  setTargetRef: (ref) => set({ targetRef: ref }),
}));
