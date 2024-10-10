'use client';

import React, { useState } from 'react'
import { ChevronDownIcon, Star } from 'lucide-react';
import { Separator } from '../ui/separator';

interface productCommentsProps {
    data: Rating
}

const StarElements = ({ rating }: { rating: number }) => {
    return Array.from({ length: 5 }, (_, index) => {
        const fillColor = index < Math.round(rating) ? 'yellow' : 'gray'; // Fill stars based on the rating
        return <Star key={index} size={15} fill={fillColor} color={fillColor} />;
    });
}

const ProductComments: React.FC<productCommentsProps> = ({
    data,
}) => {
    const avgRating = data.stars / data.count;
    const [showComments, setShowComments] = useState(false);


    return (
        <>
            <div>
                <Separator className='mb-4' />
                <h2 className="text-2xl  font-bold text-gray-800" >Rating & reviews</h2>
                <div className="flex items-center space-x-4 sm:mt-4 mt-1 " >
                    <div className="flex items-center space-x-2" >
                        <div className="flex items-center space-x-1" >
                            <span className="text-gray-black text-xl font-bold">{data.count}</span>
                            <span className="text-gray-500" >Reviews</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2" >
                        <div className="flex items-center space-x-1" >
                            <span className="text-black text-xl font-bold" >{avgRating?avgRating:0}</span>
                            <span className="text-gray-500" >Average rating</span>
                        </div>

                    </div>
                </div>
                {data.comments.length > 0 ? <button onClick={() => setShowComments(!showComments)} className='border-2 px-3 mt-4  py-2 rounded-md text-sm flex items-center' >
                    show reviews
                    <ChevronDownIcon className={`w-4 h-4 transform ${showComments ? 'rotate-180' : 'rotate-0'} transition`} />
                </button> :
                    <div className='border-2 w-max px-3 mt-4  py-2 rounded-md text-sm flex items-center'  >No review available</div>
                }

                <div className={`${showComments ? 'h-auto' : 'h-0'} overflow-hidden transition mb-4`}  >
                    <div className="font-bold mt-8 text-xl " >Comments</div>
                    {data.comments.map((comment, index) => (
                        comment.comment && <div key={index} className={`w-full py-5 border-b`} >
                            <div className='flex items-center gap-3' >
                                <span className=' font-bold' >
                                    {
                                        comment.commentedBy.lastIndexOf('@')==-1?comment.commentedBy:comment.commentedBy.substring(0, comment.commentedBy.lastIndexOf('@'))
                                    }
                                </span>
                                <div className=' flex items-center space-x-0' >
                                    <StarElements rating={comment.stars} />
                                </div>
                                {comment.stars}
                            </div>
                            <div>
                                {comment.comment}
                            </div>

                        </div>
                    ))
                    }
                </div>
                {!showComments && <hr className='my-7' />
                }
            </div>
        </>
    )
}

export default ProductComments
