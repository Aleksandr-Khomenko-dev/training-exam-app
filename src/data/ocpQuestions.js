// Original practice questions for OCP (Oracle Certified Professional, Java SE 8 Programmer II)
// Topics follow the official 1Z0-809 exam objectives. Each question carries an optional
// `ru` overlay with a Russian translation of the question/options/explanation.
// Some questions have more than one correct answer ("Choose two"), matching the real exam format.

export const ocpTopics = [
  { slug: 'class-design', title: 'Advanced Class Design', titleRu: 'Продвинутое проектирование классов' },
  { slug: 'generics-collections', title: 'Generics & Collections', titleRu: 'Generics и коллекции' },
  { slug: 'lambdas', title: 'Lambda Expressions & Functional Interfaces', titleRu: 'Лямбда-выражения и функциональные интерфейсы' },
  { slug: 'streams', title: 'Java Stream API', titleRu: 'Stream API' },
  { slug: 'exceptions-assertions', title: 'Exceptions, Assertions & Localization', titleRu: 'Исключения, assert и локализация' },
  { slug: 'java-io', title: 'Java I/O (NIO.2)', titleRu: 'Java I/O (NIO.2)' },
  { slug: 'concurrency', title: 'Concurrency', titleRu: 'Многопоточность' },
  { slug: 'jdbc', title: 'JDBC & Databases', titleRu: 'JDBC и базы данных' },
  { slug: 'date-time', title: 'Date/Time API (java.time)', titleRu: 'Date/Time API (java.time)' },
]

