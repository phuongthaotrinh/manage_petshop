
import Zoom from "react-medium-image-zoom"

import "react-medium-image-zoom/dist/styles.css"
import {useMounted} from "@/hooks/use-mounted";
import React from "react";

export function MediumZoom({ children }: { children:any }) {
    const mounted = useMounted()
    return (
       <>
           {mounted && <Zoom zoomMargin={80} classDialog="zoom-image">
               {children}
           </Zoom>}

       </>
    )
}
