# Plan de Implementación: Migración a Clean Architecture

## 🎯 Objetivo
Migrar gradualmente el proyecto Aluna AI de la estructura actual de Next.js a una arquitectura limpia, manteniendo la funcionalidad existente mientras mejoramos la mantenibilidad y testabilidad.

## 📋 Fases de Implementación

### Fase 1: Preparación y Fundamentos (Semana 1-2)

#### ✅ Tareas Completadas
- [x] Análisis de arquitectura de referencia
- [x] Documentación de Clean Architecture
- [x] Ejemplos prácticos específicos para Aluna AI

#### 🔄 Tareas Pendientes

**1.1 Configuración del Entorno**
```bash
# Instalar dependencias necesarias
npm install @evyweb/ioctopus zod drizzle-orm @lucia-auth/adapter-drizzle
npm install -D vitest @vitest/coverage-v8
```

**1.2 Crear Estructura de Directorios**
```bash
mkdir -p src/{application/{use-cases,repositories,services},entities/{models,errors},infrastructure/{repositories,services},interface-adapters/controllers}
mkdir -p di/{modules}
mkdir -p tests/unit/{application/{use-cases},infrastructure,interface-adapters/{controllers}}
```

**1.3 Configurar ESLint para Boundaries**
```json
// .eslintrc.json - añadir reglas
{
  "extends": ["next", "@typescript-eslint/recommended"],
  "plugins": ["boundaries"],
  "rules": {
    "boundaries/element-types": [
      2,
      {
        "default": "disallow",
        "rules": [
          {
            "from": "app",
            "allow": [
              "src/interface-adapters/controllers",
              "src/entities/models",
              "src/entities/errors"
            ]
          },
          {
            "from": "src/interface-adapters",
            "allow": [
              "src/application/use-cases",
              "src/entities"
            ]
          },
          {
            "from": "src/application",
            "allow": ["src/entities"]
          },
          {
            "from": "src/infrastructure",
            "allow": [
              "src/application/repositories",
              "src/application/services",
              "src/entities"
            ]
          }
        ]
      }
    ]
  }
}
```

### Fase 2: Capa Entities (Semana 2-3)

**2.1 Crear Modelos Base**
```typescript
// src/entities/models/user.ts
// src/entities/models/course.ts
// src/entities/models/lesson.ts
// src/entities/models/enrollment.ts
// src/entities/models/progress.ts
```

**2.2 Definir Errores Personalizados**
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

// src/entities/errors/common.ts
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### Fase 3: Capa Application (Semana 3-4)

**3.1 Definir Interfaces de Repositorios**
```typescript
// src/application/repositories/users.repository.interface.ts
// src/application/repositories/courses.repository.interface.ts
// src/application/repositories/lessons.repository.interface.ts
// src/application/repositories/enrollments.repository.interface.ts
```

**3.2 Definir Interfaces de Servicios**
```typescript
// src/application/services/authentication.service.interface.ts
// src/application/services/email.service.interface.ts
// src/application/services/file-storage.service.interface.ts
// src/application/services/payment.service.interface.ts
```

**3.3 Implementar Use Cases Básicos**
```typescript
// Autenticación
// src/application/use-cases/auth/sign-in.use-case.ts
// src/application/use-cases/auth/sign-up.use-case.ts
// src/application/use-cases/auth/sign-out.use-case.ts

// Usuarios
// src/application/use-cases/users/get-user.use-case.ts
// src/application/use-cases/users/update-user.use-case.ts

// Cursos
// src/application/use-cases/courses/create-course.use-case.ts
// src/application/use-cases/courses/get-courses.use-case.ts
// src/application/use-cases/courses/update-course.use-case.ts
```

### Fase 4: Capa Infrastructure (Semana 4-5)

**4.1 Configurar Base de Datos**
```typescript
// drizzle/schema.ts - migrar esquemas existentes
// drizzle/index.ts - configurar cliente
```

**4.2 Implementar Repositorios**
```typescript
// src/infrastructure/repositories/users.repository.ts
// src/infrastructure/repositories/courses.repository.ts
// src/infrastructure/repositories/lessons.repository.ts
```

**4.3 Implementar Servicios**
```typescript
// src/infrastructure/services/authentication.service.ts
// src/infrastructure/services/email.service.ts
// src/infrastructure/services/file-storage.service.ts
```

**4.4 Crear Mocks para Testing**
```typescript
// src/infrastructure/repositories/*.repository.mock.ts
// src/infrastructure/services/*.service.mock.ts
```

### Fase 5: Capa Interface Adapters (Semana 5-6)

**5.1 Implementar Controladores**
```typescript
// src/interface-adapters/controllers/auth/
// src/interface-adapters/controllers/users/
// src/interface-adapters/controllers/courses/
// src/interface-adapters/controllers/lessons/
```

**5.2 Configurar Presenters**
```typescript
// Funciones para formatear respuestas dentro de cada controlador
function presenter(data: Entity[], instrumentationService: IInstrumentationService) {
  return instrumentationService.startSpan(
    { name: 'presenter', op: 'serialize' },
    () => data.map(item => ({
      // Formatear propiedades para el cliente
    }))
  );
}
```

### Fase 6: Inyección de Dependencias (Semana 6-7)

