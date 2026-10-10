/**
 * The playground's starters, roughly in the order the Python and ML tracks
 * teach them. Each one has to run cleanly on the pinned Pyodide and say
 * something a student can check by eye.
 */
export interface Example {
  id: string;
  title: string;
  /** What Koda says when this starter is loaded. */
  koda: string;
  code: string;
}

export const EXAMPLES: readonly Example[] = [
  {
    id: "hello",
    title: "Hello",
    koda: "Change the name, then press Run. Every line of this program is yours to edit.",
    code: `# Your first program. Press Run, or Ctrl/Cmd + Enter.
name = "Koda"
print(f"Hello, {name}!")
print("This Python is running inside your browser.")
`,
  },
  {
    id: "loops",
    title: "Loops",
    koda: "Try changing range(1, 6) to range(1, 11) and predict the output before you run it.",
    code: `for n in range(1, 6):
    print(n, "squared is", n * n)

count = 3
while count > 0:
    print("Countdown:", count)
    count -= 1
print("Lift off!")
`,
  },
  {
    id: "functions",
    title: "Functions",
    koda: "A function is a recipe you can reuse. Add your own scores to the list and run it again.",
    code: `def greet(name, excited=False):
    ending = "!" if excited else "."
    return f"Hi, {name}{ending}"


def average(numbers):
    return sum(numbers) / len(numbers)


print(greet("Ada"))
print(greet("Grace", excited=True))
print("Average score:", average([82, 91, 77, 88]))
`,
  },
  {
    id: "collections",
    title: "Lists and dictionaries",
    koda: "Lists keep things in order; dictionaries look things up by name. Add a fruit to both.",
    code: `fruits = ["apple", "banana", "cherry"]
fruits.append("mango")
print(fruits, "has", len(fruits), "items")

prices = {"apple": 0.50, "banana": 0.25, "cherry": 3.00}
prices["mango"] = 1.20
for fruit, price in prices.items():
    print(f"{fruit:<8} \${price:.2f}")

cheapest = min(prices, key=prices.get)
print("Cheapest:", cheapest)
`,
  },
  {
    id: "numpy",
    title: "NumPy arrays",
    koda: "NumPy does maths on a whole array at once. The first run downloads it, so give it a moment.",
    code: `import numpy as np

scores = np.array([72, 85, 90, 66, 95, 78])
print("Scores:", scores)
print("Mean:", scores.mean())
print("Highest:", scores.max())
print("Everyone +5:", scores + 5)
print("Passed (>= 75):", scores[scores >= 75])

grid = np.arange(12).reshape(3, 4)
print(grid)
print("Shape:", grid.shape)
`,
  },
  {
    id: "pandas",
    title: "Pandas table",
    koda: "A DataFrame is a spreadsheet you drive with code. Try sorting by hours instead of score.",
    code: `import pandas as pd

df = pd.DataFrame({
    "student": ["Ava", "Ben", "Chen", "Dara", "Eli"],
    "hours": [2, 5, 1, 4, 3],
    "score": [68, 92, 55, 85, 77],
})
print(df)
print()
print("Average score:", df["score"].mean())
print()
print("Top three:")
print(df.sort_values("score", ascending=False).head(3))
print()
print("Does studying more help? Correlation:", round(df["hours"].corr(df["score"]), 2))
`,
  },
  {
    id: "sklearn",
    title: "Train a tiny classifier",
    koda: "This trains a real model on 150 iris flowers. scikit-learn is big, so the first run takes a little while.",
    code: `from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.3, random_state=42
)

model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

accuracy = accuracy_score(y_test, model.predict(X_test))
print(f"Trained on {len(X_train)} flowers, tested on {len(X_test)} it never saw.")
print(f"Accuracy on the unseen flowers: {accuracy:.0%}")

# sepal length, sepal width, petal length, petal width (cm)
flower = [[5.1, 3.5, 1.4, 0.2]]
print("This flower is probably a", iris.target_names[model.predict(flower)[0]])
`,
  },
  {
    id: "matplotlib",
    title: "Plot a line",
    koda: "Your chart appears under the output. Change the numbers and run it again to redraw it.",
    code: `import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
students = [120, 180, 260, 410, 520, 700]

plt.figure(figsize=(6, 3.5))
plt.plot(months, students, marker="o", color="#3e7f5c", linewidth=2)
plt.title("Students learning to code")
plt.ylabel("Students")
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()
`,
  },
];

export const DEFAULT_EXAMPLE = EXAMPLES[0];

export function exampleById(id: string | null | undefined) {
  return EXAMPLES.find((example) => example.id === id) ?? null;
}
