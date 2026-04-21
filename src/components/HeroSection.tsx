import Icon from "@/components/ui/icon";
import { useState } from "react";
import { APPLE_POINTS } from "@/components/data";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  return (
    <>
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

            <div className="inline-flex items-center gap-2 bg-orange-500/80 border border-orange-400/50 rounded-full px-4 py-1.5 mb-4 animate-fade-up">
              <span className="text-white text-sm font-golos font-semibold">🔥 Срочный набор — сезон скоро начнётся!</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up-delay-1">
              НУЖНЫ<br />
              <span className="text-orange-400">СБОРЩИКИ</span><br />
              ЯБЛОК
            </h1>

            <p className="text-white/80 text-lg font-golos mb-8 leading-relaxed animate-fade-up-delay-2">Хотите поработать на свежем воздухе среди яблоневых садов? Приглашаем на сбор урожая в городе Лебедянь (сады Троекурово и Агроном)!

Мы предлагаем:
гибкий график — работайте в удобное время;
оплату по результату — чем больше соберёте, тем больше заработаете;
бесплатное питание, жильё и проезд до места работы.
Присоединяйтесь к нашей команде!</p>

            <div className="flex flex-wrap gap-3 animate-fade-up-delay-3">
              <button
                onClick={() => scrollTo("requests")}
                className="bg-orange-500 hover:bg-orange-400 text-white font-oswald font-semibold text-lg px-8 py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg shadow-orange-900/30"
              >
                Хочу работать
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
                { value: "4", label: "сада в Лебедяни" },
                { value: "3–6₽", label: "за кг яблок" },
                { value: "3 мес", label: "длится сезон" },
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
              🗺 Места работы
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              САДЫ ГДЕ<br />
              <span className="text-gradient">НУЖНЫ ЛЮДИ</span>
            </h2>
            <p className="text-stone-500 font-golos max-w-xl mx-auto">
              Выберите ближайший сад — кликните на карточку, чтобы узнать режим работы и условия
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
                        Хочу сюда работать
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
    </>
  );
}
