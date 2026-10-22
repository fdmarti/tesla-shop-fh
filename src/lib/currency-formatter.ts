export const currencyFormatter = (value: number) => {
    return value.toLocaleString('us-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
}