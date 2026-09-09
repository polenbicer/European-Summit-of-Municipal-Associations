"use client";

import { useMemo, useState } from "react";
import { ArrowDown, CalendarDays, Check, Clock3, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

type Language = "en" | "tr";

const programme = {
  en: [
    ["14:00 – 14:20", "Registration & Welcome"],
    ["14:20 – 14:30", "Opening – The Common Agenda of Municipal Associations"],
    ["14:30 – 15:00", "Focused Discussion – The Distinctive Added Value of Municipal Associations"],
    ["15:00 – 15:10", "Coffee Break"],
    ["15:10 – 16:10", "Thematic Session I – The Role of Municipal Associations in Accessing Climate Finance"],
    ["16:10 – 17:10", "Thematic Session II – Bringing the Local Voice into Decision-Making"],
    ["17:10 – 17:40", "Feedback on the Position Paper and the COP31 Messages"],
    ["17:40 – 17:50", "Closing, Drafting Process and Next Steps"],
    ["17:50 – 18:30", "Networking & Cocktail Reception"],
  ],
  tr: [
    ["14.00 – 14.20", "Kayıt ve Karşılama"],
    ["14.20 – 14.30", "Açılış – Belediye Birliklerinin Ortak Gündemi"],
    ["14.30 – 15.00", "Odaklanmış Tartışma – Belediye Birliklerinin Özgün Katma Değeri"],
    ["15.00 – 15.10", "Kahve Arası"],
    ["15.10 – 16.10", "Tematik Oturum I – İklim Finansmanına Erişimde Belediye Birliklerinin Rolü"],
    ["16.10 – 17.10", "Tematik Oturum II – Yerel Sesi Karar Süreçlerine Taşımak"],
    ["17.10 – 17.40", "Pozisyon Belgesi ve COP31 Mesajlarına Yönelik Değerlendirmeler"],
    ["17.40 – 17.50", "Kapanış, Yazım Süreci ve Sonraki Adımlar"],
    ["17.50 – 18.30", "Networking ve Kokteyl"],
  ],
};

const copy = {
  en: {
    hosted: "Hosted by the Union of Municipalities of Türkiye",
    title: "European Summit of Municipal Associations",
    theme: "Municipal Associations Shaping the Common Agenda",
    date: "13 October 2026", time: "14:00–18:30",
    venue: "CEMR Meeting Room · 1st Floor", address: "Square de Meeûs 1 · 1000 Brussels",
    intro: "A focused half-day working summit bringing together national- and European-level municipal associations and institutions working in local government.",
    rsvp: "Registration", deadline: "Please respond by 10 October 2026",
    programme: "View programme", concept: "Read concept note",
    about: "About the summit",
    aboutText: "The Summit will provide a platform for exchanging experiences on the distinctive role and added value of municipal associations, identifying shared priorities and preparing a joint position paper. Particular attention will be given to municipalities’ access to climate finance and their effective participation in multilevel governance and decision-making.",
    questionLabel: "The core question",
    question: "Which functions that municipalities find difficult to undertake individually can be carried out collectively and effectively through municipal associations?",
    programmeTitle: "Programme", programmeDesc: "A participatory afternoon of focused discussion, two thematic sessions and joint reflection.", download: "Download full programme",
    conceptTitle: "Concept note", conceptDesc: "Purpose, discussion framework, working format and expected outcomes.",
    conceptSections: [
      ["About the Summit", "Local and regional governments are the primary level at which climate goals are translated into action on the ground. Yet their meaningful participation in climate governance and decision-making often remains limited, and they face common challenges in accessing finance, technical assistance and policymaking processes. Municipal associations consolidate local needs, bring them to national and international agendas, strengthen dialogue across levels of government and support municipalities’ capacity for implementation. Representing all 1,405 municipalities in Türkiye, UMT will bring together municipal associations and relevant institutions from Türkiye and across Europe in Brussels. The Summit aims to highlight their distinct added value, identify shared priorities and establish lasting channels of cooperation between Türkiye and Europe."],
      ["Key question", "Which functions that municipalities find difficult to undertake individually can be carried out collectively and effectively through municipal associations?"],
      ["Discussion framework", "The discussion will consider three areas: identifying shared needs, coordinating and building capacity, and collectively representing local governments; aggregating financial and technical assistance needs, strengthening project development capacity and facilitating engagement with financial institutions; and ensuring stronger local and regional representation through consultation, data sharing and multilevel governance."],
      ["Participation and working format", "Rather than following a conventional conference format, the Summit will provide a participatory working environment centred on dialogue and the exchange of experience. A focused discussion will be followed by two consecutive thematic sessions and a joint reflection. Approximately 30–40 organisations are expected, including municipal associations, city and regional representative offices, relevant EU institutions, city networks, financial and technical assistance organisations, elected local representatives, practitioners and policy experts."],
      ["Contributions from speakers and participants", "Speakers and participants are invited to offer brief, concrete and example-based contributions drawing on the experience of their institutions and countries. Good practices, structural barriers, potential roles for municipal associations and actionable policy recommendations will help translate the discussions into a common agenda and a strong joint position paper."],
      ["Expected outcome", "The experiences, shared challenges, priorities and proposed solutions will be synthesised by UMT and incorporated into the Joint Position Paper of Municipal Associations, which will be circulated among participating associations. It will set out actionable recommendations for strengthening participation in climate governance and highlight the role of municipal associations in supporting, representing and amplifying local government voices. The shared messages will be brought into the COP31 process and support more structured, long-term cooperation beyond it."],
    ],
    downloadConcept: "Download bilingual concept note",
    formTitle: "Confirm your attendance", formIntro: "Please complete one response per participant.",
    firstName: "First name", lastName: "Last name", organisation: "Organisation", position: "Position / title", email: "Email address",
    attendance: "Will you attend?", yes: "Yes, I will attend", no: "No, I am unable to attend",
    dietary: "Dietary requirements", accessibility: "Accessibility or other requirements", notes: "Additional note", optional: "Optional",
    privacy: "Your information will be used only to organise the Summit and communicate practical information about the event.",
    submit: "Submit response", submitting: "Submitting…", success: "Thank you. Your response has been recorded.", failure: "Your response could not be submitted. Please try again.", required: "Please complete all required fields.", footer: "Union of Municipalities of Türkiye",
  },
  tr: {
    hosted: "Türkiye Belediyeler Birliği ev sahipliğinde",
    title: "Avrupa Belediye Birlikleri Zirvesi", theme: "Ortak Gündemi Şekillendiren Belediye Birlikleri",
    date: "13 Ekim 2026", time: "14.00–18.30",
    venue: "CEMR Toplantı Salonu · 1. Kat", address: "Square de Meeûs 1 · 1000 Brüksel",
    intro: "Ulusal ve Avrupa düzeyindeki belediye birlikleri ile yerel yönetim alanında faaliyet gösteren kurumları buluşturan, odaklı bir yarım günlük çalışma zirvesi.",
    rsvp: "Kayıt", deadline: "Lütfen 10 Ekim 2026 tarihine kadar yanıtlayınız",
    programme: "Programı görüntüle", concept: "Konsept notunu oku",
    about: "Zirve hakkında",
    aboutText: "Zirve; belediye birliklerinin özgün rolü ve katma değerine ilişkin deneyimlerin paylaşılması, ortak önceliklerin belirlenmesi ve ortak bir pozisyon belgesinin hazırlanması için bir platform sunacaktır. Özellikle belediyelerin iklim finansmanına erişimi ile çok düzeyli yönetişim ve karar alma süreçlerine etkin katılımı ele alınacaktır.",
    questionLabel: "Zirvenin temel sorusu", question: "Belediyelerin tek başına gerçekleştirmekte zorlandığı hangi işlevleri belediye birlikleri ortak ve etkili biçimde yerine getirebilir?",
    programmeTitle: "Program", programmeDesc: "Odaklanmış tartışma, iki tematik oturum ve ortak değerlendirmeden oluşan katılımcı bir öğleden sonra.", download: "Programın tamamını indir",
    conceptTitle: "Konsept notu", conceptDesc: "Zirvenin amacı, tartışma çerçevesi, çalışma biçimi ve beklenen çıktıları.",
    conceptSections: [
      ["Zirve hakkında", "Yerel ve bölgesel yönetimler, iklim hedeflerinin sahada hayata geçirildiği başlıca yönetim düzeyidir. Buna karşın iklim yönetişimi ve karar alma süreçlerine anlamlı katılımları çoğu zaman sınırlı kalmakta; finansmana, teknik desteğe ve politika süreçlerine erişimde ortak güçlükler yaşamaktadır. Belediye birlikleri yerel ihtiyaçları bir araya getirerek ulusal ve uluslararası gündemlere taşır, farklı yönetim düzeyleri arasındaki diyaloğu güçlendirir ve belediyelerin uygulama kapasitesini destekler. Türkiye’deki 1.405 belediyenin tamamını temsil eden TBB, Türkiye ve Avrupa’daki belediye birlikleri ile ilgili kurumları Brüksel’de buluşturacaktır. Zirve, birliklerin özgün katma değerini görünür kılmayı, ortak öncelikleri belirlemeyi ve kalıcı iş birliği kanalları geliştirmeyi amaçlamaktadır."],
      ["Zirvenin temel sorusu", "Belediyelerin tek başına gerçekleştirmekte zorlandığı hangi işlevleri belediye birlikleri ortak ve etkili biçimde yerine getirebilir?"],
      ["Tartışma çerçevesi", "Tartışmalar üç alana odaklanacaktır: ortak ihtiyaçların belirlenmesi, belediyeler arasında koordinasyon, kapasite geliştirme ve kolektif temsil; finansman ve teknik destek ihtiyaçlarının toplulaştırılması, proje hazırlama kapasitesinin güçlendirilmesi ve finans kuruluşlarıyla ilişkilerin kolaylaştırılması; yerel ve bölgesel yönetimlerin istişare, veri paylaşımı ve çok düzeyli yönetişim yoluyla daha güçlü temsil edilmesi."],
      ["Katılım ve çalışma biçimi", "Zirve, klasik konferans formatından ziyade diyalog ve deneyim paylaşımına dayalı katılımcı bir çalışma ortamı sunacaktır. Odaklanmış tartışmayı art arda gerçekleştirilecek iki tematik oturum ve ortak değerlendirme izleyecektir. Yaklaşık 30–40 kurumun katılması beklenmekte; belediye birlikleri, şehir ve bölge temsilcilikleri, ilgili AB kurumları, şehir ağları, finansman ve teknik destek kuruluşları, seçilmiş yerel yöneticiler, uygulayıcılar ve politika uzmanları bir araya getirilmektedir."],
      ["Konuşmacı ve katılımcıların katkısı", "Konuşmacı ve katılımcılardan kurum ve ülke deneyimlerinden hareketle kısa, somut ve örnek odaklı katkılar sunmaları beklenmektedir. İyi uygulamaların yanı sıra yapısal engellerin, belediye birliklerinin üstlenebileceği rollerin ve uygulanabilir politika önerilerinin paylaşılması, tartışmaların ortak bir gündeme ve güçlü bir pozisyon belgesine dönüşmesine katkı sağlayacaktır."],
      ["Beklenen çıktı", "Zirvede paylaşılan deneyimler, ortak sorunlar, öncelikler ve çözüm önerileri TBB tarafından sentezlenerek Belediye Birlikleri Ortak Pozisyon Belgesi’ne yansıtılacak ve katılımcı birliklerin değerlendirmesine açılacaktır. Belge, iklim yönetişimi ve iklimle ilgili karar süreçlerine katılımı güçlendiren uygulanabilir öneriler sunacak; belediye birliklerinin yerel yönetimleri destekleme, temsil etme ve seslerini güçlendirme rolünü ortaya koyacaktır. Ortak mesajlar COP31 sürecine taşınacak ve COP31 sonrasında daha yapısal ve uzun vadeli iş birliğini destekleyecektir."],
    ],
    downloadConcept: "İki dilli konsept notunu indir",
    formTitle: "Katılımınızı bildirin", formIntro: "Lütfen her katılımcı için ayrı bir yanıt gönderiniz.",
    firstName: "Ad", lastName: "Soyad", organisation: "Kurum", position: "Görev / unvan", email: "E-posta adresi",
    attendance: "Zirveye katılacak mısınız?", yes: "Evet, katılacağım", no: "Hayır, katılamayacağım",
    dietary: "Beslenme gereksinimleri", accessibility: "Erişilebilirlik veya diğer ihtiyaçlar", notes: "Ek not", optional: "İsteğe bağlı",
    privacy: "Bilgileriniz yalnızca Zirve organizasyonu ve etkinliğe ilişkin pratik iletişim amacıyla kullanılacaktır.",
    submit: "Yanıtı gönder", submitting: "Gönderiliyor…", success: "Teşekkür ederiz. Yanıtınız kaydedildi.", failure: "Yanıtınız gönderilemedi. Lütfen tekrar deneyin.", required: "Lütfen zorunlu alanların tamamını doldurun.", footer: "Türkiye Belediyeler Birliği",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [attendance, setAttendance] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "required">("idle");
  const t = copy[language];
  const logo = language === "en" ? "/logo-umt-en.jpeg" : "/logo-tbb-tr.jpeg";
  const programmeUrl = language === "en" ? "/documents/program-en.pdf" : "/documents/program-tr.pdf";
  const rows = useMemo(() => programme[language], [language]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || !attendance) { form.reportValidity(); setStatus("required"); return; }
    setStatus("loading");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/rsvp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, attendance, language }) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success"); form.reset(); setAttendance("");
    } catch { setStatus("error"); }
  }

  return <main>
    <header className="site-header">
      <a href="#top" className="brand" aria-label={t.footer}><img src={logo} alt={t.footer} /></a>
      <Button asChild className="header-registration"><a href="#rsvp">{t.rsvp}<ArrowDown /></a></Button>
      <nav aria-label="Language selection" className="language-switch">
        <button className={language === "tr" ? "active" : ""} onClick={() => setLanguage("tr")}>TR</button><span aria-hidden="true">/</span><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
      </nav>
    </header>

    <section id="top" className="hero">
      <div className="eyebrow">{t.hosted}</div><h1>{t.title}</h1><p className="theme">{t.theme}</p>
      <div className="event-facts">
        <div><CalendarDays aria-hidden="true" /><span>{t.date}</span></div><div><Clock3 aria-hidden="true" /><span>{t.time}</span></div>
        <a href="https://maps.google.com/?q=Square+de+Meeus+1+1000+Brussels" target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span>{t.venue}<small>{t.address}</small></span></a>
      </div>
      <p className="hero-intro">{t.intro}</p>
      <div className="hero-actions"><Button asChild className="primary-action"><a href="#rsvp">{t.rsvp}<ArrowDown /></a></Button><p>{t.deadline}</p></div>
      <div className="document-actions"><ProgrammeDialog title={t.programmeTitle} description={t.programmeDesc} rows={rows} download={t.download} url={programmeUrl} trigger={t.programme} /><ConceptDialog title={t.conceptTitle} description={t.conceptDesc} sections={t.conceptSections} download={t.downloadConcept} trigger={t.concept} /></div>
    </section>

    <section className="about-section">
      <div className="section-number">01</div><div><p className="section-kicker">{t.about}</p><p className="about-copy">{t.aboutText}</p></div>
      <blockquote><span>{t.questionLabel}</span>“{t.question}”</blockquote>
    </section>

    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-intro"><div className="section-number">02</div><p className="section-kicker">{t.rsvp}</p><h2>{t.formTitle}</h2><p>{t.formIntro}</p><p className="deadline-note">{t.deadline}</p></div>
      <form onSubmit={submit} className="rsvp-form">
        <div className="field-grid"><Field label={t.firstName} name="firstName" required /><Field label={t.lastName} name="lastName" required /></div>
        <Field label={t.organisation} name="organisation" required /><Field label={t.position} name="position" required /><Field label={t.email} name="email" type="email" required />
        <fieldset><legend>{t.attendance}<span>*</span></legend><RadioGroup value={attendance} onValueChange={setAttendance} className="attendance-options"><Label className="radio-card"><RadioGroupItem value="attending" /><span>{t.yes}</span></Label><Label className="radio-card"><RadioGroupItem value="not_attending" /><span>{t.no}</span></Label></RadioGroup></fieldset>
        {attendance === "attending" && <div className="conditional-fields"><Field label={`${t.dietary} · ${t.optional}`} name="dietary" /><Field label={`${t.accessibility} · ${t.optional}`} name="accessibility" /></div>}
        <div className="field-wrap"><Label htmlFor="notes">{t.notes} · <span>{t.optional}</span></Label><Textarea id="notes" name="notes" rows={4} /></div>
        <p className="privacy">{t.privacy}</p><Button type="submit" disabled={status === "loading"} className="submit-button">{status === "loading" ? t.submitting : t.submit}</Button>
        <div aria-live="polite" className={`form-status ${status}`}>{status === "success" && <><Check />{t.success}</>}{status === "error" && t.failure}{status === "required" && t.required}</div>
      </form>
    </section>
    <footer><img src={logo} alt="" /><p>{t.footer}<br /><span>13 October / Ekim 2026 · Brussels / Brüksel</span></p></footer>
  </main>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <div className="field-wrap"><Label htmlFor={name}>{label}{required && <span> *</span>}</Label><Input id={name} name={name} type={type} required={required} /></div>;
}

function ProgrammeDialog({ title, description, rows, download, url, trigger }: { title: string; description: string; rows: string[][]; download: string; url: string; trigger: string }) {
  return <Dialog><DialogTrigger asChild><Button variant="outline" className="doc-button">{trigger}</Button></DialogTrigger><DialogContent className="document-dialog"><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><div className="programme-list">{rows.map(([time, item]) => <div key={time}><time>{time}</time><p>{item}</p></div>)}</div><Button asChild variant="outline"><a href={url} download><Download />{download}</a></Button></DialogContent></Dialog>;
}

function ConceptDialog({ title, description, sections, download, trigger }: { title: string; description: string; sections: string[][]; download: string; trigger: string }) {
  return <Dialog><DialogTrigger asChild><Button variant="outline" className="doc-button">{trigger}</Button></DialogTrigger><DialogContent className="document-dialog concept-dialog"><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><div className="concept-copy">{sections.map(([heading, text]) => <section key={heading}><h3>{heading}</h3><p>{text}</p></section>)}</div><Button asChild variant="outline"><a href="/documents/concept-note-bilingual.pdf" download><Download />{download}</a></Button></DialogContent></Dialog>;
}
