export const GetDate = (dateIncrement:number)=>{
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
      ];
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + dateIncrement);
    const deliveryDateString = deliveryDate.getDate().toString()+" "+months[deliveryDate.getMonth()]+", "+deliveryDate.getFullYear().toString()

    return deliveryDateString
}