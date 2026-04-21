import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const APPLE_POINTS = [
  { id: 1, name: "Сад «Лебедянский»", address: "ул. Садовая, 12", hours: "08:00–18:00", available: "Антоновка, Белый налив" },
  { id: 2, name: "Точка «Речная»", address: "пер. Речной, 3", hours: "09:00–17:00", available: "Семеренко, Гала" },
  { id: 3, name: "Сад «Центральный»", address: "ул. Ленина, 45", hours: "07:00–19:00", available: "Антоновка, Мелба" },
  { id: 4, name: "«Усадьба Петровых»", address: "д. Троекурово, 8", hours: "10:00–16:00", available: "Джонатан, Симиренко" },
];

const FAQ_ITEMS = [
  { q: "Как оставить заявку на сбор яблок?", a: "Заполните форму в разделе «Заявки» — укажите имя, телефон, желаемую точку и количество яблок. Мы перезвоним в течение часа." },
  { q: "Какой минимальный объём заявки?", a: "Минимальный заказ — 10 кг. Яблоки выдаются в ящиках по 15–20 кг или на развес по вашему запросу." },
  { q: "Можно ли самостоятельно собрать яблоки?", a: "Да! В садах «Лебедянский» и «Центральный» работает формат «Сорви сам». Стоимость — 25 руб/кг." },
  { q: "Есть ли доставка по Лебедяни?", a: "Доставка работает при заказе от 30 кг. Стоимость — 200 руб. Доставляем в пределах города." },
  { q: "Когда сезон сбора яблок?", a: "Сезон длится с конца июля по октябрь. Пик урожая — август–сентябрь. Следите за актуальными точками на карте." },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", point: "", amount: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    ["home", "map", "requests", "faq", "contacts"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", phone: "", point: "", amount: "", comment: "" });
  };

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "map", label: "Карта" },
    { id: "requests", label: "Заявки" },
    { id: "faq", label: "Вопросы" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ed]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur bg-white/80 border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <span className="text-3xl animate-float inline-block">🍎</span>
            <span className="font-oswald text-xl font-bold text-[#2d5a1b] tracking-wide">
              Яблочный<span className="text-orange-500"> край</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium font-golos transition-all duration-200 ${
                  activeSection === link.id
                    ? "bg-orange-500 text-white"
                    : "text-stone-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-stone-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-orange-100 px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium font-golos transition-all ${
                  activeSection === link.id
                    ? "bg-orange-500 text-white"
                    : "text-stone-600 hover:bg-orange-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/5326d6a2-293a-4aa5-80c7-c9a0e1f43162/files/3a63570f-44dc-4ede-b601-788d48625d9c.jpg"
            alt="Яблоневый сад"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>

        <div className="absolute top-24 right-10 text-6xl opacity-30 animate-float" style={{ animationDelay: "0s" }}>🍏</div>
        <div className="absolute top-40 right-32 text-4xl opacity-20 animate-float" style={{ animationDelay: "1s" }}>🍎</div>
        <div className="absolute bottom-32 left-10 text-5xl opacity-25 animate-float" style={{ animationDelay: "2s" }}>🍏</div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
              <Icon name="MapPin" size={14} className="text-orange-300" />
              <span className="text-white/90 text-sm font-golos">Лебедянь, Липецкая область</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up-delay-1">
              СВЕЖИЕ<br />
              <span className="text-orange-400">ЯБЛОКИ</span><br />
              ПРЯМО С ВЕТКИ
            </h1>

            <p className="text-white/80 text-lg font-golos mb-8 leading-relaxed animate-fade-up-delay-2">
              4 точки сбора в Лебедяни и окрестностях.<br />
              Антоновка, Белый налив, Семеренко и другие сорта.<br />
              Сезон открыт — успей заказать!
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up-delay-3">
              <button
                onClick={() => scrollTo("requests")}
                className="bg-orange-500 hover:bg-orange-400 text-white font-oswald font-semibold text-lg px-8 py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg shadow-orange-900/30"
              >
                Оставить заявку
              </button>
              <button
                onClick={() => scrollTo("map")}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-golos font-medium px-8 py-3.5 rounded-2xl transition-all duration-200 flex items-center gap-2"
              >
                <Icon name="Map" size={18} />
                Точки сбора
              </button>
            </div>

            <div className="mt-14 flex flex-wrap gap-8">
              {[
                { value: "4", label: "точки сбора" },
                { value: "8+", label: "сортов яблок" },
                { value: "25₽", label: "за кг «Сорви сам»" },
              ].map((s, i) => (
                <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                  <div className="font-oswald text-3xl font-bold text-orange-400">{s.value}</div>
                  <div className="text-white/60 text-sm font-golos">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("map")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-bounce transition-colors"
        >
          <Icon name="ChevronDown" size={32} />
        </button>
      </section>

      {/* MAP SECTION */}
      <section id="map" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-golos font-medium px-4 py-1.5 rounded-full mb-4">
              🗺 Интерактивная карта
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              ТОЧКИ СБОРА<br />
              <span className="text-gradient">В ЛЕБЕДЯНИ</span>
            </h2>
            <p className="text-stone-500 font-golos max-w-xl mx-auto">
              Выберите удобную точку — кликните на карточку, чтобы узнать подробности
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              {APPLE_POINTS.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 card-hover ${
                    selectedPoint === point.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-stone-100 bg-white hover:border-orange-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      selectedPoint === point.id ? "bg-orange-500" : "bg-stone-100"
                    }`}>
                      <span className="text-lg">🍎</span>
                    </div>
                    <div>
                      <div className={`font-oswald font-semibold text-base ${selectedPoint === point.id ? "text-orange-600" : "text-stone-800"}`}>
                        {point.name}
                      </div>
                      <div className="text-stone-500 text-xs font-golos mt-0.5 flex items-center gap-1">
                        <Icon name="MapPin" size={11} />
                        {point.address}
                      </div>
                    </div>
                  </div>

                  {selectedPoint === point.id && (
                    <div className="mt-3 pt-3 border-t border-orange-200 space-y-1 animate-fade-up">
                      <div className="flex items-center gap-2 text-sm text-stone-600 font-golos">
                        <Icon name="Clock" size={13} className="text-orange-400" />
                        {point.hours}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone-600 font-golos">
                        <Icon name="Leaf" size={13} className="text-green-500" />
                        {point.available}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); scrollTo("requests"); }}
                        className="mt-2 w-full bg-orange-500 text-white text-sm font-golos font-medium py-2 rounded-xl hover:bg-orange-400 transition-colors"
                      >
                        Оставить заявку
                      </button>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="lg:col-span-2 rounded-3xl overflow-hidden border-2 border-stone-100 relative min-h-[420px] bg-stone-50">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=39.1328%2C53.0163&z=14&pt=39.1378%2C53.0148%2Cpm2rdm~39.1278%2C53.0098%2Cpm2rdm~39.1458%2C53.0178%2Cpm2rdm~39.1198%2C53.0228%2Cpm2rdm&mode=search"
                className="w-full h-full absolute inset-0"
                style={{ minHeight: "420px" }}
                frameBorder={0}
                allowFullScreen
                title="Карта точек сбора яблок в Лебедяни"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs font-golos text-stone-600 flex items-center gap-1.5 shadow-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                {APPLE_POINTS.length} точки сбора
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST FORM */}
      <section id="requests" className="py-24" style={{ background: "linear-gradient(160deg, #1a3a1a 0%, #2d5a1b 100%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/10 text-orange-300 text-sm font-golos font-medium px-4 py-1.5 rounded-full mb-6 border border-white/15">
                📝 Форма заявки
              </span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ОСТАВЬТЕ<br />
                <span className="text-orange-400">ЗАЯВКУ</span><br />
                НА ЯБЛОКИ
              </h2>
              <p className="text-white/70 font-golos text-lg leading-relaxed mb-8">
                Мы перезвоним в течение часа и подтвердим наличие нужного сорта на выбранной точке.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Phone", text: "Бесплатная консультация" },
                  { icon: "Package", text: "Упакуем в ящики или пакеты" },
                  { icon: "Truck", text: "Доставка от 30 кг" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80 font-golos">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon name={item.icon} size={16} className="text-orange-300" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {formSent ? (
                <div className="text-center py-8 animate-scale-in">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-oswald text-2xl font-bold text-stone-800 mb-2">Заявка отправлена!</h3>
                  <p className="text-stone-500 font-golos">Мы перезвоним вам в течение часа</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-oswald text-2xl font-bold text-stone-800 mb-6">Оставить заявку</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-golos font-medium text-stone-600 mb-1.5">Ваше имя *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Иван Петров"
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-100 focus:border-orange-400 focus:outline-none font-golos text-stone-800 transition-colors bg-stone-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-golos font-medium text-stone-600 mb-1.5">Телефон *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (900) 000-00-00"
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-100 focus:border-orange-400 focus:outline-none font-golos text-stone-800 transition-colors bg-stone-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-golos font-medium text-stone-600 mb-1.5">Точка сбора</label>
                    <select
                      value={formData.point}
                      onChange={(e) => setFormData({ ...formData, point: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-100 focus:border-orange-400 focus:outline-none font-golos text-stone-800 transition-colors bg-stone-50 appearance-none"
                    >
                      <option value="">Выберите точку...</option>
                      {APPLE_POINTS.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-golos font-medium text-stone-600 mb-1.5">Количество (кг)</label>
                    <input
                      type="number"
                      min="10"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="Минимум 10 кг"
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-100 focus:border-orange-400 focus:outline-none font-golos text-stone-800 transition-colors bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-golos font-medium text-stone-600 mb-1.5">Комментарий</label>
                    <textarea
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Желаемый сорт, дата получения..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-100 focus:border-orange-400 focus:outline-none font-golos text-stone-800 transition-colors bg-stone-50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-400 text-white font-oswald font-semibold text-lg py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-orange-200"
                  >
                    Отправить заявку 🍎
                  </button>
                  <p className="text-stone-400 text-xs font-golos text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#f7f3ed]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-orange-600 text-sm font-golos font-medium px-4 py-1.5 rounded-full mb-4">
              ❓ Частые вопросы
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-stone-800">
              ВОПРОСЫ И<br />
              <span className="text-gradient">ОТВЕТЫ</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  openFaq === i ? "border-orange-300" : "border-transparent"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-golos font-semibold text-stone-800 text-base leading-snug">{item.q}</span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    openFaq === i ? "bg-orange-500 rotate-45" : "bg-stone-100"
                  }`}>
                    <Icon name="Plus" size={14} className={openFaq === i ? "text-white" : "text-stone-500"} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 animate-fade-up">
                    <div className="h-px bg-stone-100 mb-4" />
                    <p className="text-stone-600 font-golos leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-golos font-medium px-4 py-1.5 rounded-full mb-4">
              📞 Связь с нами
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-stone-800">
              КОНТАКТЫ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (47466) 2-00-00", sub: "Пн–Вс, 08:00–19:00", color: "bg-orange-500", bg: "bg-orange-50" },
              { icon: "Mail", title: "Email", value: "info@yablokniy-kray.ru", sub: "Ответим в течение дня", color: "bg-green-600", bg: "bg-green-50" },
              { icon: "MapPin", title: "Адрес", value: "Лебедянь, Липецкая обл.", sub: "4 точки сбора в городе", color: "bg-stone-700", bg: "bg-stone-50" },
            ].map((c, i) => (
              <div key={i} className={`${c.bg} rounded-3xl p-6 card-hover`}>
                <div className={`w-12 h-12 ${c.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon name={c.icon} size={22} className="text-white" />
                </div>
                <div className="font-golos text-stone-500 text-sm mb-1">{c.title}</div>
                <div className="font-oswald font-semibold text-xl text-stone-800 mb-1">{c.value}</div>
                <div className="font-golos text-stone-500 text-sm">{c.sub}</div>
              </div>
            ))}
          </div>

          <div className="text-center rounded-3xl p-10" style={{ background: "linear-gradient(135deg, #1a3a1a 0%, #2d5a1b 100%)" }}>
            <div className="text-5xl mb-4">🍎</div>
            <h3 className="font-oswald text-3xl font-bold text-white mb-3">Готовы к заказу?</h3>
            <p className="text-white/70 font-golos mb-6">Оставьте заявку и мы свяжемся с вами уже сегодня</p>
            <button
              onClick={() => scrollTo("requests")}
              className="bg-orange-500 hover:bg-orange-400 text-white font-oswald font-semibold text-lg px-10 py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-white/50 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-golos">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍎</span>
            <span className="font-oswald text-white font-semibold">Яблочный край</span>
            <span>— Лебедянь, 2024</span>
          </div>
          <div>Сезон сбора яблок: июль — октябрь</div>
        </div>
      </footer>
    </div>
  );
}