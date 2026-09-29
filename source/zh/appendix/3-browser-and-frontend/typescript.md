# TypeScript 原则

::: 提示 前言
你已经会JavaScript，但你可能遇到过以下问题：
- 给变量分配错误类型，仅在运行时发现
- 错误拼写对象属性名称并花费大量调试时间
- 函数参数类型错误，导致频繁重写

TypeScript 是一个帮助你在代码运行前发现这些问题的工具。读完这篇文章后，你会明白为什么 TypeScript 提升了代码质量，如何阅读类型注释、接口、泛指和其他核心概念，以及如何更好地利用 AI 生成的代码进行 vibecoding。
:::

**这篇文章会教会你什么？**

|章节 |内容 |你将能做的事情 |
|---------|---------|---------------------------|
|**第1章** |什么是TypeScript |了解它与JavaScript的关系 |
|**第二章** |基础类型注释 |知道如何为变量注释类型 |
|**第3章** |对象类型与接口 |定义数据结构类型 |
|**第4章** |函数类型 |函数参数和返回值的注释类型 |
|**第5章** |通用代码 |编写可重用、类型安全代码 |
|**第6章** |类型推断与实用技巧 |知道何时需要显式注释 |

---

## 1.什么是TypeScript

::: 提示 🤔 核心问题
**JavaScript已经能用了——为什么还需要TypeScript？** 学一个额外的语法值得吗？
:::

### 1.1 从“运行时错误”到“编译时发现”

<div style=“display： flex; gap： 20px; margin： 20px 0;”>
<div style=“flex： 1;填充：16px;border： 1px 实心 #e4e7ed;border-radius： 12px;”>

** 🔴 JavaScript的痛点**
- 仅在运行时捕获的类型错误
- 拼写错误难以发现
- 重构容易出错
- IDE 提示不够准确

*像没有拼写检查的文档编辑器*

</div>
<div style=“flex： 1;填充：16px;border： 1px 实心 #e4e7ed;border-radius： 12px;”>

** ✅ TypeScript 的优势**
- 编写代码时发现的错误
- 更智能、更精准的IntelliSense
- 更安全的重构
- 简化代码维护

*就像带有拼写检查和语法高亮功能的编辑器*

</div>
</div>

**用一句话理解他们的关系：**

|技术 |类比 |角色 |
|------------|---------|------|
|**JavaScript** |原始材料 |可直接运行的代码 |
|**TypeScript** |蓝图质量检查 |将类型检查添加到JavaScript，然后编译为JavaScript |

### 1.2 Vibecoding的动机 需要TypeScript And

::: 警告 AI生成的代码也可能存在bug。
一位开发者利用人工智能生成了一个用户管理功能。AI编写的JavaScript代码运行了，但存在问题：用户年龄本应是数字，但有时却错误地被指定为字符串。

因此，当检查“用户是否为成年人”时，字符串“25”被当作字符串，导致检查失败。该漏洞隐藏了很长时间，直到用户输入非数字字符后才出现。

使用 TypeScript 时，这段代码在写入时会出错：`Type 'string' is not assignable to type 'number'`。

**这就是TypeScript的价值——当AI打错类型时，你可以立刻发现。**
:::

### 1.3 TypeScript 实际上长这样

TypeScript 并不是一门全新的语言;它只是 JavaScript 的一个“超集”：

```typescript
// This is valid JavaScript, and also valid TypeScript
const name = "Zhang San"
const age = 25
function greet(user) {
  return `Hello ${user}`
}

// This is TypeScript-specific type annotation
const name2: string = "Li Si"
const age2: number = 30
function greet2(user: string): string {
  return `Hello ${user}`
}
```

**关键要点：**
- 所有 JavaScript 代码都是有效的 TypeScript 代码
- TypeScript 添加了可选的 **类型注解**
- TypeScript 最终会编译为 JavaScript 来执行

::: info 💡 核心见解
TypeScript 不会改变代码的运行方式；它只是检查编译时的类型是否正确。**你可以逐步采用 TypeScript** — 从为关键变量添加类型开始。
:::

