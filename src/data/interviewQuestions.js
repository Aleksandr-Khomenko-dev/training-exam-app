// Original practice questions for Middle-level Java developer interview prep.
// Covers core Java/OOP plus adjacent technologies commonly asked about at this level.
// Each question carries an optional `ru` overlay with a Russian translation.
// Some questions have more than one correct answer ("Choose two").

export const interviewTopics = [
  { slug: 'core-java-oop', title: 'Core Java & OOP', titleRu: 'Core Java и ООП' },
  { slug: 'collections', title: 'Collections Framework', titleRu: 'Коллекции (Collections Framework)' },
  { slug: 'concurrency-interview', title: 'Multithreading & Concurrency', titleRu: 'Многопоточность и конкурентность' },
  { slug: 'jvm-memory', title: 'JVM & Memory Management', titleRu: 'JVM и управление памятью' },
  { slug: 'spring-basics', title: 'Spring Framework Basics', titleRu: 'Основы Spring Framework' },
  { slug: 'sql-databases', title: 'SQL & Databases', titleRu: 'SQL и базы данных' },
  { slug: 'git-vcs', title: 'Git & Version Control', titleRu: 'Git и системы контроля версий' },
  { slug: 'design-patterns', title: 'Design Patterns & System Design Basics', titleRu: 'Паттерны проектирования и основы системного дизайна' },
]

