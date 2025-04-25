# Ruby Fundamentals

### **Object:**

In Ruby, ***everything*** is an object—from integers and strings to classes and even nil. This object model makes the language highly *consistent* and *expressive*. Meaning that the rules don’t change depending on the data type. You don’t have to remember different syntax for primitives like Java. Since every value is a an object, every value responds to methods, this allows for clean, readable code and powerful abstractions. It is expressive in the sense that you can say a lot with a little code—and it reads like natural language.

Ruby is *consistent* because the object model is uniform and predictable, and it’s *expressive* because it’s designed to read like human language. These traits together make it a joy to use and help developers write clean, maintainable code.

For example, you can call methods like `.times` on an integer or chain methods fluently on collections. 

It also means metaprogramming is more accessible—classes themselves are objects, so you can dynamically define behavior, which is incredibly useful when building DSLs or reusable modules. I appreciate how this design choice reduces surprises in the language and empowers developers to write concise, elegant code.

### **Metaprogramming:**

Metaprogramming is the ability to write code that writes or changes other code at runtime. Ruby supports it because everything is an object—including classes and methods. It enables powerful abstractions like `attr_accessor` and DSLs like Rails routes, but can hurt readability and debuggability when overused.

**ORM** = "Object-Relational Mapping"

It’s the concept of mapping database tables to Ruby classes and rows to Ruby objects.

**Metaprogramming** = *how* ActiveRecord does this.

The ORM *uses metaprogramming* under the hood to make those dynamic field accessors work.

### **Blocks, Procs, and Lambdas:**

**Blocks** are the code passed to an invoked method like .each or .times

```jsx
3.times { puts "Hi!" }
```

In here the block is the contents of the curly braces.

Ruby methods like `.each`, `.times`, and `.map` are built to **accept a block** — meaning they know what to do with that code you pass in.

Another example:

```jsx
[1, 2, 3].each do |num|
  puts num * 2
end
```

Here the block is everything including the `do` to the `end` .

Blocks are not objects by default — but you can turn them into objects using `Proc` or `lambda`.

---

**Proc** vs **Lambda**

Both wrap blocks into callable objects, but they behave differently:

| Feature | `Proc` | `lambda` |
| --- | --- | --- |
| Return behavior | Returns from the **calling method** | Returns from the **lambda itself** |
| Arity (arg checking) | **Flexible** (extra args = nil) | **Strict** (raises error on mismatch) |
| Use case | Looser callbacks | Reusable, strict anonymous methods |

### Syntactic Sugar

in Ruby (and programming in general) refers to **syntax that's designed to make code easier to read or write**, without changing what the code actually *does* under the hood.

Basic Example: Instead of writing long methods like 

```jsx
def name
  @name
end
```

you can just write: `attr_accessor :name` 

Main thing to remember is that it doesn’t add new functionality, it just makes things easier to read.