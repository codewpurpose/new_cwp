import type { AuthoredQuestion } from "@/lib/quizzes/types";

/**
 * Hand-written quick checks for the python track, keyed by chapter slug.
 * A chapter listed here uses these questions instead of the auto-drafted
 * quiz in src/lib/quiz.ts. Each question tests something the chapter
 * actually teaches; `answer` is the zero-based index of the correct option.
 */
export const QUIZZES: Record<string, readonly AuthoredQuestion[]> = {
  "what-is-python": [
    {
      q: "In Python, what tells the interpreter which lines belong inside an if or else block?",
      options: [
        "The indentation of the lines",
        "Curly braces around the block",
        "A semicolon after each line",
        "An end keyword after the block",
      ],
      answer: 0,
    },
    {
      q: "What does CPython do with your .py file when you run it?",
      options: [
        "Compiles it to bytecode, then interprets that bytecode",
        "Compiles it straight to machine code ahead of time",
        "Sends it to a server that runs it remotely",
        "Reads the source text one character at a time",
      ],
      answer: 0,
    },
    {
      q: "total_price([{\"price\": 10}, {\"price\": \"20\"}]) adds up the prices. When does Python report the problem?",
      options: [
        "Only when that line runs and tries to add an int to a str",
        "Before the program starts, while checking the types",
        "Never: Python quietly converts \"20\" to the number 20",
        "When the file is saved in a Python-aware editor",
      ],
      answer: 0,
    },
    {
      q: "Your Python program needs to do heavy number crunching quickly. What does the chapter say fast Python code usually does?",
      options: [
        "Calls into libraries written in C underneath",
        "Avoids functions so there is less overhead",
        "Switches to Python 2, which ran loops faster",
        "Puts all the code on a single line",
      ],
      answer: 0,
    },
  ],
  "setting-up": [
    {
      q: "On macOS or Linux, which command is the safe one to type to start Python 3?",
      options: ["python3", "python", "py3", "run python"],
      answer: 0,
    },
    {
      q: "In the REPL you type x = 5 and press return. What does the REPL print?",
      options: [
        "Nothing, because an assignment runs silently",
        "5",
        "x = 5",
        "None",
      ],
      answer: 0,
    },
    {
      q: "You run python3 hello.py and get \"can't open file 'hello.py': No such file or directory\". What is the likely fix?",
      options: [
        "Run it from the folder the file is in, or give its path",
        "Fix the syntax error on the first line of hello.py",
        "Reinstall Python, because the interpreter is broken",
        "Rename the file to hello.txt and run it again",
      ],
      answer: 0,
    },
    {
      q: "Why create a virtual environment for each project?",
      options: [
        "So each project's packages stay separate and cannot conflict",
        "So your code runs faster than with the system Python",
        "So the project folder can be committed with every package",
        "So Python 2 and Python 3 code can be mixed in one file",
      ],
      answer: 0,
    },
  ],
  variables: [
    {
      q: "You run a = [1, 2, 3], then b = a, then b.append(4). What does print(a) show?",
      options: ["[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "An error, because a was not changed"],
      answer: 0,
    },
    {
      q: "You run a = 3, then b = a, then a = 5. What does print(b) show?",
      options: ["3", "5", "8", "None"],
      answer: 0,
    },
    {
      q: "a = [1, 2, 3] and b = [1, 2, 3] are built on separate lines. What are a == b and a is b?",
      options: [
        "a == b is True, a is b is False",
        "a == b is True, a is b is True",
        "a == b is False, a is b is False",
        "a == b is False, a is b is True",
      ],
      answer: 0,
    },
    {
      q: "Which of these is a valid Python variable name?",
      options: ["total_score", "2nd_place", "class", "total-score"],
      answer: 0,
    },
  ],
  "numbers-and-operators": [
    {
      q: "What do 7 / 2 and 7 // 2 return?",
      options: ["3.5 and 3", "3.5 and 3.5", "3 and 3.5", "3 and 1"],
      answer: 0,
    },
    {
      q: "What does 2 ** 3 ** 2 evaluate to?",
      options: ["512", "64", "36", "18"],
      answer: 0,
    },
    {
      q: "0.1 + 0.2 == 0.3 is False. What is the right way to compare these floats?",
      options: [
        "Check they are close, e.g. round both or use math.isclose",
        "Use is instead of == for floats",
        "Convert both sides to int first",
        "Add 0.0 to both sides before comparing",
      ],
      answer: 0,
    },
    {
      q: "What does int(9.9) return?",
      options: ["9", "10", "9.9", "An error, because 9.9 is not whole"],
      answer: 0,
    },
  ],
  strings: [
    {
      q: "With name = \"python\", what is name[-1]?",
      options: ["'n'", "'p'", "'o'", "An IndexError"],
      answer: 0,
    },
    {
      q: "With word = \"python\", what does word[0:2] return?",
      options: ["'py'", "'pyt'", "'yt'", "'p'"],
      answer: 0,
    },
    {
      q: "name = \"python\", then you run name.upper() on its own line. What is name now?",
      options: [
        "'python', because strings never change in place",
        "'PYTHON', because upper() edits the string",
        "None, because upper() returns nothing",
        "'Python', because only the first letter changes",
      ],
      answer: 0,
    },
    {
      q: "price = 19.5. What does f\"Total: {price * 2:.2f}\" produce?",
      options: ["'Total: 39.00'", "'Total: 39.0'", "'Total: 39'", "'Total: {price * 2:.2f}'"],
      answer: 0,
    },
  ],
  "lists-and-tuples": [
    {
      q: "Which of these is a tuple holding exactly one item?",
      options: ["(1,)", "(1)", "[1]", "tuple 1"],
      answer: 0,
    },
    {
      q: "numbers = [3, 1, 2], then numbers = numbers.sort(). What is numbers now?",
      options: ["None", "[1, 2, 3]", "[3, 1, 2]", "[3, 2, 1]"],
      answer: 0,
    },
    {
      q: "Which line gives you a separate copy of the list original?",
      options: [
        "safe = original.copy()",
        "safe = original",
        "safe == original",
        "safe = (original)",
      ],
      answer: 0,
    },
    {
      q: "A function receives a list and calls scores.append(100). What happens to the caller's list?",
      options: [
        "It gains 100 too, because it is the same list",
        "Nothing, because the function got a private copy",
        "It is replaced with a new list holding only 100",
        "Python raises an error for changing an argument",
      ],
      answer: 0,
    },
  ],
  dictionaries: [
    {
      q: "prices = {\"apple\": 0.6}. What does prices[\"fig\"] do?",
      options: ["Raises KeyError: 'fig'", "Returns None", "Returns 0", "Adds \"fig\" with no value"],
      answer: 0,
    },
    {
      q: "Which of these can be used as a dictionary key?",
      options: ["(0, 1)", "[0, 1]", "{0: 1}", "{0, 1}"],
      answer: 0,
    },
    {
      q: "You want a price, or 0 when the item is missing, without an error. Which do you write?",
      options: [
        "prices.get(\"fig\", 0)",
        "prices[\"fig\"] or 0",
        "prices.find(\"fig\", 0)",
        "prices[\"fig\", 0]",
      ],
      answer: 0,
    },
    {
      q: "Which loop gives you each key and its value together?",
      options: [
        "for name, price in prices.items():",
        "for name, price in prices:",
        "for name, price in prices.keys():",
        "for name, price in prices.values():",
      ],
      answer: 0,
    },
  ],
  "sets-and-truthiness": [
    {
      q: "Which of these values is truthy?",
      options: ["\"False\"", "0", "[]", "None"],
      answer: 0,
    },
    {
      q: "A function gets votes=[] for a round with zero votes and votes=None before voting starts. Which check tells the two apart?",
      options: ["if votes is not None:", "if votes:", "if not votes:", "if votes == []:"],
      answer: 0,
    },
    {
      q: "admins = {\"ada\", \"grace\"} and editors = {\"grace\", \"alan\"}. What is admins & editors?",
      options: ["{'grace'}", "{'ada', 'grace', 'alan'}", "{'ada'}", "{'ada', 'alan'}"],
      answer: 0,
    },
    {
      q: "Your loop checks thousands of times whether a name is in a large collection. Which structure makes that check fastest?",
      options: ["A set", "A list", "A tuple", "A string of names"],
      answer: 0,
    },
  ],
  conditionals: [
    {
      q: "score = 95. An if/elif/else chain checks score >= 90 (grade A), then score >= 80 (grade B), else grade F. What is grade?",
      options: ["\"A\"", "\"B\"", "\"F\"", "\"A\", then \"B\""],
      answer: 0,
    },
    {
      q: "score = 95. Three separate if statements (no elif) set grade to A if score >= 90, B if >= 80, C if >= 70. What is grade?",
      options: ["\"C\"", "\"A\"", "\"B\"", "An error for reassigning grade"],
      answer: 0,
    },
    {
      q: "With age = 16, what does 13 <= age < 20 evaluate to?",
      options: ["True", "False", "16", "A SyntaxError"],
      answer: 0,
    },
    {
      q: "In a match statement, what does case _: do?",
      options: [
        "Catches anything no earlier case matched",
        "Matches only an empty value",
        "Skips the match statement entirely",
        "Matches a variable literally named _",
      ],
      answer: 0,
    },
  ],
  loops: [
    {
      q: "What does list(range(2, 10, 3)) return?",
      options: ["[2, 5, 8]", "[2, 5, 8, 11]", "[3, 6, 9]", "[2, 4, 6, 8]"],
      answer: 0,
    },
    {
      q: "names has 4 items and scores has 3. How many times does for name, score in zip(names, scores): run?",
      options: ["3", "4", "7", "It raises an error"],
      answer: 0,
    },
    {
      q: "When does the else block attached to a for loop run?",
      options: [
        "When the loop finishes without hitting break",
        "When the loop body raised an error",
        "On every iteration where the if was false",
        "Only when the list being looped over is empty",
      ],
      answer: 0,
    },
    {
      q: "numbers = [2, 4, 6, 7, 8]. A loop over numbers removes every even n from numbers. What is left?",
      options: ["[4, 7]", "[7]", "[2, 4, 6, 7, 8]", "[]"],
      answer: 0,
    },
  ],
  functions: [
    {
      q: "def show_total(a, b): print(a + b). What is stored in result after result = show_total(3, 4)?",
      options: ["None", "7", "\"7\"", "The function itself"],
      answer: 0,
    },
    {
      q: "def add_item(item, basket=[]) appends item and returns basket. What does a second call, add_item(\"banana\"), return after add_item(\"apple\")?",
      options: ["['apple', 'banana']", "['banana']", "['apple']", "[]"],
      answer: 0,
    },
    {
      q: "What does *numbers collect in def total(*numbers):?",
      options: [
        "Any extra positional arguments, as a tuple",
        "Any keyword arguments, as a dictionary",
        "Exactly one argument, multiplied",
        "Only arguments that are numbers",
      ],
      answer: 0,
    },
    {
      q: "Where does help(greet) get the description it prints?",
      options: [
        "The docstring on the first line of the function body",
        "A comment written above the def line",
        "The name of the function's first parameter",
        "The last print call inside the function",
      ],
      answer: 0,
    },
  ],
  "scope-and-arguments": [
    {
      q: "A function runs total = 100, then returns. What happens if you read total outside it?",
      options: [
        "NameError, because total was local to the function",
        "It prints 100, because the function already ran",
        "It prints None, because the function returned nothing",
        "It prints 0, the default value for a new name",
      ],
      answer: 0,
    },
    {
      q: "count = 0 at module level. def increment(): count = count + 1. What does calling increment() raise?",
      options: ["UnboundLocalError", "NameError", "TypeError", "Nothing; count becomes 1"],
      answer: 0,
    },
    {
      q: "A nested function needs to update a variable of the function it sits inside. Which keyword does it use?",
      options: ["nonlocal", "global", "outer", "static"],
      answer: 0,
    },
    {
      q: "def add_score(scores): scores = scores + [100]. After add_score(my_scores), what happens to my_scores?",
      options: [
        "Nothing, because only the local name was rebound",
        "It gains 100 at the end",
        "It becomes a new list holding only 100",
        "It becomes None",
      ],
      answer: 0,
    },
  ],
  errors: [
    {
      q: "Where in a traceback do you find the exception that actually happened?",
      options: [
        "On the last line",
        "On the first line",
        "In the middle frame",
        "In a separate log file",
      ],
      answer: 0,
    },
    {
      q: "Why can't a try/except in your script catch a SyntaxError in that same file?",
      options: [
        "Python refuses to run the file at all, so the except never runs",
        "SyntaxError is not an exception type in Python",
        "SyntaxError can only be caught with a bare except:",
        "The except clause must be placed before the try",
      ],
      answer: 0,
    },
    {
      q: "In try / except / else / finally, when does the else block run?",
      options: [
        "Only when the try block raised nothing",
        "Only when the except block ran",
        "Always, after finally",
        "Only when the error was re-raised",
      ],
      answer: 0,
    },
    {
      q: "Why is a bare except: a bad idea?",
      options: [
        "It also hides errors you never expected, like a typo",
        "It makes the program noticeably slower to run",
        "It only catches SyntaxError, nothing else",
        "Python 3 no longer allows it",
      ],
      answer: 0,
    },
  ],
  "modules-and-packages": [
    {
      q: "main.py does import shapes twice, in two different places. How many times does the code in shapes.py run?",
      options: ["Once", "Twice", "Never, until a function is called", "Once per function in it"],
      answer: 0,
    },
    {
      q: "What is __name__ inside weather.py when you run python3 weather.py directly?",
      options: ["\"__main__\"", "\"weather\"", "\"weather.py\"", "None"],
      answer: 0,
    },
    {
      q: "You save a file as random.py, and now import random; random.randint(1, 6) fails. Why?",
      options: [
        "Your file is found first and hides the real random module",
        "randint was removed from the random module",
        "Files named after modules cannot contain imports",
        "random must be installed with pip first",
      ],
      answer: 0,
    },
    {
      q: "Running python3 angles.py, which contains from .shapes import area_of_circle, fails. Why?",
      options: [
        "Relative imports only work inside an imported package",
        "Dots are not allowed in an import statement",
        "shapes.py must be renamed to .shapes.py",
        "area_of_circle must be imported before shapes",
      ],
      answer: 0,
    },
  ],
  "classes-and-objects": [
    {
      q: "Why does every method in a class take self as its first parameter?",
      options: [
        "Python passes in the object the method was called on",
        "It is a keyword that makes the method public",
        "It stores a copy of the class on each method",
        "It is only a convention and can be left out freely",
      ],
      answer: 0,
    },
    {
      q: "class Student: clubs = [] (in the class body). ada.clubs.append(\"Chess\"). What is grace.clubs?",
      options: ["['Chess']", "[]", "An AttributeError", "None"],
      answer: 0,
    },
    {
      q: "What does __init__ actually do?",
      options: [
        "Sets starting values on an object that already exists",
        "Allocates the memory for a brand-new object",
        "Deletes the object when it is no longer used",
        "Prints the object in a readable way",
      ],
      answer: 0,
    },
    {
      q: "print(ada) shows <__main__.Student object at 0x...>. What do you add to show something readable?",
      options: ["A __repr__ method", "A __print__ method", "A to_string method", "A second __init__"],
      answer: 0,
    },
  ],
  inheritance: [
    {
      q: "class Dog(Animal): pass, and rex = Dog(\"Rex\"). What is isinstance(rex, Animal)?",
      options: [
        "True, because every Dog is also an Animal",
        "False, because rex was built as a Dog",
        "An error, because Dog defines no methods",
        "True only if Animal defines __init__",
      ],
      answer: 0,
    },
    {
      q: "Dog adds a breed field. Which line inside Dog.__init__ lets Animal set up name as usual?",
      options: [
        "super().__init__(name)",
        "Animal = super(name)",
        "self.super(name)",
        "parent.__init__(self)",
      ],
      answer: 0,
    },
    {
      q: "A Car has an Engine. How should you model that?",
      options: [
        "Store an Engine object as an attribute of Car",
        "Make Car a subclass of Engine",
        "Make Engine a subclass of Car",
        "Copy every Engine method into Car",
      ],
      answer: 0,
    },
    {
      q: "Dog defines its own describe(). What happens to Animal.describe?",
      options: [
        "Nothing; only Dog uses the new version",
        "It is replaced for every class",
        "It is deleted from Animal",
        "Both versions run on every call",
      ],
      answer: 0,
    },
  ],
  "files-and-paths": [
    {
      q: "What does open(\"notes.txt\", \"w\") do if notes.txt already has content?",
      options: [
        "Empties it before writing",
        "Adds new text after the old text",
        "Raises an error because it exists",
        "Opens it read-only",
      ],
      answer: 0,
    },
    {
      q: "Inside a with open(...) as f: block, an exception is raised. What is f.closed afterwards?",
      options: [
        "True, because with closes the file anyway",
        "False, because the error skipped the close",
        "None, because the file was never opened",
        "It depends on the operating system",
      ],
      answer: 0,
    },
    {
      q: "You need to scan a 2 GB log file without loading it all into memory. Which do you write?",
      options: ["for line in f:", "f.read()", "f.readlines()", "list(f)"],
      answer: 0,
    },
    {
      q: "Your script opens \"notes.txt\", but it fails when run from another folder. Which path finds the file next to the script?",
      options: [
        "Path(__file__).parent / \"notes.txt\"",
        "Path(\"notes.txt\")",
        "\"./\" + \"notes.txt\"",
        "Path.cwd() / \"notes.txt\"",
      ],
      answer: 0,
    },
  ],
  comprehensions: [
    {
      q: "numbers = [1, 2, 3, 4, 5, 6]. What is [n * n for n in numbers if n % 2 == 0]?",
      options: ["[4, 16, 36]", "[1, 9, 25]", "[1, 4, 9, 16, 25, 36]", "[2, 4, 6]"],
      answer: 0,
    },
    {
      q: "What does {len(name) for name in [\"Ada\", \"Grace\", \"Alan\"]} build?",
      options: [
        "A set: {3, 4, 5}",
        "A dict: {'Ada': 3, 'Grace': 5, 'Alan': 4}",
        "A list: [3, 5, 4]",
        "A tuple: (3, 5, 4)",
      ],
      answer: 0,
    },
    {
      q: "rows = [[1, 2], [3]]. Which comprehension flattens it to [1, 2, 3]?",
      options: [
        "[v for row in rows for v in row]",
        "[v for v in row for row in rows]",
        "[row for v in rows]",
        "[[v] for row in rows]",
      ],
      answer: 0,
    },
    {
      q: "What does {} on its own create?",
      options: ["An empty dict", "An empty set", "An empty list", "A SyntaxError"],
      answer: 0,
    },
  ],
  "iterators-and-generators": [
    {
      q: "it = iter([10, 20]). After next(it) twice, what does a third next(it) do?",
      options: ["Raises StopIteration", "Returns None", "Returns 10 again", "Returns 20 again"],
      answer: 0,
    },
    {
      q: "gen = fibonacci_below(20) for a generator function. How much of the function body has run?",
      options: [
        "None of it yet",
        "All of it, with values stored",
        "Up to the first yield",
        "Only the first line",
      ],
      answer: 0,
    },
    {
      q: "squares = (n * n for n in range(5)). What does a second list(squares) return?",
      options: ["[]", "[0, 1, 4, 9, 16]", "None", "An error"],
      answer: 0,
    },
    {
      q: "Why does sum(n * n for n in range(1_000_000)) use so little memory?",
      options: [
        "Each square is made only when sum asks for it",
        "Python stores the million squares compressed",
        "sum works on the first thousand values only",
        "range turns the numbers into a string first",
      ],
      answer: 0,
    },
  ],
  decorators: [
    {
      q: "What is @log_calls written above def add(a, b): shorthand for?",
      options: [
        "add = log_calls(add)",
        "log_calls = add(log_calls)",
        "add(log_calls)",
        "log_calls.add()",
      ],
      answer: 0,
    },
    {
      q: "@a is written above @b, which is above def f():. What is f replaced with?",
      options: ["a(b(f))", "b(a(f))", "a(f) and b(f)", "f(a(b))"],
      answer: 0,
    },
    {
      q: "After decorating add with a plain wrapper, add.__name__ is 'wrapper'. What fixes that?",
      options: [
        "Put @functools.wraps(func) on the inner wrapper",
        "Rename wrapper to add inside the decorator",
        "Call add.__name__ = add before decorating",
        "Remove *args from the wrapper's parameters",
      ],
      answer: 0,
    },
    {
      q: "In @repeat(3), what runs first?",
      options: [
        "repeat(3), which returns the real decorator",
        "The decorated function, three times",
        "The wrapper, with 3 as its argument",
        "Nothing, until the function is called",
      ],
      answer: 0,
    },
  ],
  "list-methods-in-depth": [
    {
      q: "What does sorted([\"bo\", \"Zoe\", \"ada\"]) return?",
      options: [
        "['Zoe', 'ada', 'bo']",
        "['ada', 'bo', 'Zoe']",
        "['bo', 'Zoe', 'ada']",
        "['Zoe', 'bo', 'ada']",
      ],
      answer: 0,
    },
    {
      q: "letters = [\"a\", \"b\", \"c\", \"d\"], then letters[1:3] = [\"X\"]. What is letters?",
      options: [
        "['a', 'X', 'd']",
        "['a', 'X', 'c', 'd']",
        "['a', 'X', 'X', 'd']",
        "['X', 'b', 'c', 'd']",
      ],
      answer: 0,
    },
    {
      q: "a = [1, 2], then a.append([3, 4]). What is len(a)?",
      options: ["3", "4", "2", "1"],
      answer: 0,
    },
    {
      q: "grid = [[0] * 3] * 3, then grid[0][0] = 1. What is grid?",
      options: [
        "[[1, 0, 0], [1, 0, 0], [1, 0, 0]]",
        "[[1, 0, 0], [0, 0, 0], [0, 0, 0]]",
        "[[1, 1, 1], [0, 0, 0], [0, 0, 0]]",
        "An error, because grid cannot be changed",
      ],
      answer: 0,
    },
  ],
  "records-and-tables": [
    {
      q: "Why store a student as {\"name\": ..., \"chapters\": 18} rather than (\"Amara\", 18)?",
      options: [
        "The fields have names, so the code still makes sense later",
        "Dictionaries use less memory than tuples",
        "Tuples cannot hold strings and numbers together",
        "Only dictionaries can be put in a list",
      ],
      answer: 0,
    },
    {
      q: "Which key sorts students by track, then by most chapters first within each track?",
      options: [
        "key=lambda s: (s[\"track\"], -s[\"chapters\"])",
        "key=lambda s: (s[\"track\"], s[\"chapters\"])",
        "key=lambda s: s[\"track\"] - s[\"chapters\"]",
        "key=lambda s: (-s[\"track\"], s[\"chapters\"])",
      ],
      answer: 0,
    },
    {
      q: "You filter students into finished, then change a field on a row of finished. What happens to students?",
      options: [
        "It changes too, because both lists hold the same dicts",
        "Nothing, because filtering copied each dictionary",
        "The row is removed from students",
        "Python raises an error for editing a filtered row",
      ],
      answer: 0,
    },
    {
      q: "What does max(students, key=lambda s: s[\"minutes\"]) do when students is empty?",
      options: [
        "Raises ValueError, unless you pass default=",
        "Returns None",
        "Returns 0",
        "Returns an empty dictionary",
      ],
      answer: 0,
    },
  ],
  "nested-structures": [
    {
      q: "club = {\"members\": [{\"name\": \"Amara\", \"badges\": [\"solder\", \"cad\"]}]}. What is club[\"members\"][0][\"badges\"][1]?",
      options: ["'cad'", "'solder'", "'Amara'", "An IndexError"],
      answer: 0,
    },
    {
      q: "club[\"members\"] is a list. What does club[\"members\"][\"0\"] raise?",
      options: [
        "TypeError: list indices must be integers",
        "KeyError: '0'",
        "IndexError: list index out of range",
        "Nothing; it returns the first member",
      ],
      answer: 0,
    },
    {
      q: "club = {\"name\": \"Robotics\"}. What does club[\"members\"].append(\"Amara\") do?",
      options: [
        "Raises KeyError: 'members'",
        "Creates a members list holding \"Amara\"",
        "Returns None and changes nothing",
        "Raises AttributeError on append",
      ],
      answer: 0,
    },
    {
      q: "Which error tells you that you tried to go down a level from a string?",
      options: ["TypeError", "KeyError", "IndexError", "ValueError"],
      answer: 0,
    },
  ],
  "copying-and-aliasing": [
    {
      q: "a = [[1, 2], [3, 4]], b = a.copy(), then b[0].append(9). What is a?",
      options: [
        "[[1, 2, 9], [3, 4]]",
        "[[1, 2], [3, 4]]",
        "[[1, 2], [3, 4], 9]",
        "[[9], [3, 4]]",
      ],
      answer: 0,
    },
    {
      q: "Which change can tell b = a apart from b = a.copy()?",
      options: [
        "Appending to the outer list b",
        "Appending to the inner list b[0]",
        "Printing b",
        "Checking len(b[0])",
      ],
      answer: 0,
    },
    {
      q: "Which copy shares nothing with the original nested list?",
      options: ["copy.deepcopy(a)", "a.copy()", "list(a)", "a[:]"],
      answer: 0,
    },
    {
      q: "A list holds only numbers and strings. Is a shallow copy enough?",
      options: [
        "Yes, because numbers and strings cannot be changed in place",
        "No, you always need deepcopy for lists",
        "No, numbers are shared and will change together",
        "Only if the list has fewer than ten items",
      ],
      answer: 0,
    },
  ],
  "errors-in-data": [
    {
      q: "scores = {\"amara\": 18}. What does scores.get(\"dara\") return?",
      options: ["None", "0", "KeyError: 'dara'", "\"dara\""],
      answer: 0,
    },
    {
      q: "by_track = {}. What does by_track.setdefault(\"ml\", []).append(\"Ben\") leave in by_track?",
      options: [
        "{'ml': ['Ben']}",
        "{}",
        "{'ml': []}",
        "A KeyError, because \"ml\" was missing",
      ],
      answer: 0,
    },
    {
      q: "minutes = record.get(\"minutes\") is None, and a later line divides by it. What do you see?",
      options: [
        "A TypeError at the division, far from the real cause",
        "A KeyError naming the missing \"minutes\" key",
        "The division quietly treats None as zero",
        "A ValueError at the get() call",
      ],
      answer: 0,
    },
    {
      q: "A lookup misses nine times out of ten. Which approach does the chapter recommend?",
      options: [
        "Check with in first, because raising is costly",
        "Use try/except, because it is always faster",
        "Use a bare except: to catch every miss",
        "Wrap the whole program in one try block",
      ],
      answer: 0,
    },
  ],
  "the-collections-module": [
    {
      q: "counts = Counter([\"red\", \"red\", \"blue\"]). What is counts[\"green\"]?",
      options: ["0", "None", "KeyError: 'green'", "1"],
      answer: 0,
    },
    {
      q: "Which line creates a dictionary that starts every new key with its own empty list?",
      options: [
        "defaultdict(list)",
        "defaultdict(list())",
        "defaultdict([])",
        "dict(list)",
      ],
      answer: 0,
    },
    {
      q: "On a defaultdict(list), you only read by_track[\"chemistry\"]. What changes?",
      options: [
        "The key is added with an empty list",
        "Nothing; reading never changes a dict",
        "It raises KeyError: 'chemistry'",
        "The defaultdict turns into a plain dict",
      ],
      answer: 0,
    },
    {
      q: "You process a large queue by removing items from the front. Which structure suits this?",
      options: ["deque, using popleft()", "list, using pop(0)", "namedtuple", "Counter"],
      answer: 0,
    },
  ],
  "choosing-a-structure": [
    {
      q: "\"dara\" in names, where names is a list of 10,000 names without \"dara\". How many items get compared?",
      options: ["All 10,000", "Just 1", "About 100", "None, a list is hashed"],
      answer: 0,
    },
    {
      q: "Why can't a list go inside a set?",
      options: [
        "A list can change, so it cannot be hashed",
        "Sets can only hold strings",
        "A list is too large to store in a set",
        "Sets keep order and lists do not",
      ],
      answer: 0,
    },
    {
      q: "Your code keeps scanning students to find one by name. What is the better fix?",
      options: [
        "Build a dict keyed by name once, then look up",
        "Sort the list before every search",
        "Convert to a set inside the loop each time",
        "Switch the list to a tuple",
      ],
      answer: 0,
    },
    {
      q: "You think a set would speed up a small lookup. What should you do before changing the code?",
      options: [
        "Measure both versions, for example with timeit",
        "Always switch, because sets are always faster",
        "Never switch, because lists are always faster",
        "Add more items so the difference shows",
      ],
      answer: 0,
    },
  ],
  "working-with-libraries": [
    {
      q: "What does pip freeze > requirements.txt record?",
      options: [
        "The exact version of every installed package",
        "Only the packages you typed in pip install",
        "The newest version available of each package",
        "The source code of every installed package",
      ],
      answer: 0,
    },
    {
      q: "Your friend has your requirements.txt. Which command installs the same versions?",
      options: [
        "pip install -r requirements.txt",
        "pip freeze requirements.txt",
        "python3 requirements.txt",
        "pip upgrade requirements.txt",
      ],
      answer: 0,
    },
    {
      q: "Why does the .venv folder belong in .gitignore?",
      options: [
        "It can be rebuilt from the requirements and is very large",
        "Git cannot store files that start with a dot",
        "It contains your passwords",
        "Committing it deletes your installed packages",
      ],
      answer: 0,
    },
    {
      q: "Which is a warning sign before you depend on a package?",
      options: [
        "It has had no release in several years",
        "Its licence is MIT",
        "It has only a couple of dependencies",
        "Its documentation lists every argument",
      ],
      answer: 0,
    },
  ],
  "json-and-apis": [
    {
      q: "What does json.loads('{\"ok\": true, \"note\": null}') return?",
      options: [
        "{'ok': True, 'note': None}",
        "{'ok': 'true', 'note': 'null'}",
        "{'ok': true, 'note': null}",
        "A JSONDecodeError",
      ],
      answer: 0,
    },
    {
      q: "You have an open file f holding JSON. Which call reads it?",
      options: ["json.load(f)", "json.loads(f)", "json.dumps(f)", "json.read(f)"],
      answer: 0,
    },
    {
      q: "A request returned status 500 with an HTML body. What should you do before calling .json()?",
      options: [
        "Check status_code or call raise_for_status()",
        "Retry .json() until it succeeds",
        "Wrap it in a bare except:",
        "Add a longer timeout",
      ],
      answer: 0,
    },
    {
      q: "Where should your API key live?",
      options: [
        "In an environment variable, read with os.environ",
        "Typed directly into the source file",
        "In a comment at the top of the script",
        "In the URL of every request you make",
      ],
      answer: 0,
    },
  ],
  "testing-your-code": [
    {
      q: "What does assert add(2, 3) == 5 do when add is correct?",
      options: [
        "Nothing at all",
        "Prints True",
        "Prints 5",
        "Returns the value 5",
      ],
      answer: 0,
    },
    {
      q: "Which of these is not a real test?",
      options: [
        "assert largest([3, 1, 4]) == largest([3, 1, 4])",
        "assert largest([3, 1, 4]) == 4",
        "assert largest([]) is None",
        "assert largest([-5, -2]) == -2",
      ],
      answer: 0,
    },
    {
      q: "How does pytest know to pass sample_scores into test_average(sample_scores)?",
      options: [
        "It matches the parameter name to a fixture's name",
        "It guesses from the type of the argument",
        "It reads the comment above the test",
        "You must pass it yourself when calling the test",
      ],
      answer: 0,
    },
    {
      q: "Your suite reports 100% coverage. What does that prove?",
      options: [
        "Every line ran at least once during the tests",
        "Every line gives the correct answer",
        "The code has no bugs left",
        "Every edge case has a test",
      ],
      answer: 0,
    },
  ],
  "final-project": [
    {
      q: "What does word_counts(\"the cat the\") return in the minimum version?",
      options: [
        "{'the': 2, 'cat': 1}",
        "{'the': 1, 'cat': 1}",
        "{'cat': 1}",
        "['the', 'cat', 'the']",
      ],
      answer: 0,
    },
    {
      q: "Why does counts[word] = counts.get(word, 0) + 1 never raise KeyError?",
      options: [
        "get supplies 0 the first time a word appears",
        "Assigning to a key always checks it first",
        "The loop skips words it has not seen",
        "counts starts with every word set to 0",
      ],
      answer: 0,
    },
    {
      q: "The minimum version counts \"cat,\" and \"cat\" separately. What fixes it?",
      options: [
        "word.strip(string.punctuation) before counting",
        "text.split(\",\") instead of text.split()",
        "Using a set instead of a dictionary",
        "Calling word.upper() before counting",
      ],
      answer: 0,
    },
    {
      q: "Which finds the most common word in counts?",
      options: [
        "max(counts, key=counts.get)",
        "max(counts)",
        "counts.max()",
        "sorted(counts)[0]",
      ],
      answer: 0,
    },
  ],
};
