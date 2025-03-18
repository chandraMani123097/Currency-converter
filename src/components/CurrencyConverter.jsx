import React, { useState, useEffect } from "react";
import useCurrencyInfo from "../hooks/useCurrencyInfo";

function CurrencyConverter() {
  // State to manage input values
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch conversion rates using custom hook
  const rates = useCurrencyInfo(fromCurrency);

  // List of countries with currency codes, flag URLs, and symbols
  const countries = [
    {
      id: 1,
      name: "United States",
      code: "USD",
      flag: "https://flagcdn.com/us.svg",
      symbol: "$",
    },
    {
      id: 2,
      name: "India",
      code: "INR",
      flag: "https://flagcdn.com/in.svg",
      symbol: "₹",
    },
    {
      id: 3,
      name: "Euro",
      code: "EUR",
      flag: "https://flagcdn.com/eu.svg",
      symbol: "€",
    },
    {
      id: 4,
      name: "United Kingdom",
      code: "GBP",
      flag: "https://flagcdn.com/gb.svg",
      symbol: "£",
    },
    {
      id: 5,
      name: "Japan",
      code: "JPY",
      flag: "https://flagcdn.com/jp.svg",
      symbol: "¥",
    },
    {
      id: 6,
      name: "Canada",
      code: "CAD",
      flag: "https://flagcdn.com/ca.svg",
      symbol: "C$",
    },
    {
      id: 7,
      name: "Australia",
      code: "AUD",
      flag: "https://flagcdn.com/au.svg",
      symbol: "A$",
    },
    {
      id: 8,
      name: "Switzerland",
      code: "CHF",
      flag: "https://flagcdn.com/ch.svg",
      symbol: "CHF",
    },
    {
      id: 9,
      name: "China",
      code: "CNY",
      flag: "https://flagcdn.com/cn.svg",
      symbol: "¥",
    },
    {
      id: 10,
      name: "Singapore",
      code: "SGD",
      flag: "https://flagcdn.com/sg.svg",
      symbol: "S$",
    },
    {
      id: 11,
      name: "Brazil",
      code: "BRL",
      flag: "https://flagcdn.com/br.svg",
      symbol: "R$",
    },
    {
      id: 12,
      name: "Russia",
      code: "RUB",
      flag: "https://flagcdn.com/ru.svg",
      symbol: "₽",
    },
    {
      id: 13,
      name: "South Korea",
      code: "KRW",
      flag: "https://flagcdn.com/kr.svg",
      symbol: "₩",
    },
    {
      id: 14,
      name: "Mexico",
      code: "MXN",
      flag: "https://flagcdn.com/mx.svg",
      symbol: "MX$",
    },
    {
      id: 15,
      name: "Turkey",
      code: "TRY",
      flag: "https://flagcdn.com/tr.svg",
      symbol: "₺",
    },
  ];

  // Convert currency when rates or amount changes
  useEffect(() => {
    if (rates && rates[toCurrency]) {
      const converted = (amount * rates[toCurrency]).toFixed(2);
      setConvertedAmount(converted);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  // Get currency symbol based on selected currency
  const getSymbol = (currencyCode) => {
    const country = countries.find((country) => country.code === currencyCode);
    return country ? country.symbol : currencyCode;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          💸 Currency Converter 🌏
        </h2>

        {/* Amount Input */}
        <div className="mb-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-600"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter amount"
          />
        </div>

        {/* From Currency Dropdown */}
        <div className="mb-3">
          <label
            htmlFor="fromCurrency"
            className="block text-sm font-medium text-gray-600"
          >
            From
          </label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {countries.map((country) => (
              <option key={country.id} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>

        {/* To Currency Dropdown */}
        <div className="mb-3">
          <label
            htmlFor="toCurrency"
            className="block text-sm font-medium text-gray-600"
          >
            To
          </label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {countries.map((country) => (
              <option key={country.id} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>

        {/* Converted Amount */}
        <div className="bg-indigo-100 p-3 rounded-lg text-center shadow-inner mt-3">
          <p className="text-lg font-semibold text-indigo-700">
            {amount} {getSymbol(fromCurrency)} ={" "}
            <span className="text-green-500">
              {getSymbol(toCurrency)} {convertedAmount}
            </span>
          </p>
        </div>

        {/* Display Selected Currencies with Flags */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <img
              src={
                countries.find((country) => country.code === fromCurrency)?.flag
              }
              alt="From Flag"
              className="w-5 h-5 rounded-full"
            />
            <p className="text-xs text-gray-600">
              {countries.find((country) => country.code === fromCurrency)?.name}{" "}
              ({fromCurrency})
            </p>
          </div>
          <span className="text-xl">➡️</span>
          <div className="flex items-center space-x-2">
            <img
              src={
                countries.find((country) => country.code === toCurrency)?.flag
              }
              alt="To Flag"
              className="w-5 h-5 rounded-full"
            />
            <p className="text-xs text-gray-600">
              {countries.find((country) => country.code === toCurrency)?.name} (
              {toCurrency})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
