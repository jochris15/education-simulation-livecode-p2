const formatCurrency = (num) => {
    return num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

export default formatCurrency