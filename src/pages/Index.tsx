import { useState } from "react";
import Icon from "@/components/ui/icon";

const SPECIALIST_IMG = "https://cdn.poehali.dev/projects/33d0f9d3-ec3c-42c4-8091-bcf855441101/files/01cb809a-7552-4acd-b48a-60966c286eb0.jpg";
const FOOD_IMG = "https://cdn.poehali.dev/projects/33d0f9d3-ec3c-42c4-8091-bcf855441101/files/0820a85a-ebc6-4e1c-a9f8-0aa7f5b04e4c.jpg";
const GUIDES_IMG = "https://cdn.poehali.dev/projects/33d0f9d3-ec3c-42c4-8091-bcf855441101/files/9c2a87a1-de26-43e6-8445-27b5e40edaef.jpg";

const navLinks = [
  { href: "#about", label: "О специалисте" },
  { href: "#guides", label: "Гайды" },
  { href: "#courses", label: "Программы" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#reviews", label: "Отзывы" },

  { href: "#contacts", label: "Контакты" },
];

const guides = [
  { title: "Детокс без стресса", desc: "7-дневный план мягкого очищения организма без голодания и жёстких ограничений.", price: "990 ₽", tag: "Популярное" },
  { title: "Гормональное питание", desc: "Как еда влияет на гормоны, самочувствие и вес — практический гид.", price: "1 490 ₽", tag: "" },
  { title: "Противовоспалительная диета", desc: "Продукты, которые снижают воспаление и дают энергию на весь день.", price: "790 ₽", tag: "Новинка" },
  { title: "Питание при ПМС", desc: "Нутриционный план для стабилизации цикла и улучшения самочувствия.", price: "990 ₽", tag: "" },
];

const programs = [
  { title: "Мини-детокс", desc: "Мягкое очищение без голодания. Перезапустите организм, уберите отёки и верните лёгкость — шаг за шагом, самостоятельно.", price: "2 990 ₽", duration: "4 недели", icon: "Sparkles" },
  { title: "Чистая кожа", desc: "Питание для сияющей кожи изнутри. Убираем воспаления, высыпания и тусклость через рацион, а не уходовую косметику.", price: "2 099 ₽", duration: "4 недели", icon: "Sun" },
  { title: "Буст энергии", desc: "Избавьтесь от хронической усталости и упадка сил. Программа восстанавливает ресурс тела через еду, режим и нутриенты.", price: "3 099 ₽", duration: "6 недель", icon: "Zap" },
];

const reviews = [
  { name: "Мария К.", text: "За 3 месяца работы с Анастасией я похудела на 9 кг без чувства голода. Наконец-то понимаю, как правильно питаться!", result: "−9 кг" },
  { name: "Алина В.", text: "Курс «Женское здоровье» изменил моё отношение к телу. Циклические отёки ушли, энергия появилась.", result: "−отёки" },
  { name: "Екатерина М.", text: "Гайд по детоксу — лучшее вложение. Лёгкость, чистая кожа и наконец нормальный сон.", result: "Кожа светится" },
  { name: "Наталья Р.", text: "Анастасия даёт знания, которые реально работают. Никакой воды, только практика.", result: "−6 кг" },
];



type Gender = "male" | "female";
type Activity = "sedentary" | "light" | "moderate" | "active" | "veryActive";
type Goal = "loss" | "maintain" | "gain";

const activityLabels: Record<Activity, string> = {
  sedentary: "Сидячий (нет тренировок)",
  light: "Лёгкая активность (1–2 раза/нед)",
  moderate: "Умеренная (3–5 раз/нед)",
  active: "Высокая (6–7 раз/нед)",
  veryActive: "Очень высокая (спортсмен)",
};

const activityCoeff: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const goalAdj: Record<Goal, number> = {
  loss: -500,
  maintain: 0,
  gain: 300,
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [gender, setGender] = useState<Gender>("female");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [calcResult, setCalcResult] = useState<null | { calories: number; protein: number; fat: number; carbs: number }>(null);

  function calculate() {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!a || !w || !h || a < 10 || a > 120 || w < 20 || w > 300 || h < 100 || h > 250) return;

    let bmr: number;
    if (gender === "female") {
      bmr = 9.247 * w + 3.098 * h - 4.33 * a + 447.593;
    } else {
      bmr = 13.397 * w + 4.799 * h - 5.677 * a + 88.362;
    }

    const tdee = bmr * activityCoeff[activity];
    const calories = Math.round(tdee + goalAdj[goal]);
    const protein = Math.round(w * 1.8);
    const fat = Math.round((calories * 0.28) / 9);
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

    setCalcResult({ calories, protein, fat, carbs });
  }

  return (
    <div className="min-h-screen font-golos" style={{ backgroundColor: "var(--cream)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-sage-200/40" style={{ backgroundColor: "rgba(250,246,238,0.92)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <a href="#" className="font-cormorant text-xl font-semibold tracking-wide" style={{ color: "var(--sage-dark)" }}>
            Концепция молодости
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-golos tracking-wide transition-colors hover:text-sage-600" style={{ color: "var(--warm-dark)" }}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="#contacts" className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105" style={{ backgroundColor: "var(--sage)", color: "var(--cream)" }}>
            Записаться
          </a>
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden px-6 pb-4 flex flex-col gap-3 border-t border-sage-200/40 pt-3" style={{ backgroundColor: "rgba(250,246,238,0.98)" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm py-1 font-golos" style={{ color: "var(--warm-dark)" }}>
                {l.label}
              </a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex justify-center px-5 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "var(--sage)", color: "var(--cream)" }}>
              Записаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          <div className="animate-fade-in animate-opacity-0" style={{ animationFillMode: "forwards" }}>
            <span className="inline-block text-xs tracking-[0.25em] uppercase mb-6 font-golos font-medium" style={{ color: "var(--sage)" }}>
              Бьюти нутрициолог
            </span>
            <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8" style={{ color: "var(--warm-dark)" }}>
              Питание,<br />
              <em className="italic" style={{ color: "var(--sage)" }}>которое</em><br />
              работает
            </h1>
            <p className="font-golos text-base md:text-lg leading-relaxed max-w-md mb-10" style={{ color: "#5a6b52" }}>
              Помогаю найти баланс между удовольствием от еды и здоровьем. Гайды, курсы и персональный подход — без жёстких диет и запретов.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#courses" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:scale-105 hover:shadow-lg" style={{ backgroundColor: "var(--sage)", color: "var(--cream)" }}>
                Смотреть курсы
                <Icon name="ArrowRight" size={16} />
              </a>
              <a href="#calculator" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm border transition-all hover:scale-105" style={{ borderColor: "var(--sage)", color: "var(--sage-dark)" }}>
                Рассчитать КБЖУ
              </a>
            </div>
            <div className="mt-14 flex gap-10">
              {[["200+", "клиентов"], ["5 лет", "практики"], ["30+", "продуктов"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-cormorant text-4xl font-semibold" style={{ color: "var(--sage-dark)" }}>{num}</div>
                  <div className="text-xs font-golos mt-1" style={{ color: "#7a8a72" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in animate-opacity-0 animate-delay-300" style={{ animationFillMode: "forwards" }}>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: "0 30px 80px rgba(58,85,58,0.18)" }}>
              <img src={SPECIALIST_IMG} alt="Мельникова Анастасия — бьюти нутрициолог" className="w-full h-full object-cover" />
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12" style={{ backgroundColor: "var(--cream-deep)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-2xl overflow-hidden max-w-md mx-auto" style={{ boxShadow: "0 20px 60px rgba(58,85,58,0.12)" }}>
              <img src={FOOD_IMG} alt="Здоровое питание" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: "var(--sage)" }} />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs tracking-[0.25em] uppercase font-medium mb-4 block" style={{ color: "var(--sage)" }}>О специалисте</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-6 leading-tight" style={{ color: "var(--warm-dark)" }}>
              Анастасия<br /><em className="italic">Мельникова</em>
            </h2>
            <p className="font-golos text-base leading-relaxed mb-5" style={{ color: "#5a6b52" }}>
              Бьюти нутрициолог, основатель проекта «Концепция молодости». Помогаю женщинам выглядеть и чувствовать себя молодо через осознанное питание.
            </p>
            <p className="font-golos text-base leading-relaxed mb-8" style={{ color: "#5a6b52" }}>
              Убеждена: красота начинается с тарелки. Моя задача — научить вас кормить тело так, чтобы кожа сияла, энергия не заканчивалась, а возраст оставался просто цифрой.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Нутрициология РУДН", "Психология пищевого поведения", "Функциональное питание", "ДНК-нутрициология"].map(cert => (
                <div key={cert} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ backgroundColor: "rgba(168,195,168,0.18)" }}>
                  <Icon name="GraduationCap" size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-golos leading-snug" style={{ color: "var(--warm-dark)" }}>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.25em] uppercase font-medium mb-4 block" style={{ color: "var(--sage)" }}>Гайды</span>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: "var(--warm-dark)" }}>
            Готовые решения<br /><em className="italic">под ваш запрос</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map(g => (
            <div key={g.title} className="group rounded-2xl p-6 flex flex-col hover-lift cursor-pointer" style={{ backgroundColor: "white", border: "1px solid rgba(90,135,90,0.1)" }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(168,195,168,0.25)" }}>
                  <Icon name="BookOpen" size={18} />
                </div>
                {g.tag && (
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(90,135,90,0.12)", color: "var(--sage-dark)" }}>
                    {g.tag}
                  </span>
                )}
              </div>
              <h3 className="font-cormorant text-xl font-semibold mb-2 leading-snug" style={{ color: "var(--warm-dark)" }}>{g.title}</h3>
              <p className="text-xs font-golos leading-relaxed flex-1 mb-5" style={{ color: "#7a8a72" }}>{g.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-cormorant text-2xl font-semibold" style={{ color: "var(--sage-dark)" }}>{g.price}</span>
                <button className="px-4 py-2 rounded-full text-xs font-medium transition-all group-hover:scale-105" style={{ backgroundColor: "var(--sage)", color: "var(--cream)" }}>
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="courses" className="py-24 px-6 md:px-12" style={{ backgroundColor: "var(--cream-deep)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.25em] uppercase font-medium mb-4 block" style={{ color: "var(--sage)" }}>Программы</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: "var(--warm-dark)" }}>
              Для самостоятельного<br /><em className="italic">прохождения</em>
            </h2>
            <p className="font-golos text-sm mt-4 max-w-md mx-auto" style={{ color: "#7a8a72" }}>
              Чёткий план, пошаговые инструкции и поддержка на каждом этапе — без созвонов и привязки к расписанию
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {programs.map((p, i) => (
              <div key={p.title} className={`rounded-2xl p-8 flex flex-col hover-lift cursor-pointer ${i === 1 ? "lg:scale-105 lg:-mt-4 lg:mb-4" : ""}`} style={{ backgroundColor: i === 1 ? "var(--sage-dark)" : "white", border: i === 1 ? "none" : "1px solid rgba(90,135,90,0.1)", boxShadow: i === 1 ? "0 20px 60px rgba(58,85,58,0.22)" : undefined }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: i === 1 ? "rgba(255,255,255,0.12)" : "rgba(168,195,168,0.22)" }}>
                  <Icon name={p.icon} size={26} style={{ color: i === 1 ? "white" : "var(--sage)" } as React.CSSProperties} />
                </div>
                <div className="mb-3">
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: i === 1 ? "rgba(255,255,255,0.12)" : "rgba(168,195,168,0.25)", color: i === 1 ? "rgba(255,255,255,0.75)" : "var(--sage-dark)" }}>
                    {p.duration}
                  </span>
                </div>
                <h3 className="font-cormorant text-3xl font-semibold mb-3 leading-snug" style={{ color: i === 1 ? "white" : "var(--warm-dark)" }}>{p.title}</h3>
                <p className="text-sm font-golos leading-relaxed flex-1 mb-8" style={{ color: i === 1 ? "rgba(255,255,255,0.62)" : "#7a8a72" }}>{p.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-cormorant text-4xl font-semibold" style={{ color: i === 1 ? "white" : "var(--sage-dark)" }}>{p.price}</span>
                  <button className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105" style={{ backgroundColor: i === 1 ? "white" : "var(--sage)", color: i === 1 ? "var(--sage-dark)" : "var(--cream)" }}>
                    Купить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] uppercase font-medium mb-4 block" style={{ color: "var(--sage)" }}>Калькулятор</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-4" style={{ color: "var(--warm-dark)" }}>
              Узнайте свою<br /><em className="italic">норму КБЖУ</em>
            </h2>
            <p className="font-golos text-sm" style={{ color: "#7a8a72" }}>Расчёт по формуле Mifflin–St Jeor с учётом цели</p>
          </div>

          <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: "white", boxShadow: "0 20px 60px rgba(58,85,58,0.08)", border: "1px solid rgba(90,135,90,0.1)" }}>
            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest font-medium mb-3 block" style={{ color: "var(--sage-dark)" }}>Пол</label>
              <div className="grid grid-cols-2 gap-3">
                {(["female", "male"] as Gender[]).map(g => (
                  <button key={g} onClick={() => setGender(g)} className="py-3 rounded-xl text-sm font-golos font-medium transition-all" style={{ backgroundColor: gender === g ? "var(--sage)" : "rgba(168,195,168,0.15)", color: gender === g ? "var(--cream)" : "var(--warm-dark)" }}>
                    {g === "female" ? "Женский" : "Мужской"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {([["Возраст", age, setAge, "лет", "25"], ["Вес", weight, setWeight, "кг", "60"], ["Рост", height, setHeight, "см", "165"]] as [string, string, (v: string) => void, string, string][]).map(([label, val, setter, unit, ph]) => (
                <div key={label}>
                  <label className="text-xs uppercase tracking-widest font-medium mb-2 block" style={{ color: "var(--sage-dark)" }}>{label}</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={val}
                      onChange={e => setter(e.target.value)}
                      placeholder={ph}
                      className="w-full px-3 py-3 rounded-xl text-sm font-golos outline-none transition-all"
                      style={{ backgroundColor: "rgba(168,195,168,0.12)", border: "1.5px solid rgba(90,135,90,0.15)", color: "var(--warm-dark)" }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "#a0b090" }}>{unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest font-medium mb-3 block" style={{ color: "var(--sage-dark)" }}>Активность</label>
              <div className="flex flex-col gap-2">
                {(Object.entries(activityLabels) as [Activity, string][]).map(([key, label]) => (
                  <button key={key} onClick={() => setActivity(key)} className="text-left px-4 py-2.5 rounded-xl text-sm font-golos transition-all" style={{ backgroundColor: activity === key ? "rgba(90,135,90,0.12)" : "transparent", color: activity === key ? "var(--sage-dark)" : "#7a8a72", border: activity === key ? "1.5px solid rgba(90,135,90,0.3)" : "1.5px solid transparent" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-xs uppercase tracking-widest font-medium mb-3 block" style={{ color: "var(--sage-dark)" }}>Цель</label>
              <div className="grid grid-cols-3 gap-3">
                {([["loss", "Похудение"], ["maintain", "Поддержание"], ["gain", "Набор массы"]] as [Goal, string][]).map(([key, label]) => (
                  <button key={key} onClick={() => setGoal(key)} className="py-3 px-2 rounded-xl text-xs font-golos font-medium transition-all text-center" style={{ backgroundColor: goal === key ? "var(--sage)" : "rgba(168,195,168,0.15)", color: goal === key ? "var(--cream)" : "var(--warm-dark)" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={calculate} className="w-full py-4 rounded-2xl font-golos font-medium text-base transition-all hover:scale-[1.02] hover:shadow-lg" style={{ backgroundColor: "var(--sage)", color: "var(--cream)" }}>
              Рассчитать мою норму
            </button>

            {calcResult && (
              <div className="mt-8 p-6 rounded-2xl animate-fade-in" style={{ backgroundColor: "rgba(90,135,90,0.06)", border: "1px solid rgba(90,135,90,0.15)" }}>
                <div className="text-center mb-6">
                  <div className="font-cormorant text-6xl font-semibold" style={{ color: "var(--sage-dark)" }}>{calcResult.calories}</div>
                  <div className="text-sm font-golos mt-1" style={{ color: "#7a8a72" }}>ккал в день</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {([["Белки", calcResult.protein, "г", "#5a875a"], ["Жиры", calcResult.fat, "г", "#8a7a50"], ["Углеводы", calcResult.carbs, "г", "#7a8a72"]] as [string, number, string, string][]).map(([label, val, unit, color]) => (
                    <div key={label} className="p-4 rounded-xl" style={{ backgroundColor: "white" }}>
                      <div className="font-cormorant text-3xl font-semibold" style={{ color }}>{val}{unit}</div>
                      <div className="text-xs font-golos mt-1" style={{ color: "#a0b090" }}>{label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-golos text-center mt-4 leading-relaxed" style={{ color: "#a0b090" }}>
                  Это приблизительный расчёт. Для персонального плана питания запишитесь на консультацию.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 md:px-12" style={{ backgroundColor: "var(--cream-deep)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.25em] uppercase font-medium mb-4 block" style={{ color: "var(--sage)" }}>Отзывы</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: "var(--warm-dark)" }}>
              Результаты<br /><em className="italic">говорят сами</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map(r => (
              <div key={r.name} className="rounded-2xl p-6 hover-lift" style={{ backgroundColor: "white", border: "1px solid rgba(90,135,90,0.08)" }}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} />
                  ))}
                </div>
                <p className="text-sm font-golos leading-relaxed mb-5" style={{ color: "#5a6b52" }}>"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium font-golos" style={{ color: "var(--warm-dark)" }}>{r.name}</span>
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(90,135,90,0.12)", color: "var(--sage-dark)" }}>{r.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 md:px-12" style={{ backgroundColor: "var(--sage-dark)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-[0.25em] uppercase font-medium mb-6 block" style={{ color: "var(--sage-light)" }}>Контакты</span>
          <h2 className="font-cormorant text-5xl md:text-7xl font-light leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Готовы начать<br /><em className="italic">свой путь?</em>
          </h2>
          <p className="font-golos text-base leading-relaxed max-w-md mx-auto mb-10" style={{ color: "rgba(250,246,238,0.65)" }}>
            Напишите — расскажем о подходящих курсах и проведём первую бесплатную консультацию.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a href="https://t.me/nutritionist" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-golos font-medium text-sm transition-all hover:scale-105" style={{ backgroundColor: "var(--cream)", color: "var(--sage-dark)" }}>
              <Icon name="Send" size={18} />
              Написать в Telegram
            </a>
            <a href="https://instagram.com/nutritionist" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-golos font-medium text-sm transition-all hover:scale-105 border" style={{ borderColor: "rgba(250,246,238,0.3)", color: "var(--cream)" }}>
              <Icon name="Instagram" size={18} />
              Instagram
            </a>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(250,246,238,0.12)" }}>
            <span className="font-cormorant text-lg font-light" style={{ color: "rgba(250,246,238,0.5)" }}>Концепция молодости · Мельникова Анастасия</span>
            <span className="text-xs font-golos" style={{ color: "rgba(250,246,238,0.3)" }}>© 2025 · Все права защищены</span>
          </div>
        </div>
      </section>
    </div>
  );
}