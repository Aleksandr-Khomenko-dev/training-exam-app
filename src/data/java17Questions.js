// Original practice questions for the Oracle 1Z0-829 exam — "Java SE 17 Developer" (OCP).
// Topics mirror Oracle's official 1Z0-829 exam objective groups. Style follows the real
// exam's format: multiple choice / multiple select, heavy on "given this code, what is the
// result?" scenario analysis; drag-and-drop item types (rare on the real exam) are not used.
// All questions are original — written from scratch, not copied from any source.
// Some questions have more than one correct answer ("Choose two").

export const java17Topics = [
  { slug: 'java17-syntax-types', title: 'Handling Date/Time, Text, Numeric & Boolean Values', titleRu: 'Работа с датой/временем, текстом, числами и boolean' },
  { slug: 'java17-control-flow', title: 'Controlling Program Flow', titleRu: 'Управление потоком выполнения' },
  { slug: 'java17-oop', title: 'Java Object-Oriented Approach', titleRu: 'Объектно-ориентированный подход в Java' },
  { slug: 'java17-exceptions', title: 'Handling Exceptions', titleRu: 'Обработка исключений' },
  { slug: 'java17-arrays-collections', title: 'Working with Arrays & Collections', titleRu: 'Работа с массивами и коллекциями' },
  { slug: 'java17-streams-lambdas', title: 'Streams & Lambda Expressions', titleRu: 'Стримы и лямбда-выражения' },
  { slug: 'java17-packaging-jshell', title: 'Packaging Java Code & Using JShell', titleRu: 'Упаковка Java-кода и работа с JShell' },
  { slug: 'java17-concurrency', title: 'Managing Concurrent Code Execution', titleRu: 'Управление конкурентным выполнением кода' },
  { slug: 'java17-io', title: 'Java I/O API', titleRu: 'Java I/O API' },
  { slug: 'java17-jdbc', title: 'Relational Databases Using JDBC', titleRu: 'Реляционные БД через JDBC' },
  { slug: 'java17-localization', title: 'Implementing Localization', titleRu: 'Реализация локализации' },
]

