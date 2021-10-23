import React from "react"

import icons from "@icons/iconsMap"
import { DEFAULT_ICON_VIEWBOX } from "@utils/constants"


const Icon = ({ name, className, size, viewBox }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width={size}
            height={size}
            viewBox={viewBox || DEFAULT_ICON_VIEWBOX}
        >
            {icons[name]}
        </svg>
    )
}

export default Icon
