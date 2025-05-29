export function FormatCurrency(number: Number) {
  const CURRENCy_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency'
  })
  return CURRENCy_FORMATTER.format(number)
}