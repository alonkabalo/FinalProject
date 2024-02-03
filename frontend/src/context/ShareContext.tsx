import React, { useContext, useState } from "react"
import { Maybe } from "../@Types"

export type ShareData = {url:string, name:string}
export interface IShareContext {
    openShare: (shareData :ShareData) => void
    closeShare: () => void
    shareData: Maybe<ShareData> 
}


const ShareContext = React.createContext<IShareContext|null>(null)
export const ShareContextProvider = ({children} : {children: React.ReactNode}) => {

    const [shareData,setShareData] = useState<Maybe<ShareData>>()

    const openShare = (shareData:ShareData)  =>{
        setShareData(shareData)
    }
    const closeShare = () => {
        setShareData(undefined)
    }
    return <ShareContext.Provider value={{openShare,shareData,closeShare}}>
        {children}
    </ShareContext.Provider>
}

export const useShare = () => {
    const context = useContext(ShareContext)
    if(!context) {
        throw new Error("Share context not provided")
    }
    return context
}