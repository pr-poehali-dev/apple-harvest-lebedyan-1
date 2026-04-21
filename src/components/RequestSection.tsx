import { useState } from "react";
import Icon from "@/components/ui/icon";
import { APPLE_POINTS, FAQ_ITEMS } from "@/components/data";

interface RequestSectionProps {
  scrollTo: (id: string) => void;
}

export default function RequestSection({ scrollTo }: RequestSectionProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", point: "", amount: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://functions.poehali.dev/0e8b2913-1f9a-4a1a-82a3-dd06f34ec858", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", phone: "", point: "", amount: "", comment: "" });
  };

  return (
    <>
      {/* REQUEST FORM */}
      <section id="requests" className="py-24" style={{ background: "linear-gradient(160deg, #1a3a1a 0%, #2d5a1b 100%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/10 text-orange-300 text-sm font-golos font-medium px-4 py-1.5 rounded-full mb-6 border border-white/15">
                👷 Анкета сборщика
              </span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ХОЧУ<br />
                <span className="text-orange-400">РАБОТАТЬ</span><br />
                СБОРЩИКОМ
              </h2>
              <p className="text-white/70 font-golos text-lg leading-relaxed mb-8">
                Оставьте заявку — мы свяжемся в течение часа, расскажем об условиях и назначим выход на смену.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Banknote", text: "Сдельная оплата от 3 руб/кг" },
                  { icon: "Clock", text: "Гибкий график, неполный день" },
                  { icon: "ShieldCheck", text: "Весь инвентарь предоставляем бесплатно" },
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
                  <h3 className="font-oswald text-2xl font-bold text-stone-800 mb-2">Анкета отправлена!</h3>
                  <p className="text-stone-500 font-golos">Мы свяжемся с вами в течение часа</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-oswald text-2xl font-bold text-stone-800 mb-6">Анкета сборщика</h3>

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
                    <label className="block text-sm font-golos font-medium text-stone-600 mb-1.5">Удобный сад</label>
                    <select
                      value={formData.point}
                      onChange={(e) => setFormData({ ...formData, point: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-100 focus:border-orange-400 focus:outline-none font-golos text-stone-800 transition-colors bg-stone-50 appearance-none"
                    >
                      <option value="">Выберите сад...</option>
                      {APPLE_POINTS.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-golos font-medium text-stone-600 mb-1.5">Желаемый график</label>
                    <select
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-100 focus:border-orange-400 focus:outline-none font-golos text-stone-800 transition-colors bg-stone-50 appearance-none"
                    >
                      <option value="">Выберите вариант...</option>
                      <option value="fullday">Полный день (07:00–19:00)</option>
                      <option value="morning">Первая смена (07:00–13:00)</option>
                      <option value="evening">Вторая смена (13:00–19:00)</option>
                      <option value="flexible">Гибко, по договорённости</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-golos font-medium text-stone-600 mb-1.5">Комментарий</label>
                    <textarea
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Есть ли опыт, когда готовы приступить..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-100 focus:border-orange-400 focus:outline-none font-golos text-stone-800 transition-colors bg-stone-50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-400 text-white font-oswald font-semibold text-lg py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-orange-200"
                  >
                    Хочу работать сборщиком 🍎
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
    </>
  );
}