---

## 2. 基本类型注解

::: tip 🤔 核心问题
**如何告诉 TypeScript 一个变量应该是什么类型？** 类型注解的语法是什么？
:::

### 2.1 类型注解语法

类型注解只是简单地在变量名后添加 `: type`：

```typescript
// Syntax: variableName: type = value
const name: string = "Zhang San"
let age: number = 25
let isStudent: boolean = true
```

👇 **自己试一试**：给变量添加类型注解

<TypeAnnotationDemo />

::: details 🔍 为什么有些地方不需要类型注解？
TypeScript 可以根据赋值自动推断类型：

```typescript
// These don't need type annotations — TypeScript can infer them
const name = "Zhang San"      // inferred as string
const age = 25                // inferred as number
const isActive = true         // inferred as boolean

// These cases need explicit annotations
let data  // ❌ Error: cannot infer type
let data: any  // ✅ Works, but loses the benefit of type checking

function add(a, b) {  // ❌ Parameter types are unclear
  return a + b
}

function add2(a: number, b: number): number {  // ✅ Types are explicit
  return a + b
}
```::: 

### 2.2 基本类型

TypeScript 支持 JavaScript 的所有基本类型：

| 类型 | 描述 | 示例 |
|------|-------------|---------|
| `string` | 字符串 | `"hello"`, `'你好'` |
| `number` | 数字（整数和小数） | `42`, `3.14` |
| `boolean` | 布尔值 | `true`, `false` |
| `null` / `undefined` | 空值 | `null`, `undefined` |
| `array` | 数组 | `number[]`, `string[]` |
| `object` | 对象 | `{ name: string; age: number }` |

**编写数组类型的两种方式：**

```typescript
// Method 1: type[] (more common)
const numbers: number[] = [1, 2, 3, 4, 5]
const names: string[] = ["Zhang San", "Li Si", "Wang Wu"]

// Method 2: Array<type>
const numbers2: Array<number> = [1, 2, 3, 4, 5]
const names2: Array<string> = ["Zhang San", "Li Si", "Wang Wu"]
```

**特殊类型：**

```typescript
// any: any type (use sparingly — effectively disables type checking)
let data: any = 42
data = "now it can be a string"
data = { name: "Zhang San" }  // can also be an object

// unknown: type-safe any
let value: unknown = 42
// if (typeof value === "number") {
//   console.log(value + 10)  // must check type first before using
// }

// void: no return value
function log(message: string): void {
  console.log(message)
}

// never: never returns
function error(message: string): never {
  throw new Error(message)
}
```

::: 信息 💡 识别提示
- 查看 `: string` → 这是一个字符串类型注解
- 查看 `: number[]` → 这是一个数字数组注解
- 查看 `: void` → 这个函数没有返回值
:::

---

## 3. 对象类型和接口

::: 提示 🤔 核心问题
**如何定义对象的类型？** 对象的属性应该是什么类型？
:::

### 3.1 接口：定义对象的“形状”

接口是 TypeScript 中定义对象类型的主要方式:

```typescript
// Define a User interface
interface User {
  id: number
  name: string
  email: string
  age?: number  // optional property
}

// Use the interface
const user: User = {
  id: 1,
  name: "Zhang San",
  email: "zhangsan@example.com",
  age: 25
}

// age is optional, so it can be omitted
const user2: User = {
  id: 2,
  name: "Li Si",
  email: "lisi@example.com"
}
```

👇 **自己试一试**：创建符合接口定义的对象

<InterfaceDemo />

::: details 🔍 其他接口功能```typescript
// Readonly properties
interface User {
  readonly id: number  // id cannot be modified after creation
  name: string
}

const user: User = {
  id: 1,
  name: "Zhang San"
}

user.id = 2  // ❌ Error: cannot modify a readonly property
user.name = "Li Si"  // ✅ Can modify

// Function types
interface User {
  name: string
  greet: () => string  // greet is a function that returns string
}

const user: User = {
  name: "Zhang San",
  greet: () => "Hello"
}

// Interface inheritance
interface Admin extends User {
  permissions: string[]
}

const admin: Admin = {
  name: "Admin",
  greet: () => "Hello Admin",
  permissions: ["read", "write", "delete"]
}
```::: 

