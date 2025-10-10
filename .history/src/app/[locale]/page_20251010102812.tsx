import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";

type Props = { params: { locale: string } };

function getMessages(locale: string) {
  switch (locale) {
    case "en":
      return messagesEn;
    case "fr":
    default:
      return messagesFr;
  }
}

export default function LocaleHomePage({ params }: Props) {
  const messages = getMessages(params.locale);

  return (
    <main className="home-main">
      <h1 className="home-title">{messages.home.title}</h1>
      <p className="home-desc">{messages.home.description}</p>
    </main>
  );
}