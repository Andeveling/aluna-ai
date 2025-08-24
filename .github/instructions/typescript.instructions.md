---
description: 'TypeScript development standards and best practices based on Matt Pocock teachings from Total TypeScript'
applyTo: '**/*.tsx, **/*.ts, **/*.jsx, **/*.js'
---

# TypeScript Instructions - Best Practices by Matt Pocock

*A comprehensive guide based on the teachings of Total TypeScript and Matt Pocock's best advice. These instructions are automatically loaded on demand when working with TypeScript/JavaScript files to ensure code quality, type safety, and maintainability.*

## 🎯 Key Principles for AI Models

**When generating TypeScript/JavaScript code, prioritize:**

1. **Type Safety First**: Use strict TypeScript configuration and avoid `any` at all costs
2. **Branded Types**: Create unique types for domain-specific primitives (UserId, ProductId, etc.)
3. **Discriminated Unions**: Use tagged unions instead of optional properties for state management
4. **Unknown over Any**: Prefer `unknown` for uncertain types and use type guards for narrowing
5. **Composition over Inheritance**: Use intersection types and composition patterns
6. **Template Literal Types**: Leverage TypeScript's string manipulation for type-safe APIs
7. **Assertion Functions**: Use type predicates and assertion functions for runtime validation

## 📚 Table of Contents

