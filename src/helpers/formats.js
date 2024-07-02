export const formatCurrency = (value, locale = 'es-MX', currency = 'MXN') => {
    
    let nValue = Math.round( parseFloat( value ) ) / 1000;

    return new Intl.NumberFormat(locale, {
        // style: 'currency',
        currency: currency,
        minimumFractionDigits: 0, // Asegura dos dígitos decimales
        maximumFractionDigits: 0  // Limita a dos dígitos decimales
    }).format(nValue);

}