### 3.2 类型别名

除了接口之外，你还可以使用 `type` 来定义类型别名：

```typescript
// Type alias
type User = {
  id: number
  name: string
  email: string
}

// Union types
type Status = "pending" | "success" | "error"

const status: Status = "success"  // ✅
// const status2: Status = "failed"  // ❌ Error: not in the union type

// Intersection types (merge multiple types)
type User = {
  id: number
  name: string
}

type Timestamp = {
  createdAt: Date
  updatedAt: Date
}

type UserWithTimestamp = User & Timestamp

const user: UserWithTimestamp = {
  id: 1,
  name: "Zhang San",
  createdAt: new Date(),
  updatedAt: new Date()
}
```

**接口 vs 类型别名：**

| 特性 | interface | type |
|---------|-----------|------|
| 扩展 | `extends` | `&` 交叉 |
| 重复声明 | 自动合并 | 错误 |
| 使用场景 | 对象形状、类 | 联合类型、交叉类型、原始类型别名 |

::: info 💡 识别技巧
- 参见 `interface` → 定义对象类型
- 参见 `type` → 创建类型别名
- 参见 `?` → 可选属性
- 参见 `readonly` → 只读属性
:::

---

## 4. 函数类型

::: tip 🤔 核心问题
**如何为函数参数和返回值添加类型注解？**
:::

### 4.1 参数类型与返回类型

```typescript
// Complete function type annotation
function add(a: number, b: number): number {
  return a + b
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b
}

// No return value
function log(message: string): void {
  console.log(message)
}

// Returning multiple types (union type)
function parseInput(input: string): number | string {
  const num = parseFloat(input)
  return isNaN(num) ? input : num
}
```

### 4.2 可选参数和默认参数

```typescript
// Optional parameter (marked with ?)
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : name
}

greet("Zhang San")  // "Zhang San"
greet("Zhang San", "Mr.")  // "Mr. Zhang San"

// Default parameter
function greet2(name: string, title: string = "friend"): string {
  return `${title} ${name}`
}

greet2("Li Si")  // "friend Li Si"
greet2("Li Si", "Dr.")  // "Dr. Li Si"
```

### 4.3 将函数类型作为参数

```typescript
// Accepting a function as a parameter
function calculate(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b)
}

calculate(10, 5, (x, y) => x + y)  // 15
calculate(10, 5, (x, y) => x * y)  // 50

// Cleaner approach: define the function type first
type Operation = (x: number, y: number) => number

function calculate2(
  a: number,
  b: number,
  operation: Operation
): number {
  return operation(a, b)
}
```

::: info 💡 识别提示
- 见 `(a: number, b: number) => number` → 这是一个函数类型，描述参数和返回值
- 见 `: void` → 该函数没有返回值
- 见 `?` → 参数是可选的
:::

---

## 5. 泛型

::: tip 🤔 核心问题
**如何编写处理多种类型同时保持类型安全的代码？**
:::

### 5.1 泛型的基本概念

泛型允许你定义函数、接口或类而不提前指定具体类型 —— 你在使用时再指定类型:

```typescript
// Generic function: T is a type variable
function identity<T>(arg: T): T {
  return arg
}

// Explicitly specify the type at usage
const num1 = identity<number>(42)  // type is number
const str1 = identity<string>("hello")  // type is string

// Type inference: TypeScript can infer automatically
const num2 = identity(42)  // inferred as number
const str2 = identity("hello")  // inferred as string
```

👇 **自己试试**：使用泛型处理不同类型的数据

<GenericDemo />

### 5.2 泛型约束

限制泛型以满足特定条件：