const raw = {
  'class-design': [
    {
      q: 'What Java 8 interface feature allows a concrete implementation to be provided directly in an interface?',
      options: ['default methods', 'mutable static fields', 'interface constructors', 'protected methods in interfaces'],
      correct: [0],
      explanation:
        'Before Java 8, an interface could declare only abstract method signatures (plus constants), meaning every implementing class had to supply its own body for every method — adding a single new method to a widely-used interface would break every existing implementation. default methods solve exactly that: a method declared with the default keyword carries its own body right inside the interface, which any implementing class inherits automatically and may optionally override, letting library authors evolve interfaces without breaking backward compatibility. Interfaces still cannot declare mutable state (all fields in an interface are implicitly public static final, i.e. constants) and have no constructors, since they cannot be instantiated directly; protected has no meaning inside an interface either, since interface members are implicitly public unless explicitly private (Java 9+).',
      ru: {
        question: 'Какая возможность интерфейсов, появившаяся в Java 8, позволяет предоставлять конкретную реализацию прямо в интерфейсе?',
        options: ['default-методы', 'изменяемые статические поля', 'конструкторы интерфейса', 'protected-методы в интерфейсах'],
        explanation:
          'До Java 8 интерфейс мог объявлять только сигнатуры абстрактных методов (плюс константы), а значит каждый реализующий класс был обязан предоставить собственное тело для каждого метода — добавление всего одного нового метода в широко используемый интерфейс сломало бы все существующие реализации. default-методы решают именно эту проблему: метод, объявленный с ключевым словом default, несёт собственное тело прямо внутри интерфейса, которое любой реализующий класс наследует автоматически и может по желанию переопределить, позволяя авторам библиотек развивать интерфейсы, не ломая обратную совместимость. Интерфейсы всё ещё не могут объявлять изменяемое состояние (все поля в интерфейсе неявно public static final, то есть константы) и не имеют конструкторов, поскольку не могут быть инстанцированы напрямую; protected тоже не имеет смысла внутри интерфейса, так как члены интерфейса неявно public, если явно не помечены private (начиная с Java 9).',
      },
    },
    {
      q: 'A class implements two interfaces that each declare the same default method signature. What happens if the class does not override it?',
      options: [
        'Compilation error requiring the class to explicitly override the method',
        'The JVM arbitrarily picks one implementation at runtime',
        'Both default methods run, in interface declaration order',
        'This is only allowed if the interfaces are in the same package',
      ],
      correct: [0],
      explanation:
        'This is Java\'s version of the classic "diamond problem," and the language handles it by refusing to guess: when a class implements two (or more) interfaces that supply conflicting default implementations for the same method signature, the compiler cannot know which behavior you intended, so it forces the class to resolve the ambiguity explicitly by overriding the method itself. Inside that override, the class can pick a specific parent\'s version explicitly using the syntax `InterfaceName.super.methodName()`, combine both, or provide entirely new logic. Nothing about this is decided arbitrarily at runtime, and interface package location has no bearing on the rule at all.',
      ru: {
        question: 'Класс реализует два интерфейса, каждый из которых объявляет default-метод с одинаковой сигнатурой. Что произойдёт, если класс его не переопределит?',
        options: [
          'Ошибка компиляции, требующая от класса явно переопределить метод',
          'JVM произвольно выберет одну из реализаций во время выполнения',
          'Выполнятся оба default-метода, в порядке объявления интерфейсов',
          'Это допустимо только если интерфейсы находятся в одном пакете',
        ],
        explanation:
          'Это java-версия классической "проблемы ромба", и язык решает её, отказываясь угадывать: когда класс реализует два (или более) интерфейса, предоставляющих конфликтующие реализации default для одной и той же сигнатуры метода, компилятор не может знать, какое поведение вы имели в виду, поэтому заставляет класс явно разрешить неоднозначность, переопределив метод самостоятельно. Внутри этого переопределения класс может явно выбрать версию конкретного родителя через синтаксис `InterfaceName.super.methodName()`, объединить обе, или предоставить совершенно новую логику. Ничто здесь не решается произвольно во время выполнения, и расположение интерфейсов по пакетам никак не влияет на это правило.',
      },
    },
    {
      q: 'What is true about a private interface method, introduced in Java 9?',
      options: [
        'It can only be called by other methods (default or static) within the same interface',
        'It is accessible to any implementing class',
        'It must be declared abstract',
        'It cannot be used to share code between default methods',
      ],
      correct: [0],
      explanation:
        'Java 9 extended interfaces with private methods, specifically to solve a code-duplication problem that default and static methods had created: if two default methods in the same interface needed to share a chunk of common logic, there was previously no way to factor that logic out without exposing it publicly. A private interface method is only visible and callable from inside that same interface — never from an implementing class, and never from outside code — making it purely an internal implementation-sharing tool for the interface\'s own default and static methods. It cannot be abstract (private members must have a body, since no other class could ever be forced to implement them).',
      ru: {
        question: 'Что верно про приватные методы интерфейса, появившиеся в Java 9?',
        options: [
          'Их могут вызывать только другие методы (default или static) внутри того же интерфейса',
          'Они доступны любому реализующему классу',
          'Они обязательно должны быть объявлены abstract',
          'Их нельзя использовать для переиспользования кода между default-методами',
        ],
        explanation:
          'Java 9 расширила интерфейсы приватными методами специально для решения проблемы дублирования кода, которую создали default- и static-методы: если двум default-методам в одном интерфейсе нужно было переиспользовать общий кусок логики, раньше не было способа вынести эту логику, не сделав её публичной. Приватный метод интерфейса виден и вызываем только изнутри того же интерфейса — никогда из реализующего класса и никогда извне — являясь чисто внутренним инструментом переиспользования реализации для собственных default- и static-методов интерфейса. Он не может быть abstract (приватные члены обязаны иметь тело, поскольку ни один другой класс никогда не может быть обязан их реализовать).',
      },
    },
    {
      q: 'What restricts instantiation of an abstract class?',
      options: [
        'It cannot be instantiated with `new` directly, only through a concrete subclass',
        'Abstract classes cannot declare fields',
        'Abstract classes cannot declare constructors',
        'Abstract classes must be declared final',
      ],
      correct: [0],
      explanation:
        'The compiler flags any attempt to write `new AbstractClassName()` directly as an error, because an abstract class is, by definition, potentially incomplete — it may declare abstract methods with no body, and the language cannot guarantee a usable object without those bodies being filled in somewhere. The only way to get an actual object descended from an abstract class is to instantiate a concrete subclass that has implemented every abstract method (or an anonymous subclass that does the same inline). Abstract classes are otherwise ordinary in every other respect: they freely declare fields, full instance state, and constructors — those constructors simply never run on their own via `new`, only indirectly through a subclass constructor\'s implicit or explicit super() call. abstract and final are also mutually exclusive modifiers on a class, since final means "cannot be subclassed," which would make an abstract class permanently uninstantiable.',
      ru: {
        question: 'Что ограничивает создание экземпляров абстрактного класса?',
        options: [
          'Его нельзя создать напрямую через `new`, только через конкретный подкласс',
          'Абстрактные классы не могут объявлять поля',
          'Абстрактные классы не могут объявлять конструкторы',
          'Абстрактные классы обязательно должны быть объявлены как final',
        ],
        explanation:
          'Компилятор помечает любую попытку написать `new AbstractClassName()` напрямую как ошибку, потому что абстрактный класс по определению потенциально неполон — он может объявлять абстрактные методы без тела, и язык не может гарантировать пригодный к использованию объект, если эти тела нигде не заполнены. Единственный способ получить реальный объект, происходящий от абстрактного класса, — инстанцировать конкретный подкласс, реализовавший каждый абстрактный метод (или анонимный подкласс, делающий то же самое на месте). В остальном абстрактные классы вполне обычны: они свободно объявляют поля, полноценное состояние экземпляра и конструкторы — эти конструкторы просто никогда не выполняются сами по себе через `new`, только косвенно через неявный или явный вызов super() в конструкторе подкласса. abstract и final также взаимоисключающие модификаторы для класса, поскольку final означает "нельзя наследовать", что сделало бы абстрактный класс навсегда неинстанцируемым.',
      },
    },
    {
      q: 'What is required to instantiate a static nested class from outside its enclosing class?',
      options: [
        'Outer.Nested obj = new Outer.Nested(); — no enclosing instance is required',
        'An existing instance of the outer class',
        'It cannot be instantiated from outside the outer class',
        'It must be declared public static final',
      ],
      correct: [0],
      explanation:
        'A static nested class behaves, for the purposes of instantiation, almost exactly like a completely independent top-level class — the only difference is that its fully-qualified name is namespaced under its enclosing class, written as Outer.Nested. Because it is static, it carries no implicit reference to any particular enclosing instance (unlike a non-static inner class), so it can be created from anywhere with visibility to it using `new Outer.Nested(...)`, without needing an Outer object to exist first at all. There is no requirement that it be public, static (it already is, by definition), or final — visibility follows the same access-modifier rules as any other class member.',
      ru: {
        question: 'Что требуется для создания экземпляра статического вложенного класса вне его внешнего класса?',
        options: [
          'Outer.Nested obj = new Outer.Nested(); — экземпляр внешнего класса не требуется',
          'Существующий экземпляр внешнего класса',
          'Его нельзя создать вне внешнего класса',
          'Он должен быть объявлен как public static final',
        ],
        explanation:
          'С точки зрения инстанцирования статический вложенный класс ведёт себя почти в точности как совершенно независимый класс верхнего уровня — единственное отличие в том, что его полностью квалифицированное имя размещено в пространстве имён внешнего класса и записывается как Outer.Nested. Поскольку он статический, он не несёт неявной ссылки на какой-либо конкретный экземпляр внешнего класса (в отличие от нестатического внутреннего класса), поэтому его можно создать откуда угодно, где он виден, через `new Outer.Nested(...)`, вообще без необходимости в предварительном существовании объекта Outer. Нет требования, чтобы он был public, static (он уже такой по определению) или final — видимость подчиняется тем же правилам модификаторов доступа, что и любой другой член класса.',
      },
    },
    {
      q: 'What is true of a non-static (inner) class?',
      options: [
        'It holds an implicit reference to an instance of its enclosing class',
        'It cannot access the outer class\'s private members',
        'It must be declared static to compile',
        'It behaves exactly like a top-level class',
      ],
      correct: [0],
      explanation:
        'A non-static inner class is fundamentally tied to a specific instance of its enclosing class — every inner class object secretly carries a hidden reference back to the particular outer object that created it, which is why an inner class instance can only be created via `outerInstance.new Inner()` (or implicitly, from inside an outer instance method). That hidden reference is exactly what lets inner-class code freely read and write the enclosing instance\'s private fields and call its private methods, as if the two classes were merged, which is impossible for a fully independent top-level class. This tight coupling to a specific outer instance is precisely what makes an inner class behave very differently from — not "exactly like" — a top-level class, and is also why it does not need (and must not be) declared static.',
      ru: {
        question: 'Что верно про нестатический (внутренний) класс?',
        options: [
          'Он хранит неявную ссылку на экземпляр своего внешнего класса',
          'Он не может обращаться к приватным членам внешнего класса',
          'Он обязан быть объявлен как static, чтобы скомпилироваться',
          'Он ведёт себя точно так же, как класс верхнего уровня',
        ],
        explanation:
          'Нестатический внутренний класс фундаментально привязан к конкретному экземпляру своего внешнего класса — каждый объект внутреннего класса скрыто несёт ссылку обратно на тот конкретный внешний объект, который его создал, поэтому экземпляр внутреннего класса можно создать только через `внешнийЭкземпляр.new Inner()` (или неявно, изнутри метода экземпляра внешнего класса). Именно эта скрытая ссылка позволяет коду внутреннего класса свободно читать и записывать приватные поля внешнего экземпляра и вызывать его приватные методы, как будто два класса слиты воедино, — что невозможно для полностью независимого класса верхнего уровня. Эта тесная привязка к конкретному внешнему экземпляру как раз и делает поведение внутреннего класса очень отличным от класса верхнего уровня (а не "точно таким же"), и поэтому его не нужно (и нельзя) объявлять static.',
      },
    },
    {
      q: 'Which two are true about default methods in interfaces? (Choose two)',
      options: [
        'A class implementing two interfaces with conflicting default methods must override the method',
        'Default methods can be declared without a body',
        'Default methods enable adding new methods to interfaces without breaking existing implementations',
        'Default methods must be declared static',
      ],
      correct: [0, 2],
      explanation:
        'The two true statements capture the core purpose and the core hazard of default methods. They exist to let interface authors add new behavior over time (option three) without forcing every class that already implements the interface to suddenly add a new method or fail to compile — a real backward-compatibility concern that motivated their introduction in Java 8. But that flexibility creates the diamond-problem hazard from option one: when two interfaces implemented by the same class both supply a default for the same signature, the class must explicitly override it to resolve the conflict. A default method, by definition, has a body (an interface method without one is simply an ordinary abstract method), and default is a completely different, mutually exclusive modifier from static — a method cannot be both.',
      ru: {
        question: 'Какие два утверждения о default-методах в интерфейсах верны? (Выберите два)',
        options: [
          'Класс, реализующий два интерфейса с конфликтующими default-методами, обязан переопределить метод',
          'Default-методы можно объявлять без тела',
          'Default-методы позволяют добавлять новые методы в интерфейсы, не ломая существующие реализации',
          'Default-методы обязательно должны быть объявлены static',
        ],
        explanation:
          'Два верных утверждения отражают главную цель и главную опасность default-методов. Они существуют, чтобы позволить авторам интерфейсов со временем добавлять новое поведение (третий вариант), не заставляя каждый уже реализующий интерфейс класс внезапно добавлять новый метод или переставать компилироваться — реальная проблема обратной совместимости, которая мотивировала их появление в Java 8. Но эта гибкость создаёт опасность "проблемы ромба" из первого варианта: когда два интерфейса, реализуемых одним классом, оба предоставляют default для одной сигнатуры, класс обязан явно переопределить его, чтобы разрешить конфликт. Default-метод по определению имеет тело (метод интерфейса без тела — это просто обычный абстрактный метод), а default — совершенно другой, взаимоисключающий модификатор по отношению к static — метод не может быть и тем, и другим одновременно.',
      },
    },
  ],
  'generics-collections': [
    {
      q: 'What is type erasure in Java generics?',
      options: [
        'The compiler removes generic type parameters at compile time, replacing them with Object or their bound, for backward compatibility',
        'Generic types are erased at runtime, always causing a ClassCastException',
        'Type erasure means arrays fully support reified generics',
        'Erasure only applies to primitive types',
      ],
      correct: [0],
      explanation:
        'Generics were retrofitted onto Java in version 5, at a time when a huge amount of pre-existing bytecode and libraries had no concept of them, so the designers chose to implement generics purely as a compile-time type-checking feature rather than changing the runtime representation of classes. During compilation, the compiler checks all your generic type usage for consistency and safety, then literally strips the type parameters out of the generated bytecode, replacing an unbounded type parameter like <T> with Object (or replacing a bounded one like <T extends Number> with its bound, Number) and inserting the necessary casts automatically at the point of use. This is why List<String> and List<Integer> are actually the exact same class at runtime, why you cannot do `new T()` or `instanceof T` inside a generic class, and why arrays — which, unlike generic collections, do retain their element type at runtime ("reified") — cannot safely mix with generics the same way.',
      ru: {
        question: 'Что такое стирание типов (type erasure) в дженериках Java?',
        options: [
          'Компилятор удаляет параметры generic-типов на этапе компиляции, заменяя их на Object или их границу — для обратной совместимости',
          'Обобщённые типы стираются во время выполнения, что всегда приводит к ClassCastException',
          'Стирание типов означает, что массивы полностью поддерживают овеществлённые (reified) дженерики',
          'Стирание применяется только к примитивным типам',
        ],
        explanation:
          'Дженерики были добавлены в Java задним числом, в 5-й версии, когда уже существовало огромное количество байт-кода и библиотек, не имевших о них никакого понятия, поэтому разработчики решили реализовать дженерики исключительно как функцию проверки типов на этапе компиляции, не меняя представление классов во время выполнения. Во время компиляции компилятор проверяет всё использование generic-типов на согласованность и безопасность, а затем буквально вырезает параметры типа из сгенерированного байт-кода, заменяя неограниченный параметр типа вроде <T> на Object (или ограниченный, вроде <T extends Number>, на его границу — Number), и автоматически вставляя нужные приведения типов в местах использования. Именно поэтому List<String> и List<Integer> — это на самом деле совершенно один и тот же класс во время выполнения, поэтому нельзя сделать `new T()` или `instanceof T` внутри generic-класса, и поэтому массивы — которые, в отличие от generic-коллекций, сохраняют тип своих элементов во время выполнения ("овеществлены", reified) — не могут безопасно смешиваться с дженериками таким же образом.',
      },
    },
    {
      q: 'Which collection maintains insertion order and allows duplicate elements?',
      options: ['ArrayList', 'HashSet', 'TreeSet', 'HashMap'],
      correct: [0],
      explanation:
        'ArrayList implements the List interface, whose entire contract is built around ordered, index-based, duplicate-permitting storage — elements stay in exactly the sequence they were added (or inserted at a specific index), and the same value can appear at multiple positions with no restriction. HashSet and TreeSet both implement Set, whose defining contract is uniqueness: attempting to add a value already present is silently rejected (add() returns false), and neither guarantees insertion order is preserved (HashSet\'s iteration order is based on hash bucket placement, essentially unpredictable; TreeSet iterates in sorted order instead). HashMap is not even a Collection of single elements at all — it stores key-value pairs, and while its values may repeat, its keys follow the same uniqueness rule as a Set.',
      ru: {
        question: 'Какая коллекция сохраняет порядок добавления и допускает дублирующиеся элементы?',
        options: ['ArrayList', 'HashSet', 'TreeSet', 'HashMap'],
        explanation:
          'ArrayList реализует интерфейс List, весь контракт которого построен вокруг упорядоченного, индексируемого хранения с допущением дубликатов — элементы остаются ровно в том порядке, в каком были добавлены (или вставлены по конкретному индексу), и одно и то же значение может встречаться на нескольких позициях без ограничений. HashSet и TreeSet оба реализуют Set, определяющий контракт которого — уникальность: попытка добавить уже присутствующее значение молча отклоняется (add() возвращает false), и ни один из них не гарантирует сохранение порядка вставки (порядок итерации HashSet основан на размещении по хеш-корзинам, по сути непредсказуем; TreeSet же перебирает элементы в отсортированном порядке). HashMap вообще не является коллекцией отдельных элементов — он хранит пары ключ-значение, и хотя его значения могут повторяться, его ключи подчиняются тому же правилу уникальности, что и Set.',
      },
    },
    {
      q: 'What is the key difference between List and Set?',
      options: [
        'List allows duplicate, ordered elements accessible by index; Set does not allow duplicates',
        'Set allows duplicates; List does not',
        'Both interfaces behave identically',
        'List is unordered; Set is always ordered',
      ],
      correct: [0],
      explanation:
        'List and Set represent two fundamentally different contracts for what a "collection of elements" even means. List guarantees a defined sequence (elements have a position, retrievable via get(index)) and explicitly permits the same element to appear more than once. Set guarantees the opposite property, uniqueness — no two elements considered equal (per equals()) may coexist in the set — and in exchange gives up positional indexing entirely (there is no Set.get(int index) method) and, depending on the implementation chosen, may or may not preserve any particular order (HashSet does not, LinkedHashSet preserves insertion order, TreeSet imposes sorted order). These two interfaces are meant to be chosen based on which of those two guarantees your problem actually needs.',
      ru: {
        question: 'В чём ключевое отличие List от Set?',
        options: [
          'List допускает дубликаты, упорядочен и доступен по индексу; Set не допускает дубликатов',
          'Set допускает дубликаты; List — нет',
          'Оба интерфейса ведут себя одинаково',
          'List неупорядочен; Set всегда упорядочен',
        ],
        explanation:
          'List и Set представляют два принципиально разных контракта того, что вообще значит "коллекция элементов". List гарантирует определённую последовательность (у элементов есть позиция, извлекаемая через get(index)) и явно разрешает одному и тому же элементу встречаться более одного раза. Set гарантирует противоположное свойство — уникальность: никакие два элемента, считающиеся равными (по equals()), не могут сосуществовать в наборе, — и взамен полностью отказывается от позиционной индексации (метода Set.get(int index) не существует) и, в зависимости от выбранной реализации, может сохранять или не сохранять какой-либо конкретный порядок (HashSet — не сохраняет, LinkedHashSet сохраняет порядок вставки, TreeSet навязывает отсортированный порядок). Выбор между этими двумя интерфейсами должен основываться на том, какая из этих двух гарантий действительно нужна вашей задаче.',
      },
    },
    {
      q: 'What does `List<? extends Number> list` allow you to do?',
      options: [
        'Read elements as Number (or a supertype), but not add elements (except null), since the exact subtype is unknown',
        'Freely add any Number subtype to the list',
        'Only add Integer elements',
        'Nothing — the syntax is invalid',
      ],
      correct: [0],
      explanation:
        'An upper-bounded wildcard like `? extends Number` means "a List of some specific, but unknown, subtype of Number" — the variable could actually be holding a List<Integer>, a List<Double>, or any other Number subtype, and the compiler deliberately does not know which. Reading is always safe: whatever the real subtype is, every element is guaranteed to be at least a Number, so `Number n = list.get(0);` always compiles. Adding is unsafe and therefore forbidden (except for the literal value null, which is trivially compatible with anything): if the compiler let you add an Integer to what is secretly a List<Double> at runtime, that would silently corrupt the list\'s type safety, so it refuses to allow any add() call whose argument type it cannot verify against the unknown exact subtype. This "read from an extends wildcard, write to a super wildcard" rule is often summarized by the mnemonic PECS — Producer Extends, Consumer Super.',
      ru: {
        question: 'Что позволяет делать `List<? extends Number> list`?',
        options: [
          'Читать элементы как Number (или супертип), но не добавлять элементы (кроме null), так как точный подтип неизвестен',
          'Свободно добавлять в список любой подтип Number',
          'Добавлять только элементы типа Integer',
          'Ничего — это некорректный синтаксис',
        ],
        explanation:
          'Верхняя ограниченная маска (wildcard) вида `? extends Number` означает "List некоторого конкретного, но неизвестного, подтипа Number" — переменная может на самом деле хранить List<Integer>, List<Double> или любой другой подтип Number, и компилятор намеренно не знает какой именно. Чтение всегда безопасно: каким бы ни был реальный подтип, каждый элемент гарантированно как минимум Number, поэтому `Number n = list.get(0);` всегда компилируется. Добавление небезопасно и потому запрещено (кроме буквального значения null, тривиально совместимого с чем угодно): если бы компилятор позволил добавить Integer в то, что на деле является List<Double> во время выполнения, это молча нарушило бы типовую безопасность списка, поэтому он отказывается разрешать любой вызов add(), тип аргумента которого невозможно проверить относительно неизвестного точного подтипа. Это правило "читать из extends-маски, писать в super-маску" часто резюмируют мнемоникой PECS — Producer Extends, Consumer Super.',
      },
    },
    {
      q: 'Which Map implementation keeps its keys in sorted order?',
      options: ['TreeMap', 'HashMap', 'LinkedHashMap', 'IdentityHashMap'],
      correct: [0],
      explanation:
        'TreeMap implements SortedMap (and the richer NavigableMap), and it is internally backed by a red-black tree, a self-balancing binary search tree that keeps entries continuously ordered by key as they are inserted, so any iteration over a TreeMap always visits keys in ascending natural order (via Comparable) or according to a Comparator supplied at construction time — this ordering guarantee costs O(log n) per insertion/lookup rather than HashMap\'s average O(1). HashMap gives no ordering guarantee whatsoever (its bucket layout is driven by hash codes, which have no relationship to natural key order). LinkedHashMap preserves insertion order specifically (or optionally access order), not sorted order. IdentityHashMap is a niche implementation that compares keys by reference identity (==) instead of equals(), also with no sorting guarantee.',
      ru: {
        question: 'Какая реализация Map хранит ключи в отсортированном порядке?',
        options: ['TreeMap', 'HashMap', 'LinkedHashMap', 'IdentityHashMap'],
        explanation:
          'TreeMap реализует SortedMap (и более богатый NavigableMap), и внутри основан на красно-чёрном дереве — самобалансирующемся бинарном дереве поиска, которое непрерывно поддерживает записи упорядоченными по ключу по мере вставки, поэтому любая итерация по TreeMap всегда проходит ключи в порядке возрастания по естественному порядку (через Comparable) или согласно Comparator, переданному при создании — эта гарантия упорядоченности стоит O(log n) на вставку/поиск, а не среднего O(1) у HashMap. HashMap вообще не даёт никакой гарантии порядка (расположение по корзинам определяется хеш-кодами, никак не связанными с естественным порядком ключей). LinkedHashMap сохраняет именно порядок вставки (или опционально порядок доступа), а не отсортированный порядок. IdentityHashMap — узкоспециализированная реализация, сравнивающая ключи по идентичности ссылки (==), а не equals(), тоже без гарантии сортировки.',
      },
    },
    {
      q: 'What must be true for an object to be used reliably as a key in a HashMap?',
      options: [
        'It should have consistent, correctly implemented equals() and hashCode() methods',
        'It must implement Comparable',
        'It must be declared immutable and final',
        'It must override toString()',
      ],
      correct: [0],
      explanation:
        'HashMap locates a key\'s bucket by calling hashCode() on it, then, within that bucket, distinguishes between keys that happen to share a bucket by calling equals() — its entire correctness rests on those two methods being consistent with each other, meaning: if two objects are equal according to equals(), they absolutely must return the same hashCode() value (the reverse is not required — unequal objects are allowed to share a hash code, called a collision, which HashMap handles internally, just less efficiently). If a key\'s class relies on Object\'s default identity-based equals()/hashCode() when logical equality was actually intended, or overrides one but not the other, lookups can silently fail to find entries that are logically present. Comparable is unrelated to HashMap (that interface matters for TreeMap/TreeSet or explicit sorting); immutability is strongly recommended as a best practice (a key whose hashCode changes after insertion effectively becomes "lost" in the wrong bucket) but is not technically enforced by the language.',
      ru: {
        question: 'Что должно выполняться, чтобы объект можно было надёжно использовать в качестве ключа в HashMap?',
        options: [
          'У него должны быть согласованные, корректно реализованные методы equals() и hashCode()',
          'Он обязательно должен реализовывать Comparable',
          'Он обязательно должен быть неизменяемым и final',
          'Он обязательно должен переопределять toString()',
        ],
        explanation:
          'HashMap находит корзину ключа, вызывая у него hashCode(), а затем внутри этой корзины различает ключи, оказавшиеся в одной корзине, вызывая equals() — вся его корректность держится на согласованности этих двух методов друг с другом: если два объекта равны согласно equals(), они обязательно должны возвращать одинаковое значение hashCode() (обратное не обязательно — неравные объекты вполне могут иметь общий хеш-код, это называется коллизией, и HashMap обрабатывает это внутри, просто менее эффективно). Если класс ключа полагается на реализацию equals()/hashCode() по умолчанию из Object, основанную на идентичности, когда на самом деле подразумевалось логическое равенство, или переопределяет только один из этих методов, поиск может молча не находить записи, логически присутствующие в карте. Comparable никак не связан с HashMap (этот интерфейс важен для TreeMap/TreeSet или явной сортировки); неизменяемость настоятельно рекомендуется как лучшая практика (ключ, чей hashCode меняется после вставки, фактически "теряется" не в той корзине), но технически языком не навязывается.',
      },
    },
    {
      q: 'Which two collection interfaces do NOT allow duplicate elements? (Choose two)',
      options: ['List', 'Set', 'the key set of a Map', 'Queue'],
      correct: [1, 2],
      explanation:
        'Set enforces uniqueness as its entire defining contract — no two elements that are equal to each other may be present simultaneously. A Map is not itself a Collection of elements, but its key set (returned by keySet()) is explicitly documented to behave like a Set, and for good reason: a key can only ever map to one value at a time, so by construction no two entries in a Map can share the same key. List and Queue both explicitly embrace duplicates as normal — a List can hold the same value at several indices, and a Queue (like a line of people) can easily contain repeated equal items waiting to be processed.',
      ru: {
        question: 'Какие два интерфейса коллекций НЕ допускают дублирующиеся элементы? (Выберите два)',
        options: ['List', 'Set', 'набор ключей (key set) у Map', 'Queue'],
        explanation:
          'Set навязывает уникальность как весь свой определяющий контракт — никакие два элемента, равные друг другу, не могут присутствовать одновременно. Map сам по себе не является коллекцией элементов, но его набор ключей (возвращаемый keySet()) явно документирован как ведущий себя подобно Set, и не просто так: ключ может отображаться только на одно значение за раз, поэтому по построению никакие две записи в Map не могут иметь одинаковый ключ. List и Queue оба явно допускают дубликаты как нормальное явление — List может хранить одно и то же значение по нескольким индексам, а Queue (как очередь людей) вполне может содержать повторяющиеся равные элементы, ожидающие обработки.',
      },
    },
  ],
  lambdas: [
    {
      q: 'What is a functional interface?',
      options: [
        'An interface with exactly one abstract method (it may also have default/static methods)',
        'Any interface that declares a single method of any kind',
        'An interface that must be annotated with @FunctionalInterface to work',
        'An interface with no methods at all',
      ],
      correct: [0],
      explanation:
        'The formal definition, sometimes called a "SAM type" (Single Abstract Method), is an interface that declares exactly one abstract method — everything else on the interface, including any number of default methods, static methods, and private methods, does not count toward that total, since only unimplemented (abstract) methods represent something a lambda expression needs to supply a body for. This single-abstract-method shape is precisely what makes a lambda expression assignable to the interface: the lambda\'s parameter list and body become the implementation of that one abstract method. @FunctionalInterface is only an optional, purely advisory annotation — it triggers a compile-time check that the interface genuinely has exactly one abstract method, catching accidental violations early, but an interface satisfying the SAM shape is usable with lambdas whether or not the annotation is present.',
      ru: {
        question: 'Что такое функциональный интерфейс?',
        options: [
          'Интерфейс ровно с одним абстрактным методом (может иметь также default/static-методы)',
          'Любой интерфейс, объявляющий один метод любого рода',
          'Интерфейс, который обязательно должен быть помечен @FunctionalInterface, чтобы работать',
          'Интерфейс вообще без методов',
        ],
        explanation:
          'Формальное определение, иногда называемое "SAM-типом" (Single Abstract Method — единственный абстрактный метод), — это интерфейс, объявляющий ровно один абстрактный метод — всё остальное в интерфейсе, включая любое количество default-, static- и приватных методов, в этот подсчёт не входит, поскольку только нереализованные (абстрактные) методы представляют собой то, для чего лямбда-выражению нужно предоставить тело. Именно эта форма "один абстрактный метод" делает возможным присвоение лямбда-выражения переменной такого интерфейса: список параметров и тело лямбды становятся реализацией этого единственного абстрактного метода. @FunctionalInterface — лишь необязательная, чисто рекомендательная аннотация — она запускает проверку компилятором того, что у интерфейса действительно ровно один абстрактный метод, отлавливая случайные нарушения на раннем этапе, но интерфейс, соответствующий форме SAM, пригоден для использования с лямбдами независимо от наличия аннотации.',
      },
    },
    {
      q: 'Which built-in functional interface represents a function taking one argument and returning a boolean?',
      options: ['Predicate<T>', 'Function<T,R>', 'Supplier<T>', 'Consumer<T>'],
      correct: [0],
      explanation:
        'Predicate<T> declares a single abstract method, `boolean test(T t)`, making it the standard functional interface for "is this true or false about T" style checks, and it is the interface behind Stream.filter(), Collection.removeIf(), and similar conditional operations. Function<T,R> is the general-purpose "transform a T into an R" interface (its abstract method is `R apply(T t)`), Supplier<T> produces a value from nothing (`T get()`, no input), and Consumer<T> accepts a value and returns nothing (`void accept(T t)`) — each of the four occupies a distinct, deliberately named niche in java.util.function based on how many arguments it takes and whether it returns a value.',
      ru: {
        question: 'Какой встроенный функциональный интерфейс представляет функцию с одним аргументом, возвращающую boolean?',
        options: ['Predicate<T>', 'Function<T,R>', 'Supplier<T>', 'Consumer<T>'],
        explanation:
          'Predicate<T> объявляет единственный абстрактный метод `boolean test(T t)`, что делает его стандартным функциональным интерфейсом для проверок вида "верно ли это про T", и именно он лежит в основе Stream.filter(), Collection.removeIf() и подобных условных операций. Function<T,R> — интерфейс общего назначения "преобразовать T в R" (его абстрактный метод — `R apply(T t)`), Supplier<T> производит значение из ничего (`T get()`, без входных данных), а Consumer<T> принимает значение и ничего не возвращает (`void accept(T t)`) — каждый из четырёх занимает свою отдельную, намеренно названную нишу в java.util.function в зависимости от того, сколько аргументов он принимает и возвращает ли значение.',
      },
    },
    {
      q: 'Which is the correct lambda expression for a Runnable that prints "Hi"?',
      options: ['() -> System.out.println("Hi")', '(void) -> System.out.println("Hi")', '-> System.out.println("Hi")', '() => System.out.println("Hi")'],
      correct: [0],
      explanation:
        'Runnable\'s single abstract method, `void run()`, takes no parameters and returns nothing, and a lambda\'s parameter list must structurally match the target method\'s parameter list — since run() has zero parameters, the lambda needs an empty parameter list, written as a literal empty pair of parentheses, `()`. `->` is Java\'s specific lambda arrow syntax (borrowed conceptually from mathematical notation, not the `=>` used by JavaScript/C#, which is a common cross-language mixup), and the parentheses around the parameter list are mandatory whenever there are zero parameters or more than one — they can only be omitted for the special case of exactly one untyped parameter, like `x -> x * 2`. `void` is never written as a parameter in a lambda\'s parameter list; it is not a value that can be "passed."',
      ru: {
        question: 'Какое лямбда-выражение корректно для Runnable, печатающего "Hi"?',
        options: ['() -> System.out.println("Hi")', '(void) -> System.out.println("Hi")', '-> System.out.println("Hi")', '() => System.out.println("Hi")'],
        explanation:
          'Единственный абстрактный метод Runnable, `void run()`, не принимает параметров и ничего не возвращает, а список параметров лямбды должен структурно совпадать со списком параметров целевого метода — поскольку у run() ноль параметров, лямбде нужен пустой список параметров, записанный как буквальная пустая пара скобок, `()`. `->` — это специфичный для Java синтаксис стрелки лямбды (концептуально заимствован из математической нотации, а не `=>`, используемый в JavaScript/C#, что частая путаница между языками), а скобки вокруг списка параметров обязательны всегда, когда параметров ноль или больше одного — их можно опустить только в особом случае ровно одного нетипизированного параметра, вроде `x -> x * 2`. void никогда не пишется как параметр в списке параметров лямбды; это не значение, которое можно "передать".',
      },
    },
    {
      q: 'What must be true of a local variable from the enclosing scope that is used inside a lambda expression?',
      options: [
        'It must be final or effectively final',
        'It must be declared static',
        'It must be a primitive type',
        'It must be redeclared inside the lambda body',
      ],
      correct: [0],
      explanation:
        'A lambda expression can outlive the method call that created it (it might be stored, passed around, and invoked much later), so Java captures the value of any local variable it references at the moment the lambda is created, rather than keeping a live link back to the original variable\'s storage location — this is called "capture by value." For that captured snapshot to remain meaningful and consistent no matter when the lambda eventually runs, the compiler requires the captured local variable to never change after being initialized — either explicitly marked final, or "effectively final" (simply never reassigned anywhere in the enclosing scope, even without the keyword). This restriction applies equally to reference types and primitives, and has nothing to do with static — plenty of instance-scope or method-local variables are captured this way with no static modifier involved.',
      ru: {
        question: 'Что должно выполняться для локальной переменной из внешней области видимости, используемой внутри лямбды?',
        options: [
          'Она должна быть final или эффективно final',
          'Она обязательно должна быть объявлена как static',
          'Она обязательно должна быть примитивного типа',
          'Она должна быть заново объявлена внутри тела лямбды',
        ],
        explanation:
          'Лямбда-выражение может пережить вызов метода, который его создал (её можно сохранить, передать дальше и вызвать намного позже), поэтому Java захватывает значение любой используемой ею локальной переменной в момент создания лямбды, а не сохраняет живую связь с исходным местом хранения переменной — это называется "захват по значению". Чтобы этот захваченный "снимок" оставался осмысленным и согласованным независимо от того, когда лямбда в итоге выполнится, компилятор требует, чтобы захваченная локальная переменная никогда не менялась после инициализации — либо явно помечена final, либо "эффективно final" (просто никогда не переприсваивается нигде во внешней области видимости, даже без ключевого слова). Это ограничение одинаково применяется и к ссылочным типам, и к примитивам, и никак не связано со static — множество переменных области экземпляра или локальных переменных метода захватываются таким образом без всякого модификатора static.',
      },
    },
    {
      q: 'Which functional interface takes no arguments and returns a value?',
      options: ['Supplier<T>', 'Consumer<T>', 'Predicate<T>', 'BiFunction<T,U,R>'],
      correct: [0],
      explanation:
        'Supplier<T>\'s abstract method is `T get()` — no parameters at all, and a return value of type T — which matches exactly the "produce/generate a value on demand, from no input" role, commonly used for lazy value generation (like `Optional.orElseGet(Supplier)`) or object factories. Consumer<T> is the inverse shape — it takes a T and returns nothing (`void accept(T t)`). Predicate<T> takes a T and returns a boolean. BiFunction<T,U,R> takes two arguments (T and U) and returns an R. Each of these interfaces in java.util.function is named systematically around the number of inputs (none, one via the base name, two via the "Bi" prefix) and whether it returns a value (Function/BiFunction), a boolean specifically (Predicate), or nothing (Consumer).',
      ru: {
        question: 'Какой функциональный интерфейс не принимает аргументов и возвращает значение?',
        options: ['Supplier<T>', 'Consumer<T>', 'Predicate<T>', 'BiFunction<T,U,R>'],
        explanation:
          'Абстрактный метод Supplier<T> — это `T get()`: вообще без параметров, и возвращаемое значение типа T — что в точности соответствует роли "произвести/сгенерировать значение по запросу, без входных данных", часто используемой для ленивой генерации значений (например, `Optional.orElseGet(Supplier)`) или фабрик объектов. Consumer<T> — обратная форма: принимает T и ничего не возвращает (`void accept(T t)`). Predicate<T> принимает T и возвращает boolean. BiFunction<T,U,R> принимает два аргумента (T и U) и возвращает R. Каждый из этих интерфейсов в java.util.function назван систематически, исходя из количества входных данных (ноль, один через базовое имя, два через приставку "Bi") и того, возвращает ли он значение (Function/BiFunction), именно boolean (Predicate), или ничего (Consumer).',
      },
    },
    {
      q: 'What does the method reference `String::toUpperCase` represent?',
      options: [
        'A shorthand for a lambda that calls toUpperCase() on its input argument',
        'A reference to a static method only',
        'A constructor reference',
        'Invalid syntax before Java 11',
      ],
      correct: [0],
      explanation:
        'Java recognizes several distinct "shapes" of method reference, and `ClassName::instanceMethodName` — with no particular object mentioned before the double colon — is specifically the "reference to an instance method of an arbitrary object of a particular type" form: it is equivalent to a lambda whose single (first) parameter becomes the object the instance method is called on. So `String::toUpperCase` behaves exactly like the lambda `s -> s.toUpperCase()`, taking a String parameter and calling toUpperCase() on it. This is different from `object::instanceMethodName` (bound to one specific, already-existing object), `ClassName::staticMethodName` (a genuinely static method reference), and `ClassName::new` (a constructor reference) — all four forms have existed since method references were introduced in Java 8, not Java 11.',
      ru: {
        question: 'Что представляет собой ссылка на метод `String::toUpperCase`?',
        options: [
          'Сокращённую запись лямбды, вызывающей toUpperCase() у своего входного аргумента',
          'Ссылку только на статический метод',
          'Ссылку на конструктор',
          'Недопустимый синтаксис до Java 11',
        ],
        explanation:
          'Java различает несколько отдельных "форм" ссылок на метод, и `ИмяКласса::имяМетодаЭкземпляра` — без указания конкретного объекта перед двойным двоеточием — это конкретно форма "ссылка на метод экземпляра произвольного объекта заданного типа": она эквивалентна лямбде, чей единственный (первый) параметр становится объектом, у которого вызывается этот метод экземпляра. Поэтому `String::toUpperCase` ведёт себя точно так же, как лямбда `s -> s.toUpperCase()`, принимая параметр String и вызывая у него toUpperCase(). Это отличается от `объект::имяМетодаЭкземпляра` (привязана к одному конкретному, уже существующему объекту), `ИмяКласса::имяСтатическогоМетода` (действительно статическая ссылка на метод) и `ИмяКласса::new` (ссылка на конструктор) — все четыре формы существуют с момента появления ссылок на методы в Java 8, а не в Java 11.',
      },
    },
    {
      q: 'Which two are valid functional interfaces from the java.util.function package? (Choose two)',
      options: ['Predicate<T>', 'Runnable', 'Function<T,R>', 'Comparable<T>'],
      correct: [0, 2],
      explanation:
        'Predicate<T> and Function<T,R> are both defined directly in java.util.function, the package Java 8 introduced specifically to hold a standard library of general-purpose functional interfaces for use with lambdas and streams. Runnable and Comparable<T> are each genuinely valid functional interfaces too (both have exactly one abstract method and can be used with lambdas), but neither lives in java.util.function — Runnable is one of the oldest interfaces in Java, defined in java.lang since version 1.0, long before lambdas existed, and Comparable<T> lives in java.lang as well. This distinction matters on the exam because questions sometimes specifically test whether you know which interfaces belong to the newer java.util.function family versus older, unrelated interfaces that merely happen to also qualify as functional.',
      ru: {
        question: 'Какие два являются функциональными интерфейсами именно из пакета java.util.function? (Выберите два)',
        options: ['Predicate<T>', 'Runnable', 'Function<T,R>', 'Comparable<T>'],
        explanation:
          'Predicate<T> и Function<T,R> оба определены прямо в java.util.function — пакете, который Java 8 ввела специально, чтобы содержать стандартную библиотеку функциональных интерфейсов общего назначения для использования с лямбдами и потоками. Runnable и Comparable<T> тоже по-настоящему являются валидными функциональными интерфейсами (у обоих ровно один абстрактный метод, и оба можно использовать с лямбдами), но ни один из них не находится в java.util.function — Runnable один из старейших интерфейсов Java, определён в java.lang с версии 1.0, задолго до появления лямбд, а Comparable<T> тоже находится в java.lang. Это различие важно на экзамене, потому что вопросы иногда специально проверяют, знаете ли вы, какие интерфейсы принадлежат более новому семейству java.util.function, а какие — более старые, не связанные с ним интерфейсы, которые лишь заодно тоже подходят под определение функциональных.',
      },
    },
  ],
  streams: [
    {
      q: 'What does Stream.filter() do?',
      options: [
        'Returns a new stream containing only the elements matching the given predicate',
        'Modifies the source collection in place',
        'Terminates the stream and returns a List',
        'Sorts the elements of the stream',
      ],
      correct: [0],
      explanation:
        'filter() takes a Predicate<T> and returns a brand-new Stream that, when eventually consumed, will only include the elements from the upstream source for which the predicate returned true — it is an intermediate operation, meaning it is lazy and does not actually touch any elements the moment it is called; it just describes one more stage of the eventual pipeline. Streams never mutate their backing source collection at all (they are a separate abstraction layered on top of a data source, not a view that writes back to it), so filter() cannot and does not remove anything from the original List or array it was built from. It does not terminate the pipeline either — filter() itself returns another Stream, which must still be followed by an actual terminal operation like collect(), forEach(), or count() before anything runs.',
      ru: {
        question: 'Что делает Stream.filter()?',
        options: [
          'Возвращает новый поток, содержащий только элементы, удовлетворяющие переданному предикату',
          'Изменяет исходную коллекцию на месте',
          'Завершает поток и возвращает List',
          'Сортирует элементы потока',
        ],
        explanation:
          'filter() принимает Predicate<T> и возвращает совершенно новый Stream, который при итоговом потреблении будет включать только те элементы из исходного источника, для которых предикат вернул true — это промежуточная операция, а значит она ленивая и не трогает никакие элементы в момент самого вызова; она лишь описывает ещё одну стадию будущего конвейера. Потоки вообще никогда не изменяют свою исходную коллекцию (они отдельная абстракция, надстроенная над источником данных, а не представление, записывающее изменения обратно в него), поэтому filter() не может и не удаляет ничего из исходного List или массива, из которого был построен. Он также не завершает конвейер — сам filter() возвращает ещё один Stream, за которым всё равно должна следовать настоящая терминальная операция вроде collect(), forEach() или count(), прежде чем что-то реально выполнится.',
      },
    },
    {
      q: 'Which of the following is a terminal operation on a Stream?',
      options: ['collect()', 'filter()', 'map()', 'sorted()'],
      correct: [0],
      explanation:
        'Stream operations split cleanly into two categories. Intermediate operations — filter(), map(), sorted(), distinct(), limit(), and similar — each return another Stream, are entirely lazy, and simply add a stage to a pipeline description without processing any data yet. Terminal operations — collect(), forEach(), count(), reduce(), anyMatch(), and similar — are what actually trigger the pipeline to run: calling one walks the entire chain of previously-described intermediate stages, processes the elements (often in a single combined pass, thanks to laziness), and produces a final, non-Stream result (a List, a count, a boolean, and so on). collect() is the classic terminal operation used to gather a stream\'s elements into a concrete collection, and after any terminal operation runs, that particular stream instance is considered "consumed" and cannot be reused.',
      ru: {
        question: 'Какая из перечисленных операций является терминальной для Stream?',
        options: ['collect()', 'filter()', 'map()', 'sorted()'],
        explanation:
          'Операции Stream чётко делятся на две категории. Промежуточные операции — filter(), map(), sorted(), distinct(), limit() и подобные — каждая возвращает ещё один Stream, они полностью ленивы и просто добавляют стадию в описание конвейера, ещё не обрабатывая никаких данных. Терминальные операции — collect(), forEach(), count(), reduce(), anyMatch() и подобные — это то, что реально запускает выполнение конвейера: вызов одной из них проходит всю цепочку ранее описанных промежуточных стадий, обрабатывает элементы (часто за один объединённый проход благодаря лени) и производит итоговый результат, уже не являющийся Stream (List, число, boolean и т.д.). collect() — классическая терминальная операция, используемая для сборки элементов потока в конкретную коллекцию, и после выполнения любой терминальной операции конкретный экземпляр потока считается "потреблённым" и не может быть переиспользован.',
      },
    },
    {
      q: 'What happens if you try to reuse a Stream after a terminal operation has already been invoked on it?',
      options: [
        'IllegalStateException is thrown, because a stream can only be consumed once',
        'The stream automatically resets and can be reused',
        'It silently returns an empty stream',
        'It works with no restrictions',
      ],
      correct: [0],
      explanation:
        'A Stream is explicitly designed as a one-time, single-use pipeline, unlike a Collection, which can be iterated over as many times as you want. The moment a terminal operation fully consumes a stream (running the entire chain of upstream operations to completion), the JDK internally marks that specific stream object as "operated upon / closed," and any subsequent attempt to call another operation on that same stream reference — intermediate or terminal — throws IllegalStateException with a message about the stream having already been operated upon or closed. If you need to run a pipeline again, the correct approach is to build a brand-new stream from the original data source (e.g., call .stream() on the source collection again), not to try to reuse the exhausted Stream object itself.',
      ru: {
        question: 'Что произойдёт при попытке повторно использовать Stream после того, как на нём уже была вызвана терминальная операция?',
        options: [
          'Будет выброшено IllegalStateException, так как поток можно "потребить" только один раз',
          'Поток автоматически сбросится и станет доступен для повторного использования',
          'Он молча вернёт пустой поток',
          'Это сработает без каких-либо ограничений',
        ],
        explanation:
          'Stream намеренно спроектирован как одноразовый конвейер, в отличие от Collection, которую можно перебирать сколько угодно раз. В момент, когда терминальная операция полностью потребляет поток (доводя выполнение всей цепочки предыдущих операций до конца), JDK внутри помечает именно этот объект потока как "уже обработанный / закрытый", и любая последующая попытка вызвать другую операцию на той же ссылке на поток — промежуточную или терминальную — выбрасывает IllegalStateException с сообщением о том, что поток уже был обработан или закрыт. Если конвейер нужно запустить снова, правильный подход — построить совершенно новый поток из исходного источника данных (например, снова вызвать .stream() у исходной коллекции), а не пытаться переиспользовать уже исчерпанный объект Stream.',
      },
    },
    {
      q: 'What does `IntStream.range(1, 5)` produce?',
      options: ['1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '2, 3, 4, 5'],
      correct: [0],
      explanation:
        'IntStream.range(startInclusive, endExclusive) follows the same half-open interval convention used throughout Java\'s standard library (the same pattern seen in String.substring, for instance): the start value is included, and the loop-like sequence stops right before reaching the end value, which is never itself included. range(1, 5) therefore produces exactly the integers 1, 2, 3, and 4 — four values total, computed as end minus start. If the endpoint itself needed to be included, the alternative method IntStream.rangeClosed(1, 5) exists specifically for that, producing 1 through 5 inclusive.',
      ru: {
        question: 'Что произведёт `IntStream.range(1, 5)`?',
        options: ['1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '2, 3, 4, 5'],
        explanation:
          'IntStream.range(startInclusive, endExclusive) следует тому же соглашению о полуоткрытом интервале, которое используется во всей стандартной библиотеке Java (тот же паттерн, что и в String.substring, например): начальное значение включается, а последовательность, похожая на цикл, останавливается прямо перед достижением конечного значения, которое никогда не включается само. range(1, 5), таким образом, производит ровно числа 1, 2, 3 и 4 — всего четыре значения, вычисляемых как конец минус начало. Если сама конечная точка тоже нужна, для этого специально существует альтернативный метод IntStream.rangeClosed(1, 5), производящий значения от 1 до 5 включительно.',
      },
    },
    {
      q: 'What is the purpose of Collectors.toList() when used with .collect()?',
      options: [
        'Accumulates the stream elements into a new List',
        'Sorts the stream elements before returning them',
        'Converts the stream into an array',
        'Filters out null elements automatically',
      ],
      correct: [0],
      explanation:
        'collect() is a general-purpose terminal operation that needs to be told exactly how to accumulate the stream\'s elements into a final result, and that "how" is expressed by a Collector object passed as its argument. Collectors.toList() is a ready-made Collector, provided by the standard java.util.stream.Collectors utility class, whose entire job is simply to gather every element the stream produces, in encounter order, into a new List (the JDK does not guarantee a specific List implementation, though it is typically an ArrayList in practice). It performs no sorting, no filtering, and no type conversion beyond building that list — those behaviors would require entirely different Collectors, like Collectors.toSet(), a sorted() intermediate step, or a specific mapping.',
      ru: {
        question: 'Какова цель Collectors.toList() при использовании с .collect()?',
        options: [
          'Накапливает элементы потока в новый List',
          'Сортирует элементы потока перед возвратом',
          'Преобразует поток в массив',
          'Автоматически отфильтровывает null-элементы',
        ],
        explanation:
          'collect() — терминальная операция общего назначения, которой нужно явно сказать, как именно накопить элементы потока в итоговый результат, и это "как" выражается объектом Collector, передаваемым в качестве аргумента. Collectors.toList() — готовый Collector, предоставляемый стандартным вспомогательным классом java.util.stream.Collectors, вся задача которого — просто собрать каждый элемент, произведённый потоком, в порядке обхода, в новый List (JDK не гарантирует конкретную реализацию List, хотя на практике обычно это ArrayList). Он не выполняет никакой сортировки, фильтрации или преобразования типов сверх построения этого списка — для таких поведений понадобились бы совершенно другие Collector\'ы, вроде Collectors.toSet(), промежуточный шаг sorted() или конкретное отображение.',
      },
    },
    {
      q: 'Which statement about Stream pipeline execution is true?',
      options: [
        'Intermediate operations are lazy and only run once a terminal operation is invoked',
        'Intermediate operations execute immediately when called',
        'A pipeline cannot contain more than one intermediate operation',
        'Terminal operations can be chained indefinitely on the same stream',
      ],
      correct: [0],
      explanation:
        'Every intermediate operation call (filter, map, sorted, and so on) merely records a description of one more processing stage onto the pipeline and immediately returns a new Stream object representing that extended description — none of the actual per-element work happens yet. Only when a terminal operation is finally invoked does the JVM walk the source data through the entire recorded chain of stages, and it typically does this in a single combined pass per element rather than fully finishing one stage for all elements before starting the next, which is a significant performance advantage over eagerly materializing an intermediate collection at every step. A pipeline can chain as many intermediate operations together as needed, one after another, but it may only ever have exactly one terminal operation, since that operation consumes the stream and marks it unusable for anything further.',
      ru: {
        question: 'Какое утверждение о выполнении конвейера Stream верно?',
        options: [
          'Промежуточные операции ленивы и выполняются только при вызове терминальной операции',
          'Промежуточные операции выполняются немедленно при вызове',
          'Конвейер не может содержать более одной промежуточной операции',
          'Терминальные операции можно бесконечно цеплять на один и тот же поток',
        ],
        explanation:
          'Каждый вызов промежуточной операции (filter, map, sorted и т.д.) лишь фиксирует описание ещё одной стадии обработки в конвейере и сразу возвращает новый объект Stream, представляющий это расширенное описание — никакая реальная поэлементная работа ещё не выполняется. Только когда в конце концов вызывается терминальная операция, JVM проводит исходные данные через всю зафиксированную цепочку стадий, и обычно делает это за один объединённый проход на элемент, а не полностью завершая одну стадию для всех элементов перед началом следующей, что даёт существенное преимущество в производительности по сравнению с жадным материализованием промежуточной коллекции на каждом шаге. Конвейер может сцеплять сколько угодно промежуточных операций одну за другой, но у него может быть ровно одна терминальная операция, поскольку она потребляет поток и делает его непригодным для дальнейшего использования.',
      },
    },
    {
      q: 'Which two are terminal operations on a Stream? (Choose two)',
      options: ['forEach', 'map', 'collect', 'filter'],
      correct: [0, 2],
      explanation:
        'forEach() consumes the stream by executing a given action once per element and returns void, and collect() consumes it by accumulating its elements into a result using a Collector — both trigger the pipeline to actually run and both leave the stream exhausted afterward, which is the defining property of a terminal operation. map() and filter() are both intermediate operations instead: map() transforms each element and returns a new Stream of the transformed elements, and filter() selects a subset and also returns a new Stream — neither one, by itself, forces any element to actually be processed or consumes the stream; they simply extend the pipeline description for whatever terminal operation eventually follows.',
      ru: {
        question: 'Какие две операции являются терминальными для Stream? (Выберите два)',
        options: ['forEach', 'map', 'collect', 'filter'],
        explanation:
          'forEach() потребляет поток, выполняя заданное действие один раз для каждого элемента, и возвращает void, а collect() потребляет его, накапливая элементы в результат с помощью Collector — обе действительно запускают выполнение конвейера и обе оставляют поток исчерпанным после себя, что и является определяющим свойством терминальной операции. map() и filter(), напротив, обе являются промежуточными операциями: map() преобразует каждый элемент и возвращает новый Stream с преобразованными элементами, а filter() отбирает подмножество и тоже возвращает новый Stream — ни одна из них сама по себе не заставляет реально обработать хоть один элемент и не потребляет поток; они лишь расширяют описание конвейера для той терминальной операции, которая в итоге за ними последует.',
      },
    },
  ],
  'exceptions-assertions': [
    {
      q: 'How do you enable assertions when running a Java application from the command line?',
      options: ['java -ea MyClass', 'java -assert MyClass', 'Assertions are enabled by default', 'java -enable-assertions=true MyClass'],
      correct: [0],
      explanation:
        'assert statements are disabled at runtime by default across the entire JVM, deliberately, so that assertion-checking code (which is meant purely for catching programmer bugs during development and testing) carries essentially zero cost in a production deployment. The -ea flag (or its full spelled-out form, -enableassertions) flips that default on for the launched JVM instance; it can also be scoped more narrowly to just a specific package or class if desired. Because the default is "off," a developer must always remember to pass -ea explicitly during testing, or every assert statement in the codebase will simply be skipped over with no effect and no warning.',
      ru: {
        question: 'Как включить проверку assert при запуске Java-приложения из командной строки?',
        options: ['java -ea MyClass', 'java -assert MyClass', 'Assert включены по умолчанию', 'java -enable-assertions=true MyClass'],
        explanation:
          'Операторы assert по умолчанию отключены во время выполнения во всей JVM, намеренно, чтобы код проверки утверждений (предназначенный исключительно для отлова ошибок программиста во время разработки и тестирования) практически не имел стоимости в продакшене. Флаг -ea (или его полная развёрнутая форма, -enableassertions) переключает это значение по умолчанию на "включено" для запущенного экземпляра JVM; при желании его также можно ограничить конкретным пакетом или классом. Поскольку по умолчанию проверка "выключена", разработчик всегда должен не забывать явно передавать -ea во время тестирования, иначе каждый оператор assert в кодовой базе будет просто пропускаться без эффекта и без предупреждения.',
      },
    },
    {
      q: 'What happens to an `assert` statement when assertions are disabled (the default)?',
      options: [
        'It is effectively ignored — no evaluation occurs',
        'It always throws AssertionError',
        'It logs a warning to standard error',
        'It causes a compile-time error',
      ],
      correct: [0],
      explanation:
        'When assertions are disabled, the JVM does not merely skip throwing an error if the assertion would have failed — it skips evaluating the assertion\'s boolean expression entirely, at essentially zero runtime cost. This is important to understand for a subtle reason: any side effects inside an assert expression (like calling a method that increments a counter) simply will not happen at all when assertions are off, which is exactly why assert expressions should never be relied on to produce a needed side effect — production code with assertions disabled must behave identically whether or not those expressions ever ran. No warning is logged and no compile-time error occurs either way; assert is purely a runtime behavior toggle.',
      ru: {
        question: 'Что происходит с оператором `assert`, когда проверка assert отключена (значение по умолчанию)?',
        options: [
          'Он фактически игнорируется — вычисления не происходит',
          'Он всегда выбрасывает AssertionError',
          'Он выводит предупреждение в стандартный поток ошибок',
          'Это вызывает ошибку компиляции',
        ],
        explanation:
          'Когда проверка assert отключена, JVM не просто пропускает выброс ошибки в случае, если утверждение оказалось бы ложным, — она вообще не вычисляет булево выражение утверждения, практически без затрат во время выполнения. Это важно понимать по тонкой причине: любые побочные эффекты внутри выражения assert (например, вызов метода, увеличивающего счётчик) попросту не произойдут вообще, когда проверка assert отключена, именно поэтому на выражения assert никогда нельзя полагаться для получения нужного побочного эффекта — код в продакшене с отключённой проверкой assert должен вести себя одинаково независимо от того, выполнялись ли эти выражения когда-либо. Никакое предупреждение не логируется, и ошибка компиляции тоже не возникает в любом случае; assert — это исключительно переключатель поведения во время выполнения.',
      },
    },
    {
      q: 'Which class should custom checked exceptions typically extend?',
      options: ['Exception', 'RuntimeException', 'Error', 'Throwable directly'],
      correct: [0],
      explanation:
        'Whether a custom exception ends up being checked or unchecked is decided entirely by which class it extends, not by any special keyword or annotation. Extending Exception directly (and not RuntimeException, which is itself a subclass of Exception but is specifically excluded from the "checked" category by the compiler\'s rules) makes the new exception type checked — meaning any method that can throw it must either catch it or declare it in a throws clause, and callers of that method are forced to handle it too. Extending RuntimeException instead would make the exception unchecked, appropriate for signaling programming errors rather than expected, recoverable conditions. Extending Error or Throwable directly is reserved for JVM-level or extremely unusual circumstances and is almost never appropriate for ordinary application-level exceptions.',
      ru: {
        question: 'От какого класса обычно должны наследоваться пользовательские проверяемые исключения?',
        options: ['Exception', 'RuntimeException', 'Error', 'Напрямую от Throwable'],
        explanation:
          'То, окажется ли пользовательское исключение проверяемым или непроверяемым, целиком определяется тем, от какого класса оно наследуется, а не каким-то особым ключевым словом или аннотацией. Наследование напрямую от Exception (а не от RuntimeException, который сам является подклассом Exception, но специально исключён из категории "проверяемых" правилами компилятора) делает новый тип исключения проверяемым — то есть любой метод, способный его выбросить, обязан либо поймать его, либо объявить в предложении throws, и вызывающий код этого метода тоже вынужден его обрабатывать. Наследование вместо этого от RuntimeException сделало бы исключение непроверяемым, что уместно для сигнализации об ошибках программирования, а не об ожидаемых, восстановимых условиях. Наследование напрямую от Error или Throwable зарезервировано для обстоятельств уровня JVM или крайне необычных случаев и почти никогда не уместно для обычных исключений уровня приложения.',
      },
    },
    {
      q: 'What is a multi-catch block used for?',
      options: [
        'Catching several exception types in a single catch clause using the pipe (|) operator',
        'Catching exceptions thrown from multiple try blocks at once',
        'Declaring multiple finally blocks for one try',
        'Automatically rethrowing caught exceptions',
      ],
      correct: [0],
      explanation:
        'Before Java 7, handling several unrelated exception types identically required either duplicating the same catch body multiple times or catching the broad common supertype Exception (losing precision about what was actually caught). Multi-catch, introduced in Java 7, solves this cleanly: writing `catch (IOException | SQLException e) { ... }` lets one catch block handle either of those listed exception types with a single shared body, while the compiler still gives e a precise static type (the most specific common supertype of the listed alternatives) inside that block. It has nothing to do with multiple try blocks or multiple finally blocks (a try can only ever have one finally), and it does not rethrow anything automatically — the block still needs to explicitly rethrow if that behavior is desired.',
      ru: {
        question: 'Для чего используется multi-catch блок?',
        options: [
          'Для отлова нескольких типов исключений в одном блоке catch с помощью оператора | (pipe)',
          'Для отлова исключений сразу из нескольких блоков try',
          'Для объявления нескольких блоков finally у одного try',
          'Для автоматического повторного выбрасывания пойманных исключений',
        ],
        explanation:
          'До Java 7 одинаковая обработка нескольких несвязанных типов исключений требовала либо дублирования одного и того же тела catch несколько раз, либо отлова широкого общего супертипа Exception (теряя точность о том, что на самом деле было поймано). Multi-catch, появившийся в Java 7, решает это элегантно: запись `catch (IOException | SQLException e) { ... }` позволяет одному блоку catch обрабатывать любой из перечисленных типов исключений с единым общим телом, при этом компилятор всё равно даёт e точный статический тип (наиболее специфичный общий супертип перечисленных альтернатив) внутри этого блока. Он никак не связан с несколькими блоками try или несколькими finally (у try может быть только один finally), и он ничего не выбрасывает повторно автоматически — блоку всё равно нужно явно перевыбросить исключение, если требуется такое поведение.',
      },
    },
    {
      q: 'In `catch (IOException | SQLException e)`, what restriction applies to the listed exception types?',
      options: [
        'None of them may be a subclass of another in the list (no overlapping hierarchy)',
        'They must share an explicit common superclass',
        'They must both be unchecked exceptions',
        'There is no restriction at all',
      ],
      correct: [0],
      explanation:
        'The compiler forbids listing two exception types in the same multi-catch clause when one is already a subclass of the other, because doing so would be redundant and misleading — if you catch (FileNotFoundException | IOException e), the more specific FileNotFoundException alternative is entirely pointless, since IOException already matches it. Requiring genuinely unrelated types (like IOException and SQLException, which share nothing closer than Exception) ensures multi-catch is used for its intended purpose: handling distinct, unrelated failure types identically, not for expressing a hierarchy relationship, which a single catch of the common supertype would already express more simply. The listed types are not required to share any particular explicit common superclass beyond the implicit Throwable/Exception hierarchy, and they can be a mix of checked and unchecked types as long as none is a subtype of another in the same list.',
      ru: {
        question: 'В `catch (IOException | SQLException e)`, какое ограничение действует на перечисленные типы исключений?',
        options: [
          'Ни один из них не может быть подклассом другого в списке (иерархии не должны пересекаться)',
          'Они обязательно должны иметь явный общий суперкласс',
          'Оба должны быть непроверяемыми исключениями',
          'Никаких ограничений нет',
        ],
        explanation:
          'Компилятор запрещает перечислять два типа исключений в одном multi-catch, если один из них уже является подклассом другого, потому что это было бы избыточно и вводило бы в заблуждение — если написать catch (FileNotFoundException | IOException e), более специфичная альтернатива FileNotFoundException совершенно бессмысленна, поскольку IOException уже её покрывает. Требование действительно несвязанных типов (как IOException и SQLException, у которых нет ничего ближе общего, чем Exception) гарантирует, что multi-catch используется по назначению: одинаковая обработка отдельных, несвязанных типов сбоев, а не выражение иерархических отношений, которое уже проще выразить одним catch общего супертипа. Перечисленные типы не обязаны иметь какой-то конкретный явный общий суперкласс сверх неявной иерархии Throwable/Exception, и они могут быть смесью проверяемых и непроверяемых типов, пока ни один не является подтипом другого в том же списке.',
      },
    },
    {
      q: 'What does `Locale.setDefault()` affect?',
      options: [
        'The default locale used for formatting dates, numbers, and messages when no explicit Locale is supplied',
        'Only the display language of exception messages',
        "The JVM's system timezone",
        'The character encoding used for reading files',
      ],
      correct: [0],
      explanation:
        'A Locale bundles together region- and language-specific formatting conventions — how dates are ordered, which decimal and grouping separators numbers use, which currency symbol appears, and which language a localized message bundle resolves to. Many locale-aware APIs across java.text, java.time, and internationalization-related classes silently fall back to whatever Locale.getDefault() currently returns whenever a call site does not pass an explicit Locale argument, so calling Locale.setDefault(newLocale) changes that fallback for the entire JVM going forward, affecting any subsequent locale-sensitive formatting that does not specify its own locale. It has no relationship to timezone (that is a separate concept, represented by ZoneId/TimeZone) or to file character encoding (governed by Charset), and it does not automatically translate exception messages, which are typically hardcoded in whatever language the library author wrote them in.',
      ru: {
        question: 'На что влияет `Locale.setDefault()`?',
        options: [
          'На локаль по умолчанию, используемую для форматирования дат, чисел и сообщений, если Locale не передан явно',
          'Только на язык отображения сообщений исключений',
          'На системный часовой пояс JVM',
          'На кодировку символов при чтении файлов',
        ],
        explanation:
          'Locale объединяет региональные и языковые соглашения о форматировании — порядок частей даты, какие разделители дробной части и групп разрядов используются в числах, какой символ валюты отображается, и на какой язык разрешается локализованный пакет сообщений. Многие API, учитывающие локаль, в java.text, java.time и классах, связанных с интернационализацией, молча используют в качестве запасного варианта то, что в данный момент возвращает Locale.getDefault(), когда место вызова не передаёт явный аргумент Locale, поэтому вызов Locale.setDefault(newLocale) меняет этот запасной вариант для всей JVM на будущее, затрагивая любое последующее форматирование, учитывающее локаль, которое не указывает собственную локаль. Он никак не связан с часовым поясом (это отдельное понятие, представленное ZoneId/TimeZone) или с кодировкой символов файлов (регулируется Charset), и он не переводит автоматически сообщения исключений, которые обычно жёстко закодированы на том языке, на котором их написал автор библиотеки.',
      },
    },
    {
      q: 'Which two exception types are unchecked? (Choose two)',
      options: ['IllegalArgumentException', 'java.io.IOException', 'ArithmeticException', 'java.sql.SQLException'],
      correct: [0, 2],
      explanation:
        'IllegalArgumentException and ArithmeticException are both subclasses of RuntimeException, which makes them unchecked — the compiler never requires code to catch them or declare them in a throws clause, consistent with the fact that they typically represent a caller passing invalid input or triggering an invalid operation (like division by zero), which is generally considered a programming error rather than an expected, externally-caused condition. IOException and SQLException are both checked exceptions, descending directly from Exception rather than RuntimeException, precisely because the failures they represent — a file that cannot be opened, a database connection that fails — are genuinely expected possibilities when interacting with external systems, and the compiler forces calling code to consciously acknowledge and handle that possibility.',
      ru: {
        question: 'Какие два типа исключений являются непроверяемыми? (Выберите два)',
        options: ['IllegalArgumentException', 'java.io.IOException', 'ArithmeticException', 'java.sql.SQLException'],
        explanation:
          'IllegalArgumentException и ArithmeticException оба являются подклассами RuntimeException, что делает их непроверяемыми — компилятор никогда не требует ловить их или объявлять в throws, что согласуется с тем, что они обычно представляют передачу вызывающим кодом некорректных входных данных или запуск некорректной операции (например, деление на ноль), что в целом считается ошибкой программирования, а не ожидаемым, вызванным извне условием. IOException и SQLException — оба проверяемые исключения, происходящие напрямую от Exception, а не от RuntimeException, именно потому что сбои, которые они представляют — файл, который невозможно открыть, соединение с базой данных, которое обрывается, — действительно ожидаемые возможности при взаимодействии с внешними системами, и компилятор заставляет вызывающий код осознанно признать и обработать эту возможность.',
      },
    },
  ],
  'java-io': [
    {
      q: 'Which approach reads a text file into lines easily using modern NIO.2 APIs?',
      options: ['Files.readAllLines(Path) or Files.lines(Path)', 'FileInputStream used directly for text', 'RandomAccessFile', 'ObjectInputStream'],
      correct: [0],
      explanation:
        'The java.nio.file.Files utility class, part of the NIO.2 API introduced in Java 7, offers high-level, static convenience methods that hide the boilerplate of manually wrapping streams and readers together. Files.readAllLines(Path) reads the entire file eagerly and returns a List<String> with one entry per line, while Files.lines(Path) does the same job lazily, returning a Stream<String> suitable for very large files that should not be fully loaded into memory at once. FileInputStream operates on raw bytes, not decoded text, and reading text correctly through it directly (handling character encoding) requires wrapping it with an InputStreamReader; RandomAccessFile and ObjectInputStream serve entirely different purposes — random-access binary positioning and Java object deserialization, respectively — neither is meant for simple line-based text reading.',
      ru: {
        question: 'Какой подход удобно читает текстовый файл построчно с помощью современного API NIO.2?',
        options: ['Files.readAllLines(Path) или Files.lines(Path)', 'Прямое использование FileInputStream для текста', 'RandomAccessFile', 'ObjectInputStream'],
        explanation:
          'Вспомогательный класс java.nio.file.Files, часть API NIO.2, появившегося в Java 7, предлагает высокоуровневые статические удобные методы, скрывающие шаблонный код ручного оборачивания потоков и ридеров друг в друга. Files.readAllLines(Path) читает весь файл жадно и возвращает List<String> с одной записью на строку, а Files.lines(Path) делает ту же работу лениво, возвращая Stream<String>, подходящий для очень больших файлов, которые не стоит загружать в память целиком сразу. FileInputStream работает с сырыми байтами, а не с декодированным текстом, и для корректного чтения текста напрямую через него (с учётом кодировки символов) нужно обернуть его InputStreamReader; RandomAccessFile и ObjectInputStream служат совершенно другим целям — произвольному позиционированию в бинарном файле и десериализации Java-объектов соответственно — ни один из них не предназначен для простого построчного чтения текста.',
      },
    },
    {
      q: 'What does a `Path` represent in java.nio.file?',
      options: [
        'A representation of a file or directory location in the file system',
        'A stream of bytes',
        'A buffered character reader',
        'A serialized object',
      ],
      correct: [0],
      explanation:
        'Path is a purely structural abstraction, similar in spirit to the older java.io.File but more capable — it represents a hierarchical location in a file system (which directories/segments lead to a particular file or directory) without necessarily implying that location currently exists or that any I/O has happened at all. It supports rich manipulation of that structure (resolving relative paths against a base, normalizing away "." and ".." segments, comparing two paths, extracting the file name or parent directory) entirely independent of actually touching the disk; the Files utility class is what performs actual I/O operations (existence checks, reading, writing, copying) using a Path as the address of where to operate. It has nothing to do with byte streams, character readers, or object serialization — those are separate, unrelated concerns handled by different parts of the I/O API.',
      ru: {
        question: 'Что представляет собой `Path` в java.nio.file?',
        options: [
          'Абстрактное представление расположения файла или каталога в файловой системе',
          'Поток байтов',
          'Буферизованный символьный ридер',
          'Сериализованный объект',
        ],
        explanation:
          'Path — это чисто структурная абстракция, по духу похожая на более старый java.io.File, но более функциональная — она представляет иерархическое расположение в файловой системе (какие каталоги/сегменты ведут к конкретному файлу или каталогу), необязательно подразумевая, что это расположение сейчас существует или что вообще произошёл какой-либо ввод-вывод. Она поддерживает богатую работу с этой структурой (разрешение относительных путей относительно базового, нормализацию сегментов "." и "..", сравнение двух путей, извлечение имени файла или родительского каталога) полностью независимо от реального обращения к диску; именно вспомогательный класс Files выполняет настоящие операции ввода-вывода (проверку существования, чтение, запись, копирование), используя Path как адрес, где нужно действовать. Он никак не связан с потоками байтов, символьными ридерами или сериализацией объектов — это отдельные, не связанные вопросы, которыми занимаются другие части API ввода-вывода.',
      },
    },
    {
      q: 'Which class allows reading primitive data types directly from a binary stream?',
      options: ['DataInputStream', 'FileReader', 'BufferedReader', 'PrintWriter'],
      correct: [0],
      explanation:
        'DataInputStream wraps another InputStream and adds methods like readInt(), readDouble(), readBoolean(), readUTF(), and similar, each of which reads a fixed, well-defined number of raw bytes from the underlying stream and reassembles them into the corresponding Java primitive value, using a specific, platform-independent binary encoding — its natural counterpart for writing is DataOutputStream, and the two are typically used together to persist primitive values in a format that can be read back exactly. FileReader and BufferedReader are both character-oriented classes meant for decoded text, not binary primitives, and PrintWriter is an output class for writing formatted text (via print/println/printf), not for reading anything at all.',
      ru: {
        question: 'Какой класс позволяет читать примитивные типы данных напрямую из бинарного потока?',
        options: ['DataInputStream', 'FileReader', 'BufferedReader', 'PrintWriter'],
        explanation:
          'DataInputStream оборачивает другой InputStream и добавляет методы вроде readInt(), readDouble(), readBoolean(), readUTF() и подобные, каждый из которых читает фиксированное, чётко определённое количество сырых байтов из нижележащего потока и собирает их в соответствующее примитивное значение Java, используя конкретную, независимую от платформы бинарную кодировку — его естественный аналог для записи — DataOutputStream, и обычно они используются вместе, чтобы сохранять примитивные значения в формате, который можно прочитать обратно в точности. FileReader и BufferedReader оба являются символьно-ориентированными классами, предназначенными для декодированного текста, а не бинарных примитивов, а PrintWriter — это класс вывода для записи форматированного текста (через print/println/printf), а не для чтения чего-либо вообще.',
      },
    },
    {
      q: 'What is the key difference between FileReader and FileInputStream?',
      options: [
        'FileReader is a character stream (handles text/encoding); FileInputStream is a raw byte stream',
        'They are functionally identical',
        'FileInputStream is meant for text; FileReader is meant for binary data',
        'FileReader cannot be wrapped by a BufferedReader',
      ],
      correct: [0],
      explanation:
        'Java\'s I/O API is split into two parallel class hierarchies rooted at Reader/Writer for character data and InputStream/OutputStream for raw byte data — this separation exists because turning bytes into meaningful text requires knowing a character encoding (UTF-8, ISO-8859-1, and so on), and mixing that concern into the raw-byte hierarchy would complicate it for binary use cases that have no encoding at all. FileReader (a subclass of Reader) reads a file and decodes its bytes into char values using a character encoding (the platform default, unless configured otherwise), making it the appropriate choice for genuinely textual files. FileInputStream (a subclass of InputStream) reads raw, undecoded bytes with no notion of characters or encoding at all, appropriate for binary files like images or serialized data. FileReader is commonly wrapped in a BufferedReader specifically to add efficient buffering and convenient line-by-line reading via readLine().',
      ru: {
        question: 'В чём ключевое отличие FileReader от FileInputStream?',
        options: [
          'FileReader — символьный поток (учитывает кодировку текста); FileInputStream — поток "сырых" байтов',
          'Они функционально идентичны',
          'FileInputStream предназначен для текста; FileReader — для бинарных данных',
          'FileReader нельзя обернуть в BufferedReader',
        ],
        explanation:
          'API ввода-вывода Java разделён на две параллельные иерархии классов с корнями Reader/Writer для символьных данных и InputStream/OutputStream для сырых байтовых данных — это разделение существует потому, что превращение байтов в осмысленный текст требует знания кодировки символов (UTF-8, ISO-8859-1 и т.д.), и смешивание этой заботы в иерархию сырых байтов усложнило бы её для бинарных сценариев использования, у которых вообще нет кодировки. FileReader (подкласс Reader) читает файл и декодирует его байты в значения char с помощью кодировки символов (по умолчанию платформы, если не настроено иначе), что делает его подходящим выбором для по-настоящему текстовых файлов. FileInputStream (подкласс InputStream) читает сырые, не декодированные байты, вообще без понятия символов или кодировки, что подходит для бинарных файлов вроде изображений или сериализованных данных. FileReader обычно оборачивают в BufferedReader именно для добавления эффективной буферизации и удобного построчного чтения через readLine().',
      },
    },
    {
      q: 'What does try-with-resources automatically do with an opened FileInputStream?',
      options: [
        'Closes it automatically when the try block finishes, even if an exception occurs',
        'Deletes the underlying file after use',
        'Locks the file for exclusive access',
        'Prevents the file from ever being read twice',
      ],
      correct: [0],
      explanation:
        'Before try-with-resources, correctly closing a resource in every possible code path (normal completion, or any of several possible exceptions) required verbose, error-prone finally blocks with null checks, and forgetting one was a common source of resource leaks. try-with-resources, `try (FileInputStream fis = new FileInputStream(path)) { ... }`, handles this automatically: because FileInputStream implements Closeable (a subinterface of AutoCloseable), the compiler generates the equivalent of an implicit finally block that calls fis.close() no matter how the try block exits — whether it finishes normally or an exception propagates out of it — guaranteeing the underlying OS file handle is always released. It has no effect on the file\'s contents (it does not delete it), does not lock it for exclusive access on its own, and does not track or prevent the file being opened and read again later by separate code.',
      ru: {
        question: 'Что try-with-resources автоматически делает с открытым FileInputStream?',
        options: [
          'Автоматически закрывает его по завершении блока try, даже если возникло исключение',
          'Удаляет файл после использования',
          'Блокирует файл для эксклюзивного доступа',
          'Не позволяет прочитать файл дважды',
        ],
        explanation:
          'До появления try-with-resources корректное закрытие ресурса на всех возможных путях выполнения кода (нормальное завершение или любое из нескольких возможных исключений) требовало многословных, подверженных ошибкам блоков finally с проверками на null, и забыть один из них было частой причиной утечек ресурсов. try-with-resources, `try (FileInputStream fis = new FileInputStream(path)) { ... }`, обрабатывает это автоматически: поскольку FileInputStream реализует Closeable (подынтерфейс AutoCloseable), компилятор генерирует эквивалент неявного блока finally, вызывающего fis.close() независимо от того, как завершится блок try — нормально или с распространяющимся из него исключением, — гарантируя, что дескриптор файла ОС всегда освобождается. Это никак не влияет на содержимое файла (он не удаляется), само по себе не блокирует его для эксклюзивного доступа, и не отслеживает и не предотвращает повторное открытие и чтение файла позже другим кодом.',
      },
    },
    {
      q: 'Which NIO.2 method checks whether a file exists?',
      options: ['Files.exists(Path)', 'File.check()', 'Path.verify()', 'Files.isPresent(Path)'],
      correct: [0],
      explanation:
        'Files.exists(Path) performs an actual filesystem check and returns a plain boolean indicating whether the given path currently refers to something on disk — it deliberately never throws an exception for a missing file, since "not existing" is an entirely normal, expected outcome for this particular check, not an error condition. Its counterpart, Files.notExists(Path), is provided for the (subtly different, due to how symbolic links and permission errors are handled) inverse check. Neither File.check(), Path.verify(), nor Files.isPresent() exist as real JDK methods; watch for this kind of plausible-sounding but fabricated API name on the exam — always be confident the exact method genuinely exists in the API before choosing it.',
      ru: {
        question: 'Какой метод NIO.2 проверяет существование файла?',
        options: ['Files.exists(Path)', 'File.check()', 'Path.verify()', 'Files.isPresent(Path)'],
        explanation:
          'Files.exists(Path) выполняет настоящую проверку файловой системы и возвращает обычный boolean, указывающий, ссылается ли данный путь в текущий момент на что-то на диске — он намеренно никогда не выбрасывает исключение для отсутствующего файла, поскольку "не существует" — совершенно нормальный, ожидаемый результат именно этой проверки, а не условие ошибки. Его пара, Files.notExists(Path), предоставлена для (тонко отличающейся, из-за особенностей обработки симлинков и ошибок доступа) обратной проверки. Ни File.check(), ни Path.verify(), ни Files.isPresent() не существуют как реальные методы JDK; на экзамене стоит остерегаться подобных правдоподобно звучащих, но вымышленных имён API — всегда убеждайтесь, что выбранный метод действительно существует в API, прежде чем его выбрать.',
      },
    },
    {
      q: 'Which two statements about java.nio.file.Files are true? (Choose two)',
      options: [
        'Files.readAllLines(Path) reads an entire file into a List<String>',
        'Files.exists(Path) throws an exception if the file is missing',
        'Files.copy(Path, Path) can copy a file from one location to another',
        'Files is a class that must be instantiated with new before use',
      ],
      correct: [0, 2],
      explanation:
        'Files.readAllLines(Path) genuinely does read a whole file at once and hand back a List<String>, one entry per line, and Files.copy(Path, Path) genuinely does copy a file\'s contents from a source path to a target path (optionally with copy-option flags for things like overwrite behavior). Files.exists() specifically never throws for a missing file — returning false is exactly the normal, expected result of asking about something that is not there, which is the whole point of a boolean existence check rather than an exception-based one. Files itself, like most JDK utility classes bundling only static helper methods, has a private constructor and is never meant to be instantiated — every method on it is called directly as Files.methodName(...), never through a `new Files()` instance.',
      ru: {
        question: 'Какие два утверждения о java.nio.file.Files верны? (Выберите два)',
        options: [
          'Files.readAllLines(Path) читает весь файл целиком в List<String>',
          'Files.exists(Path) выбрасывает исключение, если файл отсутствует',
          'Files.copy(Path, Path) может скопировать файл из одного расположения в другое',
          'Files — класс, который перед использованием обязательно нужно создать через new',
        ],
        explanation:
          'Files.readAllLines(Path) действительно читает весь файл разом и возвращает List<String>, по одной записи на строку, а Files.copy(Path, Path) действительно копирует содержимое файла из исходного пути в целевой (опционально с флагами-опциями копирования, например поведением при перезаписи). Files.exists() специально никогда не выбрасывает исключение для отсутствующего файла — возврат false и есть нормальный, ожидаемый результат вопроса о том, чего там нет, в этом и весь смысл булевой проверки существования, а не основанной на исключении. Сам Files, как и большинство вспомогательных классов JDK, собирающих только статические методы, имеет приватный конструктор и никогда не предназначен для инстанцирования — каждый его метод вызывается напрямую как Files.methodName(...), никогда через экземпляр `new Files()`.',
      },
    },
  ],
  concurrency: [
    {
      q: 'What does the `synchronized` keyword on an instance method do?',
      options: [
        'Ensures only one thread at a time can execute that method on a given object instance',
        'Makes the method execute faster',
        'Prevents the method from ever being overridden',
        'Automatically spawns a new thread to run the method',
      ],
      correct: [0],
      explanation:
        'Every Java object carries an implicit "intrinsic lock" (also called a monitor), and a synchronized instance method requires a thread to acquire that specific object\'s lock before entering the method body, automatically releasing it when the method finishes (normally or by throwing) — any other thread attempting to call any synchronized instance method on that same object must wait until the lock is free. This serializes access on a per-object basis (two different Account objects have two independent locks, so synchronized calls on separate instances never block each other) and is the fundamental tool for protecting shared mutable state from race conditions. It has nothing to do with performance (acquiring/releasing a lock actually adds overhead compared to unsynchronized code), does not affect overridability, and does not create any new thread — the calling thread itself simply executes the method body while holding the lock.',
      ru: {
        question: 'Что делает ключевое слово `synchronized` на методе экземпляра?',
        options: [
          'Гарантирует, что только один поток одновременно может выполнять этот метод у данного экземпляра объекта',
          'Делает выполнение метода быстрее',
          'Не позволяет метод переопределить',
          'Автоматически создаёт новый поток для выполнения метода',
        ],
        explanation:
          'Каждый объект Java несёт неявную "внутреннюю блокировку" (также называемую монитором), и synchronized-метод экземпляра требует, чтобы поток захватил блокировку именно этого объекта перед входом в тело метода, автоматически освобождая её по завершении метода (нормально или с выбросом исключения) — любой другой поток, пытающийся вызвать любой synchronized-метод экземпляра на том же самом объекте, обязан ждать, пока блокировка не освободится. Это сериализует доступ в рамках конкретного объекта (у двух разных объектов Account две независимые блокировки, поэтому synchronized-вызовы на разных экземплярах никогда не блокируют друг друга) и является фундаментальным инструментом защиты общего изменяемого состояния от состояний гонки. Это никак не связано с производительностью (захват/освобождение блокировки на самом деле добавляет накладные расходы по сравнению с несинхронизированным кодом), не влияет на возможность переопределения, и не создаёт никакого нового потока — сам вызывающий поток просто выполняет тело метода, удерживая блокировку.',
      },
    },
    {
      q: 'What is a race condition?',
      options: [
        'A situation where multiple threads access shared data concurrently and the result depends on unpredictable timing',
        'A condition that always causes a deadlock',
        'An error reported by the compiler',
        'A type of checked exception',
      ],
      correct: [0],
      explanation:
        'A race condition arises whenever two or more threads read and write shared mutable state without adequate synchronization, such that the final outcome depends on the precise, unpredictable interleaving of their individual operations at runtime — the same code can produce a correct result on one run and a subtly wrong one on another, purely based on timing that is effectively out of the programmer\'s direct control. A classic example is two threads both executing `count++` on a shared field: that single line is actually three separate machine steps (read, increment, write), and if both threads interleave those steps badly, one increment can be silently lost. This is a purely logical, runtime data-consistency bug, entirely distinct from a deadlock (threads permanently blocked waiting on each other) and unrelated to compile-time checks or exception types.',
      ru: {
        question: 'Что такое состояние гонки (race condition)?',
        options: [
          'Ситуация, когда несколько потоков одновременно обращаются к общим данным, и результат зависит от непредсказуемого порядка выполнения',
          'Условие, которое всегда приводит к deadlock',
          'Ошибка, о которой сообщает компилятор',
          'Разновидность проверяемого исключения',
        ],
        explanation:
          'Состояние гонки возникает всякий раз, когда два или более потоков читают и пишут общее изменяемое состояние без должной синхронизации, так что итоговый результат зависит от точного, непредсказуемого чередования их отдельных операций во время выполнения — один и тот же код может дать корректный результат на одном запуске и тонко неверный на другом, исключительно из-за времени выполнения, фактически не контролируемого программистом напрямую. Классический пример — два потока, оба выполняющие `count++` над общим полем: эта единственная строка на самом деле состоит из трёх отдельных машинных шагов (чтение, увеличение, запись), и если оба потока плохо чередуют эти шаги, один инкремент может быть молча потерян. Это чисто логическая ошибка согласованности данных во время выполнения, полностью отличная от deadlock (потоки навсегда заблокированы в ожидании друг друга) и не связанная с проверками на этапе компиляции или типами исключений.',
      },
    },
    {
      q: 'Which class allows thread-safe counter increments without explicit synchronization?',
      options: ['AtomicInteger', 'Integer', 'a volatile int', 'StringBuilder'],
      correct: [0],
      explanation:
        'AtomicInteger, part of java.util.concurrent.atomic, provides methods like incrementAndGet() and compareAndSet() that are implemented using low-level hardware compare-and-swap (CAS) instructions rather than traditional locks, guaranteeing that the entire read-modify-write sequence for an operation happens as a single, uninterruptible atomic step even under concurrent access from multiple threads — no explicit synchronized block is needed. Integer is an ordinary immutable wrapper class with no atomicity guarantees for compound operations at all. A plain volatile int guarantees visibility of writes across threads (no stale caching) but explicitly does not make compound operations like i++ atomic, since that is still a separate read-then-write sequence that can still race. StringBuilder is entirely unrelated to numeric atomicity and is not thread-safe by design (that is StringBuffer\'s role).',
      ru: {
        question: 'Какой класс позволяет потокобезопасно увеличивать счётчик без явной синхронизации?',
        options: ['AtomicInteger', 'Integer', 'volatile int', 'StringBuilder'],
        explanation:
          'AtomicInteger, часть java.util.concurrent.atomic, предоставляет методы вроде incrementAndGet() и compareAndSet(), реализованные с помощью низкоуровневых аппаратных инструкций compare-and-swap (CAS), а не традиционных блокировок, гарантируя, что вся последовательность "чтение-изменение-запись" операции выполняется как единый, непрерываемый атомарный шаг даже при конкурентном доступе из нескольких потоков — никакой явный synchronized-блок не нужен. Integer — обычный неизменяемый класс-обёртка вообще без каких-либо гарантий атомарности для составных операций. Обычный volatile int гарантирует видимость записей между потоками (без устаревшего кэша), но явно не делает атомарными составные операции вроде i++, поскольку это всё та же отдельная последовательность "сначала чтение, потом запись", которая всё ещё может стать состоянием гонки. StringBuilder вообще не связан с числовой атомарностью и по замыслу не потокобезопасен (это роль StringBuffer).',
      },
    },
    {
      q: 'What advantage does ExecutorService provide over manually creating Thread objects?',
      options: [
        'A managed thread pool for submitting and executing tasks efficiently',
        'Automatic garbage collection of running threads',
        'Guaranteed prevention of deadlocks',
        'A full replacement for the synchronized keyword in all cases',
      ],
      correct: [0],
      explanation:
        'Creating a brand-new Thread object for every individual task is expensive (thread creation and teardown carry real OS-level overhead) and offers no built-in way to limit how many threads run concurrently, which can easily overwhelm a system under heavy load. ExecutorService, backed by a configurable thread pool, decouples "what work needs doing" (a submitted Runnable or Callable task) from "which specific thread executes it" — the pool reuses a bounded, tunable number of worker threads across many submitted tasks, queuing extra tasks when all workers are busy, which is dramatically more efficient and controllable than a new Thread per task. It does not automatically garbage-collect threads (regular JVM garbage collection handles unreachable objects generally, unrelated to this), offers no automatic deadlock prevention (poorly-designed locking logic can still deadlock regardless of how threads are managed), and does not eliminate the need for synchronized or other concurrency-safety mechanisms when tasks share mutable state.',
      ru: {
        question: 'Какое преимущество даёт ExecutorService по сравнению с ручным созданием объектов Thread?',
        options: [
          'Управляемый пул потоков для эффективной отправки и выполнения задач',
          'Автоматическую сборку мусора для работающих потоков',
          'Гарантированное предотвращение deadlock',
          'Полную замену ключевого слова synchronized во всех случаях',
        ],
        explanation:
          'Создание совершенно нового объекта Thread для каждой отдельной задачи дорого (создание и завершение потока несут реальные накладные расходы на уровне ОС) и не даёт встроенного способа ограничить, сколько потоков работают одновременно, что легко может перегрузить систему при высокой нагрузке. ExecutorService, опирающийся на настраиваемый пул потоков, отделяет "какую работу нужно сделать" (отправленную задачу Runnable или Callable) от "какой конкретно поток её выполняет" — пул переиспользует ограниченное, настраиваемое число рабочих потоков для множества отправленных задач, ставя в очередь лишние задачи, когда все воркеры заняты, что значительно эффективнее и управляемее, чем новый Thread на задачу. Он не выполняет автоматическую сборку мусора для потоков (обычная сборка мусора JVM занимается недостижимыми объектами в целом, это не связано с этим), не предлагает автоматического предотвращения deadlock (плохо спроектированная логика блокировок всё равно может привести к deadlock независимо от того, как управляются потоки), и не устраняет необходимость в synchronized или других механизмах безопасности конкурентности, когда задачи разделяют изменяемое состояние.',
      },
    },
    {
      q: 'What is a deadlock?',
      options: [
        'A situation where two or more threads are blocked forever, each waiting on a resource held by the other',
        'A thread that simply runs for a very long time',
        'An exception thrown as soon as a thread starts',
        'A synchronized block that never executes at all',
      ],
      correct: [0],
      explanation:
        'A deadlock is a permanent standstill caused by a circular waiting dependency: thread A holds lock 1 and is waiting to acquire lock 2, while thread B simultaneously holds lock 2 and is waiting to acquire lock 1 — neither thread can ever proceed, because each is blocked waiting for a resource the other refuses to release, and neither will release what it holds until it gets what it is waiting for. Unlike a merely slow-running thread (which will eventually finish), a genuine deadlock never resolves on its own; the JVM offers no automatic detection or recovery for ordinary lock-based deadlocks, only monitoring tools that can help diagnose one after the fact. The classic prevention strategy is to enforce a single, globally consistent order in which any code acquires multiple locks, so a cycle like the one above can never form in the first place.',
      ru: {
        question: 'Что такое deadlock (взаимная блокировка)?',
        options: [
          'Ситуация, когда два или более потоков блокируются навсегда, каждый ожидая ресурс, удерживаемый другим',
          'Поток, который просто выполняется очень долго',
          'Исключение, выбрасываемое сразу при старте потока',
          'Блок synchronized, который вообще никогда не выполняется',
        ],
        explanation:
          'Deadlock — это постоянная остановка, вызванная циклической зависимостью ожидания: поток A удерживает блокировку 1 и ждёт получения блокировки 2, а поток B одновременно удерживает блокировку 2 и ждёт получения блокировки 1 — ни один из потоков никогда не может продвинуться дальше, потому что каждый заблокирован в ожидании ресурса, который другой отказывается освободить, и ни один не освободит то, что удерживает, пока не получит то, чего ждёт. В отличие от просто медленно выполняющегося потока (который в итоге завершится), настоящий deadlock никогда не разрешается сам собой; JVM не предлагает автоматического обнаружения или восстановления для обычных deadlock на основе блокировок, только инструменты мониторинга, помогающие диагностировать его постфактум. Классическая стратегия предотвращения — навязать единый, глобально согласованный порядок, в котором любой код захватывает несколько блокировок, чтобы цикл вроде описанного выше вообще не мог сформироваться.',
      },
    },
    {
      q: 'What does the `volatile` keyword guarantee for a field?',
      options: [
        'Writes are immediately visible to other threads, without making compound operations atomic',
        'Full atomicity for read-modify-write operations',
        'Thread-safety equivalent to using synchronized',
        'The field can never be changed after initialization',
      ],
      correct: [0],
      explanation:
        'Without volatile, a thread reading a shared field may see a stale, cached value rather than another thread\'s most recent write, because the JVM and CPU are both free to cache values locally and reorder certain operations for performance, as long as a single thread\'s own view of its own actions stays consistent. Declaring a field volatile establishes a "happens-before" relationship for that field specifically: every write to it becomes immediately visible to every other thread\'s subsequent read, effectively forcing reads and writes to go through main memory rather than a stale per-thread cache. What volatile does not do is make compound operations atomic — `count++` on a volatile int is still a separate read-then-write sequence internally, and two threads can still race on it exactly as with a non-volatile field; for that level of protection you need either synchronized or an Atomic class like AtomicInteger. volatile also has nothing to do with final/immutability — a volatile field is explicitly expected to change.',
      ru: {
        question: 'Что гарантирует ключевое слово `volatile` для поля?',
        options: [
          'Запись немедленно видна другим потокам, но составные операции при этом не становятся атомарными',
          'Полную атомарность операций "чтение-изменение-запись"',
          'Потокобезопасность, эквивалентную synchronized',
          'Что поле никогда не может измениться после инициализации',
        ],
        explanation:
          'Без volatile поток, читающий общее поле, может увидеть устаревшее, закэшированное значение вместо самой свежей записи другого потока, потому что и JVM, и процессор свободны кэшировать значения локально и переупорядочивать некоторые операции ради производительности, пока собственное представление одного потока о своих же действиях остаётся согласованным. Объявление поля volatile устанавливает отношение "happens-before" именно для этого поля: каждая запись в него становится немедленно видна каждому последующему чтению другого потока, фактически заставляя чтения и записи идти через основную память, а не через устаревший кэш конкретного потока. Чего volatile не делает — не делает составные операции атомарными: `count++` над volatile int внутри всё так же остаётся отдельной последовательностью "сначала чтение, потом запись", и два потока всё так же могут состязаться на ней точно так же, как и с не-volatile полем; для такого уровня защиты нужен либо synchronized, либо Atomic-класс вроде AtomicInteger. volatile также никак не связан с final/неизменяемостью — от volatile-поля как раз явно ожидается, что оно будет меняться.',
      },
    },
    {
      q: 'Which two classes/interfaces support safe concurrent access without external synchronization? (Choose two)',
      options: ['ConcurrentHashMap', 'HashMap', 'AtomicInteger', 'ArrayList'],
      correct: [0, 2],
      explanation:
        'ConcurrentHashMap is purpose-built for concurrent use: it internally manages fine-grained locking (or lock-free techniques, depending on the operation) so multiple threads can read and write it simultaneously without external synchronization and without throwing ConcurrentModificationException the way a plain HashMap would under concurrent structural modification. AtomicInteger similarly provides safe concurrent access to a single numeric value via lock-free CAS operations, as covered earlier in this topic. HashMap and ArrayList are both explicitly documented as not thread-safe — using either from multiple threads without external synchronization can corrupt internal state or throw ConcurrentModificationException, and the standard advice for needing a thread-safe version of either is to reach for their java.util.concurrent counterparts (ConcurrentHashMap, CopyOnWriteArrayList) instead of adding manual synchronization around the plain versions when avoidable.',
      ru: {
        question: 'Какие два класса/интерфейса поддерживают безопасный конкурентный доступ без внешней синхронизации? (Выберите два)',
        options: ['ConcurrentHashMap', 'HashMap', 'AtomicInteger', 'ArrayList'],
        explanation:
          'ConcurrentHashMap специально создан для конкурентного использования: он внутри управляет мелкогранулированной блокировкой (или безблокировочными техниками, в зависимости от операции), так что несколько потоков могут одновременно читать и писать в него без внешней синхронизации и без выброса ConcurrentModificationException, как это сделал бы обычный HashMap при конкурентном структурном изменении. AtomicInteger аналогично предоставляет безопасный конкурентный доступ к единственному числовому значению через безблокировочные CAS-операции, как обсуждалось ранее в этой теме. HashMap и ArrayList оба явно задокументированы как не потокобезопасные — использование любого из них из нескольких потоков без внешней синхронизации может повредить внутреннее состояние или выбросить ConcurrentModificationException, и стандартный совет при необходимости в потокобезопасной версии любого из них — обратиться к их аналогам из java.util.concurrent (ConcurrentHashMap, CopyOnWriteArrayList), а не добавлять ручную синхронизацию вокруг обычных версий, когда этого можно избежать.',
      },
    },
  ],
  jdbc: [
    {
      q: 'What is the purpose of the JDBC `Connection` interface?',
      options: [
        'It represents a session/connection to a specific database',
        'It represents a single row of a result set',
        'It executes only stored procedures',
        'It represents a table\'s schema definition',
      ],
      correct: [0],
      explanation:
        'Connection is the foundational object in JDBC, representing an established session with a specific database — obtained via DriverManager.getConnection(url, user, password) — and everything else in JDBC hangs off it: Statement and PreparedStatement objects (used to execute SQL) are created from a Connection, transaction boundaries (commit/rollback, auto-commit mode) are controlled through it, and closing it releases the underlying network/database resources. It is not itself a row of data (that is ResultSet\'s job), it is not limited to stored procedures specifically (CallableStatement is the specialized object for those, also created from a Connection, alongside the more general-purpose Statement/PreparedStatement for regular SQL), and it carries no direct knowledge of table schema definitions (that metadata is exposed separately via DatabaseMetaData, itself obtained from the Connection).',
      ru: {
        question: 'Какова цель интерфейса `Connection` в JDBC?',
        options: [
          'Он представляет сессию/соединение с конкретной базой данных',
          'Он представляет одну строку набора результатов',
          'Он выполняет только хранимые процедуры',
          'Он представляет описание схемы таблицы',
        ],
        explanation:
          'Connection — базовый объект в JDBC, представляющий установленную сессию с конкретной базой данных — получаемый через DriverManager.getConnection(url, user, password), — и всё остальное в JDBC строится на нём: объекты Statement и PreparedStatement (для выполнения SQL) создаются из Connection, границы транзакций (commit/rollback, режим авто-коммита) управляются через него, а его закрытие освобождает нижележащие сетевые/базовые ресурсы. Он сам по себе не является строкой данных (это задача ResultSet), не ограничен конкретно хранимыми процедурами (CallableStatement — специализированный объект для них, тоже создаваемый из Connection, наряду с более общими Statement/PreparedStatement для обычного SQL), и не несёт прямого знания о описаниях схем таблиц (эти метаданные предоставляются отдельно через DatabaseMetaData, тоже получаемый из Connection).',
      },
    },
    {
      q: 'Which interface should be used to execute a parameterized SQL query safely, avoiding SQL injection?',
      options: ['PreparedStatement', 'Statement', 'ResultSet', 'DriverManager'],
      correct: [0],
      explanation:
        'Plain Statement executes whatever raw SQL string you hand it, which means if any part of that string is built by concatenating untrusted user input, an attacker can inject their own SQL fragments and fundamentally change the query\'s meaning (classic SQL injection). PreparedStatement instead takes a SQL template with `?` placeholders, is precompiled by the database once, and then has values bound to those placeholders via typed setXxx(index, value) calls — the database driver treats bound values strictly as data, never as executable SQL syntax, which structurally eliminates the injection vector regardless of what characters the value contains. It also tends to perform better for queries executed repeatedly with different parameter values, since the database can reuse the precompiled query plan. ResultSet represents query output, not a way to execute a query, and DriverManager is only responsible for obtaining a Connection in the first place.',
      ru: {
        question: 'Какой интерфейс следует использовать для безопасного выполнения параметризованного SQL-запроса, избегая SQL-инъекций?',
        options: ['PreparedStatement', 'Statement', 'ResultSet', 'DriverManager'],
        explanation:
          'Обычный Statement выполняет ровно ту сырую строку SQL, которую вы ему передали, а значит, если какая-то часть этой строки собрана конкатенацией недоверенного пользовательского ввода, злоумышленник может внедрить собственные фрагменты SQL и фундаментально изменить смысл запроса (классическая SQL-инъекция). PreparedStatement же принимает SQL-шаблон с плейсхолдерами `?`, предварительно компилируется базой данных один раз, а затем значения привязываются к этим плейсхолдерам через типизированные вызовы setXxx(индекс, значение) — драйвер базы данных строго трактует привязанные значения как данные, никогда как исполняемый синтаксис SQL, что структурно исключает вектор инъекции независимо от того, какие символы содержит значение. Он также обычно работает быстрее для запросов, выполняемых многократно с разными значениями параметров, поскольку база данных может переиспользовать предварительно скомпилированный план запроса. ResultSet представляет результат запроса, а не способ его выполнения, а DriverManager отвечает лишь за получение Connection в первую очередь.',
      },
    },
    {
      q: 'What does `ResultSet.next()` do?',
      options: [
        'Moves the cursor to the next row, returning true if a row exists and false otherwise',
        'Closes the result set',
        'Returns the value of the next column',
        'Commits the current transaction',
      ],
      correct: [0],
      explanation:
        'A ResultSet is conceptually a cursor positioned relative to a set of returned rows, and it always starts positioned before the very first row — meaning you cannot read any column data until you have advanced the cursor at least once. next() advances that cursor to the next available row and returns a boolean reporting whether a row actually exists at that new position, which is exactly why the idiomatic pattern for consuming a ResultSet is a while loop, `while (rs.next()) { ... read columns ... }`: the loop naturally stops the moment next() finally returns false, meaning there are no more rows. It has nothing to do with closing the result set (that is the separate close() method), reading column values (done via getXxx(columnLabelOrIndex) methods once positioned on a row), or transaction control (handled through the Connection, not the ResultSet).',
      ru: {
        question: 'Что делает `ResultSet.next()`?',
        options: [
          'Перемещает курсор на следующую строку, возвращая true, если строка есть, и false в противном случае',
          'Закрывает набор результатов',
          'Возвращает значение следующего столбца',
          'Фиксирует текущую транзакцию',
        ],
        explanation:
          'ResultSet концептуально является курсором, позиционированным относительно набора возвращённых строк, и изначально всегда расположен перед самой первой строкой — а значит нельзя прочитать данные ни одного столбца, пока курсор не был продвинут хотя бы раз. next() продвигает этот курсор к следующей доступной строке и возвращает булево значение, сообщающее, существует ли реально строка в этой новой позиции, именно поэтому идиоматичный паттерн для обхода ResultSet — цикл while, `while (rs.next()) { ... чтение столбцов ... }`: цикл естественным образом останавливается в тот момент, когда next() наконец возвращает false, то есть строк больше нет. Он никак не связан с закрытием набора результатов (для этого отдельный метод close()), чтением значений столбцов (выполняется через методы getXxx(имяИлиИндексСтолбца), когда курсор уже стоит на строке), или управлением транзакциями (осуществляется через Connection, а не ResultSet).',
      },
    },
    {
      q: 'How are JDBC 4.0+ drivers typically registered?',
      options: [
        "They're auto-registered via the ServiceLoader mechanism from the driver's JAR; DriverManager.getConnection() can be used directly",
        'Class.forName() is always mandatory to load the driver',
        'Drivers must be manually instantiated with new and registered by hand',
        'JDBC does not require any driver at all',
      ],
      correct: [0],
      explanation:
        'Before JDBC 4.0, applications had to manually force-load a driver class with `Class.forName("com.example.Driver")` so that class\'s static initializer block, which registers the driver with DriverManager, would run — otherwise DriverManager had no way to know the driver existed. JDBC 4.0 (Java 6) introduced automatic driver discovery via the standard Java ServiceLoader mechanism: a compliant driver JAR includes a META-INF/services/java.sql.Driver file listing its Driver implementation class, and DriverManager scans the classpath for these files at startup, registering every driver it finds without any explicit code needed — so calling DriverManager.getConnection(url, ...) directly, with the driver JAR merely present on the classpath, is now sufficient in almost every modern setup. Class.forName() still works (older code and some environments still use it explicitly) but is no longer strictly required, and JDBC fundamentally does require a driver — that requirement has not gone away, only the registration mechanism has become more automatic.',
      ru: {
        question: 'Как обычно регистрируются драйверы JDBC 4.0+?',
        options: [
          'Они автоматически регистрируются через механизм ServiceLoader из JAR-файла драйвера; можно сразу использовать DriverManager.getConnection()',
          'Class.forName() всегда обязателен для загрузки драйвера',
          'Драйверы нужно вручную создавать через new и регистрировать самостоятельно',
          'JDBC вообще не требует драйверов',
        ],
        explanation:
          'До JDBC 4.0 приложениям приходилось вручную принудительно загружать класс драйвера через `Class.forName("com.example.Driver")`, чтобы выполнился статический блок инициализации этого класса, регистрирующий драйвер в DriverManager — иначе DriverManager никак не мог узнать о существовании драйвера. JDBC 4.0 (Java 6) ввёл автоматическое обнаружение драйверов через стандартный механизм Java ServiceLoader: совместимый JAR-файл драйвера включает файл META-INF/services/java.sql.Driver, перечисляющий класс реализации Driver, и DriverManager при запуске сканирует classpath на предмет таких файлов, регистрируя каждый найденный драйвер без всякого явного кода — поэтому прямой вызов DriverManager.getConnection(url, ...), при том что JAR драйвера просто присутствует в classpath, теперь достаточен почти в любой современной настройке. Class.forName() всё ещё работает (старый код и некоторые окружения всё ещё используют его явно), но больше строго не обязателен, а JDBC по-прежнему фундаментально требует драйвер — это требование никуда не делось, стал более автоматическим только механизм регистрации.',
      },
    },
    {
      q: 'What does `Connection.setAutoCommit(false)` allow you to do?',
      options: [
        'Manually control transaction boundaries using explicit commit()/rollback() calls',
        'Disable the connection entirely',
        'Automatically retry failed queries',
        'Prevent SELECT statements from being run',
      ],
      correct: [0],
      explanation:
        'By default, a JDBC Connection operates in auto-commit mode, meaning every single individual SQL statement is automatically wrapped in and committed as its own separate transaction the instant it completes — convenient for one-off statements, but wrong whenever several statements need to succeed or fail together as one atomic unit (a classic example: debiting one account and crediting another must either both happen or neither happen). Calling setAutoCommit(false) turns that automatic behavior off, so subsequent statements accumulate as part of one open transaction that is only actually persisted to the database when you explicitly call connection.commit(), or entirely discarded if you call connection.rollback() instead (for example, from inside a catch block after a statement failed partway through). It has no effect on whether the connection itself works, does not implement any retry logic, and has nothing to do with restricting which SQL statement types can run.',
      ru: {
        question: 'Что позволяет делать `Connection.setAutoCommit(false)`?',
        options: [
          'Вручную управлять границами транзакции используя явные вызовы commit()/rollback()',
          'Полностью отключить соединение',
          'Автоматически повторять неудачные запросы',
          'Запретить выполнение SELECT-запросов',
        ],
        explanation:
          'По умолчанию Connection JDBC работает в режиме авто-коммита, а значит каждый отдельный оператор SQL автоматически оборачивается и фиксируется как собственная отдельная транзакция сразу после завершения — удобно для разовых операторов, но неверно всегда, когда несколько операторов должны успешно выполниться или провалиться вместе как единая атомарная операция (классический пример: списание с одного счёта и зачисление на другой должны произойти либо оба, либо ни одно). Вызов setAutoCommit(false) отключает это автоматическое поведение, поэтому последующие операторы накапливаются как часть одной открытой транзакции, которая реально сохраняется в базе данных, только когда явно вызван connection.commit(), либо полностью отбрасывается, если вместо этого вызван connection.rollback() (например, из блока catch после того, как оператор частично провалился). Это никак не влияет на работоспособность самого соединения, не реализует никакой логики повторов и никак не связано с ограничением того, какие типы SQL-операторов можно выполнять.',
      },
    },
    {
      q: 'Why should JDBC resources (Connection, Statement, ResultSet) always be closed?',
      options: [
        'To release database and system resources; try-with-resources is recommended since they implement AutoCloseable',
        'They close themselves automatically after every query',
        'Only the Connection needs to be closed explicitly',
        'Closing them deletes the underlying data',
      ],
      correct: [0],
      explanation:
        'Every open Connection, Statement, and ResultSet consumes real, limited resources — network sockets, database-side connection slots, memory buffers for cached result rows — and none of them are automatically closed just because a query finished or a variable went out of scope in Java; the JVM garbage collector eventually reclaiming an unreferenced object is not the same as promptly releasing an external database resource, and relying on that would leak resources long before garbage collection happens, potentially exhausting a database\'s connection pool under load. All three interfaces implement AutoCloseable, which is exactly why try-with-resources — `try (Connection c = ...; PreparedStatement ps = ...; ResultSet rs = ...) { ... }` — is the standard, recommended pattern: it guarantees all three are closed, in reverse declaration order, the moment the block exits, no matter how it exits. Closing a resource releases the connection back to any pool and frees memory; it never deletes the underlying data itself.',
      ru: {
        question: 'Почему ресурсы JDBC (Connection, Statement, ResultSet) всегда нужно закрывать?',
        options: [
          'Чтобы освободить ресурсы базы данных и системы; рекомендуется try-with-resources, так как все они реализуют AutoCloseable',
          'Они закрываются сами автоматически после каждого запроса',
          'Явно закрывать нужно только Connection',
          'Их закрытие удаляет исходные данные',
        ],
        explanation:
          'Каждый открытый Connection, Statement и ResultSet потребляет реальные, ограниченные ресурсы — сетевые сокеты, слоты соединений на стороне базы данных, буферы памяти для кэшированных строк результата, — и ни один из них не закрывается автоматически просто потому, что запрос завершился или переменная вышла из области видимости в Java; то, что сборщик мусора JVM в конце концов освободит объект без ссылок, — не то же самое, что своевременно освободить внешний ресурс базы данных, и полагаться на это означало бы утечку ресурсов задолго до сборки мусора, потенциально исчерпав пул соединений базы данных под нагрузкой. Все три интерфейса реализуют AutoCloseable, именно поэтому try-with-resources — `try (Connection c = ...; PreparedStatement ps = ...; ResultSet rs = ...) { ... }` — стандартный, рекомендуемый паттерн: он гарантирует, что все три закроются, в порядке, обратном объявлению, в момент выхода из блока, независимо от того, как этот выход произошёл. Закрытие ресурса возвращает соединение обратно в пул и освобождает память; оно никогда не удаляет сами исходные данные.',
      },
    },
    {
      q: 'Which two statements about PreparedStatement are true? (Choose two)',
      options: [
        'It helps prevent SQL injection by separating SQL code from data',
        'It cannot be reused with different parameter values',
        'Parameter indices in setXxx methods start at 1, not 0',
        'It automatically commits every executed statement',
      ],
      correct: [0, 2],
      explanation:
        'PreparedStatement\'s central security benefit is exactly that it keeps the SQL structure (the template with `?` placeholders) and the actual data (values bound via setXxx) as two separate channels the database driver never confuses — the driver never re-parses bound data as SQL syntax, which is what structurally prevents injection. A JDBC-specific quirk worth memorizing is that parameter indices in setInt(index, value), setString(index, value), and similar methods are 1-based, matching SQL\'s own convention, unlike almost everything else in Java (arrays, Lists) which is 0-based — passing 0 as an index throws an exception. Far from being unreusable, a PreparedStatement is actually designed to be reused efficiently: you can call setXxx(...) again with new values and re-execute the same precompiled statement repeatedly. Whether a statement auto-commits depends entirely on the owning Connection\'s auto-commit setting, not on anything inherent to PreparedStatement itself.',
      ru: {
        question: 'Какие два утверждения о PreparedStatement верны? (Выберите два)',
        options: [
          'Он помогает предотвратить SQL-инъекции, отделяя SQL-код от данных',
          'Его нельзя переиспользовать с другими значениями параметров',
          'Индексы параметров в методах setXxx начинаются с 1, а не с 0',
          'Он автоматически фиксирует каждый выполненный оператор',
        ],
        explanation:
          'Главное преимущество PreparedStatement с точки зрения безопасности — именно то, что он держит структуру SQL (шаблон с плейсхолдерами `?`) и реальные данные (значения, привязанные через setXxx) как два отдельных канала, которые драйвер базы данных никогда не путает — драйвер никогда не разбирает привязанные данные заново как синтаксис SQL, что структурно и предотвращает инъекцию. Специфичная для JDBC особенность, которую стоит запомнить: индексы параметров в setInt(индекс, значение), setString(индекс, значение) и подобных методах начинаются с 1, совпадая с собственным соглашением SQL, в отличие почти от всего остального в Java (массивы, List), где отсчёт с 0 — передача 0 в качестве индекса выбрасывает исключение. PreparedStatement совсем не является одноразовым — наоборот, он спроектирован для эффективного переиспользования: можно снова вызвать setXxx(...) с новыми значениями и повторно выполнить тот же предварительно скомпилированный оператор. Автокоммитится ли оператор, целиком зависит от настройки авто-коммита владеющего им Connection, а не от чего-то присущего самому PreparedStatement.',
      },
    },
  ],
  'date-time': [
    {
      q: 'Which java.time class represents a date without a time-of-day or timezone?',
      options: ['LocalDate', 'LocalDateTime', 'Instant', 'ZonedDateTime'],
      correct: [0],
      explanation:
        'The java.time API (introduced in Java 8) deliberately splits temporal concepts into precise, purpose-specific classes rather than one do-everything class like the old java.util.Date. LocalDate holds only a year, month, and day of month — genuinely no time-of-day component and no timezone at all — making it exactly right for concepts like a birthday or a calendar date that intentionally has no specific moment attached. LocalDateTime adds a time-of-day to that (still with no timezone), Instant represents an absolute machine timestamp on the UTC timeline with no calendar fields at all, and ZonedDateTime combines a LocalDateTime with a specific time zone. Choosing the narrowest class that matches what you are actually modeling (a "local," zone-independent date is a very common real need) avoids accidentally carrying around information — like a fictitious time-of-day — that does not conceptually belong to the value.',
      ru: {
        question: 'Какой класс java.time представляет дату без времени суток и часового пояса?',
        options: ['LocalDate', 'LocalDateTime', 'Instant', 'ZonedDateTime'],
        explanation:
          'API java.time (появился в Java 8) намеренно разделяет временные понятия на точные, узкоспециализированные классы, а не один класс "для всего", как старый java.util.Date. LocalDate хранит только год, месяц и день месяца — действительно без компонента времени суток и вообще без часового пояса — что делает его абсолютно подходящим для понятий вроде дня рождения или календарной даты, к которой намеренно не привязан конкретный момент. LocalDateTime добавляет к этому время суток (всё ещё без часового пояса), Instant представляет абсолютную машинную метку времени на шкале UTC вообще без календарных полей, а ZonedDateTime сочетает LocalDateTime с конкретным часовым поясом. Выбор самого узкого класса, соответствующего тому, что вы на самом деле моделируете ("локальная", независимая от пояса дата — очень частая реальная потребность), позволяет избежать случайного хранения информации — вроде вымышленного времени суток, — концептуально не относящейся к значению.',
      },
    },
    {
      q: 'What is true about java.time classes like LocalDate and LocalDateTime?',
      options: [
        'They are immutable; methods such as plusDays() return a new instance',
        'They are mutable and modify the object in place',
        'They only replace java.sql.Date and nothing else',
        'They cannot be formatted with a pattern',
      ],
      correct: [0],
      explanation:
        'The old java.util.Date and Calendar classes were notoriously mutable and not thread-safe — calling a "setter"-style method on a shared Date instance could silently corrupt state visible to other code holding a reference to the same object. java.time classes were deliberately designed as immutable value types instead, following the same philosophy as String: every method that appears to "change" a date or time — plusDays(), minusMonths(), withYear(), and so on — actually leaves the original object completely untouched and returns a brand-new instance representing the adjusted value, which must be captured (`date = date.plusDays(1);`) or the computed change is simply lost. This immutability makes java.time objects inherently thread-safe with no synchronization needed, one of their major design advantages. They replace not just java.sql.Date but the entire old date/time/calendar API broadly, and every class in the package supports rich, pattern-based formatting and parsing via DateTimeFormatter.',
      ru: {
        question: 'Что верно про классы java.time, такие как LocalDate и LocalDateTime?',
        options: [
          'Они неизменяемы; методы вроде plusDays() возвращают новый экземпляр',
          'Они изменяемы и модифицируют объект на месте',
          'Они заменяют только java.sql.Date и ничего больше',
          'Их нельзя форматировать по шаблону',
        ],
        explanation:
          'Старые классы java.util.Date и Calendar были печально известны своей изменяемостью и отсутствием потокобезопасности — вызов метода в стиле "сеттера" на общем экземпляре Date мог молча повредить состояние, видимое другому коду, держащему ссылку на тот же объект. Классы java.time, напротив, намеренно спроектированы как неизменяемые типы-значения, следуя той же философии, что и String: каждый метод, который выглядит так, будто "меняет" дату или время — plusDays(), minusMonths(), withYear() и так далее, — на самом деле оставляет исходный объект полностью нетронутым и возвращает совершенно новый экземпляр, представляющий скорректированное значение, которое нужно сохранить (`date = date.plusDays(1);`), иначе вычисленное изменение просто теряется. Эта неизменяемость делает объекты java.time по своей природе потокобезопасными без всякой синхронизации — одно из их главных архитектурных преимуществ. Они заменяют не только java.sql.Date, но и весь старый API даты/времени/календаря в целом, и каждый класс в пакете поддерживает богатое форматирование и разбор по шаблону через DateTimeFormatter.',
      },
    },
    {
      q: 'Which class represents an instantaneous point on the UTC timeline, useful for timestamps?',
      options: ['Instant', 'LocalTime', 'Period', 'Duration'],
      correct: [0],
      explanation:
        'Instant models a machine-oriented timestamp — internally, essentially a count of seconds (plus nanoseconds) since a fixed reference point, the epoch of 1970-01-01T00:00:00Z — with no calendar fields (no year, month, day, hour) and no timezone or locale concept attached at all, which makes it perfect for logging exact moments, comparing when two events occurred, or storing timestamps that need to be unambiguous regardless of where in the world they are later read. LocalTime is a purely calendar/clock-oriented type (hour, minute, second, with no date and no zone), and Period/Duration represent amounts of time (a span or difference) rather than a specific point on the timeline — Period for calendar-based amounts like "2 months," Duration for exact time-based amounts like "90 seconds."',
      ru: {
        question: 'Какой класс представляет точку на временной шкале UTC, полезный для меток времени?',
        options: ['Instant', 'LocalTime', 'Period', 'Duration'],
        explanation:
          'Instant моделирует машинно-ориентированную метку времени — внутри, по сути, счётчик секунд (плюс наносекунды) от фиксированной опорной точки, эпохи 1970-01-01T00:00:00Z, — без каких-либо календарных полей (нет года, месяца, дня, часа) и вообще без понятия часового пояса или локали, что делает его идеальным для логирования точных моментов, сравнения времени наступления двух событий, или хранения меток времени, которые должны быть однозначны независимо от того, где в мире их потом прочитают. LocalTime — тип, ориентированный чисто на календарь/часы (час, минута, секунда, без даты и без пояса), а Period/Duration представляют величины времени (промежуток или разницу), а не конкретную точку на шкале — Period для календарных величин вроде "2 месяца", Duration для точных временных величин вроде "90 секунд".',
      },
    },
    {
      q: 'What is the difference between Period and Duration in java.time?',
      options: [
        'Period measures date-based amounts (years, months, days); Duration measures time-based amounts (hours, minutes, seconds)',
        'They are fully interchangeable',
        'Duration is for dates; Period is for times',
        'Period only works with LocalTime values',
      ],
      correct: [0],
      explanation:
        'Period and Duration both represent "an amount of time" rather than a fixed point, but they operate in fundamentally different units for a good reason. Period expresses a calendar-based quantity — years, months, and days — which is deliberately imprecise in absolute terms, since "one month" can genuinely be 28, 29, 30, or 31 actual days depending on which month and year it falls in; Period is the right tool for date arithmetic like LocalDate.plus(Period.ofMonths(1)). Duration expresses an exact, unambiguous amount of time measured in seconds and nanoseconds (internally convertible to hours/minutes/seconds), suitable for precise time-based arithmetic like adding "exactly 90 seconds" to an Instant or LocalDateTime. Attempting to use Period with something like Instant (which has no calendar concept) or Duration where calendar-aware imprecision is actually wanted would be using the wrong tool for the job.',
      ru: {
        question: 'В чём разница между Period и Duration в java.time?',
        options: [
          'Period измеряет календарные величины (годы, месяцы, дни); Duration измеряет временные величины (часы, минуты, секунды)',
          'Они полностью взаимозаменяемы',
          'Duration — для дат; Period — для времени',
          'Period работает только со значениями LocalTime',
        ],
        explanation:
          'Period и Duration оба представляют "количество времени", а не фиксированную точку, но работают в принципиально разных единицах не просто так. Period выражает календарную величину — годы, месяцы и дни — намеренно неточную в абсолютном выражении, поскольку "один месяц" реально может быть 28, 29, 30 или 31 фактическим днём в зависимости от того, на какой месяц и год он приходится; Period — правильный инструмент для арифметики дат вроде LocalDate.plus(Period.ofMonths(1)). Duration выражает точную, однозначную величину времени, измеряемую в секундах и наносекундах (внутри пересчитываемую в часы/минуты/секунды), подходящую для точной временной арифметики, например прибавления "ровно 90 секунд" к Instant или LocalDateTime. Попытка использовать Period с чем-то вроде Instant (у которого вообще нет календарного понятия) или Duration там, где на самом деле нужна учитывающая календарь неточность, была бы использованием не того инструмента для задачи.',
      },
    },
    {
      q: 'Which class combines a LocalDateTime with a specific time zone?',
      options: ['ZonedDateTime', 'LocalDate', 'Instant', 'Duration'],
      correct: [0],
      explanation:
        'ZonedDateTime is the "full picture" class in java.time: it holds a complete LocalDateTime (calendar date plus time-of-day) together with a ZoneId (like "Europe/Paris" or "America/New_York") and an effective UTC offset, so it can correctly answer questions that genuinely depend on geography and daylight-saving rules — such as what the local wall-clock time is in a specific city at a given absolute instant, or correctly handling the moment clocks shift forward or back for daylight saving. LocalDate carries no time-of-day or zone at all; Instant carries an absolute timeline position but deliberately no zone or calendar fields; Duration is an amount of time, not a point combined with a zone. ZonedDateTime is the class to reach for specifically when "which city\'s local time" genuinely matters to the problem, which is a smaller set of cases than beginners often assume — many applications are actually better served by Instant plus a zone applied only at display time.',
      ru: {
        question: 'Какой класс объединяет LocalDateTime с конкретным часовым поясом?',
        options: ['ZonedDateTime', 'LocalDate', 'Instant', 'Duration'],
        explanation:
          'ZonedDateTime — класс "полной картины" в java.time: он хранит полный LocalDateTime (календарную дату плюс время суток) вместе с ZoneId (например, "Europe/Paris" или "America/New_York") и действующим смещением от UTC, поэтому может корректно отвечать на вопросы, реально зависящие от географии и правил перехода на летнее время — например, какое сейчас местное время на настенных часах в конкретном городе в заданный абсолютный момент, или корректно обрабатывать момент, когда часы переводятся вперёд или назад из-за перехода на летнее время. LocalDate вообще не несёт ни времени суток, ни пояса; Instant несёт абсолютную позицию на шкале времени, но намеренно без пояса или календарных полей; Duration — величина времени, а не точка, объединённая с поясом. ZonedDateTime — класс, к которому стоит обращаться именно тогда, когда "местное время какого города" реально важно для задачи, а это меньший набор случаев, чем часто предполагают новички — многим приложениям на самом деле лучше подходит Instant плюс пояс, применяемый только на этапе отображения.',
      },
    },
    {
      q: 'What does `DateTimeFormatter.ofPattern("yyyy-MM-dd")` do?',
      options: [
        'Creates a formatter to parse or format dates using the given yyyy-MM-dd pattern',
        "Changes the JVM's default date format globally",
        'Converts a LocalDate into an Instant',
        'Validates whether a date falls in a leap year',
      ],
      correct: [0],
      explanation:
        'DateTimeFormatter.ofPattern(patternString) builds a reusable, immutable, thread-safe formatter object from a custom pattern string, where each letter is a documented placeholder — yyyy for a four-digit year, MM for a two-digit month, dd for a two-digit day, and many others exist for hours, minutes, time zones, and so on. That single formatter object can then be used bidirectionally: call temporal.format(formatter) to turn a LocalDate/LocalDateTime/etc. into a String following that exact pattern, or call LocalDate.parse(text, formatter) to parse a String written in that pattern back into a temporal object. Creating a formatter is a purely local, self-contained operation — it does not touch any JVM-wide default setting, does not convert between temporal types on its own (that requires separate conversion methods like atStartOfDay() or toInstant()), and performs no calendar validation like leap-year checks by itself.',
      ru: {
        question: 'Что делает `DateTimeFormatter.ofPattern("yyyy-MM-dd")`?',
        options: [
          'Создаёт форматтер для парсинга или форматирования дат по шаблону yyyy-MM-dd',
          "Глобально меняет формат даты по умолчанию для JVM",
          'Преобразует LocalDate в Instant',
          'Проверяет, попадает ли дата на високосный год',
        ],
        explanation:
          'DateTimeFormatter.ofPattern(строкаШаблона) создаёт переиспользуемый, неизменяемый, потокобезопасный объект-форматтер из пользовательской строки-шаблона, где каждая буква — задокументированный плейсхолдер: yyyy для четырёхзначного года, MM для двузначного месяца, dd для двузначного дня, и многие другие существуют для часов, минут, часовых поясов и т.д. Этот единственный объект-форматтер затем можно использовать в обе стороны: вызвать temporal.format(formatter), чтобы превратить LocalDate/LocalDateTime/и т.д. в строку, следующую этому точному шаблону, или вызвать LocalDate.parse(text, formatter), чтобы разобрать строку, записанную по этому шаблону, обратно во временной объект. Создание форматтера — чисто локальная, самодостаточная операция — она не трогает никакие общие для JVM настройки по умолчанию, не конвертирует между временными типами сама по себе (для этого нужны отдельные методы конвертации вроде atStartOfDay() или toInstant()), и сама по себе не выполняет никакой календарной проверки вроде проверки на високосный год.',
      },
    },
    {
      q: 'Which two java.time classes are immutable? (Choose two)',
      options: ['LocalDate', 'java.util.Date', 'LocalDateTime', 'java.util.Calendar'],
      correct: [0, 2],
      explanation:
        'LocalDate and LocalDateTime, like every class in the modern java.time package, are immutable by design — any method that appears to adjust their value returns a new instance rather than modifying the original object. java.util.Date and java.util.Calendar are the legacy, pre-Java-8 classes that java.time was specifically built to replace, and both are famously mutable: Date has setter-style methods that alter the same instance in place, and Calendar is a large, notoriously confusing mutable class with similar mutating methods (like set() and add()) — this mutability, combined with poor thread-safety and an awkward API, was a primary motivation for designing java.time as an immutable alternative from the ground up.',
      ru: {
        question: 'Какие два класса java.time являются неизменяемыми? (Выберите два)',
        options: ['LocalDate', 'java.util.Date', 'LocalDateTime', 'java.util.Calendar'],
        explanation:
          'LocalDate и LocalDateTime, как и любой класс в современном пакете java.time, неизменяемы по замыслу — любой метод, который выглядит так, будто корректирует их значение, возвращает новый экземпляр, а не изменяет исходный объект. java.util.Date и java.util.Calendar — устаревшие, доступные ещё до Java 8 классы, которые java.time был создан специально заменить, и оба печально известны своей изменяемостью: у Date есть методы в стиле сеттеров, изменяющие тот же экземпляр на месте, а Calendar — большой, известно запутанный изменяемый класс с похожими изменяющими методами (вроде set() и add()) — эта изменяемость в сочетании со слабой потокобезопасностью и неудобным API была основной причиной проектирования java.time как неизменяемой альтернативы с нуля.',
      },
    },
  ],
}

// Additional code-reading (predict-the-output) questions, layered onto the topics above
// to grow the bank closer to real exam length and add more code-based practice.
const extra = {
  'class-design': [
    {
      q: 'What is printed?\n\ninterface Greet {\n  default String hello() { return "Hi"; }\n}\nclass Formal implements Greet {\n  public String hello() { return "Good day"; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Greet g = new Formal();\n    System.out.println(g.hello());\n  }\n}',
      options: ['Good day', 'Hi', 'Compilation error', 'null'],
      correct: [0],
      explanation:
        'Formal explicitly overrides the interface\'s default hello() method with its own implementation. Even though the reference variable g is declared with the interface type Greet, the JVM dispatches the call based on the object\'s actual runtime type, Formal — the same dynamic dispatch rule that applies to overriding between classes applies equally to a class overriding an interface default method. So the overriding version, "Good day", runs; the default in the interface would only be used if Formal had not provided its own hello() at all.',
      ru: {
        question: 'Что будет напечатано?\n\ninterface Greet {\n  default String hello() { return "Hi"; }\n}\nclass Formal implements Greet {\n  public String hello() { return "Good day"; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Greet g = new Formal();\n    System.out.println(g.hello());\n  }\n}',
        options: ['Good day', 'Hi', 'Ошибка компиляции', 'null'],
        explanation:
          'Formal явно переопределяет default-метод hello() интерфейса своей собственной реализацией. Хотя переменная-ссылка g объявлена с типом интерфейса Greet, JVM диспетчеризует вызов на основе реального типа объекта во время выполнения — Formal — то же самое правило динамической диспетчеризации, применимое к переопределению между классами, действует и для переопределения классом default-метода интерфейса. Поэтому выполняется переопределяющая версия, "Good day"; default в интерфейсе использовался бы, только если бы Formal вообще не предоставил собственный hello().',
      },
    },
    {
      q: 'What is printed?\n\nabstract class Shape {\n  abstract double area();\n  void describe() { System.out.println("Area: " + area()); }\n}\nclass Square extends Shape {\n  double side;\n  Square(double side) { this.side = side; }\n  double area() { return side * side; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Shape s = new Square(4);\n    s.describe();\n  }\n}',
      options: ['"Area: 16.0"', '"Area: 16"', 'Compilation error', '"Area: 4.0"'],
      correct: [0],
      explanation:
        'describe() is a concrete method defined in the abstract Shape class, but it calls area(), which is abstract in Shape and only actually implemented by the concrete subclass — this is a common and powerful pattern where a superclass provides shared structure/logic while delegating a specific piece to whichever subclass eventually completes it (a lightweight form of the Template Method pattern). At runtime, s is a Square, so area() computes side * side = 4 * 4 = 16.0 (a double, hence the ".0"), and describe() concatenates that into the printed string "Area: 16.0".',
      ru: {
        question: 'Что будет напечатано?\n\nabstract class Shape {\n  abstract double area();\n  void describe() { System.out.println("Area: " + area()); }\n}\nclass Square extends Shape {\n  double side;\n  Square(double side) { this.side = side; }\n  double area() { return side * side; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Shape s = new Square(4);\n    s.describe();\n  }\n}',
        options: ['"Area: 16.0"', '"Area: 16"', 'Ошибка компиляции', '"Area: 4.0"'],
        explanation:
          'describe() — конкретный метод, определённый в абстрактном классе Shape, но он вызывает area(), который в Shape абстрактен и реально реализован только конкретным подклассом — это распространённый и мощный паттерн, где суперкласс предоставляет общую структуру/логику, делегируя конкретную часть тому подклассу, который в итоге её завершит (облегчённая форма паттерна Template Method). Во время выполнения s — это Square, поэтому area() вычисляет side * side = 4 * 4 = 16.0 (double, отсюда ".0"), и describe() соединяет это в напечатанную строку "Area: 16.0".',
      },
    },
  ],
  'generics-collections': [
    {
      q: 'What is printed?\n\nList<Integer> list = new ArrayList<>(List.of(3, 1, 2));\nCollections.sort(list);\nSystem.out.println(list);',
      options: ['[1, 2, 3]', '[3, 1, 2]', '[3, 2, 1]', 'Compilation error'],
      correct: [0],
      explanation:
        'Collections.sort(list) mutates the given List in place, rearranging its elements into ascending natural order — for Integer, whose Comparable implementation compares numeric value, that means smallest first. The original insertion order {3, 1, 2} is entirely irrelevant after sorting; the elements end up strictly ordered as [1, 2, 3]. Note this requires a mutable list — List.of(...) itself returns an immutable list that sort() could not modify directly, which is exactly why the code wraps it in `new ArrayList<>(...)` first, copying the elements into a genuinely mutable list before sorting.',
      ru: {
        question: 'Что будет напечатано?\n\nList<Integer> list = new ArrayList<>(List.of(3, 1, 2));\nCollections.sort(list);\nSystem.out.println(list);',
        options: ['[1, 2, 3]', '[3, 1, 2]', '[3, 2, 1]', 'Ошибка компиляции'],
        explanation:
          'Collections.sort(list) изменяет переданный List на месте, переставляя его элементы в порядке возрастания по естественному порядку — для Integer, чья реализация Comparable сравнивает числовое значение, это означает сначала наименьшее. Исходный порядок вставки {3, 1, 2} после сортировки совершенно не важен; элементы в итоге строго упорядочены как [1, 2, 3]. Обратите внимание, что для этого нужен изменяемый список — сам List.of(...) возвращает неизменяемый список, который sort() не смог бы изменить напрямую, именно поэтому код сначала оборачивает его в `new ArrayList<>(...)`, копируя элементы в по-настоящему изменяемый список перед сортировкой.',
      },
    },
  ],
  lambdas: [
    {
      q: 'What is printed?\n\nSupplier<String> sup = () -> "Value";\nSystem.out.println(sup.get());',
      options: ['Value', 'null', 'Compilation error', '() -> Value'],
      correct: [0],
      explanation:
        'The lambda `() -> "Value"` provides an implementation for Supplier\'s single abstract method, `T get()`: it takes no parameters (matching the empty parentheses) and its body is a single expression, "Value", which becomes the implicit return value of that expression-style lambda. Calling sup.get() therefore simply executes that lambda body and returns the string "Value", which is what gets printed — the lambda syntax itself is never part of the runtime output, it is purely source code describing behavior.',
      ru: {
        question: 'Что будет напечатано?\n\nSupplier<String> sup = () -> "Value";\nSystem.out.println(sup.get());',
        options: ['Value', 'null', 'Ошибка компиляции', '() -> Value'],
        explanation:
          'Лямбда `() -> "Value"` предоставляет реализацию единственного абстрактного метода Supplier, `T get()`: она не принимает параметров (соответствует пустым скобкам), а её тело — единственное выражение, "Value", которое становится неявным возвращаемым значением этой лямбды-выражения. Вызов sup.get(), таким образом, просто выполняет тело этой лямбды и возвращает строку "Value", которая и печатается — сам синтаксис лямбды никогда не является частью вывода во время выполнения, это чисто исходный код, описывающий поведение.',
      },
    },
  ],
  streams: [
    {
      q: 'What is printed?\n\nlong count = Stream.of("a", "bb", "ccc", "dddd")\n  .filter(s -> s.length() > 2)\n  .count();\nSystem.out.println(count);',
      options: ['2', '3', '1', '4'],
      correct: [0],
      explanation:
        'filter(s -> s.length() > 2) keeps only elements whose length is strictly greater than 2. Checking each source element: "a" has length 1 (excluded), "bb" has length 2 (excluded, since 2 is not strictly greater than 2), "ccc" has length 3 (included), "dddd" has length 4 (included) — exactly two elements survive the filter. count(), a terminal operation, then simply reports how many elements made it through the entire pipeline, returning the long value 2.',
      ru: {
        question: 'Что будет напечатано?\n\nlong count = Stream.of("a", "bb", "ccc", "dddd")\n  .filter(s -> s.length() > 2)\n  .count();\nSystem.out.println(count);',
        options: ['2', '3', '1', '4'],
        explanation:
          'filter(s -> s.length() > 2) оставляет только элементы, чья длина строго больше 2. Проверяя каждый исходный элемент: "a" имеет длину 1 (исключается), "bb" имеет длину 2 (исключается, так как 2 не строго больше 2), "ccc" имеет длину 3 (включается), "dddd" имеет длину 4 (включается) — ровно два элемента проходят фильтр. count(), терминальная операция, затем просто сообщает, сколько элементов дошло через весь конвейер, возвращая значение long 2.',
      },
    },
  ],
  'exceptions-assertions': [
    {
      q: 'What is printed?\n\npublic class Main {\n  public static void main(String[] args) {\n    try {\n      throw new IllegalStateException("bad");\n    } catch (RuntimeException e) {\n      System.out.println(e.getMessage());\n    }\n  }\n}',
      options: ['bad', 'null', 'IllegalStateException', 'Compilation error'],
      correct: [0],
      explanation:
        'IllegalStateException is a subclass of RuntimeException, so a catch clause declared for RuntimeException matches it exactly (catch clauses match the declared type or any subtype), and control transfers into the catch block. e.getMessage() returns whatever string was passed to the exception\'s constructor when it was created — here, "bad" — not the exception\'s class name and not null (getMessage() only returns null if no message was supplied to the constructor in the first place).',
      ru: {
        question: 'Что будет напечатано?\n\npublic class Main {\n  public static void main(String[] args) {\n    try {\n      throw new IllegalStateException("bad");\n    } catch (RuntimeException e) {\n      System.out.println(e.getMessage());\n    }\n  }\n}',
        options: ['bad', 'null', 'IllegalStateException', 'Ошибка компиляции'],
        explanation:
          'IllegalStateException — подкласс RuntimeException, поэтому блок catch, объявленный для RuntimeException, точно ему соответствует (блоки catch совпадают с объявленным типом или любым его подтипом), и управление переходит в блок catch. e.getMessage() возвращает ту строку, что была передана в конструктор исключения при его создании — здесь это "bad" — а не имя класса исключения и не null (getMessage() возвращает null, только если сообщение вообще не было передано в конструктор).',
      },
    },
  ],
  'java-io': [
    {
      q: 'What is printed?\n\nPath p = Paths.get("folder", "file.txt");\nSystem.out.println(p.getFileName());',
      options: ['file.txt', 'folder', 'folder/file.txt', 'Compilation error'],
      correct: [0],
      explanation:
        'Paths.get("folder", "file.txt") builds a Path representing "folder/file.txt" (joining the given segments with the platform-appropriate separator). getFileName() returns just the final element of that path — the last name in the sequence, ignoring any parent directory segments — which is "file.txt" here, itself returned as another Path. Printing it implicitly calls toString(), so the output is the file name alone, not the full path or the parent folder name.',
      ru: {
        question: 'Что будет напечатано?\n\nPath p = Paths.get("folder", "file.txt");\nSystem.out.println(p.getFileName());',
        options: ['file.txt', 'folder', 'folder/file.txt', 'Ошибка компиляции'],
        explanation:
          'Paths.get("folder", "file.txt") строит Path, представляющий "folder/file.txt" (соединяя заданные сегменты подходящим для платформы разделителем). getFileName() возвращает только последний элемент этого пути — последнее имя в последовательности, игнорируя любые сегменты родительских каталогов, — здесь это "file.txt", само возвращаемое как другой Path. Печать неявно вызывает toString(), поэтому в выводе только имя файла, а не полный путь и не имя родительской папки.',
      },
    },
  ],
  concurrency: [
    {
      q: 'What is printed?\n\nAtomicInteger counter = new AtomicInteger(0);\ncounter.incrementAndGet();\ncounter.incrementAndGet();\nSystem.out.println(counter.get());',
      options: ['2', '0', '1', 'Compilation error'],
      correct: [0],
      explanation:
        'AtomicInteger starts at the value passed to its constructor, 0 here. incrementAndGet() atomically adds one to the current value and returns the new value; it is called twice in sequence, taking the internal value from 0 to 1, then from 1 to 2. counter.get() simply reads the current stored value with no side effect, reporting 2 — the same result a plain int would give in this single-threaded example, though AtomicInteger\'s real value is guaranteeing this arithmetic stays correct even when multiple threads call incrementAndGet() concurrently, which a plain int would not.',
      ru: {
        question: 'Что будет напечатано?\n\nAtomicInteger counter = new AtomicInteger(0);\ncounter.incrementAndGet();\ncounter.incrementAndGet();\nSystem.out.println(counter.get());',
        options: ['2', '0', '1', 'Ошибка компиляции'],
        explanation:
          'AtomicInteger начинается со значения, переданного в его конструктор, здесь это 0. incrementAndGet() атомарно прибавляет единицу к текущему значению и возвращает новое значение; он вызывается дважды подряд, переводя внутреннее значение с 0 на 1, затем с 1 на 2. counter.get() просто читает текущее сохранённое значение без побочных эффектов, сообщая 2 — тот же результат, что дал бы обычный int в этом однопоточном примере, хотя реальная ценность AtomicInteger в том, что он гарантирует корректность этой арифметики даже когда несколько потоков вызывают incrementAndGet() одновременно, чего обычный int не обеспечивает.',
      },
    },
  ],
  jdbc: [
    {
      q: 'Given:\n\nString sql = "SELECT * FROM users WHERE id = ?";\ntry (PreparedStatement ps = conn.prepareStatement(sql)) {\n  ps.setInt(1, 42);\n  ResultSet rs = ps.executeQuery();\n}\n\nWhat does `ps.setInt(1, 42)` do?',
      options: [
        'Binds the value 42 to the first placeholder (?) in the query',
        'Sets the query timeout to 42 seconds',
        'Sets the first column of the result set to 42',
        'Executes the query with a row limit of 42',
      ],
      correct: [0],
      explanation:
        'setInt(parameterIndex, value) binds an int value to a specific `?` placeholder within the PreparedStatement\'s SQL template, identified by its 1-based position — here, index 1 refers to the single `?` in "WHERE id = ?", and the driver will substitute 42 there (safely, as data, not as raw SQL text) when the statement is executed. This has nothing to do with query timeouts (a separate method, setQueryTimeout()), result set columns (which are read after the query runs, via ResultSet, not written by the PreparedStatement itself), or a row limit (that would be setMaxRows() or a SQL LIMIT clause).',
      ru: {
        question: 'Дано:\n\nString sql = "SELECT * FROM users WHERE id = ?";\ntry (PreparedStatement ps = conn.prepareStatement(sql)) {\n  ps.setInt(1, 42);\n  ResultSet rs = ps.executeQuery();\n}\n\nЧто делает `ps.setInt(1, 42)`?',
        options: [
          'Связывает значение 42 с первым плейсхолдером (?) в запросе',
          'Устанавливает таймаут запроса в 42 секунды',
          'Устанавливает значение первого столбца результата равным 42',
          'Выполняет запрос с ограничением в 42 строки',
        ],
        explanation:
          'setInt(индексПараметра, значение) связывает int-значение с конкретным плейсхолдером `?` внутри SQL-шаблона PreparedStatement, определяемым по его позиции с отсчётом от 1 — здесь индекс 1 указывает на единственный `?` в "WHERE id = ?", и драйвер подставит туда 42 (безопасно, как данные, а не как сырой текст SQL) при выполнении оператора. Это никак не связано с таймаутами запроса (отдельный метод, setQueryTimeout()), столбцами результата (которые читаются после выполнения запроса через ResultSet, а не записываются самим PreparedStatement), или ограничением количества строк (для этого setMaxRows() или SQL-конструкция LIMIT).',
      },
    },
  ],
  'date-time': [
    {
      q: 'What is printed?\n\nLocalDate d = LocalDate.of(2024, 2, 28);\nLocalDate next = d.plusDays(1);\nSystem.out.println(next);',
      options: ['2024-02-29', '2024-03-01', '2024-02-28', 'Compilation error'],
      correct: [0],
      explanation:
        '2024 is divisible by 4 and not a century year that would need to also be divisible by 400, so it is a leap year, meaning February has 29 days that year rather than the usual 28. plusDays(1) returns a new LocalDate one calendar day after the original — since 2024 has a February 29th, adding one day to February 28th correctly lands on February 29th, not rolling over into March. LocalDate\'s date arithmetic is fully leap-year aware, so this calculation is handled correctly without any special-casing needed in application code.',
      ru: {
        question: 'Что будет напечатано?\n\nLocalDate d = LocalDate.of(2024, 2, 28);\nLocalDate next = d.plusDays(1);\nSystem.out.println(next);',
        options: ['2024-02-29', '2024-03-01', '2024-02-28', 'Ошибка компиляции'],
        explanation:
          '2024 делится на 4 и не является "вековым" годом, которому дополнительно требовалось бы делиться на 400, поэтому это високосный год, а значит в феврале того года 29 дней, а не обычные 28. plusDays(1) возвращает новый LocalDate на один календарный день позже исходного — поскольку в 2024 году есть 29 февраля, прибавление одного дня к 28 февраля корректно приводит к 29 февраля, не переходя на март. Арифметика дат LocalDate полностью учитывает високосные годы, поэтому этот расчёт обрабатывается корректно без какой-либо специальной обработки в коде приложения.',
      },
    },
  ],
}

export const ocpQuestions = Object.entries(raw).flatMap(([topic, items]) =>
  [...items, ...(extra[topic] ?? [])].map((item, i) => ({
    id: `ocp-${topic}-${i + 1}`,
    section: 'OCP',
    topic,
    question: item.q,
    options: item.options,
    correct: item.correct,
    explanation: item.explanation,
    ru: item.ru,
    variantGroup: item.variantGroup,
  }))
)
