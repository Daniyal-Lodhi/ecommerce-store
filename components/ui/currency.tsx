import preventHydration from "../hydration-prevention"


const formatter = new Intl.NumberFormat("en-Us",{
    style:"currency",
    currency:'PKR'
})

const Currency = (
    {value}:{value:string|number}
)=>{
    preventHydration() ;
    return (
        <div className="font-semibold" >
            {formatter.format(Number(value))}
        </div>
    )
}

export default Currency