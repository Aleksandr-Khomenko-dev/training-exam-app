// Original practice questions for OCA (Oracle Certified Associate, Java SE 8 Programmer I)
// Topics follow the official 1Z0-808 exam objectives. Each question carries an optional
// `ru` overlay with a Russian translation of the question/options/explanation.
// Some questions have more than one correct answer ("Choose two"), matching the real exam format.

export const ocaTopics = [
  { slug: 'java-basics', title: 'Java Basics', titleRu: 'Основы Java' },
  { slug: 'data-types', title: 'Working with Java Data Types', titleRu: 'Типы данных Java' },
  { slug: 'operators', title: 'Operators & Decision Constructs', titleRu: 'Операторы и конструкции ветвления' },
  { slug: 'arrays', title: 'Arrays', titleRu: 'Массивы' },
  { slug: 'loops', title: 'Loop Constructs', titleRu: 'Циклы' },
  { slug: 'methods-encapsulation', title: 'Methods & Encapsulation', titleRu: 'Методы и инкапсуляция' },
  { slug: 'inheritance', title: 'Inheritance', titleRu: 'Наследование' },
  { slug: 'exceptions', title: 'Exception Handling', titleRu: 'Обработка исключений' },
  { slug: 'core-api', title: 'String, StringBuilder & Core API', titleRu: 'String, StringBuilder и базовый API' },
]

