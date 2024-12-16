'use client'

import { HTMLAttributes, ReactNode, useState } from "react";
import { tUserPageSettings, UserPageSettingsContext } from "./UserSettings.Context";

export default function UserSettingsPageProvider({ children }: HTMLAttributes<HTMLDivElement>): ReactNode{
    const [ userPage, setUserPage ] = useState<tUserPageSettings>({
        currentMenu: 'overview'
    });

    return(
        <UserPageSettingsContext.Provider value={{ pageSettings: userPage, setPageSettings: setUserPage }}>
            { children }
        </UserPageSettingsContext.Provider>
    )
}