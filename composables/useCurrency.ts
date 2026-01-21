import { useLocaleStore } from '~/stores/locale';

export const useCurrency = () => {
  const localeStore = useLocaleStore();

  const formatPrice = (priceUSD: number, showSymbol: boolean = true): string => {
    return localeStore.formatPrice(priceUSD, showSymbol);
  };

  const convertPrice = (priceUSD: number): number => {
    return localeStore.convertPrice(priceUSD);
  };

  return {
    formatPrice,
    convertPrice,
    currencySymbol: computed(() => localeStore.currencySymbol),
    currentCurrency: computed(() => localeStore.currentCurrency),
  };
};