```typescript
// Constrain T to have a length property
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length)
}

logLength("hello")  // ✅ strings have length
logLength([1, 2, 3])  // ✅ arrays have length
// logLength(42)  // ❌ numbers don't have a length property
```

### 5.3 泛型接口和类

```typescript
// Generic interface
interface Box<T> {
  value: T
  getValue(): T
}

const numberBox: Box<number> = {
  value: 42,
  getValue: () => 42
}

const stringBox: Box<string> = {
  value: "hello",
  getValue: () => "hello"
}

// Generic class
class Storage<T> {
  private items: T[] = []

  add(item: T): void {
    this.items.push(item)
  }

  get(index: number): T {
    return this.items[index]
  }
}

const numberStorage = new Storage<number>()
numberStorage.add(1)
numberStorage.add(2)
// numberStorage.add("string")  // ❌ Error

const stringStorage = new Storage<string>()
stringStorage.add("hello")
// stringStorage.add(1)  // ❌ Error
```

::: info 💡 识别提示
- 查看 `<T>` → 这是一个泛型类型变量
- 查看 `<T extends SomeType>` → 泛型约束
- 查看 `Array<T>` 或 `Promise<T>` → 内置泛型类型
:::

---

## 6. 类型推断和实用提示

::: tip 🤔 核心问题
**什么时候需要显式的类型注解？什么时候可以依赖推断？**
:::

### 6.1 类型推断

TypeScript 可以根据上下文自动推断类型：

```typescript
// Inference during variable initialization
const name = "Zhang San"  // inferred as string
const age = 25  // inferred as number
const isActive = true  // inferred as boolean

// Array inference
const numbers = [1, 2, 3]  // inferred as number[]
const mixed = [1, "hello", true]  // inferred as (number | string | boolean)[]

// Function return value inference
function add(a: number, b: number) {
  return a + b  // return value inferred as number
}
```

👇 **自己试试**：观察 TypeScript 如何推断类型

<TypeInferenceDemo />

### 6.2 何时使用显式类型注解

::: details 建议使用类型推断的场景```typescript
// ✅ Recommended: simple literal assignments
const count = 0
const name = "Zhang San"
const isActive = true

// ✅ Recommended: function return values that can be inferred
function getUserId(user: User) {
  return user.id  // inferred as number
}
```::: 

::: 详细信息 建议使用显式注解的场景```typescript
// ✅ Recommended: function parameters (required)
function add(a: number, b: number) {
  return a + b
}

// ✅ Recommended: object property types are unclear
const user: {
  id: number
  name: string
  metadata: Record<string, any>
} = {
  id: 1,
  name: "Zhang San",
  metadata: {}  // might be inferred as {}, needs explicit specification
}

// ✅ Recommended: complex function return types
function getUser(): User | null {
  // ...
  return null
}

// ✅ Recommended: public APIs
export function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0)
}
```::: 

### 6.3 类型保护

在运行时检查类型：

```typescript
// typeof type guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase())
  } else {
    // TypeScript knows value is number here
    console.log(value * 2)
  }
}

// instanceof type guard
class Dog {
  bark() {
    console.log("Woof")
  }
}

class Cat {
  meow() {
    console.log("Meow")
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark()  // TypeScript knows this is Dog
  } else {
    animal.meow()  // TypeScript knows this is Cat
  }
}

// Custom type guard
interface User {
  name: string
  email: string
}

function isUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string" &&
    typeof value.email === "string"
  )
}

function processValue(value: unknown) {
  if (isUser(value)) {
    // value is User here
    console.log(value.name)
  }
}
```

### 6.4 实用类型

TypeScript 提供了一些内置的实用类型：

```typescript
// Partial: make all properties optional
interface User {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>
// Equivalent to: { id?: number; name?: string; email?: string }

// Required: make all properties required
type RequiredUser = Required<PartialUser>
// Equivalent to: { id: number; name: string; email: string }

// Pick: keep only specified properties
type UserBasicInfo = Pick<User, "id" | "name">
// Equivalent to: { id: number; name: string }

// Omit: exclude specified properties
type UserWithoutEmail = Omit<User, "email">
// Equivalent to: { id: number; name: string }

// Record: create an object type
type UserRoles = Record<string, boolean>
// Equivalent to: { [key: string]: boolean }
```

