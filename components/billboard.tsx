
interface billboardProps {
    data: Billboard
}


const Billboard: React.FC<billboardProps> = ({
    data
}) => {





    return (
        <div className="p-4 sm:p-6 lg:p-8 overflow-hidden bg-cover " >
            <div className="rounded-xl relative aspect-square md:aspect-[3/1] overflow-hidden bg-cover"
                style={{ backgroundImage: `url(${data?.imageUrl})` }}
            >
                <div className="flex flex-col gap-y-8 justify-center items-center h-full w-full text-center" >
                    <div className="text-3xl sm:text-5xl lg:text-6xl font-bold sm:max-w-xl max-w-xs " >
                        {data?.label}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Billboard