const raw = {
  'java-basics': [
    {
      q: 'Which command compiles a Java source file named Main.java?',
      options: ['javac Main.java', 'java Main.java', 'jar Main.java', 'javap Main.java'],
      correct: [0],
      explanation:
        'javac is the Java compiler: it reads a .java source file, checks it for syntax and type errors, and produces a .class file containing JVM bytecode. java is a different tool entirely — it launches the JVM and runs an already-compiled class, so "java Main.java" would fail because java expects a class name, not a source file. jar packages compiled classes into an archive, and javap disassembles compiled bytecode back into a readable form; neither compiles source. Remembering the split — javac to compile, java to run — is one of the most fundamental exam facts.',
      ru: {
        question: 'Какая команда компилирует файл с исходным кодом Java с именем Main.java?',
        options: ['javac Main.java', 'java Main.java', 'jar Main.java', 'javap Main.java'],
        explanation:
          'javac — это компилятор Java: он читает .java-файл, проверяет синтаксис и типы, и создаёт .class-файл с байт-кодом JVM. java — совсем другой инструмент: он запускает JVM и выполняет уже скомпилированный класс, поэтому "java Main.java" завершится ошибкой, так как java ожидает имя класса, а не файл с исходным кодом. jar упаковывает скомпилированные классы в архив, а javap дизассемблирует байт-код обратно в читаемый вид — ни один из них не компилирует исходники. Разделение javac (компиляция) / java (запуск) — одна из базовых вещей, которую нужно твёрдо знать на экзамене.',
      },
    },
    {
      q: 'What must be true about a top-level public class in a .java file?',
      options: [
        'The file name must exactly match the public class name (case-sensitive), with a .java extension',
        'The file can contain any number of public top-level classes',
        'The public class must be declared abstract',
        'The file name must match the package name',
      ],
      correct: [0],
      explanation:
        'A .java source file may declare multiple top-level classes, but at most one of them can be public, and when there is one, the compiler enforces that the file name matches that class name exactly, including letter case — MainClass in a file named mainclass.java will not compile. This rule exists so the compiler and JVM class loader can find a public type by simply looking for a matching file name on the classpath. Package names control directory placement (via the package statement), not the file name itself, and there is no requirement that a public class be abstract.',
      ru: {
        question: 'Что обязательно должно выполняться для публичного (public) класса верхнего уровня в .java-файле?',
        options: [
          'Имя файла должно точно совпадать с именем public-класса (с учётом регистра), плюс расширение .java',
          'Файл может содержать любое количество public-классов верхнего уровня',
          'Public-класс обязательно должен быть объявлен abstract',
          'Имя файла должно совпадать с именем пакета',
        ],
        explanation:
          '.java-файл может содержать несколько классов верхнего уровня, но публичным (public) может быть только один из них, и если такой класс есть, компилятор требует, чтобы имя файла точно совпадало с его именем, включая регистр букв — MainClass в файле mainclass.java не скомпилируется. Это правило существует, чтобы компилятор и загрузчик классов JVM могли находить публичный тип, просто ища файл с совпадающим именем в classpath. Имя пакета определяет расположение в каталогах (через оператор package), а не имя файла, и нет никакого требования, чтобы public-класс был abstract.',
      },
    },
    {
      q: 'Given `package com.example.app;`, which directory layout is required under a source root named src?',
      options: [
        'src/com/example/app/ClassName.java',
        'src/com.example.app/ClassName.java',
        'src/ClassName.java',
        'src/app/example/com/ClassName.java',
      ],
      correct: [0],
      explanation:
        'A package declaration is not just a label — it is a physical instruction to the compiler and classloader about where the corresponding .class file must live. Each segment of the dotted package name becomes one level of nested directory, in the same left-to-right order, so com.example.app maps to com/example/app. This mirrors how fully-qualified class names work: the JVM locates com.example.app.ClassName by walking that exact directory chain from a classpath root. Reversing the segments or collapsing them into one folder both break that lookup and would cause a "package does not match expected directory" error from the compiler.',
      ru: {
        question: 'При `package com.example.app;` какая структура каталогов требуется относительно корня исходников src?',
        options: [
          'src/com/example/app/ClassName.java',
          'src/com.example.app/ClassName.java',
          'src/ClassName.java',
          'src/app/example/com/ClassName.java',
        ],
        explanation:
          'Объявление package — это не просто метка, а физическая инструкция компилятору и загрузчику классов о том, где должен находиться соответствующий .class-файл. Каждый сегмент имени пакета через точку превращается в один уровень вложенного каталога, в том же порядке слева направо, поэтому com.example.app отображается в com/example/app. Это точно повторяет то, как работают полностью квалифицированные имена классов: JVM находит com.example.app.ClassName, проходя именно по этой цепочке каталогов от корня classpath. Перестановка сегментов или их объединение в одну папку нарушает этот поиск и приведёт к ошибке компилятора о несоответствии пакета и каталога.',
      },
    },
    {
      q: 'Which statement correctly describes the relationship between the JDK, JRE, and JVM?',
      options: [
        'The JDK includes the JRE, and the JRE includes the JVM plus the core libraries needed to run applications',
        'The JRE includes the JDK, and the JDK includes the JVM',
        'The JVM includes the JDK, and the JRE is a subset of the JVM',
        'JDK, JRE, and JVM are interchangeable names for the same thing',
      ],
      correct: [0],
      explanation:
        'These three form a set of nested layers, each broader than the last. The JVM (Java Virtual Machine) is the innermost piece: the engine that actually executes bytecode, one implementation per platform. The JRE (Java Runtime Environment) wraps the JVM together with the standard class libraries (java.lang, java.util, and so on) needed to run a compiled application — this is all an end user needs to run Java software. The JDK (Java Development Kit) wraps the JRE again and adds development tools such as javac, javadoc, and jar, which only developers need. So the containment direction is always JDK ⊃ JRE ⊃ JVM, never the reverse.',
      ru: {
        question: 'Какое утверждение верно описывает соотношение JDK, JRE и JVM?',
        options: [
          'JDK включает в себя JRE, а JRE включает JVM плюс базовые библиотеки, нужные для запуска приложений',
          'JRE включает в себя JDK, а JDK включает JVM',
          'JVM включает в себя JDK, а JRE — подмножество JVM',
          'JDK, JRE и JVM — взаимозаменяемые названия одного и того же',
        ],
        explanation:
          'Эти три компонента образуют вложенные друг в друга слои, каждый следующий шире предыдущего. JVM (виртуальная машина Java) — самый внутренний слой: движок, который непосредственно выполняет байт-код, своя реализация под каждую платформу. JRE (среда выполнения Java) оборачивает JVM вместе со стандартными библиотеками классов (java.lang, java.util и т.д.), необходимыми для запуска скомпилированного приложения — это всё, что нужно обычному пользователю для запуска Java-софта. JDK (комплект разработчика Java) оборачивает JRE ещё раз и добавляет инструменты разработки вроде javac, javadoc и jar, нужные только разработчикам. Таким образом, направление вложенности всегда JDK ⊃ JRE ⊃ JVM, и никогда наоборот.',
      },
    },
    {
      q: 'What is printed when this is run as `java Main a b`?\n\npublic static void main(String[] args) {\n    System.out.println(args.length);\n}',
      options: ['2', '1', '0', 'Compilation error'],
      correct: [0],
      explanation:
        'When the JVM launches a program via `java ClassName arg1 arg2 ...`, everything after the class name is collected into the String[] args array passed to main — the class name itself and the java command are not part of args. Here two tokens follow Main: "a" and "b", so args has length 2 and args[0] is "a", args[1] is "b". A very common beginner mistake is assuming the program name counts as args[0], as it does in some other languages (like C); in Java it never does.',
      ru: {
        question: 'Что будет напечатано при запуске `java Main a b`?\n\npublic static void main(String[] args) {\n    System.out.println(args.length);\n}',
        options: ['2', '1', '0', 'Ошибка компиляции'],
        explanation:
          'Когда JVM запускает программу через `java ClassName arg1 arg2 ...`, всё, что идёт после имени класса, попадает в массив String[] args, переданный в main — само имя класса и команда java в args не входят. Здесь после Main идут два токена: "a" и "b", поэтому args.length равно 2, а args[0] — это "a", args[1] — "b". Частая ошибка новичков — считать, что имя программы становится args[0], как в некоторых других языках (например, C); в Java это никогда не так.',
      },
    },
    {
      q: 'Which statement about the main method signature is true?',
      options: [
        'public static void main(String[] args) is required, but the parameter name and using varargs (String... args) instead are flexible',
        'main must always be declared final',
        'main cannot be declared in a class that also has a constructor',
        'main must return an int representing the exit code',
      ],
      correct: [0],
      explanation:
        'The JVM looks for a very specific method signature to use as an entry point: it must be public, static, return void, and be named main, taking a single parameter that is an array of String (or, equivalently, a String varargs parameter, since String... args compiles to the same array type under the hood). Within those constraints, the parameter\'s name is entirely up to the programmer — args, arguments, or anything else all work identically. Nothing requires main to be final, and a class is free to have both a main method and one or more constructors; they serve unrelated purposes.',
      ru: {
        question: 'Какое утверждение о сигнатуре метода main верно?',
        options: [
          'public static void main(String[] args) обязательна, но имя параметра гибкое, а также можно использовать varargs (String... args)',
          'main всегда должен быть объявлен как final',
          'main нельзя объявить в классе, у которого есть конструктор',
          'main должен возвращать int, представляющий код завершения',
        ],
        explanation:
          'JVM ищет очень конкретную сигнатуру метода в качестве точки входа: он должен быть public, static, возвращать void и называться main, принимая один параметр — массив String (или, что то же самое, varargs-параметр String..., поскольку String... args компилируется в тот же тип массива). В рамках этих ограничений имя параметра целиком на усмотрение программиста — args, arguments или что угодно ещё работают одинаково. Ничто не требует, чтобы main был final, и класс вполне может иметь одновременно метод main и один или несколько конструкторов — они решают не связанные друг с другом задачи.',
      },
    },
  ],
  'data-types': [
    {
      q: 'Which of the following is a valid primitive type in Java?',
      options: ['byte', 'Byte', 'Integer', 'String'],
      correct: [0],
      explanation:
        'Java defines exactly eight primitive types: byte, short, int, long, float, double, char, and boolean — all lowercase keywords, not classes. byte is one of them, an 8-bit signed integer. Byte, Integer, and String, by contrast, are all reference types: Byte and Integer are the "wrapper" classes that box a primitive value inside an object (useful for generics and collections, which cannot hold raw primitives), and String is an ordinary immutable class. A quick way to tell them apart on the exam: primitive type keywords are always lowercase.',
      ru: {
        question: 'Какой из перечисленных вариантов является примитивным типом в Java?',
        options: ['byte', 'Byte', 'Integer', 'String'],
        explanation:
          'В Java ровно восемь примитивных типов: byte, short, int, long, float, double, char и boolean — все они пишутся строчными буквами и не являются классами. byte — один из них, 8-битное знаковое целое число. Byte, Integer и String, напротив, — ссылочные типы: Byte и Integer — это классы-обёртки, "упаковывающие" примитивное значение в объект (это нужно для дженериков и коллекций, которые не могут хранить примитивы напрямую), а String — обычный неизменяемый класс. Быстрый способ отличить их на экзамене: ключевые слова примитивных типов всегда пишутся с маленькой буквы.',
      },
    },
    {
      q: 'What is the result of this code?\n\nbyte b = 127;\nb++;\nSystem.out.println(b);',
      options: ['-128', '128', 'Compilation error', '0'],
      correct: [0],
      explanation:
        'byte is an 8-bit signed integer, so it can represent values from -128 to 127 using two\'s-complement representation. 127 is the maximum representable value; incrementing it does not throw an exception or grow the type — instead the bit pattern wraps around silently to the minimum value, -128, exactly the way an odometer rolls over from 999999 to 000000. This "silent overflow" behavior applies to all of Java\'s fixed-width integer types (byte, short, int, long) and is a classic exam trap because nothing about the code looks unusual.',
      ru: {
        question: 'Каков результат выполнения этого кода?\n\nbyte b = 127;\nb++;\nSystem.out.println(b);',
        options: ['-128', '128', 'Ошибка компиляции', '0'],
        explanation:
          'byte — это 8-битное знаковое целое число, поэтому оно может представлять значения от -128 до 127 в дополнительном коде. 127 — максимально возможное значение; при инкременте не выбрасывается исключение и тип не расширяется — вместо этого битовый шаблон молча "переворачивается" в минимальное значение -128, точно так же, как одометр переходит с 999999 на 000000. Такое "тихое переполнение" характерно для всех целочисленных типов фиксированной ширины в Java (byte, short, int, long) и является классической ловушкой на экзамене, потому что в коде внешне нет ничего необычного.',
      },
    },
    {
      q: 'Which declaration does NOT compile?',
      options: ['int x = 10L;', 'long x = 10;', 'double d = 10;', 'float f = 10.5f;'],
      correct: [0],
      explanation:
        'Java allows implicit ("widening") conversions only when the target type can represent every value the source type can — int to long, or int to double, always fits safely, so those compile without a cast. Going the other way, from a larger type like long down to a smaller one like int, is a "narrowing" conversion that can lose data, so the compiler refuses it unless you write an explicit cast: int x = (int) 10L; would compile. 10L is a long literal (the L suffix marks it), so assigning it directly to an int variable triggers exactly this narrowing error.',
      ru: {
        question: 'Какое из объявлений НЕ скомпилируется?',
        options: ['int x = 10L;', 'long x = 10;', 'double d = 10;', 'float f = 10.5f;'],
        explanation:
          'Java допускает неявные ("расширяющие") преобразования только тогда, когда целевой тип способен представить любое значение исходного типа — int в long или int в double всегда помещаются безопасно, поэтому компилируются без приведения типа. Обратное направление — из более широкого типа, например long, в более узкий, например int, — это "сужающее" преобразование, которое может потерять данные, поэтому компилятор его отклоняет, если не написать явное приведение: int x = (int) 10L; скомпилируется. 10L — это long-литерал (суффикс L это обозначает), и присвоение его напрямую переменной int вызывает именно такую ошибку сужения.',
      },
    },
    {
      q: 'What does `var count = 10;` do in Java 10+?',
      options: [
        'Declares a local variable named count whose type is inferred as int',
        'Declares a variable of type Object',
        'Causes a compile error because var is not a keyword',
        'Declares an untyped variable, similar to JavaScript',
      ],
      correct: [0],
      explanation:
        'var (introduced in Java 10) enables local variable type inference: the compiler looks at the initializer expression on the right-hand side and determines a concrete, fixed type for the variable at compile time — here, since 10 is an int literal, count is compiled exactly as if you had written "int count = 10;". This is purely a compile-time convenience; there is no runtime cost and no dynamic typing involved, unlike var in JavaScript. var is a "reserved type name," not a full keyword, so it can still be used as an identifier elsewhere, and it only works for local variables with an initializer — not for fields, method parameters, or return types.',
      ru: {
        question: 'Что делает `var count = 10;` начиная с Java 10?',
        options: [
          'Объявляет локальную переменную count, тип которой выводится компилятором как int',
          'Объявляет переменную типа Object',
          'Вызывает ошибку компиляции, так как var не является ключевым словом',
          'Объявляет нетипизированную переменную, как в JavaScript',
        ],
        explanation:
          'var (появился в Java 10) включает вывод типа локальной переменной: компилятор смотрит на выражение-инициализатор справа и на этапе компиляции определяет конкретный, фиксированный тип переменной — здесь, поскольку 10 — это int-литерал, count компилируется ровно так же, как если бы вы написали "int count = 10;". Это исключительно удобство на этапе компиляции: нет никаких затрат во время выполнения и никакой динамической типизации, в отличие от var в JavaScript. var — это "зарезервированное имя типа", а не полноценное ключевое слово, поэтому его всё ещё можно использовать как идентификатор в других местах, и оно работает только для локальных переменных с инициализатором — не для полей, параметров методов или возвращаемых типов.',
      },
    },
    {
      q: 'Which is true about a `final` local variable?',
      options: [
        'It can be assigned a value only once',
        'It must always be initialized on the same line it is declared',
        'It can never be used inside a lambda expression',
        'final only applies to reference types, not primitives',
      ],
      correct: [0],
      explanation:
        'final is a modifier that forbids reassignment after the variable has been given a value — it does not forbid delaying that first assignment. A "blank final" local variable can be declared without an initializer and assigned exactly once later, as long as the compiler can prove every code path assigns it before it is read. final applies equally to primitives and references: for a primitive, it locks the value itself; for a reference, it locks which object the variable points to (the object\'s own fields can still change). This matters directly for lambdas, which are allowed to capture local variables from the enclosing scope only if those variables are final or "effectively final" (never reassigned after initialization).',
      ru: {
        question: 'Что верно про локальную переменную с модификатором `final`?',
        options: [
          'Ей можно присвоить значение только один раз',
          'Она обязательно должна быть инициализирована в той же строке, где объявлена',
          'Её никогда нельзя использовать внутри лямбда-выражения',
          'final применяется только к ссылочным типам, но не к примитивам',
        ],
        explanation:
          'final — это модификатор, запрещающий переприсваивание после того, как переменной уже было присвоено значение — он не запрещает отложить это первое присваивание. "Пустая final"-переменная (blank final) может быть объявлена без инициализатора и присвоена ровно один раз позже, если компилятор может доказать, что на любом пути выполнения она получает значение до того, как её прочитают. final одинаково применим и к примитивам, и к ссылкам: для примитива он фиксирует само значение, для ссылки — то, на какой объект указывает переменная (поля самого объекта при этом менять можно). Это напрямую важно для лямбд: они могут захватывать локальные переменные из внешней области видимости только если те final или "эффективно final" (никогда не переприсваивались после инициализации).',
      },
    },
    {
      q: 'What is autoboxing?',
      options: [
        'The automatic conversion between a primitive type and its corresponding wrapper class',
        'The automatic casting between int and long',
        'Automatic garbage collection of wrapper objects',
        'A compiler optimization that removes unused variables',
      ],
      correct: [0],
      explanation:
        'Every primitive type has a matching wrapper class — int/Integer, double/Double, boolean/Boolean, and so on. Autoboxing is the compiler automatically wrapping a primitive value in its corresponding wrapper object when a reference type is expected (for example, adding an int to a List<Integer>, since generic collections can only hold objects, not primitives); unboxing is the reverse, automatically extracting the primitive value from a wrapper when a primitive is expected. This is purely syntactic sugar the compiler inserts — under the hood it is literally inserting calls like Integer.valueOf(x) and x.intValue() — and it is worth knowing it can silently throw a NullPointerException if you unbox a null wrapper reference.',
      ru: {
        question: 'Что такое автоупаковка (autoboxing)?',
        options: [
          'Автоматическое преобразование между примитивным типом и соответствующим ему классом-обёрткой',
          'Автоматическое приведение между int и long',
          'Автоматическая сборка мусора для объектов-обёрток',
          'Оптимизация компилятора, удаляющая неиспользуемые переменные',
        ],
        explanation:
          'У каждого примитивного типа есть соответствующий класс-обёртка — int/Integer, double/Double, boolean/Boolean и так далее. Автоупаковка (autoboxing) — это когда компилятор автоматически "упаковывает" примитивное значение в соответствующий объект-обёртку там, где ожидается ссылочный тип (например, при добавлении int в List<Integer>, поскольку обобщённые коллекции могут хранить только объекты, а не примитивы); распаковка (unboxing) — обратный процесс, автоматическое извлечение примитивного значения из обёртки там, где ожидается примитив. Это чисто синтаксический сахар, который компилятор вставляет сам — под капотом буквально вставляются вызовы вроде Integer.valueOf(x) и x.intValue() — и стоит помнить, что распаковка может незаметно выбросить NullPointerException, если распаковывается null-ссылка на обёртку.',
      },
    },
    {
      q: 'Which two are valid primitive types in Java? (Choose two)',
      options: ['short', 'Short', 'Character', 'char', 'Int'],
      correct: [0, 3],
      explanation:
        'short and char are two of the eight true primitive types — short is a 16-bit signed integer, char is a 16-bit unsigned value representing a UTF-16 code unit. Short and Character are their wrapper-class counterparts (capitalized, full classes with methods), not primitives themselves, and "Int" is not valid Java at all — the primitive is spelled int, all lowercase, with no capitalized equivalent as a keyword. On the exam, watch for capitalization tricks like this; they are one of the most common ways wrong answers are disguised as right ones.',
      ru: {
        question: 'Какие два из перечисленных являются примитивными типами в Java? (Выберите два)',
        options: ['short', 'Short', 'Character', 'char', 'Int'],
        explanation:
          'short и char — два из восьми настоящих примитивных типов: short — это 16-битное знаковое целое число, char — 16-битное беззнаковое значение, представляющее единицу кода UTF-16. Short и Character — это их классы-обёртки (с заглавной буквы, полноценные классы с методами), а не сами примитивы, а "Int" вообще не является допустимым в Java — примитив пишется int, полностью строчными буквами, и не существует такого ключевого слова с заглавной буквы. На экзамене стоит внимательно следить за такими подвохами с регистром — это один из самых частых способов замаскировать неверный ответ под верный.',
      },
    },
  ],
  operators: [
    {
      q: 'What is the value of `int x = 5 % 2;`?',
      options: ['1', '2', '0', '2.5'],
      correct: [0],
      explanation:
        'The % operator computes the remainder left over after integer division, not a fractional result. 5 divided by 2 goes in twice (2 × 2 = 4), leaving a remainder of 1, so 5 % 2 evaluates to 1. Because both operands here are int, the result type is also int — there is no way to get a value like 2.5 out of %, that would only be possible with a "/" division between floating-point operands. This operator is frequently used to test even/odd (n % 2 == 0) or to wrap an index around the bounds of an array.',
      ru: {
        question: 'Чему равно значение `int x = 5 % 2;`?',
        options: ['1', '2', '0', '2.5'],
        explanation:
          'Оператор % вычисляет остаток от целочисленного деления, а не дробный результат. 5, делённое на 2, укладывается два раза (2 × 2 = 4), остаётся остаток 1, поэтому 5 % 2 равно 1. Поскольку оба операнда здесь — int, результат тоже имеет тип int — получить из % значение вроде 2.5 невозможно, это было бы возможно только при делении "/" между операндами с плавающей точкой. Этот оператор часто используют для проверки чётности/нечётности (n % 2 == 0) или для "закольцовывания" индекса в пределах границ массива.',
      },
    },
    {
      q: 'Given `int a = 10, b = 3;`, what is `a / b`?',
      options: ['3', '3.33', '4', 'Compilation error'],
      correct: [0],
      explanation:
        'When both operands of / are integer types, Java performs integer division: it computes how many whole times the divisor fits into the dividend and discards any fractional remainder entirely (it does not round). 10 divided by 3 fits 3 whole times (3 × 3 = 9), with a leftover of 1 that is simply thrown away, so the result is 3, not 3.33 or 4. To get a fractional answer, at least one operand needs to be a floating-point type, for example (double) a / b, which forces floating-point division and yields approximately 3.33.',
      ru: {
        question: 'При `int a = 10, b = 3;`, чему равно `a / b`?',
        options: ['3', '3.33', '4', 'Ошибка компиляции'],
        explanation:
          'Когда оба операнда / — целочисленные типы, Java выполняет целочисленное деление: вычисляет, сколько целых раз делитель укладывается в делимое, и полностью отбрасывает дробный остаток (без округления). 10, делённое на 3, укладывается 3 целых раза (3 × 3 = 9), остаток 1 просто отбрасывается, поэтому результат равен 3, а не 3.33 или 4. Чтобы получить дробный ответ, хотя бы один операнд должен быть типом с плавающей точкой, например (double) a / b, что заставит выполнить деление с плавающей точкой и даст примерно 3.33.',
      },
    },
    {
      q: 'How does `&&` differ from `&` when used with two boolean operands?',
      options: [
        '&& short-circuits, skipping the right operand if the left is false; & always evaluates both',
        '&& always evaluates both operands; & short-circuits',
        'There is no difference between them',
        '& cannot be used with boolean operands',
      ],
      correct: [0],
      explanation:
        'Both operators compute logical AND and give the same boolean result, but they differ in how eagerly they evaluate their operands. && ("conditional AND") is short-circuiting: if the left operand is false, the overall result is already guaranteed to be false, so Java skips evaluating the right operand entirely, saving work and, importantly, avoiding any side effects or exceptions the right side might trigger. & is also a valid boolean operator (it doubles as the bitwise AND operator for integers), but when used with booleans it always evaluates both sides regardless of the left result. This distinction matters in practice for guard checks like `if (obj != null && obj.isValid())`, where && prevents a NullPointerException that & would not.',
      ru: {
        question: 'Чем отличается `&&` от `&` при работе с двумя булевыми операндами?',
        options: [
          '&& использует короткое замыкание и пропускает вычисление правого операнда, если левый false; & всегда вычисляет оба',
          '&& всегда вычисляет оба операнда; & использует короткое замыкание',
          'Между ними нет разницы',
          '& нельзя использовать с булевыми операндами',
        ],
        explanation:
          'Оба оператора вычисляют логическое И и дают одинаковый булевый результат, но отличаются тем, насколько "жадно" они вычисляют операнды. && ("условное И") использует короткое замыкание: если левый операнд false, итоговый результат уже гарантированно false, поэтому Java вообще не вычисляет правый операнд, экономя работу и, что важно, избегая побочных эффектов или исключений, которые правая часть могла бы вызвать. & — тоже допустимый булевый оператор (он же используется как побитовое И для целых чисел), но при работе с булевыми значениями он всегда вычисляет обе стороны независимо от результата левой. Это отличие имеет значение на практике для проверок вроде `if (obj != null && obj.isValid())`, где && предотвращает NullPointerException, а & — нет.',
      },
    },
    {
      q: 'What is printed?\n\nint x = 5;\nint y = (x > 3) ? 10 : 20;\nSystem.out.println(y);',
      options: ['10', '20', '5', 'Compilation error'],
      correct: [0],
      explanation:
        'The ternary operator `condition ? valueIfTrue : valueIfFalse` is a compact single-expression form of an if/else that produces a value rather than executing statements. Here the condition x > 3 evaluates to true (since x is 5), so the whole expression evaluates to the first branch, 10, which is then assigned to y. The second branch, 20, is simply never evaluated — much like the else branch of an if statement that took the if path. Note that both branches must be type-compatible so the compiler can determine a single result type for the expression.',
      ru: {
        question: 'Что будет напечатано?\n\nint x = 5;\nint y = (x > 3) ? 10 : 20;\nSystem.out.println(y);',
        options: ['10', '20', '5', 'Ошибка компиляции'],
        explanation:
          'Тернарный оператор `условие ? значениеЕслиTrue : значениеЕслиFalse` — компактная форма if/else в виде одного выражения, которая даёт значение, а не выполняет операторы. Здесь условие x > 3 истинно (так как x равно 5), поэтому всё выражение вычисляется в первую ветвь, 10, которая затем присваивается y. Вторая ветвь, 20, вообще не вычисляется — точно так же, как ветка else оператора if, когда выполнилась ветка if. Обе ветви должны быть совместимы по типу, чтобы компилятор мог определить единый тип результата всего выражения.',
      },
    },
    {
      q: 'What is the fall-through behavior of a traditional (non-arrow) switch statement?',
      options: [
        'Execution continues into the next case unless a break statement is encountered',
        'Each case automatically breaks after its statements execute',
        'default must always be the last label written',
        'switch cannot be used with a String selector',
      ],
      correct: [0],
      explanation:
        'Unlike many switch-style controls in other languages, a classic Java switch does not implicitly stop after a matching case\'s statements finish — execution simply continues ("falls through") into the very next case label\'s statements, and the one after that, and so on, until it either hits an explicit break, return, throw, or reaches the end of the switch block. This is intentional and occasionally useful (grouping several case labels to share one block of code), but it is also a classic source of bugs when a break is accidentally omitted. default does not have to be last syntactically — Java allows it anywhere in the switch, though placing it last is the near-universal convention — and switch works perfectly well with String and enum selectors, not just numeric ones.',
      ru: {
        question: 'Как ведёт себя "проваливание" (fall-through) в традиционном switch (без стрелочного синтаксиса)?',
        options: [
          'Выполнение продолжается в следующую ветку case, пока не встретится break',
          'Каждая ветка case автоматически завершается break после выполнения своих операторов',
          'default всегда должен быть последней меткой',
          'switch нельзя использовать с селектором типа String',
        ],
        explanation:
          'В отличие от многих аналогов switch в других языках, классический switch в Java не останавливается неявно после выполнения операторов подошедшей ветки case — выполнение просто продолжается ("проваливается") в операторы следующей метки case, затем следующей и так далее, пока не встретится явный break, return, throw, либо не закончится блок switch. Это сделано намеренно и иногда полезно (объединение нескольких меток case для общего блока кода), но это же классический источник ошибок, когда break случайно забывают. default синтаксически не обязан идти последним — Java допускает разместить его где угодно в switch, хотя размещение последним — почти универсальное соглашение — и switch отлично работает с селекторами String и enum, а не только с числовыми.',
      },
    },
    {
      q: 'What is the output?\n\nint i = 1;\nswitch (i) {\n  case 1:\n  case 2:\n    System.out.println("A");\n    break;\n  case 3:\n    System.out.println("B");\n}',
      options: ['A', 'B', 'AB', 'Compilation error'],
      correct: [0],
      explanation:
        'i matches case 1. That case label has no statements of its own before the next label, so execution falls straight through into case 2\'s body, which prints "A" and then hits break, exiting the switch. This pattern — an empty case stacked directly on top of another — is a common, deliberate use of fall-through to make several values share identical handling, effectively meaning "if i is 1 or 2, print A." case 3 is never reached because the break already exited the switch.',
      ru: {
        question: 'Каков результат?\n\nint i = 1;\nswitch (i) {\n  case 1:\n  case 2:\n    System.out.println("A");\n    break;\n  case 3:\n    System.out.println("B");\n}',
        options: ['A', 'B', 'AB', 'Ошибка компиляции'],
        explanation:
          'i совпадает с case 1. У этой метки нет собственных операторов перед следующей меткой, поэтому выполнение сразу проваливается в тело case 2, которое печатает "A" и затем доходит до break, выходя из switch. Этот паттерн — пустой case, "сложенный" прямо над другим — распространённое, намеренное использование fall-through, чтобы несколько значений обрабатывались одинаково, по сути означая "если i равно 1 или 2, напечатать A". case 3 никогда не достигается, так как break уже вывел выполнение из switch.',
      },
    },
    {
      q: 'Which two operators short-circuit their evaluation? (Choose two)',
      options: ['&&', '&', '||', '|'],
      correct: [0, 2],
      explanation:
        '&& and || are Java\'s "conditional" logical operators, and both short-circuit: && skips the right operand once the left one is false (the result is already false), and || skips the right operand once the left one is true (the result is already true). & and | are the "boolean logical" (also bitwise) operators — when applied to two booleans they compute the same logical result as && and ||, but they always evaluate both operands unconditionally, even when the left side alone already determines the outcome. Choosing between them is a real design decision in code that calls a method with side effects or that might throw, such as `if (list != null & list.isEmpty())`, which would throw a NullPointerException on a null list where the && version would safely short-circuit.',
      ru: {
        question: 'Какие два оператора используют короткое замыкание при вычислении? (Выберите два)',
        options: ['&&', '&', '||', '|'],
        explanation:
          '&& и || — это "условные" логические операторы Java, и оба используют короткое замыкание: && пропускает вычисление правого операнда, как только левый оказался false (результат уже гарантированно false), а || пропускает правый операнд, как только левый оказался true (результат уже гарантированно true). & и | — это "булевы логические" (они же побитовые) операторы — применённые к двум булевым значениям, они дают тот же логический результат, что и && и ||, но всегда безусловно вычисляют оба операнда, даже если левая сторона уже определяет итог. Выбор между ними — реальное архитектурное решение в коде, вызывающем метод с побочными эффектами или способном выбросить исключение, например `if (list != null & list.isEmpty())`, который выбросит NullPointerException на null-списке, тогда как вариант с && безопасно сработает по короткому замыканию.',
      },
    },
  ],
  arrays: [
    {
      q: 'What is the default value of each element in a newly created int[] array of size 5?',
      options: ['0', 'null', 'undefined', 'Compilation error'],
      correct: [0],
      explanation:
        'Java always fully initializes array elements when the array is created with `new`, unlike local variables, which must be explicitly assigned before use. Every element gets the default value appropriate to the array\'s component type: numeric primitives (byte, short, int, long, float, double) default to 0 (or 0.0), boolean defaults to false, char defaults to the null character \'\\u0000\', and any reference type (including String[], Integer[], etc.) defaults to null — never "undefined", which is not a concept in Java at all. This automatic zeroing is one reason arrays are safe to read from immediately after allocation.',
      ru: {
        question: 'Каково значение по умолчанию каждого элемента только что созданного массива int[] размером 5?',
        options: ['0', 'null', 'undefined', 'Ошибка компиляции'],
        explanation:
          'Java всегда полностью инициализирует элементы массива при его создании через `new`, в отличие от локальных переменных, которым обязательно нужно явное присваивание перед использованием. Каждый элемент получает значение по умолчанию, соответствующее типу элементов массива: числовые примитивы (byte, short, int, long, float, double) по умолчанию равны 0 (или 0.0), boolean — false, char — нулевому символу \'\\u0000\', а любой ссылочный тип (включая String[], Integer[] и т.д.) — null, и никогда не "undefined", такого понятия в Java вообще нет. Это автоматическое обнуление — одна из причин, почему из массива безопасно читать сразу после выделения памяти.',
      },
    },
    {
      q: 'Which correctly declares and initializes a 2D array with 3 rows and 4 columns?',
      options: [
        'int[][] grid = new int[3][4];',
        'int grid[3][4] = new int[][];',
        'int[] grid = new int[3,4];',
        'array int grid = new int[3][4];',
      ],
      correct: [0],
      explanation:
        'A 2D array in Java is really an array of arrays: int[][] grid declares grid to be an array whose elements are themselves int[] arrays, and new int[3][4] allocates that outer array with 3 elements, each of which is a freshly allocated int[4]. The size of each dimension goes in its own bracket pair placed after new, never inside a single bracket with a comma (that comma syntax is valid in some other languages, like C#, but not Java) and never as part of the declared variable\'s brackets on the left. There is no "array" keyword in Java at all — array types are always written with square brackets attached to the element type.',
      ru: {
        question: 'Какой вариант корректно объявляет и инициализирует двумерный массив с 3 строками и 4 столбцами?',
        options: [
          'int[][] grid = new int[3][4];',
          'int grid[3][4] = new int[][];',
          'int[] grid = new int[3,4];',
          'array int grid = new int[3][4];',
        ],
        explanation:
          'Двумерный массив в Java на самом деле является массивом массивов: int[][] grid объявляет grid как массив, элементы которого сами являются массивами int[], а new int[3][4] выделяет этот внешний массив из 3 элементов, каждый из которых — только что выделенный int[4]. Размер каждого измерения указывается в своей паре скобок после new, никогда не в одной паре скобок через запятую (такой синтаксис через запятую допустим в некоторых других языках, например в C#, но не в Java) и никогда как часть скобок у имени переменной слева. В Java вообще нет ключевого слова "array" — типы массивов всегда записываются квадратными скобками, присоединёнными к типу элемента.',
      },
    },
    {
      q: 'What does `Arrays.sort(int[] arr)` do?',
      options: [
        'Sorts the array in place in ascending order',
        'Returns a new sorted array, leaving the original unchanged',
        'Sorts the array in descending order',
        'Throws an exception if the array has duplicate values',
      ],
      correct: [0],
      explanation:
        'Arrays.sort() is a void method: it does not return anything, because it mutates the array you pass it directly ("in place"), rearranging its existing elements rather than allocating a new array. For arrays of primitives it always sorts by ascending natural order (there is no built-in way to reverse-sort a primitive array directly with Arrays.sort — you would need to sort and then reverse, or use a boxed Integer[] with a Comparator). Duplicate values are completely normal and cause no error; the sort algorithm handles them the same as any other value.',
      ru: {
        question: 'Что делает `Arrays.sort(int[] arr)`?',
        options: [
          'Сортирует массив на месте по возрастанию',
          'Возвращает новый отсортированный массив, не меняя исходный',
          'Сортирует массив по убыванию',
          'Выбрасывает исключение, если в массиве есть повторяющиеся значения',
        ],
        explanation:
          'Arrays.sort() — это void-метод: он ничего не возвращает, потому что изменяет переданный ему массив напрямую ("на месте"), переставляя его существующие элементы, а не выделяя новый массив. Для массивов примитивов он всегда сортирует по возрастанию в естественном порядке (нет встроенного способа отсортировать массив примитивов по убыванию напрямую через Arrays.sort — пришлось бы отсортировать и затем развернуть, либо использовать упакованный Integer[] с Comparator). Повторяющиеся значения абсолютно нормальны и не вызывают ошибок; алгоритм сортировки обрабатывает их так же, как и любое другое значение.',
      },
    },
    {
      q: 'What is thrown when accessing arr[5] on an array declared with length 5?',
      options: ['ArrayIndexOutOfBoundsException', 'NullPointerException', 'ArrayStoreException', 'IllegalArgumentException'],
      correct: [0],
      explanation:
        'Array indices in Java are always zero-based, so an array with length 5 has valid indices 0, 1, 2, 3, and 4 — index 5 is one past the last element and does not exist. Unlike languages such as C, Java always performs bounds checking at runtime on every array access, and reading or writing an out-of-range index throws ArrayIndexOutOfBoundsException (a subclass of RuntimeException, so it is unchecked) rather than silently corrupting memory. This is a deliberate safety feature of the JVM, and off-by-one errors like using <= instead of < in a loop condition are the most common way this exception gets triggered in real code.',
      ru: {
        question: 'Какое исключение будет выброшено при обращении к arr[5] в массиве длиной 5?',
        options: ['ArrayIndexOutOfBoundsException', 'NullPointerException', 'ArrayStoreException', 'IllegalArgumentException'],
        explanation:
          'Индексы массивов в Java всегда начинаются с нуля, поэтому у массива длиной 5 допустимые индексы — 0, 1, 2, 3 и 4; индекс 5 идёт сразу после последнего элемента и не существует. В отличие от языков вроде C, Java всегда выполняет проверку границ во время выполнения при каждом обращении к массиву, и чтение или запись по индексу вне диапазона выбрасывает ArrayIndexOutOfBoundsException (подкласс RuntimeException, то есть непроверяемое исключение), а не молча портит память. Это осознанная функция безопасности JVM, и ошибки на единицу (например, использование <= вместо < в условии цикла) — самая частая причина этого исключения в реальном коде.',
      },
    },
    {
      q: 'Given `int[] nums = {1,2,3}; int[] copy = nums; copy[0] = 99;` what is `nums[0]` afterward?',
      options: ['99', '1', '0', 'Compilation error'],
      correct: [0],
      explanation:
        'Arrays are objects in Java, and object variables hold references (pointers to the object in memory), not the object\'s data directly. `int[] copy = nums;` does not create a second array — it copies the reference, so both nums and copy end up pointing at the exact same array object on the heap. Modifying an element through either variable, such as copy[0] = 99, changes that one shared array, so the change is immediately visible through nums as well. To get an independent copy you would need something like Arrays.copyOf(nums, nums.length), which allocates a genuinely new array and copies the values into it.',
      ru: {
        question: 'Дано: `int[] nums = {1,2,3}; int[] copy = nums; copy[0] = 99;` Чему станет равно `nums[0]`?',
        options: ['99', '1', '0', 'Ошибка компиляции'],
        explanation:
          'Массивы в Java — это объекты, а переменные объектов хранят ссылки (указатели на объект в памяти), а не сами данные объекта напрямую. `int[] copy = nums;` не создаёт второй массив — она копирует ссылку, поэтому и nums, и copy указывают на один и тот же объект-массив в куче. Изменение элемента через любую из переменных, например copy[0] = 99, меняет этот единственный общий массив, поэтому изменение сразу видно и через nums. Чтобы получить независимую копию, понадобилось бы что-то вроде Arrays.copyOf(nums, nums.length), которое выделяет по-настоящему новый массив и копирует в него значения.',
      },
    },
    {
      q: 'Which array declaration is invalid?',
      options: ['int arr[5];', 'int[] arr;', 'int arr[];', 'int[] arr = new int[5];'],
      correct: [0],
      explanation:
        'A bare declaration like `int arr[5];` mixes two things Java keeps strictly separate: declaring a variable\'s type versus allocating memory for it. The bracket pair on a declaration (whether written as int[] arr or the legacy C-style int arr[], both are valid Java syntax) only says "this variable is an array of int" — it never carries a size, because no memory has been allocated yet. A size may only appear in a `new` expression, as in new int[5], which is the actual allocation step. Writing a size directly in the declaration\'s brackets, as this option does, is simply not valid Java grammar and fails to compile.',
      ru: {
        question: 'Какое объявление массива является некорректным?',
        options: ['int arr[5];', 'int[] arr;', 'int arr[];', 'int[] arr = new int[5];'],
        explanation:
          'Голое объявление вроде `int arr[5];` смешивает две вещи, которые Java строго разделяет: объявление типа переменной и выделение памяти под неё. Пара скобок в объявлении (написана ли она как int[] arr или в устаревшем C-стиле int arr[], оба варианта допустимы в Java) говорит лишь "эта переменная — массив int" и никогда не несёт размер, потому что память ещё не выделена. Размер может появиться только в выражении с `new`, как в new int[5], — это и есть собственно шаг выделения памяти. Указание размера прямо в скобках объявления, как в этом варианте, попросту не является допустимой грамматикой Java и не компилируется.',
      },
    },
  ],
  loops: [
    {
      q: 'What is the output?\n\nfor (int i = 0; i < 3; i++) {\n  System.out.print(i);\n}',
      options: ['012', '123', '0123', '0 1 2'],
      correct: [0],
      explanation:
        'A for loop has three clauses executed in a strict cycle: the init clause (int i = 0) runs exactly once before anything else; the condition (i < 3) is checked before every iteration, including the first, and the loop body only runs when it is true; and the update clause (i++) runs after the body, before the condition is checked again. Tracing it: i=0 passes the check, prints "0", then i becomes 1; i=1 passes, prints "1", then i becomes 2; i=2 passes, prints "2", then i becomes 3; i=3 fails the check (3 < 3 is false) and the loop exits. print (not println) adds no separator or newline, so the output is the concatenated digits "012".',
      ru: {
        question: 'Каков результат?\n\nfor (int i = 0; i < 3; i++) {\n  System.out.print(i);\n}',
        options: ['012', '123', '0123', '0 1 2'],
        explanation:
          'У цикла for три части, выполняемые в строгом цикле: инициализация (int i = 0) выполняется ровно один раз перед всем остальным; условие (i < 3) проверяется перед каждой итерацией, включая первую, и тело цикла выполняется только когда оно истинно; обновление (i++) выполняется после тела, перед следующей проверкой условия. Трассировка: i=0 проходит проверку, печатает "0", затем i становится 1; i=1 проходит, печатает "1", затем i становится 2; i=2 проходит, печатает "2", затем i становится 3; i=3 не проходит проверку (3 < 3 ложно), цикл завершается. print (в отличие от println) не добавляет разделитель или перенос строки, поэтому вывод — это склеенные цифры "012".',
      },
    },
    {
      q: 'What does this print?\n\nint i = 0;\nwhile (i < 5) {\n  if (i == 2) { i++; continue; }\n  System.out.print(i);\n  i++;\n}',
      options: ['0134', '01234', '013', '0124'],
      correct: [0],
      explanation:
        'continue immediately jumps back to the loop\'s condition check, skipping every remaining statement in the current iteration\'s body — importantly, it does not skip the loop entirely the way break does, it only ends the current pass. Tracing it: i=0, not 2, prints "0", i becomes 1; i=1, not 2, prints "1", i becomes 2; i=2, matches the if, so i is incremented to 3 and continue fires, skipping the print — 2 is never printed; i=3, not 2, prints "3", i becomes 4; i=4, not 2, prints "4", i becomes 5; i=5 fails the while condition and the loop ends. The digit 2 is conspicuously missing from the output, which is exactly what continue is designed to do.',
      ru: {
        question: 'Что это напечатает?\n\nint i = 0;\nwhile (i < 5) {\n  if (i == 2) { i++; continue; }\n  System.out.print(i);\n  i++;\n}',
        options: ['0134', '01234', '013', '0124'],
        explanation:
          'continue немедленно возвращает выполнение к проверке условия цикла, пропуская все оставшиеся операторы текущей итерации тела — важно, что он не выходит из всего цикла, как break, а лишь завершает текущий проход. Трассировка: i=0, не 2, печатает "0", i становится 1; i=1, не 2, печатает "1", i становится 2; i=2 совпадает с if, поэтому i увеличивается до 3 и срабатывает continue, пропуская печать — 2 никогда не выводится; i=3, не 2, печатает "3", i становится 4; i=4, не 2, печатает "4", i становится 5; i=5 не проходит условие while, цикл завершается. Цифра 2 заметно отсутствует в выводе — именно для этого и предназначен continue.',
      },
    },
    {
      q: 'What is a labeled break used for?',
      options: [
        'To break out of an outer loop from within a nested loop',
        'To break out of a method entirely',
        'To skip only to the next iteration of the innermost loop',
        'Labeled breaks are not valid Java syntax',
      ],
      correct: [0],
      explanation:
        'A plain, unlabeled break only ever exits the innermost enclosing loop or switch it appears in — if you are three loops deep and need to abandon all of them at once, an ordinary break cannot reach that far. A label (an identifier followed by a colon, placed immediately before a loop, such as `outer: for (...) { ... }`) gives that loop a name, and `break outer;` used anywhere inside it — even from deep within nested loops — immediately exits that specific labeled loop, skipping straight past all the loops nested inside it. The same mechanism exists for continue with a label, which jumps to the next iteration of the labeled (outer) loop instead of the innermost one.',
      ru: {
        question: 'Для чего используется break с меткой (labeled break)?',
        options: [
          'Чтобы выйти из внешнего цикла из вложенного цикла',
          'Чтобы полностью выйти из метода',
          'Чтобы перейти только к следующей итерации самого внутреннего цикла',
          'break с меткой — недопустимый синтаксис Java',
        ],
        explanation:
          'Обычный break без метки всегда выходит только из самого внутреннего охватывающего цикла или switch, в котором он находится — если вы на три уровня вложенности циклов и нужно разом покинуть их все, обычный break до этого "не дотягивается". Метка (идентификатор, за которым следует двоеточие, размещённый прямо перед циклом, например `outer: for (...) { ... }`) даёт этому циклу имя, и `break outer;`, использованный где угодно внутри него — даже из глубоко вложенных циклов — немедленно выходит именно из этого помеченного цикла, минуя все вложенные в него циклы. Тот же механизм существует для continue с меткой, который переходит к следующей итерации помеченного (внешнего) цикла, а не самого внутреннего.',
      },
    },
    {
      q: 'What is the output?\n\nint i = 0;\ndo {\n  System.out.print(i);\n  i++;\n} while (i < 0);',
      options: ['0', '(nothing is printed)', 'infinite loop', 'Compilation error'],
      correct: [0],
      explanation:
        'Unlike for and while, which check their condition before the first iteration and might therefore run zero times, a do-while loop checks its condition only after running the body, guaranteeing the body executes at least once no matter what the condition says. Here the body runs unconditionally first: it prints "0" and increments i to 1. Only then is the condition checked — i < 0, i.e. 1 < 0 — which is false, so the loop exits after that single pass. This "run first, check after" ordering is exactly what makes do-while suitable for things like input-validation prompts that must execute at least once.',
      ru: {
        question: 'Каков результат?\n\nint i = 0;\ndo {\n  System.out.print(i);\n  i++;\n} while (i < 0);',
        options: ['0', '(ничего не выводится)', 'бесконечный цикл', 'Ошибка компиляции'],
        explanation:
          'В отличие от for и while, которые проверяют условие перед первой итерацией и потому могут выполниться ноль раз, цикл do-while проверяет условие только после выполнения тела, гарантируя, что тело выполнится хотя бы раз независимо от условия. Здесь тело сначала безусловно выполняется: печатает "0" и увеличивает i до 1. Только после этого проверяется условие — i < 0, то есть 1 < 0 — оно ложно, поэтому цикл завершается после этого единственного прохода. Именно такой порядок "сначала выполнить, потом проверить" делает do-while подходящим, например, для запросов на ввод данных, которые обязательно должны выполниться хотя бы раз.',
      },
    },
    {
      q: 'Which loop is best suited for iterating over a Collection when the index is not needed?',
      options: ['enhanced for (for-each) loop', 'traditional indexed for loop', 'do-while loop', 'while(true) with a manual break'],
      correct: [0],
      explanation:
        'The enhanced for loop, `for (Type element : collection) { ... }`, was designed specifically to remove the boilerplate of manual index/iterator management when all you need is each element in turn: no counter variable, no explicit call to .get(i) or an Iterator, and no chance of an off-by-one bounds error. It works on anything implementing Iterable (all standard collections, plus arrays as a special case), and under the hood the compiler translates it into an Iterator-based loop for you. It is the idiomatic, most readable choice whenever the index itself is not needed for the logic; once you do need the index (or need to remove elements safely during iteration), a traditional indexed loop or an explicit Iterator becomes necessary again.',
      ru: {
        question: 'Какой цикл лучше всего подходит для перебора Collection, если индекс не нужен?',
        options: ['расширенный for (for-each)', 'обычный индексированный for', 'цикл do-while', 'while(true) с ручным break'],
        explanation:
          'Расширенный цикл for, `for (Тип элемент : коллекция) { ... }`, был специально создан, чтобы убрать шаблонный код ручного управления индексом/итератором, когда нужен просто каждый элемент по очереди: не нужна переменная-счётчик, явный вызов .get(i) или Iterator, и исключается риск ошибки на единицу в границах. Он работает с чем угодно, реализующим Iterable (все стандартные коллекции, плюс массивы как особый случай), и "под капотом" компилятор сам переводит его в цикл на основе Iterator. Это идиоматичный, самый читаемый выбор всегда, когда сам индекс не нужен для логики; как только индекс всё же нужен (или требуется безопасно удалять элементы во время итерации), снова понадобится обычный индексированный цикл или явный Iterator.',
      },
    },
    {
      q: 'What happens with `for (;;) {}`?',
      options: [
        'It compiles and creates an infinite loop',
        'Compilation error because all three clauses are required',
        'It loops zero times',
        'It behaves exactly like a do-while loop',
      ],
      correct: [0],
      explanation:
        'All three clauses of a for loop — initialization, condition, and update — are independently optional; only the two semicolons that separate them are mandatory syntax. When the condition clause is left empty, Java treats it as if it were literally `true`, so the loop never has a reason to stop on its own. `for (;;) {}` is therefore a perfectly valid, deliberate way to write an infinite loop in Java — functionally identical to `while (true) {}` — and it is commonly seen in server or event-loop code that is expected to run forever except when a break or return inside the body ends it explicitly.',
      ru: {
        question: 'Что происходит при `for (;;) {}`?',
        options: [
          'Код компилируется и создаёт бесконечный цикл',
          'Ошибка компиляции, так как все три части заголовка обязательны',
          'Цикл выполняется ноль раз',
          'Он ведёт себя точно так же, как do-while',
        ],
        explanation:
          'Все три части заголовка for — инициализация, условие и обновление — независимо необязательны; обязателен только синтаксис двух точек с запятой, разделяющих их. Когда часть с условием оставлена пустой, Java трактует это так, будто там буквально стоит `true`, поэтому у цикла нет собственной причины остановиться. `for (;;) {}` — это совершенно допустимый, осознанный способ написать бесконечный цикл в Java — функционально идентичный `while (true) {}` — и он часто встречается в серверном коде или циклах обработки событий, которые должны работать вечно, если только break или return внутри тела явно их не завершат.',
      },
    },
    {
      q: 'Which two statements about the `continue` statement are true? (Choose two)',
      options: [
        'continue skips the remaining statements in the current iteration and proceeds to the next iteration check',
        'continue immediately terminates the loop entirely',
        'A labeled continue can target an outer loop from within a nested loop',
        'continue is only valid inside a switch statement',
      ],
      correct: [0, 2],
      explanation:
        'continue always skips the rest of the current loop iteration and jumps to the loop\'s condition check (in a for loop, this also means the update clause still runs first) — it does not exit the loop, that is what break does instead. Like break, continue also supports a label: `continue outer;` from inside a nested loop skips the rest of the current iteration of the outer, labeled loop specifically, not just the innermost one. continue has nothing to do with switch statements — it is exclusively a loop-control statement, valid inside for, while, and do-while.',
      ru: {
        question: 'Какие два утверждения про оператор `continue` верны? (Выберите два)',
        options: [
          'continue пропускает оставшиеся операторы текущей итерации и переходит к проверке следующей итерации',
          'continue немедленно полностью завершает цикл',
          'continue с меткой может воздействовать на внешний цикл из вложенного цикла',
          'continue допустим только внутри оператора switch',
        ],
        explanation:
          'continue всегда пропускает оставшуюся часть текущей итерации цикла и переходит к проверке условия цикла (в цикле for это также означает, что сначала всё равно выполнится часть обновления) — он не завершает цикл, для этого служит break. Как и break, continue тоже поддерживает метку: `continue outer;` из вложенного цикла пропускает оставшуюся часть текущей итерации именно внешнего помеченного цикла, а не самого внутреннего. continue никак не связан с switch — это исключительно оператор управления циклом, допустимый внутри for, while и do-while.',
      },
    },
  ],
  'methods-encapsulation': [
    {
      q: 'What does method overloading mean?',
      options: [
        'Multiple methods in the same class share a name but differ in parameter list',
        'A subclass provides a new implementation of a superclass method with the same signature',
        'Declaring a method as private',
        'Declaring more than one constructor',
      ],
      correct: [0],
      explanation:
        'Overloading lets a class declare several methods that share the same name as long as their parameter lists differ — in number of parameters, in parameter types, or both (return type alone is not enough to distinguish overloads). The compiler picks which overload to call at compile time by matching the arguments in the call against the available signatures, preferring the most specific exact match before falling back to widening conversions or autoboxing. This is a completely different mechanism from overriding, which is option two here: overriding happens between a superclass and subclass with an identical signature, resolved dynamically at runtime rather than by argument matching at compile time.',
      ru: {
        question: 'Что означает перегрузка методов (overloading)?',
        options: [
          'Несколько методов в одном классе имеют одинаковое имя, но разный список параметров',
          'Подкласс предоставляет новую реализацию метода суперкласса с той же сигнатурой',
          'Объявление метода как private',
          'Объявление нескольких конструкторов',
        ],
        explanation:
          'Перегрузка позволяет классу объявить несколько методов с одинаковым именем, при условии, что их списки параметров различаются — по количеству параметров, по их типам, или и тем и другим (одного лишь возвращаемого типа недостаточно, чтобы отличить перегрузки друг от друга). Компилятор выбирает, какую перегрузку вызвать, на этапе компиляции, сопоставляя аргументы вызова с доступными сигнатурами, предпочитая наиболее точное совпадение прежде чем прибегать к расширяющим преобразованиям или автоупаковке. Это совершенно другой механизм по сравнению с переопределением (второй вариант ответа): переопределение происходит между суперклассом и подклассом с идентичной сигнатурой и разрешается динамически во время выполнения, а не по сопоставлению аргументов на этапе компиляции.',
      },
    },
    {
      q: 'Which access modifier restricts a member to only the declaring class?',
      options: ['private', 'protected', 'public', 'default (package-private)'],
      correct: [0],
      explanation:
        'Java\'s four access levels form a strict hierarchy of visibility, from narrowest to widest: private (visible only inside the exact class it is declared in — not even subclasses can see it), default/package-private (visible to any class in the same package, used when no modifier is written), protected (default visibility plus visible to subclasses even in other packages), and public (visible everywhere). private is the tightest of the four, which is exactly why it is the standard choice for internal fields in encapsulation — it guarantees the only code that can touch the field is code inside that one class, including its own getters and setters.',
      ru: {
        question: 'Какой модификатор доступа ограничивает доступ к члену класса только объявляющим его классом?',
        options: ['private', 'protected', 'public', 'default (package-private)'],
        explanation:
          'Четыре уровня доступа в Java образуют строгую иерархию видимости, от самой узкой к самой широкой: private (виден только внутри того самого класса, где объявлен, — его не видят даже подклассы), default/package-private (виден любому классу в том же пакете, применяется, когда модификатор не указан), protected (видимость default плюс видимость подклассам даже в других пакетах) и public (виден отовсюду). private — самый строгий из четырёх, именно поэтому он стандартный выбор для внутренних полей в инкапсуляции — он гарантирует, что единственный код, способный обратиться к полю, находится внутри этого же одного класса, включая его собственные геттеры и сеттеры.',
      },
    },
    {
      q: 'How is encapsulation typically achieved in Java?',
      options: [
        'Private fields exposed through public getter/setter methods',
        'Public fields with no accessor methods',
        'Static fields only',
        'Declaring the class final',
      ],
      correct: [0],
      explanation:
        'Encapsulation is the practice of hiding an object\'s internal state so outside code can only interact with it through a controlled, deliberate interface. The standard Java idiom is: declare fields private so nothing outside the class can read or write them directly, then expose public getXxx()/setXxx() methods that mediate access — a setter can validate a new value before accepting it (rejecting a negative age, for example), and a getter can even compute a value on the fly instead of just returning a stored field. This lets the internal representation change freely later without breaking any code outside the class, since only the method signatures matter to callers, not the private implementation behind them.',
      ru: {
        question: 'Как инкапсуляция обычно реализуется в Java?',
        options: [
          'Приватные поля, доступ к которым предоставляется через публичные методы-геттеры/сеттеры',
          'Публичные поля без методов доступа',
          'Только статические поля',
          'Объявление класса как final',
        ],
        explanation:
          'Инкапсуляция — это практика скрытия внутреннего состояния объекта, чтобы внешний код мог взаимодействовать с ним только через контролируемый, продуманный интерфейс. Стандартная идиома в Java: объявить поля private, чтобы ничто снаружи класса не могло читать или писать их напрямую, а затем предоставить публичные методы getXxx()/setXxx(), опосредующие доступ — сеттер может проверить новое значение перед принятием (например, отклонить отрицательный возраст), а геттер может даже вычислять значение "на лету", а не просто возвращать хранимое поле. Это позволяет позже свободно менять внутреннее представление, не ломая код за пределами класса, поскольку вызывающему коду важны только сигнатуры методов, а не приватная реализация за ними.',
      },
    },
    {
      q: 'Which of these is a valid overload of `public int add(int a, int b)`?',
      options: [
        'public int add(int a, int b, int c)',
        'public int add(int x, int y)',
        'public void add(int a, int b)',
        'public static int add(int a, int b)',
      ],
      correct: [0],
      explanation:
        'A valid overload must differ in its parameter list — the number of parameters and/or their types — from every other method sharing that name in the class. `add(int a, int b, int c)` has three parameters instead of two, which is a genuinely different signature, so it compiles fine alongside the original. The other three options all keep the identical parameter list `(int, int)`: renaming parameters to x and y changes nothing the compiler cares about (parameter names are not part of a signature at all), and changing only the return type (to void) or only adding static do not create a new signature either — Java explicitly forbids two methods with the same name and same parameter types differing only in return type or static-ness, because the compiler could not tell them apart at a call site.',
      ru: {
        question: 'Какой вариант является допустимой перегрузкой метода `public int add(int a, int b)`?',
        options: [
          'public int add(int a, int b, int c)',
          'public int add(int x, int y)',
          'public void add(int a, int b)',
          'public static int add(int a, int b)',
        ],
        explanation:
          'Допустимая перегрузка обязана отличаться списком параметров — количеством и/или типами — от любого другого метода с тем же именем в классе. `add(int a, int b, int c)` имеет три параметра вместо двух, это по-настоящему другая сигнатура, поэтому она прекрасно компилируется рядом с оригиналом. Остальные три варианта сохраняют идентичный список параметров `(int, int)`: переименование параметров в x и y ничего не меняет с точки зрения компилятора (имена параметров вообще не входят в сигнатуру), а изменение только возвращаемого типа (на void) или добавление только static тоже не создаёт новую сигнатуру — Java прямо запрещает два метода с одинаковым именем и одинаковыми типами параметров, отличающихся лишь возвращаемым типом или наличием static, потому что компилятор не смог бы различить их в месте вызова.',
      },
    },
    {
      q: 'What does the `this` keyword refer to inside an instance method?',
      options: ['The current instance of the class', 'The superclass instance', 'A static reference to the class', "The calling method's local variables"],
      correct: [0],
      explanation:
        'this is an implicit reference automatically available inside every non-static (instance) method and constructor, always pointing to the specific object the method was invoked on — the receiver of the call. It is most commonly used to disambiguate a field from a same-named parameter (`this.name = name;` inside a constructor), to pass the current object as an argument to another method, or to call another constructor of the same class (`this(...)`, constructor chaining). Because this refers to a specific instance, it makes no sense inside a static method — static methods belong to the class itself rather than to any particular object, so there is no "current instance" for this to point to, and using it there is a compile error.',
      ru: {
        question: 'На что ссылается ключевое слово `this` внутри метода экземпляра?',
        options: ['На текущий экземпляр класса', 'На экземпляр суперкласса', 'На статическую ссылку на класс', 'На локальные переменные вызывающего метода'],
        explanation:
          'this — это неявная ссылка, автоматически доступная внутри каждого нестатического метода (метода экземпляра) и конструктора, всегда указывающая на конкретный объект, у которого был вызван метод, — получателя вызова. Чаще всего он используется, чтобы отличить поле от одноимённого параметра (`this.name = name;` внутри конструктора), передать текущий объект как аргумент другому методу, или вызвать другой конструктор того же класса (`this(...)`, цепочка конструкторов). Поскольку this ссылается на конкретный экземпляр, внутри статического метода он не имеет смысла — статические методы принадлежат самому классу, а не какому-то конкретному объекту, поэтому там нет "текущего экземпляра", на который мог бы указывать this, и его использование там — ошибка компиляции.',
      },
    },
    {
      q: 'Which statement about constructors is true?',
      options: [
        'A constructor has no return type (not even void), and its name matches the class name',
        'Constructors must be declared public',
        'A class can have only one constructor',
        'Constructors are inherited by subclasses',
      ],
      correct: [0],
      explanation:
        'A constructor is syntactically distinct from every ordinary method in two ways: it has exactly the same name as its class, and it declares no return type at all — not even void, which would actually make it look like a regular method that happens to share the class name. Constructors can carry any access modifier, including private (a common technique to prevent outside instantiation, as in a Singleton), so public is not required. A class is free to declare several overloaded constructors with different parameter lists, and finally, constructors are never inherited — a subclass gets its own constructors and must explicitly call a superclass constructor (via an implicit or explicit `super(...)`) rather than "reusing" the parent\'s constructor directly.',
      ru: {
        question: 'Какое утверждение о конструкторах верно?',
        options: [
          'У конструктора нет возвращаемого типа (даже void), и его имя совпадает с именем класса',
          'Конструкторы обязательно должны быть объявлены как public',
          'У класса может быть только один конструктор',
          'Конструкторы наследуются подклассами',
        ],
        explanation:
          'Конструктор синтаксически отличается от обычного метода двумя вещами: его имя в точности совпадает с именем класса, и у него вообще нет возвращаемого типа — даже void, который на самом деле превратил бы его в обычный метод, случайно совпадающий по имени с классом. Конструкторы могут иметь любой модификатор доступа, включая private (распространённый приём для запрета создания извне, как в паттерне Singleton), поэтому public не обязателен. Класс может объявить несколько перегруженных конструкторов с разными списками параметров, и наконец, конструкторы никогда не наследуются — у подкласса свои собственные конструкторы, и он обязан явно вызвать конструктор суперкласса (через неявный или явный `super(...)`), а не "переиспользовать" родительский конструктор напрямую.',
      },
    },
    {
      q: 'Which two are benefits of encapsulation? (Choose two)',
      options: [
        'It hides internal implementation details from external code',
        'It guarantees the program will run faster',
        'It allows the internal representation to change without breaking external callers',
        'It automatically prevents all runtime exceptions',
      ],
      correct: [0, 2],
      explanation:
        'Encapsulation\'s value is entirely about managing complexity and change, not performance or safety guarantees. By hiding a class\'s internals behind private fields and a public method interface, external code is forced to depend only on that stable interface rather than on implementation details that might change — which is exactly why the class\'s internal representation (which fields exist, how a value is computed or stored) can be reworked later without breaking any code that only ever called the public getters/setters. It has no effect on runtime speed, and it certainly does not prevent exceptions; a badly written setter can still throw or accept bad data just as easily as a public field could.',
      ru: {
        question: 'Какие две выгоды даёт инкапсуляция? (Выберите два)',
        options: [
          'Она скрывает детали внутренней реализации от внешнего кода',
          'Она гарантирует, что программа будет работать быстрее',
          'Она позволяет менять внутреннее представление, не ломая внешний код',
          'Она автоматически предотвращает все исключения времени выполнения',
        ],
        explanation:
          'Ценность инкапсуляции целиком связана с управлением сложностью и изменениями, а не с производительностью или гарантиями безопасности. Скрывая внутренности класса за приватными полями и публичным интерфейсом методов, внешний код вынужден зависеть только от этого стабильного интерфейса, а не от деталей реализации, которые могут измениться, — именно поэтому внутреннее представление класса (какие поля существуют, как вычисляется или хранится значение) можно позже переработать, не ломая код, который вызывал только публичные геттеры/сеттеры. Она никак не влияет на скорость выполнения и уж точно не предотвращает исключения — плохо написанный сеттер всё так же может выбросить исключение или принять некорректные данные, как и публичное поле.',
      },
    },
  ],
  inheritance: [
    {
      q: 'Which keyword allows a class to inherit from another class?',
      options: ['extends', 'implements', 'inherits', 'super'],
      correct: [0],
      explanation:
        'extends is the keyword used both for class-to-class inheritance (`class Dog extends Animal`) and for interface-to-interface inheritance (`interface A extends B`); implements is reserved specifically for a class declaring that it fulfills an interface\'s contract. There is no "inherits" keyword in Java at all. super is a related but different keyword — it is used inside a subclass to explicitly refer to members of its immediate superclass (super.method(), super.field, or super(...) to call a superclass constructor), not to establish the inheritance relationship itself, which extends already does at the class declaration level.',
      ru: {
        question: 'Какое ключевое слово позволяет классу наследоваться от другого класса?',
        options: ['extends', 'implements', 'inherits', 'super'],
        explanation:
          'extends используется как для наследования класса от класса (`class Dog extends Animal`), так и для наследования интерфейса от интерфейса (`interface A extends B`); implements зарезервирован специально для класса, объявляющего, что он выполняет контракт интерфейса. Ключевого слова "inherits" в Java вообще не существует. super — связанное, но другое ключевое слово: оно используется внутри подкласса, чтобы явно обратиться к членам его непосредственного суперкласса (super.method(), super.field, или super(...) для вызова конструктора суперкласса), а не для установления самого отношения наследования, которое уже задаёт extends на уровне объявления класса.',
      },
    },
    {
      q: 'Can a Java class extend more than one class?',
      options: ['No, Java supports only single inheritance for classes', 'Yes, using commas', 'Yes, but only with abstract classes', 'Yes, up to three classes'],
      correct: [0],
      explanation:
        'Java deliberately restricts a class to extending exactly one direct superclass — this is called single inheritance, and it exists specifically to avoid the "diamond problem" that multiple class inheritance can create in other languages, where a class inheriting state or conflicting method implementations from two parents leads to ambiguity about which parent "wins." Java sidesteps that entirely by allowing only one extends target, no matter whether the parent classes are concrete or abstract. Multiple inheritance of behavior is still achievable in Java, but only through interfaces: a class can implement any number of interfaces (`class C implements X, Y, Z`), because interfaces (traditionally) carry no instance state, which is what makes the diamond problem dangerous in the first place.',
      ru: {
        question: 'Может ли класс Java наследоваться сразу от нескольких классов?',
        options: ['Нет, Java поддерживает только單ное наследование классов', 'Да, через запятую', 'Да, но только от абстрактных классов', 'Да, до трёх классов'],
        explanation:
          'Java намеренно ограничивает класс наследованием ровно от одного прямого суперкласса — это называется одиночным наследованием, и существует специально, чтобы избежать "проблемы ромба", которую множественное наследование классов создаёт в других языках, где класс, унаследовавший состояние или конфликтующие реализации методов от двух родителей, приводит к неоднозначности, чей вариант "побеждает". Java полностью обходит эту проблему, разрешая только одну цель extends, независимо от того, конкретные родительские классы или абстрактные. Множественное наследование поведения в Java всё же достижимо, но только через интерфейсы: класс может реализовывать любое количество интерфейсов (`class C implements X, Y, Z`), потому что интерфейсы (традиционно) не несут состояния экземпляра — а именно это и делает проблему ромба опасной в первую очередь.',
      },
    },
    {
      q: 'What does `super(...)` do when it is the first statement in a subclass constructor?',
      options: [
        "Invokes a constructor of the immediate superclass",
        'Invokes a static method of the superclass',
        'Creates a brand-new instance of the superclass',
        'Casts the current object to the superclass type',
      ],
      correct: [0],
      explanation:
        'Every constructor call in Java implicitly chains to a superclass constructor before running its own body, because a subclass object needs its inherited (superclass) state fully initialized before its own fields are set up. `super(...)` makes that chain explicit and lets you choose which overloaded superclass constructor to invoke and with what arguments; if you omit it entirely, the compiler silently inserts a call to the superclass\'s no-argument constructor for you (and if the superclass has no no-arg constructor available, that omission becomes a compile error). super(...) must be the very first statement in a constructor precisely because the superclass portion of the object has to exist before anything else in the subclass constructor can safely run.',
      ru: {
        question: 'Что делает `super(...)`, если это первый оператор в конструкторе подкласса?',
        options: [
          'Вызывает конструктор непосредственного суперкласса',
          'Вызывает статический метод суперкласса',
          'Создаёт совершенно новый экземпляр суперкласса',
          'Приводит текущий объект к типу суперкласса',
        ],
        explanation:
          'Каждый вызов конструктора в Java неявно связывается цепочкой с конструктором суперкласса перед выполнением собственного тела, потому что объекту подкласса нужно, чтобы унаследованное (от суперкласса) состояние было полностью инициализировано, прежде чем настраиваются его собственные поля. `super(...)` делает эту цепочку явной и позволяет выбрать, какой перегруженный конструктор суперкласса вызвать и с какими аргументами; если его вообще опустить, компилятор молча вставит вызов конструктора суперкласса без аргументов за вас (а если у суперкласса нет доступного конструктора без аргументов, это упущение станет ошибкой компиляции). super(...) обязан быть самым первым оператором в конструкторе именно потому, что часть объекта, относящаяся к суперклассу, должна существовать прежде, чем что-либо ещё в конструкторе подкласса сможет безопасно выполниться.',
      },
    },
    {
      q: 'Which statement about abstract classes is true?',
      options: [
        'They cannot be instantiated directly and may mix abstract and concrete methods',
        'They cannot declare constructors',
        'All of their methods must be abstract',
        'They cannot be extended by other classes',
      ],
      correct: [0],
      explanation:
        'An abstract class is essentially a partial blueprint: it can contain fully implemented ("concrete") methods and fields exactly like an ordinary class, plus zero or more abstract methods — method signatures with no body at all, which any concrete subclass is then obligated to implement. Because it is by definition incomplete (it might have unimplemented abstract methods), the language forbids creating an instance of it directly with new — you can only instantiate a concrete subclass that has filled in all the abstract methods. Abstract classes absolutely can (and often do) declare constructors, which run when a subclass is instantiated via the usual super() chaining, and being extendable by subclasses is in fact the entire point of an abstract class\'s existence.',
      ru: {
        question: 'Какое утверждение об абстрактных классах верно?',
        options: [
          'Их нельзя создать напрямую, и они могут сочетать абстрактные и обычные методы',
          'Они не могут объявлять конструкторы',
          'Все их методы обязательно должны быть абстрактными',
          'Их нельзя расширять другими классами',
        ],
        explanation:
          'Абстрактный класс по сути является частичным чертежом: он может содержать полностью реализованные ("конкретные") методы и поля точно так же, как обычный класс, плюс ноль или более абстрактных методов — сигнатур методов вообще без тела, реализовать которые обязан любой конкретный подкласс. Поскольку он по определению неполон (у него могут быть нереализованные абстрактные методы), язык запрещает создавать его экземпляр напрямую через new — можно инстанцировать только конкретный подкласс, заполнивший все абстрактные методы. Абстрактные классы вполне могут (и часто действительно) объявлять конструкторы, которые выполняются при создании подкласса через обычную цепочку super(), а возможность расширения подклассами — вообще весь смысл существования абстрактного класса.',
      },
    },
    {
      q: 'What does polymorphism mean in the context of method overriding?',
      options: [
        "A subclass reference invoked through a superclass-typed variable calls the subclass's overridden method at runtime",
        'Two methods with the same name but different parameters in one class',
        'The ability of a class to have multiple constructors',
        'A private method being called from a subclass',
      ],
      correct: [0],
      explanation:
        'Runtime polymorphism (also called dynamic method dispatch) is the JVM behavior where the method that actually executes for an instance-method call is determined by the object\'s real, concrete runtime type — not by the declared (static/compile-time) type of the reference variable used to call it. So if a variable is declared as the superclass type but actually holds a subclass instance, calling an overridden method on that variable runs the subclass\'s version, because at runtime the JVM looks up the method in the object\'s actual class first. This is exactly what lets a single line of code like `for (Shape s : shapes) { s.draw(); }` correctly call Circle.draw(), Square.draw(), or Triangle.draw() depending on each element\'s real type, without the loop needing to know which subclass it is dealing with.',
      ru: {
        question: 'Что означает полиморфизм в контексте переопределения методов?',
        options: [
          'Объект подкласса, вызванный через переменную типа суперкласса, во время выполнения вызывает переопределённый метод подкласса',
          'Два метода с одинаковым именем, но разными параметрами в одном классе',
          'Способность класса иметь несколько конструкторов',
          'Вызов приватного метода из подкласса',
        ],
        explanation:
          'Полиморфизм времени выполнения (также называемый динамической диспетчеризацией методов) — это поведение JVM, при котором метод, реально выполняющийся при вызове метода экземпляра, определяется настоящим, конкретным типом объекта во время выполнения, а не объявленным (статическим, времени компиляции) типом переменной-ссылки, через которую он вызван. Поэтому если переменная объявлена как тип суперкласса, но на самом деле хранит экземпляр подкласса, вызов переопределённого метода через эту переменную выполнит версию подкласса, потому что во время выполнения JVM сначала ищет метод в реальном классе объекта. Именно это позволяет одной строке кода вроде `for (Shape s : shapes) { s.draw(); }` корректно вызывать Circle.draw(), Square.draw() или Triangle.draw() в зависимости от реального типа каждого элемента, без того чтобы цикл знал, с каким именно подклассом он имеет дело.',
      },
    },
    {
      q: 'Which rule about method overriding is correct?',
      options: [
        'The overriding method cannot use a more restrictive access modifier than the overridden one',
        'The overriding method must declare a different parameter list',
        'The overriding method may throw new checked exceptions not declared by the superclass version',
        'Static methods can be overridden the same way instance methods are',
      ],
      correct: [0],
      explanation:
        'Overriding is governed by a strict contract meant to guarantee that a subclass object can always be safely substituted anywhere the superclass type is expected (the Liskov Substitution Principle). Part of that contract is that visibility can only stay the same or widen, never narrow — a public method cannot be overridden as protected or private, because code holding a superclass reference and relying on being able to call that public method must still be able to call it on any subclass instance. The overriding method must keep the exact same parameter list (a different one would make it an overload, not an override) and may not add new checked exceptions beyond what the superclass version declared, since callers written against the superclass signature are not prepared to handle exceptions the original method never promised. Finally, static methods are resolved by the reference\'s compile-time type, not the object\'s runtime type, so a subclass\'s static method with the same signature merely "hides" the superclass one rather than overriding it polymorphically.',
      ru: {
        question: 'Какое правило переопределения методов верно?',
        options: [
          'Переопределяющий метод не может иметь более строгий модификатор доступа, чем переопределяемый',
          'Переопределяющий метод обязан объявлять другой список параметров',
          'Переопределяющий метод может выбрасывать новые проверяемые исключения, не объявленные в версии суперкласса',
          'Статические методы переопределяются точно так же, как методы экземпляра',
        ],
        explanation:
          'Переопределение подчиняется строгому контракту, призванному гарантировать, что объект подкласса всегда можно безопасно подставить туда, где ожидается тип суперкласса (принцип подстановки Барбары Лисков). Часть этого контракта — видимость может только оставаться такой же или расширяться, но никогда не сужаться: public-метод нельзя переопределить как protected или private, потому что код, держащий ссылку на суперкласс и рассчитывающий на возможность вызвать этот public-метод, должен по-прежнему иметь возможность вызвать его у любого экземпляра подкласса. Переопределяющий метод обязан сохранять точно такой же список параметров (другой список сделал бы его перегрузкой, а не переопределением) и не может добавлять новые проверяемые исключения сверх объявленных версией суперкласса, поскольку вызывающий код, написанный под сигнатуру суперкласса, не готов обрабатывать исключения, которые исходный метод никогда не обещал. Наконец, статические методы разрешаются по типу ссылки во время компиляции, а не по типу объекта во время выполнения, поэтому статический метод подкласса с той же сигнатурой лишь "скрывает" метод суперкласса, а не переопределяет его полиморфно.',
      },
    },
    {
      q: 'Which two statements about method overriding are true? (Choose two)',
      options: [
        'The overriding method must have the same parameter list as the overridden method',
        'The overriding method can have a broader checked-exception list than the overridden method',
        "The overriding method's return type must be identical or a covariant subtype",
        'A subclass can override a private method of its superclass',
      ],
      correct: [0, 2],
      explanation:
        'A genuine override requires an identical parameter list — that is what ties it to the specific superclass method it is overriding rather than making it a separate overload. The return type must either match exactly or be a covariant subtype of the original return type (a rule relaxed in Java 5 specifically to allow, for example, a Dog getPet() override of an Animal getPet() superclass method). Checked exceptions can only stay the same or shrink in an override, never grow, since code calling through the superclass reference is only prepared to catch what the superclass method declared. And private methods are not inherited at all, so a subclass cannot see or override them — a same-named method in the subclass is simply an unrelated new method, not an override.',
      ru: {
        question: 'Какие два утверждения о переопределении методов верны? (Выберите два)',
        options: [
          'Переопределяющий метод обязан иметь тот же список параметров, что и переопределяемый',
          'Переопределяющий метод может иметь более широкий список проверяемых исключений, чем переопределяемый',
          'Возвращаемый тип переопределяющего метода должен быть идентичен или быть ковариантным подтипом',
          'Подкласс может переопределить приватный метод своего суперкласса',
        ],
        explanation:
          'Настоящее переопределение требует идентичного списка параметров — именно это связывает его с конкретным методом суперкласса, который он переопределяет, а не превращает в отдельную перегрузку. Возвращаемый тип должен либо совпадать точно, либо быть ковариантным подтипом исходного (правило смягчено в Java 5 специально, чтобы разрешить, например, переопределение Dog getPet() метода Animal getPet() суперкласса). Проверяемые исключения в переопределении могут только оставаться теми же или сокращаться, но никогда не расширяться, поскольку код, вызывающий через ссылку на суперкласс, готов ловить только то, что объявил метод суперкласса. А приватные методы вообще не наследуются, поэтому подкласс не может их видеть или переопределять — одноимённый метод в подклассе — это просто отдельный, не связанный новый метод, а не переопределение.',
      },
    },
  ],
  exceptions: [
    {
      q: 'When catching both IOException and its subclass FileNotFoundException, what order must the catch blocks be in?',
      options: [
        'FileNotFoundException must be caught before IOException',
        'IOException must be caught before FileNotFoundException',
        'Order does not matter',
        'Only one catch block is allowed per try',
      ],
      correct: [0],
      explanation:
        'When a try block has multiple catch clauses, Java evaluates them top to bottom and uses the very first one whose exception type matches (including matching a supertype of the thrown exception). Because FileNotFoundException is a subclass of IOException, a catch (IOException e) block placed first would catch every FileNotFoundException too, silently swallowing it as a plain IOException and making the more specific catch block beneath it permanently unreachable — the compiler actually detects this and refuses to compile it as "exception has already been caught." The fix, and the general rule, is to always order catch blocks from most specific subclass to least specific superclass.',
      ru: {
        question: 'При отлове одновременно IOException и его подкласса FileNotFoundException, в каком порядке должны идти блоки catch?',
        options: [
          'FileNotFoundException должен ловиться раньше IOException',
          'IOException должен ловиться раньше FileNotFoundException',
          'Порядок не важен',
          'В одном try допустим только один блок catch',
        ],
        explanation:
          'Когда у try несколько блоков catch, Java просматривает их сверху вниз и использует самый первый, чей тип исключения подходит (включая совпадение с супертипом брошенного исключения). Поскольку FileNotFoundException — подкласс IOException, блок catch (IOException e), стоящий первым, поймает и любой FileNotFoundException тоже, молча "проглотив" его как обычный IOException и сделав более специфичный блок catch ниже навсегда недостижимым — компилятор действительно это обнаруживает и отказывается компилировать код с сообщением "исключение уже было поймано". Решение, и общее правило, — всегда располагать блоки catch от самого специфичного подкласса к наименее специфичному суперклассу.',
      },
    },
    {
      q: 'What is a checked exception?',
      options: [
        'An exception that must be caught or declared with throws, enforced at compile time',
        'Any subclass of RuntimeException',
        'Any subclass of Error',
        'An exception thrown only by the JVM itself',
      ],
      correct: [0],
      explanation:
        'Java exceptions split into two enforcement categories. Checked exceptions are every subclass of Exception except RuntimeException and its subclasses — the compiler forces any code that might throw one to either catch it in a try/catch or explicitly declare it in the method\'s throws clause, on the theory that these represent recoverable, expected failure conditions (a missing file, a network timeout) that calling code should be forced to consciously handle. Unchecked exceptions are RuntimeException and its subclasses (like NullPointerException or ArrayIndexOutOfBoundsException) plus Error and its subclasses — the compiler places no such requirement on them, generally because they represent programming bugs or unrecoverable JVM-level problems rather than conditions a caller can meaningfully plan for.',
      ru: {
        question: 'Что такое проверяемое (checked) исключение?',
        options: [
          'Исключение, которое обязательно нужно поймать или объявить через throws — это проверяется на этапе компиляции',
          'Любой подкласс RuntimeException',
          'Любой подкласс Error',
          'Исключение, которое выбрасывает только сама JVM',
        ],
        explanation:
          'Исключения в Java делятся на две категории с точки зрения принудительной проверки. Проверяемые исключения — это любой подкласс Exception, кроме RuntimeException и его подклассов — компилятор заставляет любой код, способный его выбросить, либо поймать его через try/catch, либо явно объявить в предложении throws метода, исходя из идеи, что они представляют восстановимые, ожидаемые сбои (отсутствующий файл, сетевой таймаут), которые вызывающий код обязан осознанно обработать. Непроверяемые исключения — это RuntimeException и его подклассы (например, NullPointerException или ArrayIndexOutOfBoundsException), плюс Error и его подклассы — компилятор не предъявляет к ним такого требования, обычно потому что они представляют ошибки программирования или невосстановимые проблемы уровня JVM, а не условия, которые вызывающий код может осмысленно предусмотреть.',
      },
    },
    {
      q: 'If the try block contains a return statement, what happens to the finally block?',
      options: [
        'It still executes before the method actually returns to the caller',
        'It is skipped entirely',
        'It executes after the method has already returned',
        'This causes a compilation error',
      ],
      correct: [0],
      explanation:
        'finally is guaranteed to run whenever control leaves its associated try (or catch) block, by essentially any means — normal completion, an exception propagating out, or, as here, a return statement. What actually happens is that Java evaluates and "remembers" the return value from the try block, then executes the entire finally block, and only after finally finishes does the method actually hand that remembered value back to the caller. This guarantee is exactly why finally is the standard place to put mandatory cleanup code (closing a resource, releasing a lock) that absolutely must run no matter how the try block exits — and it is also why a return (or an exception) thrown from inside finally itself is dangerous, since it would silently discard the try block\'s original return value.',
      ru: {
        question: 'Если блок try содержит оператор return, что происходит с блоком finally?',
        options: [
          'Он всё равно выполняется до фактического возврата из метода вызывающему коду',
          'Он полностью пропускается',
          'Он выполняется уже после того, как метод вернул значение',
          'Это вызывает ошибку компиляции',
        ],
        explanation:
          'finally гарантированно выполняется всегда, когда управление покидает связанный с ним блок try (или catch), практически любым способом — нормальное завершение, распространяющееся наружу исключение, или, как здесь, оператор return. На самом деле происходит следующее: Java вычисляет и "запоминает" возвращаемое значение из блока try, затем выполняет весь блок finally целиком, и только после завершения finally метод фактически передаёт это запомненное значение вызывающему коду. Именно эта гарантия делает finally стандартным местом для обязательного кода очистки (закрытие ресурса, освобождение блокировки), который должен выполниться независимо от того, как именно завершается блок try, — и именно поэтому return (или исключение), выброшенный внутри самого finally, опасен: он молча "затирает" исходное возвращаемое значение из try.',
      },
    },
    {
      q: 'Which class is the superclass of both checked and unchecked exceptions?',
      options: ['Throwable', 'Exception', 'RuntimeException', 'Error'],
      correct: [0],
      explanation:
        'Throwable sits at the very root of Java\'s entire exception hierarchy — it is the only type that can legally be passed to `throw` or caught in a `catch` clause. It has exactly two direct subclasses: Exception, which covers conditions a well-written application might reasonably want to catch and recover from (this branch further splits into checked exceptions and its RuntimeException subtree of unchecked exceptions), and Error, which represents serious problems outside normal application control, like OutOfMemoryError or StackOverflowError, that applications are not generally expected to catch. Because both checked exceptions and RuntimeException ultimately descend from Exception, which itself descends from Throwable, Throwable is the common ancestor of literally everything that can be thrown in Java, including Errors.',
      ru: {
        question: 'Какой класс является суперклассом и для проверяемых, и для непроверяемых исключений?',
        options: ['Throwable', 'Exception', 'RuntimeException', 'Error'],
        explanation:
          'Throwable находится в самом корне всей иерархии исключений Java — это единственный тип, который можно легально передать в `throw` или поймать в блоке `catch`. У него ровно два прямых подкласса: Exception, охватывающий условия, которые хорошо написанное приложение вполне может захотеть поймать и восстановиться после них (эта ветвь далее делится на проверяемые исключения и поддерево RuntimeException непроверяемых исключений), и Error, представляющий серьёзные проблемы вне обычного контроля приложения, вроде OutOfMemoryError или StackOverflowError, которые приложения обычно не должны ловить. Поскольку и проверяемые исключения, и RuntimeException в конечном счёте происходят от Exception, который сам происходит от Throwable, Throwable — общий предок буквально всего, что можно выбросить в Java, включая Error.',
      },
    },
    {
      q: 'What must a class implement to be used with try-with-resources?',
      options: ['AutoCloseable (or its subinterface Closeable)', 'Serializable', 'It must be declared final', 'It must have a no-arg constructor'],
      correct: [0],
      explanation:
        'try-with-resources, `try (Resource r = ...) { ... }`, is syntactic sugar that guarantees a resource\'s cleanup method runs automatically, without needing an explicit finally block — but it can only offer that guarantee for types whose contract it understands, which is exactly what the AutoCloseable interface provides: a single close() method the compiler knows to call. Closeable (used by most I/O classes like FileInputStream) is a more specific subinterface of AutoCloseable that narrows close()\'s throws clause to IOException specifically; any class implementing either interface qualifies for try-with-resources. When multiple resources are declared in one try, they are closed automatically in the reverse of their declaration order, and this mechanism has nothing to do with Serializable, finality, or constructor shape.',
      ru: {
        question: 'Что должен реализовывать класс, чтобы использоваться в try-with-resources?',
        options: ['AutoCloseable (или его подынтерфейс Closeable)', 'Serializable', 'Класс должен быть объявлен как final', 'У класса должен быть конструктор без аргументов'],
        explanation:
          'try-with-resources, `try (Resource r = ...) { ... }`, — это синтаксический сахар, гарантирующий автоматический вызов метода очистки ресурса без необходимости в явном блоке finally — но эту гарантию он может дать только для типов, чей контракт ему понятен, а именно это и предоставляет интерфейс AutoCloseable: единственный метод close(), который компилятор знает, как вызвать. Closeable (используется в большинстве I/O-классов вроде FileInputStream) — более специфичный подынтерфейс AutoCloseable, сужающий предложение throws у close() конкретно до IOException; любой класс, реализующий любой из этих интерфейсов, подходит для try-with-resources. Когда в одном try объявлено несколько ресурсов, они автоматически закрываются в порядке, обратном порядку объявления, и этот механизм никак не связан с Serializable, финальностью или формой конструктора.',
      },
    },
    {
      q: 'What happens with `catch (Exception e) { }` placed before `catch (ArithmeticException e) { }`?',
      options: [
        'Compilation error because the ArithmeticException catch becomes unreachable',
        'It compiles, and only the first catch block ever executes',
        'It compiles fine with no issues',
        'A runtime exception occurs when an ArithmeticException is caught',
      ],
      correct: [0],
      explanation:
        'ArithmeticException is a subclass of RuntimeException, which is a subclass of Exception. A catch clause matches any exception that is an instance of its declared type or any subtype of it, so `catch (Exception e)` placed first would already match — and swallow — every ArithmeticException before execution ever reaches the second, more specific catch clause. Rather than silently letting that dead code sit there, the Java compiler specifically detects this "unreachable catch block" situation for checked-exception-style ordering problems and refuses to compile the code at all, forcing you to either remove the redundant specific catch or reorder the clauses (most specific first, most general last) — the same rule as the IOException/FileNotFoundException example seen earlier in this topic.',
      ru: {
        question: 'Что произойдёт, если `catch (Exception e) { }` стоит перед `catch (ArithmeticException e) { }`?',
        options: [
          'Ошибка компиляции, так как блок catch для ArithmeticException становится недостижимым',
          'Код скомпилируется, и будет выполняться только первый блок catch',
          'Код скомпилируется без проблем',
          'При отлове ArithmeticException возникнет исключение времени выполнения',
        ],
        explanation:
          'ArithmeticException — подкласс RuntimeException, который в свою очередь подкласс Exception. Блок catch совпадает с любым исключением, являющимся экземпляром объявленного типа или любого его подтипа, поэтому `catch (Exception e)`, стоящий первым, уже совпадёт — и "проглотит" — с любым ArithmeticException раньше, чем выполнение вообще дойдёт до второго, более специфичного catch. Вместо того чтобы молча оставить этот мёртвый код, компилятор Java специально обнаруживает такую ситуацию "недостижимого блока catch" при проблемах с порядком и вовсе отказывается компилировать код, заставляя либо убрать избыточный специфичный catch, либо переставить блоки местами (сначала самый специфичный, в конце самый общий) — то же правило, что и в примере IOException/FileNotFoundException, рассмотренном ранее в этой теме.',
      },
    },
    {
      q: 'Which two are unchecked (runtime) exceptions? (Choose two)',
      options: ['NullPointerException', 'IOException', 'ArrayIndexOutOfBoundsException', 'SQLException'],
      correct: [0, 2],
      explanation:
        'NullPointerException and ArrayIndexOutOfBoundsException are both direct or indirect subclasses of RuntimeException, which puts them in the unchecked category — the compiler never forces code to catch them or declare them in a throws clause, since they typically indicate a programming bug (dereferencing a null reference, indexing past an array\'s bounds) rather than an expected, recoverable external condition. IOException and SQLException, by contrast, are checked exceptions descending directly from Exception (not RuntimeException) — they represent genuinely expected failure modes (a file that cannot be read, a database connection that drops), and any code calling a method that can throw them must either catch them or declare them, which the compiler will enforce.',
      ru: {
        question: 'Какие два исключения являются непроверяемыми (runtime)? (Выберите два)',
        options: ['NullPointerException', 'IOException', 'ArrayIndexOutOfBoundsException', 'SQLException'],
        explanation:
          'NullPointerException и ArrayIndexOutOfBoundsException — оба прямые или косвенные подклассы RuntimeException, что относит их к непроверяемой категории — компилятор никогда не заставляет код ловить их или объявлять в throws, поскольку они обычно указывают на ошибку программирования (обращение по null-ссылке, выход за границы массива по индексу), а не на ожидаемое, восстановимое внешнее условие. IOException и SQLException, напротив, — проверяемые исключения, происходящие напрямую от Exception (не от RuntimeException) — они представляют по-настоящему ожидаемые сценарии сбоя (файл, который невозможно прочитать, обрыв соединения с базой данных), и любой код, вызывающий метод, способный их выбросить, обязан либо поймать их, либо объявить, что компилятор будет принудительно проверять.',
      },
    },
  ],
  'core-api': [
    {
      q: 'Why is String immutable in Java?',
      options: [
        "Once created, a String's value cannot change; operations like concat return a new String",
        'String objects can be modified in place with setCharAt',
        'Immutable only means the variable reference cannot be reassigned',
        'Strings are immutable only when declared final',
      ],
      correct: [0],
      explanation:
        'Once a String object is constructed, the character data it wraps can never be changed for the lifetime of that object — every method that looks like it "modifies" a String, such as concat(), replace(), toUpperCase(), or substring(), actually leaves the original object completely untouched and returns a brand-new String object containing the result. This is a deliberate design decision (not just "the variable can\'t be reassigned" — that describes final, a different concept entirely) that enables the JVM to safely share String literals through the string pool, makes Strings inherently thread-safe with no synchronization needed, and lets Strings be used safely as HashMap keys since their hash code can be cached once and never becomes stale.',
      ru: {
        question: 'Почему String в Java является неизменяемым (immutable)?',
        options: [
          'После создания значение String изменить нельзя; операции вроде concat возвращают новый объект String',
          'Объекты String можно изменять на месте методом setCharAt',
          'Неизменяемость означает лишь то, что нельзя переприсвоить ссылку переменной',
          'Строки неизменяемы только если объявлены как final',
        ],
        explanation:
          'После создания объекта String символьные данные, которые он оборачивает, никогда не могут измениться на протяжении жизни этого объекта — каждый метод, который выглядит так, будто "изменяет" String, например concat(), replace(), toUpperCase() или substring(), на самом деле оставляет исходный объект полностью нетронутым и возвращает совершенно новый объект String с результатом. Это осознанное архитектурное решение (а не просто "нельзя переприсвоить переменную" — это описывает final, совсем другое понятие), которое позволяет JVM безопасно разделять строковые литералы через пул строк, делает String по своей природе потокобезопасным без всякой синхронизации, и позволяет безопасно использовать String в качестве ключей HashMap, поскольку их хеш-код можно вычислить один раз и закэшировать — он никогда не устареет.',
      },
    },
    {
      q: 'What is printed?\n\nString a = "hello";\nString b = "hello";\nSystem.out.println(a == b);',
      options: ['true', 'false', 'Compilation error', 'NullPointerException'],
      correct: [0],
      explanation:
        'String literals written directly in source code are automatically "interned" by the JVM into a special memory area called the string pool, and the JVM is smart enough to reuse the same pooled object for every occurrence of an identical literal rather than creating duplicates. Since both a and b are initialized from the exact same literal text "hello", they both end up referencing that one shared pooled object, so the == operator — which compares object references, not content — evaluates to true here. This behavior is specific to literals; had either string been built with `new String("hello")`, a fresh, distinct object would be created on the heap outside the pool, and == would then return false even though the characters are identical.',
      ru: {
        question: 'Что будет напечатано?\n\nString a = "hello";\nString b = "hello";\nSystem.out.println(a == b);',
        options: ['true', 'false', 'Ошибка компиляции', 'NullPointerException'],
        explanation:
          'Строковые литералы, записанные прямо в исходном коде, автоматически "интернируются" JVM в специальную область памяти под названием пул строк, и JVM достаточно умна, чтобы переиспользовать один и тот же объект из пула для каждого вхождения идентичного литерала, а не создавать дубликаты. Поскольку и a, и b инициализируются из одного и того же текста литерала "hello", оба они в итоге ссылаются на один общий объект из пула, поэтому оператор == — который сравнивает ссылки на объекты, а не содержимое — здесь даёт true. Это поведение специфично именно для литералов; если бы любая из строк была создана через `new String("hello")`, был бы создан новый, отдельный объект в куче вне пула, и == тогда вернул бы false, даже несмотря на одинаковые символы.',
      },
    },
    {
      q: 'What advantage does StringBuilder offer over String?',
      options: [
        'A mutable character sequence that can be modified without creating a new object each time',
        'Automatic thread safety',
        'Guaranteed immutability',
        'Faster file reading',
      ],
      correct: [0],
      explanation:
        'StringBuilder maintains an internal, resizable character buffer that its methods (append, insert, delete, reverse, and so on) modify directly, in place — no new object is allocated on every call, unlike String\'s immutable design where every "modification" allocates a fresh object. This matters enormously in a loop that builds up a large string piece by piece: doing that with plain String concatenation (str += piece) creates and immediately discards a new String object on every single iteration, which is quadratic in cost for large inputs, while StringBuilder does the same job with far less allocation overhead. StringBuilder is explicitly not synchronized (that trade-off is intentional, for speed) — its older sibling StringBuffer offers the thread-safe version at a small performance cost — so "automatic thread safety" is actually the wrong advantage to associate with StringBuilder specifically.',
      ru: {
        question: 'Какое преимущество StringBuilder даёт по сравнению со String?',
        options: [
          'Изменяемую последовательность символов, которую можно менять без создания нового объекта каждый раз',
          'Автоматическую потокобезопасность',
          'Гарантированную неизменяемость',
          'Более быстрое чтение файлов',
        ],
        explanation:
          'StringBuilder хранит внутренний, изменяемый по размеру символьный буфер, который его методы (append, insert, delete, reverse и т.д.) изменяют напрямую, на месте — при каждом вызове не выделяется новый объект, в отличие от неизменяемого дизайна String, где каждая "модификация" выделяет новый объект. Это имеет огромное значение в цикле, который собирает большую строку по кусочкам: делать это через обычную конкатенацию String (str += piece) означает создавать и сразу же выбрасывать новый объект String на каждой итерации, что даёт квадратичную стоимость на больших входных данных, тогда как StringBuilder делает ту же работу с гораздо меньшими накладными расходами на выделение памяти. StringBuilder явно не синхронизирован (это осознанный компромисс ради скорости) — его старший "родственник" StringBuffer предлагает потокобезопасную версию ценой небольшой потери производительности — поэтому "автоматическая потокобезопасность" на самом деле неверно ассоциировать именно со StringBuilder.',
      },
    },
    {
      q: 'What does `"Hello".substring(1, 3)` return?',
      options: ['"el"', '"ell"', '"He"', '"Hel"'],
      correct: [0],
      explanation:
        'substring(beginIndex, endIndex) returns the characters starting at beginIndex up to, but explicitly not including, endIndex — the length of the returned substring is always endIndex minus beginIndex. Indexing "Hello" from 0: H=0, e=1, l=2, l=3, o=4. substring(1, 3) starts at index 1 (\'e\') and stops right before index 3, so it includes indices 1 and 2 only — \'e\' and \'l\' — producing "el". This half-open interval convention (inclusive start, exclusive end) is consistent across many Java APIs, not just substring, so it is worth internalizing rather than memorizing per method.',
      ru: {
        question: 'Что вернёт `"Hello".substring(1, 3)`?',
        options: ['"el"', '"ell"', '"He"', '"Hel"'],
        explanation:
          'substring(beginIndex, endIndex) возвращает символы начиная с beginIndex вплоть до, но явно не включая, endIndex — длина возвращаемой подстроки всегда равна endIndex минус beginIndex. Индексация "Hello" с нуля: H=0, e=1, l=2, l=3, o=4. substring(1, 3) начинается с индекса 1 (\'e\') и останавливается прямо перед индексом 3, поэтому включает только индексы 1 и 2 — \'e\' и \'l\' — получается "el". Это соглашение о полуоткрытом интервале (включая начало, исключая конец) действует во многих API Java, не только в substring, поэтому его стоит усвоить как общий принцип, а не запоминать отдельно для каждого метода.',
      },
    },
    {
      q: 'Which method compares String content rather than object references?',
      options: ['equals()', '==', 'hashCode() alone', 'toString()'],
      correct: [0],
      explanation:
        'String overrides Object\'s default equals() implementation to compare the actual sequence of characters two String objects contain, returning true whenever both strings have the same length and identical characters in the same order — regardless of whether they are literally the same object in memory. == always compares references (object identity) for any reference type, String included, and never looks at content, which is exactly why two distinct String objects with identical text can produce == false while equals() correctly reports true. hashCode() alone does not guarantee content equality (different objects could theoretically share a hash code, called a collision), and toString() on a String simply returns the string itself, performing no comparison at all.',
      ru: {
        question: 'Какой метод сравнивает содержимое String, а не ссылки на объекты?',
        options: ['equals()', '==', 'только hashCode()', 'toString()'],
        explanation:
          'String переопределяет реализацию equals() по умолчанию из Object, чтобы сравнивать реальную последовательность символов, которую содержат два объекта String, возвращая true, когда обе строки имеют одинаковую длину и идентичные символы в том же порядке — независимо от того, являются ли они буквально одним и тем же объектом в памяти. == всегда сравнивает ссылки (идентичность объектов) для любого ссылочного типа, включая String, и никогда не смотрит на содержимое, именно поэтому два разных объекта String с одинаковым текстом могут дать == false, тогда как equals() корректно вернёт true. Один лишь hashCode() не гарантирует равенства содержимого (теоретически разные объекты могут иметь одинаковый хеш-код — коллизию), а toString() у String просто возвращает саму строку, вообще не выполняя никакого сравнения.',
      },
    },
    {
      q: 'What is the output?\n\nStringBuilder sb = new StringBuilder("abc");\nsb.append("def").reverse();\nSystem.out.println(sb);',
      options: ['"fedcba"', '"abcdef"', '"cbafed"', '"defabc"'],
      correct: [0],
      explanation:
        'StringBuilder methods are designed to be chained fluently because most of them return `this` (the same StringBuilder instance) after modifying its internal buffer, letting you call another method right on the result. sb.append("def") mutates the buffer from "abc" to "abcdef" and returns the same sb; .reverse() is then called immediately on that result, reversing the entire current buffer "abcdef" character by character into "fedcba". println(sb) implicitly calls sb.toString(), printing the final buffer content, "fedcba" — the important trap here is remembering that reverse() operates on the buffer\'s state *after* the append already happened, not on the original "abc".',
      ru: {
        question: 'Каков результат?\n\nStringBuilder sb = new StringBuilder("abc");\nsb.append("def").reverse();\nSystem.out.println(sb);',
        options: ['"fedcba"', '"abcdef"', '"cbafed"', '"defabc"'],
        explanation:
          'Методы StringBuilder спроектированы для гибкой цепочки вызовов, потому что большинство из них возвращают `this` (тот же экземпляр StringBuilder) после изменения своего внутреннего буфера, позволяя тут же вызвать следующий метод у результата. sb.append("def") изменяет буфер с "abc" на "abcdef" и возвращает тот же sb; .reverse() затем сразу вызывается у этого результата, разворачивая весь текущий буфер "abcdef" посимвольно в "fedcba". println(sb) неявно вызывает sb.toString(), печатая итоговое содержимое буфера — "fedcba". Важная ловушка здесь — не забыть, что reverse() работает с состоянием буфера *после* того, как append уже выполнился, а не с исходным "abc".',
      },
    },
    {
      q: 'Which two statements about String and StringBuilder are true? (Choose two)',
      options: [
        'String objects are immutable; every "modification" produces a new object',
        'StringBuilder is thread-safe by default',
        'StringBuilder is generally more efficient than String for many concatenations in a loop',
        'String literals are stored on the heap outside the string pool',
      ],
      correct: [0, 2],
      explanation:
        'String\'s immutability — every apparent modification actually returns a brand-new object, leaving the original unchanged — is the core fact underlying nearly every other String behavior discussed in this topic, including string-pool interning and safe hashCode caching. Because of that immutability, repeatedly concatenating in a loop with String is expensive (a new object every iteration), which is precisely the performance problem StringBuilder\'s mutable, in-place buffer solves, making it the standard, recommended tool for building up strings incrementally. Thread safety is not part of StringBuilder\'s design at all — that guarantee belongs to its synchronized sibling class StringBuffer — and string literals are placed specifically inside the special string pool area of the heap (interned for reuse), not simply "on the heap outside" of it.',
      ru: {
        question: 'Какие два утверждения про String и StringBuilder верны? (Выберите два)',
        options: [
          'Объекты String неизменяемы; каждая "модификация" создаёт новый объект',
          'StringBuilder потокобезопасен по умолчанию',
          'StringBuilder обычно эффективнее String при множественных конкатенациях в цикле',
          'Строковые литералы хранятся в куче вне пула строк',
        ],
        explanation:
          'Неизменяемость String — каждая внешне видимая "модификация" на самом деле возвращает совершенно новый объект, оставляя исходный без изменений — это ключевой факт, лежащий в основе почти всех остальных особенностей поведения String, рассмотренных в этой теме, включая интернирование в пул строк и безопасное кэширование hashCode. Именно из-за этой неизменяемости многократная конкатенация в цикле через String дорога (новый объект на каждой итерации) — это ровно та проблема производительности, которую решает изменяемый буфер StringBuilder на месте, что делает его стандартным, рекомендуемым инструментом для пошагового построения строк. Потокобезопасность вообще не часть дизайна StringBuilder — эта гарантия принадлежит его синхронизированному "родственнику", классу StringBuffer, — а строковые литералы размещаются именно внутри специальной области пула строк в куче (интернируются для переиспользования), а не просто "в куче вне" него.',
      },
    },
  ],
}

