// Short, actionable "what to review" tips per topic, shown in the post-test analysis panel
// whenever that topic scores below the weak-topic threshold. One or two sentences pointing at
// the specific sub-skill or classic pitfall that usually causes mistakes in that topic — not a
// restatement of the topic name, and not copied from any textbook (original wording).

export const studyTips = {
  // ---- OCA ----
  'java-basics': {
    en: 'Revisit compilation units, the main() signature, package/import rules, and var — trace through code line by line before picking an answer instead of skimming.',
    ru: 'Повторите единицы компиляции, сигнатуру main(), правила package/import и var — прежде чем выбирать ответ, проходите код построчно, а не бегло просматривайте.',
  },
  'data-types': {
    en: 'Drill primitive ranges, widening vs. narrowing conversions, and where an explicit cast is required — most mistakes here come from missing an implicit narrowing that needs a cast.',
    ru: 'Потренируйтесь на диапазонах примитивов, расширяющих и сужающих преобразованиях, и на том, где нужен явный каст — большинство ошибок здесь из-за пропущенного неявного сужения, которому нужен каст.',
  },
  operators: {
    en: 'Practice operator precedence and short-circuit vs. non-short-circuit logical operators (&& vs &) — trace side effects (like i++) carefully, since that\'s where most exam traps live.',
    ru: 'Потренируйтесь на приоритете операторов и различии между сокращённой и обычной логикой (&& и &) — внимательно отслеживайте побочные эффекты (например, i++), именно там живёт большинство ловушек.',
  },
  arrays: {
    en: 'Re-check array declaration syntax variants, default element values, and multi-dimensional array indexing — a common miss is confusing array length with the last valid index.',
    ru: 'Перепроверьте варианты синтаксиса объявления массивов, значения по умолчанию и индексацию многомерных массивов — частая ошибка — перепутать длину массива с последним валидным индексом.',
  },
  loops: {
    en: 'Trace loop boundaries by hand (off-by-one on < vs <=), and review how break/continue interact with labeled loops — don\'t just estimate, count iterations explicitly.',
    ru: 'Трассируйте границы циклов вручную (off-by-one на < и <=) и повторите, как break/continue взаимодействуют с помеченными циклами — не оценивайте на глаз, считайте итерации явно.',
  },
  'methods-encapsulation': {
    en: 'Review access modifier visibility rules, method overloading resolution (which overload gets picked), and varargs — overload resolution ambiguity is the classic trap here.',
    ru: 'Повторите правила видимости модификаторов доступа, разрешение перегрузки методов (какая перегрузка выбирается) и varargs — неоднозначность разрешения перегрузки — классическая здесь ловушка.',
  },
  inheritance: {
    en: 'Focus on the difference between method overriding (runtime, based on actual object type) and field/static hiding (compile-time, based on declared type) — that distinction drives most wrong answers.',
    ru: 'Сосредоточьтесь на разнице между переопределением методов (во время выполнения, по реальному типу объекта) и скрытием полей/static (во время компиляции, по объявленному типу) — именно это различие определяет большинство неверных ответов.',
  },
  exceptions: {
    en: 'Review checked vs. unchecked exceptions, try-with-resources close order, and finally-block execution guarantees — pay attention to what happens when a finally block itself returns or throws.',
    ru: 'Повторите проверяемые и непроверяемые исключения, порядок закрытия в try-with-resources и гарантии выполнения блока finally — обратите внимание, что происходит, если сам finally делает return или бросает исключение.',
  },
  'core-api': {
    en: 'Re-drill String immutability, StringBuilder chaining, and the exact behavior of common ArrayList/String methods — many mistakes come from assuming a method mutates when it actually returns a new value.',
    ru: 'Повторите неизменяемость String, цепочки вызовов StringBuilder и точное поведение частых методов ArrayList/String — многие ошибки из-за предположения, что метод изменяет объект, хотя он возвращает новое значение.',
  },

  // ---- OCP ----
  'class-design': {
    en: 'Review abstract classes vs. interfaces, constructor chaining rules, and the overriding rules for access modifiers/return types (covariant returns) — this is where subtle compile errors hide.',
    ru: 'Повторите абстрактные классы против интерфейсов, правила цепочек конструкторов и правила переопределения для модификаторов доступа/типов возврата (ковариантные типы) — здесь скрываются тонкие ошибки компиляции.',
  },
  'generics-collections': {
    en: 'Revisit bounded wildcards (? extends / ? super), type erasure consequences, and which Collections methods each interface guarantees — mixing up List/Set/Map contracts is the usual culprit.',
    ru: 'Повторите ограниченные wildcard-типы (? extends / ? super), последствия стирания типов и какие методы гарантирует каждый интерфейс коллекций — обычно путают контракты List/Set/Map.',
  },
  lambdas: {
    en: 'Practice matching lambda expressions to the correct functional interface (Function, Predicate, Consumer, Supplier...) and effectively-final variable capture rules.',
    ru: 'Потренируйтесь сопоставлять лямбда-выражения с правильным функциональным интерфейсом (Function, Predicate, Consumer, Supplier...) и правилами захвата effectively-final переменных.',
  },
  streams: {
    en: 'Trace stream pipelines operation by operation (map/filter/reduce/collect), and remember intermediate operations are lazy — nothing runs until a terminal operation is invoked.',
    ru: 'Трассируйте конвейеры стримов операция за операцией (map/filter/reduce/collect) и помните, что промежуточные операции ленивы — ничего не выполняется, пока не вызвана терминальная операция.',
  },
  'exceptions-assertions': {
    en: 'Review multi-catch syntax, exception chaining, and where assertions are/aren\'t enabled by default (-ea flag) — a frequent miss is assuming assertions always run.',
    ru: 'Повторите синтаксис multi-catch, цепочки исключений и где assert включены/выключены по умолчанию (флаг -ea) — частая ошибка — считать, что assert всегда выполняются.',
  },
  'java-io': {
    en: 'Revisit the difference between java.io and java.nio.2 (Path/Files), and which stream classes wrap which — mixing up byte streams and character streams is a common source of errors.',
    ru: 'Повторите разницу между java.io и java.nio.2 (Path/Files), и какие классы потоков что оборачивают — частый источник ошибок — путаница между байтовыми и символьными потоками.',
  },
  concurrency: {
    en: 'Focus on the exact guarantees synchronized/volatile provide, thread-pool executor lifecycles, and classic race-condition scenarios — trace shared-state access step by step.',
    ru: 'Сосредоточьтесь на точных гарантиях synchronized/volatile, жизненном цикле пулов потоков и классических сценариях гонки — трассируйте доступ к общему состоянию пошагово.',
  },
  jdbc: {
    en: 'Review the JDBC connection/statement/resultset lifecycle and try-with-resources usage for closing them — forgetting the required close order is the usual trap.',
    ru: 'Повторите жизненный цикл Connection/Statement/ResultSet в JDBC и использование try-with-resources для их закрытия — обычная ловушка — забыть о нужном порядке закрытия.',
  },
  'date-time': {
    en: 'Practice the immutability of java.time classes (LocalDate, LocalDateTime, Period, Duration) and which methods return new instances vs. mutate — none of them mutate, which is the common trap.',
    ru: 'Потренируйтесь на неизменяемости классов java.time (LocalDate, LocalDateTime, Period, Duration) и на том, какие методы возвращают новый экземпляр — ни один из них не изменяет объект, в этом обычная ловушка.',
  },

  // ---- Interview ----
  'core-java-oop': {
    en: 'Review the four OOP pillars with concrete Java examples, equals()/hashCode() contracts, and how polymorphism resolves at runtime — be ready to explain "why", not just "what".',
    ru: 'Повторите четыре столпа ООП на конкретных примерах Java, контракты equals()/hashCode() и как полиморфизм разрешается во время выполнения — будьте готовы объяснить "почему", а не только "что".',
  },
  collections: {
    en: 'Revisit the internal structure and complexity guarantees of ArrayList/LinkedList/HashMap/TreeMap — interviewers often probe "why choose X over Y here" rather than just definitions.',
    ru: 'Повторите внутреннее устройство и гарантии сложности ArrayList/LinkedList/HashMap/TreeMap — на собеседованиях часто спрашивают "почему X, а не Y здесь", а не просто определения.',
  },
  'concurrency-interview': {
    en: 'Practice explaining thread safety mechanisms (synchronized, locks, atomics) with a concrete example of a race condition and its fix — vague definitions are the usual weak point.',
    ru: 'Потренируйтесь объяснять механизмы потокобезопасности (synchronized, locks, atomics) на конкретном примере гонки и её исправления — расплывчатые определения обычно являются слабым местом.',
  },
  'jvm-memory': {
    en: 'Review heap vs. stack, garbage collection basics, and common causes of memory leaks/OutOfMemoryError in Java — be able to sketch the object lifecycle from allocation to collection.',
    ru: 'Повторите heap и stack, основы сборки мусора и частые причины утечек памяти/OutOfMemoryError в Java — умейте наглядно описать жизненный цикл объекта от выделения до сборки.',
  },
  'spring-basics': {
    en: 'Revisit dependency injection, bean scopes/lifecycle, and the difference between @Component/@Service/@Repository — many mistakes come from treating them as purely cosmetic.',
    ru: 'Повторите внедрение зависимостей, области видимости/жизненный цикл бинов и разницу между @Component/@Service/@Repository — многие ошибки из-за того, что их считают чисто косметическими.',
  },
  'sql-databases': {
    en: 'Practice writing and reading JOINs, indexing basics, and transaction isolation levels — trace what each JOIN type actually includes/excludes row by row.',
    ru: 'Потренируйтесь писать и читать JOIN, основы индексирования и уровни изоляции транзакций — трассируйте построчно, что именно включает/исключает каждый тип JOIN.',
  },
  'git-vcs': {
    en: 'Review the difference between merge and rebase, and what actually happens during a conflict — practice explaining the resulting commit history for each strategy.',
    ru: 'Повторите разницу между merge и rebase и что на самом деле происходит при конфликте — потренируйтесь объяснять итоговую историю коммитов для каждой стратегии.',
  },
  'design-patterns': {
    en: 'Revisit the intent (not just the structure) of common patterns (Singleton, Factory, Strategy, Observer) — interviewers usually ask "when would you use this", so tie each pattern to a real scenario.',
    ru: 'Повторите назначение (а не только структуру) распространённых паттернов (Singleton, Factory, Strategy, Observer) — обычно спрашивают "когда бы вы это применили", так что привязывайте каждый паттерн к реальному сценарию.',
  },

  // ---- Code Practice ----
  'junior-code': {
    en: 'Slow down and trace code output line by line instead of guessing — most misses here come from skipping a step in operator evaluation order or loop iteration.',
    ru: 'Не торопитесь и трассируйте вывод кода построчно вместо угадывания — большинство ошибок здесь из-за пропуска шага в порядке вычисления операторов или итерации цикла.',
  },
  'middle-code': {
    en: 'Review how overriding, generics, and collection method contracts interact in longer snippets — trace object types (declared vs. actual) at every method call.',
    ru: 'Повторите, как переопределение, дженерики и контракты методов коллекций взаимодействуют в более длинных фрагментах — трассируйте типы объектов (объявленный и реальный) при каждом вызове метода.',
  },
  'leetcode-easy': {
    en: 'Focus on recognizing the underlying pattern (two pointers, hashing, simple loop) before reading the code — once you name the pattern, tracing the implementation gets much faster.',
    ru: 'Сосредоточьтесь на распознавании базового паттерна (два указателя, хеширование, простой цикл) до чтения кода — как только вы назвали паттерн, трассировка реализации становится намного быстрее.',
  },
  'leetcode-medium': {
    en: 'Practice sliding window, HashMap-based grouping/counting, and basic DP/greedy recurrences — these medium-tier patterns account for most real interview algorithm questions.',
    ru: 'Потренируйтесь на скользящем окне, группировке/подсчёте через HashMap и базовых рекуррентностях DP/жадных алгоритмов — эти паттерны уровня medium составляют большинство реальных вопросов на собеседованиях.',
  },
  'leetcode-hard': {
    en: 'Break the problem into the sub-technique it combines (e.g. DP + binary search, two heaps, backtracking with pruning) rather than trying to hold the whole algorithm in your head at once.',
    ru: 'Разбивайте задачу на подтехнику, которую она сочетает (например, DP + бинарный поиск, две кучи, бэктрекинг с отсечением), вместо того чтобы пытаться удержать весь алгоритм в голове сразу.',
  },
}

export const getStudyTip = (topicSlug, lang) => studyTips[topicSlug]?.[lang] ?? null
