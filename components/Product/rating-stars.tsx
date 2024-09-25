import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React from 'react'

interface RatingStarsProps {
    stars: number
    count: number
    className?: string
}

const RatingStars: React.FC<RatingStarsProps> = ({
    stars,
    count,
    className,
}) => {
    let rating
    if(count === 0) rating = 0;
    else {
        rating = stars / count; // Calculate the average rating
    } 

    // Create an array of 5 stars
    // console.log("stars = ",stars)
    // console.log("count = ",count)
    const starElements = Array.from({ length: 5 }, (_, index) => {
        const fillColor = index < Math.round(rating) ? 'yellow' : 'gray'; // Fill stars based on the rating
        return <Star key={index} size={15} fill={fillColor} color={fillColor} />;
    });
    return (
        <div className=' flex items-center text-sm space-x-2 ' >
        <div
            className={cn(
                "flex space-x-1 ",
                className,
            )}
        >
            {starElements}
            
        </div>
        <span  >
                {rating.toFixed(1)} ({count})
            </span>
        </div>
    )
}

export default RatingStars