const raw = {
  'java17-syntax-types': [
    {
      q: 'What is the compile-time type of `list` after this declaration?\n\nvar list = new ArrayList<String>();',
      options: [
        'ArrayList<String> — var infers the exact type of the initializer expression at compile time',
        'Object — var always erases to Object',
        'List<String> — var infers the declared interface, not the concrete class',
        'This does not compile — var cannot be used with generic types',
      ],
      correct: [0],
      explanation:
        'var performs local type inference: the compiler looks at the initializer expression, determines its exact static type, and substitutes that as the variable\'s compile-time type — it is not a dynamically-typed variable and does not erase to Object. Here the initializer is `new ArrayList<String>()`, so `list` is inferred as exactly `ArrayList<String>`, complete with its generic type argument, and the compiler will reject calling any method not present on ArrayList (or its supertypes) through this variable. var requires an initializer precisely so this inference always has something concrete to work from.',
      ru: {
        question: 'Каков тип list на этапе компиляции после этого объявления?\n\nvar list = new ArrayList<String>();',
        options: [
          'ArrayList<String> — var выводит точный тип выражения-инициализатора на этапе компиляции',
          'Object — var всегда стирается до Object',
          'List<String> — var выводит объявленный интерфейс, а не конкретный класс',
          'Это не скомпилируется — var нельзя использовать с обобщёнными типами',
        ],
        explanation:
          'var выполняет локальный вывод типа: компилятор смотрит на выражение-инициализатор, определяет его точный статический тип и подставляет его как тип переменной на этапе компиляции — это не динамически типизированная переменная, и она не стирается до Object. Здесь инициализатор — `new ArrayList<String>()`, поэтому list выводится ровно как `ArrayList<String>`, вместе с параметром обобщённого типа, и компилятор отклонит вызов через эту переменную любого метода, отсутствующего у ArrayList (или его супертипов). var требует инициализатора именно потому, что этому выводу всегда нужно от чего-то конкретного оттолкнуться.',
      },
    },
    {
      q: 'What is printed?\n\nString s = """\n    Hello,\n    World!\n    """;\nSystem.out.println(s.lines().count());',
      options: ['2', '3', '4', 'Compilation error'],
      correct: [0],
      explanation:
        'A text block strips incidental leading whitespace based on the least-indented line (including the closing delimiter\'s line, which here is at column 0 — flush left), and a text block that ends with a line break before the closing `"""` does not count that final empty trailing line as a distinct line for lines()/split() purposes in the way one might expect, since it becomes purely the terminator of the last real content line. The two actual content lines are "Hello," and "World!" — .lines() splits on line terminators, giving a stream of exactly those 2 lines. Text blocks otherwise preserve embedded formatting exactly, which is the whole point of the feature versus concatenating with \\n.',
      ru: {
        question: 'Что будет напечатано?\n\nString s = """\n    Hello,\n    World!\n    """;\nSystem.out.println(s.lines().count());',
        options: ['2', '3', '4', 'Ошибка компиляции'],
        explanation:
          'Текстовый блок убирает случайные ведущие пробелы, ориентируясь на наименее отступленную строку (включая строку с закрывающим разделителем, которая здесь стоит в колонке 0 — прижата влево), и текстовый блок, заканчивающийся переводом строки перед закрывающим `"""`, не считает эту финальную пустую завершающую строку отдельной строкой для целей lines()/split(), как можно было бы ожидать, поскольку она становится просто терминатором последней настоящей строки содержимого. Две реальные строки содержимого — "Hello," и "World!" — .lines() разбивает по терминаторам строк, давая поток ровно из этих 2 строк. В остальном текстовые блоки сохраняют встроенное форматирование в точности, в этом и есть весь смысл этой возможности по сравнению с конкатенацией через \\n.',
      },
    },
    {
      q: 'What is printed?\n\nLocalDate d = LocalDate.of(2024, 1, 31);\nLocalDate result = d.plusMonths(1);\nSystem.out.println(result);',
      options: ['2024-02-29', '2024-03-02', '2024-02-31', 'Throws DateTimeException'],
      correct: [0],
      explanation:
        'plusMonths() adds calendar months and then clamps the resulting day-of-month down if the target month is too short to contain it — it never silently rolls over into the following month the way naively adding days would. January 31st plus one month lands conceptually on "February 31st", which does not exist, so the day is clamped to the last valid day of February. 2024 is a leap year (divisible by 4, and not a century-non-leap-year exception), so February has 29 days, giving 2024-02-29. In a non-leap year the same operation on the same starting date would clamp to the 28th instead — a classic exam trap around date-arithmetic clamping.',
      ru: {
        question: 'Что будет напечатано?\n\nLocalDate d = LocalDate.of(2024, 1, 31);\nLocalDate result = d.plusMonths(1);\nSystem.out.println(result);',
        options: ['2024-02-29', '2024-03-02', '2024-02-31', 'Выбрасывает DateTimeException'],
        explanation:
          'plusMonths() прибавляет календарные месяцы, а затем обрезает получившийся день месяца вниз, если целевой месяц слишком короток, чтобы его вместить — он никогда молча не переносит остаток в следующий месяц, как это сделало бы наивное прибавление дней. 31 января плюс один месяц концептуально приходится на "31 февраля", которого не существует, поэтому день обрезается до последнего валидного дня февраля. 2024 — високосный год (делится на 4, и не исключение века-невисокосного года), поэтому в феврале 29 дней, что даёт 2024-02-29. В невисокосном году та же операция с той же исходной датой обрезалась бы до 28-го — классическая ловушка экзамена вокруг обрезания при арифметике дат.',
      },
    },
    {
      q: 'What is printed?\n\nInteger a = 127;\nInteger b = 127;\nInteger c = 200;\nInteger d = 200;\nSystem.out.println((a == b) + " " + (c == d));',
      options: ['true false', 'true true', 'false false', 'false true'],
      correct: [0],
      explanation:
        'Autoboxing small int literals routes them through Integer.valueOf(), which the JVM specification requires to cache and reuse Integer instances for values from -128 to 127 inclusive — so `a` and `b`, both boxed from 127, end up referencing the exact same cached Integer object, making `a == b` (reference comparison) true. 200 falls outside that cached range, so each boxing produces a genuinely new Integer object, making `c == d` false even though their .intValue()s are equal. This is precisely why comparing boxed wrapper types should use .equals() rather than ==, since == only happens to "work" by accident within the small cached range.',
      ru: {
        question: 'Что будет напечатано?\n\nInteger a = 127;\nInteger b = 127;\nInteger c = 200;\nInteger d = 200;\nSystem.out.println((a == b) + " " + (c == d));',
        options: ['true false', 'true true', 'false false', 'false true'],
        explanation:
          'Автобоксинг небольших int-литералов проходит через Integer.valueOf(), который по спецификации JVM обязан кэшировать и переиспользовать экземпляры Integer для значений от -128 до 127 включительно — поэтому a и b, оба упакованные из 127, в итоге ссылаются на один и тот же кэшированный объект Integer, делая a == b (сравнение ссылок) истинным. 200 выходит за пределы этого кэшируемого диапазона, поэтому каждая упаковка создаёт по-настоящему новый объект Integer, делая c == d ложным, хотя их .intValue() равны. Именно поэтому сравнивать упакованные типы-обёртки нужно через .equals(), а не через ==, ведь == лишь случайно "работает" в пределах небольшого кэшируемого диапазона.',
      },
    },
    {
      q: 'Daylight saving time in the US begins on March 13, 2022, moving clocks forward one hour at 2 a.m. (1:59 a.m. jumps straight to 3:00 a.m.). What is printed?\n\nvar localDate = LocalDate.of(2022, 3, 13);\nvar localTime = LocalTime.of(1, 30);\nvar zone = ZoneId.of("America/New_York");\nvar zdt = ZonedDateTime.of(localDate, localTime, zone);\n\nvar offsetBefore = zdt.getOffset();\nvar later = zdt.plusHours(1);\nSystem.out.println(later.getHour() + " " + offsetBefore.equals(later.getOffset()));',
      options: ['3 false', '2 true', '3 true', '2 false'],
      correct: [0],
      explanation:
        'ZonedDateTime arithmetic accounts for the target zone\'s actual wall-clock transitions, not just raw elapsed time. Starting at 1:30 a.m. and adding 1 hour would naively land on 2:30 a.m. — but that exact wall-clock moment never occurs in America/New_York on this date, since the clock jumps from 1:59 a.m. straight to 3:00 a.m., skipping the 2 a.m. hour entirely. plusHours() still adds a real, physical hour of elapsed time (not "the next wall-clock hour label"), which lands after the spring-forward gap, on 3:00 a.m. — hour 3. Because the zone\'s UTC offset itself changes across that transition (standard time shifts to daylight time), the offset before and after also differ, so offsetBefore.equals(later.getOffset()) is false. Result: "3 false".',
      variantGroup: 'java17-dst-zoned-arithmetic',
      ru: {
        question: 'В США переход на летнее время 13 марта 2022 года переводит часы на час вперёд в 2 часа ночи (1:59 сразу становится 3:00). Что будет напечатано?\n\nvar localDate = LocalDate.of(2022, 3, 13);\nvar localTime = LocalTime.of(1, 30);\nvar zone = ZoneId.of("America/New_York");\nvar zdt = ZonedDateTime.of(localDate, localTime, zone);\n\nvar offsetBefore = zdt.getOffset();\nvar later = zdt.plusHours(1);\nSystem.out.println(later.getHour() + " " + offsetBefore.equals(later.getOffset()));',
        options: ['3 false', '2 true', '3 true', '2 false'],
        explanation:
          'Арифметика ZonedDateTime учитывает реальные переходы настенных часов в целевой зоне, а не просто сырое прошедшее время. Начав с 1:30 ночи и прибавив 1 час, наивно можно было бы ожидать 2:30 ночи — но этого точного момента настенных часов в America/New_York в эту дату вообще не существует, поскольку часы прыгают с 1:59 сразу на 3:00, полностью пропуская час "2 часа ночи". plusHours() всё равно прибавляет реальный, физический час прошедшего времени (а не "следующую метку часа настенных часов"), что приземляется уже после весеннего скачка, на 3:00 — час 3. Поскольку сам UTC-смещение зоны меняется на этом переходе (стандартное время сдвигается на летнее), смещение до и после тоже различаются, поэтому offsetBefore.equals(later.getOffset()) ложно. Результат: "3 false".',
      },
    },
    {
      q: 'What is printed?\n\nvar line = new StringBuilder("-");\nvar anotherLine = line.append("-");\nSystem.out.print(line == anotherLine);\nSystem.out.print(" ");\nSystem.out.print(line.length());',
      options: ['true 2', 'false 2', 'true 1', 'false 1'],
      correct: [0],
      variantGroup: 'java17-stringbuilder-append-identity',
      explanation:
        'StringBuilder.append() mutates the StringBuilder in place and returns `this` — the exact same object reference it was called on — precisely so append calls can be chained fluently. Because append() returns the same reference, `anotherLine` ends up pointing at the identical object as `line`, making `line == anotherLine` (reference comparison) true. The mutation added one character to the original "-", making the buffer\'s content "--", so length() is 2. This is a sharp contrast with String\'s concat()/+ operations, which always return a brand-new String object, leaving == false in the analogous scenario.',
      ru: {
        question: 'Что будет напечатано?\n\nvar line = new StringBuilder("-");\nvar anotherLine = line.append("-");\nSystem.out.print(line == anotherLine);\nSystem.out.print(" ");\nSystem.out.print(line.length());',
        options: ['true 2', 'false 2', 'true 1', 'false 1'],
        explanation:
          'StringBuilder.append() изменяет StringBuilder на месте и возвращает `this` — ровно ту же самую ссылку на объект, на котором был вызван — именно для того, чтобы вызовы append можно было связывать в цепочку. Поскольку append() возвращает ту же ссылку, anotherLine в итоге указывает на тот же самый объект, что и line, делая line == anotherLine (сравнение ссылок) истинным. Изменение добавило один символ к исходному "-", сделав содержимое буфера "--", поэтому length() равно 2. Это резко контрастирует с операциями concat()/+ у String, которые всегда возвращают совершенно новый объект String, оставляя == ложным в аналогичном сценарии.',
      },
    },
    {
      q: 'What is printed?\n\nvar line = new String("-");\nvar anotherLine = line.concat("-");\nSystem.out.print(line == anotherLine);\nSystem.out.print(" ");\nSystem.out.print(line.length());',
      options: ['false 1', 'true 1', 'false 2', 'true 2'],
      correct: [0],
      variantGroup: 'java17-stringbuilder-append-identity',
      explanation:
        'String.concat() cannot mutate `line`, because String is immutable — instead it computes and returns a brand-new String object containing the combined text, leaving the original completely untouched. So `anotherLine` refers to a genuinely different object than `line`, making `line == anotherLine` false. Since `line` itself was never modified, its length() remains 1 (still just "-"). This is the mirror image of StringBuilder\'s append(), which mutates in place and returns the same reference (making == true there) — the pairing highlights exactly how immutable vs. mutable text types behave differently under an "identical-looking" chained call.',
      ru: {
        question: 'Что будет напечатано?\n\nvar line = new String("-");\nvar anotherLine = line.concat("-");\nSystem.out.print(line == anotherLine);\nSystem.out.print(" ");\nSystem.out.print(line.length());',
        options: ['false 1', 'true 1', 'false 2', 'true 2'],
        explanation:
          'String.concat() не может изменить line, поскольку String неизменяем — вместо этого он вычисляет и возвращает совершенно новый объект String с объединённым текстом, оставляя исходный полностью нетронутым. Поэтому anotherLine ссылается на по-настоящему другой объект, чем line, делая line == anotherLine ложным. Поскольку сам line никогда не изменялся, его length() остаётся равным 1 (всё ещё просто "-"). Это зеркальное отражение append() у StringBuilder, который изменяет на месте и возвращает ту же ссылку (делая == истинным там) — эта пара наглядно показывает, как неизменяемые и изменяемые текстовые типы ведут себя по-разному при внешне одинаково выглядящем цепочном вызове.',
      },
    },
    {
      q: 'Which local variable declaration does NOT compile?',
      options: [
        'double num1, int num2 = 0;',
        'int num1, num2;',
        'int num1, num2 = 0;',
        'int num1 = 0, num2 = 0;',
      ],
      correct: [0],
      explanation:
        'A single local variable declaration statement can declare multiple variables separated by commas, but they must all share the type stated once at the front of the statement — you cannot restate or change the type partway through the same statement. `double num1, int num2 = 0;` illegally tries to introduce a second, different type (int) inside what Java parses as one `double`-typed declaration list, which is a syntax error. The other three options are all valid: multiple variables of the same declared type, with or without initializers, mixed freely within one statement, are perfectly legal.',
      ru: {
        question: 'Какое объявление локальной переменной НЕ скомпилируется?',
        options: [
          'double num1, int num2 = 0;',
          'int num1, num2;',
          'int num1, num2 = 0;',
          'int num1 = 0, num2 = 0;',
        ],
        explanation:
          'Один оператор объявления локальной переменной может объявлять несколько переменных, разделённых запятыми, но все они должны иметь тип, указанный один раз в начале оператора — нельзя повторно указать или сменить тип посреди того же оператора. `double num1, int num2 = 0;` незаконно пытается ввести второй, другой тип (int) внутри того, что Java разбирает как один список объявлений с типом double, что является синтаксической ошибкой. Остальные три варианта все валидны: несколько переменных одного объявленного типа, с инициализаторами или без, свободно смешанные в одном операторе, полностью законны.',
      },
    },
    {
      q: 'LocalTime.of() has several overloads. Which of the following is NOT one of them?',
      options: [
        'LocalTime.of(int hour, int minute, int second, int nanoOfSecond, int picoOfSecond)',
        'LocalTime.of(int hour, int minute)',
        'LocalTime.of(int hour, int minute, int second)',
        'LocalTime.of(int hour, int minute, int second, int nanoOfSecond)',
      ],
      correct: [0],
      explanation:
        'LocalTime.of() offers exactly three overloads, progressively adding precision: (hour, minute), (hour, minute, second), and (hour, minute, second, nanoOfSecond) — nanoseconds is the finest-grained unit LocalTime supports, and there is no further "picosecond" parameter or overload beyond that. A 5-argument overload ending in a picosecond value does not exist anywhere in the LocalTime API; questions like this test whether you\'ve memorized the actual overload set rather than assuming an ever-finer time unit must exist just because nanoseconds does.',
      ru: {
        question: 'У LocalTime.of() есть несколько перегрузок. Какая из следующих НЕ является одной из них?',
        options: [
          'LocalTime.of(int hour, int minute, int second, int nanoOfSecond, int picoOfSecond)',
          'LocalTime.of(int hour, int minute)',
          'LocalTime.of(int hour, int minute, int second)',
          'LocalTime.of(int hour, int minute, int second, int nanoOfSecond)',
        ],
        explanation:
          'У LocalTime.of() есть ровно три перегрузки, постепенно добавляющие точность: (hour, minute), (hour, minute, second) и (hour, minute, second, nanoOfSecond) — наносекунды — самая тонкая единица, которую поддерживает LocalTime, и никакого дальнейшего параметра или перегрузки с "пикосекундами" за её пределами не существует. Перегрузки с 5 аргументами, заканчивающейся значением пикосекунд, нигде в API LocalTime нет; подобные вопросы проверяют, запомнили ли вы реальный набор перегрузок, а не предполагаете, что ещё более тонкая единица времени обязательно существует просто потому, что существуют наносекунды.',
      },
    },
  ],

  'java17-control-flow': [
    {
      q: 'What is printed?\n\nint day = 3;\nString name = switch (day) {\n  case 1, 7 -> "Weekend";\n  case 2, 3, 4, 5, 6 -> {\n    String s = "Week" + "day";\n    yield s;\n  }\n  default -> "Unknown";\n};\nSystem.out.println(name);',
      options: ['Weekday', 'Week', 'Unknown', 'Compilation error'],
      correct: [0],
      explanation:
        'A switch expression with arrow labels evaluates the branch matching the selector and produces a value for the whole expression — a multi-statement branch must use a block that ends in a `yield` statement to supply that value (unlike arrow branches with a single expression, which implicitly yield it). day is 3, which falls under `case 2, 3, 4, 5, 6 ->`, whose block builds the string "Weekday" and yields it, so name becomes "Weekday". Arrow-style switch branches never fall through to the next case the way traditional colon-style `case:` labels do, which is one of the main reasons the arrow form was introduced.',
      ru: {
        question: 'Что будет напечатано?\n\nint day = 3;\nString name = switch (day) {\n  case 1, 7 -> "Weekend";\n  case 2, 3, 4, 5, 6 -> {\n    String s = "Week" + "day";\n    yield s;\n  }\n  default -> "Unknown";\n};\nSystem.out.println(name);',
        options: ['Weekday', 'Week', 'Unknown', 'Ошибка компиляции'],
        explanation:
          'switch-выражение со стрелочными метками вычисляет ветку, соответствующую селектору, и выдаёт значение для всего выражения — многоинструкционная ветка обязана использовать блок, заканчивающийся оператором `yield`, чтобы предоставить это значение (в отличие от стрелочных веток с одним выражением, которые неявно его выдают). day равен 3, что попадает под `case 2, 3, 4, 5, 6 ->`, чей блок строит строку "Weekday" и выдаёт её через yield, поэтому name становится "Weekday". Стрелочные ветки switch никогда не проваливаются в следующий case, как это делают традиционные метки `case:` с двоеточием — это одна из главных причин появления стрелочной формы.',
      },
    },
    {
      q: 'What is printed?\n\nObject obj = "hello";\nif (obj instanceof String s && s.length() > 3) {\n  System.out.println(s.toUpperCase());\n} else {\n  System.out.println("no match");\n}',
      options: ['HELLO', 'no match', 'Compilation error', 'NullPointerException'],
      correct: [0],
      explanation:
        'Pattern matching for instanceof lets `obj instanceof String s` both test the runtime type and, if it matches, bind the result to a new variable `s` of type String, scoped to wherever the compiler can prove the pattern definitely matched — including the right-hand side of a `&&` in the same condition, since `&&` only evaluates its right operand when the left is true. obj is "hello" (a String, length 5), so the instanceof check succeeds, `s` is bound to "hello", and `s.length() > 3` (5 > 3) is also true, so the if-branch runs, printing "HELLO". This pattern-variable scoping rule is one of the more nuanced points the exam tests — for instance, `s` would NOT be in scope inside the else-branch here, since the pattern is only guaranteed to have matched when the whole `&&` condition was true.',
      ru: {
        question: 'Что будет напечатано?\n\nObject obj = "hello";\nif (obj instanceof String s && s.length() > 3) {\n  System.out.println(s.toUpperCase());\n} else {\n  System.out.println("no match");\n}',
        options: ['HELLO', 'no match', 'Ошибка компиляции', 'NullPointerException'],
        explanation:
          'Сопоставление с образцом для instanceof позволяет `obj instanceof String s` одновременно проверить тип во время выполнения и, если он совпал, привязать результат к новой переменной s типа String, область видимости которой действует там, где компилятор может доказать, что образец точно совпал — включая правую часть `&&` в том же условии, поскольку `&&` вычисляет правый операнд только когда левый истинен. obj — это "hello" (String, длина 5), поэтому проверка instanceof успешна, s привязывается к "hello", и `s.length() > 3` (5 > 3) тоже истинно, поэтому выполняется ветка if, печатая "HELLO". Это правило области видимости переменной образца — один из более тонких моментов, которые проверяет экзамен: например, s НЕ была бы видна внутри ветки else здесь, поскольку образец гарантированно совпал только когда всё условие `&&` было истинным.',
      },
    },
    {
      q: 'Given this enum and switch expression, what happens at compile time?\n\nenum Signal { RED, YELLOW, GREEN }\n\nSignal s = Signal.RED;\nString action = switch (s) {\n  case RED -> "Stop";\n  case GREEN -> "Go";\n};',
      options: [
        'Compilation error — the switch expression does not cover YELLOW and has no default branch',
        'It compiles fine; action becomes null if s is YELLOW at runtime',
        'It compiles fine; a MatchException is thrown only if s is YELLOW at runtime',
        'It compiles fine because enums always have an implicit default',
      ],
      correct: [0],
      explanation:
        'Unlike a switch *statement*, a switch *expression* must be exhaustive — the compiler has to be able to prove every possible value of the selector is handled, because the expression is required to always produce a value. For an enum selector, that means either covering every enum constant explicitly or supplying a `default` branch; here YELLOW is left uncovered and there is no default, so this fails to compile with an error to that effect, well before the program ever runs — it does not defer the problem to a runtime exception on an unhandled case.',
      ru: {
        question: 'При этом enum и switch-выражении, что произойдёт на этапе компиляции?\n\nenum Signal { RED, YELLOW, GREEN }\n\nSignal s = Signal.RED;\nString action = switch (s) {\n  case RED -> "Stop";\n  case GREEN -> "Go";\n};',
        options: [
          'Ошибка компиляции — switch-выражение не покрывает YELLOW и не имеет ветки default',
          'Компилируется нормально; action станет null, если во время выполнения s равно YELLOW',
          'Компилируется нормально; MatchException выбрасывается, только если во время выполнения s равно YELLOW',
          'Компилируется нормально, потому что у enum всегда есть неявный default',
        ],
        explanation:
          'В отличие от switch-*оператора*, switch-*выражение* обязано быть исчерпывающим — компилятор должен быть в состоянии доказать, что обработано каждое возможное значение селектора, поскольку выражение обязано всегда выдавать значение. Для селектора-enum это означает либо покрыть каждую константу enum явно, либо предоставить ветку default; здесь YELLOW остаётся непокрытым и default отсутствует, поэтому компиляция завершается с соответствующей ошибкой, задолго до какого-либо запуска программы — проблема не откладывается до исключения времени выполнения на необработанном случае.',
      },
    },
    {
      q: 'What is printed?\n\nouter:\nfor (int i = 0; i < 3; i++) {\n  for (int j = 0; j < 3; j++) {\n    if (j == 1) continue outer;\n    System.out.print(i + "" + j);\n  }\n}',
      options: ['001020', '00102010', '0', '000'],
      correct: [0],
      explanation:
        'The labeled `continue outer` skips the rest of the current outer-loop iteration and jumps straight to the outer loop\'s increment/condition check, rather than merely restarting the inner loop like an unlabeled continue would. For each i (0, 1, 2), j starts at 0 and prints i+"0" (giving "00", "10", "20"), then j becomes 1, hits `continue outer`, and immediately skips to the next value of i without j ever reaching 2 or any further inner-loop prints happening. Concatenating the three printed pairs gives "00" + "10" + "20" = "001020".',
      ru: {
        question: 'Что будет напечатано?\n\nouter:\nfor (int i = 0; i < 3; i++) {\n  for (int j = 0; j < 3; j++) {\n    if (j == 1) continue outer;\n    System.out.print(i + "" + j);\n  }\n}',
        options: ['001020', '00102010', '0', '000'],
        explanation:
          'Помеченный `continue outer` пропускает остаток текущей итерации внешнего цикла и сразу переходит к проверке инкремента/условия внешнего цикла, а не просто перезапускает внутренний цикл, как это сделал бы непомеченный continue. Для каждого i (0, 1, 2) j начинается с 0 и печатает i+"0" (давая "00", "10", "20"), затем j становится 1, срабатывает `continue outer`, и происходит немедленный переход к следующему значению i, так и не дав j достичь 2 или каким-либо дальнейшим печатям внутреннего цикла произойти. Соединив три напечатанные пары, получаем "00" + "10" + "20" = "001020".',
      },
    },
  ],

  'java17-oop': [
    {
      q: 'What is printed?\n\nrecord Range(int min, int max) {\n  Range {\n    if (min > max) throw new IllegalArgumentException("min > max");\n  }\n}\n\ntry {\n  Range r = new Range(10, 5);\n} catch (IllegalArgumentException e) {\n  System.out.println("caught: " + e.getMessage());\n}',
      options: ['caught: min > max', 'Compilation error', 'No output — the record is created silently', 'NullPointerException'],
      correct: [0],
      explanation:
        'This is a compact canonical constructor — it omits the parameter list and field assignments, which the compiler generates automatically after the compact constructor\'s body runs, but it can still validate arguments and throw before that implicit assignment happens. Constructing Range(10, 5) runs the compact constructor with min=10, max=5; since min > max, it throws IllegalArgumentException with the given message before the record\'s fields are ever populated, and the surrounding try/catch catches it, printing "caught: min > max". This validate-in-a-compact-constructor pattern is the idiomatic way to enforce record invariants.',
      ru: {
        question: 'Что будет напечатано?\n\nrecord Range(int min, int max) {\n  Range {\n    if (min > max) throw new IllegalArgumentException("min > max");\n  }\n}\n\ntry {\n  Range r = new Range(10, 5);\n} catch (IllegalArgumentException e) {\n  System.out.println("caught: " + e.getMessage());\n}',
        options: ['caught: min > max', 'Ошибка компиляции', 'Вывода нет — запись создаётся молча', 'NullPointerException'],
        explanation:
          'Это компактный канонический конструктор — он опускает список параметров и присваивания полям, которые компилятор генерирует автоматически после выполнения тела компактного конструктора, но он всё ещё может валидировать аргументы и бросить исключение до того, как произойдёт это неявное присваивание. Создание Range(10, 5) выполняет компактный конструктор с min=10, max=5; поскольку min > max, он бросает IllegalArgumentException с указанным сообщением ещё до того, как поля записи вообще будут заполнены, и окружающий try/catch перехватывает его, печатая "caught: min > max". Этот паттерн валидации в компактном конструкторе — идиоматичный способ обеспечить инварианты записи.',
      },
    },
    {
      q: 'Given this sealed hierarchy in the same file, what happens at compile time?\n\nsealed interface Shape permits Circle, Square {}\nfinal class Circle implements Shape { double radius; }\nfinal class Square implements Shape { double side; }\nfinal class Triangle implements Shape { double base, height; }',
      options: [
        'Compilation error — Triangle implements Shape but is not listed in the permits clause',
        'It compiles fine; permits is just documentation and is not enforced',
        'It compiles fine; Triangle is implicitly added to the permitted set since it\'s in the same file',
        'Compilation error — sealed interfaces cannot have a permits clause',
      ],
      correct: [0],
      explanation:
        'A sealed type\'s `permits` clause is an enforced, closed list of the only classes/interfaces allowed to directly extend or implement it — the compiler checks every direct subtype against that list. Triangle implements Shape but was never added to `permits Circle, Square`, so the compiler rejects the whole file with an error identifying Triangle as an unpermitted subtype of a sealed interface. Being declared in the same file does not grant automatic permission — it only makes single-file sealed hierarchies convenient to write, since permitted subtypes in the same compilation unit can even omit their own explicit `permits`-related boilerplate, but the permits list on the sealed type itself is still mandatory and enforced.',
      ru: {
        question: 'При этой sealed-иерархии в одном файле, что произойдёт на этапе компиляции?\n\nsealed interface Shape permits Circle, Square {}\nfinal class Circle implements Shape { double radius; }\nfinal class Square implements Shape { double side; }\nfinal class Triangle implements Shape { double base, height; }',
        options: [
          'Ошибка компиляции — Triangle реализует Shape, но не указан в предложении permits',
          'Компилируется нормально; permits — это просто документация и не проверяется принудительно',
          'Компилируется нормально; Triangle неявно добавляется в разрешённый набор, так как находится в том же файле',
          'Ошибка компиляции — sealed-интерфейсы не могут иметь предложение permits',
        ],
        explanation:
          'Предложение `permits` sealed-типа — это принудительно проверяемый, закрытый список единственных классов/интерфейсов, которым разрешено напрямую расширять или реализовывать его — компилятор сверяет с этим списком каждый прямой подтип. Triangle реализует Shape, но никогда не был добавлен в `permits Circle, Square`, поэтому компилятор отклоняет весь файл с ошибкой, указывающей на Triangle как неразрешённый подтип sealed-интерфейса. Объявление в том же файле не даёт автоматического разрешения — это лишь делает однофайловые sealed-иерархии удобными для написания, поскольку разрешённые подтипы в той же единице компиляции могут даже опустить свой собственный явный шаблонный код, связанный с permits, но сам список permits у sealed-типа по-прежнему обязателен и проверяется.',
      },
    },
    {
      q: 'What is printed?\n\nrecord Point(int x, int y) {}\n\nPoint p1 = new Point(1, 2);\nPoint p2 = new Point(1, 2);\nSystem.out.println(p1 == p2);\nSystem.out.println(p1.equals(p2));',
      options: ['false\ntrue', 'true\ntrue', 'false\nfalse', 'true\nfalse'],
      correct: [0],
      explanation:
        'p1 and p2 are two separate objects created by two separate `new` calls, so `==` (reference identity) is false regardless of their field values — records do not change how == works. However, the record declaration automatically generates an equals() implementation that compares all component fields (x and y here) for equality, so p1.equals(p2) is true because both records hold x=1, y=2. This auto-generated equals()/hashCode() pair (along with toString()) is one of the main productivity benefits of records over writing an equivalent plain class by hand.',
      ru: {
        question: 'Что будет напечатано?\n\nrecord Point(int x, int y) {}\n\nPoint p1 = new Point(1, 2);\nPoint p2 = new Point(1, 2);\nSystem.out.println(p1 == p2);\nSystem.out.println(p1.equals(p2));',
        options: ['false\ntrue', 'true\ntrue', 'false\nfalse', 'true\nfalse'],
        explanation:
          'p1 и p2 — два отдельных объекта, созданных двумя отдельными вызовами new, поэтому `==` (сравнение ссылок) ложно независимо от значений их полей — записи не меняют, как работает ==. Однако объявление записи автоматически генерирует реализацию equals(), сравнивающую все компонентные поля (здесь x и y) на равенство, поэтому p1.equals(p2) истинно, так как оба объекта записи содержат x=1, y=2. Эта автоматически сгенерированная пара equals()/hashCode() (вместе с toString()) — одно из главных преимуществ записей в производительности написания кода по сравнению с ручным написанием эквивалентного обычного класса.',
      },
    },
    {
      q: 'What is printed?\n\ninterface Greeter {\n  private String base() { return "Hello"; }\n  default String formal(String name) { return base() + ", " + name + "."; }\n  default String casual(String name) { return base() + " " + name + "!"; }\n}\n\nclass EnglishGreeter implements Greeter {}\n\nSystem.out.println(new EnglishGreeter().casual("Sam"));',
      options: ['Hello Sam!', 'Compilation error — interfaces cannot have private methods', 'Hello, Sam.', 'null Sam!'],
      correct: [0],
      explanation:
        'Since Java 9, interfaces can declare private methods, which exist purely to share code between the interface\'s own default (or other private) methods — they cannot be called from outside the interface and are not inherited or overridden by implementing classes. Here `base()` is a private helper reused by both `formal()` and `casual()`, avoiding duplicating the string "Hello" in two places. EnglishGreeter inherits both default methods without overriding anything, so calling .casual("Sam") runs Greeter\'s default implementation, which calls the private base() (returning "Hello") and concatenates it into "Hello Sam!".',
      ru: {
        question: 'Что будет напечатано?\n\ninterface Greeter {\n  private String base() { return "Hello"; }\n  default String formal(String name) { return base() + ", " + name + "."; }\n  default String casual(String name) { return base() + " " + name + "!"; }\n}\n\nclass EnglishGreeter implements Greeter {}\n\nSystem.out.println(new EnglishGreeter().casual("Sam"));',
        options: ['Hello Sam!', 'Ошибка компиляции — интерфейсы не могут иметь private-методы', 'Hello, Sam.', 'null Sam!'],
        explanation:
          'Начиная с Java 9 интерфейсы могут объявлять private-методы, существующие исключительно для того, чтобы делить код между собственными default-методами интерфейса (или другими private-методами) — их нельзя вызвать снаружи интерфейса, и они не наследуются и не переопределяются реализующими классами. Здесь base() — приватный вспомогательный метод, переиспользуемый и formal(), и casual(), избегая дублирования строки "Hello" в двух местах. EnglishGreeter наследует оба default-метода, ничего не переопределяя, поэтому вызов .casual("Sam") выполняет реализацию по умолчанию из Greeter, которая вызывает приватный base() (возвращающий "Hello") и объединяет его в "Hello Sam!".',
      },
    },
  ],

  'java17-exceptions': [
    {
      q: 'What is printed?\n\nclass A implements AutoCloseable {\n  public void close() { System.out.print("A"); }\n}\nclass B implements AutoCloseable {\n  public void close() { System.out.print("B"); }\n}\n\ntry (A a = new A(); B b = new B()) {\n  System.out.print("work-");\n}',
      options: ['work-BA', 'work-AB', 'ABwork-', 'BAwork-'],
      correct: [0],
      explanation:
        'Resources declared in a try-with-resources header are closed automatically in the reverse order of their declaration, once the try block finishes (normally or via exception) — this mirrors how manually-nested try/finally blocks would naturally unwind. The body prints "work-" first, then, as the try block exits, `b.close()` runs before `a.close()` (b was declared second, so it\'s closed first), printing "B" then "A". Overall output: "work-BA".',
      ru: {
        question: 'Что будет напечатано?\n\nclass A implements AutoCloseable {\n  public void close() { System.out.print("A"); }\n}\nclass B implements AutoCloseable {\n  public void close() { System.out.print("B"); }\n}\n\ntry (A a = new A(); B b = new B()) {\n  System.out.print("work-");\n}',
        options: ['work-BA', 'work-AB', 'ABwork-', 'BAwork-'],
        explanation:
          'Ресурсы, объявленные в заголовке try-with-resources, закрываются автоматически в обратном порядке их объявления, как только блок try завершается (штатно или через исключение) — это отражает то, как естественно разворачивались бы вручную вложенные блоки try/finally. Тело сначала печатает "work-", затем, по выходе из блока try, `b.close()` выполняется раньше `a.close()` (b объявлен вторым, поэтому закрывается первым), печатая "B", затем "A". Итоговый вывод: "work-BA".',
      },
    },
    {
      q: 'Which statement about this multi-catch block is correct?\n\ntry {\n  riskyCall();\n} catch (FileNotFoundException | IOException e) {\n  System.out.println("failed");\n}',
      options: [
        'Compilation error — FileNotFoundException is a subtype of IOException, so listing both in a multi-catch is redundant and not allowed',
        'It compiles fine and catches both exception types independently',
        'It compiles fine, but only IOException is ever actually caught',
        'Compilation error — multi-catch requires at least three exception types',
      ],
      correct: [0],
      explanation:
        'A multi-catch clause (`catch (TypeA | TypeB e)`) requires the alternatives to not be related by inheritance — the compiler forbids listing both a type and one of its supertypes/subtypes together, because doing so would be meaningless (catching the supertype alone would already catch the subtype) and is presumed to be a mistake. FileNotFoundException extends IOException, so `FileNotFoundException | IOException` is rejected at compile time with an error to that effect; the fix is to catch just IOException alone, which already covers FileNotFoundException.',
      ru: {
        question: 'Какое утверждение об этом multi-catch блоке верно?\n\ntry {\n  riskyCall();\n} catch (FileNotFoundException | IOException e) {\n  System.out.println("failed");\n}',
        options: [
          'Ошибка компиляции — FileNotFoundException является подтипом IOException, поэтому указание обоих в multi-catch избыточно и не разрешено',
          'Компилируется нормально и перехватывает оба типа исключений независимо',
          'Компилируется нормально, но реально перехватывается только IOException',
          'Ошибка компиляции — multi-catch требует минимум три типа исключений',
        ],
        explanation:
          'Блок multi-catch (`catch (TypeA | TypeB e)`) требует, чтобы альтернативы не были связаны наследованием — компилятор запрещает указывать вместе тип и один из его супертипов/подтипов, поскольку это было бы бессмысленно (перехват одного лишь супертипа уже перехватил бы и подтип) и предполагается ошибкой. FileNotFoundException расширяет IOException, поэтому `FileNotFoundException | IOException` отклоняется на этапе компиляции с соответствующей ошибкой; исправление — перехватывать только IOException, что уже покрывает FileNotFoundException.',
      },
    },
    {
      q: 'class InsufficientFundsException extends Exception {\n  public InsufficientFundsException(String msg) { super(msg); }\n}\n\nvoid withdraw(double amount) throws InsufficientFundsException {\n  if (amount > balance) throw new InsufficientFundsException("Not enough funds");\n}\n\nWhat is required at any call site of withdraw()?',
      options: [
        'The call must be wrapped in a try/catch for InsufficientFundsException, or the enclosing method must itself declare `throws InsufficientFundsException`',
        'Nothing — InsufficientFundsException is unchecked since it has a custom constructor',
        'The call site must catch Exception specifically, not the subclass',
        'withdraw() must be declared static for the exception to propagate',
      ],
      correct: [0],
      explanation:
        'InsufficientFundsException extends Exception directly (not RuntimeException), making it a checked exception — the compiler enforces that any code calling a method declared to throw it must either handle it in a try/catch or explicitly propagate it further by declaring `throws InsufficientFundsException` on the enclosing method itself. This compile-time enforcement is exactly what distinguishes checked exceptions from unchecked ones (which extend RuntimeException and impose no such obligation); nothing about having a custom constructor changes that — it\'s purely which class is extended that determines checked-vs-unchecked status.',
      ru: {
        question: 'class InsufficientFundsException extends Exception {\n  public InsufficientFundsException(String msg) { super(msg); }\n}\n\nvoid withdraw(double amount) throws InsufficientFundsException {\n  if (amount > balance) throw new InsufficientFundsException("Not enough funds");\n}\n\nЧто требуется в любом месте вызова withdraw()?',
        options: [
          'Вызов должен быть обёрнут в try/catch для InsufficientFundsException, либо охватывающий метод сам должен объявить `throws InsufficientFundsException`',
          'Ничего — InsufficientFundsException непроверяемое, так как у него есть собственный конструктор',
          'Место вызова должно перехватывать именно Exception, а не подкласс',
          'withdraw() должен быть объявлен static, чтобы исключение распространялось',
        ],
        explanation:
          'InsufficientFundsException напрямую расширяет Exception (а не RuntimeException), делая его проверяемым исключением — компилятор принудительно требует, чтобы любой код, вызывающий метод, объявленный бросающим его, либо обработал его в try/catch, либо явно распространил его дальше, объявив `throws InsufficientFundsException` у самого охватывающего метода. Это принуждение на этапе компиляции — именно то, что отличает проверяемые исключения от непроверяемых (расширяющих RuntimeException и не накладывающих такого обязательства); наличие собственного конструктора никак это не меняет — статус проверяемого/непроверяемого определяется исключительно тем, какой класс расширяется.',
      },
    },
    {
      q: 'What is printed?\n\nclass Res implements AutoCloseable {\n  public void close() { throw new RuntimeException("close failed"); }\n}\n\ntry {\n  try (Res r = new Res()) {\n    throw new RuntimeException("body failed");\n  }\n} catch (RuntimeException e) {\n  System.out.println(e.getMessage());\n  System.out.println(e.getSuppressed().length);\n}',
      options: ['body failed\n1', 'close failed\n1', 'body failed\n0', 'close failed\n0'],
      correct: [0],
      explanation:
        'When both the try block body and the automatic close() of a try-with-resources throw, the exception from the body is the one that actually propagates (it "wins"), while the exception thrown by close() is attached to it as a suppressed exception rather than replacing it or being lost — retrievable via getSuppressed(). Here the body throws "body failed" first, and while unwinding, close() throws "close failed"; the catch block\'s `e` is the body\'s exception, so e.getMessage() is "body failed", and e.getSuppressed() contains exactly the close() exception, giving a length of 1. This suppressed-exception mechanism (introduced alongside try-with-resources) exists precisely so that a failure during cleanup never silently masks the original, more important failure that triggered the cleanup in the first place.',
      ru: {
        question: 'Что будет напечатано?\n\nclass Res implements AutoCloseable {\n  public void close() { throw new RuntimeException("close failed"); }\n}\n\ntry {\n  try (Res r = new Res()) {\n    throw new RuntimeException("body failed");\n  }\n} catch (RuntimeException e) {\n  System.out.println(e.getMessage());\n  System.out.println(e.getSuppressed().length);\n}',
        options: ['body failed\n1', 'close failed\n1', 'body failed\n0', 'close failed\n0'],
        explanation:
          'Когда и тело блока try, и автоматический close() try-with-resources оба бросают исключение, наружу реально распространяется исключение из тела ("побеждает" оно), а исключение, брошенное close(), присоединяется к нему как подавленное (suppressed), а не заменяет его и не теряется — его можно получить через getSuppressed(). Здесь тело сначала бросает "body failed", и во время разворачивания close() бросает "close failed"; e в блоке catch — это исключение из тела, поэтому e.getMessage() равно "body failed", а e.getSuppressed() содержит ровно исключение из close(), давая длину 1. Этот механизм подавленных исключений (появившийся вместе с try-with-resources) существует именно для того, чтобы сбой при очистке ресурсов никогда молча не маскировал исходный, более важный сбой, который и вызвал эту очистку.',
      },
    },
  ],

  'java17-arrays-collections': [
    {
      q: 'What happens at runtime?\n\nList<String> names = List.of("Ann", "Bob");\nnames.add("Cid");',
      options: [
        'Throws UnsupportedOperationException — List.of() produces an immutable list',
        'It compiles and runs fine, appending "Cid"',
        'Compilation error — List.of() cannot hold more than 2 elements',
        'It silently does nothing and names stays the same',
      ],
      correct: [0],
      explanation:
        'List.of() (and the analogous Set.of(), Map.of()) creates a genuinely immutable collection — its structure cannot change after creation, and every structural mutator (add, remove, set, clear, sort, and similar) throws UnsupportedOperationException at runtime rather than silently no-opping or failing at compile time. This is a stricter guarantee than Collections.unmodifiableList(), which merely wraps a list that might still be mutated through some other still-mutable reference to the same backing list; List.of() has no such backdoor, and there is no fixed capacity limit built into it — the exception is purely about immutability, not size.',
      ru: {
        question: 'Что произойдёт во время выполнения?\n\nList<String> names = List.of("Ann", "Bob");\nnames.add("Cid");',
        options: [
          'Выбрасывает UnsupportedOperationException — List.of() создаёт неизменяемый список',
          'Компилируется и работает нормально, добавляя "Cid"',
          'Ошибка компиляции — List.of() не может содержать больше 2 элементов',
          'Молча ничего не делает, и names остаётся прежним',
        ],
        explanation:
          'List.of() (и аналогичные Set.of(), Map.of()) создают по-настоящему неизменяемую коллекцию — её структура не может измениться после создания, и любой структурный модификатор (add, remove, set, clear, sort и подобные) выбрасывает UnsupportedOperationException во время выполнения, а не молча ничего не делает и не проваливается на этапе компиляции. Это более строгая гарантия, чем Collections.unmodifiableList(), который лишь оборачивает список, всё ещё способный измениться через какую-то другую, всё ещё изменяемую ссылку на тот же лежащий в основе список; у List.of() такой лазейки нет, и в него не встроено никакого фиксированного ограничения по вместимости — исключение исключительно про неизменяемость, а не про размер.',
      },
    },
    {
      q: 'What is the sort order of `people` after this call?\n\nrecord Person(String name, int age) {}\n\nList<Person> people = new ArrayList<>(List.of(\n  new Person("Amy", 30), new Person("Bo", 25), new Person("Cy", 30)\n));\npeople.sort(Comparator.comparing(Person::age).thenComparing(Person::name));',
      options: [
        'Bo(25), Amy(30), Cy(30)',
        'Amy(30), Bo(25), Cy(30)',
        'Cy(30), Amy(30), Bo(25)',
        'Bo(25), Cy(30), Amy(30)',
      ],
      correct: [0],
      explanation:
        'Comparator.comparing(Person::age) sorts primarily by age ascending, and .thenComparing(Person::name) is a tie-breaker applied only when two elements compare equal on age. Bo (25) sorts before Amy and Cy (both 30) purely on age. Amy and Cy tie on age (30 each), so the tie-breaker kicks in, comparing their names alphabetically: "Amy" comes before "Cy". Final order: Bo(25), Amy(30), Cy(30) — this comparator-chaining idiom (primary key, then secondary key) is a very common real-world and exam pattern.',
      ru: {
        question: 'Каков порядок сортировки people после этого вызова?\n\nrecord Person(String name, int age) {}\n\nList<Person> people = new ArrayList<>(List.of(\n  new Person("Amy", 30), new Person("Bo", 25), new Person("Cy", 30)\n));\npeople.sort(Comparator.comparing(Person::age).thenComparing(Person::name));',
        options: [
          'Bo(25), Amy(30), Cy(30)',
          'Amy(30), Bo(25), Cy(30)',
          'Cy(30), Amy(30), Bo(25)',
          'Bo(25), Cy(30), Amy(30)',
        ],
        explanation:
          'Comparator.comparing(Person::age) сортирует в первую очередь по возрасту по возрастанию, а .thenComparing(Person::name) — критерий разрешения ничьей, применяемый только когда два элемента равны по возрасту. Bo (25) сортируется раньше Amy и Cy (обоим по 30) чисто по возрасту. Amy и Cy равны по возрасту (30 у каждого), поэтому включается критерий разрешения ничьей, сравнивающий их имена по алфавиту: "Amy" идёт раньше "Cy". Итоговый порядок: Bo(25), Amy(30), Cy(30) — эта идиома цепочки компараторов (первичный ключ, затем вторичный) — очень частый паттерн как в реальном коде, так и на экзамене.',
      },
    },
    {
      q: 'What is printed?\n\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(1);\nstack.push(2);\nstack.push(3);\nSystem.out.println(stack.pop() + " " + stack.peek());',
      options: ['3 2', '1 2', '3 1', '1 3'],
      correct: [0],
      explanation:
        'ArrayDeque implements Deque and provides stack-style push()/pop()/peek() semantics that operate on the head of the deque, giving LIFO (last-in-first-out) behavior: push() inserts at the head, pop() removes and returns the head. Pushing 1, 2, 3 in that order makes the head sequence (from most to least recently pushed) 3, 2, 1. pop() removes and returns the head, 3, leaving 2 as the new head; peek() then returns 2 without removing it. Result: "3 2". Using ArrayDeque as a stack (rather than the legacy Stack class, which is synchronized and generally discouraged) is the modern recommended idiom.',
      ru: {
        question: 'Что будет напечатано?\n\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(1);\nstack.push(2);\nstack.push(3);\nSystem.out.println(stack.pop() + " " + stack.peek());',
        options: ['3 2', '1 2', '3 1', '1 3'],
        explanation:
          'ArrayDeque реализует Deque и предоставляет семантику стека push()/pop()/peek(), оперирующую головой дека, давая поведение LIFO (последним пришёл — первым ушёл): push() вставляет в голову, pop() удаляет и возвращает голову. Проталкивание 1, 2, 3 в этом порядке делает последовательность головы (от самого недавнего к самому давнему) 3, 2, 1. pop() удаляет и возвращает голову, 3, оставляя 2 новой головой; peek() затем возвращает 2, не удаляя его. Результат: "3 2". Использование ArrayDeque как стека (вместо устаревшего класса Stack, который синхронизирован и в целом не рекомендуется) — современная рекомендуемая идиома.',
      },
    },
    {
      q: 'Given `List<? extends Number> nums = new ArrayList<Integer>();`, which statement is correct?',
      options: [
        'nums.add(5) does not compile, but Number n = nums.get(0); does — an upper-bounded wildcard allows safe reads but not writes',
        'Both nums.add(5) and nums.get(0) compile without issue',
        'Neither reading nor writing compiles with an upper-bounded wildcard',
        'nums.add(5) compiles, but reading requires an explicit cast to Integer',
      ],
      correct: [0],
      explanation:
        'A `? extends Number` wildcard means "some specific, but unknown, subtype of Number" — the compiler cannot know whether that unknown subtype is Integer, Double, or something else, so it forbids adding anything (except literal null) through the reference, since it can\'t verify any particular value would be type-compatible with the actual runtime type. Reading, however, is always safe: whatever the unknown subtype actually is, it is guaranteed to be some kind of Number, so `Number n = nums.get(0);` compiles fine. This "extends = safe to read, unsafe to write" rule (informally the "Get and Put Principle" / PECS: Producer Extends, Consumer Super) is a heavily tested generics concept.',
      ru: {
        question: 'Дано `List<? extends Number> nums = new ArrayList<Integer>();`, какое утверждение верно?',
        options: [
          'nums.add(5) не компилируется, а Number n = nums.get(0); компилируется — верхне-ограниченный wildcard разрешает безопасное чтение, но не запись',
          'И nums.add(5), и nums.get(0) компилируются без проблем',
          'При верхне-ограниченном wildcard не компилируется ни чтение, ни запись',
          'nums.add(5) компилируется, но чтение требует явного приведения к Integer',
        ],
        explanation:
          '`? extends Number` означает "некий конкретный, но неизвестный подтип Number" — компилятор не может знать, является ли этот неизвестный подтип Integer, Double или чем-то ещё, поэтому он запрещает добавлять что-либо (кроме буквального null) через эту ссылку, так как не может подтвердить, что какое-либо конкретное значение будет совместимо по типу с реальным типом во время выполнения. Чтение же всегда безопасно: каким бы ни был неизвестный подтип на самом деле, гарантированно это какой-то Number, поэтому `Number n = nums.get(0);` компилируется нормально. Это правило "extends = безопасно читать, небезопасно писать" (неформально "принцип Get and Put" / PECS: Producer Extends, Consumer Super) — активно проверяемая концепция дженериков.',
      },
    },
  ],

  'java17-streams-lambdas': [
    {
      q: 'What is printed?\n\nList<String> names = List.of("Ann", "Bob", "Cid", "Amy");\nList<String> result = names.stream()\n  .filter(n -> n.startsWith("A"))\n  .map(String::toUpperCase)\n  .toList();\nSystem.out.println(result);',
      options: ['[ANN, AMY]', '[Ann, Amy]', '[ANN, BOB, CID, AMY]', '[AMY, ANN]'],
      correct: [0],
      explanation:
        'The pipeline runs filter() first, keeping only elements starting with "A" — "Ann" and "Amy" — in their original relative order (streams over an ordered source like a List preserve encounter order unless something explicitly disrupts it). map(String::toUpperCase) then transforms each surviving element to uppercase. .toList() (added in Java 16 as a convenient shorthand for .collect(Collectors.toList())) materializes the result as an unmodifiable List. Final result: [ANN, AMY], in that order.',
      ru: {
        question: 'Что будет напечатано?\n\nList<String> names = List.of("Ann", "Bob", "Cid", "Amy");\nList<String> result = names.stream()\n  .filter(n -> n.startsWith("A"))\n  .map(String::toUpperCase)\n  .toList();\nSystem.out.println(result);',
        options: ['[ANN, AMY]', '[Ann, Amy]', '[ANN, BOB, CID, AMY]', '[AMY, ANN]'],
        explanation:
          'Конвейер сначала выполняет filter(), оставляя только элементы, начинающиеся с "A" — "Ann" и "Amy" — в их исходном относительном порядке (стримы над упорядоченным источником вроде List сохраняют порядок обхода, если что-то явно его не нарушает). map(String::toUpperCase) затем преобразует каждый оставшийся элемент в верхний регистр. .toList() (добавлен в Java 16 как удобное сокращение для .collect(Collectors.toList())) материализует результат как неизменяемый List. Итоговый результат: [ANN, AMY], в этом порядке.',
      },
    },
    {
      q: 'What is printed, and why does it matter?\n\nstatic String expensiveDefault() {\n  System.out.print("computing-");\n  return "default";\n}\n\nOptional<String> opt = Optional.of("value");\nSystem.out.println(opt.orElseGet(() -> expensiveDefault()));',
      options: [
        'value — orElseGet only invokes the supplier if the Optional is empty, so expensiveDefault() never runs',
        'computing-value — the supplier always runs before checking the Optional',
        'default — orElseGet ignores the Optional\'s present value',
        'Compilation error — orElseGet requires a String argument, not a lambda',
      ],
      correct: [0],
      explanation:
        'orElseGet() takes a Supplier and only invokes it lazily, if and when the Optional turns out to be empty — this is precisely its advantage over orElse(), which takes an already-evaluated value and therefore always computes its argument eagerly regardless of whether the Optional is present. Since opt is present ("value"), orElseGet() never calls expensiveDefault() at all, so "computing-" is never printed, and the output is simply "value". This laziness matters whenever the fallback value is expensive to compute (a database call, a network request) — using orElse() there would waste that work even when the Optional already has a value.',
      ru: {
        question: 'Что будет напечатано и почему это важно?\n\nstatic String expensiveDefault() {\n  System.out.print("computing-");\n  return "default";\n}\n\nOptional<String> opt = Optional.of("value");\nSystem.out.println(opt.orElseGet(() -> expensiveDefault()));',
        options: [
          'value — orElseGet вызывает поставщика только если Optional пуст, поэтому expensiveDefault() никогда не выполняется',
          'computing-value — поставщик всегда выполняется до проверки Optional',
          'default — orElseGet игнорирует присутствующее значение Optional',
          'Ошибка компиляции — orElseGet требует аргумент String, а не лямбду',
        ],
        explanation:
          'orElseGet() принимает Supplier и вызывает его лениво, только если и когда Optional оказывается пустым — именно в этом его преимущество перед orElse(), который принимает уже вычисленное значение и поэтому всегда вычисляет свой аргумент энергично, независимо от того, присутствует ли Optional. Так как opt присутствует ("value"), orElseGet() вообще никогда не вызывает expensiveDefault(), поэтому "computing-" никогда не печатается, и вывод — просто "value". Эта ленивость важна всякий раз, когда запасное значение дорого вычислять (обращение к базе данных, сетевой запрос) — использование orElse() там впустую тратило бы эту работу, даже когда Optional уже имеет значение.',
      },
    },
    {
      q: 'What is printed?\n\nList<Integer> nums = List.of(1, 2, 3, 4);\nint product = nums.stream().reduce(1, (a, b) -> a * b);\nSystem.out.println(product);',
      options: ['24', '10', '0', '4'],
      correct: [0],
      explanation:
        'reduce(identity, accumulator) starts with the identity value (1) and repeatedly applies the accumulator function, folding each stream element into a running result: 1*1=1, 1*2=2, 2*3=6, 6*4=24. The identity value must be one that doesn\'t change the result when combined with any element (1 for multiplication, 0 for addition), which is why it\'s called the identity — it also safely defines the result for an empty stream. Final product: 24.',
      ru: {
        question: 'Что будет напечатано?\n\nList<Integer> nums = List.of(1, 2, 3, 4);\nint product = nums.stream().reduce(1, (a, b) -> a * b);\nSystem.out.println(product);',
        options: ['24', '10', '0', '4'],
        explanation:
          'reduce(identity, accumulator) начинает со значения identity (1) и многократно применяет функцию-аккумулятор, сворачивая каждый элемент стрима в накопленный результат: 1*1=1, 1*2=2, 2*3=6, 6*4=24. Значение identity должно быть таким, чтобы не менять результат при объединении с любым элементом (1 для умножения, 0 для сложения), поэтому оно и называется "identity" — оно также безопасно определяет результат для пустого стрима. Итоговое произведение: 24.',
      },
    },
    {
      q: 'What is wrong with this code?\n\nint total = 0;\nRunnable r = () -> System.out.println(total);\ntotal = 5;\nr.run();',
      options: [
        'Compilation error — total is used in the lambda but reassigned afterward, so it is not effectively final',
        'It compiles and prints 5',
        'It compiles and prints 0',
        'It compiles but throws an exception when r.run() is called',
      ],
      correct: [0],
      explanation:
        'A lambda expression can only capture local variables that are "effectively final" — meaning the variable is never reassigned anywhere after its initial assignment, even outside the lambda itself. Here `total` is reassigned to 5 after the lambda is defined but before it captured anything meaningful is invoked, which disqualifies it from being effectively final, and the compiler rejects the whole thing at the point of capture with a compilation error, rather than letting the lambda silently observe either the old or new value. This restriction exists because a lambda might outlive the method\'s stack frame (e.g. passed to another thread), so Java captures local variables by value/reference-to-a-final-value rather than by live reference, and effective finality is what makes that safe and unambiguous.',
      ru: {
        question: 'Что не так с этим кодом?\n\nint total = 0;\nRunnable r = () -> System.out.println(total);\ntotal = 5;\nr.run();',
        options: [
          'Ошибка компиляции — total используется в лямбде, но переприсваивается после, поэтому она не effectively final',
          'Компилируется и печатает 5',
          'Компилируется и печатает 0',
          'Компилируется, но бросает исключение при вызове r.run()',
        ],
        explanation:
          'Лямбда-выражение может захватывать только локальные переменные, которые "effectively final" — то есть переменная никогда не переприсваивается нигде после своего начального присваивания, даже вне самой лямбды. Здесь total переприсваивается в 5 после определения лямбды, но до того, как что-то осмысленное с захватом было вызвано, что лишает её статуса effectively final, и компилятор отклоняет всё это в точке захвата с ошибкой компиляции, а не позволяет лямбде молча наблюдать либо старое, либо новое значение. Это ограничение существует потому, что лямбда может пережить фрейм стека метода (например, будучи переданной в другой поток), поэтому Java захватывает локальные переменные по значению/ссылке-на-финальное-значение, а не по живой ссылке, и именно effective finality делает это безопасным и однозначным.',
      },
    },
  ],

  'java17-packaging-jshell': [
    {
      q: 'You run `java -jar app.jar` and get: "no main manifest attribute, in app.jar". What is the most likely cause?',
      options: [
        'The JAR\'s META-INF/MANIFEST.MF file is missing a Main-Class entry pointing to the class with the main() method',
        'The JAR file is corrupted and must be rebuilt from scratch',
        'The class files inside the JAR were compiled with an incompatible Java version',
        'JAR files can never be run directly; they must always be added to the classpath instead',
      ],
      correct: [0],
      explanation:
        '`java -jar` specifically requires the JAR\'s manifest (META-INF/MANIFEST.MF) to declare a `Main-Class` attribute naming the fully-qualified class containing the entry-point main() method — without it, the JVM has no way to know which class to start from, and it fails with exactly this "no main manifest attribute" message rather than guessing. This is commonly fixed by specifying the main class when building the JAR (e.g. via the build tool\'s manifest configuration, or `jar --create --main-class=...` when building it manually) — it\'s unrelated to corruption or Java version mismatches, which would produce different errors.',
      ru: {
        question: 'Вы запускаете `java -jar app.jar` и получаете: "no main manifest attribute, in app.jar". Какова наиболее вероятная причина?',
        options: [
          'В файле META-INF/MANIFEST.MF JAR-файла отсутствует запись Main-Class, указывающая на класс с методом main()',
          'JAR-файл повреждён и его нужно пересобрать с нуля',
          'Файлы классов внутри JAR были скомпилированы несовместимой версией Java',
          'JAR-файлы никогда нельзя запускать напрямую; их всегда нужно добавлять в classpath вместо этого',
        ],
        explanation:
          '`java -jar` конкретно требует, чтобы манифест JAR-файла (META-INF/MANIFEST.MF) объявлял атрибут `Main-Class`, называющий полностью квалифицированный класс, содержащий точку входа — метод main() — без него у JVM нет способа узнать, с какого класса стартовать, и она завершается с ошибкой именно "no main manifest attribute", а не угадывает. Это обычно исправляется указанием главного класса при сборке JAR (например, через настройку манифеста в инструменте сборки, или `jar --create --main-class=...` при ручной сборке) — это не связано с повреждением или несовместимостью версий Java, которые дали бы другие ошибки.',
      },
    },
    {
      q: 'In a JShell session, you type:\n\njshell> 10 + 5\n\nWhat happens?',
      options: [
        'JShell evaluates the expression, prints the result, and implicitly assigns it to a scratch variable like $1 for later reuse',
        'A compilation error occurs because the expression is not assigned to a variable',
        'JShell silently discards the result without printing anything',
        'JShell requires every statement to end with a semicolon or it refuses to run',
      ],
      correct: [0],
      explanation:
        'JShell (the Java REPL, introduced in Java 9) is specifically designed for exploratory, low-ceremony evaluation: a bare expression like `10 + 5` doesn\'t need a trailing semicolon or an explicit variable declaration — JShell evaluates it, prints both the inferred type and the value (e.g. `$1 ==> 15`), and automatically creates a numbered scratch variable ($1, $2, ...) holding that result so it can be referenced in later commands within the same session. This convenience is one of JShell\'s main selling points for quickly trying out snippets of code without the ceremony a full class/method/compile cycle would normally require.',
      ru: {
        question: 'В сессии JShell вы вводите:\n\njshell> 10 + 5\n\nЧто произойдёт?',
        options: [
          'JShell вычисляет выражение, печатает результат и неявно присваивает его вспомогательной переменной вроде $1 для последующего использования',
          'Происходит ошибка компиляции, потому что выражение не присвоено переменной',
          'JShell молча отбрасывает результат, ничего не печатая',
          'JShell требует, чтобы каждый оператор заканчивался точкой с запятой, иначе отказывается выполнять',
        ],
        explanation:
          'JShell (REPL для Java, появившийся в Java 9) специально спроектирован для исследовательского, малоформального вычисления: голое выражение вроде `10 + 5` не нуждается в завершающей точке с запятой или явном объявлении переменной — JShell вычисляет его, печатает как выведенный тип, так и значение (например, `$1 ==> 15`), и автоматически создаёт нумерованную вспомогательную переменную ($1, $2, ...), хранящую этот результат, чтобы на него можно было ссылаться в последующих командах той же сессии. Это удобство — одно из главных преимуществ JShell для быстрого опробования фрагментов кода без формальностей, которые обычно требует полный цикл класс/метод/компиляция.',
      },
    },
    {
      q: 'What does `java Greeting.java` do, without a separate `javac` step first (assuming Greeting.java contains a valid class with a main method)?',
      options: [
        'Compiles and runs the single source file in one step — a convenience introduced for launching simple, single-file programs',
        'Nothing — java can only execute already-compiled .class files',
        'It compiles the file to Greeting.class but does not run it',
        'It only works if the file is named exactly Main.java',
      ],
      correct: [0],
      explanation:
        'Since JEP 330 (Java 11), the `java` launcher can run a single source file directly — `java Greeting.java` compiles the file in memory and immediately executes it, without producing a separate .class file on disk or requiring an explicit `javac` invocation first. This is meant for quick scripts, small utilities, and learning scenarios rather than production deployment; it works for any correctly-named source file with a valid main() method, not specifically one named Main.java, and it still requires the class name inside the file to be consistent with normal Java rules (though the file name itself is more flexible than the classic public-class-must-match-filename rule for this specific single-file launch mode).',
      ru: {
        question: 'Что делает `java Greeting.java` без отдельного предварительного шага `javac` (при условии, что Greeting.java содержит валидный класс с методом main)?',
        options: [
          'Компилирует и запускает единственный файл с исходным кодом за один шаг — удобство, введённое для запуска простых однофайловых программ',
          'Ничего — java может выполнять только уже скомпилированные .class файлы',
          'Компилирует файл в Greeting.class, но не запускает его',
          'Работает, только если файл назван точно Main.java',
        ],
        explanation:
          'Начиная с JEP 330 (Java 11), запускатель `java` может запускать один файл с исходным кодом напрямую — `java Greeting.java` компилирует файл в памяти и немедленно выполняет его, не создавая отдельный .class файл на диске и не требуя явного предварительного вызова `javac`. Это предназначено для быстрых скриптов, небольших утилит и учебных сценариев, а не для продакшн-деплоя; это работает для любого корректно названного файла с исходным кодом с валидным методом main(), а не конкретно названного Main.java, и по-прежнему требует, чтобы имя класса внутри файла соответствовало обычным правилам Java (хотя само имя файла более гибкое, чем классическое правило "публичный класс должен совпадать с именем файла" именно для этого однофайлового режима запуска).',
      },
    },
  ],

  'java17-concurrency': [
    {
      q: 'What is the key difference between ExecutorService.submit() and ExecutorService.execute()?',
      options: [
        'submit() returns a Future that can be used to retrieve a result or check for exceptions; execute() returns void and any exception thrown escapes to the thread\'s uncaught exception handler',
        'execute() runs the task on the calling thread; submit() always creates a brand-new thread',
        'submit() can only accept Runnable tasks; execute() can only accept Callable tasks',
        'There is no real difference; they are aliases for the same operation',
      ],
      correct: [0],
      explanation:
        'Both methods schedule a task for execution on the executor\'s thread pool, but submit() (which accepts Runnable or Callable) returns a Future representing the pending result — letting the caller later call .get() to retrieve a Callable\'s return value (or block until a Runnable completes) and to discover any exception the task threw, wrapped in an ExecutionException. execute() (inherited from the plain Executor interface, accepting only Runnable) returns nothing at all, so there\'s no way to observe completion or catch a thrown exception through the API — an uncaught exception in an execute()\'d task instead propagates to the pool thread\'s default uncaught exception handler, typically just logging a stack trace with no way for the submitting code to react to it.',
      ru: {
        question: 'В чём ключевое различие между ExecutorService.submit() и ExecutorService.execute()?',
        options: [
          'submit() возвращает Future, который можно использовать для получения результата или проверки исключений; execute() возвращает void, и любое брошенное исключение уходит в обработчик неперехваченных исключений потока',
          'execute() выполняет задачу в вызывающем потоке; submit() всегда создаёт совершенно новый поток',
          'submit() может принимать только задачи Runnable; execute() может принимать только задачи Callable',
          'Реальной разницы нет; это псевдонимы одной и той же операции',
        ],
        explanation:
          'Оба метода планируют задачу на выполнение в пуле потоков исполнителя, но submit() (принимающий Runnable или Callable) возвращает Future, представляющий ожидающий результат — позволяя вызывающему коду позже вызвать .get(), чтобы получить возвращаемое значение Callable (или заблокироваться до завершения Runnable) и узнать о любом исключении, брошенном задачей, обёрнутом в ExecutionException. execute() (унаследованный от простого интерфейса Executor, принимающий только Runnable) вообще ничего не возвращает, поэтому нет способа отследить завершение или перехватить брошенное исключение через API — неперехваченное исключение в задаче, переданной через execute(), вместо этого распространяется в обработчик неперехваченных исключений потока пула по умолчанию, обычно просто логируя стек вызовов без возможности для вызывающего кода как-то на это отреагировать.',
      },
    },
    {
      q: 'What is printed?\n\nclass Counter {\n  private int count = 0;\n  public synchronized void increment() { count++; }\n  public synchronized int get() { return count; }\n}\n\nCounter c = new Counter();\nRunnable task = () -> { for (int i = 0; i < 1000; i++) c.increment(); };\nThread t1 = new Thread(task);\nThread t2 = new Thread(task);\nt1.start(); t2.start();\nt1.join(); t2.join();\nSystem.out.println(c.get());',
      options: ['2000', 'A value less than or equal to 2000, possibly less', '1000', '0'],
      correct: [0],
      explanation:
        'Marking both increment() and get() as `synchronized` means each call acquires the monitor lock on the same Counter instance before running, so the read-modify-write sequence inside increment() can never be interrupted by another thread\'s call to increment() on the same object — this eliminates the race condition that an unsynchronized `count++` would have. With two threads each calling increment() exactly 1000 times, and join() ensuring the main thread waits for both to fully finish before reading the result, the final count is deterministically 2000 every time this runs, not just "usually" close to it.',
      ru: {
        question: 'Что будет напечатано?\n\nclass Counter {\n  private int count = 0;\n  public synchronized void increment() { count++; }\n  public synchronized int get() { return count; }\n}\n\nCounter c = new Counter();\nRunnable task = () -> { for (int i = 0; i < 1000; i++) c.increment(); };\nThread t1 = new Thread(task);\nThread t2 = new Thread(task);\nt1.start(); t2.start();\nt1.join(); t2.join();\nSystem.out.println(c.get());',
        options: ['2000', 'Значение меньше либо равное 2000, возможно меньше', '1000', '0'],
        explanation:
          'Пометка и increment(), и get() как `synchronized` означает, что каждый вызов захватывает монитор-блокировку одного и того же экземпляра Counter перед выполнением, поэтому последовательность чтение-изменение-запись внутри increment() никогда не может быть прервана вызовом increment() из другого потока на этом же объекте — это устраняет состояние гонки, которое было бы у несинхронизированного `count++`. При двух потоках, каждый из которых вызывает increment() ровно 1000 раз, и join(), гарантирующем, что главный поток дождётся полного завершения обоих перед чтением результата, итоговый count детерминированно равен 2000 при каждом запуске, а не просто "обычно" близок к этому.',
      },
    },
    {
      q: 'What is printed?\n\nCompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> 10)\n  .thenApply(x -> x * 2)\n  .thenApply(x -> x + 5);\nSystem.out.println(future.get());',
      options: ['25', '20', '10', '15'],
      correct: [0],
      explanation:
        'CompletableFuture chains transformations declaratively: supplyAsync(() -> 10) starts an asynchronous computation producing 10; the first thenApply(x -> x * 2) runs once that completes, producing 20; the second thenApply(x -> x + 5) then runs on that result, producing 25. .get() blocks the calling thread until the whole chain has finished and returns the final value, 25. Each thenApply() stage only receives the previous stage\'s result and runs after it completes, forming a pipeline similar in spirit to Stream\'s map(), but for asynchronous, potentially-not-yet-computed values.',
      ru: {
        question: 'Что будет напечатано?\n\nCompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> 10)\n  .thenApply(x -> x * 2)\n  .thenApply(x -> x + 5);\nSystem.out.println(future.get());',
        options: ['25', '20', '10', '15'],
        explanation:
          'CompletableFuture декларативно связывает преобразования в цепочку: supplyAsync(() -> 10) запускает асинхронное вычисление, дающее 10; первый thenApply(x -> x * 2) выполняется после его завершения, давая 20; второй thenApply(x -> x + 5) затем выполняется над этим результатом, давая 25. .get() блокирует вызывающий поток до завершения всей цепочки и возвращает итоговое значение, 25. Каждый этап thenApply() получает только результат предыдущего этапа и выполняется после его завершения, формируя конвейер, похожий по духу на map() у Stream, но для асинхронных, возможно ещё не вычисленных значений.',
      },
    },
    {
      q: 'Why must this code either catch or declare InterruptedException?\n\nvoid pause() {\n  Thread.sleep(1000);\n}',
      options: [
        'InterruptedException is a checked exception, and Thread.sleep() declares that it can throw it if the thread is interrupted while sleeping',
        'This is only required if the method runs on a background thread, not the main thread',
        'It is not actually required — this compiles as written',
        'InterruptedException is unchecked, but sleep() requires explicit handling by convention only',
      ],
      correct: [0],
      explanation:
        'Thread.sleep() is declared as `throws InterruptedException`, and InterruptedException extends Exception (not RuntimeException), making it a checked exception subject to the compiler\'s enforcement: any method calling sleep() without handling that exception must itself declare `throws InterruptedException` (or a broader checked supertype), or the code fails to compile. As written, pause() does neither, so this would not compile — the fix is to either wrap the call in try/catch or add `throws InterruptedException` to pause()\'s own signature. This requirement applies uniformly regardless of which thread the calling code happens to run on.',
      ru: {
        question: 'Почему этот код обязан либо перехватить, либо объявить InterruptedException?\n\nvoid pause() {\n  Thread.sleep(1000);\n}',
        options: [
          'InterruptedException — проверяемое исключение, и Thread.sleep() объявляет, что может его бросить, если поток прерван во время сна',
          'Это требуется, только если метод выполняется в фоновом потоке, а не в главном',
          'На самом деле это не требуется — это компилируется как написано',
          'InterruptedException непроверяемое, но sleep() требует явной обработки только по соглашению',
        ],
        explanation:
          'Thread.sleep() объявлен как `throws InterruptedException`, а InterruptedException расширяет Exception (не RuntimeException), делая его проверяемым исключением, подчиняющимся принуждению компилятора: любой метод, вызывающий sleep() без обработки этого исключения, обязан сам объявить `throws InterruptedException` (или более широкий проверяемый супертип), иначе код не скомпилируется. Как написано, pause() не делает ни того, ни другого, поэтому это не скомпилируется — исправление — либо обернуть вызов в try/catch, либо добавить `throws InterruptedException` в собственную сигнатуру pause(). Это требование действует одинаково независимо от того, в каком потоке выполняется вызывающий код.',
      },
    },
  ],

  'java17-io': [
    {
      q: 'What is printed, assuming data.txt contains exactly the line "hello"?\n\ntry (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {\n  String line = br.readLine();\n  System.out.println(line);\n  System.out.println(br.readLine());\n} catch (IOException e) {\n  System.out.println("error");\n}',
      options: ['hello\nnull', 'hello\nhello', 'hello\n(empty line)', 'error'],
      correct: [0],
      explanation:
        'BufferedReader.readLine() reads and returns one line of text at a time (without its line terminator), and returns `null` specifically to signal that the end of the stream has been reached — it does not throw an exception or return an empty string for that case. The file contains exactly one line, "hello", so the first readLine() returns "hello", and the second call, having nothing left to read, returns null, which println() renders as the text "null". Checking `while ((line = br.readLine()) != null)` is the standard idiom precisely because of this null-on-EOF contract.',
      ru: {
        question: 'Что будет напечатано, если data.txt содержит ровно строку "hello"?\n\ntry (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {\n  String line = br.readLine();\n  System.out.println(line);\n  System.out.println(br.readLine());\n} catch (IOException e) {\n  System.out.println("error");\n}',
        options: ['hello\nnull', 'hello\nhello', 'hello\n(пустая строка)', 'error'],
        explanation:
          'BufferedReader.readLine() читает и возвращает по одной строке текста за раз (без её терминатора строки) и возвращает именно `null`, чтобы сигнализировать о достижении конца потока — он не бросает исключение и не возвращает пустую строку в этом случае. Файл содержит ровно одну строку, "hello", поэтому первый readLine() возвращает "hello", а второй вызов, не имея больше что читать, возвращает null, который println() выводит как текст "null". Проверка `while ((line = br.readLine()) != null)` — стандартная идиома именно из-за этого контракта "null при EOF".',
      },
    },
    {
      q: 'What is the key practical difference between Files.readAllLines(path) and Files.lines(path)?',
      options: [
        'readAllLines() eagerly reads the whole file into a List<String> in memory; lines() returns a lazily-evaluated Stream<String> and should be used in a try-with-resources to ensure the underlying file handle is closed',
        'They behave identically; lines() is just a newer alias for readAllLines()',
        'readAllLines() only works on text files; lines() only works on binary files',
        'lines() eagerly reads the whole file into memory, while readAllLines() streams it lazily',
      ],
      correct: [0],
      explanation:
        'Files.readAllLines() reads the entire file content into memory upfront and returns a fully-populated List<String> — simple to use, but potentially problematic for very large files. Files.lines() instead returns a Stream<String> backed by a lazily-read file channel, only pulling in as much of the file as the stream pipeline actually consumes — well suited to processing large files without loading them entirely into memory, but because it holds an open file resource, it should be used inside a try-with-resources block (Stream implements AutoCloseable) to guarantee the underlying file handle gets released even if the pipeline is not fully consumed or an exception occurs partway through.',
      ru: {
        question: 'В чём ключевое практическое различие между Files.readAllLines(path) и Files.lines(path)?',
        options: [
          'readAllLines() энергично читает весь файл в память в List<String>; lines() возвращает лениво вычисляемый Stream<String> и должен использоваться в try-with-resources, чтобы гарантировать закрытие лежащего в основе файлового дескриптора',
          'Они ведут себя идентично; lines() — просто более новый псевдоним для readAllLines()',
          'readAllLines() работает только с текстовыми файлами; lines() — только с бинарными',
          'lines() энергично читает весь файл в память, а readAllLines() читает его лениво потоково',
        ],
        explanation:
          'Files.readAllLines() читает всё содержимое файла в память заранее и возвращает полностью заполненный List<String> — прост в использовании, но потенциально проблематичен для очень больших файлов. Files.lines() вместо этого возвращает Stream<String>, опирающийся на лениво читаемый файловый канал, подтягивая ровно столько файла, сколько реально потребляет конвейер стрима — хорошо подходит для обработки больших файлов без полной их загрузки в память, но поскольку он удерживает открытый файловый ресурс, его следует использовать внутри блока try-with-resources (Stream реализует AutoCloseable), чтобы гарантировать освобождение лежащего в основе файлового дескриптора, даже если конвейер не потреблён полностью или на середине возникло исключение.',
      },
    },
    {
      q: 'What is printed?\n\nPath base = Path.of("/home/user/docs");\nPath target = Path.of("/home/user/photos/pic.png");\nSystem.out.println(base.relativize(target));',
      options: ['../photos/pic.png', '/home/user/photos/pic.png', 'photos/pic.png', 'Throws IllegalArgumentException'],
      correct: [0],
      explanation:
        'relativize() computes the relative path needed to navigate from the base path to the target path — it does not simply strip a common prefix and assume the target is "underneath" the base. Both paths share the common ancestor "/home/user", but target is not inside base\'s directory ("docs"); reaching it from base requires stepping up one level out of "docs" (represented by "..") and then down into "photos", giving "../photos/pic.png". A common wrong guess assumes relativize() only ever produces a simple "descend into subdirectory" style path, forgetting it must also correctly express "step back up" navigation when the two paths diverge partway through.',
      ru: {
        question: 'Что будет напечатано?\n\nPath base = Path.of("/home/user/docs");\nPath target = Path.of("/home/user/photos/pic.png");\nSystem.out.println(base.relativize(target));',
        options: ['../photos/pic.png', '/home/user/photos/pic.png', 'photos/pic.png', 'Выбрасывает IllegalArgumentException'],
        explanation:
          'relativize() вычисляет относительный путь, необходимый для перехода от базового пути к целевому — он не просто отбрасывает общий префикс, предполагая, что цель находится "внутри" базового. Оба пути разделяют общего предка "/home/user", но target находится не внутри директории base ("docs"); чтобы достичь его от base, нужно подняться на один уровень вверх из "docs" (представлено как "..") и затем спуститься в "photos", давая "../photos/pic.png". Частая неверная догадка предполагает, что relativize() всегда даёт путь в стиле простого "спуска в поддиректорию", забывая, что он также должен корректно выражать навигацию "подняться назад", когда два пути расходятся на середине.',
      },
    },
    {
      q: 'What is printed?\n\nclass Session implements Serializable {\n  String username = "admin";\n  transient String password = "secret";\n}\n\n// Session is serialized to a byte array, then deserialized back into `restored`\nSession restored = /* deserialize */;\nSystem.out.println(restored.username + " " + restored.password);',
      options: ['admin null', 'admin secret', 'null null', 'Throws NotSerializableException'],
      correct: [0],
      explanation:
        'The `transient` keyword marks a field to be excluded from the default serialization process entirely — its value is simply not written to the serialized byte stream. When the object is deserialized, transient fields do not retain their original value; instead they are reset to their type\'s default (null for reference types, 0/false for primitives), regardless of what the field held before serialization. username (not transient) round-trips normally as "admin", while password (transient) comes back as null even though it was "secret" beforehand — a common technique for deliberately excluding sensitive or non-serializable fields (like a live database connection) from serialized output.',
      ru: {
        question: 'Что будет напечатано?\n\nclass Session implements Serializable {\n  String username = "admin";\n  transient String password = "secret";\n}\n\n// Session сериализуется в массив байт, затем десериализуется обратно в `restored`\nSession restored = /* десериализация */;\nSystem.out.println(restored.username + " " + restored.password);',
        options: ['admin null', 'admin secret', 'null null', 'Выбрасывает NotSerializableException'],
        explanation:
          'Ключевое слово `transient` помечает поле как полностью исключённое из процесса сериализации по умолчанию — его значение просто не записывается в сериализованный поток байт. При десериализации объекта transient-поля не сохраняют своё исходное значение; вместо этого они сбрасываются к значению по умолчанию для своего типа (null для ссылочных типов, 0/false для примитивов), независимо от того, что поле хранило до сериализации. username (не transient) проходит цикл нормально как "admin", а password (transient) возвращается как null, хотя до этого было "secret" — распространённый приём для намеренного исключения чувствительных или несериализуемых полей (например, живого соединения с базой данных) из сериализованного вывода.',
      },
    },
  ],

  'java17-jdbc': [
    {
      q: 'What is the idiomatic way to ensure a Connection, PreparedStatement, and ResultSet are all properly closed, even if an exception occurs?',
      options: [
        'Declare all three as resources in a single try-with-resources statement — they all implement AutoCloseable and close in reverse declaration order',
        'Call .close() on each one manually at the very end of the method, after the return statement',
        'Only the Connection needs to be closed; closing it automatically closes any Statements and ResultSets created from it',
        'JDBC resources are closed automatically by the garbage collector, so no explicit close() calls are needed',
      ],
      correct: [0],
      explanation:
        'Connection, Statement/PreparedStatement, and ResultSet all implement AutoCloseable, making them ideal candidates for try-with-resources — declaring `try (Connection c = ...; PreparedStatement ps = ...; ResultSet rs = ...) { ... }` guarantees all three get closed, in reverse order of declaration, once the block exits, whether normally or via an exception, without requiring a manual finally block. While closing a Connection typically does implicitly close Statements/ResultSets still open on it as a safety net, relying on that instead of closing each resource explicitly is considered poor practice and can leak resources longer than necessary in the meantime; relying on garbage collection to eventually close them is also unreliable, since GC timing is not guaranteed and JDBC resources often hold onto scarce external resources like database connections.',
      ru: {
        question: 'Каков идиоматичный способ гарантировать, что Connection, PreparedStatement и ResultSet все корректно закрыты, даже если произойдёт исключение?',
        options: [
          'Объявить все три как ресурсы в одном операторе try-with-resources — все они реализуют AutoCloseable и закрываются в обратном порядке объявления',
          'Вызвать .close() на каждом вручную в самом конце метода, после оператора return',
          'Нужно закрыть только Connection; его закрытие автоматически закрывает любые Statement и ResultSet, созданные из него',
          'Ресурсы JDBC закрываются автоматически сборщиком мусора, поэтому явные вызовы close() не нужны',
        ],
        explanation:
          'Connection, Statement/PreparedStatement и ResultSet все реализуют AutoCloseable, что делает их идеальными кандидатами для try-with-resources — объявление `try (Connection c = ...; PreparedStatement ps = ...; ResultSet rs = ...) { ... }` гарантирует, что все три будут закрыты, в обратном порядке объявления, как только блок завершится, штатно или через исключение, без необходимости в ручном блоке finally. Хотя закрытие Connection обычно неявно закрывает всё ещё открытые на нём Statement/ResultSet как страховочную сетку, полагаться на это вместо явного закрытия каждого ресурса считается плохой практикой и может тем временем дольше необходимого удерживать ресурсы; полагаться на сборку мусора для их итогового закрытия тоже ненадёжно, поскольку время сборки мусора не гарантировано, а ресурсы JDBC часто удерживают дефицитные внешние ресурсы вроде соединений с базой данных.',
      },
    },
    {
      q: 'What is wrong with this code?\n\nPreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ? AND active = ?");\nps.setInt(0, 42);\nps.setBoolean(1, true);',
      options: [
        'Parameter indices in PreparedStatement are 1-based, not 0-based — this should be setInt(1, 42) and setBoolean(2, true)',
        'setBoolean() does not exist on PreparedStatement; booleans must be set with setInt(1, 0)',
        'PreparedStatement parameters must all be set in a single call using setParameters()',
        'This code is correct as written',
      ],
      correct: [0],
      explanation:
        'JDBC\'s PreparedStatement parameter placeholders (the `?` markers) are indexed starting from 1, not 0, matching SQL\'s traditional 1-based conventions rather than Java\'s usual 0-based array/list indexing — a very common source of off-by-one bugs for developers used to 0-based indexing everywhere else in Java. Calling setInt(0, 42) targets a non-existent parameter index 0 and would throw an SQLException at runtime (typically something like "Invalid parameter index"). The corrected calls should be ps.setInt(1, 42) for the first `?` (id) and ps.setBoolean(2, true) for the second `?` (active).',
      ru: {
        question: 'Что не так с этим кодом?\n\nPreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ? AND active = ?");\nps.setInt(0, 42);\nps.setBoolean(1, true);',
        options: [
          'Индексы параметров в PreparedStatement начинаются с 1, а не с 0 — должно быть setInt(1, 42) и setBoolean(2, true)',
          'setBoolean() не существует у PreparedStatement; булевы значения нужно устанавливать через setInt(1, 0)',
          'Все параметры PreparedStatement нужно устанавливать одним вызовом через setParameters()',
          'Этот код корректен как написан',
        ],
        explanation:
          'Placeholder-параметры PreparedStatement в JDBC (маркеры `?`) индексируются начиная с 1, а не с 0, следуя традиционным SQL-соглашениям с индексацией от 1, а не обычной для Java индексации массивов/списков от 0 — очень частый источник ошибок off-by-one у разработчиков, привыкших к индексации от 0 везде в остальной Java. Вызов setInt(0, 42) нацелен на несуществующий индекс параметра 0 и выбросил бы SQLException во время выполнения (обычно что-то вроде "Invalid parameter index"). Исправленные вызовы должны быть ps.setInt(1, 42) для первого `?` (id) и ps.setBoolean(2, true) для второго `?` (active).',
      },
    },
    {
      q: 'What must happen before reading a column value from a freshly-executed ResultSet?\n\nResultSet rs = ps.executeQuery();\nString name = rs.getString("name"); // is this correct as-is?',
      options: [
        'rs.next() must be called first to move the cursor onto the first row — as written, the cursor is positioned before the first row and getString() would throw an SQLException',
        'This is correct as written; the cursor starts on the first row automatically',
        'getString() must always be called with a column index, never a column name',
        'ResultSet requires calling rs.first() instead of rs.next()',
      ],
      correct: [0],
      explanation:
        'A freshly-obtained ResultSet positions its cursor *before* the first row, not on it — this is a deliberate design choice so that a while-loop pattern (`while (rs.next()) { ... }`) works uniformly whether there are zero, one, or many rows, without special-casing the first iteration. Calling a getter like getString() before ever calling next() attempts to read from that "before the first row" position, which is invalid and throws an SQLException at runtime rather than silently reading the first row for you. The corrected usage calls rs.next() at least once (checking its boolean return value to confirm a row was actually found) before reading any column.',
      ru: {
        question: 'Что должно произойти перед чтением значения столбца из только что выполненного ResultSet?\n\nResultSet rs = ps.executeQuery();\nString name = rs.getString("name"); // это корректно как есть?',
        options: [
          'Сначала должен быть вызван rs.next(), чтобы переместить курсор на первую строку — как написано, курсор находится перед первой строкой, и getString() выбросит SQLException',
          'Это корректно как написано; курсор автоматически начинается на первой строке',
          'getString() всегда нужно вызывать с индексом столбца, никогда с именем столбца',
          'ResultSet требует вызова rs.first() вместо rs.next()',
        ],
        explanation:
          'Только что полученный ResultSet располагает свой курсор *перед* первой строкой, а не на ней — это намеренное проектное решение, чтобы паттерн цикла while (`while (rs.next()) { ... }`) работал единообразно независимо от того, ноль ли строк, одна или много, без специальной обработки первой итерации. Вызов геттера вроде getString() до какого-либо вызова next() пытается читать из этой позиции "перед первой строкой", что невалидно и выбрасывает SQLException во время выполнения, а не молча читает за вас первую строку. Исправленное использование вызывает rs.next() хотя бы один раз (проверяя его булево возвращаемое значение, чтобы подтвердить, что строка действительно найдена) перед чтением любого столбца.',
      },
    },
    {
      q: 'Why does this method signature include `throws SQLException`?\n\nvoid saveUser(Connection conn, String name) throws SQLException {\n  PreparedStatement ps = conn.prepareStatement("INSERT INTO users(name) VALUES (?)");\n  ps.setString(1, name);\n  ps.executeUpdate();\n}',
      options: [
        'SQLException is a checked exception, and JDBC methods like prepareStatement(), setString(), and executeUpdate() all declare that they can throw it',
        'It is unnecessary — SQLException is unchecked and this compiles fine without declaring it',
        'It is only required because the method is not static',
        'throws SQLException is required syntax for any method that uses a Connection object, regardless of what it does with it',
      ],
      correct: [0],
      explanation:
        'SQLException extends Exception directly, making it a checked exception — the JDBC API methods used here (Connection.prepareStatement(), PreparedStatement.setString() in some driver scenarios, and executeUpdate()) are all declared to potentially throw it, so any method calling them must either catch SQLException in a try/catch or declare `throws SQLException` itself to pass the obligation up to its own caller, exactly as saveUser() does here. This is the same checked-exception propagation rule that applies to any checked exception in Java, not something specific to Connection objects or non-static methods.',
      ru: {
        question: 'Почему эта сигнатура метода включает `throws SQLException`?\n\nvoid saveUser(Connection conn, String name) throws SQLException {\n  PreparedStatement ps = conn.prepareStatement("INSERT INTO users(name) VALUES (?)");\n  ps.setString(1, name);\n  ps.executeUpdate();\n}',
        options: [
          'SQLException — проверяемое исключение, и методы JDBC вроде prepareStatement(), setString() и executeUpdate() все объявляют, что могут его бросить',
          'Это не нужно — SQLException непроверяемое, и это компилируется нормально без его объявления',
          'Это требуется только потому, что метод не static',
          '`throws SQLException` — обязательный синтаксис для любого метода, использующего объект Connection, независимо от того, что он с ним делает',
        ],
        explanation:
          'SQLException напрямую расширяет Exception, делая его проверяемым исключением — используемые здесь методы JDBC API (Connection.prepareStatement(), в некоторых сценариях драйверов PreparedStatement.setString(), и executeUpdate()) все объявлены как потенциально бросающие его, поэтому любой метод, их вызывающий, обязан либо перехватить SQLException в try/catch, либо сам объявить `throws SQLException`, передав обязательство своему вызывающему коду, ровно как это делает здесь saveUser(). Это то же самое правило распространения проверяемых исключений, что применяется к любому проверяемому исключению в Java, а не что-то специфичное для объектов Connection или нестатических методов.',
      },
    },
  ],

  'java17-localization': [
    {
      q: 'Which is the modern (Java 19+... actually available since Java 21, but the equivalent Builder API works since Java 7) recommended way to construct a Locale for "German as spoken in Switzerland", and what does the older constructor-based equivalent look like?',
      options: [
        'new Locale.Builder().setLanguage("de").setRegion("CH").build() — equivalent to the older new Locale("de", "CH")',
        'new Locale("CH", "de") — region always comes before language in every constructor form',
        'Locale.forLanguageTag("CH-de") — language tags always place the region code first',
        'new Locale("de_CH") — a single underscore-joined string is the only valid modern form',
      ],
      correct: [0],
      explanation:
        'Locale.Builder provides a fluent, more explicit and typo-resistant way to construct a Locale by calling setLanguage(), setRegion(), and similar setters before build() — for German/Switzerland, that\'s setLanguage("de").setRegion("CH"), matching the classic constructor form new Locale("de", "CH"), where the language code always comes first and the (optional) country/region code second. forLanguageTag() uses BCP 47 tags like "de-CH" (hyphen-separated, language first), not "CH-de" — getting the order or separator wrong is a common source of confusion between the different Locale construction styles the exam tests understanding of.',
      ru: {
        question: 'Какой современный рекомендуемый способ построить Locale для "немецкого языка, на котором говорят в Швейцарии" (эквивалентный Builder API доступен начиная с Java 7), и как выглядит эквивалент через старый конструктор?',
        options: [
          'new Locale.Builder().setLanguage("de").setRegion("CH").build() — эквивалентно старому new Locale("de", "CH")',
          'new Locale("CH", "de") — регион всегда идёт перед языком в любой форме конструктора',
          'Locale.forLanguageTag("CH-de") — языковые теги всегда ставят код региона первым',
          'new Locale("de_CH") — единственная валидная современная форма — строка, объединённая через подчёркивание',
        ],
        explanation:
          'Locale.Builder предоставляет гибкий, более явный и устойчивый к опечаткам способ построить Locale, вызывая setLanguage(), setRegion() и подобные сеттеры перед build() — для немецкого/Швейцарии это setLanguage("de").setRegion("CH"), соответствующее классической форме конструктора new Locale("de", "CH"), где код языка всегда идёт первым, а (необязательный) код страны/региона — вторым. forLanguageTag() использует теги BCP 47 вроде "de-CH" (через дефис, язык первым), а не "CH-de" — перепутать порядок или разделитель — частый источник путаницы между разными стилями построения Locale, понимание которых проверяет экзамен.',
      },
    },
    {
      q: 'A properties file Messages_fr.properties exists but has no entry for the key "farewell", while Messages.properties (the default bundle, no locale suffix) does have it. What happens when you call `ResourceBundle.getBundle("Messages", Locale.FRENCH).getString("farewell")`?',
      options: [
        'It falls back to the default bundle (Messages.properties) and returns its value for "farewell", rather than throwing an exception',
        'It throws MissingResourceException immediately, since the French bundle is missing that key',
        'It returns an empty string for any key missing from the requested locale\'s bundle',
        'It returns the literal string "farewell" unchanged',
      ],
      correct: [0],
      explanation:
        'ResourceBundle resolution follows a fallback chain: it looks for the most specific matching bundle for the requested locale first (Messages_fr.properties here), but if a particular key is missing from that specific bundle, it falls back to progressively less-specific bundles — ultimately the base/default bundle with no locale suffix at all (Messages.properties) — before giving up. Since "farewell" is missing from Messages_fr.properties but present in Messages.properties, getString("farewall") successfully returns the default bundle\'s value rather than failing; MissingResourceException is only thrown if the key is absent from every bundle in the entire fallback chain, including the default.',
      ru: {
        question: 'Существует файл свойств Messages_fr.properties, но в нём нет записи для ключа "farewell", тогда как в Messages.properties (базовый бандл без суффикса локали) она есть. Что произойдёт при вызове `ResourceBundle.getBundle("Messages", Locale.FRENCH).getString("farewell")`?',
        options: [
          'Происходит откат к базовому бандлу (Messages.properties), и возвращается его значение для "farewell", вместо выбрасывания исключения',
          'Немедленно выбрасывается MissingResourceException, так как во французском бандле этот ключ отсутствует',
          'Возвращается пустая строка для любого ключа, отсутствующего в бандле запрошенной локали',
          'Возвращается буквальная строка "farewell" без изменений',
        ],
        explanation:
          'Разрешение ResourceBundle следует цепочке отката: сначала ищется наиболее конкретный подходящий бандл для запрошенной локали (здесь Messages_fr.properties), но если конкретный ключ отсутствует в этом конкретном бандле, происходит откат к постепенно менее конкретным бандлам — в итоге к базовому/дефолтному бандлу вообще без суффикса локали (Messages.properties) — прежде чем сдаться. Так как "farewell" отсутствует в Messages_fr.properties, но присутствует в Messages.properties, getString("farewell") успешно возвращает значение базового бандла, а не проваливается; MissingResourceException выбрасывается только если ключ отсутствует во всех бандлах всей цепочки отката, включая базовый.',
      },
    },
    {
      q: 'What is printed?\n\nNumberFormat usFormat = NumberFormat.getInstance(Locale.US);\nNumberFormat deFormat = NumberFormat.getInstance(Locale.GERMANY);\nSystem.out.println(usFormat.format(1234.5));\nSystem.out.println(deFormat.format(1234.5));',
      options: ['1,234.5\n1.234,5', '1234.5\n1234,5', '1,234.5\n1,234.5', '1.234,5\n1,234.5'],
      correct: [0],
      explanation:
        'NumberFormat.getInstance(locale) returns a formatter that applies locale-specific conventions for grouping and decimal separators — it is precisely this locale-sensitivity that is the whole point of using NumberFormat instead of manually building a numeric string. US English convention uses a comma as the thousands-grouping separator and a period as the decimal separator, formatting 1234.5 as "1,234.5". German convention swaps these roles — a period groups thousands and a comma marks the decimal — formatting the same number as "1.234,5". Getting these two conventions backward (or assuming a single universal format) is a classic mistake this topic tests.',
      ru: {
        question: 'Что будет напечатано?\n\nNumberFormat usFormat = NumberFormat.getInstance(Locale.US);\nNumberFormat deFormat = NumberFormat.getInstance(Locale.GERMANY);\nSystem.out.println(usFormat.format(1234.5));\nSystem.out.println(deFormat.format(1234.5));',
        options: ['1,234.5\n1.234,5', '1234.5\n1234,5', '1,234.5\n1,234.5', '1.234,5\n1,234.5'],
        explanation:
          'NumberFormat.getInstance(locale) возвращает форматтер, применяющий специфичные для локали соглашения для разделителей группировки и десятичного разделителя — именно эта чувствительность к локали и есть весь смысл использования NumberFormat вместо ручного построения числовой строки. Американское соглашение использует запятую как разделитель группировки тысяч и точку как десятичный разделитель, форматируя 1234.5 как "1,234.5". Немецкое соглашение меняет эти роли местами — точка группирует тысячи, а запятая обозначает дробную часть — форматируя то же число как "1.234,5". Перепутать эти два соглашения местами (или предположить единый универсальный формат) — классическая ошибка, которую проверяет эта тема.',
      },
    },
    {
      q: 'What is printed (assuming the JVM default locale is Locale.US)?\n\nLocalDate date = LocalDate.of(2024, 3, 15);\nDateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).withLocale(Locale.FRANCE);\nSystem.out.println(date.format(formatter));',
      options: [
        '15 mars 2024 — the formatter uses the explicitly-set France locale, not the JVM default',
        'Mar 15, 2024 — formatting always follows the JVM\'s default locale regardless of withLocale()',
        '2024-03-15 — ofLocalizedDate always produces ISO format',
        'Throws DateTimeException — FormatStyle.MEDIUM is incompatible with non-English locales',
      ],
      correct: [0],
      explanation:
        'DateTimeFormatter.ofLocalizedDate(style) creates a formatter whose date pattern is resolved according to whatever locale is in effect for it, and .withLocale(Locale.FRANCE) explicitly overrides that formatter\'s locale to French, independent of whatever the JVM\'s own default locale happens to be set to. For MEDIUM style in French convention, March 15, 2024 renders as "15 mars 2024" (day, then localized month name, then year) — completely different both in language and field order from the US MEDIUM style ("Mar 15, 2024"). Explicitly setting a formatter\'s locale like this is exactly how an application displays dates correctly for a specific user\'s locale rather than always the server/JVM\'s default.',
      ru: {
        question: 'Что будет напечатано (при условии, что локаль JVM по умолчанию — Locale.US)?\n\nLocalDate date = LocalDate.of(2024, 3, 15);\nDateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM).withLocale(Locale.FRANCE);\nSystem.out.println(date.format(formatter));',
        options: [
          '15 mars 2024 — форматтер использует явно установленную локаль Франции, а не локаль JVM по умолчанию',
          'Mar 15, 2024 — форматирование всегда следует локали JVM по умолчанию, независимо от withLocale()',
          '2024-03-15 — ofLocalizedDate всегда даёт формат ISO',
          'Выбрасывает DateTimeException — FormatStyle.MEDIUM несовместим с неанглийскими локалями',
        ],
        explanation:
          'DateTimeFormatter.ofLocalizedDate(style) создаёт форматтер, чей шаблон даты разрешается согласно тому, какая локаль для него действует, а .withLocale(Locale.FRANCE) явно переопределяет локаль этого форматтера на французскую, независимо от того, на что установлена собственная локаль JVM по умолчанию. Для стиля MEDIUM во французском соглашении 15 марта 2024 отображается как "15 mars 2024" (день, затем локализованное название месяца, затем год) — совершенно иначе и по языку, и по порядку полей, чем американский стиль MEDIUM ("Mar 15, 2024"). Явная установка локали форматтера именно так и позволяет приложению корректно отображать даты для локали конкретного пользователя, а не всегда локали сервера/JVM по умолчанию.',
      },
    },
  ],
}

export const java17Questions = Object.entries(raw).flatMap(([topic, items]) =>
  items.map((item, i) => ({
    id: `java17-${topic}-${i + 1}`,
    section: 'OCP17',
    topic,
    question: item.q,
    options: item.options,
    correct: item.correct,
    explanation: item.explanation,
    ru: item.ru,
    variantGroup: item.variantGroup,
  }))
)
