'use client'
import { Provider } from 'react-redux'
import { makeStore as appStore, Persistor } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { CookiesProvider } from 'react-cookie'

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode
}) {

    return <Provider store={appStore}>
        <PersistGate loading={null} persistor={Persistor}>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
            {children}
            </CookiesProvider>
        </PersistGate>
    </Provider>
}