---

## 7. 实用技巧：在Vibecoding中使用TypeScript

::: tip 🤔 核心问题
**如何在AI辅助开发中更好地利用TypeScript？**
:::

### 7.1 让AI生成类型安全的代码

**❌ 不良提示：**```
Write a user management feature for me
```

**✅ 好的提示:**```
Write a user management feature for me, using TypeScript.

The data structure is defined as follows:
interface User {
  id: number
  name: string
  email: string
  age: number
}

I need to implement:
1. Get user list: returns User[]
2. Create user: accepts Partial<User>, returns User
3. Update user: accepts id and Partial<User>, returns User
4. Delete user: accepts id, returns void

Please ensure all functions have complete type annotations.
```

### 7.2 理解 TypeScript 错误信息

**常见错误及其含义：**

| 错误信息 | 含义 | 解决方案 |
|----------|------|----------|
| `Type 'X' is not assignable to type 'Y'` | 类型 X 不能赋值给类型 Y | 检查类型是否匹配，或进行类型转换 |
| `Property 'X' does not exist on type 'Y'` | 类型 Y 上不存在属性 X | 检查属性名称拼写，或定义该属性 |
| `Argument of type 'X' is not assignable to parameter of type 'Y'` | 参数类型不匹配 | 调用函数时检查参数类型 |
| `Type 'X' is missing the following properties from type 'Y'` | 类型 X 缺少类型 Y 的某些属性 | 添加缺失的属性 |

### 7.3 逐步采用 TypeScript

如果你有一个 JavaScript 项目，可以逐步迁移到 TypeScript：

1. **步骤 1：将文件重命名为 `.ts`**```bash
   # From utils.js to utils.ts
   mv utils.js utils.ts
   ```

2. **步骤 2：修复明显的类型错误**```typescript
   // If you get: Parameter 'a' implicitly has an 'any' type
   // Add type annotations
   function add(a: number, b: number) {
     return a + b
   }
   ```

3. **步骤 3：逐步添加类型定义**```typescript
   // First use any for a quick fix
   function processUser(user: any) {
     // ...
   }

   // Later refine the types
   interface User {
     id: number
     name: string
   }

   function processUser(user: User) {
     // ...
   }
   ```

4. **第4步：启用更严格的类型检查**```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,  // Enable strict mode
       "noImplicitAny": true,  // Disallow implicit any
       "strictNullChecks": true  // Strict null checks
     }
   }
   ```

---

## 8. 你现在应该能够识别的内容

- 看 `: string` → 这是一个字符串类型注解
- 看 `: number[]` → 这是一个数字数组注解
- 看 `interface User` → 这定义了一个对象类型
- 看 `type User =` → 这是一个类型别名
- 看 `<T>` → 这是一个泛型
- 看 `extends` → 接口继承或泛型约束
- 看 `?` → 可选属性
- 看 `readonly` → 只读属性
- 看 `|` → 联合类型
- 看 `&` → 交叉类型

**如果你仔细阅读了每章的“深入探索”部分，你还掌握了这些核心概念：**

- **类型注解**：明确定义 TypeScript 变量的类型
- **接口**：定义对象的结构和类型
- **泛型**：编写可复用的类型安全代码
- **类型推断**：TypeScript 自动推断类型
- **类型保护**：在运行时检查类型
- **实用类型**：Partial、Required、Pick、Omit 等

::: info 💡 当你遇到问题时，可以向 AI 这样提问：
- “我应该如何为这个函数写类型注解？参数是 X，返回值是 Y”
- “帮我定义一个描述这个数据结构的接口：...”
- “这个 TypeScript 错误是什么意思？我该如何修复？”
- “我如何为这个泛型函数添加约束，以确保 T 必须具有某个属性？”
:::