1. [Essential Fundamentals](#essential-fundamentals)
2. [The 4 Essential Patterns](#the-4-essential-patterns)
3. [General Best Practices](#general-best-practices)
4. [Advanced Techniques](#advanced-techniques)
5. [TypeScript with React](#typescript-with-react)
6. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
7. [Tools and Configuration](#tools-and-configuration)

---

## 🚀 Quick Reference for AI Code Generation

**When generating TypeScript code, follow these patterns:**

### ✅ DO - Preferred Patterns

```typescript
// Branded types for domain modeling
type UserId = string & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

// Discriminated unions for state
type ApiState = 
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string };

// Type guards and assertion functions
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}

// Strict function signatures
function fetchUser(id: UserId): Promise<ApiState> {
  // Implementation
}

// Template literal types for APIs
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = `/api/${string}`;
type ApiRoute = `${HttpMethod} ${ApiEndpoint}`;
```

### ❌ DON'T - Avoid These Patterns

```typescript
// Don't use any
function processData(data: any) { return data.whatever; }

// Don't use ambiguous object shapes
interface Response {
  success: boolean;
  data?: any;
  error?: string;
}

// Don't ignore null/undefined
function getUser(user: User) {
  return user.name.toUpperCase(); // Could fail
}

// Don't use Object as type
function handle(data: object) { }
```

---

## 🎯 Essential Fundamentals

### 1. Strict Mode Configuration

```json
// tsconfig.json - Recommended configuration
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true
  }
}
```

### 2. Avoid `any` at all costs

```typescript
// ❌ Bad
function processData(data: any) {
  return data.whatever;
}

// ✅ Good - Use unknown and type guards
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    // Type narrowing here
    return data;
  }
  throw new Error('Invalid data');
}
```

### 3. Use `unknown` instead of `any`

```typescript
// ✅ Prefer unknown for unknown values
function parseJson(json: string): unknown {
  return JSON.parse(json);
}

// Then use type guards to check
const result = parseJson('{"name": "John"}');
if (typeof result === 'object' && result !== null && 'name' in result) {
  console.log((result as { name: string }).name);
}
```

---

## 🔧 The 4 Essential Patterns

*According to Matt Pocock, these are the most important patterns every TypeScript developer should master.*

### 1. Branded Types

```typescript
// Create unique types for primitive values
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

// Helper functions to create branded types
const createUserId = (id: string): UserId => id as UserId;
const createProductId = (id: string): ProductId => id as ProductId;

// Now these are incompatible types
function getUser(id: UserId) { /* ... */ }
function getProduct(id: ProductId) { /* ... */ }

const userId = createUserId("user123");
const productId = createProductId("prod456");

getUser(userId); // ✅ OK
getUser(productId); // ❌ Type error
```

### 2. Global Types & Module Augmentation

```typescript
// global.d.ts - Define global types
declare global {
  interface Window {
    myCustomProperty: string;
  }
  
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      API_KEY: string;
    }
  }
}

// For external modules
declare module 'some-library' {
  export interface Config {
    newProperty: string;
  }
}
```

### 3. Assertion Functions & Type Predicates

```typescript
// Type Predicate
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Assertion Function
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected string');
  }
}

// Usage
function processValue(value: unknown) {
  if (isString(value)) {
    // value is string here
    console.log(value.toUpperCase());
  }
  
  assertIsString(value);
  // value is definitely string after this line
  console.log(value.toLowerCase());
}
```

### 4. Classes with TypeScript

```typescript
// Class with readonly and private properties
class User {
  readonly id: string;
  private _email: string;
  
  constructor(id: string, email: string) {
    this.id = id;
    this._email = email;
  }
  
  get email(): string {
    return this._email;
  }
  
  // Method overloading
  updateEmail(email: string): void;
  updateEmail(email: string, notify: boolean): void;
  updateEmail(email: string, notify?: boolean): void {
    this._email = email;
    if (notify) {
      this.sendNotification();
    }
  }
  
  private sendNotification(): void {
    // Implementation
  }
}
```

---

## ⭐ General Best Practices

### 1. Type Composition

```typescript
// Use intersection to combine types
type BaseUser = {
  id: string;
  name: string;
};

type AdminUser = BaseUser & {
  role: 'admin';
  permissions: string[];
};

type RegularUser = BaseUser & {
  role: 'user';
  subscriptionLevel: 'free' | 'premium';
};

type User = AdminUser | RegularUser;
```

### 2. Template Literal Types

```typescript
// Create dynamic types with template literals
type Theme = 'dark' | 'light';
type Color = 'primary' | 'secondary';
type Variant = `${Theme}-${Color}`;
// Result: 'dark-primary' | 'dark-secondary' | 'light-primary' | 'light-secondary'

// For REST APIs
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `/api/users` | `/api/products`;
type APIRoute = `${HTTPMethod} ${Endpoint}`;
```

### 3. Conditional Types

```typescript
// Conditional types for complex logic
type NonNullable<T> = T extends null | undefined ? never : T;

type ApiResponse<T> = T extends string 
  ? { message: T } 
  : T extends number 
  ? { count: T } 
  : { data: T };

// Usage
type StringResponse = ApiResponse<string>; // { message: string }
type NumberResponse = ApiResponse<number>; // { count: number }
type ObjectResponse = ApiResponse<User>; // { data: User }
```

### 4. Mapped Types

```typescript
// Create variations of existing types
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Custom mapped types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type User = {
  name: string;
  age: number;
};

type UserGetters = Getters<User>;
// Result: { getName: () => string; getAge: () => number; }
```

---

## 🚀 Advanced Techniques

### 1. Distributive Conditional Types

```typescript
// Conditional types are distributive over union types
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>;
// Result: string[] | number[] (not (string | number)[])
```

### 2. infer Keyword

```typescript
// Extract types from other types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Custom infer examples
type FirstElement<T> = T extends readonly [infer F, ...any[]] ? F : never;
type LastElement<T> = T extends readonly [...any[], infer L] ? L : never;

type First = FirstElement<[1, 2, 3]>; // 1
type Last = LastElement<[1, 2, 3]>; // 3
```

### 3. Recursive Types

```typescript
// Recursive types for nested structures
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type NestedObject = {
  user: {
    profile: {
      name: string;
      settings: {
        theme: string;
      };
    };
  };
};

type PartialNested = DeepPartial<NestedObject>;
// All fields are optional, even nested ones
```

### 4. Key Remapping

```typescript
// Transform object keys
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type Props = {
  name: string;
  age: number;
};

type Handlers = EventHandlers<Props>;
// Result: { onName: (value: string) => void; onAge: (value: number) => void; }
```

---

## ⚛️ TypeScript with React

### 1. Functional Components

```typescript
import { ReactNode, ComponentProps } from 'react';

// Props with children
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ variant, children, onClick }: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Extend HTML element props
interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
```

### 2. Typed Hooks

```typescript
import { useState, useEffect, useCallback, useMemo } from 'react';

// Custom hook with types
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Hook usage
interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile = ({ userId }: { userId: number }) => {
  const { data: user, loading, error } = useApi<User>(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;
  
  return <div>{user.name}</div>;
};
```

### 3. Refs and ForwardRef

```typescript
import { forwardRef, useImperativeHandle, useRef } from 'react';

// Imperative ref
interface InputRef {
  focus: () => void;
  getValue: () => string;
}

interface InputProps {
  defaultValue?: string;
}

const Input = forwardRef<InputRef, InputProps>(({ defaultValue }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    getValue: () => inputRef.current?.value || '',
  }));

  return <input ref={inputRef} defaultValue={defaultValue} />;
});

// Usage
const ParentComponent = () => {
  const inputRef = useRef<InputRef>(null);

  const handleClick = () => {
    inputRef.current?.focus();
    console.log(inputRef.current?.getValue());
  };

  return (
    <div>
      <Input ref={inputRef} defaultValue="Hello" />
      <button onClick={handleClick}>Focus and Log</button>
    </div>
  );
};
```

---

## ❌ Common Mistakes to Avoid

### 1. Overuse of Interfaces vs Types

```typescript
// ✅ Use type for unions and computations
type Status = 'loading' | 'success' | 'error';
type UserWithStatus = User & { status: Status };

// ✅ Use interface for objects that can be extended
interface BaseConfig {
  apiUrl: string;
}

interface AppConfig extends BaseConfig {
  debugMode: boolean;
}
```

### 2. Not Using Discriminated Unions

```typescript
// ❌ Bad - ambiguous
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// ✅ Good - discriminated union
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

function handleResponse<T>(response: ApiResponse<T>) {
  if (response.success) {
    // TypeScript knows data exists here
    console.log(response.data);
  } else {
    // TypeScript knows error exists here
    console.error(response.error);
  }
}
```

### 3. Ignoring Null/Undefined

```typescript
// ❌ Bad
function processUser(user: User) {
  return user.name.toUpperCase(); // May fail if name is undefined
}

// ✅ Good
function processUser(user: User) {
  return user.name?.toUpperCase() ?? 'Unknown';
}

// Or with assertion if you're sure
function processUser(user: User) {
  if (!user.name) {
    throw new Error('User name is required');
  }
  return user.name.toUpperCase();
}
```

### 4. Using Object as a Type

```typescript
// ❌ Bad
function processData(data: object) {
  // You can't access properties
}

// ✅ Good - use Record or define the shape
function processData(data: Record<string, unknown>) {
  // Now you can access properties
}

// Or even better, define the exact type
interface DataShape {
  id: string;
  value: number;
}

function processData(data: DataShape) {
  console.log(data.id, data.value);
}
```

---

## 🛠️ Tools and Configuration

### 1. ESLint with TypeScript

```json
// .eslintrc.json
{
  "extends": [
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error"
  }
}
```

### 2. Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 3. VS Code Settings

```json
// .vscode/settings.json
{
  "typescript.preferences.preferTypeOnlyAutoImports": true,
  "typescript.suggest.autoImports": true,
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  }
}
```

### 4. Advanced tsconfig.json Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 📝 Final Tips from Matt Pocock

**When AI models load these instructions on demand, they should:**

1. **Think in terms of type transformations**: Many problems in TypeScript boil down to transforming one type into another.

2. **Use the TypeScript Playground**: It's your best friend for experimenting and understanding complex behaviors.

3. **Read TypeScript errors carefully**: Errors are often very descriptive and guide you toward the solution.

4. **Don't fight TypeScript**: If something is hard to type, there's probably a simpler way to structure your code.

5. **Practice regularly**: Mastery in TypeScript comes with constant practice and solving real problems.

6. **Stay up to date**: TypeScript evolves quickly, keep up with new features and best practices.

**AI Model Guidelines:**
- Apply these patterns when generating TypeScript/JavaScript code
- Prioritize type safety over convenience
- Use branded types for domain modeling
- Prefer unknown over any
- Always enable strict mode in generated configurations
- Focus on maintainable and readable code structures

---

## 🔗 Additional Resources

- [Total TypeScript Course](https://www.totaltypescript.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Matt Pocock's Twitter](https://twitter.com/mattpocockuk) for daily tips
- [TypeScript Playground](https://www.typescriptlang.org/play) for experimenting

---

*This guide is based on the teachings of Matt Pocock and the Total TypeScript methodology. Remember, practice makes perfect in TypeScript.*