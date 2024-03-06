'use client'

import React from 'react'

type PropType = {
    selected: boolean
    index: number
    onClick: () => void
    data: string[]
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, index, onClick, data } = props
    return (
        <div
            className={'embla-thumbs__slide'.concat(
                selected ? ' embla-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__slide__number"
            >
                <img src={data[index]} alt="" className="embla-thumbs__slide__img" />
            </button>
        </div>
    )
}
