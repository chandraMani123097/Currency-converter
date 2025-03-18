import { useEffect, useState } from "react";

// API URL: https://v6.exchangerate-api.com/v6/87ca92a700fb560b61a85eeb/latest/USD

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/87ca92a700fb560b61a85eeb/latest/${currency}`
    )
      .then((res) => res.json())
      .then((res) => setData(res.conversion_rates))
      .catch((err) => console.error("Error fetching data: ", err));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
