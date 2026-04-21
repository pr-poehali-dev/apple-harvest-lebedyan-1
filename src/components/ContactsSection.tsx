import Icon from "@/components/ui/icon";

interface ContactsSectionProps {
  scrollTo: (id: string) => void;
}

export default function ContactsSection({ scrollTo }: ContactsSectionProps) {
  return (
    <>
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
            <h3 className="font-oswald text-3xl font-bold text-white mb-3">Хочешь работать в саду?</h3>
            <p className="text-white/70 font-golos mb-6">Оставь анкету — свяжемся сегодня и назначим выход на смену</p>
            <button
              onClick={() => scrollTo("requests")}
              className="bg-orange-500 hover:bg-orange-400 text-white font-oswald font-semibold text-lg px-10 py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Хочу работать
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
    </>
  );
}
