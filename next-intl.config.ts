import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const currentLocale = locale && ['en', 'fr'].includes(locale) ? locale : 'fr';

  const messages = (await import(`./src/messages/${currentLocale}.json`)).default;

  return {
    locale: currentLocale,
    messages
  };
});
