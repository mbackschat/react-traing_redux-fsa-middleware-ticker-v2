export const getPrice = async (/* no param */) => {
  const result = await fetch(
    "https://api.coinbase.com/v2/prices/spot?currency=USD"
  );
  if (!result.ok) throw Error(result.statusText);
  const json = await result.json();
  // see https://developers.coinbase.com/docs/wallet/guides/price-data
  const value = json["data"]?.["amount"] as number;
  return value;
};
