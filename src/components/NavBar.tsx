import Icon from "@/components/ui/icon";

interface NavBarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

const navLinks = [
  { id: "home", label: "Главная" },
  { id: "map", label: "Карта" },
  { id: "requests", label: "Заявки" },
  { id: "faq", label: "Вопросы" },
  { id: "contacts", label: "Контакты" },
];

export default function NavBar({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollTo }: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur bg-white/80 border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
          <span className="text-3xl animate-float inline-block">🍎</span>
          <span className="font-oswald text-xl font-bold text-[#2d5a1b] tracking-wide">
            Сбор яблок | Лебедянь 2026
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
  );
}
