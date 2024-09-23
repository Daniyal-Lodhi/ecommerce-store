'use client'
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

interface RatingStarsProps {
    onChange: (starValue: number) => void;
    disabled?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({
    onChange,
    disabled,
}) => {

    const handleRating = (rate: number) => {
        onChange(rate);
    }
    return (
        <div  >
            <Rating   readonly={disabled} initialValue={1} onClick={handleRating} allowFraction={false} />
        </div>
    )
}

export default RatingStars;