// Additional code-reading (predict-the-output) questions, layered onto the topics above
// to grow the bank closer to real exam length and add more code-based practice.
const extra = {
  'java-basics': [
    {
      q: 'What is printed?\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello".length());\n  }\n}',
      options: ['5', '4', '6', 'Compilation error'],
      correct: [0],
      explanation:
        'String.length() counts the number of UTF-16 code units (characters, for ordinary text) the string contains. "Hello" is composed of five characters — H, e, l, l, o — so length() returns 5. This is a pure counting operation with no off-by-one subtlety like substring has: length() simply reports the total, not an index.',
      ru: {
        question: 'Что будет напечатано?\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello".length());\n  }\n}',
        options: ['5', '4', '6', 'Ошибка компиляции'],
        explanation:
          'String.length() подсчитывает количество единиц кода UTF-16 (символов, для обычного текста) в строке. "Hello" состоит из пяти символов — H, e, l, l, o — поэтому length() возвращает 5. Это чистая операция подсчёта без тонкостей "на единицу", как у substring: length() просто сообщает общее количество, а не индекс.',
      },
    },
    {
      q: 'What is printed?\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(1 + 2 + "3");\n  }\n}',
      options: ['"33"', '"123"', '"6"', 'Compilation error'],
      correct: [0],
      explanation:
        'Java evaluates the + operators left to right, and the meaning of + (arithmetic addition versus String concatenation) is decided independently at each step based on the operand types at that point. 1 + 2 involves two int operands, so it is arithmetic addition, producing the int 3. Then 3 + "3" has a String on the right, which forces + to mean concatenation from that point on, converting the int 3 to the text "3" and joining it with the literal "3" to produce the String "33". Had the expression instead been written as "3" + 1 + 2, the very first + would already be a concatenation, giving "312" — the order operands appear in matters enormously for mixed String/numeric expressions.',
      ru: {
        question: 'Что будет напечатано?\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(1 + 2 + "3");\n  }\n}',
        options: ['"33"', '"123"', '"6"', 'Ошибка компиляции'],
        explanation:
          'Java вычисляет операторы + слева направо, и смысл + (арифметическое сложение или конкатенация строк) определяется независимо на каждом шаге, исходя из типов операндов в этой точке. 1 + 2 — это два операнда int, поэтому это арифметическое сложение, дающее int 3. Затем у 3 + "3" справа стоит String, что заставляет + означать конкатенацию начиная с этого места, преобразуя int 3 в текст "3" и соединяя его с литералом "3", получая строку "33". Если бы выражение было записано как "3" + 1 + 2, самый первый + уже был бы конкатенацией, дав "312" — порядок появления операндов имеет огромное значение для смешанных выражений со String и числами.',
      },
    },
  ],
  'data-types': [
    {
      q: 'What is printed?\n\ndouble d = 5 / 2;\nSystem.out.println(d);',
      options: ['2.0', '2.5', '2', 'Compilation error'],
      correct: [0],
      explanation:
        'The right-hand side `5 / 2` is evaluated entirely first, and both 5 and 2 are int literals, so this is integer division producing the int 2 — the fact that the result will later be assigned to a double variable has no bearing on how the division itself is performed, because Java decides the meaning of an expression from its own operand types, not from the target variable\'s type. Only after that int result of 2 is computed does the assignment to `double d` widen it to 2.0. To actually get a fractional result like 2.5, at least one operand of the division itself needs to already be a floating-point value, for example `5.0 / 2` or `5 / 2.0`.',
      ru: {
        question: 'Что будет напечатано?\n\ndouble d = 5 / 2;\nSystem.out.println(d);',
        options: ['2.0', '2.5', '2', 'Ошибка компиляции'],
        explanation:
          'Правая часть `5 / 2` вычисляется полностью первой, и и 5, и 2 — int-литералы, поэтому это целочисленное деление, дающее int 2 — то, что результат позже будет присвоен переменной double, никак не влияет на то, как выполняется само деление, потому что Java определяет смысл выражения по типам его собственных операндов, а не по типу целевой переменной. Только после того, как вычислен этот целочисленный результат 2, присваивание переменной `double d` расширяет его до 2.0. Чтобы действительно получить дробный результат вроде 2.5, хотя бы один операнд самого деления уже должен быть значением с плавающей точкой, например `5.0 / 2` или `5 / 2.0`.',
      },
    },
  ],
  operators: [
    {
      q: 'What is printed?\n\nint x = 10;\nx += 5 - 2 * 3;\nSystem.out.println(x);',
      options: ['9', '11', '3', '13'],
      correct: [0],
      explanation:
        'Standard operator precedence applies inside the right-hand expression exactly as in ordinary arithmetic: multiplication binds tighter than subtraction, so 2 * 3 is computed first, giving 6, and then 5 - 6 gives -1. x += (-1) is exactly shorthand for x = x + (-1), so x becomes 10 + (-1) = 9. Compound assignment operators like += also implicitly insert a cast to the left-hand variable\'s type, which is not visible here since everything is already int, but is worth knowing as a separate exam-relevant fact about +=.',
      ru: {
        question: 'Что будет напечатано?\n\nint x = 10;\nx += 5 - 2 * 3;\nSystem.out.println(x);',
        options: ['9', '11', '3', '13'],
        explanation:
          'Внутри правой части выражения действует обычный приоритет операторов, точно как в арифметике: умножение выполняется раньше вычитания, поэтому сначала вычисляется 2 * 3, давая 6, а затем 5 - 6 даёт -1. x += (-1) — это ровно сокращение для x = x + (-1), поэтому x становится 10 + (-1) = 9. Составные операторы присваивания вроде += также неявно вставляют приведение к типу переменной слева, что здесь не заметно, так как всё уже int, но это отдельный полезный для экзамена факт о работе +=.',
      },
    },
  ],
  arrays: [
    {
      q: 'What is printed?\n\nint[][] grid = {{1, 2}, {3, 4, 5}};\nSystem.out.println(grid[1].length);',
      options: ['3', '2', '5', 'Compilation error'],
      correct: [0],
      explanation:
        'Because a Java 2D array is really an array of independent array objects, each inner array can have a completely different length from the others — this is called a "jagged" array, and Java places no requirement that rows be uniform in size, unlike a true rectangular matrix in some other languages. grid[0] is {1, 2}, a length-2 array, while grid[1] is {3, 4, 5}, a length-3 array; asking for grid[1].length simply reports the length of that specific inner array, which is 3.',
      ru: {
        question: 'Что будет напечатано?\n\nint[][] grid = {{1, 2}, {3, 4, 5}};\nSystem.out.println(grid[1].length);',
        options: ['3', '2', '5', 'Ошибка компиляции'],
        explanation:
          'Поскольку двумерный массив в Java — это на самом деле массив независимых объектов-массивов, каждый внутренний массив может иметь совершенно другую длину, чем остальные — это называется "рваным" (jagged) массивом, и Java не требует, чтобы строки были одинакового размера, в отличие от настоящей прямоугольной матрицы в некоторых других языках. grid[0] — это {1, 2}, массив длиной 2, а grid[1] — это {3, 4, 5}, массив длиной 3; обращение к grid[1].length просто сообщает длину именно этого внутреннего массива, которая равна 3.',
      },
    },
  ],
  loops: [
    {
      q: 'What is printed?\n\nint count = 0;\nfor (int i = 0; i < 10; i += 2) {\n  count++;\n}\nSystem.out.println(count);',
      options: ['5', '10', '4', '6'],
      correct: [0],
      explanation:
        'The update clause here is `i += 2` rather than the more common `i++`, so i advances by 2 every iteration instead of 1. Tracing the values i takes while the loop condition i < 10 still holds: 0, 2, 4, 6, 8 — five distinct values, each triggering one execution of count++, before i becomes 10 and the condition 10 < 10 fails, ending the loop. count therefore ends at 5, not 10 (the number of integers between 0 and 10) — a reminder to always trace the actual step size rather than assuming it is 1.',
      ru: {
        question: 'Что будет напечатано?\n\nint count = 0;\nfor (int i = 0; i < 10; i += 2) {\n  count++;\n}\nSystem.out.println(count);',
        options: ['5', '10', '4', '6'],
        explanation:
          'Часть обновления здесь — `i += 2`, а не более привычная `i++`, поэтому i увеличивается на 2 каждую итерацию, а не на 1. Прослеживая значения, которые принимает i, пока условие цикла i < 10 ещё выполняется: 0, 2, 4, 6, 8 — пять различных значений, каждое запускает одно выполнение count++, прежде чем i становится 10 и условие 10 < 10 не выполняется, завершая цикл. Итого count равен 5, а не 10 (количеству целых чисел между 0 и 10) — напоминание всегда прослеживать реальный размер шага, а не предполагать, что он равен 1.',
      },
    },
  ],
  'methods-encapsulation': [
    {
      q: 'What is printed?\n\nclass Box {\n  private int val = 5;\n  int getVal() { return val; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Box b = new Box();\n    System.out.println(b.getVal());\n  }\n}',
      options: ['5', '0', 'Compilation error', 'null'],
      correct: [0],
      explanation:
        'val is declared private, so it cannot be accessed directly from outside Box (b.val would be a compile error from Main), but getVal() is declared with default (package-private) access and lives inside Box itself, where private members are always fully visible — a class can always see and use its own private fields, private only restricts access from *other* classes. Since Main is in the same package here, it can call the package-visible getVal() method, which returns the field\'s current value, 5, exactly as initialized at declaration.',
      ru: {
        question: 'Что будет напечатано?\n\nclass Box {\n  private int val = 5;\n  int getVal() { return val; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Box b = new Box();\n    System.out.println(b.getVal());\n  }\n}',
        options: ['5', '0', 'Ошибка компиляции', 'null'],
        explanation:
          'val объявлен как private, поэтому к нему нельзя обратиться напрямую снаружи Box (b.val было бы ошибкой компиляции из Main), но getVal() объявлен с видимостью по умолчанию (package-private) и находится внутри самого Box, где приватные члены всегда полностью видны — класс всегда видит и может использовать свои собственные приватные поля, private ограничивает доступ только из *других* классов. Поскольку Main здесь находится в том же пакете, он может вызвать видимый в пакете метод getVal(), который возвращает текущее значение поля — 5, ровно как при инициализации в объявлении.',
      },
    },
  ],
  inheritance: [
    {
      q: 'What is printed?\n\nclass Animal {\n  String sound() { return "..."; }\n}\nclass Dog extends Animal {\n  String sound() { return "Woof"; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal an = new Dog();\n    System.out.println(an.sound());\n  }\n}',
      options: ['Woof', '...', 'Compilation error', 'null'],
      correct: [0],
      explanation:
        'This is a direct illustration of dynamic method dispatch: even though the variable an is declared with the compile-time type Animal, the object it actually refers to at runtime is a Dog. When sound() is called on an, the JVM looks up which sound() implementation to run based on that real, runtime object type — Dog — not the declared type of the variable, so Dog\'s override ("Woof") runs instead of Animal\'s original implementation ("..."). This is exactly the mechanism that makes polymorphism useful: code can be written entirely in terms of the general Animal type while still getting each specific subclass\'s specialized behavior automatically.',
      ru: {
        question: 'Что будет напечатано?\n\nclass Animal {\n  String sound() { return "..."; }\n}\nclass Dog extends Animal {\n  String sound() { return "Woof"; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal an = new Dog();\n    System.out.println(an.sound());\n  }\n}',
        options: ['Woof', '...', 'Ошибка компиляции', 'null'],
        explanation:
          'Это прямая иллюстрация динамической диспетчеризации методов: хотя переменная an объявлена со статическим типом Animal (тип времени компиляции), объект, на который она реально ссылается во время выполнения, — это Dog. При вызове sound() на an, JVM определяет, какую реализацию sound() выполнить, исходя из реального типа объекта во время выполнения — Dog, — а не объявленного типа переменной, поэтому выполняется переопределение Dog ("Woof"), а не исходная реализация Animal ("..."). Именно этот механизм делает полиморфизм полезным: код можно писать целиком в терминах общего типа Animal, при этом автоматически получая специализированное поведение каждого конкретного подкласса.',
      },
    },
  ],
  exceptions: [
    {
      q: 'What is printed?\n\npublic class Main {\n  public static void main(String[] args) {\n    try {\n      int[] arr = new int[2];\n      arr[5] = 1;\n    } catch (ArrayIndexOutOfBoundsException e) {\n      System.out.println("Caught");\n    } finally {\n      System.out.println("Finally");\n    }\n  }\n}',
      options: [
        '"Caught" then "Finally" (both printed)',
        'Only "Finally" is printed',
        'Only "Caught" is printed',
        'The program crashes without printing anything',
      ],
      correct: [0],
      explanation:
        'arr has length 2, so valid indices are only 0 and 1; writing to arr[5] immediately throws ArrayIndexOutOfBoundsException at runtime. That exception exactly matches the type declared in the catch clause, so control jumps there, printing "Caught" — the exception is now considered handled and does not propagate any further. Regardless of whether the try block completes normally or throws a caught exception, the finally block always executes afterward as the last step before the try/catch/finally construct finishes, printing "Finally" as well; the two lines print in that order, one after the other.',
      ru: {
        question: 'Что будет напечатано?\n\npublic class Main {\n  public static void main(String[] args) {\n    try {\n      int[] arr = new int[2];\n      arr[5] = 1;\n    } catch (ArrayIndexOutOfBoundsException e) {\n      System.out.println("Caught");\n    } finally {\n      System.out.println("Finally");\n    }\n  }\n}',
        options: [
          '"Caught", затем "Finally" (напечатается оба)',
          'Напечатается только "Finally"',
          'Напечатается только "Caught"',
          'Программа завершится, не напечатав ничего',
        ],
        explanation:
          'У arr длина 2, поэтому допустимые индексы — только 0 и 1; запись в arr[5] немедленно выбрасывает ArrayIndexOutOfBoundsException во время выполнения. Это исключение точно совпадает с типом, объявленным в catch, поэтому управление переходит туда, печатая "Caught" — теперь исключение считается обработанным и дальше не распространяется. Независимо от того, завершился ли блок try нормально или выбросил пойманное исключение, блок finally всегда выполняется после этого как последний шаг перед завершением всей конструкции try/catch/finally, также печатая "Finally"; обе строки печатаются именно в таком порядке, одна за другой.',
      },
    },
  ],
  'core-api': [
    {
      q: 'What is printed?\n\nString s = "  Java  ";\nSystem.out.println(s.trim().length());',
      options: ['4', '8', '6', 'Compilation error'],
      correct: [0],
      explanation:
        'trim() returns a new String with any leading and trailing characters whose value is less than or equal to a space (U+0020) removed — in practice, this strips ordinary leading/trailing whitespace. The original string "  Java  " has two leading spaces, the four letters J-a-v-a, and two trailing spaces; trim() removes only the outer whitespace, leaving exactly "Java", whose length() is 4. Because String is immutable, s itself never changes — trim() returns a brand-new String, which .length() is then called on directly in this chained expression.',
      ru: {
        question: 'Что будет напечатано?\n\nString s = "  Java  ";\nSystem.out.println(s.trim().length());',
        options: ['4', '8', '6', 'Ошибка компиляции'],
        explanation:
          'trim() возвращает новую строку, из которой удалены ведущие и завершающие символы со значением меньше или равным пробелу (U+0020) — на практике это убирает обычные ведущие/завершающие пробельные символы. Исходная строка "  Java  " содержит два ведущих пробела, четыре буквы J-a-v-a и два завершающих пробела; trim() убирает только внешние пробелы, оставляя ровно "Java", у которой length() равно 4. Поскольку String неизменяем, сама переменная s никогда не меняется — trim() возвращает совершенно новую строку, у которой в этом цепочном выражении сразу же вызывается .length().',
      },
    },
  ],
}

export const ocaQuestions = Object.entries(raw).flatMap(([topic, items]) =>
  [...items, ...(extra[topic] ?? [])].map((item, i) => ({
    id: `oca-${topic}-${i + 1}`,
    section: 'OCA',
    topic,
    question: item.q,
    options: item.options,
    correct: item.correct,
    explanation: item.explanation,
    ru: item.ru,
  }))
)
