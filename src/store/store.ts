import { WorkType } from '@prisma/client';
import { create } from 'zustand'

type InteriorWorkListStore = {
    interiorWorkList: WorkType[],
    setInteriorWorkList: (workList: WorkType[]) => void,
}

type ExteriorWorkListStore = {
    exteriorWorkList: WorkType[],
    setExteriorWorkList: (workList: WorkType[]) => void,
}


export const useInteriorWorkListStore = create<InteriorWorkListStore>((set) => ({
    interiorWorkList: [],
    setInteriorWorkList: (workList) => set(() => ({ interiorWorkList:workList })),
}));


export const useExteriorWorkListStore = create<ExteriorWorkListStore>((set) => ({
    exteriorWorkList: [],
    setExteriorWorkList: (workList) => set(() => ({ exteriorWorkList:workList })),
}));