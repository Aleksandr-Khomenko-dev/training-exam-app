// Pure code-reading practice: predict the output / spot the bug / pick the fix.
// Split into two difficulty tiers so algorithmic/code-reading intuition can be built up gradually.
// Some questions have more than one correct answer ("Choose two").

export const codeTopics = [
  { slug: 'junior-code', title: 'Junior Level', titleRu: 'Уровень Junior' },
  { slug: 'middle-code', title: 'Middle Level', titleRu: 'Уровень Middle' },
  { slug: 'leetcode-easy', title: 'Algorithms — Easy', titleRu: 'Алгоритмы — Easy' },
  { slug: 'leetcode-medium', title: 'Algorithms — Medium', titleRu: 'Алгоритмы — Medium' },
  { slug: 'leetcode-hard', title: 'Algorithms — Hard', titleRu: 'Алгоритмы — Hard' },
]

// Original questions inspired by well-known, publicly-documented algorithm patterns commonly
// practiced on competitive-coding sites (two pointers, sliding window, DP, graph traversal, etc.).
// These are generic, decades-old CS problems (Two Sum, LRU Cache, N-Queens, ...) — every question
// text, code snippet, option set, and explanation below is written from scratch, not copied from
// any site. Difficulty tiers loosely mirror the Easy/Medium/Hard convention used by LeetCode so the
// numbering here maps onto that flow once the reader moves on to solving real problems there.

