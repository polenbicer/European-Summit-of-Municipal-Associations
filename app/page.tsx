"use client";

import { useState } from "react";
import { ArrowDown, CalendarDays, Check, Clock3, Download, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

type Language = "en" | "tr";

const copy = {
  en: {
    hosted: "Hosted by the Union of Municipalities of Türkiye",
    title: "European Summit of Associations of Local and Regional Authorities",
    theme: "Associations of Local and Regional Authorities Shaping the Global Agenda",
    date: "13 October 2026", time: "14:00–18:10",
    venue: "CEMR Meeting Room · 1st Floor", address: "Square de Meeûs 1 · 1000 Brussels",
    intro: "A focused half-day working summit bringing together associations of local and regional authorities and relevant institutions from Türkiye and across Europe.",
    rsvp: "Registration", deadline: "Please respond by 10 October 2026",
    programme: "View programme", concept: "Read concept note",
    about: "About the summit",
    aboutText: "The Summit will provide a platform for exchanging experiences on the distinctive role and added value of associations of local and regional authorities, identifying shared priorities and preparing a joint position paper. Particular attention will be given to municipalities’ effective participation in climate governance and multilevel decision-making, coordination across levels of government and accountability. Access to green finance and technical assistance will be considered as an enabling dimension of stronger local implementation.",
    questionLabel: "The core question",
    question: "Which functions that local governments find difficult to undertake individually can be carried out collectively and effectively through associations of local and regional authorities?",
    programmeTitle: "Programme", programmeDesc: "A participatory afternoon focused on climate governance, implementation capacity, the financing dimension and bringing the local voice into COP31 decision-making.", download: "Download draft programme", open: "Open PDF",
    conceptTitle: "Concept note", conceptDesc: "Purpose, discussion framework, working format and expected outcomes.",
    conceptSections: [
      ["About the Summit", "Local and regional governments are the primary level at which climate goals are translated into action on the ground. Yet their meaningful participation in climate governance and decision-making often remains limited, and they face common challenges in accessing finance, technical assistance and policymaking processes. Municipal associations consolidate local needs, bring them to national and international agendas, strengthen dialogue across levels of government and support municipalities’ capacity for implementation. Representing all 1,405 municipalities in Türkiye, UMT will bring together municipal associations and relevant institutions from Türkiye and across Europe in Brussels. The Summit aims to highlight their distinct added value, identify shared priorities and establish lasting channels of cooperation between Türkiye and Europe."],
      ["Key question", "Which functions that local governments find difficult to undertake individually can be carried out collectively and effectively through associations of local and regional authorities?"],
      ["Discussion framework", "The discussion will consider the distinct added value of associations of local and regional authorities; climate governance and implementation capacity, including municipalities’ effective participation, coordination across levels of government and accountability, together with the financing and technical assistance dimension; and bringing local voices into COP31 and other international decision-making processes."],
      ["Participation and working format", "Rather than following a conventional conference format, the Summit will provide a participatory working environment centred on dialogue and the exchange of experience. A short scene-setting segment will establish the COP31 context, followed by a two-part combined thematic session and a joint feedback segment. Approximately 30–40 organisations are expected, including associations of local and regional authorities, city and regional representative offices, relevant EU institutions, city networks, financial and technical assistance organisations, elected local representatives, practitioners and policy experts."],
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
    title: "Avrupa Yerel ve Bölgesel Yönetim Birlikleri Zirvesi", theme: "Küresel Gündemi Şekillendiren Yerel ve Bölgesel Yönetim Birlikleri",
    date: "13 Ekim 2026", time: "14.00–18.10",
    venue: "CEMR Toplantı Salonu · 1. Kat", address: "Square de Meeûs 1 · 1000 Brüksel",
    intro: "Türkiye’den ve Avrupa’dan yerel ve bölgesel yönetim birlikleri ile ilgili kurumları bir araya getiren, odaklı bir yarım günlük çalışma zirvesi.",
    rsvp: "Kayıt", deadline: "Lütfen 10 Ekim 2026 tarihine kadar yanıtlayınız",
    programme: "Programı görüntüle", concept: "Konsept notunu oku",
    about: "Zirve hakkında",
    aboutText: "Zirve; yerel ve bölgesel yönetim birliklerinin özgün rolü ve katma değerine ilişkin deneyimlerin paylaşılması, ortak önceliklerin belirlenmesi ve ortak bir pozisyon belgesinin hazırlanması için bir platform sunacaktır. Özellikle belediyelerin iklim yönetişimi ve çok düzeyli karar alma süreçlerine etkin katılımı, düzeyler arası koordinasyon ve hesap verebilirlik ele alınacak; yeşil finansmana ve teknik desteğe erişim ise yerel uygulamanın güçlendirilmesi bağlamında değerlendirilecektir.",
    questionLabel: "Zirvenin temel sorusu", question: "Yerel yönetimlerin tek başına gerçekleştirmekte zorlandığı hangi işlevleri yerel ve bölgesel yönetim birlikleri ortak ve etkili biçimde yerine getirebilir?",
    programmeTitle: "Program", programmeDesc: "İklim yönetişimi, uygulama kapasitesi, finansman boyutu ve yerel sesin COP31 karar süreçlerine taşınmasına odaklanan katılımcı bir öğleden sonra.", download: "Taslak programı indir", open: "PDF’yi aç",
    conceptTitle: "Konsept notu", conceptDesc: "Zirvenin amacı, tartışma çerçevesi, çalışma biçimi ve beklenen çıktıları.",
    conceptSections: [
      ["Zirve hakkında", "Yerel ve bölgesel yönetimler, iklim hedeflerinin sahada hayata geçirildiği başlıca yönetim düzeyidir. Buna karşın iklim yönetişimi ve karar alma süreçlerine anlamlı katılımları çoğu zaman sınırlı kalmakta; finansmana, teknik desteğe ve politika süreçlerine erişimde ortak güçlükler yaşamaktadır. Belediye birlikleri yerel ihtiyaçları bir araya getirerek ulusal ve uluslararası gündemlere taşır, farklı yönetim düzeyleri arasındaki diyaloğu güçlendirir ve belediyelerin uygulama kapasitesini destekler. Türkiye’deki 1.405 belediyenin tamamını temsil eden TBB, Türkiye ve Avrupa’daki belediye birlikleri ile ilgili kurumları Brüksel’de buluşturacaktır. Zirve, birliklerin özgün katma değerini görünür kılmayı, ortak öncelikleri belirlemeyi ve kalıcı iş birliği kanalları geliştirmeyi amaçlamaktadır."],
      ["Zirvenin temel sorusu", "Yerel yönetimlerin tek başına gerçekleştirmekte zorlandığı hangi işlevleri yerel ve bölgesel yönetim birlikleri ortak ve etkili biçimde yerine getirebilir?"],
      ["Tartışma çerçevesi", "Tartışmalar; yerel ve bölgesel yönetim birliklerinin özgün katma değerine, iklim yönetişimi ve uygulama kapasitesine, belediyelerin etkin katılımına, düzeyler arası koordinasyon ve hesap verebilirliğe odaklanacaktır. Finansman ve teknik desteğe erişim bu çerçevenin uygulamayı mümkün kılan boyutu olarak; yerel sesin COP31 ve diğer uluslararası karar süreçlerine taşınmasıyla birlikte ele alınacaktır."],
      ["Katılım ve çalışma biçimi", "Zirve, klasik konferans formatından ziyade diyalog ve deneyim paylaşımına dayalı katılımcı bir çalışma ortamı sunacaktır. COP31 bağlamını ortaya koyan kısa bir çerçeve sunumunu iki bölümden oluşan birleşik bir tematik oturum ve ortak geri bildirim bölümü izleyecektir. Yaklaşık 30–40 kurumun katılması beklenmekte; yerel ve bölgesel yönetim birlikleri, şehir ve bölge temsilcilikleri, ilgili AB kurumları, şehir ağları, finansman ve teknik destek kuruluşları, seçilmiş yerel yöneticiler, uygulayıcılar ve politika uzmanları bir araya getirilmektedir."],
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
      <div className="document-actions"><DocumentDialog title={t.programmeTitle} description={t.programmeDesc} download={t.download} open={t.open} url="/documents/summit-draft-programme-tr-en.pdf" cover="/documents/programme-cover.png" trigger={t.programme} language={language} /><DocumentDialog title={t.conceptTitle} description={t.conceptDesc} download={t.downloadConcept} open={t.open} url="/documents/summit-concept-note-tr-en.pdf" cover="/documents/concept-cover.png" trigger={t.concept} language={language} /></div>
    </section>

    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-intro"><div className="section-number">01</div><p className="section-kicker">{t.rsvp}</p><h2>{t.formTitle}</h2><p>{t.formIntro}</p><p className="deadline-note">{t.deadline}</p></div>
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

function DocumentDialog({ title, description, download, open, url, cover, trigger, language }: { title: string; description: string; download: string; open: string; url: string; cover: string; trigger: string; language: Language }) {
  return <Dialog><DialogTrigger asChild><Button variant="outline" className="doc-button">{trigger}</Button></DialogTrigger><DialogContent className="document-dialog pdf-dialog" key={language}><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><a className="pdf-frame" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${open}: ${title}`}><img src={cover} alt="" /></a><div className="pdf-actions"><Button asChild variant="outline"><a href={url} target="_blank" rel="noopener noreferrer"><ExternalLink />{open}</a></Button><Button asChild variant="outline"><a href={url} download><Download />{download}</a></Button></div></DialogContent></Dialog>;
}