const raw = {
  'core-java-oop': [
    {
      q: 'What is the main difference between an abstract class and a (pre-Java 8) interface?',
      options: [
        'An abstract class can have constructors and instance state; an interface could only declare constants and abstract methods',
        'Interfaces support multiple inheritance of implementation while abstract classes do not',
        'Abstract classes cannot have any methods at all',
        'There is no meaningful difference between them',
      ],
      correct: [0],
      explanation:
        'Historically (before default methods arrived in Java 8), an interface was a pure contract — it could declare method signatures and constants, but never carry any instance state or provide any method body at all, meaning every implementing class had to supply 100% of the behavior itself. An abstract class, by contrast, behaves like a normal class in every respect except that it cannot be instantiated directly: it can hold instance fields, define constructors that run when a subclass is created, and mix fully-implemented ("concrete") methods together with abstract ones that subclasses must complete. In an interview, framing this correctly matters — a common wrong instinct is "interfaces are for multiple inheritance, abstract classes are not," which is true but is a secondary consequence, not the core distinction; the core distinction is state and constructors versus a pure behavioral contract.',
      ru: {
        question: 'В чём главное отличие абстрактного класса от интерфейса (в версии до Java 8)?',
        options: [
          'Абстрактный класс может иметь конструкторы и состояние экземпляра; интерфейс мог объявлять только константы и абстрактные методы',
          'Интерфейсы поддерживают множественное наследование реализации, а абстрактные классы — нет',
          'Абстрактные классы вообще не могут иметь методов',
          'Между ними нет значимой разницы',
        ],
        explanation:
          'Исторически (до появления default-методов в Java 8) интерфейс был чистым контрактом — он мог объявлять сигнатуры методов и константы, но никогда не мог нести состояние экземпляра или предоставлять хоть какое-то тело метода, а значит каждый реализующий класс был обязан сам предоставить 100% поведения. Абстрактный класс, напротив, ведёт себя как обычный класс во всех отношениях, кроме того, что его нельзя инстанцировать напрямую: он может хранить поля экземпляра, определять конструкторы, выполняющиеся при создании подкласса, и сочетать полностью реализованные ("конкретные") методы с абстрактными, которые обязаны завершить подклассы. На собеседовании важно правильно расставить акценты — распространённая ошибка: "интерфейсы для множественного наследования, абстрактные классы — нет", это верно, но это второстепенное следствие, а не суть отличия; суть — в состоянии и конструкторах против чистого поведенческого контракта.',
      },
    },
    {
      q: 'What does "favor composition over inheritance" mean in practice?',
      options: [
        'Prefer building classes by combining smaller objects/behaviors rather than deep inheritance hierarchies, for flexibility and lower coupling',
        'Never use inheritance under any circumstances',
        'Always use interfaces instead of concrete classes',
        'Composition means using only static methods',
      ],
      correct: [0],
      explanation:
        'Inheritance creates a very rigid, static relationship fixed at compile time: a subclass is permanently tied to its exact superclass and inherits everything about it, including implementation details it may not want, and changing the parent class can silently ripple through and break every subclass (the "fragile base class" problem). Composition instead builds a class out of references to other, smaller, focused objects, wiring their behavior together at runtime through method calls rather than an is-a relationship — this makes it far easier to swap one collaborator for a different implementation later, to combine multiple independent behaviors without a combinatorial explosion of subclasses, and to keep classes loosely coupled. This is a widely repeated design guideline (associated with the Gang of Four design patterns book), not an absolute ban on inheritance — inheritance is still the right tool for genuine, stable is-a relationships; the point is not to reach for it by default when composition would be more flexible.',
      ru: {
        question: 'Что на практике означает принцип "предпочитайте композицию наследованию"?',
        options: [
          'Лучше собирать классы из более мелких объектов/поведений, а не строить глубокие иерархии наследования — для гибкости и меньшей связанности',
          'Никогда и ни при каких обстоятельствах не использовать наследование',
          'Всегда использовать интерфейсы вместо конкретных классов',
          'Композиция означает использование только статических методов',
        ],
        explanation:
          'Наследование создаёт очень жёсткую, статическую связь, зафиксированную на этапе компиляции: подкласс навсегда привязан к своему точному суперклассу и наследует о нём всё, включая детали реализации, которые может и не хотеть, а изменение родительского класса может незаметно распространиться и сломать каждый подкласс (проблема "хрупкого базового класса"). Композиция же собирает класс из ссылок на другие, более мелкие, сфокусированные объекты, связывая их поведение во время выполнения через вызовы методов, а не через отношение "является", что значительно упрощает замену одного сотрудничающего объекта на другую реализацию позже, объединение нескольких независимых поведений без комбинаторного взрыва подклассов, и сохранение слабой связанности классов. Это широко повторяемая рекомендация по проектированию (связанная с книгой паттернов "Банды четырёх"), а не абсолютный запрет на наследование — наследование по-прежнему правильный инструмент для настоящих, стабильных отношений "является"; смысл в том, чтобы не тянуться к нему по умолчанию, когда композиция была бы гибче.',
      },
    },
    {
      q: 'What is the output?\n\nclass A { void greet() { System.out.println("A"); } }\nclass B extends A { void greet() { System.out.println("B"); } }\n\nA obj = new B();\nobj.greet();',
      options: ['B', 'A', 'Compilation error', 'Runtime exception'],
      correct: [0],
      explanation:
        'obj\'s declared (compile-time) type is A, but the object it actually points to at runtime is a B — the JVM always resolves an instance method call based on the object\'s real runtime type, not the reference variable\'s declared type, which is exactly the mechanism called dynamic method dispatch or runtime polymorphism. Since B overrides greet(), that override runs, printing "B". Interviewers frequently ask this exact style of question to check whether you understand polymorphism at a mechanical level, not just as a buzzword.',
      ru: {
        question: 'Каков результат?\n\nclass A { void greet() { System.out.println("A"); } }\nclass B extends A { void greet() { System.out.println("B"); } }\n\nA obj = new B();\nobj.greet();',
        options: ['B', 'A', 'Ошибка компиляции', 'Исключение времени выполнения'],
        explanation:
          'Объявленный (времени компиляции) тип obj — A, но объект, на который он реально указывает во время выполнения, — B — JVM всегда разрешает вызов метода экземпляра по реальному типу объекта во время выполнения, а не по объявленному типу переменной-ссылки, это и есть механизм, называемый динамической диспетчеризацией методов, или полиморфизмом времени выполнения. Поскольку B переопределяет greet(), выполняется именно это переопределение, печатая "B". Интервьюеры часто задают вопрос именно в такой форме, чтобы проверить, понимаете ли вы полиморфизм на механическом уровне, а не просто как модное слово.',
      },
    },
    {
      q: 'Why does the equals()/hashCode() contract matter for objects used as HashMap keys or in a HashSet?',
      options: [
        'Equal objects must produce the same hashCode, otherwise lookups/collections behave inconsistently',
        'hashCode() is irrelevant if equals() is implemented',
        'Only hashCode() needs to be overridden',
        'Java automatically synchronizes them',
      ],
      correct: [0],
      explanation:
        'Hash-based collections locate an entry in two steps: first they call hashCode() to pick a bucket, then within that bucket they call equals() to find the exact matching entry. The formal contract requires that if two objects are equal according to equals(), they must return the same hashCode() (the converse is not required — unequal objects may share a hash code, called a collision, which the collection handles, just less efficiently). If a class overrides equals() to compare by field content but leaves the default identity-based hashCode() from Object untouched, two logically equal objects can end up hashed into different buckets, so a HashMap.get() call using one of those "equal" objects can fail to find an entry actually stored under the other — a subtle, hard-to-debug bug that interviewers specifically probe for by asking about this pairing.',
      ru: {
        question: 'Почему контракт equals()/hashCode() важен для объектов, используемых как ключи HashMap или элементы HashSet?',
        options: [
          'Равные объекты обязаны давать одинаковый hashCode, иначе поиск и работа коллекций становятся непоследовательными',
          'hashCode() не важен, если реализован equals()',
          'Нужно переопределять только hashCode()',
          'Java автоматически синхронизирует их между собой',
        ],
        explanation:
          'Хеш-коллекции находят запись в два шага: сначала вызывают hashCode(), чтобы выбрать корзину, затем внутри этой корзины вызывают equals(), чтобы найти точно совпадающую запись. Формальный контракт требует, чтобы, если два объекта равны согласно equals(), они обязательно возвращали одинаковый hashCode() (обратное не требуется — неравные объекты могут иметь общий хеш-код, это коллизия, которую коллекция обрабатывает, просто менее эффективно). Если класс переопределяет equals() для сравнения по содержимому полей, но оставляет нетронутым hashCode() по умолчанию из Object, основанный на идентичности, два логически равных объекта могут оказаться в разных корзинах, поэтому вызов HashMap.get() с одним из этих "равных" объектов может не найти запись, реально сохранённую под другим, — тонкая, трудноотлаживаемая ошибка, которую интервьюеры специально прощупывают, спрашивая об этой паре методов.',
      },
    },
    {
      q: 'What is the difference between `==` and `.equals()` for objects?',
      options: [
        '== compares references (identity); .equals() compares logical equality as defined by the class',
        'They are always identical in behavior',
        '.equals() is always faster than ==',
        '== can only be used with primitives',
      ],
      correct: [0],
      explanation:
        '== on reference types always performs a raw identity comparison — it asks "do these two variables point to the exact same object in memory," regardless of what the objects\' fields contain. .equals(), inherited from Object and freely overridable, is meant to express "logical" or "value" equality as the class author defines it — the default Object.equals() implementation actually falls back to == (identity), which is exactly why classes representing meaningful values (String, Integer, a custom Point or Money class, and so on) override it to compare content instead. This is an extremely common interview follow-up because getting it wrong (using == to compare two logically-equal-but-distinct objects) is one of the most frequent real Java bugs junior developers write.',
      ru: {
        question: 'В чём разница между `==` и `.equals()` для объектов?',
        options: [
          '== сравнивает ссылки (идентичность); .equals() сравнивает логическое равенство, определённое классом',
          'Их поведение всегда идентично',
          '.equals() всегда работает быстрее, чем ==',
          '== можно использовать только с примитивами',
        ],
        explanation:
          '== для ссылочных типов всегда выполняет сырое сравнение идентичности — он спрашивает "указывают ли эти две переменные ровно на один и тот же объект в памяти", независимо от того, что содержат поля объектов. .equals(), унаследованный от Object и свободно переопределяемый, призван выражать "логическое" или "по значению" равенство так, как его определяет автор класса — реализация Object.equals() по умолчанию на самом деле сводится к == (идентичности), именно поэтому классы, представляющие содержательные значения (String, Integer, собственный класс Point или Money и т.д.), переопределяют его для сравнения по содержимому. Это чрезвычайно частый уточняющий вопрос на собеседовании, потому что ошибка здесь (использование == для сравнения двух логически равных, но разных объектов) — одна из самых частых реальных ошибок джуниор-разработчиков на Java.',
      },
    },
    {
      q: 'What does the SOLID principle "S" (Single Responsibility) mean?',
      options: [
        'A class should have only one reason to change, i.e., one responsibility',
        'A class should implement only one interface',
        'A class should have a single public method',
        'A class should be declared final',
      ],
      correct: [0],
      explanation:
        'The Single Responsibility Principle, the "S" in SOLID, is precisely stated as "a class should have only one reason to change" — meaning it should own exactly one cohesive area of responsibility, so that a business requirement changing in one area only ever forces edits to one class, rather than rippling across several unrelated classes that happen to have been bundled together. This has nothing to do with the number of interfaces implemented, the number of public methods (a class with one responsibility can easily have several related public methods), or being declared final; a common interview follow-up is asking for an example of a violation, such as a class that both validates business rules and also handles database persistence — those are two separate reasons to change, and should typically be split into two classes.',
      ru: {
        question: 'Что означает буква "S" (Single Responsibility) в принципах SOLID?',
        options: [
          'У класса должна быть только одна причина для изменения, то есть одна ответственность',
          'Класс должен реализовывать только один интерфейс',
          'У класса должен быть только один публичный метод',
          'Класс должен быть объявлен как final',
        ],
        explanation:
          'Принцип единственной ответственности, буква "S" в SOLID, формулируется точно как "у класса должна быть только одна причина для изменения" — то есть он должен владеть ровно одной связной областью ответственности, так что изменение бизнес-требования в одной области заставит редактировать только один класс, а не распространяться по нескольким несвязанным классам, которые оказались объединены вместе. Это никак не связано с числом реализуемых интерфейсов, числом публичных методов (у класса с одной ответственностью вполне может быть несколько связанных публичных методов), или объявлением final; частый уточняющий вопрос на собеседовании — попросить пример нарушения, например класс, который одновременно проверяет бизнес-правила и занимается сохранением в базу данных — это две разные причины для изменения, и их обычно стоит разделить на два класса.',
      },
    },
    {
      q: 'Which two are pillars of object-oriented programming? (Choose two)',
      options: ['Encapsulation', 'Compilation', 'Polymorphism', 'Serialization'],
      correct: [0, 2],
      explanation:
        'The classical four pillars of OOP are encapsulation, abstraction, inheritance, and polymorphism — encapsulation (hiding internal state behind a controlled interface) and polymorphism (a single interface/reference type behaving differently depending on the actual underlying object) are two of them and appear here. Compilation is a general programming-language concept (translating source code to executable form) with no special connection to OOP specifically, and serialization is a mechanism for converting objects to a storable/transmittable byte representation — a useful feature many Java classes support, but not itself one of the foundational principles that define what object-oriented programming is.',
      ru: {
        question: 'Какие два из перечисленных являются столпами объектно-ориентированного программирования? (Выберите два)',
        options: ['Инкапсуляция', 'Компиляция', 'Полиморфизм', 'Сериализация'],
        explanation:
          'Классические четыре столпа ООП — это инкапсуляция, абстракция, наследование и полиморфизм — инкапсуляция (сокрытие внутреннего состояния за контролируемым интерфейсом) и полиморфизм (единый интерфейс/тип ссылки, ведущий себя по-разному в зависимости от реального лежащего в основе объекта) — два из них и присутствуют здесь. Компиляция — общее понятие языков программирования (перевод исходного кода в исполняемую форму), не имеющее особой связи именно с ООП, а сериализация — механизм преобразования объектов в сохраняемое/передаваемое байтовое представление — полезная возможность, которую поддерживают многие классы Java, но сама по себе не один из основополагающих принципов, определяющих, что такое объектно-ориентированное программирование.',
      },
    },
    {
      q: 'You override equals() on a Point class to compare by x and y fields, but you don\'t override hashCode(). What happens when you put two logically equal Point objects into a HashSet?',
      options: [
        'Both objects can end up in the set as separate entries — the set may report a size of 2 even though equals() says they\'re the same',
        'The second insertion is automatically rejected because equals() returns true',
        'A compilation error occurs because hashCode() must be overridden whenever equals() is',
        'The set automatically merges them and calls equals() to keep only one',
      ],
      correct: [0],
      variantGroup: 'interview-equals-hashcode-contract',
      explanation:
        'HashSet locates a candidate bucket via hashCode() first, and only then confirms a match via equals() among entries already in that bucket. Since hashCode() was left at its Object default (identity-based), two logically-equal Points almost always produce different hash codes and land in different buckets — meaning equals() between them is never even called, so both get added as if they were distinct objects, inflating size() to 2 despite equals() saying they represent the same point. Nothing about this is checked at compile time, which is exactly why it\'s a dangerous, silent runtime bug rather than an error you\'d catch immediately.',
      ru: {
        question: 'Вы переопределяете equals() у класса Point, сравнивая по полям x и y, но не переопределяете hashCode(). Что произойдёт, если положить два логически равных объекта Point в HashSet?',
        options: [
          'Оба объекта могут оказаться в множестве как отдельные записи — размер множества может показать 2, хотя equals() говорит, что они одинаковы',
          'Вторая вставка автоматически отклоняется, потому что equals() возвращает true',
          'Произойдёт ошибка компиляции, потому что hashCode() обязательно нужно переопределять вместе с equals()',
          'Множество автоматически объединит их, вызвав equals(), и оставит только одну запись',
        ],
        explanation:
          'HashSet сначала находит корзину через hashCode(), и только потом подтверждает совпадение через equals() среди уже находящихся в этой корзине записей. Поскольку hashCode() остался дефолтным от Object (на основе identity), два логически равных Point почти всегда дают разные хеш-коды и попадают в разные корзины — а значит equals() между ними вообще ни разу не вызывается, и оба добавляются как будто это разные объекты, раздувая size() до 2, хотя equals() говорит, что это одна и та же точка. Компилятор это никак не проверяет, именно поэтому это опасный, тихий баг времени выполнения, а не ошибка, которую вы поймаете сразу.',
      },
    },
    {
      q: 'You override equals() on an Employee class to compare by employeeId, but leave hashCode() as the default from Object. What happens when you add two Employee objects with the same employeeId to a HashSet?',
      options: [
        'Both can end up stored as separate entries — the set\'s size may show 2 even though equals() considers them the same employee',
        'The second insertion is automatically rejected because equals() returns true',
        'A compilation error occurs because hashCode() must be overridden whenever equals() is',
        'The JVM automatically generates a matching hashCode() at runtime to keep them consistent',
      ],
      correct: [0],
      variantGroup: 'interview-equals-hashcode-contract',
      explanation:
        'The same equals()/hashCode() contract violation applies regardless of the class: HashSet buckets entries by hashCode() first and only checks equals() within a bucket. With hashCode() untouched (identity-based), two Employee objects with the same employeeId typically hash differently and land in separate buckets, so equals() is never consulted between them and both get stored — size() shows 2 for what equals() calls "the same employee". There is no compile-time enforcement of "override hashCode() whenever you override equals()" — it\'s a convention documented on Object, and violating it produces exactly this kind of silent collection-consistency bug.',
      ru: {
        question: 'Вы переопределяете equals() у класса Employee, сравнивая по полю employeeId, но оставляете hashCode() дефолтным от Object. Что произойдёт при добавлении двух объектов Employee с одинаковым employeeId в HashSet?',
        options: [
          'Оба могут оказаться сохранены как отдельные записи — размер множества может показать 2, хотя equals() считает их одним и тем же сотрудником',
          'Вторая вставка автоматически отклоняется, потому что equals() возвращает true',
          'Произойдёт ошибка компиляции, потому что hashCode() обязательно нужно переопределять вместе с equals()',
          'JVM автоматически сгенерирует подходящий hashCode() во время выполнения, чтобы сохранить согласованность',
        ],
        explanation:
          'То же самое нарушение контракта equals()/hashCode() применимо к любому классу: HashSet сначала раскладывает записи по корзинам через hashCode(), и только внутри корзины проверяет equals(). Если hashCode() не тронут (основан на identity), два объекта Employee с одинаковым employeeId обычно дают разные хеши и попадают в разные корзины, поэтому equals() между ними вообще не вызывается, и оба сохраняются — size() показывает 2 для того, что equals() называет "одним и тем же сотрудником". Компилятор никак не принуждает к правилу "переопределяй hashCode() вместе с equals()" — это соглашение, задокументированное в Object, и его нарушение даёт ровно такой тихий баг согласованности коллекции.',
      },
    },
  ],
  collections: [
    {
      q: 'What is the time complexity of get(index) on an ArrayList versus a LinkedList?',
      options: [
        'O(1) for ArrayList, O(n) for LinkedList',
        'O(n) for both',
        'O(1) for both',
        'O(log n) for ArrayList, O(1) for LinkedList',
      ],
      correct: [0],
      explanation:
        'ArrayList is backed internally by a plain array, and computing the memory address of the element at a given index is a direct arithmetic calculation regardless of how large the list is — that is exactly what makes indexed access O(1), constant time. LinkedList, by contrast, is a doubly-linked chain of nodes with no direct indexed access at all; retrieving the element at index i requires starting from one end and following node references one at a time until reaching position i, making get(index) an O(n) operation whose cost grows with the list\'s size. This complexity difference is the standard justification interviewers expect for "when would you choose ArrayList over LinkedList" — ArrayList wins decisively whenever random access by index is common.',
      ru: {
        question: 'Какова сложность операции get(index) у ArrayList по сравнению с LinkedList?',
        options: [
          'O(1) для ArrayList, O(n) для LinkedList',
          'O(n) для обоих',
          'O(1) для обоих',
          'O(log n) для ArrayList, O(1) для LinkedList',
        ],
        explanation:
          'ArrayList внутри основан на обычном массиве, и вычисление адреса в памяти элемента по заданному индексу — прямой арифметический расчёт независимо от размера списка — именно это делает индексированный доступ O(1), константным по времени. LinkedList же — это двусвязная цепочка узлов вообще без прямого индексированного доступа; получение элемента по индексу i требует начать с одного конца и переходить по ссылкам узлов по одной, пока не будет достигнута позиция i, что делает get(index) операцией O(n), стоимость которой растёт с размером списка. Эта разница в сложности — стандартное обоснование, которое интервьюеры ожидают на вопрос "когда бы вы выбрали ArrayList вместо LinkedList" — ArrayList уверенно выигрывает всегда, когда часто нужен произвольный доступ по индексу.',
      },
    },
    {
      q: 'When would you prefer a LinkedList over an ArrayList?',
      options: [
        'When frequent insertions/removals happen at the beginning or middle of the list rather than random access',
        'When you need fast random access by index',
        'Never; ArrayList is always better',
        'When memory usage must be minimal',
      ],
      correct: [0],
      explanation:
        'Inserting or removing an element in the middle (or the front) of an ArrayList requires shifting every subsequent element over by one position, which is an O(n) operation regardless of where in the array-backed structure the change happens. A LinkedList performs the same middle/front insertion or removal in O(1) once you already have a reference to the relevant node, since it only needs to relink a couple of adjacent pointers rather than shift anything. This makes LinkedList the theoretically better choice specifically for workloads dominated by insertions/removals away from the end — though in practice, ArrayList\'s better memory locality (contiguous array, CPU-cache-friendly) often makes it faster overall even for many insertion-heavy workloads, which is a nuance worth mentioning to show real depth in an interview. LinkedList also generally uses more memory per element (each node needs extra pointer fields), so "minimal memory usage" actually favors ArrayList, not LinkedList.',
      ru: {
        question: 'Когда стоит предпочесть LinkedList вместо ArrayList?',
        options: [
          'Когда часто происходят вставки/удаления в начале или середине списка, а не произвольный доступ по индексу',
          'Когда нужен быстрый произвольный доступ по индексу',
          'Никогда — ArrayList всегда лучше',
          'Когда нужно минимизировать потребление памяти',
        ],
        explanation:
          'Вставка или удаление элемента в середине (или в начале) ArrayList требует сдвинуть каждый последующий элемент на одну позицию, что является операцией O(n) независимо от того, где в структуре на основе массива происходит изменение. LinkedList выполняет ту же вставку/удаление в середине/начале за O(1), как только у вас уже есть ссылка на нужный узел, поскольку нужно лишь перелинковать пару соседних указателей, а не сдвигать что-либо. Это делает LinkedList теоретически лучшим выбором именно для нагрузок, где преобладают вставки/удаления не в конце — хотя на практике лучшая локальность памяти ArrayList (непрерывный массив, дружественный к кэшу процессора) часто делает его быстрее в целом даже для многих нагрузок с большим числом вставок, и это нюанс, который стоит упомянуть, чтобы показать реальную глубину знаний на собеседовании. LinkedList также обычно использует больше памяти на элемент (каждому узлу нужны дополнительные поля-указатели), поэтому "минимальное потребление памяти" на самом деле в пользу ArrayList, а не LinkedList.',
      },
    },
    {
      q: 'What is the difference between HashMap and ConcurrentHashMap?',
      options: [
        'ConcurrentHashMap is thread-safe for concurrent access without locking the entire map; HashMap is not thread-safe',
        'They are functionally identical',
        'HashMap is faster in all multi-threaded scenarios',
        'ConcurrentHashMap does not allow null values while HashMap does',
      ],
      correct: [0],
      explanation:
        'HashMap offers no thread-safety guarantees at all — concurrent reads and writes from multiple threads without external synchronization can corrupt its internal structure or throw ConcurrentModificationException. ConcurrentHashMap is specifically engineered for safe concurrent use, internally partitioning its data and using fine-grained locking (or lock-free techniques for many operations) so that multiple threads can read and even write simultaneously with much better throughput than simply wrapping a HashMap in one giant external lock (like the older, now largely obsolete Hashtable or Collections.synchronizedMap does). One genuinely correct, often-tested detail: ConcurrentHashMap does not permit null keys or null values (it throws NullPointerException), specifically because null would create ambiguity in a concurrent context about whether a key is actually absent versus present with a null value — whereas plain HashMap does allow one null key and multiple null values.',
      ru: {
        question: 'В чём отличие HashMap от ConcurrentHashMap?',
        options: [
          'ConcurrentHashMap потокобезопасен для одновременного доступа без блокировки всей карты целиком; HashMap не потокобезопасен',
          'Они функционально идентичны',
          'HashMap работает быстрее во всех многопоточных сценариях',
          'ConcurrentHashMap не допускает null-значений, а HashMap допускает',
        ],
        explanation:
          'HashMap вообще не даёт никаких гарантий потокобезопасности — конкурентные чтение и запись из нескольких потоков без внешней синхронизации могут повредить его внутреннюю структуру или выбросить ConcurrentModificationException. ConcurrentHashMap специально спроектирован для безопасного конкурентного использования, внутренне разбивая данные на части и используя мелкогранулированную блокировку (или безблокировочные техники для многих операций), так что несколько потоков могут одновременно читать и даже писать со значительно большей пропускной способностью, чем просто обернуть HashMap одной гигантской внешней блокировкой (как это делает более старый, теперь во многом устаревший Hashtable или Collections.synchronizedMap). Один действительно верный, часто проверяемый нюанс: ConcurrentHashMap не допускает null-ключей или null-значений (выбрасывает NullPointerException), именно потому что null создал бы неоднозначность в конкурентном контексте относительно того, действительно ли ключ отсутствует, или присутствует со значением null — тогда как обычный HashMap допускает один null-ключ и несколько null-значений.',
      },
    },
    {
      q: 'What happens when you add a duplicate element to a HashSet?',
      options: [
        'The add() call returns false and the set remains unchanged',
        'It throws an exception',
        'It replaces the existing element',
        'It adds the duplicate, resulting in two identical entries',
      ],
      correct: [0],
      explanation:
        'Set.add(element) has a boolean return type specifically to communicate whether the element was actually inserted — it returns true when the element was genuinely new and got added, and false when an equal element (per equals()/hashCode()) was already present, in which case the set is left completely unchanged and no exception is raised. This design lets calling code detect duplicates cheaply just by checking the return value of add(), which is a small but genuinely useful idiom (`if (!seen.add(item)) { // item was a duplicate }`) worth mentioning to demonstrate familiarity with the API beyond the basics.',
      ru: {
        question: 'Что произойдёт при добавлении дублирующегося элемента в HashSet?',
        options: [
          'Вызов add() вернёт false, и набор останется без изменений',
          'Будет выброшено исключение',
          'Существующий элемент будет заменён',
          'Дубликат добавится, и получится два одинаковых элемента',
        ],
        explanation:
          'Set.add(element) имеет булев возвращаемый тип именно для того, чтобы сообщить, был ли элемент реально вставлен — он возвращает true, когда элемент действительно новый и был добавлен, и false, когда равный элемент (по equals()/hashCode()) уже присутствовал, и в этом случае набор остаётся полностью без изменений, никакое исключение не выбрасывается. Такой дизайн позволяет вызывающему коду дёшево обнаруживать дубликаты, просто проверяя возвращаемое значение add(), — небольшая, но по-настоящему полезная идиома (`if (!seen.add(item)) { // item был дубликатом }`), которую стоит упомянуть, чтобы продемонстрировать знакомство с API за пределами азов.',
      },
    },
    {
      q: 'Which interface would you use to sort custom objects in multiple different ways?',
      options: ['Comparator', 'Comparable', 'Iterable', 'Serializable'],
      correct: [0],
      explanation:
        'Comparable is implemented directly on the class being sorted and defines exactly one "natural" ordering (its single compareTo(other) method) — a class can only implement it once, so it can only ever express one sort order. Comparator, by contrast, is a separate, standalone object entirely decoupled from the class it sorts, with its own compare(a, b) method, and nothing stops you from writing as many different Comparator implementations for the same class as you need (sort Employee by salary, by hire date, by last name, each as its own Comparator) and passing whichever one is appropriate to a given sort() call. This exact "one natural order via Comparable, unlimited custom orders via Comparator" distinction is one of the most frequently asked collections questions in interviews.',
      ru: {
        question: 'Какой интерфейс использовать, чтобы сортировать объекты своего класса несколькими разными способами?',
        options: ['Comparator', 'Comparable', 'Iterable', 'Serializable'],
        explanation:
          'Comparable реализуется непосредственно в сортируемом классе и определяет ровно один "естественный" порядок (единственный метод compareTo(other)) — класс может реализовать его только один раз, поэтому он может выразить лишь один порядок сортировки. Comparator же — отдельный, самостоятельный объект, полностью отвязанный от класса, который он сортирует, со своим методом compare(a, b), и ничто не мешает написать сколько угодно разных реализаций Comparator для одного и того же класса (сортировка Employee по зарплате, по дате найма, по фамилии — каждая как отдельный Comparator) и передавать нужный в конкретный вызов sort(). Именно это отличие "один естественный порядок через Comparable, неограниченное число пользовательских порядков через Comparator" — один из самых частых вопросов о коллекциях на собеседованиях.',
      },
    },
    {
      q: 'What does Collections.unmodifiableList() do?',
      options: [
        'Returns a read-only view of the list that throws UnsupportedOperationException on modification attempts',
        'Creates a deep copy that can be freely modified',
        'Sorts the list before returning',
        'Makes the list thread-safe',
      ],
      correct: [0],
      explanation:
        'Collections.unmodifiableList(list) does not copy anything — it wraps the original list in a thin view object that forwards all read operations straight through to the underlying list, but intercepts every mutating call (add, remove, set, and so on) and throws UnsupportedOperationException instead of executing it. This is a cheap way to hand out a "read-only" reference to callers who should not be able to modify a collection, but it is a subtle, commonly-tested trap: because it is a view, not a copy, changes made directly to the original underlying list are still visible through the unmodifiable wrapper — the wrapper only prevents modification through itself, it does not create independence from the source. It also has no bearing on thread-safety at all; an unmodifiable view of a HashMap is still not safe for concurrent modification-free reads mixed with writes elsewhere.',
      ru: {
        question: 'Что делает Collections.unmodifiableList()?',
        options: [
          'Возвращает представление списка "только для чтения", которое выбрасывает UnsupportedOperationException при попытке изменения',
          'Создаёт глубокую копию, которую можно свободно изменять',
          'Сортирует список перед возвратом',
          'Делает список потокобезопасным',
        ],
        explanation:
          'Collections.unmodifiableList(list) ничего не копирует — он оборачивает исходный список в тонкий объект-представление, который передаёт все операции чтения напрямую в нижележащий список, но перехватывает каждый изменяющий вызов (add, remove, set и т.д.) и выбрасывает UnsupportedOperationException вместо его выполнения. Это дешёвый способ выдать вызывающему коду ссылку "только для чтения", которая не должна позволять менять коллекцию, но это тонкая, часто проверяемая ловушка: поскольку это представление, а не копия, изменения, сделанные напрямую в исходном нижележащем списке, всё равно видны через немодифицируемую обёртку — обёртка предотвращает изменение только через саму себя, она не создаёт независимости от источника. Это также никак не связано с потокобезопасностью; немодифицируемое представление HashMap всё равно небезопасно для чтений без блокировки, смешанных с записями откуда-то ещё.',
      },
    },
    {
      q: 'Which two collections maintain elements in sorted order? (Choose two)',
      options: ['TreeSet', 'HashSet', 'TreeMap', 'HashMap'],
      correct: [0, 2],
      explanation:
        'TreeSet and TreeMap are both backed internally by a red-black tree and are explicitly documented to keep their elements/keys continuously ordered — TreeSet by the elements\' natural order (or a supplied Comparator), TreeMap the same way but for its keys — so any iteration over either always visits items in sorted sequence. HashSet and HashMap, by contrast, place elements according to hash-bucket layout, which has no relationship whatsoever to any natural or numeric ordering; their iteration order is essentially unpredictable and should never be relied upon to be sorted, or even stable across different runs of the same program.',
      ru: {
        question: 'Какие две коллекции хранят элементы в отсортированном порядке? (Выберите два)',
        options: ['TreeSet', 'HashSet', 'TreeMap', 'HashMap'],
        explanation:
          'TreeSet и TreeMap оба внутри основаны на красно-чёрном дереве и явно задокументированы как постоянно хранящие элементы/ключи упорядоченными — TreeSet по естественному порядку элементов (или переданному Comparator), TreeMap так же, но для своих ключей, — поэтому любая итерация по любому из них всегда проходит элементы в отсортированной последовательности. HashSet и HashMap, напротив, размещают элементы согласно раскладке по хеш-корзинам, что вообще никак не связано ни с каким естественным или числовым порядком; их порядок итерации по сути непредсказуем, и на него никогда не следует полагаться как на отсортированный, или даже стабильный между разными запусками одной и той же программы.',
      },
    },
    {
      q: 'A list holds 1,000,000 elements. What is the time complexity of calling list.get(500_000) if the list is an ArrayList versus a LinkedList?',
      options: [
        'O(1) for ArrayList (direct index into a backing array); O(n) for LinkedList (must walk node-by-node from an end)',
        'O(n) for both, since get() always has to search for the element',
        'O(1) for both — get() is guaranteed constant time by the List interface',
        'O(log n) for ArrayList; O(1) for LinkedList',
      ],
      correct: [0],
      variantGroup: 'interview-arraylist-linkedlist-get',
      explanation:
        'ArrayList is backed by a real contiguous array, so get(index) computes the target memory offset directly — constant time no matter the list size or which index is requested. LinkedList has no random-access backing storage at all; each node only knows its immediate neighbors, so reaching a given index means traversing that many node-to-node hops from whichever end is closer, making it linear time in the worst case. This is exactly why LinkedList is a poor fit when random-access reads dominate, even though it\'s the stronger choice for frequent insertions/removals at arbitrary positions (which don\'t require shifting elements the way ArrayList does).',
      ru: {
        question: 'Список содержит 1 000 000 элементов. Какова временная сложность вызова list.get(500_000), если список — ArrayList, и если это LinkedList?',
        options: [
          'O(1) для ArrayList (прямой доступ по индексу к внутреннему массиву); O(n) для LinkedList (нужно пройти узел за узлом от одного из концов)',
          'O(n) для обоих, так как get() всегда ищет элемент',
          'O(1) для обоих — get() гарантированно константен по контракту интерфейса List',
          'O(log n) для ArrayList; O(1) для LinkedList',
        ],
        explanation:
          'ArrayList опирается на настоящий непрерывный массив, поэтому get(index) напрямую вычисляет нужное смещение в памяти — константное время независимо от размера списка или запрашиваемого индекса. У LinkedList вообще нет хранилища с произвольным доступом; каждый узел знает только соседние узлы, поэтому достижение нужного индекса означает проход через столько же переходов узел-за-узлом от того конца, что ближе, что даёт линейное время в худшем случае. Именно поэтому LinkedList — плохой выбор, когда преобладает чтение по произвольному индексу, хотя он лучше подходит для частых вставок/удалений в произвольных позициях (которые не требуют сдвига элементов, как у ArrayList).',
      },
    },
    {
      q: 'A list holds 100,000 elements. What is the time complexity of calling list.get(50_000) if the list is an ArrayList versus a LinkedList?',
      options: [
        'O(1) for ArrayList (direct index into a backing array); O(n) for LinkedList (must walk node-by-node from an end)',
        'O(n) for both, since get() always has to search for the element',
        'O(1) for both — get() is guaranteed constant time by the List interface',
        'O(log n) for ArrayList; O(1) for LinkedList',
      ],
      correct: [0],
      variantGroup: 'interview-arraylist-linkedlist-get',
      explanation:
        'Same underlying structural difference, regardless of list size: ArrayList\'s contiguous backing array lets get(index) jump straight to the right memory offset in constant time, while LinkedList must hop from node to node — from the closer end — to reach the target index, costing time proportional to how far in that index is, i.e. O(n) in the worst case. Doubling or halving the list size (or the requested index) doesn\'t change which structure is asymptotically better here; it only changes how painful the LinkedList traversal actually is in practice.',
      ru: {
        question: 'Список содержит 100 000 элементов. Какова временная сложность вызова list.get(50_000), если список — ArrayList, и если это LinkedList?',
        options: [
          'O(1) для ArrayList (прямой доступ по индексу к внутреннему массиву); O(n) для LinkedList (нужно пройти узел за узлом от одного из концов)',
          'O(n) для обоих, так как get() всегда ищет элемент',
          'O(1) для обоих — get() гарантированно константен по контракту интерфейса List',
          'O(log n) для ArrayList; O(1) для LinkedList',
        ],
        explanation:
          'То же самое структурное отличие, независимо от размера списка: непрерывный внутренний массив ArrayList позволяет get(index) сразу перейти к нужному смещению в памяти за константное время, а LinkedList вынужден переходить от узла к узлу — от ближайшего конца — чтобы достичь нужного индекса, что стоит времени, пропорционального удалённости этого индекса, то есть O(n) в худшем случае. Удвоение или уменьшение вдвое размера списка (или запрашиваемого индекса) не меняет, какая структура асимптотически лучше здесь — меняется только то, насколько на практике болезненным окажется проход по LinkedList.',
      },
    },
  ],
  'concurrency-interview': [
    {
      q: 'What is the difference between `Runnable` and `Callable`?',
      options: [
        'Callable can return a value and throw checked exceptions; Runnable cannot return a value',
        'Runnable can return a value; Callable cannot',
        'They are identical interfaces',
        'Callable is deprecated in favor of Runnable',
      ],
      correct: [0],
      explanation:
        'Runnable is the original, ancient (Java 1.0) interface for representing a unit of work, with the single method `void run()` — no return value, and it cannot declare checked exceptions, so any checked exception thrown inside must be caught internally. Callable<V>, introduced later specifically to work with ExecutorService, declares `V call() throws Exception` — it can return a genuine typed result and is explicitly allowed to throw checked exceptions, which the caller then receives wrapped inside an ExecutionException when retrieving the result via a Future. Choosing between them in an interview answer, the practical rule is: use Runnable for fire-and-forget work with no result, use Callable when you need to get a value back or need to propagate a checked exception out of the task.',
      ru: {
        question: 'В чём разница между `Runnable` и `Callable`?',
        options: [
          'Callable может возвращать значение и выбрасывать проверяемые исключения; Runnable не может возвращать значение',
          'Runnable может возвращать значение; Callable — нет',
          'Это идентичные интерфейсы',
          'Callable устарел в пользу Runnable',
        ],
        explanation:
          'Runnable — исходный, старый (с Java 1.0) интерфейс для представления единицы работы, с единственным методом `void run()` — без возвращаемого значения, и он не может объявлять проверяемые исключения, поэтому любое проверяемое исключение внутри должно быть поймано на месте. Callable<V>, появившийся позже специально для работы с ExecutorService, объявляет `V call() throws Exception` — он может вернуть настоящий типизированный результат и явно может выбрасывать проверяемые исключения, которые вызывающий код затем получает обёрнутыми в ExecutionException при получении результата через Future. Выбирая между ними в ответе на собеседовании, практическое правило такое: используйте Runnable для работы "запустил и забыл" без результата, используйте Callable, когда нужно получить значение обратно или нужно распространить проверяемое исключение из задачи.',
      },
    },
    {
      q: 'What does the `wait()` method do when called on an object?',
      options: [
        "Releases the object's monitor lock and pauses the thread until notify()/notifyAll() is called (must be called within a synchronized block)",
        'Immediately terminates the thread',
        'Blocks all other threads permanently',
        'Can be called without holding the object\'s lock',
      ],
      correct: [0],
      explanation:
        'wait(), notify(), and notifyAll() are Object\'s built-in, low-level coordination primitives, all tied to an object\'s intrinsic monitor lock — the exact same lock a synchronized block on that object acquires. Calling wait() requires the calling thread to already hold that object\'s lock (calling it outside a synchronized block on that object throws IllegalMonitorStateException); wait() then atomically releases the lock and suspends the thread, allowing other threads to acquire the lock and eventually call notify()/notifyAll() on the same object to wake the waiting thread back up, which then re-acquires the lock before continuing. This is the classic mechanism behind producer/consumer patterns implemented manually (rather than via higher-level java.util.concurrent tools like BlockingQueue), and interviewers commonly follow up by asking why wait() must always be called inside a loop re-checking its condition, guarding against spurious wakeups.',
      ru: {
        question: 'Что делает метод `wait()`, вызванный на объекте?',
        options: [
          'Освобождает монитор (блокировку) объекта и приостанавливает поток до вызова notify()/notifyAll() (должен вызываться внутри synchronized-блока)',
          'Немедленно завершает поток',
          'Навсегда блокирует все остальные потоки',
          'Может вызываться без удержания блокировки объекта',
        ],
        explanation:
          'wait(), notify() и notifyAll() — встроенные низкоуровневые примитивы координации Object, все привязанные к внутреннему монитору объекта — той же самой блокировке, которую захватывает synchronized-блок на этом объекте. Вызов wait() требует, чтобы вызывающий поток уже удерживал блокировку этого объекта (вызов его вне synchronized-блока на этом объекте выбрасывает IllegalMonitorStateException); wait() затем атомарно освобождает блокировку и приостанавливает поток, позволяя другим потокам захватить блокировку и в итоге вызвать notify()/notifyAll() на том же объекте, чтобы разбудить ожидающий поток, который затем повторно захватывает блокировку перед продолжением. Это классический механизм, лежащий в основе паттернов производитель/потребитель, реализованных вручную (а не через более высокоуровневые инструменты java.util.concurrent вроде BlockingQueue), и интервьюеры часто задают уточняющий вопрос, почему wait() всегда нужно вызывать внутри цикла, перепроверяющего условие, защищаясь от ложных пробуждений.',
      },
    },
    {
      q: 'What is a common cause of a thread deadlock in production code?',
      options: [
        'Two threads acquiring the same locks in different orders',
        'Using too many CPU cores',
        'Declaring variables as final',
        'Using ArrayList instead of LinkedList',
      ],
      correct: [0],
      explanation:
        'The textbook deadlock scenario is two threads each needing two locks to complete an operation, but acquiring them in opposite order: thread A grabs lock 1 then tries to grab lock 2, while thread B (perhaps executing what looks like a symmetrical operation, like a fund transfer in the other direction between the same two accounts) grabs lock 2 then tries to grab lock 1 — if the timing lines up so each thread gets its first lock before either gets its second, both threads block forever waiting on each other. This happens constantly in real systems around things like transferring money between two account objects, each locked individually, without a globally agreed-upon lock ordering. The standard, interview-expected fix is to always acquire multiple locks in one single, globally consistent order across the entire codebase (for instance, always lock the account with the lower ID first), which makes the circular-wait condition that causes deadlock structurally impossible.',
      ru: {
        question: 'Какая распространённая причина deadlock в промышленном коде?',
        options: [
          'Два потока захватывают одни и те же блокировки в разном порядке',
          'Использование слишком большого числа ядер процессора',
          'Объявление переменных как final',
          'Использование ArrayList вместо LinkedList',
        ],
        explanation:
          'Хрестоматийный сценарий deadlock — два потока, каждому из которых нужны две блокировки для завершения операции, но захватывающих их в противоположном порядке: поток A хватает блокировку 1, затем пытается захватить блокировку 2, а поток B (возможно, выполняющий что-то похожее на симметричную операцию, например перевод средств в другом направлении между теми же двумя счетами) хватает блокировку 2, затем пытается захватить блокировку 1 — если тайминг совпадает так, что каждый поток получает свою первую блокировку раньше, чем второй, оба потока навсегда блокируются в ожидании друг друга. Это постоянно происходит в реальных системах вокруг вещей вроде перевода денег между двумя объектами счетов, заблокированными по отдельности, без глобально согласованного порядка блокировок. Стандартное, ожидаемое на собеседовании решение — всегда захватывать несколько блокировок в едином, глобально согласованном порядке во всей кодовой базе (например, всегда сначала блокировать счёт с меньшим ID), что структурно делает невозможным условие циклического ожидания, вызывающее deadlock.',
      },
    },
    {
      q: 'What is the purpose of `CountDownLatch`?',
      options: [
        'Allows one or more threads to wait until a set of operations in other threads completes',
        'Provides atomic increment operations',
        'Replaces the need for thread pools',
        'Is used only for reading files',
      ],
      correct: [0],
      explanation:
        'CountDownLatch is initialized with a fixed count and provides two key operations: await(), which blocks the calling thread until the internal count reaches zero, and countDown(), which decrements that count by one each time a worker finishes its share of work — once enough workers have called countDown() to bring the count to zero, every thread waiting in await() is released simultaneously. A classic use case is a main thread that kicks off several worker threads to perform setup tasks in parallel and needs to wait until all of them finish before proceeding — each worker calls countDown() when done, and the main thread\'s await() unblocks only once every worker has reported completion. Unlike a Semaphore or a lock, a CountDownLatch is single-use — once its count reaches zero it cannot be reset or reused for another round of coordination, which is a detail interviewers sometimes probe to distinguish CountDownLatch from CyclicBarrier, which can be reused.',
      ru: {
        question: 'Для чего предназначен `CountDownLatch`?',
        options: [
          'Позволяет одному или нескольким потокам ждать завершения набора операций в других потоках',
          'Предоставляет атомарные операции инкремента',
          'Заменяет необходимость в пулах потоков',
          'Используется только для чтения файлов',
        ],
        explanation:
          'CountDownLatch инициализируется фиксированным счётчиком и предоставляет две ключевые операции: await(), которая блокирует вызывающий поток, пока внутренний счётчик не достигнет нуля, и countDown(), которая уменьшает этот счётчик на единицу каждый раз, когда рабочий поток завершает свою часть работы — как только достаточное число рабочих потоков вызвало countDown(), доведя счётчик до нуля, все потоки, ожидающие в await(), освобождаются одновременно. Классический сценарий использования — главный поток, запускающий несколько рабочих потоков для параллельного выполнения задач настройки, которому нужно дождаться завершения всех перед продолжением — каждый рабочий вызывает countDown() по завершении, и await() главного потока разблокируется только когда каждый рабочий сообщил о завершении. В отличие от Semaphore или блокировки, CountDownLatch одноразовый — как только его счётчик достигает нуля, его нельзя сбросить или переиспользовать для нового раунда координации, деталь, которую интервьюеры иногда прощупывают, чтобы отличить CountDownLatch от CyclicBarrier, который можно переиспользовать.',
      },
    },
    {
      q: 'What does thread starvation mean?',
      options: [
        'A thread is perpetually denied access to resources it needs because other threads monopolize them',
        'A thread runs out of memory',
        'A thread throws a checked exception',
        'A thread finishes execution too quickly',
      ],
      correct: [0],
      explanation:
        'Starvation happens when a thread is technically able to run — it is not deadlocked, nothing is structurally preventing it — but in practice it keeps getting passed over for CPU time or a needed lock/resource because other threads with higher priority, or simply more aggressive/frequent access patterns, keep monopolizing what it needs, leaving it waiting indefinitely or for an unacceptably long time. A common real-world cause is using thread priorities carelessly (some low-priority thread never gets scheduled while high-priority threads stay busy) or a lock implementation with no fairness guarantee, where newly arriving threads can repeatedly "cut in line" ahead of a thread that has already been waiting a long time. This is a distinct concept from deadlock (which is a permanent, structural standstill) — starvation is about unfairness over time, and the typical fix involves fairness policies (like ReentrantLock\'s fair mode) or more careful priority management.',
      ru: {
        question: 'Что такое "голодание" потока (thread starvation)?',
        options: [
          'Потоку постоянно отказывают в доступе к нужным ему ресурсам, потому что их монополизируют другие потоки',
          'У потока заканчивается память',
          'Поток выбрасывает проверяемое исключение',
          'Поток завершается слишком быстро',
        ],
        explanation:
          'Голодание возникает, когда поток технически способен выполняться — он не в deadlock, ничто структурно не мешает ему, — но на практике его постоянно обходят стороной при выделении процессорного времени или нужной блокировки/ресурса, потому что другие потоки с более высоким приоритетом, или просто с более агрессивным/частым паттерном доступа, продолжают монополизировать то, что нужно ему, оставляя его ждать бесконечно или недопустимо долго. Распространённая реальная причина — неосторожное использование приоритетов потоков (какой-то низкоприоритетный поток никогда не планируется, пока высокоприоритетные потоки остаются занятыми) или реализация блокировки без гарантии справедливости, где вновь прибывающие потоки могут раз за разом "влезать без очереди" впереди потока, который уже долго ждёт. Это отдельное понятие от deadlock (постоянной, структурной остановки) — голодание про несправедливость во времени, и типичное решение включает политики справедливости (вроде честного режима ReentrantLock) или более аккуратное управление приоритетами.',
      },
    },
    {
      q: 'Why is `ConcurrentModificationException` thrown?',
      options: [
        "When a collection is structurally modified while being iterated with a standard iterator, outside of the iterator's own remove method",
        'When two threads read the same collection simultaneously without modification',
        'When a collection is empty',
        'When sorting a list',
      ],
      correct: [0],
      explanation:
        'Most standard Java collection iterators are "fail-fast": they track a modCount (modification count) on the backing collection at the moment the iterator was created, and check that it has not changed on every call to next(). If the collection is structurally modified (elements added or removed, as opposed to just having an existing element\'s value changed) by any means other than the iterator\'s own remove() method — including a direct call like `list.remove(x)` from inside a for-each loop, or, importantly, modification from a completely different thread — the very next call to next() detects the mismatched modCount and throws ConcurrentModificationException rather than risk continuing to iterate over now-inconsistent internal state. This behavior is purely a best-effort safety check, not a true concurrency-control mechanism — it does not reliably catch every possible concurrent modification, and genuinely thread-safe concurrent access requires either external synchronization or a proper concurrent collection like CopyOnWriteArrayList or ConcurrentHashMap instead.',
      ru: {
        question: 'Почему выбрасывается `ConcurrentModificationException`?',
        options: [
          'Когда коллекция структурно изменяется во время итерирования обычным итератором, минуя собственный метод remove() итератора',
          'Когда два потока одновременно читают одну и ту же коллекцию без изменений',
          'Когда коллекция пуста',
          'При сортировке списка',
        ],
        explanation:
          'Большинство стандартных итераторов коллекций Java — "fail-fast": они отслеживают modCount (счётчик модификаций) базовой коллекции на момент создания итератора и проверяют, что он не изменился, при каждом вызове next(). Если коллекция структурно изменяется (элементы добавляются или удаляются, в отличие от простого изменения значения существующего элемента) любым способом, кроме собственного метода remove() итератора — включая прямой вызов вроде `list.remove(x)` внутри цикла for-each, или, что важно, изменение из совершенно другого потока — самый следующий вызов next() обнаруживает несовпадающий modCount и выбрасывает ConcurrentModificationException, вместо того чтобы рисковать продолжить итерацию по уже несогласованному внутреннему состоянию. Это поведение — чисто эвристическая проверка безопасности, а не настоящий механизм контроля конкурентности — она не гарантированно ловит каждую возможную конкурентную модификацию, и по-настоящему потокобезопасный конкурентный доступ требует либо внешней синхронизации, либо подходящей конкурентной коллекции вроде CopyOnWriteArrayList или ConcurrentHashMap.',
      },
    },
    {
      q: 'Which two are true about the `synchronized` keyword? (Choose two)',
      options: [
        'It can be applied to methods and code blocks',
        'It guarantees deadlock-free execution',
        "Only one thread can hold a given object's monitor at a time",
        'It works across multiple JVM processes',
      ],
      correct: [0, 2],
      explanation:
        'synchronized can indeed be applied in two syntactic forms — as a modifier on an entire method (`synchronized void foo() {...}`) or wrapped around an arbitrary block of code targeting a specific object\'s lock (`synchronized (someObject) { ... }`), the latter offering finer control over exactly how much code runs under the lock. Its fundamental behavior is exactly that at most one thread can hold any given object\'s intrinsic monitor at any moment, which is what serializes access. It absolutely does not guarantee deadlock-free execution — poorly ordered nested synchronized blocks across multiple objects can deadlock just as easily as any other locking mechanism, as covered elsewhere in this topic — and it only coordinates threads within a single JVM process; it has no effect whatsoever across separate JVM processes or machines, which would require an entirely different mechanism like a distributed lock.',
      ru: {
        question: 'Какие два утверждения о ключевом слове `synchronized` верны? (Выберите два)',
        options: [
          'Его можно применять к методам и блокам кода',
          'Он гарантирует выполнение без deadlock',
          'Только один поток может удерживать монитор данного объекта в любой момент',
          'Он работает между несколькими процессами JVM',
        ],
        explanation:
          'synchronized действительно можно применять в двух синтаксических формах — как модификатор целого метода (`synchronized void foo() {...}`) или обёрнутым вокруг произвольного блока кода, нацеленного на блокировку конкретного объекта (`synchronized (someObject) { ... }`), второй вариант даёт более тонкий контроль над тем, сколько именно кода выполняется под блокировкой. Его фундаментальное поведение ровно в том, что в любой момент только один поток может удерживать внутренний монитор данного объекта, это и сериализует доступ. Он совершенно не гарантирует выполнение без deadlock — плохо упорядоченные вложенные synchronized-блоки на нескольких объектах могут привести к deadlock точно так же, как и любой другой механизм блокировок, как рассматривалось ранее в этой теме, — и он координирует потоки только в пределах одного процесса JVM; он вообще не действует между разными процессами JVM или машинами, для чего потребовался бы совершенно другой механизм вроде распределённой блокировки.',
      },
    },
    {
      q: 'Two threads each execute `count++` on a shared, non-volatile `int count = 0` field 100,000 times, with no synchronization. What can you say about the final value of count?',
      options: [
        'It is not guaranteed to be 200,000 — count++ is not atomic, so increments from both threads can be lost due to a race condition',
        'It is always exactly 200,000, because int increments are atomic in Java',
        'It always throws a ConcurrentModificationException',
        'It is always 100,000, since only one thread\'s increments actually get counted',
      ],
      correct: [0],
      variantGroup: 'interview-race-condition-counter',
      explanation:
        'count++ is really three separate steps under the hood — read the current value, add one, write the result back — and without synchronization, two threads can both read the same value before either writes back its incremented result, silently losing one of the increments (a classic read-modify-write race condition). Across 200,000 total increments this can happen many times, so the final value is unpredictable and typically ends up somewhat less than 200,000, varying from run to run. It\'s not that int arithmetic itself is unsafe — it\'s that the combined read-modify-write sequence on a shared variable isn\'t atomic, which is why a real fix needs `synchronized`, an `AtomicInteger`, or another proper concurrency-safe mechanism.',
      ru: {
        question: 'Два потока каждый выполняют `count++` над общим, не-volatile полем `int count = 0` по 100 000 раз, без синхронизации. Что можно сказать об итоговом значении count?',
        options: [
          'Не гарантируется, что оно будет равно 200 000 — count++ не атомарен, поэтому инкременты от обоих потоков могут теряться из-за состояния гонки',
          'Оно всегда ровно 200 000, потому что инкременты int атомарны в Java',
          'Всегда выбрасывается ConcurrentModificationException',
          'Оно всегда равно 100 000, так как реально учитываются инкременты только одного потока',
        ],
        explanation:
          'count++ на самом деле — это три отдельных шага под капотом: прочитать текущее значение, прибавить единицу, записать результат обратно, и без синхронизации два потока могут оба прочитать одно и то же значение до того, как хоть один из них запишет свой инкрементированный результат, тихо теряя один из инкрементов (классическое состояние гонки read-modify-write). За 200 000 суммарных инкрементов это может произойти много раз, поэтому итоговое значение непредсказуемо и обычно оказывается несколько меньше 200 000, по-разному от запуска к запуску. Дело не в том, что арифметика int сама по себе небезопасна — дело в том, что совмещённая последовательность чтение-изменение-запись над общей переменной не атомарна, поэтому настоящее исправление требует `synchronized`, `AtomicInteger` или другого подходящего потокобезопасного механизма.',
      },
    },
    {
      q: 'Four threads each execute `total += 1` on a shared, non-volatile `int total = 0` field 50,000 times, with no synchronization. What can you say about the final value of total?',
      options: [
        'It is not guaranteed to be 200,000 — the increment is not atomic, so updates from different threads can overwrite each other and be lost',
        'It is always exactly 200,000, because int increments are atomic in Java',
        'It always throws a ConcurrentModificationException',
        'It is always 50,000, since only one thread\'s increments actually get counted',
      ],
      correct: [0],
      variantGroup: 'interview-race-condition-counter',
      explanation:
        'The same race condition applies with any number of threads: `total += 1` reads, adds, and writes back total in three separate steps, so two threads can interleave their read and write steps and cause one thread\'s increment to be silently overwritten by another\'s stale read — losing progress. With 4 threads doing 50,000 increments each (200,000 total attempted increments), the same kind of loss can occur repeatedly, so the final value is unpredictable and generally comes in below 200,000. The fix is the same regardless of thread count: make the read-modify-write sequence atomic via `synchronized`, `AtomicInteger`, or an equivalent mechanism — adding more threads only makes an unsynchronized counter\'s result less reliable, not more.',
      ru: {
        question: 'Четыре потока каждый выполняют `total += 1` над общим, не-volatile полем `int total = 0` по 50 000 раз, без синхронизации. Что можно сказать об итоговом значении total?',
        options: [
          'Не гарантируется, что оно будет равно 200 000 — инкремент не атомарен, поэтому обновления от разных потоков могут перезаписывать друг друга и теряться',
          'Оно всегда ровно 200 000, потому что инкременты int атомарны в Java',
          'Всегда выбрасывается ConcurrentModificationException',
          'Оно всегда равно 50 000, так как реально учитываются инкременты только одного потока',
        ],
        explanation:
          'То же самое состояние гонки применимо при любом числе потоков: `total += 1` читает, прибавляет и записывает total обратно тремя отдельными шагами, поэтому два потока могут чередовать свои шаги чтения и записи и заставить инкремент одного потока быть тихо перезаписанным устаревшим прочитанным значением другого — теряя прогресс. При 4 потоках, делающих по 50 000 инкрементов (200 000 попыток инкремента всего), такая же потеря может происходить многократно, поэтому итоговое значение непредсказуемо и обычно оказывается меньше 200 000. Исправление то же самое независимо от числа потоков: сделать последовательность чтение-изменение-запись атомарной через `synchronized`, `AtomicInteger` или эквивалентный механизм — добавление ещё потоков делает результат несинхронизированного счётчика только менее надёжным, а не более.',
      },
    },
  ],
  'jvm-memory': [
    {
      q: 'What is stored in the Java heap?',
      options: [
        'Objects and their instance variables, shared across threads',
        'Only local primitive variables of methods',
        'Compiled bytecode',
        'Thread call stacks',
      ],
      correct: [0],
      explanation:
        'The heap is a single shared memory region, one per JVM instance, where every object created with `new` (and its instance fields) is allocated — it is genuinely shared across all threads in that JVM, which is precisely why objects on the heap need explicit synchronization when accessed concurrently. Local variables, including primitives and object references (the reference itself, not the object it points to), live in each thread\'s own private stack instead, which is why they need no synchronization — no other thread can see or touch another thread\'s stack frame. Compiled bytecode (the class definitions themselves) lives in the method area/metaspace, a separate region from the heap, and thread call stacks are, again, per-thread and entirely separate from the shared heap.',
      ru: {
        question: 'Что хранится в куче (heap) Java?',
        options: [
          'Объекты и их поля экземпляра, общие для всех потоков',
          'Только локальные примитивные переменные методов',
          'Скомпилированный байт-код',
          'Стеки вызовов потоков',
        ],
        explanation:
          'Куча — единая общая область памяти, одна на экземпляр JVM, где размещается каждый объект, созданный через `new` (и его поля экземпляра) — она по-настоящему общая для всех потоков в этой JVM, именно поэтому объектам в куче нужна явная синхронизация при конкурентном доступе. Локальные переменные, включая примитивы и ссылки на объекты (сама ссылка, а не объект, на который она указывает), живут в собственном приватном стеке каждого потока, поэтому им не нужна синхронизация — ни один другой поток не может видеть или трогать стек-фрейм другого потока. Скомпилированный байт-код (сами определения классов) находится в области методов/метапространстве, отдельной от кучи области, а стеки вызовов потоков — опять же, у каждого потока свой, полностью отдельный от общей кучи.',
      },
    },
    {
      q: 'What triggers garbage collection eligibility for an object?',
      options: [
        "When the object becomes unreachable from any live thread's roots (no live references point to it)",
        "When the object's finalize() method is called manually",
        'Only when System.gc() is explicitly called',
        'When the object is older than 1 second',
      ],
      correct: [0],
      explanation:
        'The JVM determines garbage collection eligibility purely through reachability analysis: starting from a set of "GC roots" (active thread stacks, static fields, JNI references, and similar), it traces every reference chain outward, and any object that cannot be reached by following references from any root is considered unreachable — and only then eligible for collection, regardless of how the object was created or how long it has existed. This can happen at any time the garbage collector decides to run, entirely at the JVM\'s discretion; System.gc() is only a hint requesting a collection cycle, never a guarantee one actually happens, and interviewers commonly ask this precisely to check whether a candidate mistakenly believes System.gc() forces immediate collection. Age alone is never the criterion — a long-lived, still-reachable object is never collected, while a brand-new, immediately-unreachable object can be collected right away.',
      ru: {
        question: 'Что делает объект пригодным для сборки мусора?',
        options: [
          'Когда объект становится недостижим из корней (roots) ни одного из живых потоков (на него не указывает ни одна живая ссылка)',
          'Когда вручную вызывается метод объекта finalize()',
          'Только когда явно вызывается System.gc()',
          'Когда объекту больше 1 секунды',
        ],
        explanation:
          'JVM определяет пригодность для сборки мусора исключительно через анализ достижимости: начиная с набора "корней GC" (стеки активных потоков, статические поля, JNI-ссылки и подобное), она прослеживает каждую цепочку ссылок наружу, и любой объект, недостижимый ни из одного корня по цепочке ссылок, считается недостижимым — и только тогда пригодным для сборки, независимо от того, как объект был создан или сколько он существует. Это может произойти в любой момент, который сборщик мусора решит выполниться, полностью на усмотрение JVM; System.gc() — лишь подсказка, запрашивающая цикл сборки, но никогда не гарантия, что он реально произойдёт, и интервьюеры часто задают этот вопрос именно чтобы проверить, не думает ли кандидат ошибочно, что System.gc() принудительно запускает немедленную сборку. Возраст сам по себе никогда не критерий — долгоживущий, всё ещё достижимый объект никогда не собирается, тогда как совершенно новый, сразу недостижимый объект может быть собран немедленно.',
      },
    },
    {
      q: 'What is a `StackOverflowError` typically caused by?',
      options: [
        'Excessive or infinite recursion consuming the call stack',
        'Running out of heap memory',
        'A missing catch block',
        'Too many objects in a HashMap',
      ],
      correct: [0],
      explanation:
        'Each thread has its own fixed-size call stack, and every method invocation pushes a new frame onto it (holding local variables, the return address, and similar bookkeeping) which only gets popped off when that method returns. Recursive calls that never reach a proper base case, or a base case with a bug that never actually triggers, keep pushing new frames without ever popping the earlier ones, and once the accumulated frames exceed the thread\'s stack size limit, the JVM throws StackOverflowError. This is entirely distinct from running out of heap space (which produces OutOfMemoryError instead, a heap-specific problem) — StackOverflowError is specifically a stack-space problem, almost always traceable to a recursion bug, which is exactly the kind of distinction interviewers expect a mid-level candidate to draw cleanly.',
      ru: {
        question: 'Чем обычно вызвана `StackOverflowError`?',
        options: [
          'Чрезмерной или бесконечной рекурсией, исчерпывающей стек вызовов',
          'Нехваткой памяти в куче',
          'Отсутствующим блоком catch',
          'Слишком большим числом объектов в HashMap',
        ],
        explanation:
          'У каждого потока свой стек вызовов фиксированного размера, и каждый вызов метода добавляет в него новый фрейм (хранящий локальные переменные, адрес возврата и подобный учёт), который снимается только когда этот метод возвращается. Рекурсивные вызовы, никогда не доходящие до подходящего базового случая, или с багом в базовом случае, который на самом деле никогда не срабатывает, продолжают добавлять новые фреймы, никогда не снимая предыдущие, и как только накопившиеся фреймы превышают лимит размера стека потока, JVM выбрасывает StackOverflowError. Это совершенно отлично от нехватки места в куче (что вместо этого даёт OutOfMemoryError, проблему, специфичную для кучи) — StackOverflowError — это конкретно проблема места в стеке, почти всегда сводимая к ошибке в рекурсии, и это именно то различие, которое интервьюеры ожидают от кандидата уровня middle провести чётко.',
      },
    },
    {
      q: 'What is a `OutOfMemoryError` typically caused by?',
      options: [
        "The heap (or another memory area) cannot allocate more space because it's exhausted, often due to memory leaks or insufficient heap size",
        'A missing return statement',
        'Using too many threads only',
        'Declaring too many methods',
      ],
      correct: [0],
      explanation:
        'OutOfMemoryError is thrown whenever the JVM cannot satisfy a memory allocation request in some region because that region has genuinely run out of space, most commonly the heap (though Metaspace, thread stacks, and other regions can each throw their own variant too). In production, this is typically not caused by legitimately needing more memory than expected in a single burst, but by a memory leak — objects that are technically still reachable (often accidentally held by a long-lived collection, a static field, or an unclosed resource) and therefore never become eligible for garbage collection, so live-but-unused objects accumulate over time until the heap genuinely fills up. Diagnosing OutOfMemoryError in a real interview scenario typically involves discussing heap dump analysis and identifying which object type is unexpectedly dominating retained memory, which is a good thing to mention if this question comes up.',
      ru: {
        question: 'Чем обычно вызвана `OutOfMemoryError`?',
        options: [
          'Куча (или другая область памяти) не может выделить больше пространства, потому что оно исчерпано — часто из-за утечек памяти или недостаточного размера кучи',
          'Отсутствующим оператором return',
          'Только использованием слишком большого числа потоков',
          'Объявлением слишком большого числа методов',
        ],
        explanation:
          'OutOfMemoryError выбрасывается всякий раз, когда JVM не может удовлетворить запрос на выделение памяти в какой-то области, потому что эта область реально исчерпала пространство, чаще всего куча (хотя Metaspace, стеки потоков и другие области тоже могут выбрасывать свой вариант). В продакшене это обычно вызвано не легитимной потребностью в большем объёме памяти, чем ожидалось, разово, а утечкой памяти — объектами, которые технически всё ещё достижимы (часто случайно удерживаются долгоживущей коллекцией, статическим полем или незакрытым ресурсом) и потому никогда не становятся пригодными для сборки мусора, так что живые, но неиспользуемые объекты накапливаются со временем, пока куча реально не заполнится. Диагностика OutOfMemoryError в реальном сценарии собеседования обычно включает обсуждение анализа дампа кучи и определения, какой тип объектов неожиданно доминирует в удерживаемой памяти, и это хорошо упомянуть, если такой вопрос возникнет.',
      },
    },
    {
      q: 'What is the purpose of the "Metaspace" (Java 8+) region?',
      options: [
        'Stores class metadata (replacing PermGen), and grows in native memory by default',
        'Stores object instances',
        'Stores only static final constants',
        'Stores thread stacks',
      ],
      correct: [0],
      explanation:
        'Metaspace, introduced in Java 8, replaced the older PermGen (Permanent Generation) region, which lived inside the regular heap with a typically small, awkward-to-size fixed maximum and was a notoriously common source of OutOfMemoryError: PermGen space in applications that loaded many classes dynamically (heavy use of frameworks generating proxy classes at runtime, for instance). Metaspace stores the same kind of data PermGen did — class metadata: method bytecode references, field/method info, constant pool data, and similar structural information about loaded classes — but crucially lives in native (off-heap) memory and, by default, grows dynamically as needed rather than hitting a small fixed ceiling, which largely (though not entirely, since it can still be capped and still exhausted) eliminated that specific class of OutOfMemoryError. It does not store actual object instances (that is the heap\'s job) and has nothing specifically to do with constants or thread stacks.',
      ru: {
        question: 'Какова цель области "Metaspace" (Java 8+)?',
        options: [
          'Хранит метаданные классов (заменяя PermGen) и по умолчанию растёт в нативной памяти',
          'Хранит экземпляры объектов',
          'Хранит только статические final-константы',
          'Хранит стеки потоков',
        ],
        explanation:
          'Metaspace, появившееся в Java 8, заменило более старую область PermGen (Permanent Generation), которая находилась внутри обычной кучи с обычно небольшим, неудобным для настройки фиксированным максимумом и была печально известным частым источником OutOfMemoryError: PermGen space в приложениях, динамически загружающих много классов (например, интенсивное использование фреймворков, генерирующих прокси-классы во время выполнения). Metaspace хранит те же данные, что и PermGen — метаданные классов: ссылки на байт-код методов, информацию о полях/методах, данные пула констант и подобную структурную информацию о загруженных классах — но принципиально живёт в нативной (вне кучи) памяти и по умолчанию растёт динамически по мере необходимости, а не упирается в маленький фиксированный потолок, что во многом (хотя и не полностью, поскольку её всё ещё можно ограничить и всё ещё можно исчерпать) устранило этот конкретный класс OutOfMemoryError. Она не хранит реальные экземпляры объектов (это задача кучи) и никак специально не связана с константами или стеками потоков.',
      },
    },
    {
      q: 'Which garbage collector is often the default in modern JVMs (Java 9+) for general-purpose workloads?',
      options: ['G1 (Garbage-First) GC', 'Serial GC', 'Epsilon GC', 'Shenandoah GC'],
      correct: [0],
      explanation:
        'G1 (Garbage-First) became the default garbage collector starting with Java 9, replacing the Parallel Collector that had been default before it. G1\'s core design idea is dividing the heap into many small, equally-sized regions rather than a few large contiguous generational spaces, and prioritizing collection of the regions containing the most garbage first ("garbage first") — this lets it target a configurable maximum pause-time goal and generally deliver more predictable, shorter pauses than older collectors, which is exactly why it became the sensible default for most general-purpose server applications. Serial GC (single-threaded, simple, meant for small heaps/single-core environments) and Epsilon GC (a genuinely "no-op" collector that never reclaims memory at all, meant for very specific testing/benchmarking scenarios) are both niche, non-default choices, and Shenandoah is a separate, alternative low-pause collector (originally from Red Hat) available but not the default.',
      ru: {
        question: 'Какой сборщик мусора часто используется по умолчанию в современных JVM (Java 9+) для типовых нагрузок?',
        options: ['G1 (Garbage-First) GC', 'Serial GC', 'Epsilon GC', 'Shenandoah GC'],
        explanation:
          'G1 (Garbage-First) стал сборщиком мусора по умолчанию начиная с Java 9, заменив Parallel Collector, который был по умолчанию до него. Основная идея дизайна G1 — разбить кучу на множество маленьких, равных по размеру регионов, а не на несколько больших непрерывных поколенческих областей, и приоритизировать сборку регионов, содержащих больше всего мусора, в первую очередь ("garbage first") — это позволяет ему нацеливаться на настраиваемую максимальную цель по времени паузы и в целом давать более предсказуемые, короткие паузы, чем более старые сборщики, именно поэтому он стал разумным выбором по умолчанию для большинства серверных приложений общего назначения. Serial GC (однопоточный, простой, предназначен для малых куч/однопроцессорных окружений) и Epsilon GC (по-настоящему "холостой" сборщик, вообще никогда не освобождающий память, предназначен для очень специфичных сценариев тестирования/бенчмарков) — оба нишевые, не выбираемые по умолчанию варианты, а Shenandoah — отдельный, альтернативный сборщик с низкими паузами (изначально от Red Hat), доступный, но не являющийся сборщиком по умолчанию.',
      },
    },
    {
      q: 'In `void process() { int count = 5; User u = new User(); }`, where do `count` and the object referenced by `u` live in memory?',
      options: [
        'count lives on the thread\'s stack (as a local variable); the User object lives on the heap, with u itself (the reference) stored on the stack',
        'Both count and the User object live entirely on the stack',
        'Both count and the User object live entirely on the heap',
        'count lives on the heap; the User object lives on the stack',
      ],
      correct: [0],
      variantGroup: 'interview-stack-vs-heap',
      explanation:
        'Local variables of primitive type, like count, are stored directly in the current method\'s stack frame and are cleaned up automatically the instant that frame is popped when the method returns. Objects created with `new` are always allocated on the heap, a shared memory area managed by the garbage collector — a reference variable like `u` is itself just a local variable, so the reference (essentially an address) lives on the stack, while the actual User object it points to lives on the heap. This is exactly why local primitives never need garbage collection but objects do — once nothing reachable from any stack still references a heap object, it becomes eligible for collection.',
      ru: {
        question: 'В `void process() { int count = 5; User u = new User(); }`, где в памяти хранятся count и объект, на который ссылается u?',
        options: [
          'count хранится в стеке потока (как локальная переменная); объект User хранится в куче, а сама u (ссылка) — в стеке',
          'И count, и объект User целиком хранятся в стеке',
          'И count, и объект User целиком хранятся в куче',
          'count хранится в куче; объект User хранится в стеке',
        ],
        explanation:
          'Локальные переменные примитивного типа, как count, хранятся прямо во фрейме стека текущего метода и автоматически очищаются в момент, когда этот фрейм снимается при возврате из метода. Объекты, созданные через `new`, всегда размещаются в куче — общей области памяти, которой управляет сборщик мусора; переменная-ссылка вроде `u` сама по себе — это просто локальная переменная, поэтому сама ссылка (по сути адрес) хранится в стеке, а сам объект User, на который она указывает, хранится в куче. Именно поэтому локальным примитивам никогда не нужна сборка мусора, а объектам — нужна: как только ни из одного стека объект в куче больше не достижим, он становится кандидатом на сборку.',
      },
    },
    {
      q: 'In `void register() { double price = 19.99; Order o = new Order(); }`, where do `price` and the object referenced by `o` live in memory?',
      options: [
        'price lives on the thread\'s stack (as a local variable); the Order object lives on the heap, with o itself (the reference) stored on the stack',
        'Both price and the Order object live entirely on the stack',
        'Both price and the Order object live entirely on the heap',
        'price lives on the heap; the Order object lives on the stack',
      ],
      correct: [0],
      variantGroup: 'interview-stack-vs-heap',
      explanation:
        'The same split applies regardless of variable names or types: price, a local primitive, is stored directly in the current stack frame and disappears automatically when that frame is popped. The Order object created with `new` is allocated on the heap, and `o` is itself just a local reference variable — the reference (an address pointing at the heap object) lives on the stack, while the Order instance it points to lives on the heap. This is a core memory-model fact interviewers expect regardless of which specific example is used to illustrate it.',
      ru: {
        question: 'В `void register() { double price = 19.99; Order o = new Order(); }`, где в памяти хранятся price и объект, на который ссылается o?',
        options: [
          'price хранится в стеке потока (как локальная переменная); объект Order хранится в куче, а сама o (ссылка) — в стеке',
          'И price, и объект Order целиком хранятся в стеке',
          'И price, и объект Order целиком хранятся в куче',
          'price хранится в куче; объект Order хранится в стеке',
        ],
        explanation:
          'То же самое разделение действует независимо от имён и типов переменных: price, локальный примитив, хранится прямо во фрейме текущего стека и исчезает автоматически, когда этот фрейм снимается. Объект Order, созданный через `new`, размещается в куче, а `o` сама по себе — просто локальная переменная-ссылка: сама ссылка (адрес, указывающий на объект в куче) хранится в стеке, а сам экземпляр Order, на который она указывает, хранится в куче. Это базовый факт модели памяти, который интервьюеры ожидают знать независимо от того, на каком конкретном примере он проиллюстрирован.',
      },
    },
  ],
  'spring-basics': [
    {
      q: 'What is Dependency Injection in Spring?',
      options: [
        "A pattern where the framework supplies an object's dependencies rather than the object creating them itself, promoting loose coupling",
        'A way to inject SQL queries into code',
        'A method for compiling Java code faster',
        'A design pattern for exception handling',
      ],
      correct: [0],
      explanation:
        'Without dependency injection, an object that needs a collaborator (say, a service needing a repository) typically constructs that collaborator itself directly (`new SomeRepository()`), which tightly couples the two classes and makes swapping in a different implementation or a test double genuinely painful. Dependency Injection inverts that: the object simply declares what it needs (through a constructor parameter, a setter, or a field), and an external container — Spring\'s IoC (Inversion of Control) container — is responsible for constructing that dependency and "injecting" it into the object at creation time. This is the foundational idea the entire Spring Framework is built around, and interviewers frequently expect a candidate to be able to name the practical benefits clearly: easier unit testing (swap in a mock), looser coupling between classes, and centralized configuration of how objects are wired together.',
      ru: {
        question: 'Что такое Dependency Injection (внедрение зависимостей) в Spring?',
        options: [
          'Паттерн, при котором фреймворк сам предоставляет объекту его зависимости, вместо того чтобы объект создавал их сам — это снижает связанность',
          'Способ внедрять SQL-запросы в код',
          'Метод более быстрой компиляции Java-кода',
          'Паттерн проектирования для обработки исключений',
        ],
        explanation:
          'Без внедрения зависимостей объект, которому нужен сотрудничающий объект (скажем, сервису нужен репозиторий), обычно сам напрямую конструирует этого сотрудника (`new SomeRepository()`), что тесно связывает два класса и делает замену на другую реализацию или тестовый дублёр по-настоящему болезненной. Dependency Injection переворачивает это: объект просто объявляет, что ему нужно (через параметр конструктора, сеттер или поле), а внешний контейнер — IoC-контейнер (Inversion of Control) Spring — отвечает за конструирование этой зависимости и "внедрение" её в объект в момент создания. Это основополагающая идея, вокруг которой построен весь Spring Framework, и интервьюеры часто ожидают, что кандидат сможет чётко назвать практические выгоды: упрощение модульного тестирования (подставить мок), более слабую связанность между классами и централизованную настройку того, как объекты соединяются друг с другом.',
      },
    },
    {
      q: 'What does the `@Autowired` annotation do?',
      options: [
        'Tells Spring to automatically inject a matching bean into the annotated field, constructor, or setter',
        'Marks a class as a REST controller',
        'Creates a new database connection',
        'Starts the Spring application context manually',
      ],
      correct: [0],
      explanation:
        '@Autowired tells the Spring container "find a bean of the right type in the application context and inject it here" — it can be placed on a field, a setter method, or (most commonly recommended in modern Spring) a constructor parameter. Spring resolves it primarily by type, and if there are multiple beans of the same type available, it falls back to matching by field/parameter name or requires an explicit @Qualifier annotation to disambiguate which specific bean to use. A good interview follow-up worth being ready for is why constructor injection is generally preferred over field injection: it makes dependencies explicit and immutable (final fields), makes the class easier to unit test without needing Spring at all (just call the constructor directly with mocks), and it fails fast at construction time if a required dependency is missing, rather than allowing a half-initialized object to exist.',
      ru: {
        question: 'Что делает аннотация `@Autowired`?',
        options: [
          'Указывает Spring автоматически внедрить подходящий бин в помеченное поле, конструктор или сеттер',
          'Помечает класс как REST-контроллер',
          'Создаёт новое соединение с базой данных',
          'Запускает Spring application context вручную',
        ],
        explanation:
          '@Autowired говорит контейнеру Spring "найди бин нужного типа в application context и внедри его сюда" — её можно разместить на поле, методе-сеттере, или (наиболее рекомендуемо в современном Spring) на параметре конструктора. Spring разрешает её в основном по типу, и если доступно несколько бинов одного типа, он прибегает к сопоставлению по имени поля/параметра или требует явную аннотацию @Qualifier, чтобы уточнить, какой конкретно бин использовать. Хороший уточняющий вопрос на собеседовании, к которому стоит быть готовым: почему внедрение через конструктор обычно предпочтительнее внедрения через поле — оно делает зависимости явными и неизменяемыми (final-поля), упрощает модульное тестирование класса вообще без Spring (просто вызвать конструктор напрямую с моками), и оно "быстро падает" в момент конструирования, если нужная зависимость отсутствует, а не позволяет существовать наполовину инициализированному объекту.',
      },
    },
    {
      q: 'What is the default scope of a Spring bean?',
      options: ['singleton', 'prototype', 'request', 'session'],
      correct: [0],
      explanation:
        'Unless explicitly configured otherwise, Spring creates exactly one shared instance of a bean per application context and hands out that same instance every time it is injected or requested — this is the singleton scope, and it is the default. This is a Spring-container-level singleton, distinct from the classic Gang-of-Four Singleton design pattern (which enforces true JVM-wide single-instance-ness through private constructors); a Spring "singleton" bean simply means one instance per container, and nothing stops a different context or a manually-constructed instance from existing alongside it. prototype scope creates a brand-new instance every single time the bean is requested, and request/session scopes are web-specific, tying a bean\'s lifecycle to a single HTTP request or a user\'s HTTP session respectively — knowing when to reach for something other than the default singleton (typically for beans holding mutable, request-specific state) is a common practical interview topic.',
      ru: {
        question: 'Каков scope (область видимости) Spring-бина по умолчанию?',
        options: ['singleton', 'prototype', 'request', 'session'],
        explanation:
          'Если явно не настроено иначе, Spring создаёт ровно один общий экземпляр бина на весь application context и выдаёт именно этот экземпляр каждый раз, когда он внедряется или запрашивается — это scope singleton, и он используется по умолчанию. Это singleton на уровне контейнера Spring, отличный от классического паттерна проектирования Singleton "Банды четырёх" (который навязывает истинную единственность экземпляра на всю JVM через приватные конструкторы); "синглтон"-бин Spring просто означает один экземпляр на контейнер, и ничто не мешает существовать параллельно другому контексту или вручную сконструированному экземпляру. Scope prototype создаёт совершенно новый экземпляр каждый раз, когда бин запрашивается, а scope request/session специфичны для веба, привязывая жизненный цикл бина соответственно к одному HTTP-запросу или пользовательской HTTP-сессии — знать, когда обратиться к чему-то помимо singleton по умолчанию (обычно для бинов, хранящих изменяемое, специфичное для запроса состояние), — распространённая практическая тема собеседования.',
      },
    },
    {
      q: 'What annotation is used to define a REST endpoint that returns JSON in Spring Boot?',
      options: ['@RestController (combined with @GetMapping etc.)', '@Entity', '@Repository', '@Configuration'],
      correct: [0],
      explanation:
        '@RestController is a convenience annotation that combines @Controller (marking the class as a Spring MVC controller, capable of handling web requests) with @ResponseBody (telling Spring to serialize whatever a handler method returns — typically to JSON, via a message converter like Jackson — directly into the HTTP response body, instead of treating the return value as a view name to render). Method-level annotations like @GetMapping, @PostMapping, and so on then map specific HTTP methods and URL paths to individual handler methods within that controller. @Entity marks a class as a JPA-persisted database entity (an entirely different, persistence-layer concern), @Repository marks a class as a data-access component (also triggering Spring\'s exception translation for persistence exceptions), and @Configuration marks a class as a source of bean definitions — none of these three relate to defining a web-facing REST endpoint.',
      ru: {
        question: 'Какая аннотация используется для определения REST-эндпоинта, возвращающего JSON, в Spring Boot?',
        options: ['@RestController (в сочетании с @GetMapping и т.п.)', '@Entity', '@Repository', '@Configuration'],
        explanation:
          '@RestController — вспомогательная аннотация, объединяющая @Controller (помечает класс как контроллер Spring MVC, способный обрабатывать веб-запросы) с @ResponseBody (говорит Spring сериализовать то, что возвращает метод-обработчик — обычно в JSON, через конвертер сообщений вроде Jackson — прямо в тело HTTP-ответа, вместо того чтобы трактовать возвращаемое значение как имя представления для рендеринга). Аннотации уровня метода вроде @GetMapping, @PostMapping и так далее затем сопоставляют конкретные HTTP-методы и URL-пути отдельным методам-обработчикам внутри этого контроллера. @Entity помечает класс как персистентную JPA-сущность базы данных (совершенно другая забота уровня персистентности), @Repository помечает класс как компонент доступа к данным (также запускает трансляцию исключений Spring для исключений персистентности), а @Configuration помечает класс как источник определений бинов — ни одна из этих трёх не связана с определением веб-обращённого REST-эндпоинта.',
      },
    },
    {
      q: "What is the purpose of the Spring `ApplicationContext`?",
      options: [
        'It is the container that manages the lifecycle and configuration of beans (dependency injection container)',
        'It handles only HTTP routing',
        'It is a database connection pool',
        'It replaces the need for a build tool like Maven',
      ],
      correct: [0],
      explanation:
        'ApplicationContext is Spring\'s central IoC container interface — the thing responsible for reading bean configuration (whether from annotations, XML, or Java @Configuration classes), instantiating beans, resolving and injecting their dependencies in the correct order, managing each bean\'s configured scope and lifecycle (calling initialization and destruction callbacks at the right moments), and generally acting as the single source of truth for "what objects exist in this application and how are they wired together." It extends the more basic BeanFactory interface with additional enterprise features like event publishing, internationalization support, and easier integration with Spring\'s AOP features. It has nothing to do with HTTP routing specifically (that is handled by DispatcherServlet and controller mappings, which themselves are beans living inside the ApplicationContext), is unrelated to database connection pooling (a separate concern, typically configured as its own bean, like a DataSource), and is a runtime concept entirely distinct from build tools like Maven or Gradle, which operate before the application even starts running.',
      ru: {
        question: "Какова цель `ApplicationContext` в Spring?",
        options: [
          'Это контейнер, управляющий жизненным циклом и конфигурацией бинов (контейнер внедрения зависимостей)',
          'Он занимается только маршрутизацией HTTP',
          'Это пул соединений с базой данных',
          'Он заменяет необходимость в инструменте сборки вроде Maven',
        ],
        explanation:
          'ApplicationContext — центральный интерфейс IoC-контейнера Spring — то, что отвечает за чтение конфигурации бинов (будь то из аннотаций, XML или Java-классов @Configuration), инстанцирование бинов, разрешение и внедрение их зависимостей в правильном порядке, управление настроенным scope и жизненным циклом каждого бина (вызов колбэков инициализации и уничтожения в нужные моменты), и в целом выступает единым источником истины о том, "какие объекты существуют в этом приложении и как они соединены между собой". Он расширяет более базовый интерфейс BeanFactory дополнительными корпоративными возможностями вроде публикации событий, поддержки интернационализации и более простой интеграции с возможностями AOP Spring. Он никак не связан именно с маршрутизацией HTTP (этим занимается DispatcherServlet и маппинги контроллеров, которые сами являются бинами, живущими внутри ApplicationContext), не связан с пулом соединений базы данных (отдельная забота, обычно настраиваемая как собственный бин, вроде DataSource), и является концепцией времени выполнения, совершенно отличной от инструментов сборки вроде Maven или Gradle, которые работают ещё до того, как приложение вообще начинает выполняться.',
      },
    },
    {
      q: 'What does `@Transactional` typically do when applied to a service method?',
      options: [
        'Wraps the method execution in a database transaction, committing on success and rolling back on runtime exceptions by default',
        'Makes the method run asynchronously',
        "Caches the method's return value",
        'Logs the method execution time',
      ],
      correct: [0],
      explanation:
        '@Transactional relies on Spring\'s AOP-based proxying mechanism: when a bean method annotated @Transactional is called, Spring intercepts that call through a dynamically generated proxy, begins a database transaction before the real method body runs, lets the method execute, and then either commits the transaction if the method completes normally, or rolls it back if the method throws an unchecked (RuntimeException-based) exception — by default, checked exceptions do not trigger a rollback unless explicitly configured to via rollbackFor, which is a genuinely common interview gotcha worth knowing precisely. A frequently-tested practical detail: because this relies on a proxy intercepting the *external* call to the method, calling a @Transactional method from another method within the very same class (self-invocation, bypassing the proxy entirely) does not actually trigger transactional behavior — a subtlety that trips up even experienced developers and is a favorite "gotcha" interview question.',
      ru: {
        question: 'Что обычно делает `@Transactional`, применённая к методу сервиса?',
        options: [
          'Оборачивает выполнение метода в транзакцию БД, по умолчанию фиксируя её при успехе и откатывая при runtime-исключениях',
          'Заставляет метод выполняться асинхронно',
          'Кэширует возвращаемое значение метода',
          'Логирует время выполнения метода',
        ],
        explanation:
          '@Transactional опирается на механизм проксирования Spring на основе AOP: когда вызывается метод бина, помеченный @Transactional, Spring перехватывает этот вызов через динамически сгенерированный прокси, начинает транзакцию базы данных до выполнения реального тела метода, даёт методу выполниться, а затем либо фиксирует транзакцию, если метод завершился нормально, либо откатывает её, если метод выбросил непроверяемое (основанное на RuntimeException) исключение — по умолчанию проверяемые исключения не запускают откат, если это явно не настроено через rollbackFor, что действительно частая ловушка на собеседовании, которую стоит знать точно. Часто проверяемая практическая деталь: поскольку это опирается на прокси, перехватывающий именно *внешний* вызов метода, вызов @Transactional-метода из другого метода того же самого класса (самовызов, полностью минующий прокси) на самом деле не запускает транзакционное поведение — тонкость, на которой спотыкаются даже опытные разработчики, и любимый "подвох"-вопрос на собеседовании.',
      },
    },
    {
      q: 'Which two are valid Spring bean scopes? (Choose two)',
      options: ['singleton', 'prototype', 'static', 'volatile'],
      correct: [0, 1],
      explanation:
        'singleton and prototype are two of Spring\'s core, container-agnostic bean scopes — singleton (the default) providing one shared instance per container, prototype providing a fresh new instance on every request for the bean; web-aware application contexts add further scopes like request and session on top of these two. static and volatile are entirely unrelated Java language keywords (static controls whether a member belongs to the class versus an instance; volatile is a concurrency-related field modifier affecting visibility across threads) — neither has anything to do with Spring\'s bean scope configuration, and this kind of question specifically tests whether a candidate can distinguish genuine framework-level concepts from similarly-named or vaguely-related core-language features.',
      ru: {
        question: 'Какие два являются допустимыми scope-ами Spring-бина? (Выберите два)',
        options: ['singleton', 'prototype', 'static', 'volatile'],
        explanation:
          'singleton и prototype — два основных, независимых от контейнера scope бинов Spring — singleton (по умолчанию) предоставляет один общий экземпляр на контейнер, prototype предоставляет новый экземпляр при каждом запросе бина; веб-осведомлённые application context добавляют к ним ещё scope вроде request и session. static и volatile — совершенно не связанные ключевые слова языка Java (static контролирует, принадлежит ли член классу или экземпляру; volatile — модификатор поля, связанный с конкурентностью, влияющий на видимость между потоками) — ни один из них никак не связан с настройкой scope бина Spring, и такой вопрос специально проверяет, может ли кандидат отличить настоящие концепции уровня фреймворка от похоже названных или отдалённо связанных базовых возможностей языка.',
      },
    },
    {
      q: 'Two different Spring-managed classes each have `@Autowired private UserService userService;`, and UserService is a default-scoped (singleton) bean. Are the two injected userService instances the same object?',
      options: [
        'Yes — singleton scope means the container creates exactly one instance of UserService per container, and injects that same instance everywhere it\'s needed',
        'No — Spring creates a new instance for every @Autowired injection point',
        'Only if both classes are in the same package',
        'It depends on which one was instantiated first; the other gets a stale copy',
      ],
      correct: [0],
      variantGroup: 'interview-spring-singleton-scope',
      explanation:
        'singleton is Spring\'s default bean scope: the container creates exactly one instance of a given bean per application context (typically at startup, or lazily on first use), and every injection point — via @Autowired, constructor injection, or otherwise — receives a reference to that exact same shared instance. This is why singleton-scoped beans should generally be stateless, or otherwise use thread-safe internal state, since many unrelated parts of the application (and potentially many concurrent request threads) all share the one instance. Prototype scope is the alternative that hands out a brand-new instance per injection/request — the behavior a common wrong guess mistakenly assumes singleton also provides.',
      ru: {
        question: 'У двух разных Spring-управляемых классов есть `@Autowired private UserService userService;`, и UserService — бин со scope-ом по умолчанию (singleton). Являются ли два внедрённых экземпляра userService одним и тем же объектом?',
        options: [
          'Да — scope singleton означает, что контейнер создаёт ровно один экземпляр UserService на контейнер и внедряет именно этот экземпляр везде, где он нужен',
          'Нет — Spring создаёт новый экземпляр для каждой точки внедрения @Autowired',
          'Только если оба класса находятся в одном пакете',
          'Зависит от того, какой из них был создан первым — второй получит устаревшую копию',
        ],
        explanation:
          'singleton — scope Spring-бинов по умолчанию: контейнер создаёт ровно один экземпляр данного бина на application context (обычно при старте, либо лениво при первом использовании), и каждая точка внедрения — через @Autowired, внедрение через конструктор или иначе — получает ссылку ровно на этот же общий экземпляр. Именно поэтому бины со scope-ом singleton обычно должны быть без состояния либо использовать потокобезопасное внутреннее состояние, ведь множество не связанных друг с другом частей приложения (и потенциально множество параллельных потоков запросов) разделяют один и тот же экземпляр. Scope prototype — альтернатива, выдающая совершенно новый экземпляр на каждое внедрение/запрос — именно такое поведение ошибочно приписывают и singleton при неверной догадке.',
      },
    },
    {
      q: 'Two different Spring-managed controllers each have `@Autowired private EmailService emailService;`, and EmailService is a default-scoped (singleton) bean. Are the two injected emailService instances the same object?',
      options: [
        'Yes — singleton scope means the container creates exactly one instance of EmailService per container, and injects that same instance everywhere it\'s needed',
        'No — Spring creates a new instance for every @Autowired injection point',
        'Only if both controllers are in the same package',
        'It depends on which one was instantiated first; the other gets a stale copy',
      ],
      correct: [0],
      variantGroup: 'interview-spring-singleton-scope',
      explanation:
        'The same singleton contract applies regardless of which bean or which classes are involved: Spring\'s default scope guarantees exactly one shared EmailService instance per application context, handed out identically to both controllers via @Autowired. Package membership plays no role in this at all — bean scope is a container-level configuration, entirely unrelated to Java package structure. As with any singleton bean, this shared-instance behavior is exactly why any mutable state inside EmailService needs to be handled carefully (or avoided) to stay safe under concurrent use from multiple controllers/threads.',
      ru: {
        question: 'У двух разных Spring-управляемых контроллеров есть `@Autowired private EmailService emailService;`, и EmailService — бин со scope-ом по умолчанию (singleton). Являются ли два внедрённых экземпляра emailService одним и тем же объектом?',
        options: [
          'Да — scope singleton означает, что контейнер создаёт ровно один экземпляр EmailService на контейнер и внедряет именно этот экземпляр везде, где он нужен',
          'Нет — Spring создаёт новый экземпляр для каждой точки внедрения @Autowired',
          'Только если оба контроллера находятся в одном пакете',
          'Зависит от того, какой из них был создан первым — второй получит устаревшую копию',
        ],
        explanation:
          'Тот же контракт singleton действует независимо от того, какой именно бин и какие классы задействованы: scope по умолчанию в Spring гарантирует ровно один общий экземпляр EmailService на application context, выдаваемый одинаково обоим контроллерам через @Autowired. Принадлежность к пакету здесь вообще не играет роли — scope бина это настройка на уровне контейнера, никак не связанная со структурой пакетов Java. Как и с любым singleton-бином, такое поведение общего экземпляра — именно причина, почему любое изменяемое состояние внутри EmailService нужно аккуратно обрабатывать (или избегать его), чтобы оставаться безопасным при параллельном использовании из нескольких контроллеров/потоков.',
      },
    },
  ],
  'sql-databases': [
    {
      q: 'What is the difference between INNER JOIN and LEFT JOIN?',
      options: [
        'INNER JOIN returns only matching rows from both tables; LEFT JOIN returns all rows from the left table plus matches from the right (NULLs if none)',
        'They always return the same result',
        "LEFT JOIN excludes the left table's unmatched rows",
        'INNER JOIN is only used with a single table',
      ],
      correct: [0],
      explanation:
        'INNER JOIN only includes a row in the result when the join condition finds a match on both sides of the two tables involved — any row from either table with no corresponding match on the other side is simply excluded entirely. LEFT (OUTER) JOIN is more permissive toward the "left" table specifically: it guarantees every row from the left table appears in the result at least once, regardless of whether a match exists in the right table, and for any left-table row with no matching right-table row, the columns coming from the right table are simply filled in with NULL rather than the row being dropped. This distinction is one of the single most common practical SQL interview questions, since choosing the wrong join type is a frequent, subtle source of "missing rows" bugs in real reporting queries.',
      ru: {
        question: 'В чём разница между INNER JOIN и LEFT JOIN?',
        options: [
          'INNER JOIN возвращает только совпадающие строки из обеих таблиц; LEFT JOIN возвращает все строки левой таблицы плюс совпадения из правой (NULL, если совпадений нет)',
          'Они всегда возвращают одинаковый результат',
          'LEFT JOIN исключает несовпавшие строки левой таблицы',
          'INNER JOIN используется только с одной таблицей',
        ],
        explanation:
          'INNER JOIN включает строку в результат, только когда условие соединения находит совпадение с обеих сторон двух участвующих таблиц — любая строка из любой таблицы без соответствующего совпадения с другой стороны просто полностью исключается. LEFT (OUTER) JOIN более снисходителен именно к "левой" таблице: он гарантирует, что каждая строка левой таблицы появится в результате хотя бы раз, независимо от того, есть ли совпадение в правой таблице, а для любой строки левой таблицы без соответствующей строки в правой столбцы из правой таблицы просто заполняются NULL, вместо того чтобы строка была отброшена. Это различие — один из самых частых практических вопросов о SQL на собеседовании, поскольку выбор не того типа соединения — частый, тонкий источник ошибок с "пропавшими строками" в реальных отчётных запросах.',
      },
    },
    {
      q: 'What does a database index primarily improve?',
      options: [
        'Read/query performance by allowing faster lookups, at the cost of some write overhead',
        'Write performance only',
        'Data consistency',
        'Automatically normalizes tables',
      ],
      correct: [0],
      explanation:
        'A database index is a separate, ordered data structure (typically a B-tree) built on one or more columns, which lets the database engine locate matching rows via something closer to a fast lookup (or an efficient range scan) rather than scanning every row in the table sequentially (a "full table scan") to find the ones that match a query\'s WHERE clause or JOIN condition. This dramatically speeds up read queries filtering or joining on the indexed column(s), but it is never free: every INSERT, UPDATE, or DELETE affecting an indexed column must also update the index structure itself, which adds measurable write overhead — a genuinely important trade-off interviewers expect a mid-level candidate to articulate, since indiscriminately indexing every column is itself a common real-world mistake. Indexes affect performance, not data consistency (that is the job of constraints and transactions) and have no bearing on normalization (a separate, schema-design-level concept).',
      ru: {
        question: 'Что в первую очередь улучшает индекс базы данных?',
        options: [
          'Производительность чтения/запросов за счёт более быстрого поиска, ценой некоторых накладных расходов при записи',
          'Только производительность записи',
          'Целостность данных',
          'Автоматически нормализует таблицы',
        ],
        explanation:
          'Индекс базы данных — отдельная, упорядоченная структура данных (обычно B-дерево), построенная на одном или нескольких столбцах, позволяющая движку базы данных находить подходящие строки чем-то ближе к быстрому поиску (или эффективному сканированию диапазона), а не последовательному сканированию каждой строки таблицы ("полное сканирование таблицы") для нахождения тех, что удовлетворяют условию WHERE запроса или условию JOIN. Это резко ускоряет запросы на чтение, фильтрующие или соединяющие по проиндексированным столбцам, но это никогда не бесплатно: каждый INSERT, UPDATE или DELETE, затрагивающий проиндексированный столбец, должен также обновить саму структуру индекса, что добавляет ощутимые накладные расходы на запись — действительно важный компромисс, который интервьюеры ожидают от кандидата уровня middle сформулировать чётко, поскольку бездумное индексирование каждого столбца само по себе частая реальная ошибка. Индексы влияют на производительность, а не на целостность данных (это задача ограничений и транзакций) и никак не связаны с нормализацией (отдельное понятие уровня проектирования схемы).',
      },
    },
    {
      q: 'What is database normalization primarily used to reduce?',
      options: [
        'Data redundancy and improve data integrity by organizing tables and relationships',
        'Query execution time only',
        'The number of tables in a database',
        'The need for primary keys',
      ],
      correct: [0],
      explanation:
        'Normalization is a systematic set of rules (the normal forms, typically 1NF through 3NF or BCNF in practical work) for organizing a schema so that each piece of information is stored in exactly one logical place, rather than being duplicated across multiple rows or tables — this eliminates so-called update anomalies, where the same fact stored in several places could be updated in one and forgotten in another, leaving the database internally inconsistent. Applying normalization typically increases the number of tables (splitting a wide, redundant table into several smaller, related ones connected by foreign keys), the exact opposite of "reducing tables," and while well-normalized data can indirectly help some queries, normalization\'s primary goal is data integrity, not raw query speed — in fact, heavily normalized schemas sometimes require more JOINs and can be intentionally denormalized in read-heavy systems specifically to trade some redundancy for query performance, a nuance worth mentioning to show deeper understanding.',
      ru: {
        question: 'Для чего в первую очередь используется нормализация базы данных?',
        options: [
          'Чтобы снизить избыточность данных и повысить целостность данных за счёт правильной организации таблиц и связей',
          'Только чтобы ускорить выполнение запросов',
          'Чтобы уменьшить количество таблиц в базе данных',
          'Чтобы уменьшить потребность в первичных ключах',
        ],
        explanation:
          'Нормализация — систематический набор правил (нормальные формы, обычно от 1НФ до 3НФ или НФБК на практике) для организации схемы так, чтобы каждый факт хранился ровно в одном логическом месте, а не дублировался по нескольким строкам или таблицам — это устраняет так называемые аномалии обновления, когда один и тот же факт, хранимый в нескольких местах, может быть обновлён в одном и забыт в другом, оставляя базу данных внутренне несогласованной. Применение нормализации обычно увеличивает число таблиц (разбивая широкую, избыточную таблицу на несколько меньших, связанных внешними ключами), что прямо противоположно "уменьшению таблиц", и хотя хорошо нормализованные данные могут косвенно помогать некоторым запросам, главная цель нормализации — целостность данных, а не сырая скорость запросов — на самом деле сильно нормализованные схемы иногда требуют больше JOIN и могут быть намеренно денормализованы в системах с интенсивным чтением специально ради обмена части избыточности на производительность запросов, нюанс, который стоит упомянуть, чтобы показать более глубокое понимание.',
      },
    },
    {
      q: 'What does the SQL `GROUP BY` clause do?',
      options: [
        'Groups rows sharing the same values in specified columns so aggregate functions can be applied per group',
        'Sorts rows alphabetically',
        'Removes duplicate rows only',
        'Filters rows before aggregation',
      ],
      correct: [0],
      explanation:
        'GROUP BY partitions the result set into buckets, one bucket for every distinct combination of values found in the grouped column(s), and it is specifically designed to be used together with an aggregate function (COUNT, SUM, AVG, MIN, MAX) in the SELECT list, which then computes across each bucket independently rather than across the whole table — a query like `SELECT department, COUNT(*) FROM employees GROUP BY department` produces one row per distinct department, each showing the count of employees in just that department. It has nothing inherently to do with sorting output order (that is ORDER BY\'s job, though many databases happen to return grouped results in a sorted-looking order as an implementation detail, which should never be relied upon), does not merely deduplicate rows (that overlaps with, but is a different tool from, SELECT DISTINCT), and specifically operates on rows *after* any WHERE-clause filtering has already happened, not before.',
      ru: {
        question: 'Что делает конструкция SQL `GROUP BY`?',
        options: [
          'Группирует строки с одинаковыми значениями в указанных столбцах, чтобы применить агрегатные функции к каждой группе',
          'Сортирует строки по алфавиту',
          'Только удаляет дублирующиеся строки',
          'Фильтрует строки перед агрегацией',
        ],
        explanation:
          'GROUP BY разбивает результирующий набор на "корзины", по одной на каждую отличную комбинацию значений, найденную в группируемых столбцах, и специально предназначена для использования вместе с агрегатной функцией (COUNT, SUM, AVG, MIN, MAX) в списке SELECT, которая затем вычисляется по каждой корзине независимо, а не по всей таблице — запрос вроде `SELECT department, COUNT(*) FROM employees GROUP BY department` производит по одной строке на каждый отдельный отдел, каждая показывает число сотрудников именно в этом отделе. Это никак принципиально не связано с сортировкой порядка вывода (это задача ORDER BY, хотя многие базы данных случайно возвращают сгруппированные результаты в вид, похожий на отсортированный, как деталь реализации, на которую никогда не следует полагаться), не просто удаляет дубликаты строк (это пересекается с, но является другим инструментом, чем SELECT DISTINCT), и конкретно работает со строками *после* того, как уже произошла фильтрация по WHERE, а не до неё.',
      },
    },
    {
      q: 'What is a primary key constraint used for?',
      options: [
        'Uniquely identifying each row in a table; it cannot contain NULL values and must be unique',
        'Allowing duplicate rows',
        'Linking two unrelated tables',
        'Storing large binary data',
      ],
      correct: [0],
      explanation:
        'A primary key is a column (or combination of columns) that a table designates as its unique row identifier, and the database enforces two strict rules around it automatically: every value must be unique across all rows (no two rows can share the same primary key value), and no value can ever be NULL (a NULL, meaning "unknown," could never reliably identify a specific row). Primary keys are also what foreign keys in other tables typically reference to establish a relationship (a foreign key column in one table holding the primary key value of a related row in another table) — but the primary key constraint itself is about identity and uniqueness within its own table, not about linking two tables together, which is the foreign key\'s job specifically.',
      ru: {
        question: 'Для чего используется ограничение первичного ключа?',
        options: [
          'Для уникальной идентификации каждой строки в таблице; он не может содержать NULL и должен быть уникальным',
          'Чтобы разрешить дублирующиеся строки',
          'Чтобы связать две несвязанные таблицы',
          'Чтобы хранить большие бинарные данные',
        ],
        explanation:
          'Первичный ключ — столбец (или сочетание столбцов), который таблица назначает своим уникальным идентификатором строки, и база данных автоматически навязывает вокруг него два строгих правила: каждое значение должно быть уникальным среди всех строк (никакие две строки не могут иметь одинаковое значение первичного ключа), и значение никогда не может быть NULL (NULL, означающий "неизвестно", никогда не смог бы надёжно идентифицировать конкретную строку). Первичные ключи также обычно то, на что ссылаются внешние ключи в других таблицах, устанавливая связь (столбец внешнего ключа в одной таблице хранит значение первичного ключа связанной строки в другой таблице) — но само ограничение первичного ключа про идентичность и уникальность внутри своей собственной таблицы, а не про связывание двух таблиц вместе, это конкретно задача внешнего ключа.',
      },
    },
    {
      q: 'What is the difference between `WHERE` and `HAVING` clauses?',
      options: [
        'WHERE filters rows before grouping; HAVING filters groups after aggregation',
        'They are functionally identical',
        'HAVING is used before GROUP BY, WHERE after',
        'WHERE only works with numeric columns',
      ],
      correct: [0],
      explanation:
        'A SQL query with grouping conceptually runs in stages: WHERE filters individual raw rows first, before any grouping or aggregation happens at all, so it cannot reference the result of an aggregate function like COUNT(*) or AVG(salary), since those have not been computed yet at that stage. GROUP BY then buckets the surviving rows, aggregate functions compute per-bucket values, and only after that does HAVING get a chance to filter — but HAVING filters entire *groups* based on conditions that can freely reference those aggregate results, for example `HAVING COUNT(*) > 5` to keep only groups with more than five rows. A common, genuinely useful mnemonic: WHERE works on individual rows before aggregation, HAVING works on aggregated groups after — trying to put an aggregate condition in WHERE is a classic SQL error that produces exactly the error message about aggregate functions not being allowed there.',
      ru: {
        question: 'В чём разница между конструкциями `WHERE` и `HAVING`?',
        options: [
          'WHERE фильтрует строки до группировки; HAVING фильтрует группы после агрегации',
          'Они функционально идентичны',
          'HAVING используется перед GROUP BY, а WHERE — после',
          'WHERE работает только с числовыми столбцами',
        ],
        explanation:
          'SQL-запрос с группировкой концептуально выполняется поэтапно: WHERE сначала фильтрует отдельные сырые строки, ещё до того, как вообще произойдёт группировка или агрегация, поэтому он не может ссылаться на результат агрегатной функции вроде COUNT(*) или AVG(salary), поскольку они на этом этапе ещё не вычислены. GROUP BY затем разбивает оставшиеся строки на корзины, агрегатные функции вычисляют значения по каждой корзине, и только после этого HAVING получает шанс отфильтровать — но HAVING фильтрует целые *группы* по условиям, которые могут свободно ссылаться на эти агрегатные результаты, например `HAVING COUNT(*) > 5`, чтобы оставить только группы с более чем пятью строками. Действительно полезная мнемоника: WHERE работает с отдельными строками до агрегации, HAVING работает с агрегированными группами после — попытка поместить агрегатное условие в WHERE — классическая ошибка SQL, дающая ровно то сообщение об ошибке, что агрегатные функции там не разрешены.',
      },
    },
    {
      q: 'Table orders has 10 rows, 2 of which have a NULL customer_id. Running `SELECT * FROM orders o INNER JOIN customers c ON o.customer_id = c.id`, how many of the original 10 order rows can appear in the result, at most?',
      options: [
        '8 — INNER JOIN only returns rows where the join condition matches, and NULL never equals anything, so the 2 orders with NULL customer_id are excluded',
        '10 — INNER JOIN always preserves every row from the left table',
        '0 — the query fails because customer_id is NULL for some rows',
        '12 — NULLs match every row in customers, duplicating them',
      ],
      correct: [0],
      variantGroup: 'interview-inner-join-null-fk',
      explanation:
        'INNER JOIN only includes row pairs where the join condition evaluates to true, and in SQL any comparison involving NULL (including `NULL = anything`) evaluates to unknown, never true. So the 2 orders whose customer_id is NULL can never satisfy `o.customer_id = c.id` against any row in customers, and they\'re silently dropped from the result — leaving at most 8 of the original 10 order rows represented (fewer still if any of the remaining 8 don\'t match a valid customer id either). A LEFT JOIN, by contrast, would keep all 10 orders regardless, filling in NULLs for the customer columns where there\'s no match — that INNER-vs-LEFT distinction around unmatched or NULL foreign keys is one of the most common SQL interview trip-ups.',
      ru: {
        question: 'Таблица orders содержит 10 строк, у 2 из них customer_id равен NULL. При выполнении `SELECT * FROM orders o INNER JOIN customers c ON o.customer_id = c.id`, сколько максимум из исходных 10 строк orders может попасть в результат?',
        options: [
          '8 — INNER JOIN возвращает только строки, где условие соединения выполняется, а NULL никогда ничему не равен, поэтому 2 заказа с NULL customer_id исключаются',
          '10 — INNER JOIN всегда сохраняет каждую строку из левой таблицы',
          '0 — запрос завершится ошибкой, потому что customer_id равен NULL у некоторых строк',
          '12 — NULL совпадает с каждой строкой в customers, дублируя их',
        ],
        explanation:
          'INNER JOIN включает только пары строк, для которых условие соединения истинно, а в SQL любое сравнение с участием NULL (в том числе `NULL = что угодно`) даёт unknown, никогда не true. Поэтому 2 заказа с NULL в customer_id никогда не смогут удовлетворить `o.customer_id = c.id` ни для одной строки customers, и они тихо выпадают из результата — оставляя максимум 8 из исходных 10 строк orders (ещё меньше, если у кого-то из оставшихся 8 тоже нет совпадающего id клиента). LEFT JOIN, напротив, сохранил бы все 10 заказов в любом случае, подставив NULL в столбцы клиента там, где совпадения нет — это различие INNER и LEFT в отношении несовпадающих или NULL внешних ключей — одна из самых частых ловушек на собеседованиях по SQL.',
      },
    },
    {
      q: 'Table employees has 20 rows, 3 of which have a NULL department_id. Running `SELECT * FROM employees e INNER JOIN departments d ON e.department_id = d.id`, how many of the original 20 employee rows can appear in the result, at most?',
      options: [
        '17 — INNER JOIN only returns rows where the join condition matches, and NULL never equals anything, so the 3 employees with NULL department_id are excluded',
        '20 — INNER JOIN always preserves every row from the left table',
        '0 — the query fails because department_id is NULL for some rows',
        '23 — NULLs match every row in departments, duplicating them',
      ],
      correct: [0],
      variantGroup: 'interview-inner-join-null-fk',
      explanation:
        'The same rule applies regardless of table/column names or row counts: `NULL = anything` is never true in SQL, so the 3 employees whose department_id is NULL can never match any row in departments via the join condition and are dropped from an INNER JOIN\'s result — leaving at most 17 of the original 20 rows represented. Swapping in a LEFT JOIN would keep all 20 employees, with NULLs filled in for the department columns of the 3 unmatched rows — the underlying lesson (INNER JOIN silently discards unmatched/NULL-foreign-key rows; LEFT JOIN preserves them) is identical to the orders/customers version of this question, just with different table names and numbers.',
      ru: {
        question: 'Таблица employees содержит 20 строк, у 3 из них department_id равен NULL. При выполнении `SELECT * FROM employees e INNER JOIN departments d ON e.department_id = d.id`, сколько максимум из исходных 20 строк employees может попасть в результат?',
        options: [
          '17 — INNER JOIN возвращает только строки, где условие соединения выполняется, а NULL никогда ничему не равен, поэтому 3 сотрудника с NULL department_id исключаются',
          '20 — INNER JOIN всегда сохраняет каждую строку из левой таблицы',
          '0 — запрос завершится ошибкой, потому что department_id равен NULL у некоторых строк',
          '23 — NULL совпадает с каждой строкой в departments, дублируя их',
        ],
        explanation:
          'То же самое правило действует независимо от названий таблиц/столбцов или количества строк: `NULL = что угодно` никогда не равно true в SQL, поэтому 3 сотрудника с NULL в department_id никогда не смогут совпасть ни с одной строкой departments по условию соединения и выпадают из результата INNER JOIN — оставляя максимум 17 из исходных 20 строк. Замена на LEFT JOIN сохранила бы всех 20 сотрудников, подставив NULL в столбцы отдела для 3 несовпавших строк — базовый урок (INNER JOIN тихо отбрасывает несовпадающие/NULL строки внешнего ключа; LEFT JOIN их сохраняет) идентичен версии этого вопроса про orders/customers, просто с другими названиями таблиц и числами.',
      },
    },
  ],
  'git-vcs': [
    {
      q: 'What does `git rebase` do differently from `git merge`?',
      options: [
        'Rebase replays commits onto a new base, creating a linear history; merge creates a new merge commit combining histories',
        'They produce identical results always',
        'Rebase deletes commit history',
        'Merge is used only for tags',
      ],
      correct: [0],
      explanation:
        'git merge takes the tip commits of two branches and creates a new "merge commit" with two parents, one pointing back into each branch\'s history — this preserves the exact, literal history of when each branch diverged and how they came back together, but produces a graph with visible branching and merging points. git rebase instead takes the commits unique to one branch and literally replays each of them, one at a time as brand-new commits, on top of a different base (typically the current tip of another branch), producing a straight, linear sequence of commits with no merge commit and no visible branch structure at all in the result — but this means the rebased commits are technically new commits (different hashes) even though their content is the same, which is exactly why rebasing commits that have already been pushed and shared with others is strongly discouraged, since it rewrites history other people may already be building on.',
      ru: {
        question: 'Чем `git rebase` отличается от `git merge`?',
        options: [
          'Rebase заново применяет коммиты поверх новой базы, создавая линейную историю; merge создаёт новый merge-коммит, объединяющий истории',
          'Они всегда дают одинаковый результат',
          'Rebase удаляет историю коммитов',
          'Merge используется только для тегов',
        ],
        explanation:
          'git merge берёт крайние коммиты двух веток и создаёт новый "merge-коммит" с двумя родителями, каждый указывает обратно в историю своей ветки — это сохраняет точную, буквальную историю того, когда каждая ветка разошлась и как они снова сошлись, но даёт граф с видимыми точками ветвления и слияния. git rebase же берёт коммиты, уникальные для одной ветки, и буквально заново применяет каждый из них, по одному, как совершенно новые коммиты, поверх другой базы (обычно текущего кончика другой ветки), давая прямую, линейную последовательность коммитов без merge-коммита и вообще без видимой структуры ветвления в результате — но это означает, что перебазированные коммиты технически новые коммиты (другие хеши), хотя их содержимое то же самое, именно поэтому настоятельно не рекомендуется делать rebase уже запушенных и разделённых с другими коммитов, так как это переписывает историю, на которой другие люди уже могут строить свою работу.',
      },
    },
    {
      q: 'What is the purpose of a `.gitignore` file?',
      options: [
        'Specifies files/patterns that Git should not track or stage',
        'Lists all committed files',
        'Stores commit messages',
        'Configures remote repository URLs',
      ],
      correct: [0],
      explanation:
        '.gitignore contains a list of file name patterns (glob-style, supporting wildcards, directory-specific rules, negation, and so on) that Git should treat as untracked and refuse to automatically include when you run `git add .` or `git status` — it is the standard place to exclude build output directories, compiled binaries, IDE-specific configuration files, dependency directories like node_modules, and especially anything containing secrets (API keys, credentials) that should never end up committed to the repository. It is worth knowing (a common practical follow-up) that .gitignore only prevents *new*, currently-untracked files matching its patterns from being added — it has no retroactive effect on a file that Git is already tracking, which requires `git rm --cached` to actually stop tracking before .gitignore can take effect for it.',
      ru: {
        question: 'Какова цель файла `.gitignore`?',
        options: [
          'Указывает файлы/шаблоны, которые Git не должен отслеживать или добавлять в индекс',
          'Перечисляет все закоммиченные файлы',
          'Хранит сообщения коммитов',
          'Настраивает URL удалённых репозиториев',
        ],
        explanation:
          '.gitignore содержит список шаблонов имён файлов (в стиле glob, с поддержкой масок, правил для конкретных каталогов, отрицания и т.д.), которые Git должен считать неотслеживаемыми и отказываться автоматически включать при выполнении `git add .` или `git status` — это стандартное место для исключения каталогов сборки, скомпилированных бинарников, специфичных для IDE файлов конфигурации, каталогов зависимостей вроде node_modules, и особенно всего, что содержит секреты (API-ключи, учётные данные), которое никогда не должно оказаться закоммичено в репозиторий. Стоит знать (частый практический уточняющий вопрос), что .gitignore предотвращает только добавление *новых*, пока не отслеживаемых файлов, соответствующих его шаблонам — он не имеет обратного действия на файл, который Git уже отслеживает, для этого требуется `git rm --cached`, чтобы реально прекратить отслеживание, прежде чем .gitignore сможет подействовать на него.',
      },
    },
    {
      q: 'What does `git stash` do?',
      options: [
        'Temporarily saves uncommitted changes so you can switch branches, then reapply them later',
        'Permanently deletes uncommitted changes',
        'Creates a new branch automatically',
        'Pushes changes to a remote',
      ],
      correct: [0],
      explanation:
        'git stash is meant for exactly the situation where you have half-finished, uncommitted work in your working directory but suddenly need a clean working tree — to switch branches, pull in upstream changes, or handle an urgent unrelated task — without wanting to make a half-baked commit just to save your progress. It takes your current uncommitted changes (both staged and unstaged, by default) and squirrels them away onto an internal stack, resetting your working directory back to match the last commit; later, `git stash pop` (apply and remove from the stack) or `git stash apply` (apply but keep on the stack) brings those exact changes back. The stash is local and internal to your repository, not a remote operation, and nothing is deleted — it is explicitly a temporary, recoverable save, which is the key distinction interviewers are checking for versus something destructive like `git checkout -- .` or `git reset --hard`.',
      ru: {
        question: 'Что делает `git stash`?',
        options: [
          'Временно сохраняет незакоммиченные изменения, чтобы можно было переключиться на другую ветку, а потом применить их снова',
          'Безвозвратно удаляет незакоммиченные изменения',
          'Автоматически создаёт новую ветку',
          'Отправляет изменения на удалённый репозиторий',
        ],
        explanation:
          'git stash предназначен ровно для ситуации, когда у вас есть наполовину законченная, незакоммиченная работа в рабочей директории, но внезапно нужно чистое рабочее дерево — чтобы переключить ветку, подтянуть вышестоящие изменения, или заняться срочной несвязанной задачей — не желая делать сырой коммит только ради сохранения прогресса. Он берёт текущие незакоммиченные изменения (по умолчанию и проиндексированные, и непроиндексированные) и прячет их во внутренний стек, сбрасывая рабочую директорию обратно к состоянию последнего коммита; позже `git stash pop` (применить и убрать из стека) или `git stash apply` (применить, но оставить в стеке) возвращает именно эти изменения обратно. Стек хранится локально и внутренне для вашего репозитория, это не удалённая операция, и ничего не удаляется — это явно временное, восстанавливаемое сохранение, ключевое отличие, которое интервьюеры проверяют, в сравнении с чем-то разрушительным вроде `git checkout -- .` или `git reset --hard`.',
      },
    },
    {
      q: 'What is the difference between `git fetch` and `git pull`?',
      options: [
        'git fetch downloads changes without merging; git pull fetches and then merges (or rebases) into the current branch',
        'They are identical commands',
        'git pull only works on the main branch',
        'git fetch merges automatically, pull does not',
      ],
      correct: [0],
      explanation:
        'git fetch downloads all new commits, branches, and tags from the remote repository into your local repository\'s hidden tracking references (like origin/main), updating your local knowledge of what the remote looks like, but it deliberately never touches your actual working branch or working directory files at all — it is a purely safe, read-only-feeling synchronization step. git pull is explicitly documented as doing two things in sequence: it runs a fetch exactly as above, and then immediately also runs a merge (or, if configured, a rebase) of the newly fetched remote-tracking branch into your current local branch, actually changing your working files and potentially creating a merge commit or conflicts that need resolving. Many experienced developers deliberately prefer fetch followed by a manual, considered merge/rebase over an automatic pull specifically because it separates "see what changed" from "actually apply those changes," giving a chance to review incoming commits first — a genuinely good practical point to raise in an interview.',
      ru: {
        question: 'В чём разница между `git fetch` и `git pull`?',
        options: [
          'git fetch скачивает изменения без слияния; git pull скачивает и затем сливает (или делает rebase) их в текущую ветку',
          'Это идентичные команды',
          'git pull работает только с основной веткой',
          'git fetch сливает автоматически, а pull — нет',
        ],
        explanation:
          'git fetch скачивает все новые коммиты, ветки и теги из удалённого репозитория в скрытые отслеживающие ссылки вашего локального репозитория (вроде origin/main), обновляя ваше локальное представление о том, как выглядит удалённый репозиторий, но намеренно вообще не трогает вашу реальную рабочую ветку или файлы рабочей директории — это чисто безопасный, "только для чтения" шаг синхронизации. git pull явно задокументирован как выполняющий две вещи последовательно: он запускает fetch ровно как выше, а затем сразу же также запускает merge (или, если настроено, rebase) только что полученной удалённой отслеживающей ветки в вашу текущую локальную ветку, реально изменяя ваши рабочие файлы и потенциально создавая merge-коммит или конфликты, требующие разрешения. Многие опытные разработчики намеренно предпочитают fetch с последующим ручным, обдуманным merge/rebase автоматическому pull именно потому, что это разделяет "посмотреть, что изменилось" и "реально применить эти изменения", давая шанс сначала просмотреть входящие коммиты — действительно хороший практический аргумент, который стоит привести на собеседовании.',
      },
    },
    {
      q: 'What is a merge conflict?',
      options: [
        'When Git cannot automatically reconcile differing changes to the same lines/file between branches, requiring manual resolution',
        'An error that occurs only during git clone',
        'A conflict between two remote repositories',
        'A warning about outdated commit messages',
      ],
      correct: [0],
      explanation:
        'Git\'s automatic merge algorithm is genuinely good at combining independent changes made to different parts of a file, or even different, non-overlapping edits within the same region, without any help — but when two branches have each modified the exact same lines of the same file in incompatible ways, Git has no principled way to decide which version is "correct," so it stops, marks the file as conflicted (inserting `<<<<<<<`, `=======`, `>>>>>>>` markers showing both competing versions directly in the file), and requires a human to manually inspect the conflicting sections, decide what the final content should actually be, remove the conflict markers, and explicitly stage the resolved file before the merge (or rebase) can be completed. This is a routine, expected part of collaborative development, not a sign anything is broken, and being able to calmly explain the resolution workflow is a very standard practical interview check.',
      ru: {
        question: 'Что такое конфликт слияния (merge conflict)?',
        options: [
          'Когда Git не может автоматически согласовать разные изменения одних и тех же строк/файла между ветками, и требуется ручное разрешение',
          'Ошибка, возникающая только при git clone',
          'Конфликт между двумя удалёнными репозиториями',
          'Предупреждение об устаревших сообщениях коммитов',
        ],
        explanation:
          'Автоматический алгоритм слияния Git действительно хорош в объединении независимых изменений, сделанных в разных частях файла, или даже разных, не пересекающихся правок в одной области, вообще без помощи — но когда две ветки каждая изменила ровно одни и те же строки одного и того же файла несовместимыми способами, у Git нет принципиального способа решить, какая версия "правильная", поэтому он останавливается, помечает файл как конфликтный (вставляя маркеры `<<<<<<<`, `=======`, `>>>>>>>`, показывающие обе конкурирующие версии прямо в файле), и требует, чтобы человек вручную просмотрел конфликтующие участки, решил, каким на самом деле должно быть итоговое содержимое, убрал маркеры конфликта, и явно проиндексировал разрешённый файл, прежде чем слияние (или rebase) сможет завершиться. Это рутинная, ожидаемая часть совместной разработки, а не признак того, что что-то сломано, и умение спокойно объяснить процесс разрешения — очень стандартная практическая проверка на собеседовании.',
      },
    },
    {
      q: 'What does `git cherry-pick <commit>` do?',
      options: [
        'Applies the changes from a specific commit onto the current branch',
        'Deletes a specific commit from history',
        'Merges two branches entirely',
        'Reverts all uncommitted changes',
      ],
      correct: [0],
      explanation:
        'cherry-pick takes exactly one specific, existing commit (identified by its hash) from anywhere in the repository\'s history — often from a different branch entirely — and creates a brand-new commit on your current branch that reproduces that same change (the same diff), without bringing along any of the other commits surrounding it on its original branch. A common real scenario: a critical bug fix was committed to a feature branch, but it needs to also apply immediately to the main/release branch without merging the entire, still-in-progress feature — cherry-picking just that one fix commit onto main accomplishes exactly that, cleanly. It is a selective, single-commit operation, entirely distinct from merging an entire branch, and it does not touch or delete the original commit anywhere; the cherry-picked commit is a genuinely new, separate commit with its own hash.',
      ru: {
        question: 'Что делает `git cherry-pick <commit>`?',
        options: [
          'Применяет изменения конкретного коммита к текущей ветке',
          'Удаляет конкретный коммит из истории',
          'Полностью сливает две ветки',
          'Откатывает все незакоммиченные изменения',
        ],
        explanation:
          'cherry-pick берёт ровно один конкретный, существующий коммит (определённый по его хешу) откуда угодно из истории репозитория — часто с совершенно другой ветки — и создаёт совершенно новый коммит в вашей текущей ветке, воспроизводящий то же самое изменение (тот же diff), не принося с собой никакие другие коммиты, окружавшие его в исходной ветке. Частый реальный сценарий: критичный багфикс был закоммичен в feature-ветку, но его нужно немедленно применить и к main/release ветке, не сливая всю ещё незавершённую feature — cherry-pick именно этого коммита с фиксом в main достигает ровно этого, чисто. Это выборочная, однокоммитная операция, совершенно отличная от слияния целой ветки, и она никак не трогает и не удаляет исходный коммит нигде; закерри-пиченный коммит — по-настоящему новый, отдельный коммит со своим собственным хешем.',
      },
    },
    {
      q: 'You run `git merge feature` while on main, where feature has 3 commits not on main. What does this typically produce in the commit history?',
      options: [
        'A new merge commit on main with two parents, preserving feature\'s 3 original commits and the branching structure',
        'feature\'s 3 commits are replayed on top of main with new commit hashes, producing a linear history',
        'main and feature are combined into a single squashed commit',
        'Nothing changes until you also run git push',
      ],
      correct: [0],
      variantGroup: 'interview-merge-vs-rebase-history',
      explanation:
        'git merge, in its default non-fast-forward form when branches have diverged, creates a new commit with two parent commits — the tip of main and the tip of feature — explicitly recording where the two histories converge, while feature\'s original 3 commits keep their original hashes and remain visible as a distinct branching path in the history graph. git rebase, by contrast, would take those same 3 commits and reapply them one by one on top of main\'s current tip, each getting a brand-new hash and producing a straight, linear history with no merge commit and no visible branch structure — that contrast (preserved branch + merge commit vs. replayed linear history) is the core practical difference candidates are expected to explain.',
      ru: {
        question: 'Вы выполняете `git merge feature`, находясь на main, где у feature есть 3 коммита, которых нет в main. Что это обычно даёт в истории коммитов?',
        options: [
          'Новый merge-коммит в main с двумя родителями, сохраняющий 3 исходных коммита feature и структуру ветвления',
          '3 коммита feature переносятся поверх main с новыми хешами коммитов, давая линейную историю',
          'main и feature объединяются в один сквошенный коммит',
          'Ничего не меняется, пока вы дополнительно не выполните git push',
        ],
        explanation:
          'git merge в своей форме по умолчанию без fast-forward (когда ветки разошлись) создаёт новый коммит с двумя родительскими коммитами — вершиной main и вершиной feature — явно фиксируя, где сходятся эти две истории, при этом 3 исходных коммита feature сохраняют свои исходные хеши и остаются видимыми как отдельный путь ветвления в графе истории. git rebase, напротив, взял бы те же самые 3 коммита и заново применил их один за другим поверх текущей вершины main, каждый получив совершенно новый хеш, давая прямую линейную историю без merge-коммита и без видимой структуры ветвления — именно этот контраст (сохранённая ветка + merge-коммит против перенесённой линейной истории) — ключевое практическое отличие, которое ожидается от кандидата.',
      },
    },
    {
      q: 'You run `git rebase main` while on feature (which has 3 commits not on main), then fast-forward-merge feature into main. What does this typically produce in the commit history?',
      options: [
        'feature\'s 3 commits are replayed on top of main with new commit hashes, producing a straight, linear history with no merge commit',
        'A new merge commit on main with two parents, preserving feature\'s 3 original commit hashes and the branching structure',
        'main and feature are combined into a single squashed commit',
        'Nothing changes until you also run git push',
      ],
      correct: [0],
      variantGroup: 'interview-merge-vs-rebase-history',
      explanation:
        'git rebase takes feature\'s 3 commits and reapplies them one at a time on top of main\'s current tip, generating a brand-new hash for each replayed commit — the original 3 commits from before the rebase are effectively abandoned once nothing else references them. Because the result sits directly on top of main with no divergence left, merging feature into main afterward can fast-forward (just moving main\'s pointer forward) rather than creating a merge commit — producing a straight, linear history with no branching structure visible at all, the opposite of what a regular `git merge` (without a prior rebase) would have produced.',
      ru: {
        question: 'Вы выполняете `git rebase main`, находясь на feature (у которой 3 коммита, которых нет в main), а затем сливаете feature в main через fast-forward. Что это обычно даёт в истории коммитов?',
        options: [
          '3 коммита feature переносятся поверх main с новыми хешами коммитов, давая прямую линейную историю без merge-коммита',
          'Новый merge-коммит в main с двумя родителями, сохраняющий исходные хеши 3 коммитов feature и структуру ветвления',
          'main и feature объединяются в один сквошенный коммит',
          'Ничего не меняется, пока вы дополнительно не выполните git push',
        ],
        explanation:
          'git rebase берёт 3 коммита feature и заново применяет их по одному поверх текущей вершины main, генерируя совершенно новый хеш для каждого перенесённого коммита — исходные 3 коммита до rebase фактически становятся заброшенными, как только на них больше ничего не ссылается. Поскольку результат оказывается прямо поверх main без какого-либо расхождения, последующее слияние feature в main может пройти через fast-forward (просто сдвинув указатель main вперёд), а не создать merge-коммит — давая прямую линейную историю совсем без видимой структуры ветвления, противоположность тому, что дал бы обычный `git merge` (без предварительного rebase).',
      },
    },
  ],
  'design-patterns': [
    {
      q: 'What problem does the Singleton pattern solve?',
      options: [
        'Ensures a class has only one instance and provides a global point of access to it',
        'Allows creating multiple independent instances easily',
        'Defines a family of interchangeable algorithms',
        'Separates object construction from its representation',
      ],
      correct: [0],
      explanation:
        'Singleton restricts a class to exactly one instance for the entire lifetime of the application (typically enforced by a private constructor combined with a static factory method or field that lazily or eagerly creates and caches that single instance), and provides one well-known, globally-reachable point to access it. It is commonly reached for when exactly-one-instance is a genuine architectural requirement — a single configuration object, a single connection pool manager, a logging facility — but it is also a widely criticized pattern in modern practice specifically because it introduces global, hidden state and makes unit testing harder (you cannot easily substitute a different implementation), which is worth mentioning in an interview to show balanced, practical judgment rather than reciting the pattern uncritically; in Spring applications, container-managed singleton-scoped beans typically replace the classic hand-rolled Singleton pattern entirely.',
      ru: {
        question: 'Какую проблему решает паттерн Singleton (Одиночка)?',
        options: [
          'Гарантирует, что у класса есть только один экземпляр, и предоставляет глобальную точку доступа к нему',
          'Позволяет легко создавать множество независимых экземпляров',
          'Определяет семейство взаимозаменяемых алгоритмов',
          'Отделяет конструирование объекта от его представления',
        ],
        explanation:
          'Singleton ограничивает класс ровно одним экземпляром на всё время жизни приложения (обычно навязывается приватным конструктором в сочетании со статическим фабричным методом или полем, лениво или жадно создающим и кэширующим этот единственный экземпляр), и предоставляет одну хорошо известную, глобально доступную точку для обращения к нему. К нему часто прибегают, когда наличие ровно одного экземпляра — настоящее архитектурное требование: единый объект конфигурации, единый менеджер пула соединений, служба логирования — но это также широко критикуемый в современной практике паттерн именно потому, что он вносит глобальное, скрытое состояние и усложняет модульное тестирование (нельзя легко подставить другую реализацию), и это стоит упомянуть на собеседовании, чтобы показать сбалансированное, практическое суждение, а не некритичное повторение паттерна; в приложениях на Spring управляемые контейнером бины со scope singleton обычно полностью заменяют классический "самодельный" паттерн Singleton.',
      },
    },
    {
      q: 'What is the intent of the Factory Method pattern?',
      options: [
        'Define an interface for creating an object, letting subclasses decide which class to instantiate',
        'Attach additional responsibilities to an object dynamically',
        'Provide a simplified interface to a complex subsystem',
        'Ensure thread-safe access to a shared resource',
      ],
      correct: [0],
      explanation:
        'Factory Method defines a creation method (often abstract or with a default implementation) in a base class or interface, but defers the actual decision of exactly which concrete class to instantiate to subclasses that override that method — client code calling the factory method never needs to know or reference the concrete class being created at all, only the common supertype/interface it returns. This decouples object-creation logic from the code that uses the created object, which is especially valuable when the set of possible concrete types might grow over time, or when creation itself involves meaningful setup logic that should not be duplicated everywhere a new instance is needed. It is worth being able to distinguish this cleanly from the closely related, commonly confused Abstract Factory pattern (which groups several related factory methods together to create families of related objects) if this comes up as a follow-up.',
      ru: {
        question: 'В чём смысл паттерна Factory Method (Фабричный метод)?',
        options: [
          'Определить интерфейс для создания объекта, позволяя подклассам решать, какой класс инстанцировать',
          'Динамически добавлять объекту дополнительные обязанности',
          'Предоставить упрощённый интерфейс к сложной подсистеме',
          'Обеспечить потокобезопасный доступ к общему ресурсу',
        ],
        explanation:
          'Factory Method определяет метод создания (часто абстрактный или с реализацией по умолчанию) в базовом классе или интерфейсе, но откладывает реальное решение о том, какой конкретно класс инстанцировать, на подклассы, переопределяющие этот метод — клиентскому коду, вызывающему фабричный метод, вообще никогда не нужно знать или ссылаться на конкретный создаваемый класс, только на общий супертип/интерфейс, который он возвращает. Это отвязывает логику создания объекта от кода, использующего созданный объект, что особенно ценно, когда набор возможных конкретных типов может со временем расти, или когда само создание включает содержательную логику настройки, которую не стоит дублировать везде, где нужен новый экземпляр. Стоит уметь чётко отличать его от близко связанного, часто путаемого паттерна Abstract Factory (который объединяет несколько связанных фабричных методов вместе для создания семейств связанных объектов), если это возникнет как уточняющий вопрос.',
      },
    },
    {
      q: 'What is the Strategy pattern used for?',
      options: [
        'Defining a family of interchangeable algorithms and selecting one at runtime via composition',
        'Restricting a class to a single instance',
        'Wrapping an object to add behavior transparently',
        'Converting one interface into another expected by clients',
      ],
      correct: [0],
      explanation:
        'Strategy extracts an algorithm (or, more generally, any piece of interchangeable behavior) behind a common interface, letting a context class hold a reference to whichever concrete strategy implementation it currently needs and delegate to it, rather than hard-coding the algorithm\'s logic directly or branching over many if/else or switch cases to pick behavior. This is precisely the composition-over-inheritance idea applied concretely: instead of creating a subclass for every variant of behavior, you compose the context object with a swappable strategy object, which can even be changed at runtime (setStrategy(newStrategy)). A concrete, relatable Java example: passing different Comparator implementations to a sort() call is Strategy in action — the sorting algorithm itself stays the same, but the specific comparison "strategy" plugged in changes the outcome.',
      ru: {
        question: 'Для чего используется паттерн Strategy (Стратегия)?',
        options: [
          'Для определения семейства взаимозаменяемых алгоритмов и выбора одного из них во время выполнения через композицию',
          'Чтобы ограничить класс одним экземпляром',
          'Чтобы прозрачно оборачивать объект, добавляя ему поведение',
          'Чтобы преобразовывать один интерфейс в другой, ожидаемый клиентами',
        ],
        explanation:
          'Strategy выносит алгоритм (или, в более общем смысле, любой кусок взаимозаменяемого поведения) за общий интерфейс, позволяя классу-контексту хранить ссылку на ту конкретную реализацию стратегии, которая ему сейчас нужна, и делегировать ей, вместо того чтобы жёстко зашивать логику алгоритма напрямую или ветвиться по множеству if/else или switch, выбирая поведение. Это именно идея "композиция вместо наследования", применённая конкретно: вместо создания подкласса под каждый вариант поведения вы компонуете объект-контекст с заменяемым объектом-стратегией, который можно даже менять во время выполнения (setStrategy(newStrategy)). Конкретный, узнаваемый пример на Java: передача разных реализаций Comparator в вызов sort() — это Strategy в действии — сам алгоритм сортировки остаётся тем же, но подключённая конкретная "стратегия" сравнения меняет результат.',
      },
    },
    {
      q: 'What does the Builder pattern help with?',
      options: [
        'Constructing complex objects step by step, separating construction from representation, useful when there are many optional parameters',
        'Making a class immutable automatically',
        'Ensuring only one instance of an object exists',
        'Adapting incompatible interfaces',
      ],
      correct: [0],
      explanation:
        'Builder addresses the specific problem of "telescoping constructors" — a class with many optional fields that ends up needing an unwieldy pile of overloaded constructors (or a single constructor with a dozen positional parameters where it is easy to accidentally swap two arguments of the same type) to cover every reasonable combination of which fields are set. Instead, Builder exposes a fluent, chainable API of small setter-like methods, each returning the builder itself so calls can be chained (`new PersonBuilder().name("Alex").age(30).city("Berlin").build()`), with a final build() method that assembles and returns the fully-constructed, often immutable, target object only once all the desired properties have been specified — this is a genuinely common, practical pattern in everyday Java code (StringBuilder itself is a simpler cousin of the idea) and interviewers often like candidates to be able to sketch a small builder example from memory.',
      ru: {
        question: 'В чём помогает паттерн Builder (Строитель)?',
        options: [
          'В пошаговом построении сложных объектов, отделяя конструирование от представления — полезно при множестве необязательных параметров',
          'В автоматическом превращении класса в неизменяемый',
          'В гарантии существования только одного экземпляра объекта',
          'В адаптации несовместимых интерфейсов',
        ],
        explanation:
          'Builder решает конкретную проблему "телескопических конструкторов" — класс со множеством необязательных полей, в итоге нуждающийся в неуклюжей куче перегруженных конструкторов (или одном конструкторе с десятком позиционных параметров, где легко случайно перепутать местами два аргумента одного типа), чтобы покрыть каждую разумную комбинацию заданных полей. Вместо этого Builder предоставляет гибкий, сцепляемый API из небольших методов в стиле сеттеров, каждый возвращает сам билдер, чтобы вызовы можно было цеплять друг за другом (`new PersonBuilder().name("Alex").age(30).city("Berlin").build()`), с финальным методом build(), собирающим и возвращающим полностью построенный, часто неизменяемый целевой объект только после того, как заданы все нужные свойства — это действительно распространённый, практический паттерн в повседневном коде на Java (сам StringBuilder — более простой родственник этой идеи), и интервьюеры часто хотят, чтобы кандидаты могли по памяти набросать небольшой пример билдера.',
      },
    },
    {
      q: 'What is the Observer pattern commonly used for?',
      options: [
        'Defining a one-to-many dependency so that when one object changes state, all its dependents are notified automatically',
        'Wrapping legacy code with a new interface',
        'Creating objects without specifying their exact class',
        'Reducing memory usage via object sharing',
      ],
      correct: [0],
      explanation:
        'Observer establishes a subscription relationship: a "subject" (or "publisher") object maintains a list of interested "observer" (or "subscriber") objects, and whenever the subject\'s state changes in a way observers care about, it iterates that list and notifies each one (typically by calling a well-known callback method on each), without needing to know anything concrete about who or what those observers actually are beyond the shared observer interface they implement. This decouples the subject producing events from the (potentially many, potentially changing over time) observers reacting to them — GUI event listeners, publish/subscribe messaging systems, and reactive programming libraries are all conceptually descendants of this same core idea, and being able to connect the classic pattern name to those very concrete, familiar real-world examples tends to land well in an interview.',
      ru: {
        question: 'Для чего обычно используется паттерн Observer (Наблюдатель)?',
        options: [
          'Чтобы определить зависимость "один ко многим": при изменении состояния одного объекта все зависимые от него объекты автоматически уведомляются',
          'Чтобы обернуть устаревший код новым интерфейсом',
          'Чтобы создавать объекты без указания их точного класса',
          'Чтобы снизить потребление памяти за счёт разделения объектов',
        ],
        explanation:
          'Observer устанавливает отношение подписки: объект-"субъект" (или "издатель") хранит список заинтересованных объектов-"наблюдателей" (или "подписчиков"), и всякий раз, когда состояние субъекта меняется способом, важным для наблюдателей, он проходит по этому списку и уведомляет каждого (обычно вызывая известный callback-метод у каждого), не нуждаясь знать что-либо конкретное о том, кто или что эти наблюдатели на самом деле, помимо общего интерфейса наблюдателя, который они реализуют. Это отвязывает субъект, производящий события, от (потенциально многих, потенциально меняющихся со временем) наблюдателей, реагирующих на них — слушатели событий GUI, системы обмена сообщениями publish/subscribe и библиотеки реактивного программирования — все они концептуально происходят от этой же основной идеи, и умение связать классическое название паттерна с этими вполне конкретными, знакомыми реальными примерами обычно хорошо воспринимается на собеседовании.',
      },
    },
    {
      q: 'In basic system design, what is the primary purpose of horizontal scaling?',
      options: [
        'Adding more machines/instances to distribute load, improving capacity and availability',
        "Upgrading a single machine's CPU/RAM",
        'Reducing the number of servers to save cost',
        'Only applicable to databases',
      ],
      correct: [0],
      explanation:
        'Horizontal scaling ("scaling out") grows a system\'s capacity by adding more machines or instances running the same application, with a load balancer (or similar mechanism) distributing incoming traffic across all of them — this approach also tends to improve availability, since the failure of any single instance does not necessarily take the whole system down, unlike a single beefed-up server. Vertical scaling ("scaling up") is the alternative approach of adding more resources (CPU, RAM, faster disks) to one existing machine instead, which is simpler operationally but has a hard physical/cost ceiling and creates a single point of failure. This concept applies broadly to stateless application servers, not only databases (though horizontally scaling a database specifically introduces its own significant challenges around data consistency and partitioning, a natural, good follow-up point to raise if this comes up in a system-design-flavored interview).',
      ru: {
        question: 'В основах системного дизайна, какова главная цель горизонтального масштабирования?',
        options: [
          'Добавление большего числа машин/инстансов для распределения нагрузки, что повышает ёмкость и доступность',
          'Апгрейд CPU/RAM одной машины',
          'Сокращение числа серверов ради экономии',
          'Применимо только к базам данных',
        ],
        explanation:
          'Горизонтальное масштабирование ("scaling out") увеличивает ёмкость системы за счёт добавления большего числа машин или инстансов, выполняющих одно и то же приложение, с балансировщиком нагрузки (или похожим механизмом), распределяющим входящий трафик между всеми ними — этот подход также обычно повышает доступность, поскольку отказ любого отдельного инстанса не обязательно "роняет" всю систему, в отличие от одного мощного сервера. Вертикальное масштабирование ("scaling up") — альтернативный подход, добавляющий больше ресурсов (CPU, RAM, более быстрые диски) одной существующей машине, что операционно проще, но имеет жёсткий физический/ценовой потолок и создаёт единую точку отказа. Это понятие широко применимо к безсостоятельным серверам приложений, а не только к базам данных (хотя горизонтальное масштабирование именно базы данных вносит собственные значительные сложности вокруг согласованности данных и партиционирования — естественный, хороший уточняющий момент, который стоит поднять, если это возникнет на собеседовании в духе системного дизайна).',
      },
    },
    {
      q: 'This double-checked locking Singleton is missing something that can let another thread see a partially-constructed ConfigManager:\n\nclass ConfigManager {\n  private static ConfigManager instance;\n  public static ConfigManager getInstance() {\n    if (instance == null) {\n      synchronized (ConfigManager.class) {\n        if (instance == null) {\n          instance = new ConfigManager();\n        }\n      }\n    }\n    return instance;\n  }\n}\n\nWhat\'s missing?',
      options: [
        'The `instance` field should be declared `volatile`, to prevent instruction reordering from publishing a reference before the constructor has fully finished',
        'The outer `if (instance == null)` check is redundant and should be removed',
        'getInstance() should not be static',
        'The synchronized block should wrap the entire method instead of just part of it',
      ],
      correct: [0],
      variantGroup: 'interview-dcl-singleton-volatile',
      explanation:
        'Object construction (`new ConfigManager()`) is not guaranteed to behave as a single atomic step from the JVM\'s perspective — without `volatile`, the compiler or CPU is allowed to reorder the steps of "allocate memory," "run the constructor," and "assign the reference to `instance`". That means another thread reading `instance` outside the synchronized block (the outer null-check, which exists purely as a fast-path optimization to skip locking once the instance is set) could observe a non-null reference to an object whose constructor hasn\'t actually finished running — a partially-initialized ConfigManager. Declaring `instance` as `volatile` establishes a happens-before relationship that forbids this reordering, guaranteeing that once any thread sees a non-null `instance`, its constructor has fully completed — which is exactly why double-checked locking is considered a subtle, easy-to-get-wrong pattern that tests memory visibility understanding, not just mutual exclusion.',
      ru: {
        question: 'В этом Singleton с двойной проверкой блокировки чего-то не хватает, из-за чего другой поток может увидеть частично сконструированный ConfigManager:\n\nclass ConfigManager {\n  private static ConfigManager instance;\n  public static ConfigManager getInstance() {\n    if (instance == null) {\n      synchronized (ConfigManager.class) {\n        if (instance == null) {\n          instance = new ConfigManager();\n        }\n      }\n    }\n    return instance;\n  }\n}\n\nЧего не хватает?',
        options: [
          'Поле `instance` должно быть объявлено `volatile`, чтобы предотвратить переупорядочивание инструкций, публикующее ссылку до полного завершения конструктора',
          'Внешняя проверка `if (instance == null)` избыточна и её нужно убрать',
          'getInstance() не должен быть static',
          'Блок synchronized должен оборачивать весь метод, а не только его часть',
        ],
        explanation:
          'Конструирование объекта (`new ConfigManager()`) не гарантированно ведёт себя как один атомарный шаг с точки зрения JVM — без `volatile` компилятору или процессору разрешено переупорядочить шаги "выделить память", "выполнить конструктор" и "присвоить ссылку полю `instance`". Это значит, что другой поток, читающий `instance` вне synchronized-блока (внешняя проверка на null, существующая исключительно как быстрая оптимизация, пропускающая блокировку после установки instance), может увидеть не-null ссылку на объект, конструктор которого на самом деле ещё не завершился — частично инициализированный ConfigManager. Объявление `instance` как `volatile` устанавливает отношение happens-before, запрещающее это переупорядочивание, гарантируя, что как только любой поток увидел не-null `instance`, его конструктор уже полностью завершился — именно поэтому двойная проверка блокировки считается тонким, легко ошибочным паттерном, проверяющим понимание видимости памяти, а не только взаимного исключения.',
      },
    },
    {
      q: 'This double-checked locking Singleton is missing something that can let another thread see a partially-constructed Logger:\n\nclass Logger {\n  private static Logger sharedLogger;\n  public static Logger getLogger() {\n    if (sharedLogger == null) {\n      synchronized (Logger.class) {\n        if (sharedLogger == null) {\n          sharedLogger = new Logger();\n        }\n      }\n    }\n    return sharedLogger;\n  }\n}\n\nWhat\'s missing?',
      options: [
        'The `sharedLogger` field should be declared `volatile`, to prevent instruction reordering from publishing a reference before the constructor has fully finished',
        'The outer `if (sharedLogger == null)` check is redundant and should be removed',
        'getLogger() should not be static',
        'The synchronized block should wrap the entire method instead of just part of it',
      ],
      correct: [0],
      variantGroup: 'interview-dcl-singleton-volatile',
      explanation:
        'The exact same reordering hazard applies regardless of the class or field name: without `volatile` on `sharedLogger`, the JVM is free to reorder "allocate the Logger," "run its constructor," and "publish the reference" — so a thread outside the synchronized block could read a non-null `sharedLogger` that points at an object whose constructor hasn\'t finished executing yet, handing out a broken, half-built Logger. Marking `sharedLogger` as `volatile` forbids that reordering and guarantees full construction is visible before any thread can observe a non-null reference — the fix, and the underlying reasoning, is identical to the ConfigManager version of this scenario, just with different names.',
      ru: {
        question: 'В этом Singleton с двойной проверкой блокировки чего-то не хватает, из-за чего другой поток может увидеть частично сконструированный Logger:\n\nclass Logger {\n  private static Logger sharedLogger;\n  public static Logger getLogger() {\n    if (sharedLogger == null) {\n      synchronized (Logger.class) {\n        if (sharedLogger == null) {\n          sharedLogger = new Logger();\n        }\n      }\n    }\n    return sharedLogger;\n  }\n}\n\nЧего не хватает?',
        options: [
          'Поле `sharedLogger` должно быть объявлено `volatile`, чтобы предотвратить переупорядочивание инструкций, публикующее ссылку до полного завершения конструктора',
          'Внешняя проверка `if (sharedLogger == null)` избыточна и её нужно убрать',
          'getLogger() не должен быть static',
          'Блок synchronized должен оборачивать весь метод, а не только его часть',
        ],
        explanation:
          'Точно такая же опасность переупорядочивания действует независимо от названия класса или поля: без `volatile` у `sharedLogger` JVM вправе переупорядочить "выделить память под Logger", "выполнить его конструктор" и "опубликовать ссылку" — поэтому поток вне synchronized-блока может прочитать не-null `sharedLogger`, указывающий на объект, конструктор которого ещё не завершил выполнение, получив сломанный, недостроенный Logger. Пометка `sharedLogger` как `volatile` запрещает это переупорядочивание и гарантирует, что полное конструирование видно до того, как любой поток сможет увидеть не-null ссылку — исправление и лежащее в основе рассуждение идентичны версии этого сценария с ConfigManager, просто с другими названиями.',
      },
    },
  ],
}

export const interviewQuestions = Object.entries(raw).flatMap(([topic, items]) =>
  items.map((item, i) => ({
    id: `interview-${topic}-${i + 1}`,
    section: 'INTERVIEW',
    topic,
    question: item.q,
    options: item.options,
    correct: item.correct,
    explanation: item.explanation,
    ru: item.ru,
    variantGroup: item.variantGroup,
  }))
)
