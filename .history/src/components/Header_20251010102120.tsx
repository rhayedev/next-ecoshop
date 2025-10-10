import Header from "@/components/Header";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";

export default function LocaleLayout({ children, params }) {
  const messages = params.locale === "en" ? messagesEn : messagesFr;

  return (
    <>
      <Header locale={params.locale} messages={messages} />
      {children}
    </>
  );
}