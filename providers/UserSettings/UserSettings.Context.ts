import { Dispatch, SetStateAction, createContext } from "react";

type PageMenu = 'overview' | 'account' | 'orders' | 'payments' | 'addresses';

export type tUserPageSettings = {
    currentMenu: PageMenu
}

interface iUserPageSettings {
    pageSettings: tUserPageSettings,
    setPageSettings: Dispatch<SetStateAction<tUserPageSettings>>
}

const initialState: tUserPageSettings = {
    currentMenu: 'overview'
}

export const UserPageSettingsContext = createContext<iUserPageSettings>({
    pageSettings: { ...initialState },
    setPageSettings: () => {}
})
