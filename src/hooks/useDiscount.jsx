


function useDiscount(price,discount) {
    let mainPrice = price;
    let productDiscount = Math.round(discount) / 100;
    let total = mainPrice - (mainPrice * productDiscount);
    return total.toFixed(2);
}

export default useDiscount;

