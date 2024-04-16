'use client'

import { Provider } from 'jotai'

export  function JoitaiProviders({ children }:{children: React.ReactNode}) {
    return (
        <Provider>
            {children}
        </Provider>
    )
}