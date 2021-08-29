const formattersMixin = {
  methods: {
    toCurrency(value: number) {
      return new Intl.NumberFormat("en-JM", {
        style: "currency",
        currency: "JMD",
      }).format(value);
    },
    toPercentage(value: number) {
      return new Intl.NumberFormat("en-JM", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumSignificantDigits: 2,
      }).format(value);
    },
  },
};

export default formattersMixin;
