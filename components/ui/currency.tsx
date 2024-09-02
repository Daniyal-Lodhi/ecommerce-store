import PreventHydration from "../hydration-prevention"


const formatter = new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: 'PKR'
})

const Currency = (
    { value }: { value: string | number }
) => {
    return (
        <div className="font-semibold" >
            <PreventHydration />

            {formatter.format(Number(value))}
        </div>
    )
}

export default Currency