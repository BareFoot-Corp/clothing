"use client"

import { createContext, useState, ReactNode, HTMLAttributes, Dispatch, SetStateAction } from "react"
import UserSettingsPageProvider from "./UserSettings/UserSettings.Provider";
import CartProvider from "./Cart/Cart.Provider";

type tApp = {
    currentTab: 'men' | 'women' | 'kids' | string,
    showCart: boolean
}

interface iApp{
    appState: tApp;
    setAppState: Dispatch<SetStateAction<tApp>>
}

const initialState: tApp = {
    currentTab: "none",
    showCart: false
}

export const AppContext = createContext<iApp>({
    appState: {...initialState},
    setAppState: () => {}
});

export default function AppProvider({ children }: HTMLAttributes<HTMLDivElement>): ReactNode{
    const [ state, setState ] = useState<tApp>({
        ...initialState
    });

    return(
        <AppContext.Provider value={{appState: state, setAppState: setState}}>
            <UserSettingsPageProvider>
                <CartProvider>
                    { children }
                </CartProvider>
            </UserSettingsPageProvider>
        </AppContext.Provider>
    )
}