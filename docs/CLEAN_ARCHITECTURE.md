# Arquitectura Limpia en Next.js - Guía para Aluna AI

## 📋 Índice
1. [Introducción a Clean Architecture](#introducción-a-clean-architecture)
2. [Principios Fundamentales](#principios-fundamentales)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Explicación de las Capas](#explicación-de-las-capas)
5. [Implementación Paso a Paso](#implementación-paso-a-paso)
6. [Patrones de Dependencias](#patrones-de-dependencias)
7. [Casos de Uso de Ejemplo](#casos-de-uso-de-ejemplo)
8. [Testing](#testing)
9. [Mejores Prácticas](#mejores-prácticas)

## 🏗️ Introducción a Clean Architecture

Clean Architecture es un conjunto de reglas que nos ayudan a estructurar aplicaciones de manera que sean:

- **Independientes de UI**: La lógica de negocio no está acoplada al framework UI
- **Independientes de la Base de Datos**: Las operaciones de DB están aisladas en su propia capa
- **Independientes de Frameworks**: La lógica de negocio no conoce nada del mundo exterior
- **Testeable**: La lógica de negocio se puede probar fácilmente sin dependencias externas

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    Frameworks & Drivers                     │
│              (Next.js, React, Server Actions)               │
└─────────────────────────┬───────────────────────────────────┘
                         │
┌─────────────────────────┴───────────────────────────────────┐
│                   Interface Adapters                       │
│                     (Controllers)                          │
└─────────────────────────┬───────────────────────────────────┘
                         │
┌─────────────────────────┴───────────────────────────────────┐
│                     Application                            │
│              (Use Cases, Interfaces)                       │
└─────────────────────────┬───────────────────────────────────┘
                         │
┌─────────────────────────┴───────────────────────────────────┐
│                      Entities                              │
│                  (Models, Errors)                          │
└─────────────────────────────────────────────────────────────┘
                         ▲
┌─────────────────────────┴───────────────────────────────────┐
│                   Infrastructure                           │
│              (Repositories, Services)                      │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Principios Fundamentales

### 1. Regla de Dependencia
Las capas solo pueden depender de capas **inferiores**, nunca de capas superiores.

### 2. Principio de Inversión de Dependencias
- Las interfaces se definen en la capa `application`
- Las implementaciones se definen en la capa `infrastructure`
- Se usa inyección de dependencias para conectarlas

### 3. Separación de Responsabilidades
Cada capa tiene una responsabilidad específica y bien definida.

## 📁 Estructura del Proyecto

```
proyecto/
├── app/                          # Frameworks & Drivers Layer
│   ├── components/               # Componentes React
│   ├── actions.ts               # Server Actions
│   ├── page.tsx                 # Páginas Next.js
│   └── layout.tsx              # Layout principal
├── src/                         # El "núcleo" del sistema
│   ├── application/             # Application Layer
│   │   ├── use-cases/          # Casos de uso
│   │   ├── repositories/       # Interfaces de repositorios
│   │   └── services/           # Interfaces de servicios
│   ├── entities/               # Entities Layer
│   │   ├── models/            # Modelos de dominio
│   │   └── errors/            # Errores personalizados
│   ├── infrastructure/         # Infrastructure Layer
│   │   ├── repositories/      # Implementaciones de repositorios
│   │   └── services/          # Implementaciones de servicios
│   └── interface-adapters/     # Interface Adapters Layer
│       └── controllers/       # Controladores
├── di/                         # Dependency Injection
│   ├── container.ts           # Contenedor de DI
│   ├── types.ts              # Símbolos y tipos
│   └── modules/              # Módulos de DI
└── tests/                     # Tests que siguen la estructura de src/
```

## 🏛️ Explicación de las Capas

### 1. Frameworks & Drivers (app/)
**Propósito**: Contiene todo lo relacionado con Next.js y la interfaz de usuario.

**Responsabilidades**:
- Componentes React (Server y Client)
- Server Actions
- Páginas y rutas
- Sistema de diseño/UI

**Restricciones**:
- Solo puede usar Controllers, Models y Errors
- NO puede usar Use Cases, Repositories o Services directamente

### 2. Interface Adapters (src/interface-adapters/)
**Propósito**: Define los controladores que sirven como punto de entrada al sistema.

**Responsabilidades**:
- Validación de entrada (input validation)
- Verificación de autenticación
- Orquestación de Use Cases
- Formateo de respuestas (Presenters)

**Ejemplo de Controlador**:
```typescript
// src/interface-adapters/controllers/todos/create-todo.controller.ts
export const createTodoController =
  (
    instrumentationService: IInstrumentationService,
    authenticationService: IAuthenticationService,
    transactionManagerService: ITransactionManagerService,
    createTodoUseCase: ICreateTodoUseCase
  ) =>
  async (
    input: Partial<{ todo: string }>,
    sessionId: string | undefined
  ): Promise<Todo[]> => {
    // 1. Verificar autenticación
    if (!sessionId) {
      throw new UnauthenticatedError('Must be logged in');
    }
    
    // 2. Validar sesión
    const { user } = await authenticationService.validateSession(sessionId);
    
    // 3. Validar entrada
    const { data, error } = inputSchema.safeParse(input);
    if (error) {
      throw new InputParseError('Invalid data');
    }
    
    // 4. Ejecutar caso de uso
    const todos = await createTodoUseCase(data, user.id);
    
    // 5. Formatear respuesta
    return presenter(todos);
  };
```

### 3. Application (src/application/)
**Propósito**: Contiene la lógica de negocio y define las interfaces.

#### Use Cases
**Características**:
- Representan operaciones individuales del negocio
- Reciben entrada pre-validada de los controladores
- Manejan verificaciones de autorización
- NO deben usar otros use cases

**Ejemplo de Use Case**:
```typescript
// src/application/use-cases/todos/create-todo.use-case.ts
export const createTodoUseCase =
  (
    instrumentationService: IInstrumentationService,
    todosRepository: ITodosRepository
  ) =>
  async (
    input: { todo: string },
    userId: string,
    tx?: Transaction
  ): Promise<Todo> => {
    // Lógica de negocio
    if (input.todo.length < 4) {
      throw new InputParseError('Todo must be at least 4 chars');
    }

    // Crear el todo
    return await todosRepository.createTodo({
      todo: input.todo,
      userId,
      completed: false,
    }, tx);
  };
```

#### Interfaces
**Propósito**: Definir contratos para repositorios y servicios.

```typescript
// src/application/repositories/todos.repository.interface.ts
export interface ITodosRepository {
  createTodo(todo: TodoInsert, tx?: Transaction): Promise<Todo>;
  getTodo(id: number): Promise<Todo | undefined>;
  getTodosForUser(userId: string): Promise<Todo[]>;
  updateTodo(id: number, input: Partial<TodoInsert>, tx?: Transaction): Promise<Todo>;
  deleteTodo(id: number, tx?: Transaction): Promise<void>;
}
```

### 4. Entities (src/entities/)
**Propósito**: Define los modelos de dominio y errores personalizados.

#### Models
```typescript
// src/entities/models/todo.ts
import { z } from 'zod';

export const selectTodoSchema = z.object({
  id: z.number(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.string(),
});

export type Todo = z.infer<typeof selectTodoSchema>;

export const insertTodoSchema = selectTodoSchema.pick({
  todo: true,
  userId: true,
  completed: true,
});

export type TodoInsert = z.infer<typeof insertTodoSchema>;
```

#### Errors
```typescript
// src/entities/errors/auth.ts
export class UnauthenticatedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthenticatedError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
```

### 5. Infrastructure (src/infrastructure/)
**Propósito**: Implementa las interfaces definidas en la capa Application.

#### Repositories
```typescript
// src/infrastructure/repositories/todos.repository.ts
export class TodosRepository implements ITodosRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashReporterService
  ) {}

  async createTodo(todo: TodoInsert, tx?: Transaction): Promise<Todo> {
    const invoker = tx ?? db;
    
    const query = invoker.insert(todos).values(todo).returning();
    const [created] = await query.execute();
    
    if (created) {
      return created;
    } else {
      throw new DatabaseOperationError('Cannot create todo');
    }
  }

  // ... otros métodos
}
```

#### Services
```typescript
// src/infrastructure/services/authentication.service.ts
export class AuthenticationService implements IAuthenticationService {
  async validateSession(sessionId: string): Promise<{ user: User; session: Session }> {
    return await this._lucia.validateSession(sessionId);
  }

  async createSession(user: User): Promise<{ session: Session; cookie: Cookie }> {
    const session = await this._lucia.createSession(user.id, {});
    const cookie = this._lucia.createSessionCookie(session.id);
    return { session, cookie };
  }
}
```

## 🔄 Patrones de Dependencias

### Inyección de Dependencias

**1. Definir Símbolos** (`di/types.ts`):
```typescript
export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  
  // Repositories
  ITodosRepository: Symbol.for('ITodosRepository'),
  
  // Use Cases
  ICreateTodoUseCase: Symbol.for('ICreateTodoUseCase'),
  
  // Controllers
  ICreateTodoController: Symbol.for('ICreateTodoController'),
};
```

**2. Crear Módulos** (`di/modules/todos.module.ts`):
```typescript
export function createTodosModule() {
  const todosModule = createModule();

  // Repositorio
  todosModule
    .bind(DI_SYMBOLS.ITodosRepository)
    .toClass(TodosRepository, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ICrashReporterService,
    ]);

  // Use Case
  todosModule
    .bind(DI_SYMBOLS.ICreateTodoUseCase)
    .toHigherOrderFunction(createTodoUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ITodosRepository,
    ]);

  // Controller
  todosModule
    .bind(DI_SYMBOLS.ICreateTodoController)
    .toHigherOrderFunction(createTodoController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.ITransactionManagerService,
      DI_SYMBOLS.ICreateTodoUseCase,
    ]);

  return todosModule;
}
```

**3. Configurar Contenedor** (`di/container.ts`):
```typescript
import { createContainer } from '@evyweb/ioctopus';

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('TodosModule'), createTodosModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
```

**4. Usar en Server Actions** (`app/actions.ts`):
```typescript
'use server';

export async function createTodo(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const sessionId = cookies().get(SESSION_COOKIE)?.value;
    const createTodoController = getInjection('ICreateTodoController');
    await createTodoController(data, sessionId);
  } catch (err) {
    // Manejo de errores
  }
  
  revalidatePath('/');
  return { success: true };
}
```

## 📝 Casos de Uso de Ejemplo

### Flujo Completo: Crear Todo

**1. Server Action** (Frameworks & Drivers):
```typescript
export async function createTodo(formData: FormData) {
  const createTodoController = getInjection('ICreateTodoController');
  await createTodoController(data, sessionId);
}
```

**2. Controller** (Interface Adapters):
```typescript
export const createTodoController = (...deps) => async (input, sessionId) => {
  // Validar autenticación y entrada
  const { user } = await authenticationService.validateSession(sessionId);
  const { data } = inputSchema.safeParse(input);
  
  // Ejecutar caso de uso
  const todos = await createTodoUseCase(data, user.id);
  
  // Formatear respuesta
  return presenter(todos);
};
```

**3. Use Case** (Application):
```typescript
export const createTodoUseCase = (...deps) => async (input, userId, tx) => {
  // Lógica de negocio
  if (input.todo.length < 4) {
    throw new InputParseError('Todo must be at least 4 chars');
  }

  // Llamar al repositorio
  return await todosRepository.createTodo({
    todo: input.todo,
    userId,
    completed: false,
  }, tx);
};
```

**4. Repository** (Infrastructure):
```typescript
export class TodosRepository implements ITodosRepository {
  async createTodo(todo: TodoInsert, tx?: Transaction): Promise<Todo> {
    const query = db.insert(todos).values(todo).returning();
    const [created] = await query.execute();
    return created;
  }
}
```

## 🧪 Testing

### Estructura de Tests
Los tests siguen la misma estructura que `src/`:

```
tests/
└── unit/
    ├── application/
    │   └── use-cases/
    │       └── todos/
    │           └── create-todo.use-case.test.ts
    └── interface-adapters/
        └── controllers/
            └── todos/
                └── create-todo.controller.test.ts
```

### Ejemplo de Test de Use Case:
```typescript
// tests/unit/application/use-cases/todos/create-todo.use-case.test.ts
import { getInjection } from '@/di/container';

const createTodoUseCase = getInjection('ICreateTodoUseCase');
const signInUseCase = getInjection('ISignInUseCase');

it('creates todo', async () => {
  const { session } = await signInUseCase({
    username: 'testuser',
    password: 'password',
  });

  const result = await createTodoUseCase(
    { todo: 'Test todo' }, 
    session.userId
  );

  expect(result).toMatchObject({
    todo: 'Test todo',
    userId: session.userId,
    completed: false,
  });
});
```

### Mocks para Testing
```typescript
// src/infrastructure/repositories/todos.repository.mock.ts
export class MockTodosRepository implements ITodosRepository {
  private _todos: Todo[] = [];

  async createTodo(todo: TodoInsert): Promise<Todo> {
    const created = { ...todo, id: this._todos.length };
    this._todos.push(created);
    return created;
  }
}
```

## ✅ Mejores Prácticas

### 1. Naming Conventions
- **Interfaces**: Prefijo `I` (ej: `IAuthenticationService`)
- **Use Cases**: Sufijo `.use-case.ts` (ej: `create-todo.use-case.ts`)
- **Controllers**: Sufijo `.controller.ts`
- **Repositories**: Sufijo `.repository.ts`

### 2. Error Handling
- Crear errores personalizados en `entities/errors/`
- Capturar errores de librerías externas en Infrastructure
- Convertir a errores del dominio

```typescript
// En el repository
try {
  const result = await externalLibrary.query();
  return result;
} catch (err) {
  this.crashReporterService.report(err);
  throw new DatabaseOperationError('Failed to query data');
}
```

### 3. Transacciones
- Pasar transacciones como parámetro opcional
- Usar el patrón `invoker = tx ?? db`

```typescript
async createTodo(todo: TodoInsert, tx?: Transaction): Promise<Todo> {
  const invoker = tx ?? db;
  return await invoker.insert(todos).values(todo).returning();
}
```

### 4. Validación
- Validación de entrada en Controllers (usando Zod)
- Validación de negocio en Use Cases
- Validación de datos en Models

### 5. Instrumentación
- Usar el servicio de instrumentación para observabilidad
- Envolver operaciones importantes con spans

```typescript
return await instrumentationService.startSpan(
  { name: 'createTodo Use Case', op: 'function' },
  async () => {
    // Lógica del use case
  }
);
```

## 🚀 Implementación en Aluna AI

### Paso 1: Instalar Dependencias
```bash
npm install @evyweb/ioctopus zod
```

### Paso 2: Crear Estructura de Directorios
```bash
mkdir -p src/{application/{use-cases,repositories,services},entities/{models,errors},infrastructure/{repositories,services},interface-adapters/controllers}
mkdir -p di/{modules}
mkdir -p tests/unit/{application,interface-adapters}
```

### Paso 3: Implementar Capa por Capa
1. Definir modelos en `entities/models/`
2. Crear errores personalizados en `entities/errors/`
3. Definir interfaces en `application/`
4. Implementar use cases en `application/use-cases/`
5. Crear controllers en `interface-adapters/controllers/`
6. Implementar repositorios y servicios en `infrastructure/`
7. Configurar inyección de dependencias en `di/`

### Paso 4: Integrar con Next.js
- Usar controllers en Server Actions
- Mantener componentes React simples
- Manejar errores apropiadamente

## 📚 Referencias y Recursos

- [Clean Architecture Blog Post Original](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Repositorio de Referencia](https://github.com/nikolovlazar/nextjs-clean-architecture)
- [IoCtopus Documentation](https://github.com/Evyweb/ioctopus)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

---

Esta guía proporciona una base sólida para implementar Clean Architecture en Aluna AI, asegurando que el código sea mantenible, testeable y escalable a medida que el proyecto crece.
