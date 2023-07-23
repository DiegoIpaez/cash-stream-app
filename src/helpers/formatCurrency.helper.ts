const formatCurrency = (numberData: number) => {
  const sing = numberData < 0 && "-";
  const MILE_SEPARATOR_REGEX = /\B(?=(\d{3})+(?!\d))/g;

  const amount = Math.abs(numberData).toFixed(2);

  const mileSeparatorFormat = amount.replace(MILE_SEPARATOR_REGEX, ".");

  const signFormat = !sing
    ? mileSeparatorFormat
    : `${sing}${mileSeparatorFormat}`;
  return signFormat;
};

export default formatCurrency;