**6.1 Definir Símbolos y Tipos**
```typescript
// di/types.ts
export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  IEmailService: Symbol.for('IEmailService'),
  IFileStorageService: Symbol.for('IFileStorageService'),
  
  // Repositories
  IUsersRepository: Symbol.for('IUsersRepository'),
  ICoursesRepository: Symbol.for('ICoursesRepository'),
  
  // Use Cases
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  ICreateCourseUseCase: Symbol.for('ICreateCourseUseCase'),
  
  // Controllers
  ISignInController: Symbol.for('ISignInController'),
  ICreateCourseController: Symbol.for('ICreateCourseController'),
};
```

**6.2 Crear Módulos de DI**
```typescript
// di/modules/auth.module.ts
// di/modules/users.module.ts
// di/modules/courses.module.ts
// di/modules/monitoring.module.ts
```

**6.3 Configurar Contenedor**
```typescript
// di/container.ts
const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('AuthModule'), createAuthModule());
ApplicationContainer.load(Symbol('UsersModule'), createUsersModule());
ApplicationContainer.load(Symbol('CoursesModule'), createCoursesModule());
```

### Fase 7: Migración Gradual de Next.js (Semana 7-8)

**7.1 Migrar Server Actions**
```typescript
// app/actions.ts - migrar uno por uno
export async function signIn(formData: FormData) {
  const signInController = getInjection('ISignInController');
  return await signInController(data);
}
```

**7.2 Actualizar Páginas**
```typescript
// app/page.tsx - usar controladores
async function getData() {
  const getCoursesController = getInjection('IGetCoursesController');
  return await getCoursesController();
}
```

**7.3 Refactorizar Componentes**
- Remover lógica de negocio de componentes
- Usar solo datos formateados por presenters
- Mantener componentes simples y enfocados en UI

### Fase 8: Testing (Semana 8-9)

**8.1 Configurar Vitest**
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './tests/coverage',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
```

**8.2 Escribir Tests Unitarios**
```typescript
// tests/unit/application/use-cases/
// tests/unit/interface-adapters/controllers/
// tests/unit/infrastructure/repositories/
```

**8.3 Tests de Integración**
```typescript
// tests/integration/
// Probar flujos completos end-to-end
```

### Fase 9: Optimización y Monitoring (Semana 9-10)

**9.1 Implementar Instrumentación**
```typescript
// src/infrastructure/services/instrumentation.service.ts
// Agregar métricas y logging
```

**9.2 Error Handling Centralizado**
```typescript
// app/error.tsx - manejar errores de dominio
// middleware.ts - interceptar errores globalmente
```

**9.3 Performance Monitoring**
- Configurar Sentry o similar
- Métricas de base de datos
- Logging estructurado

## 📊 Cronograma de Implementación

| Semana | Fase | Entregables |
|--------|------|-------------|
| 1-2 | Preparación | Estructura inicial, configuración |
| 2-3 | Entities | Modelos y errores definidos |
| 3-4 | Application | Interfaces y use cases base |
| 4-5 | Infrastructure | Repositorios y servicios implementados |
| 5-6 | Interface Adapters | Controladores funcionando |
| 6-7 | Dependency Injection | Sistema de DI configurado |
| 7-8 | Migración Next.js | Funcionalidad migrada |
| 8-9 | Testing | Suite de tests completa |
| 9-10 | Optimización | Sistema productivo optimizado |

## 🎯 Criterios de Éxito

### Métricas Técnicas
- [ ] 100% de use cases cubiertos por tests
- [ ] 90%+ cobertura de código en capas core
- [ ] 0 violaciones de reglas de dependencias
- [ ] < 100ms tiempo de respuesta promedio

### Métricas de Calidad
- [ ] Código más mantenible (menos acoplamiento)
- [ ] Facilidad para agregar nuevas funcionalidades
- [ ] Mayor estabilidad (menos bugs)
- [ ] Mejor experiencia de desarrollo

## 🔍 Puntos de Control

### Revisiones Semanales
- Revisar cumplimiento de objetivos de fase
- Evaluar calidad del código implementado
- Identificar blockers y riesgos
- Ajustar cronograma si es necesario

### Criterios de Calidad por Fase
1. **Entities**: Modelos bien definidos con validaciones
2. **Application**: Use cases claros y testables
3. **Infrastructure**: Implementaciones robustas con manejo de errores
4. **Interface Adapters**: Controladores con validación completa
5. **DI**: Configuración limpia y mantenible
6. **Migration**: Funcionalidad equivalente sin regresiones
7. **Testing**: Cobertura completa y tests significativos
8. **Production**: Sistema estable y monitoreado

## 🚨 Riesgos y Mitigaciones

### Riesgos Técnicos
1. **Complejidad de migración**: Migrar gradualmente, no todo de una vez
2. **Regresiones**: Tests exhaustivos antes de cada cambio
3. **Performance**: Benchmarking continuo durante migración

### Riesgos de Proyecto
1. **Tiempo estimado**: Buffer del 20% en cada fase
2. **Resistencia al cambio**: Documentación y capacitación continua
3. **Scope creep**: Mantener enfoque en arquitectura, no nuevas features

## 📚 Recursos de Apoyo

### Documentación
- [x] Guía de Clean Architecture
- [x] Ejemplos prácticos específicos
- [ ] Guía de migración paso a paso
- [ ] Best practices por capa

### Herramientas
- ESLint con boundaries plugin
- Vitest para testing
- Drizzle ORM para base de datos
- IoCtopus para DI
- Sentry para monitoring

### Capacitación
- Sessions de code review
- Pair programming en implementaciones críticas
- Documentación de patrones establecidos

---

Este plan proporciona una ruta clara y estructurada para migrar Aluna AI a Clean Architecture, asegurando que cada paso sea medible, testeable y reversible si es necesario.
