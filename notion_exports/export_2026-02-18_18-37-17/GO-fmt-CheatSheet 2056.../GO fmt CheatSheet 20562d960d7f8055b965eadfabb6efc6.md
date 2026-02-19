# GO fmt CheatSheet

### 🧰 **The Default Swiss Army Knife**

- **`%v`** – "Whatever, just show it."
    - Use this when you don’t know what you’re doing yet (so... always.. for now!).
    - `fmt.Printf("%v\n", thing)`
- **`%+v`** – Like `%v` but spills the names of struct fields. Great for debugging when your code ghosts you.

---

### 🧠 **Debugging Power Tools**

- **`%T`** – Tells you the type. Because sometimes you think you’re holding a string and it’s actually your regret.
    - `fmt.Printf("%T\n", thing)`
- **`%#v`** – The Go-syntax version. It's like `%v` put on nerd glasses.
    - `fmt.Printf("%#v\n", thing)`

---

### 📜 **Strings**

- **`%s`** – Standard string output. Just... print the word!
    - `fmt.Printf("Hello %s\n", "there")`
- **`%q`** – Puts quotes around the string. “So formal.”
    - `fmt.Printf("%q\n", "hello") // "hello"`

---

### 🔢 **Integers**

- **`%d`** – Normal decimal integer.
    - `fmt.Printf("%d\n", 42)`
- **`%x`** – Hexadecimal. For when you want to feel like a hacker.
    - `fmt.Printf("%x\n", 255) // ff`

---

### 🔍 **Booleans**

- **`%t`** – `true` or `false`.
    - `fmt.Printf("%t\n", false)`

---

### 🔬 **Floats**

- **`%f`** – Regular decimal float.
    - `fmt.Printf("%.2f\n", 3.14159) // 3.14`
- **`%g`** – Smart float. Decides between `f` and `e`, depending on which one looks cooler. (scientific notation)
    - `fmt.Printf("%g\n", 0.000001) // 1e-06`

---

### 🧠 **Bonus Bits**

- **`%p`** – Memory address. Useful if you're a compiler, or want to pretend you are.
- **`%c`** – Character (from number). For when 65 needs to be “A”. Unicode character that corresponds to the number.

---

### ✨ **Useful Flags**

- `%.2f` → 2 decimal places.
- `%8s` → Pad left to 8 spaces.
- `%-8s` → Pad right to 8 spaces.
- `%04d` → Pad with zeros (e.g., `0025`)
- `%+d` → Always show sign (`+25`)
- `%#x` → Hex with a little `0x` party hat.