const raw = {
  'junior-code': [
    {
      q: 'What is printed?\n\nint x = 5;\nint y = x++ + ++x;\nSystem.out.println(y);',
      options: ['12', '11', '13', '10'],
      correct: [0],
      explanation:
        'Java evaluates the left operand of + before the right one. x++ (postfix) is evaluated first: it yields the current value, 5, as the expression\'s result, and only afterward increments x to 6 as a side effect. Then ++x (prefix) is evaluated: it increments x first, to 7, and yields that new value, 7, as the result. Adding the two results together, 5 + 7, gives y the value 12. The key distinction to internalize is that postfix ++ "returns old, then increments" while prefix ++ "increments, then returns new" — mixing both in one expression is a classic exam trap precisely because it tests whether you track that ordering correctly.',
      ru: {
        question: 'Что будет напечатано?\n\nint x = 5;\nint y = x++ + ++x;\nSystem.out.println(y);',
        options: ['12', '11', '13', '10'],
        explanation:
          'Java вычисляет левый операнд + раньше правого. x++ (постфиксный) вычисляется первым: он даёт текущее значение, 5, как результат выражения, и только после этого увеличивает x до 6 как побочный эффект. Затем вычисляется ++x (префиксный): он сначала увеличивает x до 7, и даёт это новое значение, 7, как результат. Сложив два результата, 5 + 7, получаем y равное 12. Ключевое отличие, которое стоит усвоить: постфиксный ++ "возвращает старое, потом увеличивает", а префиксный ++ "увеличивает, потом возвращает новое" — смешивание обоих в одном выражении классическая ловушка на экзамене именно потому, что проверяет, правильно ли вы отслеживаете этот порядок.',
      },
    },
    {
      q: 'What is printed?\n\nfor (int i = 0; i < 5; i++) {\n  if (i == 3) break;\n  System.out.print(i);\n}',
      options: ['012', '0123', '01234', '03'],
      correct: [0],
      explanation:
        'The if check for i == 3 sits before the print statement in the loop body, and break exits the entire loop immediately, skipping any statements after it in the same iteration — including that iteration\'s print call. Tracing it: i=0 prints "0", i=1 prints "1", i=2 prints "2", then i=3 triggers the if, hits break, and the loop ends immediately without ever reaching the print statement for that iteration. The digit 3 is therefore never printed, and neither is anything after it, leaving the output "012".',
      ru: {
        question: 'Что будет напечатано?\n\nfor (int i = 0; i < 5; i++) {\n  if (i == 3) break;\n  System.out.print(i);\n}',
        options: ['012', '0123', '01234', '03'],
        explanation:
          'Проверка if для i == 3 стоит в теле цикла перед оператором печати, а break немедленно выходит из всего цикла, пропуская любые операторы после себя в той же итерации — включая вызов печати этой итерации. Трассировка: i=0 печатает "0", i=1 печатает "1", i=2 печатает "2", затем i=3 срабатывает if, доходит до break, и цикл немедленно завершается, так и не дойдя до оператора печати для этой итерации. Цифра 3 поэтому никогда не печатается, как и всё после неё, оставляя вывод "012".',
      },
    },
    {
      q: 'What is printed?\n\nint[] arr = {10, 20, 30};\nfor (int n : arr) {\n  n = n * 2;\n}\nSystem.out.println(arr[0]);',
      options: ['10', '20', '30', 'Compilation error'],
      correct: [0],
      explanation:
        'In a for-each loop over primitives, the loop variable n is a fresh local copy of each element\'s value, created anew on every iteration — it is not a live reference back into the array\'s storage. Reassigning n inside the loop body only changes that temporary local copy and has absolutely no effect on the array itself, which remains exactly as it was created. Printing arr[0] afterward therefore still shows the original value, 10, completely untouched by the loop that ran.',
      ru: {
        question: 'Что будет напечатано?\n\nint[] arr = {10, 20, 30};\nfor (int n : arr) {\n  n = n * 2;\n}\nSystem.out.println(arr[0]);',
        options: ['10', '20', '30', 'Ошибка компиляции'],
        explanation:
          'В цикле for-each по примитивам переменная цикла n — это свежая локальная копия значения каждого элемента, создаваемая заново на каждой итерации — она не является живой ссылкой обратно в хранилище массива. Переприсваивание n внутри тела цикла меняет только эту временную локальную копию и совершенно не влияет на сам массив, который остаётся именно таким, каким был создан. Печать arr[0] после этого по-прежнему показывает исходное значение, 10, полностью не тронутое выполнившимся циклом.',
      },
    },
    {
      q: 'What is printed?\n\nString s = "abc";\ns.concat("def");\nSystem.out.println(s);',
      options: ['abc', 'abcdef', 'def', 'Compilation error'],
      correct: [0],
      explanation:
        'concat() does not modify the String it is called on — String is immutable, so no method on it ever can. Instead, concat() computes and returns a brand-new String containing the combined text, "abcdef", but that returned value is simply discarded here because the code never assigns it to anything (`s.concat("def");` on its own line, with no `s = ` in front of it). The variable s therefore still refers to the exact same original object it always did, "abc", which is what gets printed.',
      ru: {
        question: 'Что будет напечатано?\n\nString s = "abc";\ns.concat("def");\nSystem.out.println(s);',
        options: ['abc', 'abcdef', 'def', 'Ошибка компиляции'],
        explanation:
          'concat() не изменяет String, у которого он вызван — String неизменяем, поэтому ни один его метод не может этого сделать. Вместо этого concat() вычисляет и возвращает совершенно новую строку с объединённым текстом, "abcdef", но это возвращаемое значение здесь просто отбрасывается, потому что код никуда его не присваивает (`s.concat("def");` отдельной строкой, без `s = ` перед ним). Переменная s поэтому по-прежнему ссылается ровно на тот же исходный объект, что и всегда, "abc", который и печатается.',
      },
    },
    {
      q: 'What is printed?\n\nstatic int square(int n) {\n  return n * n;\n}\n\nSystem.out.println(square(4) + square(-3));',
      options: ['25', '7', '-25', '1'],
      correct: [0],
      explanation:
        'square(4) computes 4 * 4 = 16. square(-3) computes (-3) * (-3) = 9 — multiplying two negative numbers together produces a positive result, a basic arithmetic fact that is easy to second-guess under exam pressure. Adding the two return values together, 16 + 9, gives 25.',
      ru: {
        question: 'Что будет напечатано?\n\nstatic int square(int n) {\n  return n * n;\n}\n\nSystem.out.println(square(4) + square(-3));',
        options: ['25', '7', '-25', '1'],
        explanation:
          'square(4) вычисляет 4 * 4 = 16. square(-3) вычисляет (-3) * (-3) = 9 — умножение двух отрицательных чисел даёт положительный результат, базовый арифметический факт, в котором легко засомневаться под давлением на экзамене. Сложив два возвращённых значения, 16 + 9, получаем 25.',
      },
    },
    {
      q: 'What is printed?\n\nboolean flag = false;\nif (flag = true) {\n  System.out.println("yes");\n} else {\n  System.out.println("no");\n}',
      options: ['yes', 'no', 'Compilation error', 'Runtime exception'],
      correct: [0],
      explanation:
        'flag = true, with a single equals sign, is an assignment expression, not a comparison — it assigns true to flag and, as an expression, also evaluates to the value that was assigned, true. Since flag is declared boolean, the assignment expression\'s type is boolean, which is exactly the type an if condition requires, so this compiles perfectly (unlike C, where an accidental = instead of == in an if often silently compiles too, but with int semantics; Java\'s stricter boolean requirement would actually catch this mistake at compile time if the variable were not already boolean). Since the condition evaluates to true, "yes" is printed.',
      ru: {
        question: 'Что будет напечатано?\n\nboolean flag = false;\nif (flag = true) {\n  System.out.println("yes");\n} else {\n  System.out.println("no");\n}',
        options: ['yes', 'no', 'Ошибка компиляции', 'Исключение времени выполнения'],
        explanation:
          'flag = true, с одним знаком равенства, — это выражение присваивания, а не сравнение — оно присваивает flag значение true и, как выражение, само также вычисляется в присвоенное значение, true. Поскольку flag объявлен как boolean, тип выражения присваивания — boolean, а это ровно тот тип, который требует условие if, поэтому код прекрасно компилируется (в отличие от C, где случайный = вместо == в if тоже часто молча компилируется, но с семантикой int; более строгое требование boolean в Java на самом деле поймало бы эту ошибку на этапе компиляции, если бы переменная изначально не была boolean). Поскольку условие вычисляется в true, печатается "yes".',
      },
    },
    {
      q: 'What is printed?\n\nint a = 10;\nwhile (a > 0) {\n  a -= 3;\n}\nSystem.out.println(a);',
      options: ['-2', '1', '0', '-1'],
      correct: [0],
      explanation:
        'The condition a > 0 is checked before every iteration, and the loop keeps running as long as it holds — it never checks whether a landed exactly on 0. Tracing a\'s value: starts at 10 (>0, continue), becomes 7 (>0, continue), becomes 4 (>0, continue), becomes 1 (>0, continue), becomes -2. Now the condition -2 > 0 is checked and is false, so the loop stops, leaving a at -2 — notably, it overshoots past 0 rather than landing on it exactly, since 10 is not evenly divisible by 3.',
      ru: {
        question: 'Что будет напечатано?\n\nint a = 10;\nwhile (a > 0) {\n  a -= 3;\n}\nSystem.out.println(a);',
        options: ['-2', '1', '0', '-1'],
        explanation:
          'Условие a > 0 проверяется перед каждой итерацией, и цикл продолжает выполняться, пока оно верно — он никогда не проверяет, оказалось ли a точно равно 0. Прослеживаем значение a: начинается с 10 (>0, продолжаем), становится 7 (>0, продолжаем), становится 4 (>0, продолжаем), становится 1 (>0, продолжаем), становится -2. Теперь проверяется условие -2 > 0, оно ложно, цикл останавливается, оставляя a равным -2 — примечательно, что значение "проскакивает" через 0, а не попадает на него точно, поскольку 10 не делится на 3 без остатка.',
      },
    },
    {
      q: 'What is printed?\n\nint[] nums = new int[3];\nSystem.out.println(nums[0] + nums[1] + nums[2]);',
      options: ['0', 'NullPointerException', 'Compilation error', '3'],
      correct: [0],
      explanation:
        'new int[3] allocates an array of 3 int elements, and every one of them is automatically initialized to int\'s default value, 0 — Java arrays are always fully initialized on creation, unlike local variables. Adding three zeros together, 0 + 0 + 0, unsurprisingly gives 0. There is no NullPointerException risk here at all, since int is a primitive type and the array itself (as opposed to its elements) was successfully created with `new`.',
      ru: {
        question: 'Что будет напечатано?\n\nint[] nums = new int[3];\nSystem.out.println(nums[0] + nums[1] + nums[2]);',
        options: ['0', 'NullPointerException', 'Ошибка компиляции', '3'],
        explanation:
          'new int[3] выделяет массив из 3 элементов int, и каждый из них автоматически инициализируется значением по умолчанию для int, то есть 0 — массивы Java всегда полностью инициализируются при создании, в отличие от локальных переменных. Сложив три нуля, 0 + 0 + 0, ожидаемо получаем 0. Риска NullPointerException здесь вообще нет, поскольку int — примитивный тип, а сам массив (в отличие от его элементов) был успешно создан через `new`.',
      },
    },
    {
      q: 'What is printed?\n\nstatic int fact(int n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}\n\nSystem.out.println(fact(5));',
      options: ['120', '24', '60', '100'],
      correct: [0],
      explanation:
        'This is a standard recursive factorial function: it keeps multiplying n by the result of calling itself on n-1, until it hits the base case (n <= 1, returning 1), at which point the chain of pending multiplications unwinds. Expanding the call chain: fact(5) = 5 * fact(4) = 5 * 4 * fact(3) = 5 * 4 * 3 * fact(2) = 5 * 4 * 3 * 2 * fact(1) = 5 * 4 * 3 * 2 * 1 = 120. The base case is essential — without it, the recursion would never stop and would eventually throw a StackOverflowError.',
      ru: {
        question: 'Что будет напечатано?\n\nstatic int fact(int n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}\n\nSystem.out.println(fact(5));',
        options: ['120', '24', '60', '100'],
        explanation:
          'Это стандартная рекурсивная функция факториала: она умножает n на результат вызова самой себя от n-1, пока не дойдёт до базового случая (n <= 1, возвращая 1), после чего цепочка отложенных умножений "разворачивается". Разворачивая цепочку вызовов: fact(5) = 5 * fact(4) = 5 * 4 * fact(3) = 5 * 4 * 3 * fact(2) = 5 * 4 * 3 * 2 * fact(1) = 5 * 4 * 3 * 2 * 1 = 120. Базовый случай необходим — без него рекурсия никогда бы не остановилась и в итоге выбросила бы StackOverflowError.',
      },
    },
    {
      q: 'What is printed?\n\nint day = 3;\nString name;\nswitch (day) {\n  case 1: name = "Mon"; break;\n  case 2: name = "Tue"; break;\n  case 3: name = "Wed"; break;\n  default: name = "?";\n}\nSystem.out.println(name);',
      options: ['Wed', 'Tue', '?', 'Compilation error'],
      correct: [0],
      explanation:
        'The switch selector day is 3, so control jumps directly to the case 3 label, which assigns name the value "Wed" and then immediately hits break, exiting the switch statement before evaluating any other case or the default branch. There is no fall-through here since every branch properly ends with break, so name ends up simply being "Wed".',
      ru: {
        question: 'Что будет напечатано?\n\nint day = 3;\nString name;\nswitch (day) {\n  case 1: name = "Mon"; break;\n  case 2: name = "Tue"; break;\n  case 3: name = "Wed"; break;\n  default: name = "?";\n}\nSystem.out.println(name);',
        options: ['Wed', 'Tue', '?', 'Ошибка компиляции'],
        explanation:
          'Селектор switch, day, равен 3, поэтому управление переходит прямо к метке case 3, которая присваивает name значение "Wed" и сразу же доходит до break, выходя из оператора switch раньше, чем будет вычислена любая другая ветка case или default. Здесь нет проваливания, поскольку каждая ветка корректно заканчивается break, поэтому name в итоге просто равно "Wed".',
      },
    },
    {
      q: 'What is printed?\n\nint x = 7;\nString res = (x % 2 == 0) ? "even" : "odd";\nSystem.out.println(res);',
      options: ['odd', 'even', 'Compilation error', '7'],
      correct: [0],
      explanation:
        '7 % 2 computes the remainder of 7 divided by 2 — 7 divided by 2 is 3 with a remainder of 1, so x % 2 evaluates to 1, not 0. Since the condition x % 2 == 0 is therefore false, the ternary operator selects its second (false) branch, "odd", which gets assigned to res and printed.',
      ru: {
        question: 'Что будет напечатано?\n\nint x = 7;\nString res = (x % 2 == 0) ? "even" : "odd";\nSystem.out.println(res);',
        options: ['odd', 'even', 'Ошибка компиляции', '7'],
        explanation:
          '7 % 2 вычисляет остаток от деления 7 на 2 — 7, делённое на 2, даёт 3 с остатком 1, поэтому x % 2 равно 1, а не 0. Поскольку условие x % 2 == 0 тем самым ложно, тернарный оператор выбирает свою вторую (ложную) ветвь, "odd", которая присваивается res и печатается.',
      },
    },
    {
      q: 'What happens when this runs?\n\nint[] arr = {1, 2, 3};\nSystem.out.println(arr[3]);',
      options: [
        'Throws ArrayIndexOutOfBoundsException at runtime',
        'Prints 0',
        'Prints null',
        'Compilation error',
      ],
      correct: [0],
      explanation:
        'This array literal creates an array of length 3, so its only valid indices are 0, 1, and 2 (following Java\'s zero-based indexing). Index 3 is one past the last valid element and simply does not exist within this array\'s bounds. Java performs a runtime bounds check on every array access — this is not caught at compile time, since the compiler cannot always know an index will be invalid — so this code compiles fine but throws ArrayIndexOutOfBoundsException the moment it actually executes.',
      ru: {
        question: 'Что произойдёт при выполнении?\n\nint[] arr = {1, 2, 3};\nSystem.out.println(arr[3]);',
        options: [
          'Выбросит ArrayIndexOutOfBoundsException во время выполнения',
          'Напечатает 0',
          'Напечатает null',
          'Ошибка компиляции',
        ],
        explanation:
          'Этот литерал массива создаёт массив длиной 3, поэтому его единственные допустимые индексы — 0, 1 и 2 (следуя нулевой индексации Java). Индекс 3 идёт сразу после последнего допустимого элемента и просто не существует в границах этого массива. Java выполняет проверку границ во время выполнения при каждом обращении к массиву — это не отлавливается на этапе компиляции, поскольку компилятор не всегда может знать, что индекс окажется недопустимым, — поэтому код успешно компилируется, но выбрасывает ArrayIndexOutOfBoundsException в момент фактического выполнения.',
      },
    },
    {
      q: 'What is printed?\n\nString a = new String("hi");\nString b = "hi";\nSystem.out.println(a.equals(b));',
      options: ['true', 'false', 'Compilation error', 'NullPointerException'],
      correct: [0],
      explanation:
        'equals() on a String compares character content, not object identity — it checks whether both strings have the same length and identical characters in the same order. a and b both hold the same two characters, \'h\' and \'i\', regardless of how each String object was created (a was explicitly created with new, forcing a separate heap object, while b came from an interned literal) — that difference in object identity would matter for ==, but is completely irrelevant to equals(), which correctly reports true here.',
      ru: {
        question: 'Что будет напечатано?\n\nString a = new String("hi");\nString b = "hi";\nSystem.out.println(a.equals(b));',
        options: ['true', 'false', 'Ошибка компиляции', 'NullPointerException'],
        explanation:
          'equals() у String сравнивает содержимое символов, а не идентичность объекта — он проверяет, одинаковы ли длины обеих строк и совпадают ли символы в том же порядке. И a, и b содержат одинаковые два символа, \'h\' и \'i\', независимо от того, как был создан каждый объект String (a был явно создан через new, что вынуждает отдельный объект в куче, а b появился из интернированного литерала) — эта разница в идентичности объекта была бы важна для ==, но совершенно не важна для equals(), которая здесь корректно сообщает true.',
      },
    },
    {
      q: 'What is printed?\n\nint i = 0;\nwhile (i++ < 3) {\n  System.out.print(i);\n}',
      options: ['123', '012', '1234', '0123'],
      correct: [0],
      explanation:
        'i++ is postfix, so each check of the while condition compares i\'s value *before* incrementing, but the increment itself happens immediately as part of evaluating that condition, before the loop body ever runs. First check: i is 0, 0 < 3 is true, i becomes 1 — the body then prints the now-updated i, "1". Second check: i is 1, 1 < 3 is true, i becomes 2 — body prints "2". Third check: i is 2, 2 < 3 is true, i becomes 3 — body prints "3". Fourth check: i is 3, 3 < 3 is false, loop exits without running the body again. The printed digits are therefore 1, 2, 3 — notice that 0 is never printed, since the increment to 1 always happens before the very first print.',
      ru: {
        question: 'Что будет напечатано?\n\nint i = 0;\nwhile (i++ < 3) {\n  System.out.print(i);\n}',
        options: ['123', '012', '1234', '0123'],
        explanation:
          'i++ постфиксный, поэтому каждая проверка условия while сравнивает значение i *до* увеличения, но само увеличение происходит немедленно как часть вычисления этого условия, ещё до выполнения тела цикла. Первая проверка: i равно 0, 0 < 3 истинно, i становится 1 — тело затем печатает уже обновлённое i, "1". Вторая проверка: i равно 1, 1 < 3 истинно, i становится 2 — тело печатает "2". Третья проверка: i равно 2, 2 < 3 истинно, i становится 3 — тело печатает "3". Четвёртая проверка: i равно 3, 3 < 3 ложно, цикл завершается, не выполняя тело снова. Напечатанные цифры, таким образом, 1, 2, 3 — обратите внимание, 0 никогда не печатается, поскольку увеличение до 1 всегда происходит раньше самой первой печати.',
      },
    },
    {
      q: 'What is printed?\n\nstatic void p(long x) { System.out.println("long"); }\nstatic void p(int x) { System.out.println("int"); }\n\np(5);',
      options: ['int', 'long', 'Compilation error - ambiguous', 'double'],
      correct: [0],
      explanation:
        'When overload resolution has multiple candidate methods, Java always prefers the overload that matches the argument\'s type exactly, without requiring any widening conversion, before it will even consider an overload that needs one. The literal 5 is already of type int by default, which is an exact match for p(int) — no conversion needed at all — so that overload is chosen directly, printing "int". p(long) would only be selected if no exact or more specific match existed and int-to-long widening were the closest available option, which is not the case here since a perfect match exists.',
      ru: {
        question: 'Что будет напечатано?\n\nstatic void p(long x) { System.out.println("long"); }\nstatic void p(int x) { System.out.println("int"); }\n\np(5);',
        options: ['int', 'long', 'Ошибка компиляции — неоднозначность', 'double'],
        explanation:
          'Когда при разрешении перегрузки есть несколько кандидатов, Java всегда предпочитает перегрузку, точно совпадающую с типом аргумента, без необходимости в каком-либо расширяющем преобразовании, прежде чем вообще рассмотреть перегрузку, которая его требует. Литерал 5 уже по умолчанию имеет тип int, что является точным совпадением для p(int) — преобразование вообще не нужно, — поэтому именно эта перегрузка выбирается напрямую, печатая "int". p(long) была бы выбрана, только если бы не существовало точного или более специфичного совпадения и расширение int в long было бы ближайшим доступным вариантом, что здесь не так, поскольку идеальное совпадение существует.',
      },
    },
    {
      q: 'What is printed?\n\nint a = 5, b = 10;\nif (a > 0) {\n  if (b > 20) System.out.println("A");\n  else System.out.println("B");\n} else {\n  System.out.println("C");\n}',
      options: ['B', 'A', 'C', 'Compilation error'],
      correct: [0],
      explanation:
        'The outer condition, a > 0, is true (a is 5), so execution enters the outer if\'s block rather than its else (which would print "C"). Inside that block sits a nested if/else evaluating b > 20; b is 10, and 10 > 20 is false, so this inner condition takes its else branch, printing "B" — note this inner else belongs to the inner if, not the outer one, since Java always matches an else with the nearest unmatched preceding if.',
      ru: {
        question: 'Что будет напечатано?\n\nint a = 5, b = 10;\nif (a > 0) {\n  if (b > 20) System.out.println("A");\n  else System.out.println("B");\n} else {\n  System.out.println("C");\n}',
        options: ['B', 'A', 'C', 'Ошибка компиляции'],
        explanation:
          'Внешнее условие, a > 0, истинно (a равно 5), поэтому выполнение входит в блок внешнего if, а не в его else (который напечатал бы "C"). Внутри этого блока находится вложенный if/else, вычисляющий b > 20; b равно 10, и 10 > 20 ложно, поэтому это внутреннее условие переходит в свою ветку else, печатая "B" — обратите внимание, этот внутренний else принадлежит внутреннему if, а не внешнему, поскольку Java всегда сопоставляет else с ближайшим непарным предыдущим if.',
      },
    },
    {
      q: 'What is printed?\n\nString[] arr = {"banana", "apple", "cherry"};\nArrays.sort(arr);\nSystem.out.println(arr[0]);',
      options: ['apple', 'banana', 'cherry', 'Compilation error'],
      correct: [0],
      explanation:
        'Arrays.sort() on a String[] array sorts the elements in place using String\'s natural ordering, which is lexicographic (dictionary/alphabetical) comparison. Sorting {"banana", "apple", "cherry"} alphabetically gives {"apple", "banana", "cherry"}, so arr[0] after sorting is "apple" — the first element alphabetically, regardless of its original position in the array before sorting.',
      ru: {
        question: 'Что будет напечатано?\n\nString[] arr = {"banana", "apple", "cherry"};\nArrays.sort(arr);\nSystem.out.println(arr[0]);',
        options: ['apple', 'banana', 'cherry', 'Ошибка компиляции'],
        explanation:
          'Arrays.sort() у массива String[] сортирует элементы на месте, используя естественный порядок String, который является лексикографическим (алфавитным, словарным) сравнением. Сортировка {"banana", "apple", "cherry"} по алфавиту даёт {"apple", "banana", "cherry"}, поэтому arr[0] после сортировки — "apple", первый по алфавиту элемент, независимо от его исходной позиции в массиве до сортировки.',
      },
    },
    {
      q: "What is printed?\n\nchar c = 'a';\nc = (char) (c + 1);\nSystem.out.println(c);",
      options: ['b', 'a', '98', 'Compilation error'],
      correct: [0],
      explanation:
        'char values are internally numeric (Unicode code points), and arithmetic like c + 1 promotes char to int for the calculation — \'a\' has the Unicode code point 97, so c + 1 computes 98 as an int. That int result must be explicitly cast back to char (the compiler cannot implicitly narrow int to char, since not every int is a valid char), which the code does with `(char)`, converting 98 back into the character it represents — 98 corresponds to \'b\'. Printing a char prints the character itself, "b", not the numeric code point.',
      ru: {
        question: "Что будет напечатано?\n\nchar c = 'a';\nc = (char) (c + 1);\nSystem.out.println(c);",
        options: ['b', 'a', '98', 'Ошибка компиляции'],
        explanation:
          'Значения char внутри числовые (кодовые точки Unicode), и арифметика вроде c + 1 повышает char до int для вычисления — у \'a\' кодовая точка Unicode 97, поэтому c + 1 вычисляет 98 как int. Этот результат int нужно явно привести обратно к char (компилятор не может неявно сузить int до char, поскольку не каждый int — допустимый char), что код делает через `(char)`, преобразуя 98 обратно в представляемый им символ — 98 соответствует \'b\'. Печать char печатает сам символ, "b", а не числовую кодовую точку.',
      },
    },
    {
      q: 'What is printed?\n\nInteger a = 127, b = 127;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + " " + (c == d));',
      options: ['true false', 'true true', 'false false', 'false true'],
      correct: [0],
      explanation:
        'Autoboxing an int literal into an Integer routes through Integer.valueOf(), which caches and reuses Integer objects for values in the range -128 to 127 as a documented JDK optimization — so a and b, both boxed from 127, end up referencing that same shared cached object, making a == b true. 200 falls outside that cached range, so each autoboxing of 200 creates its own distinct Integer object, making c == d compare two different objects and evaluate to false. This is a well-known gotcha specifically because it makes == appear to "work" for small Integer values purely by cache coincidence, while silently breaking for larger ones — .equals() should always be used to compare Integer content reliably, regardless of value.',
      ru: {
        question: 'Что будет напечатано?\n\nInteger a = 127, b = 127;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + " " + (c == d));',
        options: ['true false', 'true true', 'false false', 'false true'],
        explanation:
          'Автоупаковка int-литерала в Integer проходит через Integer.valueOf(), который кэширует и переиспользует объекты Integer для значений в диапазоне от -128 до 127 как задокументированную оптимизацию JDK — поэтому a и b, оба упакованные из 127, в итоге ссылаются на один и тот же общий закэшированный объект, делая a == b истинным. 200 выходит за пределы этого закэшированного диапазона, поэтому каждая автоупаковка 200 создаёт собственный отдельный объект Integer, из-за чего c == d сравнивает два разных объекта и даёт false. Это известная ловушка именно потому, что она заставляет == "работать" для маленьких значений Integer чисто по случайности кэша, при этом молча ломаясь для больших — для надёжного сравнения содержимого Integer всегда следует использовать .equals(), независимо от значения.',
      },
    },
    {
      q: 'What is printed?\n\nclass Counter {\n  static int count = 0;\n  Counter() { count++; }\n}\n\nnew Counter();\nnew Counter();\nnew Counter();\nSystem.out.println(Counter.count);',
      options: ['3', '0', '1', 'Compilation error'],
      correct: [0],
      explanation:
        'count is declared static, meaning there is exactly one copy of it shared across the entire class, not one copy per instance — every Counter object that gets created reads and writes that same single field. Each of the three `new Counter()` calls runs the constructor, which executes count++ once, so the shared field is incremented three separate times: 0 to 1, 1 to 2, 2 to 3. Reading Counter.count afterward (accessed through the class itself, as is conventional for static members) reports the final shared value, 3.',
      ru: {
        question: 'Что будет напечатано?\n\nclass Counter {\n  static int count = 0;\n  Counter() { count++; }\n}\n\nnew Counter();\nnew Counter();\nnew Counter();\nSystem.out.println(Counter.count);',
        options: ['3', '0', '1', 'Ошибка компиляции'],
        explanation:
          'count объявлен как static, а значит существует ровно одна его копия, общая для всего класса, а не по одной копии на экземпляр — каждый создаваемый объект Counter читает и пишет одно и то же общее поле. Каждый из трёх вызовов `new Counter()` выполняет конструктор, который один раз выполняет count++, поэтому общее поле увеличивается три отдельных раза: с 0 до 1, с 1 до 2, с 2 до 3. Чтение Counter.count после этого (через сам класс, как принято для статических членов) сообщает итоговое общее значение, 3.',
      },
    },
    {
      q: 'Which two statements about this code are true? (Choose two)\n\nint[] arr = {1, 2, 3};\nfor (int i = 0; i <= arr.length; i++) {\n  System.out.print(arr[i]);\n}',
      options: [
        'The loop throws ArrayIndexOutOfBoundsException',
        'The loop prints "123" and then throws an exception',
        'The code does not compile',
        'The exception happens when i equals 2 (on the third iteration)',
      ],
      correct: [0, 1],
      explanation:
        'The loop condition uses `<=` instead of `<`, so it allows i to reach arr.length (3) — one past the last valid index for a length-3 array (0, 1, 2). The loop successfully prints arr[0], arr[1], and arr[2] as "1", "2", "3" on the first three iterations, so "123" does get printed before anything goes wrong. Only on the fourth iteration, when i becomes 3, does arr[3] get accessed and throw ArrayIndexOutOfBoundsException — not on the third iteration (i=2), which is still a perfectly valid, in-bounds access. This off-by-one pattern (using <= where < was needed) is one of the single most common real-world sources of this exact exception.',
      ru: {
        question: 'Какие два утверждения про этот код верны? (Выберите два)\n\nint[] arr = {1, 2, 3};\nfor (int i = 0; i <= arr.length; i++) {\n  System.out.print(arr[i]);\n}',
        options: [
          'Цикл выбрасывает ArrayIndexOutOfBoundsException',
          'Цикл печатает "123" и затем выбрасывает исключение',
          'Код не компилируется',
          'Исключение происходит, когда i равно 2 (на третьей итерации)',
        ],
        explanation:
          'Условие цикла использует `<=` вместо `<`, поэтому позволяет i достичь arr.length (3) — на единицу больше последнего допустимого индекса для массива длиной 3 (0, 1, 2). Цикл успешно печатает arr[0], arr[1] и arr[2] как "1", "2", "3" на первых трёх итерациях, поэтому "123" действительно печатается до того, как что-то пойдёт не так. Только на четвёртой итерации, когда i становится 3, происходит обращение к arr[3], выбрасывающее ArrayIndexOutOfBoundsException — не на третьей итерации (i=2), которая всё ещё совершенно допустимое обращение в границах. Этот паттерн ошибки на единицу (использование <= там, где нужно было <) — один из самых частых реальных источников именно этого исключения.',
      },
    },
    {
      q: 'Which two statements about this code are true? (Choose two)\n\nString a = "Java";\nString b = "Java";\nString c = new String("Java");\nSystem.out.println(a == b);\nSystem.out.println(a == c);\nSystem.out.println(a.equals(c));',
      options: [
        'a == b prints true',
        'a == c prints true',
        'a.equals(c) prints true',
        'This code fails to compile',
      ],
      correct: [0, 2],
      explanation:
        'a and b are both initialized from the identical string literal "Java", so both reference the same interned object from the string pool, making a == b true. c, however, is created with `new String("Java")`, which explicitly forces a brand-new, separate object on the heap even though it holds the same characters — so a == c compares two genuinely different objects and is false, not true. a.equals(c) compares content rather than identity, and both strings do contain the exact same characters, so it correctly reports true regardless of how each object was constructed.',
      ru: {
        question: 'Какие два утверждения про этот код верны? (Выберите два)\n\nString a = "Java";\nString b = "Java";\nString c = new String("Java");\nSystem.out.println(a == b);\nSystem.out.println(a == c);\nSystem.out.println(a.equals(c));',
        options: [
          'a == b печатает true',
          'a == c печатает true',
          'a.equals(c) печатает true',
          'Этот код не компилируется',
        ],
        explanation:
          'И a, и b инициализируются из идентичного строкового литерала "Java", поэтому оба ссылаются на один и тот же интернированный объект из пула строк, делая a == b истинным. c же создан через `new String("Java")`, что явно вынуждает создать совершенно новый, отдельный объект в куче, даже несмотря на те же символы, — поэтому a == c сравнивает два по-настоящему разных объекта и даёт false, а не true. a.equals(c) сравнивает содержимое, а не идентичность, и обе строки действительно содержат ровно одинаковые символы, поэтому он корректно сообщает true независимо от того, как был создан каждый объект.',
      },
    },
  ],
  'middle-code': [
    {
      q: 'What is printed?\n\nList<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\nint sum = nums.stream().filter(n -> n % 2 == 0).mapToInt(n -> n).sum();\nSystem.out.println(sum);',
      options: ['6', '9', '15', '20'],
      correct: [0],
      explanation:
        'filter(n -> n % 2 == 0) keeps only even numbers from the source list — checking each element, 1 and 3 and 5 are odd (excluded), while 2 and 4 are even (kept). mapToInt(n -> n) converts the remaining Stream<Integer> into an IntStream (unboxing each Integer to a primitive int), which is required before sum() can be called, since sum() is only defined on the primitive numeric stream types. Adding the surviving elements, 2 + 4, gives 6.',
      ru: {
        question: 'Что будет напечатано?\n\nList<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\nint sum = nums.stream().filter(n -> n % 2 == 0).mapToInt(n -> n).sum();\nSystem.out.println(sum);',
        options: ['6', '9', '15', '20'],
        explanation:
          'filter(n -> n % 2 == 0) оставляет только чётные числа из исходного списка — проверяя каждый элемент, 1, 3 и 5 нечётны (исключаются), а 2 и 4 чётны (остаются). mapToInt(n -> n) преобразует оставшийся Stream<Integer> в IntStream (распаковывая каждый Integer в примитивный int), что требуется перед вызовом sum(), поскольку sum() определён только для примитивных числовых потоковых типов. Сложив оставшиеся элементы, 2 + 4, получаем 6.',
      },
    },
    {
      q: 'What is printed?\n\nint base = 10;\nFunction<Integer, Integer> addBase = x -> x + base;\nSystem.out.println(addBase.apply(5));',
      options: ['15', '5', '10', 'Compilation error'],
      correct: [0],
      explanation:
        'The lambda captures the local variable base (effectively final, since it is never reassigned) from the enclosing scope at the moment the lambda is created, remembering its value, 10, for later use. Calling addBase.apply(5) invokes the lambda\'s body with its parameter x bound to 5, computing x + base = 5 + 10 = 15, which is what apply() returns and what gets printed.',
      ru: {
        question: 'Что будет напечатано?\n\nint base = 10;\nFunction<Integer, Integer> addBase = x -> x + base;\nSystem.out.println(addBase.apply(5));',
        options: ['15', '5', '10', 'Ошибка компиляции'],
        explanation:
          'Лямбда захватывает локальную переменную base (эффективно final, поскольку никогда не переприсваивается) из внешней области видимости в момент создания лямбды, запоминая её значение, 10, для использования позже. Вызов addBase.apply(5) выполняет тело лямбды с параметром x, связанным со значением 5, вычисляя x + base = 5 + 10 = 15, что и возвращает apply(), и что печатается.',
      },
    },
    {
      q: 'What is printed?\n\nList<String> list = new ArrayList<>(Arrays.asList("bb", "a", "ccc"));\nlist.sort(Comparator.comparingInt(String::length));\nSystem.out.println(list);',
      options: ['[a, bb, ccc]', '[bb, a, ccc]', '[ccc, bb, a]', 'Compilation error'],
      correct: [0],
      explanation:
        'Comparator.comparingInt(String::length) builds a Comparator that orders elements by the int key extracted from each — here, each string\'s length() — in ascending order by default. Checking each string\'s length: "a" is 1, "bb" is 2, "ccc" is 3. Sorting ascending by that key places the shortest string first: "a", then "bb", then "ccc", giving the printed list [a, bb, ccc], regardless of the original insertion order.',
      ru: {
        question: 'Что будет напечатано?\n\nList<String> list = new ArrayList<>(Arrays.asList("bb", "a", "ccc"));\nlist.sort(Comparator.comparingInt(String::length));\nSystem.out.println(list);',
        options: ['[a, bb, ccc]', '[bb, a, ccc]', '[ccc, bb, a]', 'Ошибка компиляции'],
        explanation:
          'Comparator.comparingInt(String::length) строит Comparator, упорядочивающий элементы по числовому ключу, извлечённому из каждого — здесь это length() каждой строки — по умолчанию по возрастанию. Проверяя длину каждой строки: "a" — 1, "bb" — 2, "ccc" — 3. Сортировка по возрастанию этого ключа ставит самую короткую строку первой: "a", затем "bb", затем "ccc", давая напечатанный список [a, bb, ccc], независимо от исходного порядка вставки.',
      },
    },
    {
      q: 'What is printed?\n\nstatic int test() {\n  try {\n    return 1;\n  } finally {\n    return 2;\n  }\n}\n\nSystem.out.println(test());',
      options: ['2', '1', 'Compilation error', 'Runtime exception'],
      correct: [0],
      explanation:
        'The try block starts to return 1, but before that return can actually complete and hand control back to the caller, the finally block runs first, as it always must. This finally block contains its own return 2, and a return executed inside finally completely overrides — discards — any pending return value from the try block. The method therefore actually returns 2, not 1, which is exactly why deliberately placing a return inside finally is considered a serious code smell: it silently swallows the try block\'s intended result.',
      ru: {
        question: 'Что будет напечатано?\n\nstatic int test() {\n  try {\n    return 1;\n  } finally {\n    return 2;\n  }\n}\n\nSystem.out.println(test());',
        options: ['2', '1', 'Ошибка компиляции', 'Исключение времени выполнения'],
        explanation:
          'Блок try начинает возвращать 1, но прежде чем этот return сможет реально завершиться и вернуть управление вызывающему коду, сначала выполняется блок finally, как это всегда и должно быть. Этот блок finally содержит собственный return 2, и return, выполненный внутри finally, полностью перекрывает — отбрасывает — любое отложенное возвращаемое значение из блока try. Метод поэтому реально возвращает 2, а не 1, именно поэтому намеренное размещение return внутри finally считается серьёзным "запахом кода": оно молча "проглатывает" предполагаемый результат блока try.',
      },
    },
    {
      q: 'What is printed?\n\nstatic int fib(int n) {\n  return n <= 1 ? n : fib(n - 1) + fib(n - 2);\n}\n\nSystem.out.println(fib(6));',
      options: ['8', '5', '13', '6'],
      correct: [0],
      explanation:
        'This recursive function implements the classic Fibonacci sequence, where each term is the sum of the two preceding ones, with base cases fib(0) = 0 and fib(1) = 1. Building the sequence up: fib(0)=0, fib(1)=1, fib(2)=fib(1)+fib(0)=1, fib(3)=fib(2)+fib(1)=2, fib(4)=fib(3)+fib(2)=3, fib(5)=fib(4)+fib(3)=5, fib(6)=fib(5)+fib(4)=5+3=8. The result for fib(6) is 8.',
      ru: {
        question: 'Что будет напечатано?\n\nstatic int fib(int n) {\n  return n <= 1 ? n : fib(n - 1) + fib(n - 2);\n}\n\nSystem.out.println(fib(6));',
        options: ['8', '5', '13', '6'],
        explanation:
          'Эта рекурсивная функция реализует классическую последовательность Фибоначчи, где каждый член — сумма двух предыдущих, с базовыми случаями fib(0) = 0 и fib(1) = 1. Строим последовательность: fib(0)=0, fib(1)=1, fib(2)=fib(1)+fib(0)=1, fib(3)=fib(2)+fib(1)=2, fib(4)=fib(3)+fib(2)=3, fib(5)=fib(4)+fib(3)=5, fib(6)=fib(5)+fib(4)=5+3=8. Результат для fib(6) равен 8.',
      },
    },
    {
      q: 'Given `class Box<T extends Number> { T val; }`, which instantiation is valid?',
      options: [
        'Box<Integer> b = new Box<>();',
        'Box<String> b = new Box<>();',
        'Box<Object> b = new Box<>();',
        'Box b = new Box<T>();',
      ],
      correct: [0],
      explanation:
        'The bound `T extends Number` restricts whatever type argument is supplied for T to Number itself or any of its subclasses (Integer, Double, Long, and so on all qualify, since they all extend Number). Integer is a direct subclass of Number, so Box<Integer> satisfies the bound and compiles. String does not extend Number at all, so Box<String> violates the bound and fails to compile. Object is actually a superclass of Number, not a subtype of it, so it also fails the bound. The last option uses T directly inside a static instantiation context (`new Box<T>()` outside of any generic method or class that itself declares T) where T has no meaning — that is simply invalid syntax, not a bound violation.',
      ru: {
        question: 'Дано `class Box<T extends Number> { T val; }`. Какая инстанциация корректна?',
        options: [
          'Box<Integer> b = new Box<>();',
          'Box<String> b = new Box<>();',
          'Box<Object> b = new Box<>();',
          'Box b = new Box<T>();',
        ],
        explanation:
          'Ограничение `T extends Number` ограничивает любой аргумент типа, переданный для T, самим Number или любым из его подклассов (Integer, Double, Long и т.д. все подходят, так как все они расширяют Number). Integer — прямой подкласс Number, поэтому Box<Integer> удовлетворяет ограничению и компилируется. String вообще не расширяет Number, поэтому Box<String> нарушает ограничение и не компилируется. Object на самом деле является суперклассом Number, а не его подтипом, поэтому тоже не проходит ограничение. Последний вариант использует T напрямую в контексте статической инстанциации (`new Box<T>()` вне какого-либо generic-метода или класса, который сам объявляет T), где T не имеет смысла — это просто недопустимый синтаксис, а не нарушение ограничения.',
      },
    },
    {
      q: 'What happens when this runs?\n\nMap<String, Integer> map = new HashMap<>();\nmap.put("a", 1);\nmap.put("b", 2);\nfor (String k : map.keySet()) {\n  map.remove(k);\n}',
      options: [
        'Throws ConcurrentModificationException',
        'Removes all entries silently',
        'Compilation error',
        'Removes only "a"',
      ],
      correct: [0],
      explanation:
        'The for-each loop is iterating directly over map.keySet(), a live view backed by the map itself, using an internal iterator. Calling map.remove(k) inside that loop structurally modifies the map while that same iterator is still in the middle of walking it — this is exactly the situation Java\'s fail-fast iterators are designed to detect. On the very next call to the iterator\'s internal next() (advancing to a subsequent key), it notices the map\'s modification count changed unexpectedly since the iterator was created, and throws ConcurrentModificationException rather than risk continuing with an iterator whose internal state may no longer correspond correctly to the map\'s actual contents.',
      ru: {
        question: 'Что произойдёт при выполнении?\n\nMap<String, Integer> map = new HashMap<>();\nmap.put("a", 1);\nmap.put("b", 2);\nfor (String k : map.keySet()) {\n  map.remove(k);\n}',
        options: [
          'Выбросит ConcurrentModificationException',
          'Молча удалит все элементы',
          'Ошибка компиляции',
          'Удалит только "a"',
        ],
        explanation:
          'Цикл for-each напрямую итерирует по map.keySet(), живому представлению, опирающемуся на саму карту, используя внутренний итератор. Вызов map.remove(k) внутри этого цикла структурно изменяет карту, пока тот же самый итератор всё ещё находится посреди её обхода — это ровно та ситуация, для обнаружения которой созданы fail-fast итераторы Java. При самом следующем вызове внутреннего next() итератора (переход к следующему ключу) он замечает, что счётчик модификаций карты неожиданно изменился с момента создания итератора, и выбрасывает ConcurrentModificationException, вместо того чтобы рисковать продолжить с итератором, чьё внутреннее состояние может больше не соответствовать реальному содержимому карты.',
      },
    },
    {
      q: 'What is printed?\n\nOptional<String> opt = Optional.ofNullable(null);\nSystem.out.println(opt.orElse("default"));',
      options: ['default', 'null', 'Compilation error', 'NoSuchElementException'],
      correct: [0],
      explanation:
        'Optional.ofNullable(value) creates an empty Optional (one with no value present) when the given value is null, unlike Optional.of(value), which would throw NullPointerException immediately if passed null. opt here is therefore genuinely empty. orElse(other) returns the contained value if the Optional holds one, or returns the provided fallback, "default", if it is empty — since opt is empty, orElse correctly returns and prints "default", without ever throwing an exception, which is precisely the safe, exception-free way Optional is meant to be used for this scenario.',
      ru: {
        question: 'Что будет напечатано?\n\nOptional<String> opt = Optional.ofNullable(null);\nSystem.out.println(opt.orElse("default"));',
        options: ['default', 'null', 'Ошибка компиляции', 'NoSuchElementException'],
        explanation:
          'Optional.ofNullable(значение) создаёт пустой Optional (без присутствующего значения), когда переданное значение null, в отличие от Optional.of(значение), который немедленно выбросил бы NullPointerException при передаче null. opt здесь поэтому действительно пуст. orElse(other) возвращает содержащееся значение, если Optional его хранит, или возвращает предоставленное запасное значение, "default", если он пуст — поскольку opt пуст, orElse корректно возвращает и печатает "default", вообще не выбрасывая исключение, что и есть тот безопасный, свободный от исключений способ использования Optional именно для такого сценария.',
      },
    },
    {
      q: 'What is printed?\n\nint product = Stream.of(1, 2, 3, 4).reduce(1, (a, b) -> a * b);\nSystem.out.println(product);',
      options: ['24', '10', '1', '4'],
      correct: [0],
      explanation:
        'reduce(identity, accumulator) starts with the given identity value, 1, and repeatedly combines it with each stream element in turn using the accumulator function, carrying the running result forward each time. Tracing it: start with 1; combine with 1 → 1*1=1; combine with 2 → 1*2=2; combine with 3 → 2*3=6; combine with 4 → 6*4=24. The final running result, 24, is what reduce() returns and what gets printed — this reduce() call is essentially computing the product of all elements, i.e. a factorial-like accumulation.',
      ru: {
        question: 'Что будет напечатано?\n\nint product = Stream.of(1, 2, 3, 4).reduce(1, (a, b) -> a * b);\nSystem.out.println(product);',
        options: ['24', '10', '1', '4'],
        explanation:
          'reduce(identity, accumulator) начинает с заданного нейтрального значения, 1, и по очереди объединяет его с каждым элементом потока с помощью функции-аккумулятора, перенося текущий результат дальше каждый раз. Прослеживаем: начинаем с 1; объединяем с 1 → 1*1=1; объединяем с 2 → 1*2=2; объединяем с 3 → 2*3=6; объединяем с 4 → 6*4=24. Итоговый текущий результат, 24, — это то, что возвращает reduce() и что печатается — этот вызов reduce() по сути вычисляет произведение всех элементов, то есть накопление, похожее на факториал.',
      },
    },
    {
      q: 'What is printed?\n\nclass MyException extends RuntimeException {}\n\nstatic void risky() { throw new MyException(); }\n\ntry {\n  risky();\n} catch (RuntimeException e) {\n  System.out.println("Caught");\n}',
      options: ['Caught', 'Compilation error', 'The program terminates with an uncaught exception', 'Nothing is printed'],
      correct: [0],
      explanation:
        'MyException extends RuntimeException directly, which makes it an unchecked exception — notably, this also means risky() is not required to declare `throws MyException` in its signature, since unchecked exceptions are exempt from that compiler-enforced requirement. Because MyException is a subtype of RuntimeException, the catch (RuntimeException e) clause matches it perfectly well (catch clauses match the declared type or any subtype), so control transfers there and "Caught" is printed; the exception never propagates past this try/catch to terminate the program.',
      ru: {
        question: 'Что будет напечатано?\n\nclass MyException extends RuntimeException {}\n\nstatic void risky() { throw new MyException(); }\n\ntry {\n  risky();\n} catch (RuntimeException e) {\n  System.out.println("Caught");\n}',
        options: ['Caught', 'Ошибка компиляции', 'Программа завершится с необработанным исключением', 'Ничего не выведется'],
        explanation:
          'MyException напрямую наследуется от RuntimeException, что делает его непроверяемым исключением — примечательно, что это также означает, что risky() не обязан объявлять `throws MyException` в своей сигнатуре, поскольку непроверяемые исключения освобождены от этого требования, навязываемого компилятором. Поскольку MyException — подтип RuntimeException, блок catch (RuntimeException e) прекрасно ему соответствует (блоки catch совпадают с объявленным типом или любым его подтипом), поэтому управление переходит туда и печатается "Caught"; исключение никогда не распространяется дальше этого try/catch, чтобы завершить программу.',
      },
    },
    {
      q: 'What is printed?\n\nString a = new String("test");\nString b = "test";\nSystem.out.println(a == b);',
      options: ['false', 'true', 'Compilation error', 'NullPointerException'],
      correct: [0],
      explanation:
        '`new String(...)` explicitly, deliberately bypasses the string pool and allocates a distinct new object on the heap, even though its content happens to duplicate an existing pooled literal — this is precisely why `new String(...)` is discouraged in ordinary code, since it defeats the pooling optimization for essentially no benefit. b, on the other hand, refers to the pooled literal "test" directly. Since a and b now point to two different objects in memory, == (which compares object references, not content) correctly reports false, even though a.equals(b) would report true.',
      ru: {
        question: 'Что будет напечатано?\n\nString a = new String("test");\nString b = "test";\nSystem.out.println(a == b);',
        options: ['false', 'true', 'Ошибка компиляции', 'NullPointerException'],
        explanation:
          '`new String(...)` явно, намеренно обходит пул строк и выделяет отдельный новый объект в куче, даже несмотря на то, что его содержимое дублирует уже существующий пуловый литерал — именно поэтому `new String(...)` не рекомендуется в обычном коде, так как это сводит на нет оптимизацию пула практически без всякой выгоды. b же ссылается прямо на пуловый литерал "test". Поскольку a и b теперь указывают на два разных объекта в памяти, == (сравнивающий ссылки на объекты, а не содержимое) корректно сообщает false, хотя a.equals(b) сообщил бы true.',
      },
    },
    {
      q: 'What is printed?\n\nstatic int binarySearch(int[] arr, int target) {\n  int lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    int mid = (lo + hi) / 2;\n    if (arr[mid] == target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n\nint[] arr = {1, 3, 5, 7, 9, 11};\nSystem.out.println(binarySearch(arr, 7));',
      options: ['3', '4', '2', '-1'],
      correct: [0],
      explanation:
        'This is the classic binary search algorithm, which repeatedly halves the search range by comparing the target against the middle element. First iteration: lo=0, hi=5, mid=(0+5)/2=2, arr[2]=5, which is less than 7, so lo becomes 3. Second iteration: lo=3, hi=5, mid=(3+5)/2=4, arr[4]=9, which is greater than 7, so hi becomes 3. Third iteration: lo=3, hi=3, mid=(3+3)/2=3, arr[3]=7, which equals the target — the function returns 3 immediately, the index where 7 is actually located in the array.',
      ru: {
        question: 'Что будет напечатано?\n\nstatic int binarySearch(int[] arr, int target) {\n  int lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    int mid = (lo + hi) / 2;\n    if (arr[mid] == target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n\nint[] arr = {1, 3, 5, 7, 9, 11};\nSystem.out.println(binarySearch(arr, 7));',
        options: ['3', '4', '2', '-1'],
        explanation:
          'Это классический алгоритм бинарного поиска, многократно уменьшающий диапазон поиска вдвое, сравнивая цель со средним элементом. Первая итерация: lo=0, hi=5, mid=(0+5)/2=2, arr[2]=5, что меньше 7, поэтому lo становится 3. Вторая итерация: lo=3, hi=5, mid=(3+5)/2=4, arr[4]=9, что больше 7, поэтому hi становится 3. Третья итерация: lo=3, hi=3, mid=(3+3)/2=3, arr[3]=7, что равно цели — функция сразу возвращает 3, индекс, где 7 реально расположено в массиве.',
      },
    },
    {
      q: 'What is printed?\n\nStringBuilder sb = new StringBuilder("Hello World");\nsb.insert(5, ",");\nSystem.out.println(sb);',
      options: ['Hello, World', 'Hello ,World', 'Hell,o World', 'Hello World,'],
      correct: [0],
      explanation:
        'Indexing "Hello World" from 0: H=0, e=1, l=2, l=3, o=4, (space)=5, W=6, and so on. insert(index, str) inserts the given text immediately before the character currently occupying that index, shifting everything from that point onward to the right. Index 5 is the space character, so inserting "," there places it right before that space, giving "Hello" + "," + " World" concatenated together, which reads as "Hello, World".',
      ru: {
        question: 'Что будет напечатано?\n\nStringBuilder sb = new StringBuilder("Hello World");\nsb.insert(5, ",");\nSystem.out.println(sb);',
        options: ['Hello, World', 'Hello ,World', 'Hell,o World', 'Hello World,'],
        explanation:
          'Индексируем "Hello World" с нуля: H=0, e=1, l=2, l=3, o=4, (пробел)=5, W=6 и т.д. insert(index, str) вставляет заданный текст непосредственно перед символом, сейчас занимающим этот индекс, сдвигая всё начиная с этой точки вправо. Индекс 5 — это символ пробела, поэтому вставка "," туда размещает её прямо перед этим пробелом, давая "Hello" + "," + " World", соединённые вместе, что читается как "Hello, World".',
      },
    },
    {
      q: 'What is printed?\n\nclass Point {\n  int x, y;\n  Point(int x, int y) { this.x = x; this.y = y; }\n}\n\nSet<Point> set = new HashSet<>();\nset.add(new Point(1, 1));\nset.add(new Point(1, 1));\nSystem.out.println(set.size());',
      options: ['2', '1', '0', 'Compilation error'],
      correct: [0],
      explanation:
        'Point does not override equals() or hashCode(), so both are inherited from Object, whose default implementations compare by reference identity (memory address), not by field content. The two `new Point(1, 1)` calls create two genuinely distinct objects in memory, even though their x and y field values happen to be identical — since HashSet relies on equals()/hashCode() to detect duplicates, and Object\'s defaults say these two objects are not equal (different identities), the set has no way to know they should be treated as the same logical point. Both get added successfully, and set.size() reports 2. This is exactly why classes intended to be compared by value must explicitly override equals() and hashCode() together.',
      ru: {
        question: 'Что будет напечатано?\n\nclass Point {\n  int x, y;\n  Point(int x, int y) { this.x = x; this.y = y; }\n}\n\nSet<Point> set = new HashSet<>();\nset.add(new Point(1, 1));\nset.add(new Point(1, 1));\nSystem.out.println(set.size());',
        options: ['2', '1', '0', 'Ошибка компиляции'],
        explanation:
          'Point не переопределяет equals() или hashCode(), поэтому оба наследуются от Object, чьи реализации по умолчанию сравнивают по идентичности ссылки (адресу в памяти), а не по содержимому полей. Два вызова `new Point(1, 1)` создают два по-настоящему разных объекта в памяти, даже несмотря на то, что значения их полей x и y совпадают — поскольку HashSet полагается на equals()/hashCode() для обнаружения дубликатов, а значения Object по умолчанию говорят, что эти два объекта не равны (разная идентичность), у набора нет способа узнать, что их следует считать одной и той же логической точкой. Оба успешно добавляются, и set.size() сообщает 2. Именно поэтому классы, предназначенные для сравнения по значению, обязаны явно переопределять equals() и hashCode() вместе.',
      },
    },
    {
      q: 'What is printed?\n\nMap<String, Integer> map = Stream.of("a", "bb", "ccc")\n  .collect(Collectors.toMap(s -> s, String::length));\nSystem.out.println(map.get("bb"));',
      options: ['2', '1', '3', 'null'],
      correct: [0],
      explanation:
        'Collectors.toMap(keyMapper, valueMapper) builds a Map by applying the key-mapper function to produce each entry\'s key and the value-mapper function to produce that same entry\'s value, for every stream element. Here the key mapper is the identity function (s -> s, so each string becomes its own key), and the value mapper is String::length. For "bb" specifically, its key is "bb" itself and its value is "bb".length(), which is 2. map.get("bb") therefore looks up that key and returns its associated value, 2.',
      ru: {
        question: 'Что будет напечатано?\n\nMap<String, Integer> map = Stream.of("a", "bb", "ccc")\n  .collect(Collectors.toMap(s -> s, String::length));\nSystem.out.println(map.get("bb"));',
        options: ['2', '1', '3', 'null'],
        explanation:
          'Collectors.toMap(keyMapper, valueMapper) строит Map, применяя функцию-маппер ключа для получения ключа каждой записи и функцию-маппер значения для получения значения этой же записи, для каждого элемента потока. Здесь маппер ключа — функция тождества (s -> s, поэтому каждая строка становится собственным ключом), а маппер значения — String::length. Конкретно для "bb" её ключ — сама "bb", а значение — "bb".length(), то есть 2. map.get("bb") поэтому ищет этот ключ и возвращает связанное с ним значение, 2.',
      },
    },
    {
      q: 'What is printed?\n\nstatic int sum(int n) {\n  if (n == 0) return 0;\n  return n + sum(n - 1);\n}\n\nSystem.out.println(sum(4));',
      options: ['10', '4', '24', '14'],
      correct: [0],
      explanation:
        'This recursive function sums all integers from n down to 0. Expanding the call chain: sum(4) = 4 + sum(3) = 4 + 3 + sum(2) = 4 + 3 + 2 + sum(1) = 4 + 3 + 2 + 1 + sum(0) = 4 + 3 + 2 + 1 + 0. Adding those up, 4 + 3 + 2 + 1 + 0, gives 10.',
      ru: {
        question: 'Что будет напечатано?\n\nstatic int sum(int n) {\n  if (n == 0) return 0;\n  return n + sum(n - 1);\n}\n\nSystem.out.println(sum(4));',
        options: ['10', '4', '24', '14'],
        explanation:
          'Эта рекурсивная функция суммирует все целые числа от n до 0. Разворачивая цепочку вызовов: sum(4) = 4 + sum(3) = 4 + 3 + sum(2) = 4 + 3 + 2 + sum(1) = 4 + 3 + 2 + 1 + sum(0) = 4 + 3 + 2 + 1 + 0. Складывая, 4 + 3 + 2 + 1 + 0, получаем 10.',
      },
    },
    {
      q: 'What is the output?\n\nclass R implements AutoCloseable {\n  String name;\n  R(String n) { name = n; }\n  public void close() { System.out.println("Close " + name); }\n}\n\ntry (R a = new R("A"); R b = new R("B")) {\n}',
      options: [
        '"Close B" then "Close A"',
        '"Close A" then "Close B"',
        'Only "Close B" is printed',
        'Compilation error',
      ],
      correct: [0],
      explanation:
        'When a try-with-resources statement declares multiple resources, they are closed automatically in the exact reverse of the order they were declared — a and b were declared in that order (a first, then b), so closing happens b first, then a, mirroring how nested constructors/destructors typically unwind in many languages. This ordering matters in practice when resources depend on each other (for example, a wrapping stream needs to be closed before the underlying stream it wraps), so the reverse-declaration-order guarantee is a deliberate, load-bearing part of the language design, not an implementation detail.',
      ru: {
        question: 'Каков результат?\n\nclass R implements AutoCloseable {\n  String name;\n  R(String n) { name = n; }\n  public void close() { System.out.println("Close " + name); }\n}\n\ntry (R a = new R("A"); R b = new R("B")) {\n}',
        options: [
          '"Close B", затем "Close A"',
          '"Close A", затем "Close B"',
          'Печатается только "Close B"',
          'Ошибка компиляции',
        ],
        explanation:
          'Когда конструкция try-with-resources объявляет несколько ресурсов, они автоматически закрываются в порядке, строго обратном порядку объявления — a и b были объявлены в этом порядке (сначала a, затем b), поэтому закрытие происходит сначала b, потом a, повторяя то, как во многих языках обычно "разворачиваются" вложенные конструкторы/деструкторы. Этот порядок важен на практике, когда ресурсы зависят друг от друга (например, оборачивающий поток нужно закрыть раньше нижележащего потока, который он оборачивает), поэтому гарантия обратного порядка объявления — намеренная, значимая часть дизайна языка, а не деталь реализации.',
      },
    },
    {
      q: 'What is printed?\n\nObject obj = "hello";\nif (obj instanceof String) {\n  String s = (String) obj;\n  System.out.println(s.length());\n}',
      options: ['5', '0', 'Compilation error', 'ClassCastException'],
      correct: [0],
      explanation:
        'obj is declared with the compile-time type Object, but at runtime it actually references a String object, "hello". instanceof checks the object\'s actual runtime type, so `obj instanceof String` correctly evaluates to true. Since that check passed, the explicit cast `(String) obj` is guaranteed safe and succeeds without any ClassCastException. s.length() then simply counts "hello"\'s five characters, printing 5.',
      ru: {
        question: 'Что будет напечатано?\n\nObject obj = "hello";\nif (obj instanceof String) {\n  String s = (String) obj;\n  System.out.println(s.length());\n}',
        options: ['5', '0', 'Ошибка компиляции', 'ClassCastException'],
        explanation:
          'obj объявлен со статическим типом Object, но во время выполнения он реально ссылается на объект String, "hello". instanceof проверяет реальный тип объекта во время выполнения, поэтому `obj instanceof String` корректно вычисляется в true. Поскольку эта проверка прошла, явное приведение `(String) obj` гарантированно безопасно и успешно выполняется без ClassCastException. s.length() затем просто подсчитывает пять символов "hello", печатая 5.',
      },
    },
    {
      q: 'What is printed?\n\nList<Integer> nums = Arrays.asList(5, 3, 8, 1);\nnums.stream().sorted(Comparator.reverseOrder()).forEach(System.out::print);',
      options: ['8531', '1358', '5381', 'Compilation error'],
      correct: [0],
      explanation:
        'sorted(Comparator.reverseOrder()) sorts the stream elements in descending order, the reverse of their natural ascending order. Sorting {5, 3, 8, 1} descending gives 8, 5, 3, 1. forEach(System.out::print) then prints each element in that sorted order with no separator between them (print, not println), concatenating the digits directly into "8531".',
      ru: {
        question: 'Что будет напечатано?\n\nList<Integer> nums = Arrays.asList(5, 3, 8, 1);\nnums.stream().sorted(Comparator.reverseOrder()).forEach(System.out::print);',
        options: ['8531', '1358', '5381', 'Ошибка компиляции'],
        explanation:
          'sorted(Comparator.reverseOrder()) сортирует элементы потока по убыванию, обратно их естественному порядку по возрастанию. Сортировка {5, 3, 8, 1} по убыванию даёт 8, 5, 3, 1. forEach(System.out::print) затем печатает каждый элемент в этом отсортированном порядке без разделителя между ними (print, не println), склеивая цифры прямо в "8531".',
      },
    },
    {
      q: 'What is printed?\n\nList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4));\nIterator<Integer> it = list.iterator();\nwhile (it.hasNext()) {\n  int v = it.next();\n  if (v % 2 == 0) it.remove();\n}\nSystem.out.println(list);',
      options: ['[1, 3]', '[2, 4]', '[1, 2, 3, 4]', 'Compilation error'],
      correct: [0],
      explanation:
        'Unlike calling list.remove(...) directly during a for-each loop (which throws ConcurrentModificationException), calling it.remove() — the iterator\'s own removal method — is explicitly the safe, sanctioned way to remove elements while iterating, because it keeps the iterator\'s internal bookkeeping in sync with the modification. Walking through: v=1 (odd, kept), v=2 (even, removed via it.remove()), v=3 (odd, kept), v=4 (even, removed via it.remove()). The surviving elements are 1 and 3, so the final list prints as [1, 3].',
      ru: {
        question: 'Что будет напечатано?\n\nList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4));\nIterator<Integer> it = list.iterator();\nwhile (it.hasNext()) {\n  int v = it.next();\n  if (v % 2 == 0) it.remove();\n}\nSystem.out.println(list);',
        options: ['[1, 3]', '[2, 4]', '[1, 2, 3, 4]', 'Ошибка компиляции'],
        explanation:
          'В отличие от прямого вызова list.remove(...) во время цикла for-each (что выбрасывает ConcurrentModificationException), вызов it.remove() — собственного метода удаления итератора — это явно безопасный, разрешённый способ удалять элементы во время итерации, потому что он поддерживает внутренний учёт итератора в согласии с изменением. Проходим: v=1 (нечётное, остаётся), v=2 (чётное, удаляется через it.remove()), v=3 (нечётное, остаётся), v=4 (чётное, удаляется через it.remove()). Оставшиеся элементы — 1 и 3, поэтому итоговый список печатается как [1, 3].',
      },
    },
    {
      q: 'Which two statements about this code are true? (Choose two)\n\nList<String> list = new ArrayList<>();\nlist.add("a");\nlist.add("b");\nlist.add("c");\nlist.removeIf(s -> s.equals("b"));\nSystem.out.println(list);',
      options: [
        'The output is [a, c]',
        'removeIf throws ConcurrentModificationException',
        'removeIf accepts a Predicate<T> as its argument',
        'The list becomes empty after removeIf',
      ],
      correct: [0, 2],
      explanation:
        'removeIf() (added to the Collection interface in Java 8) is specifically designed to safely remove all elements matching a given condition, expressed as a Predicate<T> — its method signature is `boolean removeIf(Predicate<? super E> filter)`, and the lambda `s -> s.equals("b")` implements exactly that predicate shape. It handles the underlying iteration and removal internally in a way that avoids the ConcurrentModificationException that manually removing during a for-each would trigger. Only "b" matches the predicate and gets removed, leaving "a" and "c" behind, so the printed result is [a, c] — the list does not become empty, since only one of its three elements matched the removal condition.',
      ru: {
        question: 'Какие два утверждения про этот код верны? (Выберите два)\n\nList<String> list = new ArrayList<>();\nlist.add("a");\nlist.add("b");\nlist.add("c");\nlist.removeIf(s -> s.equals("b"));\nSystem.out.println(list);',
        options: [
          'Результат — [a, c]',
          'removeIf выбрасывает ConcurrentModificationException',
          'removeIf принимает Predicate<T> в качестве аргумента',
          'После removeIf список становится пустым',
        ],
        explanation:
          'removeIf() (добавлен в интерфейс Collection в Java 8) специально спроектирован для безопасного удаления всех элементов, удовлетворяющих заданному условию, выраженному как Predicate<T> — его сигнатура метода: `boolean removeIf(Predicate<? super E> filter)`, и лямбда `s -> s.equals("b")` реализует ровно такую форму предиката. Он внутренне обрабатывает итерирование и удаление так, чтобы избежать ConcurrentModificationException, которое вызвало бы ручное удаление во время for-each. Только "b" удовлетворяет предикату и удаляется, оставляя "a" и "c", поэтому напечатанный результат — [a, c] — список не становится пустым, так как условию удаления удовлетворил только один из трёх его элементов.',
      },
    },
    {
      q: 'Which two statements about this code are true? (Choose two)\n\ninterface Vehicle { default String type(){ return "Vehicle"; } }\nclass Car implements Vehicle {}\nclass SportsCar extends Car { public String type(){ return "SportsCar"; } }\n\nVehicle v = new SportsCar();\nSystem.out.println(v.type());',
      options: [
        'The output is "SportsCar"',
        'Car must override type() for this code to compile',
        "SportsCar's type() overrides the interface's default method through the inheritance chain",
        'The output is "Vehicle" because v is declared as the Vehicle type',
      ],
      correct: [0, 2],
      explanation:
        'Car implements Vehicle without overriding type(), so it simply inherits the interface\'s default implementation as-is — that compiles perfectly fine, since default methods exist precisely to make overriding optional. SportsCar extends Car and does override type(), and because that override happens further down the inheritance chain (interface default → Car, inherited → SportsCar, overridden), it is SportsCar\'s version that ultimately takes effect for a SportsCar object. Method calls in Java always dispatch based on the object\'s actual runtime type, not the declared type of the reference variable — so even though v is declared as Vehicle, calling v.type() on an actual SportsCar object correctly runs SportsCar\'s override, printing "SportsCar", not "Vehicle".',
      ru: {
        question: 'Какие два утверждения про этот код верны? (Выберите два)\n\ninterface Vehicle { default String type(){ return "Vehicle"; } }\nclass Car implements Vehicle {}\nclass SportsCar extends Car { public String type(){ return "SportsCar"; } }\n\nVehicle v = new SportsCar();\nSystem.out.println(v.type());',
        options: [
          'Результат — "SportsCar"',
          'Car обязан переопределить type(), чтобы код скомпилировался',
          'type() у SportsCar переопределяет default-метод интерфейса через цепочку наследования',
          'Результат — "Vehicle", потому что v объявлен с типом Vehicle',
        ],
        explanation:
          'Car реализует Vehicle, не переопределяя type(), поэтому просто наследует реализацию интерфейса по умолчанию как есть — это прекрасно компилируется, поскольку default-методы существуют именно для того, чтобы сделать переопределение необязательным. SportsCar расширяет Car и действительно переопределяет type(), и поскольку это переопределение происходит дальше по цепочке наследования (default интерфейса → Car, унаследовано → SportsCar, переопределено), именно версия SportsCar в итоге вступает в силу для объекта SportsCar. Вызовы методов в Java всегда диспетчеризуются по реальному типу объекта во время выполнения, а не по объявленному типу переменной-ссылки — поэтому хотя v объявлен как Vehicle, вызов v.type() на реальном объекте SportsCar корректно выполняет переопределение SportsCar, печатая "SportsCar", а не "Vehicle".',
      },
    },
  ],

  'leetcode-easy': [
    {
      q: 'What does this method return for nums = {2, 7, 11, 15}, target = 9?\n\nstatic int[] twoSum(int[] nums, int target) {\n  for (int i = 0; i < nums.length; i++) {\n    for (int j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] == target) return new int[]{i, j};\n    }\n  }\n  return new int[]{};\n}',
      options: ['{0, 1}', '{1, 0}', '{2, 7}', '{0, 2}'],
      correct: [0],
      explanation:
        'This is the brute-force "Two Sum": for every index i it scans every later index j looking for a pair that adds up to target. With nums = {2,7,11,15}, i=0 (value 2) immediately finds j=1 (value 7) because 2+7=9, so it returns the indices, not the values — {0, 1}. The nested loop makes this O(n²) time; the classic optimization is a single pass with a HashMap<value, index> that checks for target-nums[i] as you go, bringing it down to O(n).',
      ru: {
        question: 'Что вернёт этот метод для nums = {2, 7, 11, 15}, target = 9?\n\nstatic int[] twoSum(int[] nums, int target) {\n  for (int i = 0; i < nums.length; i++) {\n    for (int j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] == target) return new int[]{i, j};\n    }\n  }\n  return new int[]{};\n}',
        options: ['{0, 1}', '{1, 0}', '{2, 7}', '{0, 2}'],
        explanation:
          'Это перебор ("Two Sum" в лоб): для каждого индекса i перебираются все более поздние индексы j в поиске пары, дающей в сумме target. Для nums = {2,7,11,15} при i=0 (значение 2) сразу находится j=1 (значение 7), так как 2+7=9, поэтому возвращаются индексы, а не значения — {0, 1}. Вложенный цикл даёт O(n²) по времени; классическая оптимизация — один проход с HashMap<значение, индекс>, проверяющей target-nums[i] по ходу дела, что снижает сложность до O(n).',
      },
    },
    {
      q: 'What is printed after this runs on chars = {\'h\',\'e\',\'l\',\'l\',\'o\'}?\n\nstatic void reverse(char[] chars) {\n  int left = 0, right = chars.length - 1;\n  while (left < right) {\n    char tmp = chars[left];\n    chars[left] = chars[right];\n    chars[right] = tmp;\n    left++;\n    right--;\n  }\n}\n// reverse(chars);\nSystem.out.println(new String(chars));',
      options: ['olleh', 'hello', 'ollhe', 'Compilation error'],
      correct: [0],
      explanation:
        'This is the classic two-pointer in-place string/array reversal: left starts at the front, right at the back, and each iteration swaps them and moves both pointers toward the middle, stopping once they meet or cross. For "hello" (5 chars, indices 0-4): swap(0,4) → "oellh", swap(1,3) → "olleh", then left(2) equals right(2) so the loop stops. The result is "olleh". This runs in O(n) time and O(1) extra space, which is exactly why it is preferred over building a new reversed string.',
      ru: {
        question: 'Что напечатается после выполнения на chars = {\'h\',\'e\',\'l\',\'l\',\'o\'}?\n\nstatic void reverse(char[] chars) {\n  int left = 0, right = chars.length - 1;\n  while (left < right) {\n    char tmp = chars[left];\n    chars[left] = chars[right];\n    chars[right] = tmp;\n    left++;\n    right--;\n  }\n}\n// reverse(chars);\nSystem.out.println(new String(chars));',
        options: ['olleh', 'hello', 'ollhe', 'Ошибка компиляции'],
        explanation:
          'Это классический разворот строки/массива на месте с двумя указателями: left стартует с начала, right — с конца, и на каждой итерации они меняются местами, после чего оба указателя двигаются к середине, пока не встретятся или не пересекутся. Для "hello" (5 символов, индексы 0-4): swap(0,4) → "oellh", swap(1,3) → "olleh", затем left(2) равен right(2), и цикл останавливается. Результат — "olleh". Это работает за O(n) по времени и O(1) по дополнительной памяти, именно поэтому такой подход предпочтительнее построения новой перевёрнутой строки.',
      },
    },
    {
      q: 'Which input makes this method return false?\n\nstatic boolean isValid(String s) {\n  Deque<Character> stack = new ArrayDeque<>();\n  for (char c : s.toCharArray()) {\n    if (c == \'(\') stack.push(\')\');\n    else if (c == \'[\') stack.push(\']\');\n    else if (c == \'{\') stack.push(\'}\');\n    else if (stack.isEmpty() || stack.pop() != c) return false;\n  }\n  return stack.isEmpty();\n}',
      options: ['"([)]"', '"([]){}"', '"{[()]}"', '"()"'],
      correct: [0],
      explanation:
        'This validates balanced brackets with a stack: on an opening bracket, push the matching closer you\'ll need to see next; on a closing character, it must equal what pop() returns, or the string is invalid. "([)]" opens \'(\' (push \')\'), opens \'[\' (push \']\'), then hits \')\' — but the top of the stack is \']\' (from the more recently opened \'[\'), so stack.pop() != c fails and it returns false immediately: the brackets are interleaved rather than properly nested. The other three options are all correctly nested/balanced and would return true.',
      ru: {
        question: 'При каком входе этот метод вернёт false?\n\nstatic boolean isValid(String s) {\n  Deque<Character> stack = new ArrayDeque<>();\n  for (char c : s.toCharArray()) {\n    if (c == \'(\') stack.push(\')\');\n    else if (c == \'[\') stack.push(\']\');\n    else if (c == \'{\') stack.push(\'}\');\n    else if (stack.isEmpty() || stack.pop() != c) return false;\n  }\n  return stack.isEmpty();\n}',
        options: ['"([)]"', '"([]){}"', '"{[()]}"', '"()"'],
        explanation:
          'Это проверка сбалансированности скобок через стек: при открывающей скобке кладём в стек ожидаемую закрывающую; при встрече закрывающего символа он должен совпасть с тем, что вернёт pop(), иначе строка невалидна. "([)]" открывает \'(\' (кладём \')\'), открывает \'[\' (кладём \']\'), затем встречает \')\' — но на вершине стека \']\' (от более недавно открытой \'[\'), поэтому stack.pop() != c истинно и метод сразу возвращает false: скобки перепутаны, а не корректно вложены. Остальные три варианта корректно сбалансированы и вернули бы true.',
      },
    },
    {
      q: 'What is printed for i from 1 to 15 by this classic loop (showing only i = 15)?\n\nfor (int i = 1; i <= 15; i++) {\n  if (i % 15 == 0) System.out.println("FizzBuzz");\n  else if (i % 3 == 0) System.out.println("Fizz");\n  else if (i % 5 == 0) System.out.println("Buzz");\n  else System.out.println(i);\n}',
      options: ['FizzBuzz', 'Fizz', 'Buzz', '15'],
      correct: [0],
      explanation:
        '15 is divisible by both 3 and 5 (and therefore by 15), so the very first condition, i % 15 == 0, is checked first and is true, printing "FizzBuzz". The order of the if/else-if chain matters here: checking i % 15 == 0 first is what correctly handles numbers divisible by both 3 and 5 — if the code instead checked % 3 and % 5 separately without the combined %15 check (or checked them in the wrong order without an else), 15 would incorrectly print just "Fizz" or "FizzFizz"/"BuzzBuzz" style bugs.',
      ru: {
        question: 'Что напечатается для i от 1 до 15 в этом классическом цикле (показан только i = 15)?\n\nfor (int i = 1; i <= 15; i++) {\n  if (i % 15 == 0) System.out.println("FizzBuzz");\n  else if (i % 3 == 0) System.out.println("Fizz");\n  else if (i % 5 == 0) System.out.println("Buzz");\n  else System.out.println(i);\n}',
        options: ['FizzBuzz', 'Fizz', 'Buzz', '15'],
        explanation:
          '15 делится и на 3, и на 5 (а значит и на 15), поэтому самое первое условие, i % 15 == 0, проверяется первым и оказывается истинным, печатая "FizzBuzz". Здесь важен порядок цепочки if/else-if: проверка i % 15 == 0 первой — это то, что корректно обрабатывает числа, делящиеся и на 3, и на 5; если бы код вместо этого проверял %3 и %5 по отдельности без объединённой проверки %15 (или в неверном порядке без else), 15 ошибочно напечатало бы только "Fizz" или подобные баги.',
      },
    },
    {
      q: 'This method is meant to find the maximum value in an array. What is wrong with it?\n\nstatic int max(int[] nums) {\n  int best = 0;\n  for (int n : nums) {\n    if (n > best) best = n;\n  }\n  return best;\n}',
      options: [
        'It returns the wrong result for an array of all-negative numbers',
        'It throws ArrayIndexOutOfBoundsException on an empty array',
        'It has a compilation error',
        'It works correctly for every possible int array',
      ],
      correct: [0],
      explanation:
        'Seeding best with 0 is a classic bug: if every element in nums is negative (e.g. {-5, -2, -9}), best never gets updated because no element is ever greater than 0, so the method incorrectly returns 0 — a value that was never actually in the array. The fix is to seed best with nums[0] (after checking the array isn\'t empty) rather than an arbitrary constant like 0. It does not throw on an empty array — it would just return 0 silently, which is also arguably wrong but not an exception.',
      ru: {
        question: 'Этот метод должен находить максимальное значение в массиве. Что в нём не так?\n\nstatic int max(int[] nums) {\n  int best = 0;\n  for (int n : nums) {\n    if (n > best) best = n;\n  }\n  return best;\n}',
        options: [
          'Он даёт неверный результат для массива из одних отрицательных чисел',
          'Он выбрасывает ArrayIndexOutOfBoundsException на пустом массиве',
          'В нём ошибка компиляции',
          'Он корректно работает для любого возможного массива int',
        ],
        explanation:
          'Инициализация best нулём — классическая ошибка: если все элементы nums отрицательны (например, {-5, -2, -9}), best никогда не обновится, потому что ни один элемент никогда не превысит 0, и метод ошибочно вернёт 0 — значение, которого вообще не было в массиве. Исправление — инициализировать best элементом nums[0] (предварительно проверив, что массив не пуст), а не произвольной константой вроде 0. На пустом массиве исключения не будет — просто молча вернётся 0, что тоже спорно, но не исключение.',
      },
    },
    {
      q: 'What does this return for s = "racecar"?\n\nstatic boolean isPalindrome(String s) {\n  int left = 0, right = s.length() - 1;\n  while (left < right) {\n    if (s.charAt(left) != s.charAt(right)) return false;\n    left++;\n    right--;\n  }\n  return true;\n}',
      options: ['true', 'false', 'Compilation error', 'StringIndexOutOfBoundsException'],
      correct: [0],
      explanation:
        'This is the standard two-pointer palindrome check: it compares characters from the outside in and stops early the moment a mismatch is found. "racecar" is symmetric — r/r, a/a, c/c, e (middle, never compared to itself since left < right stops the loop) — every pair of compared characters matches, so left and right cross without ever hitting the false branch, and the loop exits normally, returning true. This runs in O(n) time and O(1) space, unlike a solution that reverses the string and compares.',
      ru: {
        question: 'Что вернёт этот метод для s = "racecar"?\n\nstatic boolean isPalindrome(String s) {\n  int left = 0, right = s.length() - 1;\n  while (left < right) {\n    if (s.charAt(left) != s.charAt(right)) return false;\n    left++;\n    right--;\n  }\n  return true;\n}',
        options: ['true', 'false', 'Ошибка компиляции', 'StringIndexOutOfBoundsException'],
        explanation:
          'Это стандартная проверка палиндрома двумя указателями: символы сравниваются снаружи внутрь, и цикл останавливается досрочно при первом же несовпадении. "racecar" симметрична — r/r, a/a, c/c, e (средний символ, никогда не сравнивается сам с собой, так как условие left < right останавливает цикл) — каждая сравниваемая пара совпадает, поэтому left и right пересекаются, ни разу не попав в ветку false, и цикл завершается штатно, возвращая true. Это работает за O(n) по времени и O(1) по памяти, в отличие от решения, которое разворачивает строку и сравнивает.',
      },
    },
    {
      q: 'Array nums contains every integer from 0 to n exactly once except one, which is missing. What does this correctly compute?\n\nstatic int missingNumber(int[] nums) {\n  int n = nums.length;\n  int expectedSum = n * (n + 1) / 2;\n  int actualSum = 0;\n  for (int x : nums) actualSum += x;\n  return expectedSum - actualSum;\n}',
      options: [
        'The missing number, using the Gauss sum formula',
        'The sum of all elements in nums',
        'The largest missing gap in the array, but only if nums is sorted',
        'It always returns 0 regardless of input',
      ],
      correct: [0],
      explanation:
        'This uses Gauss\'s formula: the sum of all integers from 0 to n is n*(n+1)/2. Since nums has n elements drawn from the range [0, n] with exactly one number missing, subtracting the actual sum of the array from the expected full-range sum isolates exactly the missing value — no sorting or extra space required, and it runs in O(n) time, O(1) space. For example nums = {3,0,1} has n=3, expectedSum = 3*4/2 = 6, actualSum = 4, so it returns 2, the missing number.',
      ru: {
        question: 'Массив nums содержит каждое целое число от 0 до n ровно один раз, кроме одного отсутствующего. Что корректно вычисляет этот метод?\n\nstatic int missingNumber(int[] nums) {\n  int n = nums.length;\n  int expectedSum = n * (n + 1) / 2;\n  int actualSum = 0;\n  for (int x : nums) actualSum += x;\n  return expectedSum - actualSum;\n}',
        options: [
          'Отсутствующее число, по формуле суммы Гаусса',
          'Сумму всех элементов nums',
          'Наибольший пропуск в массиве, но только если nums отсортирован',
          'Он всегда возвращает 0 независимо от входа',
        ],
        explanation:
          'Здесь используется формула Гаусса: сумма всех целых чисел от 0 до n равна n*(n+1)/2. Так как nums содержит n элементов из диапазона [0, n] с ровно одним отсутствующим числом, вычитание фактической суммы массива из ожидаемой суммы полного диапазона выделяет ровно недостающее значение — без сортировки и без дополнительной памяти, за O(n) по времени и O(1) по памяти. Например, nums = {3,0,1} даёт n=3, expectedSum = 3*4/2 = 6, actualSum = 4, поэтому возвращается 2 — отсутствующее число.',
      },
    },
    {
      q: 'What does nums contain after this call on nums = {1, 1, 2, 2, 3}, and what does it return?\n\nstatic int removeDuplicates(int[] nums) {\n  int k = 1;\n  for (int i = 1; i < nums.length; i++) {\n    if (nums[i] != nums[k - 1]) {\n      nums[k] = nums[i];\n      k++;\n    }\n  }\n  return k;\n}',
      options: [
        'Returns 3; the first 3 slots of nums become {1, 2, 3}',
        'Returns 5; nums is unchanged',
        'Returns 3; nums becomes {1, 1, 2, 2, 3} unchanged',
        'Throws ArrayIndexOutOfBoundsException'
      ],
      correct: [0],
      explanation:
        'This is the in-place "remove duplicates from sorted array" pattern using a slow pointer k that marks where the next unique element should be written, and a fast pointer i that scans ahead. Tracing nums = {1,1,2,2,3}: i=1, nums[1]=1 equals nums[k-1]=nums[0]=1, skip. i=2, nums[2]=2 != nums[0]=1, so nums[1]=2, k becomes 2. i=3, nums[3]=2 equals nums[k-1]=nums[1]=2, skip. i=4, nums[4]=3 != nums[1]=2, so nums[2]=3, k becomes 3. Final array (first k=3 slots): {1,2,3}; method returns k=3. Anything past index k-1 is leftover and considered irrelevant by convention.',
      ru: {
        question: 'Что содержит nums после этого вызова на nums = {1, 1, 2, 2, 3}, и что метод возвращает?\n\nstatic int removeDuplicates(int[] nums) {\n  int k = 1;\n  for (int i = 1; i < nums.length; i++) {\n    if (nums[i] != nums[k - 1]) {\n      nums[k] = nums[i];\n      k++;\n    }\n  }\n  return k;\n}',
        options: [
          'Возвращает 3; первые 3 ячейки nums становятся {1, 2, 3}',
          'Возвращает 5; nums не меняется',
          'Возвращает 3; nums остаётся {1, 1, 2, 2, 3} без изменений',
          'Выбрасывает ArrayIndexOutOfBoundsException',
        ],
        explanation:
          'Это шаблон удаления дубликатов из отсортированного массива на месте с медленным указателем k, отмечающим, куда записать следующий уникальный элемент, и быстрым указателем i, сканирующим вперёд. Трассировка nums = {1,1,2,2,3}: i=1, nums[1]=1 равно nums[k-1]=nums[0]=1, пропуск. i=2, nums[2]=2 != nums[0]=1, поэтому nums[1]=2, k становится 2. i=3, nums[3]=2 равно nums[k-1]=nums[1]=2, пропуск. i=4, nums[4]=3 != nums[1]=2, поэтому nums[2]=3, k становится 3. Итоговый массив (первые k=3 ячейки): {1,2,3}; метод возвращает k=3. Всё после индекса k-1 — остаточный мусор и по соглашению не учитывается.',
      },
    },
    {
      q: 'Given sorted arrays a = {1, 3, 5} and b = {2, 4, 6}, what does merge(a, b) return?\n\nstatic int[] merge(int[] a, int[] b) {\n  int[] result = new int[a.length + b.length];\n  int i = 0, j = 0, k = 0;\n  while (i < a.length && j < b.length) {\n    result[k++] = (a[i] <= b[j]) ? a[i++] : b[j++];\n  }\n  while (i < a.length) result[k++] = a[i++];\n  while (j < b.length) result[k++] = b[j++];\n  return result;\n}',
      options: ['{1, 2, 3, 4, 5, 6}', '{1, 3, 5, 2, 4, 6}', '{2, 1, 4, 3, 6, 5}', '{6, 5, 4, 3, 2, 1}'],
      correct: [0],
      explanation:
        'This is the merge step from merge sort: it compares the current front elements of both sorted arrays and always takes the smaller one, advancing only that array\'s pointer, so the combined output stays sorted. Tracing: compare 1 vs 2 → take 1; compare 3 vs 2 → take 2; compare 3 vs 4 → take 3; compare 5 vs 4 → take 4; compare 5 vs 6 → take 5; a is exhausted, so the trailing while drains the rest of b, appending 6. Result: {1, 2, 3, 4, 5, 6}. The two tail while-loops matter because once one array runs out, the other\'s remaining elements are already sorted and just need to be copied over.',
      ru: {
        question: 'Даны отсортированные массивы a = {1, 3, 5} и b = {2, 4, 6}. Что вернёт merge(a, b)?\n\nstatic int[] merge(int[] a, int[] b) {\n  int[] result = new int[a.length + b.length];\n  int i = 0, j = 0, k = 0;\n  while (i < a.length && j < b.length) {\n    result[k++] = (a[i] <= b[j]) ? a[i++] : b[j++];\n  }\n  while (i < a.length) result[k++] = a[i++];\n  while (j < b.length) result[k++] = b[j++];\n  return result;\n}',
        options: ['{1, 2, 3, 4, 5, 6}', '{1, 3, 5, 2, 4, 6}', '{2, 1, 4, 3, 6, 5}', '{6, 5, 4, 3, 2, 1}'],
        explanation:
          'Это шаг слияния из сортировки слиянием: сравниваются текущие головные элементы обоих отсортированных массивов, и всегда берётся меньший, продвигая указатель только этого массива, поэтому объединённый результат остаётся отсортированным. Трассировка: сравниваем 1 и 2 → берём 1; сравниваем 3 и 2 → берём 2; сравниваем 3 и 4 → берём 3; сравниваем 5 и 4 → берём 4; сравниваем 5 и 6 → берём 5; a исчерпан, поэтому завершающий while дописывает остаток b, добавляя 6. Результат: {1, 2, 3, 4, 5, 6}. Два завершающих while-цикла важны, потому что как только один массив заканчивается, оставшиеся элементы другого уже отсортированы и их нужно просто скопировать.',
      },
    },
    {
      q: 'What does this return for s = "Hello World"?\n\nstatic int countVowels(String s) {\n  String vowels = "aeiouAEIOU";\n  int count = 0;\n  for (char c : s.toCharArray()) {\n    if (vowels.indexOf(c) != -1) count++;\n  }\n  return count;\n}',
      options: ['3', '2', '4', '11'],
      correct: [0],
      explanation:
        '"Hello World" has these vowels, case-insensitively: e (in Hello), o (in Hello), o (in World) — that\'s 3 vowel characters. indexOf(c) on the vowels string returns -1 only when c is not found among "aeiouAEIOU", so both uppercase and lowercase vowels are counted correctly here because both cases are included in that lookup string; a common bug in this pattern is forgetting to include the uppercase letters, which would under-count words with capitalized vowels.',
      ru: {
        question: 'Что вернёт этот метод для s = "Hello World"?\n\nstatic int countVowels(String s) {\n  String vowels = "aeiouAEIOU";\n  int count = 0;\n  for (char c : s.toCharArray()) {\n    if (vowels.indexOf(c) != -1) count++;\n  }\n  return count;\n}',
        options: ['3', '2', '4', '11'],
        explanation:
          'В "Hello World" следующие гласные без учёта регистра: e (в Hello), o (в Hello), o (в World) — итого 3 гласных символа. indexOf(c) на строке vowels возвращает -1, только если c не найден среди "aeiouAEIOU", поэтому здесь корректно считаются и строчные, и заглавные гласные, так как оба регистра включены в эту строку поиска; типичная ошибка в этом шаблоне — забыть включить заглавные буквы, что занизило бы счёт для слов с гласными в верхнем регистре.',
      },
    },
    {
      q: 'What does binarySearch(new int[]{1,3,5,7,9,11}, 7) return?\n\nstatic int binarySearch(int[] a, int target) {\n  int lo = 0, hi = a.length - 1;\n  while (lo <= hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (a[mid] == target) return mid;\n    else if (a[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}',
      options: ['3', '2', '-1', '4'],
      correct: [0],
      explanation:
        'Tracing: lo=0, hi=5, mid=2, a[2]=5 < 7, so lo becomes 3. Next: lo=3, hi=5, mid=4, a[4]=9 > 7, so hi becomes 3. Next: lo=3, hi=3, mid=3, a[3]=7 == 7, return 3. Note the mid calculation, lo + (hi - lo) / 2, is deliberately written this way instead of (lo + hi) / 2 to avoid integer overflow when lo and hi are both very large — a well-known subtlety in binary search implementations, though it doesn\'t change the result for small arrays like this one.',
      ru: {
        question: 'Что вернёт binarySearch(new int[]{1,3,5,7,9,11}, 7)?\n\nstatic int binarySearch(int[] a, int target) {\n  int lo = 0, hi = a.length - 1;\n  while (lo <= hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (a[mid] == target) return mid;\n    else if (a[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}',
        options: ['3', '2', '-1', '4'],
        explanation:
          'Трассировка: lo=0, hi=5, mid=2, a[2]=5 < 7, значит lo становится 3. Далее: lo=3, hi=5, mid=4, a[4]=9 > 7, значит hi становится 3. Далее: lo=3, hi=3, mid=3, a[3]=7 == 7, возврат 3. Обратите внимание, что вычисление mid, lo + (hi - lo) / 2, специально записано так вместо (lo + hi) / 2, чтобы избежать переполнения int, когда lo и hi очень велики — известная тонкость в реализациях бинарного поиска, хотя для такого маленького массива на результат это не влияет.',
      },
    },
    {
      q: 'This recursive Fibonacci has a bug that makes it never terminate for n > 0. What is missing?\n\nstatic long fib(int n) {\n  return fib(n - 1) + fib(n - 2);\n}',
      options: [
        'A base case, e.g. `if (n <= 1) return n;`, before the recursive call',
        'A loop instead of recursion',
        'The method should be static',
        'Nothing — this compiles and runs correctly as-is',
      ],
      correct: [0],
      explanation:
        'Every recursive method needs at least one base case that stops the recursion without calling itself, or it recurses forever until the call stack overflows (StackOverflowError). This version always calls fib(n-1) and fib(n-2) unconditionally, including for n=0 or n=1 or even negative n, so it never bottoms out. The standard fix adds `if (n <= 1) return n;` as the first line, so fib(0)=0 and fib(1)=1 terminate the recursion directly instead of recursing into negative territory forever.',
      ru: {
        question: 'В этой рекурсивной функции Фибоначчи есть ошибка, из-за которой она никогда не завершается для n > 0. Чего не хватает?\n\nstatic long fib(int n) {\n  return fib(n - 1) + fib(n - 2);\n}',
        options: [
          'Базового случая, например `if (n <= 1) return n;`, перед рекурсивным вызовом',
          'Цикла вместо рекурсии',
          'Метод должен быть static',
          'Ничего — это компилируется и корректно работает как есть',
        ],
        explanation:
          'Каждому рекурсивному методу нужен как минимум один базовый случай, останавливающий рекурсию без вызова самого себя, иначе она рекурсирует бесконечно, пока не переполнится стек вызовов (StackOverflowError). Эта версия безусловно вызывает fib(n-1) и fib(n-2), в том числе для n=0, n=1 или даже отрицательных n, поэтому никогда не доходит до дна. Стандартное исправление — добавить `if (n <= 1) return n;` первой строкой, чтобы fib(0)=0 и fib(1)=1 сразу завершали рекурсию, а не уходили бесконечно в отрицательную область.',
      },
    },
    {
      q: 'What does this return for nums = {1, 2, 3, 1}?\n\nstatic boolean containsDuplicate(int[] nums) {\n  Set<Integer> seen = new HashSet<>();\n  for (int n : nums) {\n    if (!seen.add(n)) return true;\n  }\n  return false;\n}',
      options: ['true', 'false', 'Compilation error', 'It depends on HashSet iteration order'],
      correct: [0],
      explanation:
        'Set.add(n) returns false if n was already present in the set (no insertion happened) and true if it was newly added. The loop relies on that: `!seen.add(n)` is true exactly when n is a duplicate. Tracing {1,2,3,1}: add(1)→true, not dup; add(2)→true, not dup; add(3)→true, not dup; add(1)→false because 1 is already in the set, so !false is true and the method returns true immediately. This is an O(n) time, O(n) space alternative to sorting the array first and checking adjacent elements, which would be O(n log n).',
      ru: {
        question: 'Что вернёт этот метод для nums = {1, 2, 3, 1}?\n\nstatic boolean containsDuplicate(int[] nums) {\n  Set<Integer> seen = new HashSet<>();\n  for (int n : nums) {\n    if (!seen.add(n)) return true;\n  }\n  return false;\n}',
        options: ['true', 'false', 'Ошибка компиляции', 'Зависит от порядка итерации HashSet'],
        explanation:
          'Set.add(n) возвращает false, если n уже был в множестве (вставки не произошло), и true, если он был добавлен впервые. Цикл опирается на это: `!seen.add(n)` истинно ровно тогда, когда n — дубликат. Трассировка {1,2,3,1}: add(1)→true, не дубликат; add(2)→true, не дубликат; add(3)→true, не дубликат; add(1)→false, так как 1 уже в множестве, поэтому !false равно true, и метод сразу возвращает true. Это альтернатива за O(n) по времени и O(n) по памяти сортировке массива с последующей проверкой соседних элементов, которая была бы O(n log n).',
      },
    },
    {
      q: 'What does this return for n = 12345?\n\nstatic int digitSum(int n) {\n  int sum = 0;\n  while (n > 0) {\n    sum += n % 10;\n    n /= 10;\n  }\n  return sum;\n}',
      options: ['15', '12345', '5', '1'],
      correct: [0],
      explanation:
        'The loop peels off one digit at a time from the right using n % 10 (the last digit) and then removes that digit with integer division n /= 10. For n=12345: sum += 5 (n becomes 1234), sum += 4 → 9 (n becomes 123), sum += 3 → 12 (n becomes 12), sum += 2 → 14 (n becomes 1), sum += 1 → 15 (n becomes 0), loop ends since n > 0 is now false. Total: 1+2+3+4+5 = 15.',
      ru: {
        question: 'Что вернёт этот метод для n = 12345?\n\nstatic int digitSum(int n) {\n  int sum = 0;\n  while (n > 0) {\n    sum += n % 10;\n    n /= 10;\n  }\n  return sum;\n}',
        options: ['15', '12345', '5', '1'],
        explanation:
          'Цикл отделяет по одной цифре справа с помощью n % 10 (последняя цифра), а затем убирает эту цифру целочисленным делением n /= 10. Для n=12345: sum += 5 (n становится 1234), sum += 4 → 9 (n становится 123), sum += 3 → 12 (n становится 12), sum += 2 → 14 (n становится 1), sum += 1 → 15 (n становится 0), цикл заканчивается, так как n > 0 теперь ложно. Итого: 1+2+3+4+5 = 15.',
      },
    },
    {
      q: 'Array nums = {4, 1, 2, 1, 2} has every number appearing twice except one. What does this return, and how?\n\nstatic int singleNumber(int[] nums) {\n  int result = 0;\n  for (int n : nums) {\n    result ^= n;\n  }\n  return result;\n}',
      options: [
        '4 — XOR cancels out every pair, leaving only the unpaired value',
        '0 — XOR of any array always ends up at 0',
        '1 — the smallest value in the array',
        'Compilation error — cannot XOR int with int'
      ],
      correct: [0],
      explanation:
        'XOR (^) has two key properties: x ^ x = 0 (a value XORed with itself cancels out) and x ^ 0 = x, and XOR is commutative/associative, so the order of operations doesn\'t matter. Since every number except one appears exactly twice, XORing the whole array cancels out every paired value (they XOR to 0 with their duplicate) and leaves only the single unpaired number. Tracing {4,1,2,1,2}: 4^1=5, 5^2=7, 7^1=6, 6^2=4 — the two 1s and two 2s cancel each other out, leaving 4. This is O(n) time, O(1) space, notably better than using a HashMap to count occurrences.',
      ru: {
        question: 'Массив nums = {4, 1, 2, 1, 2} — каждое число встречается дважды, кроме одного. Что вернёт этот метод и почему?\n\nstatic int singleNumber(int[] nums) {\n  int result = 0;\n  for (int n : nums) {\n    result ^= n;\n  }\n  return result;\n}',
        options: [
          '4 — XOR взаимно уничтожает каждую пару, оставляя только непарное значение',
          '0 — XOR любого массива всегда сводится к 0',
          '1 — наименьшее значение в массиве',
          'Ошибка компиляции — нельзя применить XOR к int с int',
        ],
        explanation:
          'У XOR (^) два ключевых свойства: x ^ x = 0 (значение, применённое к XOR с самим собой, обнуляется) и x ^ 0 = x, а также XOR коммутативен и ассоциативен, поэтому порядок операций не важен. Так как каждое число, кроме одного, встречается ровно дважды, применение XOR ко всему массиву обнуляет каждое парное значение (оно даёт XOR 0 со своим дубликатом) и оставляет только единственное непарное число. Трассировка {4,1,2,1,2}: 4^1=5, 5^2=7, 7^1=6, 6^2=4 — две единицы и две двойки взаимно уничтожаются, остаётся 4. Это O(n) по времени и O(1) по памяти — заметно лучше, чем подсчёт вхождений через HashMap.',
      },
    },
  ],

  'leetcode-medium': [
    {
      q: 'Which change makes this Two Sum run in O(n) time instead of the O(n²) brute force?\n\nstatic int[] twoSum(int[] nums, int target) {\n  Map<Integer, Integer> seen = new HashMap<>();\n  for (int i = 0; i < nums.length; i++) {\n    int complement = target - nums[i];\n    if (seen.containsKey(complement)) {\n      return new int[]{seen.get(complement), i};\n    }\n    seen.put(nums[i], i);\n  }\n  return new int[]{};\n}',
      options: [
        'Using a HashMap to look up the needed complement in O(1) per element during a single pass',
        'Sorting the array first, which is always faster than a HashMap',
        'Using nested loops but breaking out early',
        'Using recursion instead of a loop'
      ],
      correct: [0],
      explanation:
        'This is the standard one-pass Two Sum: for each element, it computes the complement (target - nums[i]) needed to reach target, and checks a HashMap of previously-seen values in O(1) average time. If the complement was already seen, the pair is found immediately using the stored index and the current index i; otherwise the current value is recorded for future lookups. Because each element is processed once with O(1) map operations, the whole algorithm is O(n) time and O(n) space — a direct improvement over the O(n²) nested-loop brute force.',
      ru: {
        question: 'Какое изменение делает этот Two Sum за O(n), а не за O(n²) как перебор?\n\nstatic int[] twoSum(int[] nums, int target) {\n  Map<Integer, Integer> seen = new HashMap<>();\n  for (int i = 0; i < nums.length; i++) {\n    int complement = target - nums[i];\n    if (seen.containsKey(complement)) {\n      return new int[]{seen.get(complement), i};\n    }\n    seen.put(nums[i], i);\n  }\n  return new int[]{};\n}',
        options: [
          'Использование HashMap для поиска нужного дополнения за O(1) на элемент за один проход',
          'Предварительная сортировка массива, которая всегда быстрее HashMap',
          'Использование вложенных циклов, но с ранним выходом',
          'Использование рекурсии вместо цикла',
        ],
        explanation:
          'Это стандартный однопроходный Two Sum: для каждого элемента вычисляется дополнение (target - nums[i]), необходимое для получения target, и проверяется HashMap ранее встреченных значений за O(1) в среднем. Если дополнение уже встречалось, пара сразу найдена по сохранённому индексу и текущему индексу i; иначе текущее значение запоминается для будущих поисков. Поскольку каждый элемент обрабатывается один раз с O(1) операциями над картой, весь алгоритм работает за O(n) по времени и O(n) по памяти — прямое улучшение по сравнению с O(n²) перебором на вложенных циклах.',
      },
    },
    {
      q: 'What does this sliding-window method return for s = "abcabcbb"?\n\nstatic int lengthOfLongestSubstring(String s) {\n  Map<Character, Integer> lastIndex = new HashMap<>();\n  int start = 0, best = 0;\n  for (int end = 0; end < s.length(); end++) {\n    char c = s.charAt(end);\n    if (lastIndex.containsKey(c) && lastIndex.get(c) >= start) {\n      start = lastIndex.get(c) + 1;\n    }\n    lastIndex.put(c, end);\n    best = Math.max(best, end - start + 1);\n  }\n  return best;\n}',
      options: ['3', '8', '2', '6'],
      correct: [0],
      explanation:
        'This finds the length of the longest substring without repeating characters using a sliding window: `start` marks the left edge of the current window, and whenever a repeated character is found within the current window, start jumps past its previous occurrence. For "abcabcbb": window grows through a,b,c reaching length 3 (best=3); at the second \'a\' (index 3), it was last seen at index 0 which is >= start, so start jumps to 1 — window "bca" is still length 3; this pattern continues (b, then c cause similar jumps) and later the two \'b\'s collapse the window down to length 1. The longest window seen throughout is "abc" (or "bca", "cab") with length 3, which is what best ends up holding.',
      ru: {
        question: 'Что вернёт этот метод со скользящим окном для s = "abcabcbb"?\n\nstatic int lengthOfLongestSubstring(String s) {\n  Map<Character, Integer> lastIndex = new HashMap<>();\n  int start = 0, best = 0;\n  for (int end = 0; end < s.length(); end++) {\n    char c = s.charAt(end);\n    if (lastIndex.containsKey(c) && lastIndex.get(c) >= start) {\n      start = lastIndex.get(c) + 1;\n    }\n    lastIndex.put(c, end);\n    best = Math.max(best, end - start + 1);\n  }\n  return best;\n}',
        options: ['3', '8', '2', '6'],
        explanation:
          'Этот метод находит длину самой длинной подстроки без повторяющихся символов с помощью скользящего окна: `start` отмечает левую границу текущего окна, и как только внутри текущего окна встречается повторяющийся символ, start перескакивает за его предыдущее вхождение. Для "abcabcbb": окно растёт через a,b,c, достигая длины 3 (best=3); на второй \'a\' (индекс 3), которая последний раз встречалась на индексе 0, что >= start, start перескакивает на 1 — окно "bca" всё ещё длины 3; этот паттерн продолжается (b, затем c вызывают похожие скачки), а позже две \'b\' сжимают окно до длины 1. Самое длинное окно за всё время — "abc" (или "bca", "cab") длиной 3, именно это в итоге хранится в best.',
      },
    },
    {
      q: 'What key does this use to group anagrams together, given words = {"eat", "tea", "tan"}?\n\nstatic Map<String, List<String>> groupAnagrams(String[] words) {\n  Map<String, List<String>> groups = new HashMap<>();\n  for (String w : words) {\n    char[] chars = w.toCharArray();\n    Arrays.sort(chars);\n    String key = new String(chars);\n    groups.computeIfAbsent(key, k -> new ArrayList<>()).add(w);\n  }\n  return groups;\n}',
      options: [
        'The sorted characters of the word (e.g. "eat" and "tea" both map to key "aet")',
        'The word\'s length',
        'The word\'s first character',
        'The word itself, unmodified'
      ],
      correct: [0],
      explanation:
        'Anagrams contain exactly the same letters in a different order, so sorting each word\'s characters produces an identical key for every anagram of the same letters. "eat" sorted is "aet"; "tea" sorted is also "aet" — same key, so both land in the same group/bucket. "tan" sorted is "ant" — a different key, so it goes into its own group. computeIfAbsent lazily creates the list for a new key and appends to an existing one otherwise, which is the standard idiom for building a HashMap<K, List<V>> grouping structure without null-checking every time.',
      ru: {
        question: 'Какой ключ этот метод использует для группировки анаграмм, при words = {"eat", "tea", "tan"}?\n\nstatic Map<String, List<String>> groupAnagrams(String[] words) {\n  Map<String, List<String>> groups = new HashMap<>();\n  for (String w : words) {\n    char[] chars = w.toCharArray();\n    Arrays.sort(chars);\n    String key = new String(chars);\n    groups.computeIfAbsent(key, k -> new ArrayList<>()).add(w);\n  }\n  return groups;\n}',
        options: [
          'Отсортированные символы слова (например, "eat" и "tea" оба дают ключ "aet")',
          'Длину слова',
          'Первый символ слова',
          'Само слово без изменений',
        ],
        explanation:
          'Анаграммы содержат ровно те же буквы в другом порядке, поэтому сортировка символов каждого слова даёт одинаковый ключ для любой анаграммы из тех же букв. "eat" отсортированное — "aet"; "tea" отсортированное — тоже "aet" — одинаковый ключ, поэтому оба попадают в одну группу/корзину. "tan" отсортированное — "ant" — другой ключ, поэтому оно идёт в отдельную группу. computeIfAbsent лениво создаёт список для нового ключа и дописывает в существующий иначе — это стандартная идиома построения структуры группировки HashMap<K, List<V>> без ручной проверки на null каждый раз.',
      },
    },
    {
      q: 'What does this return for intervals = {{1,3},{2,6},{8,10},{15,18}}?\n\nstatic int[][] merge(int[][] intervals) {\n  Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n  List<int[]> result = new ArrayList<>();\n  for (int[] iv : intervals) {\n    if (result.isEmpty() || result.get(result.size() - 1)[1] < iv[0]) {\n      result.add(iv);\n    } else {\n      result.get(result.size() - 1)[1] = Math.max(result.get(result.size() - 1)[1], iv[1]);\n    }\n  }\n  return result.toArray(new int[0][]);\n}',
      options: [
        '{{1,6},{8,10},{15,18}}',
        '{{1,3},{2,6},{8,10},{15,18}}',
        '{{1,18}}',
        '{{1,3},{8,18}}'
      ],
      correct: [0],
      explanation:
        'After sorting by start time (already sorted here), the algorithm walks through and merges any interval whose start is <= the end of the last interval already placed in result. {1,3} starts result. {2,6}: 2 <= 3 (last end), so they overlap — merge to {1, max(3,6)} = {1,6}. {8,10}: 8 <= 6 is false, no overlap, so it\'s added as its own interval. {15,18}: 15 <= 10 is false, added separately. Final merged list: {{1,6},{8,10},{15,18}}. The key insight is that after sorting by start, only the most recently added interval in the result needs to be checked for overlap — earlier ones can never overlap a later interval once merged correctly.',
      ru: {
        question: 'Что вернёт этот метод для intervals = {{1,3},{2,6},{8,10},{15,18}}?\n\nstatic int[][] merge(int[][] intervals) {\n  Arrays.sort(intervals, (a, b) -> a[0] - b[0]);\n  List<int[]> result = new ArrayList<>();\n  for (int[] iv : intervals) {\n    if (result.isEmpty() || result.get(result.size() - 1)[1] < iv[0]) {\n      result.add(iv);\n    } else {\n      result.get(result.size() - 1)[1] = Math.max(result.get(result.size() - 1)[1], iv[1]);\n    }\n  }\n  return result.toArray(new int[0][]);\n}',
        options: [
          '{{1,6},{8,10},{15,18}}',
          '{{1,3},{2,6},{8,10},{15,18}}',
          '{{1,18}}',
          '{{1,3},{8,18}}',
        ],
        explanation:
          'После сортировки по началу (здесь уже отсортировано) алгоритм проходит по интервалам и объединяет любой, чьё начало <= концу последнего интервала, уже помещённого в result. {1,3} начинает result. {2,6}: 2 <= 3 (последний конец), значит они пересекаются — объединяем в {1, max(3,6)} = {1,6}. {8,10}: 8 <= 6 ложно, пересечения нет, поэтому добавляется как отдельный интервал. {15,18}: 15 <= 10 ложно, добавляется отдельно. Итоговый список: {{1,6},{8,10},{15,18}}. Ключевая идея в том, что после сортировки по началу нужно проверять на пересечение только последний добавленный в result интервал — более ранние никогда не пересекутся с более поздним, если объединение выполняется корректно.',
      },
    },
    {
      q: 'This is Kadane\'s algorithm for maximum subarray sum. What does it return for nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4}?\n\nstatic int maxSubArray(int[] nums) {\n  int best = nums[0], current = nums[0];\n  for (int i = 1; i < nums.length; i++) {\n    current = Math.max(nums[i], current + nums[i]);\n    best = Math.max(best, current);\n  }\n  return best;\n}',
      options: ['6', '4', '9', '-1'],
      correct: [0],
      explanation:
        'Kadane\'s algorithm decides, at each position, whether to extend the previous subarray (current + nums[i]) or start a fresh one at nums[i] — whichever gives a larger sum — while best tracks the maximum seen so far. For this array, the maximum-sum contiguous subarray is {4, -1, 2, 1}, which sums to 6. Tracing briefly: after processing index 3 (value 4), current resets to 4 because current+4 (from a negative running total) would be worse; then 4-1=3, 3+2=5, 5+1=6 — best becomes 6 and stays 6 since the remaining elements (-5, 4) can\'t beat it (current drops to 1, then 5, never exceeding 6).',
      ru: {
        question: 'Это алгоритм Кадане для максимальной суммы подмассива. Что он вернёт для nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4}?\n\nstatic int maxSubArray(int[] nums) {\n  int best = nums[0], current = nums[0];\n  for (int i = 1; i < nums.length; i++) {\n    current = Math.max(nums[i], current + nums[i]);\n    best = Math.max(best, current);\n  }\n  return best;\n}',
        options: ['6', '4', '9', '-1'],
        explanation:
          'Алгоритм Кадане на каждой позиции решает, продолжать ли предыдущий подмассив (current + nums[i]) или начать новый с nums[i] — смотря что даёт большую сумму — а best отслеживает максимум, встреченный до сих пор. Для этого массива подмассив с максимальной суммой — {4, -1, 2, 1}, дающий в сумме 6. Кратко трассируя: после обработки индекса 3 (значение 4) current сбрасывается до 4, потому что current+4 (от отрицательного накопленного значения) был бы хуже; затем 4-1=3, 3+2=5, 5+1=6 — best становится 6 и остаётся 6, так как оставшиеся элементы (-5, 4) не могут его превзойти (current падает до 1, затем до 5, никогда не превышая 6).',
      },
    },
    {
      q: 'For the binary tree      3\n                     / \\\n                    9   20\n                       /  \\\n                      15   7\nwhat does this level-order (BFS) traversal print?\n\nstatic void levelOrder(TreeNode root) {\n  Queue<TreeNode> queue = new LinkedList<>();\n  queue.add(root);\n  while (!queue.isEmpty()) {\n    TreeNode node = queue.poll();\n    System.out.print(node.val + " ");\n    if (node.left != null) queue.add(node.left);\n    if (node.right != null) queue.add(node.right);\n  }\n}',
      options: ['3 9 20 15 7', '3 9 15 20 7', '9 3 15 7 20', '3 20 9 7 15'],
      correct: [0],
      explanation:
        'A Queue (FIFO) drives breadth-first / level-order traversal: nodes are visited in the order they were added, level by level, left before right. Start: queue=[3]. Poll 3, print "3", enqueue its children [9, 20] → queue=[9,20]. Poll 9, print "9", it has no children → queue=[20]. Poll 20, print "20", enqueue its children [15, 7] → queue=[15,7]. Poll 15, print "15" → queue=[7]. Poll 7, print "7" → queue empty, done. Output: "3 9 20 15 7 " — root, then all of level 1 left-to-right, then all of level 2 left-to-right. This is why a Queue (not a Stack) is essential for BFS.',
      ru: {
        question: 'Для дерева      3\n            / \\\n           9   20\n              /  \\\n             15   7\nчто напечатает этот обход в ширину (BFS)?\n\nstatic void levelOrder(TreeNode root) {\n  Queue<TreeNode> queue = new LinkedList<>();\n  queue.add(root);\n  while (!queue.isEmpty()) {\n    TreeNode node = queue.poll();\n    System.out.print(node.val + " ");\n    if (node.left != null) queue.add(node.left);\n    if (node.right != null) queue.add(node.right);\n  }\n}',
        options: ['3 9 20 15 7', '3 9 15 20 7', '9 3 15 7 20', '3 20 9 7 15'],
        explanation:
          'Queue (FIFO) обеспечивает обход в ширину / по уровням: узлы посещаются в порядке добавления, уровень за уровнем, слева направо. Начало: queue=[3]. Извлекаем 3, печатаем "3", добавляем детей [9, 20] → queue=[9,20]. Извлекаем 9, печатаем "9", детей нет → queue=[20]. Извлекаем 20, печатаем "20", добавляем детей [15, 7] → queue=[15,7]. Извлекаем 15, печатаем "15" → queue=[7]. Извлекаем 7, печатаем "7" → очередь пуста, конец. Вывод: "3 9 20 15 7 " — корень, затем весь уровень 1 слева направо, затем весь уровень 2 слева направо. Именно поэтому для BFS необходима Queue, а не Stack.',
      },
    },
    {
      q: 'What does head point to (as a value) right after this loop finishes reversing list 1→2→3→null?\n\nstatic ListNode reverse(ListNode head) {\n  ListNode prev = null;\n  while (head != null) {\n    ListNode next = head.next;\n    head.next = prev;\n    prev = head;\n    head = next;\n  }\n  return prev;\n}',
      options: [
        'The method returns prev, which points to the node with value 3 (new head of 3→2→1→null)',
        'The method returns head, which is now null',
        'The list is reversed in place but the method returns the original head (value 1)',
        'It throws NullPointerException on the third iteration'
      ],
      correct: [0],
      explanation:
        'This is the classic iterative linked-list reversal: on each step it saves the next node before overwriting head.next (so the rest of the list isn\'t lost), rewires the current node to point backward to prev, then advances both prev and head forward. Tracing 1→2→3→null: iter1: next=2, node1.next=null, prev=1, head=2. iter2: next=3, node2.next=1, prev=2, head=3. iter3: next=null, node3.next=2, prev=3, head=null — loop ends since head is null. The method returns prev, which is node 3, and the list is now 3→2→1→null. Returning `head` instead of `prev` is a very common bug here, since head has become null by the time the loop exits.',
      ru: {
        question: 'На что указывает head (по значению) сразу после завершения этого цикла, разворачивающего список 1→2→3→null?\n\nstatic ListNode reverse(ListNode head) {\n  ListNode prev = null;\n  while (head != null) {\n    ListNode next = head.next;\n    head.next = prev;\n    prev = head;\n    head = next;\n  }\n  return prev;\n}',
        options: [
          'Метод возвращает prev, указывающий на узел со значением 3 (новая голова списка 3→2→1→null)',
          'Метод возвращает head, который теперь null',
          'Список разворачивается на месте, но метод возвращает исходный head (значение 1)',
          'Выбрасывается NullPointerException на третьей итерации',
        ],
        explanation:
          'Это классический итеративный разворот связного списка: на каждом шаге сохраняется следующий узел перед перезаписью head.next (чтобы не потерять остаток списка), текущий узел перенаправляется назад на prev, затем и prev, и head продвигаются вперёд. Трассировка 1→2→3→null: итер.1: next=2, node1.next=null, prev=1, head=2. итер.2: next=3, node2.next=1, prev=2, head=3. итер.3: next=null, node3.next=2, prev=3, head=null — цикл завершается, так как head равен null. Метод возвращает prev, то есть узел 3, и список теперь 3→2→1→null. Возврат `head` вместо `prev` — очень частая здесь ошибка, поскольку к моменту выхода из цикла head уже стал null.',
      },
    },
    {
      q: 'Which pair of strings makes this return false, given it is meant to check if two strings are anagrams?\n\nstatic boolean isAnagram(String s, String t) {\n  if (s.length() != t.length()) return false;\n  int[] counts = new int[26];\n  for (char c : s.toCharArray()) counts[c - \'a\']++;\n  for (char c : t.toCharArray()) counts[c - \'a\']--;\n  for (int c : counts) if (c != 0) return false;\n  return true;\n}',
      options: ['s = "rat", t = "car"', 's = "anagram", t = "nagaram"', 's = "listen", t = "silent"', 's = "abc", t = "cba"'],
      correct: [0],
      explanation:
        'This checks anagrams via a 26-slot frequency count (assuming lowercase a-z only): incrementing per character of s and decrementing per character of t, then confirming every slot nets to exactly 0 — meaning every letter appeared the same number of times in both strings. "rat" and "car" have the same length (3) but different letters (r,a,t vs c,a,r) — the counts for \'r\', \'t\', and \'c\' won\'t all cancel to zero, so it correctly returns false. The other three pairs are genuine anagrams of each other (same multiset of letters), so all their counts cancel to 0 and the method returns true for them.',
      ru: {
        question: 'Какая пара строк заставит этот метод вернуть false, если он должен проверять, являются ли две строки анаграммами?\n\nstatic boolean isAnagram(String s, String t) {\n  if (s.length() != t.length()) return false;\n  int[] counts = new int[26];\n  for (char c : s.toCharArray()) counts[c - \'a\']++;\n  for (char c : t.toCharArray()) counts[c - \'a\']--;\n  for (int c : counts) if (c != 0) return false;\n  return true;\n}',
        options: ['s = "rat", t = "car"', 's = "anagram", t = "nagaram"', 's = "listen", t = "silent"', 's = "abc", t = "cba"'],
        explanation:
          'Этот метод проверяет анаграммы через частотный массив из 26 ячеек (в предположении только строчных a-z): для каждого символа s значение увеличивается, для каждого символа t — уменьшается, а затем проверяется, что каждая ячейка равна ровно 0 — то есть каждая буква встретилась одинаковое число раз в обеих строках. "rat" и "car" имеют одинаковую длину (3), но разные буквы (r,a,t против c,a,r) — счётчики для \'r\', \'t\' и \'c\' не обнулятся все, поэтому метод корректно вернёт false. Остальные три пары — настоящие анаграммы друг друга (одинаковый мультисет букв), поэтому все их счётчики обнуляются, и метод вернёт для них true.',
      },
    },
    {
      q: 'Array nums = {4, 5, 6, 7, 0, 1, 2} is a sorted array rotated at some pivot. Which approach correctly finds target = 0 in O(log n) time?\n\nstatic int search(int[] nums, int target) {\n  int lo = 0, hi = nums.length - 1;\n  while (lo <= hi) {\n    int mid = (lo + hi) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[lo] <= nums[mid]) {\n      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;\n      else lo = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;\n      else hi = mid - 1;\n    }\n  }\n  return -1;\n}',
      options: [
        'Modified binary search: determine which half is sorted, then check if target falls in that half\'s range',
        'Linear scan from index 0',
        'Sort the array first, then binary search, then map back to original indices',
        'Binary search only works on rotated arrays if you rotate it back to sorted order first (O(n))'
      ],
      correct: [0],
      explanation:
        'The trick for searching a rotated sorted array in O(log n) is recognizing that at any mid point, at least one half (lo..mid or mid..hi) is still normally sorted, even though the array as a whole isn\'t. The code checks nums[lo] <= nums[mid] to determine which half is sorted, then checks whether target falls within that sorted half\'s value range — if so it searches there, otherwise it searches the other (unsorted-looking) half, which must itself contain a sorted sub-range and the rotation point. This preserves the halving-each-step property of binary search, keeping it O(log n) — sorting first would cost O(n log n) and defeat the purpose.',
      ru: {
        question: 'Массив nums = {4, 5, 6, 7, 0, 1, 2} — отсортированный массив, повёрнутый в некоторой точке. Какой подход корректно находит target = 0 за O(log n)?\n\nstatic int search(int[] nums, int target) {\n  int lo = 0, hi = nums.length - 1;\n  while (lo <= hi) {\n    int mid = (lo + hi) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[lo] <= nums[mid]) {\n      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;\n      else lo = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;\n      else hi = mid - 1;\n    }\n  }\n  return -1;\n}',
        options: [
          'Модифицированный бинарный поиск: определить, какая половина отсортирована, затем проверить, попадает ли target в её диапазон',
          'Линейный проход с индекса 0',
          'Сначала отсортировать массив, затем бинарный поиск, затем сопоставить обратно с исходными индексами',
          'Бинарный поиск работает на повёрнутом массиве, только если сначала повернуть его обратно в отсортированный порядок (O(n))',
        ],
        explanation:
          'Хитрость поиска в повёрнутом отсортированном массиве за O(log n) в том, чтобы заметить: в любой точке mid хотя бы одна половина (lo..mid или mid..hi) всё ещё отсортирована обычным образом, даже если массив в целом — нет. Код проверяет nums[lo] <= nums[mid], чтобы определить, какая половина отсортирована, затем проверяет, попадает ли target в диапазон значений этой отсортированной половины — если да, поиск продолжается там, иначе — в другой (кажущейся неотсортированной) половине, которая сама должна содержать отсортированный поддиапазон и точку поворота. Это сохраняет свойство деления пополам на каждом шаге, присущее бинарному поиску, оставляя сложность O(log n) — предварительная сортировка стоила бы O(n log n) и свела бы на нет весь смысл.',
      },
    },
    {
      q: 'This finds the kth largest element using a min-heap of size k. What is the time complexity, and what does it return for nums = {3,2,1,5,6,4}, k = 2?\n\nstatic int findKthLargest(int[] nums, int k) {\n  PriorityQueue<Integer> heap = new PriorityQueue<>();\n  for (int n : nums) {\n    heap.add(n);\n    if (heap.size() > k) heap.poll();\n  }\n  return heap.peek();\n}',
      options: [
        'O(n log k) time; returns 5',
        'O(n log n) time; returns 6',
        'O(n) time; returns 4',
        'O(k log n) time; returns 3'
      ],
      correct: [0],
      explanation:
        'PriorityQueue<Integer> in Java defaults to a min-heap (smallest element at the top). By keeping the heap capped at size k and always evicting the smallest element (heap.poll()) once it exceeds k, the heap ends up holding exactly the k largest elements seen so far, with the smallest of those k sitting at the top — which is exactly the kth largest overall. Each add/poll is O(log k), done n times, giving O(n log k) total — better than sorting the whole array (O(n log n)) when k is small. For {3,2,1,5,6,4}, k=2: after processing all elements the heap holds {5,6} (the two largest), and peek() returns the smaller of those, 5 — the 2nd largest element.',
      ru: {
        question: 'Этот метод находит k-й по величине элемент с помощью min-heap размера k. Какая временная сложность и что он вернёт для nums = {3,2,1,5,6,4}, k = 2?\n\nstatic int findKthLargest(int[] nums, int k) {\n  PriorityQueue<Integer> heap = new PriorityQueue<>();\n  for (int n : nums) {\n    heap.add(n);\n    if (heap.size() > k) heap.poll();\n  }\n  return heap.peek();\n}',
        options: [
          'O(n log k) по времени; возвращает 5',
          'O(n log n) по времени; возвращает 6',
          'O(n) по времени; возвращает 4',
          'O(k log n) по времени; возвращает 3',
        ],
        explanation:
          'PriorityQueue<Integer> в Java по умолчанию — min-heap (наименьший элемент на вершине). Ограничивая кучу размером k и всегда удаляя наименьший элемент (heap.poll()), как только размер превышает k, куча в итоге содержит ровно k наибольших встреченных элементов, а наименьший из этих k находится на вершине — это и есть k-й по величине элемент в целом. Каждая операция add/poll занимает O(log k), выполняется n раз, что даёт итого O(n log k) — лучше, чем сортировка всего массива (O(n log n)), когда k мало. Для {3,2,1,5,6,4}, k=2: после обработки всех элементов куча содержит {5,6} (два наибольших), и peek() возвращает меньший из них, 5 — 2-й по величине элемент.',
      },
    },
    {
      q: 'For grid = {{1,1,0},{1,0,0},{0,0,1}} (1 = land, 0 = water), how many islands does this DFS-based method count?\n\nstatic void sink(int[][] grid, int r, int c) {\n  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == 0) return;\n  grid[r][c] = 0;\n  sink(grid, r+1, c); sink(grid, r-1, c); sink(grid, r, c+1); sink(grid, r, c-1);\n}\nstatic int numIslands(int[][] grid) {\n  int count = 0;\n  for (int r = 0; r < grid.length; r++)\n    for (int c = 0; c < grid[0].length; c++)\n      if (grid[r][c] == 1) { count++; sink(grid, r, c); }\n  return count;\n}',
      options: ['2', '3', '4', '1'],
      correct: [0],
      explanation:
        'This is the "number of islands" flood-fill pattern: whenever the outer loop finds an unvisited land cell (1), it counts a new island and immediately calls sink() to depth-first-search in all 4 directions, turning every connected land cell into water (0) so it\'s never counted again. For this grid: (0,0)=1 and (0,1)=1 and (1,0)=1 are all connected (forming an L-shape), so they get sunk together as island #1. (2,2)=1 is isolated (surrounded by 0s), forming island #2 on its own. Total: 2 islands. The recursive sink() ensures the whole connected component is marked visited in one go, which is why the outer loop\'s count only increments on first contact with each island.',
      ru: {
        question: 'Для grid = {{1,1,0},{1,0,0},{0,0,1}} (1 = суша, 0 = вода), сколько островов насчитает этот метод на основе DFS?\n\nstatic void sink(int[][] grid, int r, int c) {\n  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == 0) return;\n  grid[r][c] = 0;\n  sink(grid, r+1, c); sink(grid, r-1, c); sink(grid, r, c+1); sink(grid, r, c-1);\n}\nstatic int numIslands(int[][] grid) {\n  int count = 0;\n  for (int r = 0; r < grid.length; r++)\n    for (int c = 0; c < grid[0].length; c++)\n      if (grid[r][c] == 1) { count++; sink(grid, r, c); }\n  return count;\n}',
        options: ['2', '3', '4', '1'],
        explanation:
          'Это шаблон заливки "количество островов": как только внешний цикл находит непосещённую сушу (1), он засчитывает новый остров и сразу вызывает sink() для обхода в глубину по всем 4 направлениям, превращая каждую связанную клетку суши в воду (0), чтобы она больше никогда не была учтена. Для этой сетки: (0,0)=1, (0,1)=1 и (1,0)=1 все связаны (образуя L-форму), поэтому они топятся вместе как остров №1. (2,2)=1 изолирован (окружён нулями), образуя остров №2 сам по себе. Итого: 2 острова. Рекурсивный sink() гарантирует, что вся связная компонента помечается посещённой за один заход, поэтому счётчик внешнего цикла увеличивается только при первом контакте с каждым островом.',
      },
    },
    {
      q: 'This solves "container with most water" using two pointers. What does it return for height = {1,8,6,2,5,4,8,3,7}?\n\nstatic int maxArea(int[] height) {\n  int left = 0, right = height.length - 1, best = 0;\n  while (left < right) {\n    int area = Math.min(height[left], height[right]) * (right - left);\n    best = Math.max(best, area);\n    if (height[left] < height[right]) left++; else right--;\n  }\n  return best;\n}',
      options: ['49', '48', '56', '16'],
      correct: [0],
      explanation:
        'The two pointers start at the widest possible container (index 0 and index 8) and move inward, always moving the pointer at the *shorter* wall — because moving the taller wall inward can never increase the area (width shrinks and the limiting height stays the same or gets worse), so it would never help. At left=0(h=1), right=8(h=7): area = min(1,7)*8 = 8, best=8, move left (shorter). This continues; the maximum area found while scanning turns out to be at left index 1 (h=8) and right index 8 (h=7): area = min(8,7)*(8-1) = 7*7 = 49 — the best result. Each pointer moves at most n times total, so this runs in O(n) time versus the O(n²) brute force of checking every pair.',
      ru: {
        question: 'Этот метод решает "контейнер с наибольшим количеством воды" двумя указателями. Что он вернёт для height = {1,8,6,2,5,4,8,3,7}?\n\nstatic int maxArea(int[] height) {\n  int left = 0, right = height.length - 1, best = 0;\n  while (left < right) {\n    int area = Math.min(height[left], height[right]) * (right - left);\n    best = Math.max(best, area);\n    if (height[left] < height[right]) left++; else right--;\n  }\n  return best;\n}',
        options: ['49', '48', '56', '16'],
        explanation:
          'Два указателя стартуют на самом широком возможном контейнере (индекс 0 и индекс 8) и двигаются внутрь, всегда сдвигая указатель у *более короткой* стенки — потому что сдвиг более высокой стенки внутрь никогда не может увеличить площадь (ширина уменьшается, а ограничивающая высота остаётся той же или становится хуже), так что это никогда бы не помогло. При left=0(h=1), right=8(h=7): area = min(1,7)*8 = 8, best=8, двигаем left (более короткую). Так продолжается; максимальная найденная в процессе площадь оказывается при left на индексе 1 (h=8) и right на индексе 8 (h=7): area = min(8,7)*(8-1) = 7*7 = 49 — лучший результат. Каждый указатель двигается суммарно не более n раз, поэтому это работает за O(n) по времени против O(n²) перебора всех пар.',
      },
    },
    {
      q: 'What does hasCycle detect, and why does the slow/fast pointer approach work?\n\nstatic boolean hasCycle(ListNode head) {\n  ListNode slow = head, fast = head;\n  while (fast != null && fast.next != null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow == fast) return true;\n  }\n  return false;\n}',
      options: [
        'Whether the linked list has a cycle — if it does, the faster pointer eventually laps the slower one and they meet',
        'The midpoint of the linked list',
        'Whether the linked list is sorted',
        'The length of the linked list'
      ],
      correct: [0],
      explanation:
        'This is Floyd\'s cycle detection ("tortoise and hare"): slow advances one node per step, fast advances two. If the list has no cycle, fast reaches null first (via the while condition) and the loop exits, returning false. If the list does have a cycle, both pointers eventually enter it and, because fast gains on slow by exactly one node per iteration once both are inside the loop, fast is guaranteed to eventually "lap" slow and land on the exact same node, making slow == fast true. This runs in O(n) time and O(1) extra space, unlike a HashSet-based approach that would need O(n) space to track visited nodes.',
      ru: {
        question: 'Что определяет hasCycle, и почему работает подход с медленным/быстрым указателем?\n\nstatic boolean hasCycle(ListNode head) {\n  ListNode slow = head, fast = head;\n  while (fast != null && fast.next != null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow == fast) return true;\n  }\n  return false;\n}',
        options: [
          'Есть ли в связном списке цикл — если да, более быстрый указатель в итоге "обгоняет на круг" медленный, и они встречаются',
          'Середину связного списка',
          'Отсортирован ли связный список',
          'Длину связного списка',
        ],
        explanation:
          'Это алгоритм обнаружения цикла Флойда ("черепаха и заяц"): slow продвигается на один узел за шаг, fast — на два. Если в списке нет цикла, fast первым достигает null (через условие while), и цикл завершается, возвращая false. Если цикл есть, оба указателя в итоге попадают в него, и так как fast опережает slow ровно на один узел за итерацию, как только оба внутри цикла, fast гарантированно в итоге "обгонит на круг" slow и окажется точно на том же узле, делая slow == fast истинным. Это работает за O(n) по времени и O(1) дополнительной памяти, в отличие от подхода на HashSet, которому потребовалось бы O(n) памяти для отслеживания посещённых узлов.',
      },
    },
    {
      q: 'This DP solution for coin change has a bug. coins = {1, 2, 5}, amount = 11 should return 3 (5+5+1), but it returns something else. What is the bug?\n\nstatic int coinChange(int[] coins, int amount) {\n  int[] dp = new int[amount + 1];\n  Arrays.fill(dp, amount + 1);\n  dp[0] = 0;\n  for (int i = 1; i <= amount; i++) {\n    for (int coin : coins) {\n      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] > amount ? -1 : dp[amount];\n}',
      options: [
        'Nothing — this is a correct bottom-up DP solution and returns 3',
        'It should initialize dp with 0 instead of amount + 1',
        'The inner loop should iterate i first, then coins, in the opposite nesting',
        'dp[i - coin] should be dp[i + coin]'
      ],
      correct: [0],
      explanation:
        'This is actually a correct, standard bottom-up DP for the minimum-coins coin change problem — there is no bug. dp[i] holds the minimum number of coins needed to make amount i, built up from smaller sub-amounts: for each amount i, it tries every coin and takes whichever gives the smallest dp[i-coin]+1. Seeding with amount+1 (an impossible-to-reach "infinity" sentinel, since you can never need more than `amount` coins of value 1) lets Math.min naturally ignore unreachable sub-amounts. For coins={1,2,5}, amount=11: dp builds up correctly to dp[11]=3 (using 5+5+1), and since 3 is not > 11, it returns 3 rather than -1.',
      ru: {
        question: 'В этом DP-решении coin change есть баг. coins = {1, 2, 5}, amount = 11 должно вернуть 3 (5+5+1), но возвращает что-то другое. В чём баг?\n\nstatic int coinChange(int[] coins, int amount) {\n  int[] dp = new int[amount + 1];\n  Arrays.fill(dp, amount + 1);\n  dp[0] = 0;\n  for (int i = 1; i <= amount; i++) {\n    for (int coin : coins) {\n      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] > amount ? -1 : dp[amount];\n}',
        options: [
          'Ничего — это корректное восходящее DP-решение, возвращающее 3',
          'Нужно инициализировать dp нулём вместо amount + 1',
          'Внутренний цикл должен идти сначала по i, а затем по coins, в противоположной вложенности',
          'dp[i - coin] должно быть dp[i + coin]',
        ],
        explanation:
          'На самом деле это корректное, стандартное восходящее DP-решение задачи о размене монет с минимальным числом монет — бага нет. dp[i] хранит минимальное число монет для набора суммы i, строится из меньших подсумм: для каждой суммы i перебираются все монеты, и берётся та, что даёт наименьшее dp[i-coin]+1. Инициализация значением amount+1 (недостижимый sentinel-«бесконечность», поскольку никогда не может потребоваться больше `amount` монет номиналом 1) позволяет Math.min естественно игнорировать недостижимые подсуммы. Для coins={1,2,5}, amount=11: dp корректно строится до dp[11]=3 (используя 5+5+1), и так как 3 не превышает 11, возвращается 3, а не -1.',
      },
    },
    {
      q: 'What does this return for nums = {1,1,1,2,2,3}, k = 2 (the k most frequent elements)?\n\nstatic List<Integer> topKFrequent(int[] nums, int k) {\n  Map<Integer, Integer> count = new HashMap<>();\n  for (int n : nums) count.merge(n, 1, Integer::sum);\n  PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));\n  for (int key : count.keySet()) {\n    heap.add(key);\n    if (heap.size() > k) heap.poll();\n  }\n  List<Integer> result = new ArrayList<>(heap);\n  return result;\n}',
      options: [
        '{1, 2} (in some order) — the two most frequent values',
        '{3, 2} — the two least frequent values',
        '{1, 1}',
        'Compilation error: PriorityQueue needs a Comparable type'
      ],
      correct: [0],
      explanation:
        'count.merge(n, 1, Integer::sum) builds a frequency map: 1→3, 2→2, 3→1. The PriorityQueue is a min-heap ordered by frequency (count.get(a) - count.get(b)), capped at size k — same "keep top k via bounded min-heap" pattern as finding the kth largest element: whenever the heap exceeds k elements, the least-frequent one currently in the heap is evicted via poll(). After processing all distinct keys {1,2,3}, the heap ends up holding the k=2 most frequent elements — 1 (frequency 3) and 2 (frequency 2) — while 3 (frequency 1, the least frequent) gets evicted along the way. The exact order in the returned list isn\'t guaranteed since it\'s built from a heap\'s internal array, but the set of elements {1, 2} is correct.',
      ru: {
        question: 'Что вернёт этот метод для nums = {1,1,1,2,2,3}, k = 2 (k наиболее частых элементов)?\n\nstatic List<Integer> topKFrequent(int[] nums, int k) {\n  Map<Integer, Integer> count = new HashMap<>();\n  for (int n : nums) count.merge(n, 1, Integer::sum);\n  PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));\n  for (int key : count.keySet()) {\n    heap.add(key);\n    if (heap.size() > k) heap.poll();\n  }\n  List<Integer> result = new ArrayList<>(heap);\n  return result;\n}',
        options: [
          '{1, 2} (в каком-то порядке) — два наиболее частых значения',
          '{3, 2} — два наименее частых значения',
          '{1, 1}',
          'Ошибка компиляции: PriorityQueue нужен тип Comparable',
        ],
        explanation:
          'count.merge(n, 1, Integer::sum) строит карту частот: 1→3, 2→2, 3→1. PriorityQueue — это min-heap, упорядоченная по частоте (count.get(a) - count.get(b)), ограниченная размером k — тот же шаблон «держать топ k через ограниченную min-heap», что и при поиске k-го по величине элемента: как только куча превышает k элементов, наименее частый из находящихся в куче удаляется через poll(). После обработки всех различных ключей {1,2,3} куча в итоге содержит k=2 наиболее частых элемента — 1 (частота 3) и 2 (частота 2) — а 3 (частота 1, наименее частый) удаляется по ходу дела. Точный порядок в возвращённом списке не гарантирован, так как он строится из внутреннего массива кучи, но набор элементов {1, 2} верен.',
      },
    },
  ],

  'leetcode-hard': [
    {
      q: 'What time complexity does the problem "median of two sorted arrays" typically require, and why is a simple merge-then-index approach not the intended solution?\n\n// arrays a (size m) and b (size n) are both sorted\n// goal: find the median of the combined sorted data',
      options: [
        'O(log(min(m, n))) — achieved via binary search on the smaller array\'s partition point, not O(m + n) merging',
        'O(m + n) is optimal and cannot be improved',
        'O(1) — medians can always be computed in constant time',
        'O(m * n) using nested loops'
      ],
      correct: [0],
      explanation:
        'Merging both arrays and indexing into the middle is the obvious O(m+n) solution, but the well-known optimal approach binary-searches on the partition point within the smaller array (size min(m,n)), simultaneously determining a matching partition point in the larger array such that everything on the left side of both partitions is <= everything on the right side. Once a valid partition is found (checked in O(1) per attempt), the median is read directly off the boundary elements. Because the binary search only operates over the smaller array\'s indices, the whole algorithm runs in O(log(min(m,n))) time — a classic example of trading a straightforward merge for a much tighter bound via a cleverer invariant.',
      ru: {
        question: 'Какой временной сложности обычно требует задача "медиана двух отсортированных массивов", и почему простое слияние с последующим индексированием — не задуманное решение?\n\n// массивы a (размера m) и b (размера n) оба отсортированы\n// цель: найти медиану объединённых отсортированных данных',
        options: [
          'O(log(min(m, n))) — достигается бинарным поиском точки разбиения в меньшем массиве, а не слиянием за O(m + n)',
          'O(m + n) оптимально и не может быть улучшено',
          'O(1) — медианы всегда можно вычислить за константное время',
          'O(m * n) с помощью вложенных циклов',
        ],
        explanation:
          'Слияние обоих массивов и индексирование в середину — очевидное решение за O(m+n), но известный оптимальный подход выполняет бинарный поиск точки разбиения внутри меньшего массива (размера min(m,n)), одновременно определяя соответствующую точку разбиения в большем массиве так, чтобы всё слева от обоих разбиений было <= всему справа. Как только найдено валидное разбиение (проверяется за O(1) на попытку), медиана считывается напрямую с граничных элементов. Поскольку бинарный поиск оперирует только индексами меньшего массива, весь алгоритм работает за O(log(min(m,n))) — классический пример того, как более хитрый инвариант позволяет заменить простое слияние гораздо более узкой оценкой сложности.',
      },
    },
    {
      q: 'This solves "trapping rain water" with two pointers. What does it return for height = {0,1,0,2,1,0,1,3,2,1,2,1}?\n\nstatic int trap(int[] height) {\n  int left = 0, right = height.length - 1;\n  int leftMax = 0, rightMax = 0, water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      leftMax = Math.max(leftMax, height[left]);\n      water += leftMax - height[left];\n      left++;\n    } else {\n      rightMax = Math.max(rightMax, height[right]);\n      water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}',
      options: ['6', '9', '4', '0'],
      correct: [0],
      explanation:
        'The amount of water trapped above any bar equals min(maxToItsLeft, maxToItsRight) - itsOwnHeight (never negative). The two-pointer trick avoids precomputing both max arrays by observing: whichever side currently has the smaller height[left]/height[right] is the side whose *trapped water at that position* is already fully determined by its own leftMax/rightMax — because the taller side guarantees the wall on that far end is high enough not to be the limiting factor. Water only accumulates when the current bar is shorter than the running max on its own side (water += runningMax - height[pointer]); taller bars just raise that running max without adding water. For this well-known classic input, the algorithm accumulates exactly 6 units of trapped water.',
      ru: {
        question: 'Этот метод решает "trapping rain water" двумя указателями. Что он вернёт для height = {0,1,0,2,1,0,1,3,2,1,2,1}?\n\nstatic int trap(int[] height) {\n  int left = 0, right = height.length - 1;\n  int leftMax = 0, rightMax = 0, water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      leftMax = Math.max(leftMax, height[left]);\n      water += leftMax - height[left];\n      left++;\n    } else {\n      rightMax = Math.max(rightMax, height[right]);\n      water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}',
        options: ['6', '9', '4', '0'],
        explanation:
          'Количество воды над любым столбиком равно min(максимумСлева, максимумСправа) - собственнаяВысота (никогда не отрицательно). Приём с двумя указателями избегает предвычисления обоих массивов максимумов, используя наблюдение: та сторона, где сейчас меньшая высота height[left]/height[right], — это сторона, чья *вода в этой позиции* уже полностью определена собственными leftMax/rightMax — потому что более высокая сторона гарантирует, что стена на дальнем конце достаточно высока, чтобы не быть ограничивающим фактором. Вода накапливается только когда текущий столбик ниже текущего максимума на своей стороне (water += runningMax - height[pointer]); более высокие столбики просто поднимают этот максимум, не добавляя воду. Для этого хорошо известного классического входа алгоритм накапливает ровно 6 единиц воды.',
      },
    },
    {
      q: 'This LRU cache uses a HashMap plus a doubly linked list to get O(1) get/put. Why is a HashMap alone (with no linked list) insufficient?\n\nclass LRUCache {\n  // HashMap<Integer, Node> map + doubly linked list ordered by recency\n  // get(key): move accessed node to the front (most recent), O(1) via map lookup + list splice\n  // put(key, val): insert at front; if over capacity, evict the node at the back (least recent)\n}',
      options: [
        'A HashMap gives O(1) lookup by key, but has no notion of access order — finding and evicting the least-recently-used entry in O(1) requires the linked list to track recency',
        'HashMap lookups are actually O(n), so the linked list is only there to speed up get()',
        'A HashMap cannot store more than a fixed number of entries',
        'The linked list is unnecessary; a TreeMap would also work in O(1)'
      ],
      correct: [0],
      explanation:
        'A plain HashMap gives O(1) key lookup, but it has no built-in concept of "which entry was used least recently" — finding that entry would require scanning all entries (O(n)) unless recency is tracked separately. The doubly linked list solves exactly that: every access (get or put) moves the corresponding node to the front, and eviction always removes the node at the back (the tail), both O(1) operations because a doubly linked list allows removing/inserting a node given a direct reference to it, without traversing the list. The HashMap then just maps key → node reference, so a get() combines an O(1) map lookup with an O(1) list splice — that combination of "fast key lookup" and "fast recency tracking" is why both structures are needed together.',
      ru: {
        question: 'Этот LRU-кэш использует HashMap плюс двусвязный список для получения O(1) get/put. Почему одного HashMap (без связного списка) недостаточно?\n\nclass LRUCache {\n  // HashMap<Integer, Node> map + двусвязный список, упорядоченный по свежести\n  // get(key): переместить обращённый узел в начало (самый свежий), O(1) через поиск по map + сплайс списка\n  // put(key, val): вставить в начало; если превышена ёмкость, вытеснить узел в конце (наименее свежий)\n}',
        options: [
          'HashMap даёт O(1) поиск по ключу, но не имеет понятия о порядке доступа — поиск и вытеснение наименее недавно использованной записи за O(1) требует связного списка для отслеживания свежести',
          'На самом деле поиск в HashMap — O(n), поэтому связный список нужен только чтобы ускорить get()',
          'HashMap не может хранить больше фиксированного числа записей',
          'Связный список не нужен; TreeMap тоже дал бы O(1)',
        ],
        explanation:
          'Обычный HashMap даёт O(1) поиск по ключу, но не имеет встроенного понятия «какая запись использовалась наименее недавно» — поиск такой записи потребовал бы просмотра всех записей (O(n)), если свежесть не отслеживается отдельно. Двусвязный список решает именно это: каждое обращение (get или put) перемещает соответствующий узел в начало, а вытеснение всегда удаляет узел в конце (хвост) — обе операции O(1), потому что двусвязный список позволяет удалять/вставлять узел по прямой ссылке на него, без обхода списка. HashMap затем просто отображает ключ → ссылку на узел, поэтому get() сочетает O(1) поиск по map с O(1) сплайсом списка — именно эта комбинация «быстрого поиска по ключу» и «быстрого отслеживания свежести» и требует обеих структур вместе.',
      },
    },
    {
      q: 'This merges k sorted linked lists using a min-heap of list heads. What is its time complexity if there are k lists with N total nodes?\n\nstatic ListNode mergeKLists(ListNode[] lists) {\n  PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);\n  for (ListNode node : lists) if (node != null) heap.add(node);\n  ListNode dummy = new ListNode(0), tail = dummy;\n  while (!heap.isEmpty()) {\n    ListNode smallest = heap.poll();\n    tail.next = smallest;\n    tail = tail.next;\n    if (smallest.next != null) heap.add(smallest.next);\n  }\n  return dummy.next;\n}',
      options: [
        'O(N log k) — each of the N nodes is added/removed from a heap that never holds more than k elements',
        'O(N log N) — same as sorting all nodes directly',
        'O(N * k) — same as repeatedly merging two lists at a time, k-1 times',
        'O(N) — heap operations are O(1) amortized'
      ],
      correct: [0],
      explanation:
        'The heap holds at most one node per list at any time, so its size never exceeds k, making every add/poll operation O(log k). Each of the N total nodes across all lists is added to the heap exactly once and removed exactly once (when it becomes the "current smallest" and gets appended to the result, its successor from the same list is added in its place). That gives N total heap operations at O(log k) each, for O(N log k) overall — notably better than the naive O(N*k) approach of merging the lists two at a time sequentially (k-1 pairwise merges, each potentially touching most of the N nodes).',
      ru: {
        question: 'Этот метод сливает k отсортированных связных списков с помощью min-heap из голов списков. Какова его временная сложность, если есть k списков с N узлами всего?\n\nstatic ListNode mergeKLists(ListNode[] lists) {\n  PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);\n  for (ListNode node : lists) if (node != null) heap.add(node);\n  ListNode dummy = new ListNode(0), tail = dummy;\n  while (!heap.isEmpty()) {\n    ListNode smallest = heap.poll();\n    tail.next = smallest;\n    tail = tail.next;\n    if (smallest.next != null) heap.add(smallest.next);\n  }\n  return dummy.next;\n}',
        options: [
          'O(N log k) — каждый из N узлов добавляется/удаляется из кучи, которая никогда не содержит больше k элементов',
          'O(N log N) — так же, как прямая сортировка всех узлов',
          'O(N * k) — так же, как повторное слияние по два списка за раз, k-1 раз',
          'O(N) — операции с кучей амортизированно O(1)',
        ],
        explanation:
          'Куча в любой момент содержит не более одного узла на список, поэтому её размер никогда не превышает k, что делает каждую операцию add/poll равной O(log k). Каждый из N узлов по всем спискам добавляется в кучу ровно один раз и удаляется ровно один раз (когда становится «текущим наименьшим» и добавляется в результат, его преемник из того же списка добавляется на его место). Это даёт N операций с кучей по O(log k) каждая, итого O(N log k) — заметно лучше наивного подхода O(N*k), при котором списки сливаются попарно последовательно (k-1 попарных слияний, каждое потенциально затрагивает большинство из N узлов).',
      },
    },
    {
      q: 'This finds the length of the longest increasing subsequence using patience sorting (binary search on tails). What does it return for nums = {10, 9, 2, 5, 3, 7, 101, 18}?\n\nstatic int lengthOfLIS(int[] nums) {\n  int[] tails = new int[nums.length];\n  int size = 0;\n  for (int n : nums) {\n    int lo = 0, hi = size;\n    while (lo < hi) {\n      int mid = (lo + hi) / 2;\n      if (tails[mid] < n) lo = mid + 1; else hi = mid;\n    }\n    tails[lo] = n;\n    if (lo == size) size++;\n  }\n  return size;\n}',
      options: [
        '4 (e.g. {2, 3, 7, 101})',
        '8 (the whole array is treated as increasing)',
        '2',
        '6'
      ],
      correct: [0],
      explanation:
        'This is the O(n log n) LIS algorithm: `tails[i]` holds the smallest possible tail value of an increasing subsequence of length i+1 seen so far, and it\'s always kept sorted, which is what makes binary search valid on it. For each new number, binary search finds where it would slot into `tails` (replacing the first tail >= it, or appending if it\'s bigger than everything so far); `size` only grows when the number extends the longest subsequence found so far — it does not mean the array positions replaced form the actual final subsequence, only that its *length* is tracked correctly. For {10,9,2,5,3,7,101,18}, the longest strictly increasing subsequence is length 4 — e.g. {2,3,7,101} or {2,3,7,18} — which is what `size` correctly ends up holding, even though `tails` itself is not literally that subsequence by the end.',
      ru: {
        question: 'Этот метод находит длину наибольшей возрастающей подпоследовательности через "терпеливую сортировку" (бинарный поиск по хвостам). Что он вернёт для nums = {10, 9, 2, 5, 3, 7, 101, 18}?\n\nstatic int lengthOfLIS(int[] nums) {\n  int[] tails = new int[nums.length];\n  int size = 0;\n  for (int n : nums) {\n    int lo = 0, hi = size;\n    while (lo < hi) {\n      int mid = (lo + hi) / 2;\n      if (tails[mid] < n) lo = mid + 1; else hi = mid;\n    }\n    tails[lo] = n;\n    if (lo == size) size++;\n  }\n  return size;\n}',
        options: [
          '4 (например, {2, 3, 7, 101})',
          '8 (весь массив считается возрастающим)',
          '2',
          '6',
        ],
        explanation:
          'Это алгоритм LIS за O(n log n): `tails[i]` хранит наименьшее возможное значение хвоста возрастающей подпоследовательности длины i+1, встреченной до сих пор, и он всегда остаётся отсортированным, что и делает бинарный поиск по нему корректным. Для каждого нового числа бинарный поиск находит, куда оно встанет в `tails` (заменяя первый хвост >= него, либо добавляясь в конец, если оно больше всего встреченного до сих пор); `size` растёт только когда число удлиняет самую длинную найденную до сих пор подпоследовательность — это не означает, что заменённые позиции массива образуют реальную итоговую подпоследовательность, только то, что её *длина* отслеживается корректно. Для {10,9,2,5,3,7,101,18} наибольшая строго возрастающая подпоследовательность имеет длину 4 — например, {2,3,7,101} или {2,3,7,18} — именно это `size` корректно в итоге хранит, хотя сам `tails` к концу буквально не является этой подпоследовательностью.',
      },
    },
    {
      q: 'This backtracking N-Queens solver counts valid placements. How many solutions does it find for n = 4?\n\nstatic int count = 0;\nstatic void solve(int n, int row, boolean[] cols, boolean[] diag1, boolean[] diag2) {\n  if (row == n) { count++; return; }\n  for (int col = 0; col < n; col++) {\n    int d1 = row - col + n, d2 = row + col;\n    if (cols[col] || diag1[d1] || diag2[d2]) continue;\n    cols[col] = diag1[d1] = diag2[d2] = true;\n    solve(n, row + 1, cols, diag1, diag2);\n    cols[col] = diag1[d1] = diag2[d2] = false;\n  }\n}\n// solve(4, 0, new boolean[4], new boolean[9], new boolean[7]);',
      options: [
        '2',
        '4',
        '1',
        '0 — no valid placement exists for a 4x4 board'
      ],
      correct: [0],
      explanation:
        'The classic 4-Queens problem (placing 4 queens on a 4x4 board so none attack each other along any row, column, or diagonal) has exactly 2 distinct solutions: queens at columns {1,3,0,2} and {2,0,3,1} (one is the mirror image of the other). The code tracks which columns and which of the two diagonal directions are already occupied using boolean arrays indexed cleverly (row-col+n and row+col uniquely identify each anti-diagonal and diagonal), backtracking (undoing the placement) whenever a branch is fully explored, which is what `cols[col] = diag1[d1] = diag2[d2] = false;` after the recursive call does — it\'s the "un-choose" step essential to backtracking, letting the same cells be tried again in different combinations.',
      ru: {
        question: 'Этот решатель N-Queens с бэктрекингом считает валидные расстановки. Сколько решений он найдёт для n = 4?\n\nstatic int count = 0;\nstatic void solve(int n, int row, boolean[] cols, boolean[] diag1, boolean[] diag2) {\n  if (row == n) { count++; return; }\n  for (int col = 0; col < n; col++) {\n    int d1 = row - col + n, d2 = row + col;\n    if (cols[col] || diag1[d1] || diag2[d2]) continue;\n    cols[col] = diag1[d1] = diag2[d2] = true;\n    solve(n, row + 1, cols, diag1, diag2);\n    cols[col] = diag1[d1] = diag2[d2] = false;\n  }\n}\n// solve(4, 0, new boolean[4], new boolean[9], new boolean[7]);',
        options: [
          '2',
          '4',
          '1',
          '0 — валидной расстановки для доски 4x4 не существует',
        ],
        explanation:
          'Классическая задача 4 ферзей (расставить 4 ферзя на доске 4x4 так, чтобы ни один не атаковал другого по строке, столбцу или диагонали) имеет ровно 2 различных решения: ферзи в столбцах {1,3,0,2} и {2,0,3,1} (одно — зеркальное отражение другого). Код отслеживает, какие столбцы и какие из двух диагональных направлений уже заняты, используя булевы массивы с хитрой индексацией (row-col+n и row+col однозначно идентифицируют каждую антидиагональ и диагональ), выполняя откат (отмену расстановки) всякий раз, когда ветка полностью исследована — именно это делает `cols[col] = diag1[d1] = diag2[d2] = false;` после рекурсивного вызова — это шаг «отмены выбора», необходимый для бэктрекинга, позволяющий пробовать те же клетки снова в других комбинациях.',
      },
    },
    {
      q: 'This BFS finds the shortest transformation sequence length from "hit" to "cog" via wordList = {"hot","dot","dog","lot","log","cog"}, changing one letter at a time to a valid word. What does it conceptually return?\n\n// BFS from beginWord; each level = one more word transformed\n// queue holds (word, stepsSoFar); visited set prevents revisiting words\n// as soon as endWord is dequeued, return stepsSoFar',
      options: [
        '5 — the shortest path is hit → hot → dot → dog → cog (5 words total)',
        '3 — direct letter-by-letter distance between "hit" and "cog"',
        '6 — every word in wordList must be used',
        'It never terminates because "hit" is not in wordList'
      ],
      correct: [0],
      explanation:
        'BFS explores the transformation graph level by level (each "level" being one letter-change away from the previous), which guarantees the first time endWord is reached is via the shortest possible path — this is the core reason BFS (not DFS) is used for shortest-path problems on unweighted graphs. The path hit→hot→dot→dog→cog changes one letter at each step and every intermediate word (hot, dot, dog) is in wordList, giving a sequence of 5 words total (BFS "step count" conventions can vary between counting words vs. counting transformations, but the word-count answer here is 5). Using a visited set is essential to avoid infinite loops/redundant work by revisiting words already reached via a shorter or equal path.',
      ru: {
        question: 'Этот BFS находит длину кратчайшей последовательности преобразований от "hit" к "cog" через wordList = {"hot","dot","dog","lot","log","cog"}, меняя по одной букве за раз на валидное слово. Что он концептуально вернёт?\n\n// BFS от beginWord; каждый "уровень" = ещё одно преобразованное слово\n// очередь хранит (слово, шаговПройдено); множество visited предотвращает повторное посещение слов\n// как только endWord извлекается из очереди, вернуть шаговПройдено',
        options: [
          '5 — кратчайший путь: hit → hot → dot → dog → cog (5 слов всего)',
          '3 — прямое побуквенное расстояние между "hit" и "cog"',
          '6 — должно быть использовано каждое слово из wordList',
          'Никогда не завершится, потому что "hit" отсутствует в wordList',
        ],
        explanation:
          'BFS исследует граф преобразований уровень за уровнем (каждый «уровень» — на одну замену буквы дальше предыдущего), что гарантирует: первое достижение endWord происходит по кратчайшему из возможных путей — это основная причина, почему для задач кратчайшего пути на невзвешенных графах используется BFS, а не DFS. Путь hit→hot→dot→dog→cog меняет по одной букве на каждом шаге, и каждое промежуточное слово (hot, dot, dog) есть в wordList, давая последовательность из 5 слов всего (соглашения о подсчёте «шагов» в BFS могут отличаться — считать слова или считать преобразования, — но ответ по количеству слов здесь 5). Использование множества visited необходимо, чтобы избежать бесконечных циклов/лишней работы при повторном посещении слов, уже достигнутых по более короткому или равному пути.',
      },
    },
    {
      q: 'This serializes a binary tree via preorder traversal with null markers, then deserializes it back. For the tree  1\n              / \\\n             2   3\n                / \\\n               4   5\nwhat does serialize() produce, and why does deserialize() not need the tree\'s shape stored separately?\n\nstatic void serialize(TreeNode node, StringBuilder sb) {\n  if (node == null) { sb.append("null,"); return; }\n  sb.append(node.val).append(",");\n  serialize(node.left, sb);\n  serialize(node.right, sb);\n}',
      options: [
        '"1,2,null,null,3,4,null,null,5,null,null," — the null markers themselves encode the shape, so preorder deserialization can reconstruct it unambiguously',
        '"1,2,3,4,5," — nulls are omitted since Java arrays don\'t support null',
        '"1,2,3,,4,5" — commas alone mark missing children',
        'It cannot be deserialized without a separate shape array'
      ],
      correct: [0],
      explanation:
        'Preorder traversal visits root, then left subtree, then right subtree. Recording an explicit "null," marker every time a null child is hit (instead of just skipping it) is what makes this reversible: during deserialization, reading tokens in the same preorder sequence, a "null" token unambiguously tells you "this branch ends here," so the reconstruction algorithm knows exactly when to stop recursing left/right without needing any separately stored shape or size information — the marker sequence itself fully encodes the tree\'s structure. Tracing the given tree in preorder with null markers: 1, then left subtree of 2 (2, null, null), then right subtree of 3 (3, then left subtree 4 (4,null,null), then right subtree 5 (5,null,null)) — giving "1,2,null,null,3,4,null,null,5,null,null,".',
      ru: {
        question: 'Этот метод сериализует бинарное дерево прямым обходом с маркерами null, затем десериализует обратно. Для дерева  1\n              / \\\n             2   3\n                / \\\n               4   5\nчто выдаст serialize(), и почему deserialize() не нужно хранить форму дерева отдельно?\n\nstatic void serialize(TreeNode node, StringBuilder sb) {\n  if (node == null) { sb.append("null,"); return; }\n  sb.append(node.val).append(",");\n  serialize(node.left, sb);\n  serialize(node.right, sb);\n}',
        options: [
          '"1,2,null,null,3,4,null,null,5,null,null," — сами маркеры null кодируют форму, поэтому прямой обход при десериализации может однозначно её восстановить',
          '"1,2,3,4,5," — null опускаются, так как массивы Java не поддерживают null',
          '"1,2,3,,4,5" — только запятые отмечают отсутствующих детей',
          'Десериализовать без отдельного массива формы невозможно',
        ],
        explanation:
          'Прямой обход (preorder) посещает корень, затем левое поддерево, затем правое. Запись явного маркера "null," каждый раз при встрече null-ребёнка (вместо простого пропуска) — вот что делает это обратимым: при десериализации, читая токены в той же последовательности прямого обхода, токен "null" однозначно сообщает «эта ветка здесь заканчивается», поэтому алгоритм восстановления точно знает, когда прекратить рекурсию влево/вправо, без необходимости отдельно хранить форму или размер — сама последовательность маркеров полностью кодирует структуру дерева. Трассируя данное дерево прямым обходом с маркерами null: 1, затем левое поддерево 2 (2, null, null), затем правое поддерево 3 (3, затем левое поддерево 4 (4,null,null), затем правое поддерево 5 (5,null,null)) — что даёт "1,2,null,null,3,4,null,null,5,null,null,".',
      },
    },
    {
      q: 'This finds the sliding window maximum using a Deque of indices. What does it return for nums = {1,3,-1,-3,5,3,6,7}, k = 3?\n\nstatic int[] maxSlidingWindow(int[] nums, int k) {\n  Deque<Integer> deque = new ArrayDeque<>(); // stores indices, values decreasing front-to-back\n  int[] result = new int[nums.length - k + 1];\n  for (int i = 0; i < nums.length; i++) {\n    while (!deque.isEmpty() && deque.peekFirst() <= i - k) deque.pollFirst();\n    while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast();\n    deque.offerLast(i);\n    if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];\n  }\n  return result;\n}',
      options: [
        '{3, 3, 5, 5, 6, 7}',
        '{3, 1, 5, 3, 6, 7}',
        '{1, 3, -1, -3, 5, 3}',
        '{7, 6, 5, 3, 3, 1}'
      ],
      correct: [0],
      explanation:
        'The deque stores indices whose values are kept in strictly decreasing order from front to back, so the front always holds the index of the current window\'s maximum. Two maintenance steps run every iteration: pop expired indices from the front (those that fell out of the k-sized window), and pop indices from the back whose values are smaller than the incoming one (they can never be the max again while a bigger, more recent element is in the window, so they\'re useless to keep). Tracing windows of size 3: {1,3,-1}→max 3, {3,-1,-3}→max 3, {-1,-3,5}→max 5, {-3,5,3}→max 5, {5,3,6}→max 6, {3,6,7}→max 7. Result: {3,3,5,5,6,7}. Because each index is added and removed from the deque at most once, this runs in O(n) total time despite the nested-looking while loops.',
      ru: {
        question: 'Этот метод находит максимум скользящего окна с помощью Deque индексов. Что он вернёт для nums = {1,3,-1,-3,5,3,6,7}, k = 3?\n\nstatic int[] maxSlidingWindow(int[] nums, int k) {\n  Deque<Integer> deque = new ArrayDeque<>(); // хранит индексы, значения убывают спереди назад\n  int[] result = new int[nums.length - k + 1];\n  for (int i = 0; i < nums.length; i++) {\n    while (!deque.isEmpty() && deque.peekFirst() <= i - k) deque.pollFirst();\n    while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast();\n    deque.offerLast(i);\n    if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];\n  }\n  return result;\n}',
        options: [
          '{3, 3, 5, 5, 6, 7}',
          '{3, 1, 5, 3, 6, 7}',
          '{1, 3, -1, -3, 5, 3}',
          '{7, 6, 5, 3, 3, 1}',
        ],
        explanation:
          'Дек хранит индексы, чьи значения поддерживаются в строго убывающем порядке спереди назад, поэтому спереди всегда находится индекс максимума текущего окна. На каждой итерации выполняются два поддерживающих шага: удаление устаревших индексов спереди (тех, что выпали из окна размера k), и удаление индексов сзади, чьи значения меньше поступающего (они уже никогда не станут максимумом, пока в окне есть более крупный, более новый элемент, поэтому хранить их бессмысленно). Трассировка окон размера 3: {1,3,-1}→макс 3, {3,-1,-3}→макс 3, {-1,-3,5}→макс 5, {-3,5,3}→макс 5, {5,3,6}→макс 6, {3,6,7}→макс 7. Результат: {3,3,5,5,6,7}. Поскольку каждый индекс добавляется в дек и удаляется из него не более одного раза, это работает за O(n) суммарно, несмотря на вложенные на вид while-циклы.',
      },
    },
    {
      q: 'This edit-distance DP computes the minimum operations to convert word1 into word2. What recurrence does the inner cell dp[i][j] use when the characters differ?\n\nstatic int minDistance(String w1, String w2) {\n  int m = w1.length(), n = w2.length();\n  int[][] dp = new int[m + 1][n + 1];\n  for (int i = 0; i <= m; i++) dp[i][0] = i;\n  for (int j = 0; j <= n; j++) dp[0][j] = j;\n  for (int i = 1; i <= m; i++) {\n    for (int j = 1; j <= n; j++) {\n      if (w1.charAt(i - 1) == w2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];\n      else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));\n    }\n  }\n  return dp[m][n];\n}',
      options: [
        '1 + min(replace, delete, insert) — the cheapest of the three single-character edit operations, plus one for that operation itself',
        'dp[i-1][j-1] always, regardless of whether characters match',
        'dp[i][j] = dp[i-1][j] + dp[i][j-1] (sum instead of min)',
        'dp[i][j] is left at 0 when characters differ'
      ],
      correct: [0],
      explanation:
        'When w1.charAt(i-1) != w2.charAt(j-1), the algorithm must "spend" one edit operation to reconcile the mismatch, and it considers all three possible operations before picking the cheapest: dp[i-1][j-1] represents replacing the mismatched character (both indices consumed), dp[i-1][j] represents deleting from w1 (only w1\'s index consumed), and dp[i][j-1] represents inserting into w1 to match w2 (only w2\'s index consumed). Taking 1 + the minimum of those three sub-problem costs guarantees the overall minimum edit distance, since each of those three sub-problems is itself already optimally solved for its smaller prefix pair (that\'s the DP optimal-substructure guarantee). This is the same core structure whether you\'re computing edit distance, and matches how the base cases dp[i][0]=i / dp[0][j]=j represent "delete/insert everything" when one string is empty.',
      ru: {
        question: 'Это DP-решение расстояния редактирования вычисляет минимум операций для превращения word1 в word2. Какую рекуррентность использует внутренняя ячейка dp[i][j], когда символы различаются?\n\nstatic int minDistance(String w1, String w2) {\n  int m = w1.length(), n = w2.length();\n  int[][] dp = new int[m + 1][n + 1];\n  for (int i = 0; i <= m; i++) dp[i][0] = i;\n  for (int j = 0; j <= n; j++) dp[0][j] = j;\n  for (int i = 1; i <= m; i++) {\n    for (int j = 1; j <= n; j++) {\n      if (w1.charAt(i - 1) == w2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];\n      else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));\n    }\n  }\n  return dp[m][n];\n}',
        options: [
          '1 + min(замена, удаление, вставка) — наименее затратная из трёх однопобуквенных операций редактирования, плюс единица за саму эту операцию',
          'dp[i-1][j-1] всегда, независимо от совпадения символов',
          'dp[i][j] = dp[i-1][j] + dp[i][j-1] (сумма вместо минимума)',
          'dp[i][j] остаётся 0, когда символы различаются',
        ],
        explanation:
          'Когда w1.charAt(i-1) != w2.charAt(j-1), алгоритм должен «потратить» одну операцию редактирования на устранение несовпадения, и он рассматривает все три возможные операции перед выбором наиболее дешёвой: dp[i-1][j-1] представляет замену несовпадающего символа (оба индекса продвигаются), dp[i-1][j] представляет удаление из w1 (продвигается только индекс w1), а dp[i][j-1] представляет вставку в w1 для соответствия w2 (продвигается только индекс w2). Взятие 1 + минимума из этих трёх стоимостей подзадач гарантирует общее минимальное расстояние редактирования, так как каждая из этих трёх подзадач уже оптимально решена для своей меньшей пары префиксов (это гарантия оптимальной подструктуры DP). Это та же основная структура, что и при вычислении расстояния редактирования, и соответствует тому, как базовые случаи dp[i][0]=i / dp[0][j]=j представляют «удалить/вставить всё», когда одна из строк пуста.',
      },
    },
    {
      q: 'This finds the length of the longest valid (well-formed) parentheses substring using a stack of indices. What does it return for s = ")()())"?\n\nstatic int longestValidParentheses(String s) {\n  Deque<Integer> stack = new ArrayDeque<>();\n  stack.push(-1);\n  int best = 0;\n  for (int i = 0; i < s.length(); i++) {\n    if (s.charAt(i) == \'(\') {\n      stack.push(i);\n    } else {\n      stack.pop();\n      if (stack.isEmpty()) stack.push(i);\n      else best = Math.max(best, i - stack.peek());\n    }\n  }\n  return best;\n}',
      options: ['4', '2', '6', '0'],
      correct: [0],
      explanation:
        'The stack holds indices, and the trick is the sentinel -1 pushed first, which acts as a "base" marking the position just before the start of a potential valid substring. On \'(\', push its index. On \')\', pop first (tentatively matching it against the top); if the stack becomes empty, this \')\' had no match, so it becomes the new base (pushed as the new bottom marker); otherwise, the new top is the index just before the current valid run started, so i - stack.peek() measures that run\'s length. Tracing s = ")()())" (indices 0-5): i=0 \')\': pop -1, stack empty, push 0 → stack=[0]. i=1 \'(\': push 1 → stack=[0,1]. i=2 \')\': pop 1, stack=[0] not empty, best=max(0, 2-0)=2. i=3 \'(\': push 3 → stack=[0,3]. i=4 \')\': pop 3, stack=[0] not empty, best=max(2, 4-0)=4. i=5 \')\': pop 0, stack empty, push 5 → stack=[5]. Final best = 4, corresponding to the valid substring "()()" from index 1 to 4.',
      ru: {
        question: 'Этот метод находит длину самой длинной валидной (правильно сформированной) подстроки скобок с помощью стека индексов. Что он вернёт для s = ")()())"?\n\nstatic int longestValidParentheses(String s) {\n  Deque<Integer> stack = new ArrayDeque<>();\n  stack.push(-1);\n  int best = 0;\n  for (int i = 0; i < s.length(); i++) {\n    if (s.charAt(i) == \'(\') {\n      stack.push(i);\n    } else {\n      stack.pop();\n      if (stack.isEmpty()) stack.push(i);\n      else best = Math.max(best, i - stack.peek());\n    }\n  }\n  return best;\n}',
        options: ['4', '2', '6', '0'],
        explanation:
          'Стек хранит индексы, и хитрость в sentinel-значении -1, помещённом первым, — оно служит «базой», отмечающей позицию непосредственно перед началом потенциально валидной подстроки. На \'(\' — кладём её индекс. На \')\' — сначала снимаем (условно сопоставляя с вершиной); если стек опустел, эта \')\' не нашла пары, поэтому она становится новой базой (кладётся как новый маркер дна); иначе новая вершина — это индекс непосредственно перед началом текущего валидного участка, поэтому i - stack.peek() измеряет длину этого участка. Трассировка s = ")()())" (индексы 0-5): i=0 \')\': снимаем -1, стек пуст, кладём 0 → stack=[0]. i=1 \'(\': кладём 1 → stack=[0,1]. i=2 \')\': снимаем 1, stack=[0] не пуст, best=max(0, 2-0)=2. i=3 \'(\': кладём 3 → stack=[0,3]. i=4 \')\': снимаем 3, stack=[0] не пуст, best=max(2, 4-0)=4. i=5 \')\': снимаем 0, стек пуст, кладём 5 → stack=[5]. Итог best = 4, что соответствует валидной подстроке "()()" от индекса 1 до 4.',
      },
    },
    {
      q: 'This computes maximum profit from non-overlapping weighted jobs using DP + binary search on sorted end times. Why is binary search needed inside the DP loop?\n\n// jobs sorted by end time; dp[i] = max profit using first i jobs (by end-time order)\n// for job i: option A = skip it (dp[i-1]); option B = take it (profit[i] + dp[p])\n// where p = index of the latest job whose end time <= job[i]\'s start time, found via binary search\n// dp[i] = max(A, B)',
      options: [
        'To quickly find the latest non-conflicting job\'s DP index in O(log n) instead of scanning backward in O(n) for each job',
        'Binary search is used to sort the jobs by end time',
        'It replaces the DP entirely — no dp array is actually needed',
        'To check whether two jobs overlap in O(1) time'
      ],
      correct: [0],
      explanation:
        'For each job i (processed in end-time order), the algorithm needs to know the best achievable profit using only jobs that finish before job i starts — i.e., the most recent non-conflicting job. Scanning backward through all previous jobs to find that boundary would cost O(n) per job, O(n²) overall. Since jobs are pre-sorted by end time, binary search can locate that boundary (the latest end time <= the current job\'s start time) in O(log n), bringing the total DP complexity down to O(n log n). This is the standard "weighted job scheduling" pattern: sort by end time once, then use DP with binary-search lookups for the compatible-predecessor step, rather than trying every possible predecessor.',
      ru: {
        question: 'Этот метод вычисляет максимальную прибыль от непересекающихся взвешенных задач через DP + бинарный поиск по отсортированным временам окончания. Зачем внутри DP-цикла нужен бинарный поиск?\n\n// задачи отсортированы по времени окончания; dp[i] = макс. прибыль на первых i задачах (в порядке окончания)\n// для задачи i: вариант A = пропустить (dp[i-1]); вариант B = взять (profit[i] + dp[p])\n// где p = индекс самой поздней задачи, чьё время окончания <= времени начала задачи i, найденный бинарным поиском\n// dp[i] = max(A, B)',
        options: [
          'Чтобы быстро найти индекс DP для последней не конфликтующей задачи за O(log n) вместо сканирования назад за O(n) для каждой задачи',
          'Бинарный поиск используется для сортировки задач по времени окончания',
          'Он полностью заменяет DP — массив dp на самом деле не нужен',
          'Чтобы проверить пересечение двух задач за O(1)',
        ],
        explanation:
          'Для каждой задачи i (обрабатываемой в порядке времени окончания) алгоритму нужно знать наилучшую достижимую прибыль, используя только задачи, завершающиеся до начала задачи i — то есть самую недавнюю не конфликтующую задачу. Сканирование назад по всем предыдущим задачам для поиска этой границы стоило бы O(n) на задачу, O(n²) в целом. Так как задачи заранее отсортированы по времени окончания, бинарный поиск может найти эту границу (самое позднее время окончания <= времени начала текущей задачи) за O(log n), снижая общую сложность DP до O(n log n). Это стандартный шаблон «планирование взвешенных задач»: отсортировать по времени окончания один раз, затем использовать DP с поиском бинарным поиском для шага совместимого предшественника, вместо перебора каждого возможного предшественника.',
      },
    },
    {
      q: 'This builds a topological order for "alien dictionary" letter ordering using Kahn\'s algorithm (BFS + in-degree counting). What does it do if the derived graph contains a cycle?\n\nstatic String alienOrder(String[] words) {\n  // build graph: edge u -> v means u comes before v\n  // compute inDegree for every letter\n  // queue all letters with inDegree == 0\n  // repeatedly poll, append to result, decrement neighbors\' inDegree, enqueue any that hit 0\n  // if result.length() != total distinct letters, the order is invalid\n  // ...\n}',
      options: [
        'It detects the invalid ordering — not all letters reach inDegree 0, so result.length() ends up shorter than the letter count, signaling a cycle/contradiction',
        'It throws a StackOverflowError',
        'Kahn\'s algorithm cannot be used on graphs that might contain cycles',
        'It silently returns an incomplete but still usable order'
      ],
      correct: [0],
      explanation:
        'Kahn\'s algorithm for topological sort works precisely because a DAG (directed acyclic graph) always has at least one node with in-degree 0 at every stage — process it, remove its outgoing edges (decrementing neighbors\' in-degree), and repeat. If the underlying constraints actually form a cycle (a contradiction, like the alien dictionary implying \'a\' comes before \'b\', \'b\' before \'c\', and \'c\' before \'a\'), then every remaining node in that cycle keeps a nonzero in-degree forever — none of them ever gets enqueued, so the algorithm terminates having processed fewer letters than exist in total. Checking result.length() against the expected letter count after the loop is exactly how this implementation detects that impossibility, without needing a separate DFS-based cycle check.',
      ru: {
        question: 'Этот метод строит топологический порядок для "alien dictionary" (порядка букв) с помощью алгоритма Кана (BFS + подсчёт входящих степеней). Что он делает, если построенный граф содержит цикл?\n\nstatic String alienOrder(String[] words) {\n  // строим граф: ребро u -> v означает, что u идёт раньше v\n  // вычисляем inDegree для каждой буквы\n  // кладём в очередь все буквы с inDegree == 0\n  // повторяем: извлекаем, добавляем в результат, уменьшаем inDegree соседей, добавляем в очередь тех, у кого стало 0\n  // если result.length() != общему числу различных букв, порядок невалиден\n  // ...\n}',
        options: [
          'Он обнаруживает невалидный порядок — не все буквы достигают inDegree 0, поэтому result.length() оказывается меньше числа букв, сигнализируя о цикле/противоречии',
          'Он выбрасывает StackOverflowError',
          'Алгоритм Кана нельзя использовать на графах, которые могут содержать циклы',
          'Он молча возвращает неполный, но всё же пригодный порядок',
        ],
        explanation:
          'Алгоритм Кана для топологической сортировки работает именно потому, что в DAG (направленном ациклическом графе) на каждом этапе всегда есть хотя бы один узел с входящей степенью 0 — обработать его, удалить его исходящие рёбра (уменьшив входящую степень соседей), и повторить. Если лежащие в основе ограничения на самом деле образуют цикл (противоречие, например, alien dictionary подразумевает, что \'a\' идёт раньше \'b\', \'b\' раньше \'c\', а \'c\' раньше \'a\'), то каждый оставшийся узел этого цикла навсегда сохраняет ненулевую входящую степень — ни один из них никогда не попадёт в очередь, поэтому алгоритм завершается, обработав меньше букв, чем существует всего. Сравнение result.length() с ожидаемым числом букв после цикла — именно так эта реализация обнаруживает такую невозможность, без отдельной проверки циклов через DFS.',
      },
    },
    {
      q: 'This finds the minimum window substring of s containing all characters of t (with counts) using a sliding window. Why does the window only shrink from the left once it fully satisfies t\'s requirements?\n\n// expand right pointer, tracking counts of characters needed\n// once the window contains all of t\'s characters (with sufficient counts),\n// try shrinking from the left as much as possible while still valid,\n// recording the smallest valid window seen; then continue expanding right',
      options: [
        'Shrinking is only useful once the window is valid — shrinking an invalid window can\'t produce a valid (and thus recordable) smaller answer, so it would be wasted work',
        'Shrinking before validity would cause an infinite loop',
        'The order doesn\'t matter; shrinking first would give the same result',
        'It shrinks from the left continuously regardless of validity, checking t\'s requirements only at the end'
      ],
      correct: [0],
      explanation:
        'The algorithm only records/considers a window as a candidate answer once it actually contains all required characters of t — an invalid (incomplete) window is never a valid answer, so there\'s nothing to gain by shrinking one. Once the window becomes valid by expanding right, shrinking from the left as far as possible while remaining valid is exactly how the smallest valid window ending near the current right pointer is found — every unnecessary character on the left is dropped until removing one more would break validity. This "expand until valid, then shrink until invalid" two-pointer rhythm is what keeps the whole algorithm to O(n) total pointer movement (each pointer only moves forward, never backward), rather than re-scanning from scratch for every possible window.',
      ru: {
        question: 'Этот метод находит минимальное окно-подстроку s, содержащую все символы t (с учётом количества), используя скользящее окно. Почему окно сжимается слева только после того, как полностью удовлетворяет требованиям t?\n\n// расширяем правый указатель, отслеживая счётчики нужных символов\n// как только окно содержит все символы t (в достаточном количестве),\n// пытаемся сжать слева максимально, оставаясь валидным,\n// запоминая наименьшее валидное окно; затем продолжаем расширять вправо',
        options: [
          'Сжатие полезно только когда окно валидно — сжатие невалидного окна не может дать валидный (а значит, пригодный для записи) меньший ответ, так что это была бы напрасная работа',
          'Сжатие до валидности вызвало бы бесконечный цикл',
          'Порядок не важен; сжатие сначала дало бы тот же результат',
          'Оно непрерывно сжимается слева независимо от валидности, проверяя требования t только в конце',
        ],
        explanation:
          'Алгоритм записывает/рассматривает окно как кандидата в ответ только когда оно действительно содержит все требуемые символы t — невалидное (неполное) окно никогда не является валидным ответом, так что сжимать его незачем. Как только окно становится валидным за счёт расширения вправо, сжатие слева максимально, пока оно остаётся валидным, — именно так находится наименьшее валидное окно, заканчивающееся около текущего правого указателя: каждый лишний символ слева отбрасывается, пока удаление ещё одного не нарушит валидность. Этот ритм двух указателей «расширять до валидности, затем сжимать до невалидности» и обеспечивает суммарное движение указателей за O(n) для всего алгоритма (каждый указатель движется только вперёд, никогда назад), а не пересканирование с нуля для каждого возможного окна.',
      },
    },
    {
      q: 'This maintains a running median of a stream using two heaps (a max-heap "lower" for the smaller half, a min-heap "upper" for the larger half). Why must the heaps be rebalanced after every insertion?\n\n// insert(n): add n to lower or upper based on comparison with lower\'s max\n// if sizes differ by more than 1, move the top of the larger heap to the smaller one\n// median: if sizes equal, avg of both tops; else, top of the larger heap',
      options: [
        'To keep the size difference between the two heaps at most 1, so the median is always obtainable in O(1) from the heap tops',
        'Rebalancing is optional and only affects performance, not correctness',
        'To keep both heaps sorted internally',
        'To prevent duplicate values across the two heaps'
      ],
      correct: [0],
      explanation:
        'The two-heap median trick relies on an invariant: "lower" (a max-heap) always holds the smaller half of all numbers seen so far, "upper" (a min-heap) holds the larger half, and their sizes never differ by more than 1. That invariant is exactly what makes reading the median an O(1) operation — either the two tops average together (even total count) or the larger heap\'s top is the median outright (odd total count) — without ever needing to sort or scan all elements. Every insertion can push the size difference to 2, so rebalancing (moving one element from the larger heap to the smaller) after each insert is what restores the invariant before the next median query; skipping it would make the "top of the larger heap" claim incorrect, breaking correctness, not just performance.',
      ru: {
        question: 'Этот метод поддерживает текущую медиану потока с помощью двух куч (max-heap "lower" для меньшей половины, min-heap "upper" для большей половины). Почему кучи нужно перебалансировать после каждой вставки?\n\n// insert(n): добавить n в lower или upper на основе сравнения с максимумом lower\n// если размеры отличаются больше чем на 1, переместить вершину большей кучи в меньшую\n// median: если размеры равны, среднее обеих вершин; иначе — вершина большей кучи',
        options: [
          'Чтобы разница размеров двух куч не превышала 1, тогда медиану всегда можно получить за O(1) из вершин куч',
          'Перебалансировка необязательна и влияет только на производительность, не на корректность',
          'Чтобы обе кучи оставались отсортированными внутри',
          'Чтобы предотвратить дублирующиеся значения между двумя кучами',
        ],
        explanation:
          'Приём с двумя кучами для медианы опирается на инвариант: "lower" (max-heap) всегда хранит меньшую половину всех встреченных чисел, "upper" (min-heap) хранит большую половину, и их размеры никогда не отличаются больше чем на 1. Именно этот инвариант делает чтение медианы операцией O(1) — либо усредняются обе вершины (чётное общее количество), либо вершина большей кучи прямо и есть медиана (нечётное количество) — без необходимости когда-либо сортировать или просматривать все элементы. Каждая вставка может увеличить разницу размеров до 2, поэтому перебалансировка (перемещение одного элемента из большей кучи в меньшую) после каждой вставки восстанавливает инвариант перед следующим запросом медианы; пропуск этого шага сделал бы утверждение «вершина большей кучи» неверным, нарушая именно корректность, а не только производительность.',
      },
    },
  ],
}

export const codeQuestions = Object.entries(raw).flatMap(([topic, items]) =>
  items.map((item, i) => ({
    id: `code-${topic}-${i + 1}`,
    section: 'CODE',
    topic,
    question: item.q,
    options: item.options,
    correct: item.correct,
    explanation: item.explanation,
    ru: item.ru,
    variantGroup: item.variantGroup,
  }))
)
