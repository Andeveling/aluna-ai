# 🌙 Aluna AI

> **Plataforma de IA para toma de decisiones conscientes basada en fortalezas personales y cosmovisión ancestral**

Aluna AI combina la sabiduría ancestral de la cosmovisión Kogui con inteligencia artificial moderna para ayudarte a tomar decisiones más conscientes y alineadas con tus fortalezas naturales.

---

## 🌟 **¿Qué es Aluna AI?**

**Aluna** (palabra Kogui que significa "pensamiento" o "alma del mundo") es una plataforma que te conecta con tu sabiduría interior mediante:

- **Asistente IA personalizado** que comprende tus fortalezas únicas
- **Recomendaciones accionables** basadas en tu perfil de fortalezas
- **Historial de decisiones** para reflexionar sobre tu crecimiento
- **Enfoque holístico** inspirado en la cosmovisión indígena colombiana

## ✨ **Características principales**

### 🧠 **Inteligencia Personalizada**
- Onboarding con test de fortalezas (High5 integration)
- AI que aprende de tus patrones de decisión
- Recomendaciones contextualizadas a tu perfil único

### 💬 **Asistente Conversacional**
- Chat intuitivo para consultas sobre decisiones
- Respuestas estructuradas con pros, contras y próximos pasos
- Feedback continuo para mejorar la experiencia

### 📊 **Dashboard de Insights**
- Visualización de tus fortalezas principales
- Historial de decisiones y su evolución
- Métricas de claridad y confianza en tus elecciones

### 👥 **Decisiones Colaborativas**
- Comparar fortalezas en equipos de trabajo
- Consenso inteligente para decisiones grupales
- Insights sobre dinámicas de equipo

## 🚀 **Roadmap 2025**

### **Q1 - Validación y MVP** 📅
- [x] Setup infraestructura (Next.js 15 + Supabase) ✨
- [ ] Identidad visual inspirada en cosmovisión Kogui
- [ ] Asistente AI básico con prompt engineering
- [ ] Landing page y registro early adopters
- [ ] Onboarding con fortalezas personales

## 🛠 **Stack Técnico**

# Aluna AI - Plataforma de Aprendizaje Inteligente

Aluna AI es una plataforma educativa moderna construida con **Clean Architecture** y tecnologías de vanguardia, diseñada para ofrecer experiencias de aprendizaje personalizadas y eficientes.

## 🏗️ Arquitectura

Este proyecto implementa **Clean Architecture** siguiendo los principios de Robert C. Martin, asegurando código mantenible, testeable y escalable.

### Estructura del Proyecto

```
aluna-ai/
├── app/                          # 🖥️ Frameworks & Drivers Layer (Next.js)
│   ├── components/               # Componentes React
│   ├── actions.ts               # Server Actions
│   └── page.tsx                 # Páginas y rutas
├── src/                         # 🏛️ Capas de Arquitectura Limpia
│   ├── application/             # 📋 Application Layer
│   │   ├── use-cases/          # Casos de uso (lógica de negocio)
│   │   ├── repositories/       # Interfaces de repositorios
│   │   └── services/           # Interfaces de servicios
│   ├── entities/               # 🎯 Entities Layer
│   │   ├── models/            # Modelos de dominio (con Zod)
│   │   └── errors/            # Errores personalizados
│   ├── infrastructure/         # 🔧 Infrastructure Layer
│   │   ├── repositories/      # Implementaciones de repositorios
│   │   └── services/          # Implementaciones de servicios
│   └── interface-adapters/     # 🔌 Interface Adapters Layer
│       └── controllers/       # Controladores (punto de entrada)
├── di/                         # 💉 Dependency Injection
│   ├── container.ts           # Contenedor de DI
│   └── modules/              # Módulos de inyección
├── docs/                      # 📚 Documentación
│   ├── CLEAN_ARCHITECTURE.md # Guía de arquitectura
│   └── IMPLEMENTATION_PLAN.md # Plan de implementación
└── tests/                     # 🧪 Tests (estructura espejo de src/)
```

## 🚀 Características Principales

### 🎯 Para Estudiantes
- **Cursos Interactivos**: Contenido multimedia con seguimiento de progreso
- **Aprendizaje Personalizado**: IA que adapta el contenido al ritmo individual
- **Evaluaciones Inteligentes**: Quizzes adaptativos y feedback instantáneo
- **Certificaciones**: Certificados verificables al completar cursos

### 👨‍🏫 Para Instructores
- **Creación de Cursos**: Editor intuitivo para contenido multimedia
- **Analytics Avanzado**: Métricas detalladas de engagement y progreso
- **Herramientas de Evaluación**: Sistema de calificaciones automatizado
- **Comunicación Directa**: Mensajería integrada con estudiantes

### 🏛️ Para Instituciones
- **Gestión Masiva**: Administración de múltiples cursos y usuarios
- **Integración LMS**: Compatible con sistemas existentes
- **Reportes Institucionales**: Dashboard ejecutivo con métricas clave
- **White Label**: Personalización completa de marca

## �️ Stack Tecnológico

### Frontend & Framework
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Diseño utilitario
- **React Hook Form** - Manejo de formularios

### Backend & Base de Datos
- **Drizzle ORM** - ORM type-safe para TypeScript
- **PostgreSQL** - Base de datos relacional
- **Lucia Auth** - Autenticación segura
- **Zod** - Validación de esquemas

### Arquitectura & Testing
- **IoCtopus** - Inyección de dependencias
- **Vitest** - Framework de testing
- **ESLint Boundaries** - Enforce arquitectura limpia

### Infraestructura
- **Vercel** - Deployment y hosting
- **Uploadthing** - Gestión de archivos
- **Resend** - Servicio de emails
- **Sentry** - Monitoring y error tracking

## 🏃‍♂️ Inicio Rápido

### Prerrequisitos
- Node.js 18+
- PostgreSQL 14+
- pnpm (recomendado)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/aluna-ai.git
   cd aluna-ai
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus configuraciones
   ```

4. **Configurar base de datos**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Ejecutar en desarrollo**
   ```bash
   pnpm dev
   ```

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 🧪 Testing

### Ejecutar Tests
```bash
# Tests unitarios
pnpm test

# Tests con cobertura
pnpm test:coverage

# Tests en modo watch
pnpm test:watch
```

### Estructura de Tests
- **Unit Tests**: `tests/unit/` - Tests de use cases y controladores
- **Integration Tests**: `tests/integration/` - Tests de flujos completos
- **E2E Tests**: `tests/e2e/` - Tests end-to-end con Playwright

## 📚 Documentación

- **[Clean Architecture Guide](docs/CLEAN_ARCHITECTURE.md)** - Guía completa de la arquitectura
- **[Ejemplos Prácticos](docs/CLEAN_ARCHITECTURE_EXAMPLES.md)** - Casos de uso específicos
- **[Plan de Implementación](docs/IMPLEMENTATION_PLAN.md)** - Roadmap de desarrollo
- **[API Documentation](docs/API.md)** - Documentación de endpoints

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm build            # Build de producción
pnpm start            # Servidor de producción
pnpm lint             # Linter
pnpm type-check       # Verificación de tipos

# Base de datos
pnpm db:push          # Aplicar cambios de schema
pnpm db:seed          # Poblar con datos de prueba
pnpm db:studio        # Abrir Drizzle Studio
pnpm db:reset         # Resetear base de datos

# Testing
pnpm test             # Tests unitarios
pnpm test:e2e         # Tests end-to-end
pnpm test:coverage    # Cobertura de tests
```

## 🌟 Características de la Arquitectura

### ✅ Beneficios Implementados

- **Independencia de Framework**: La lógica de negocio no depende de Next.js
- **Independencia de Base de Datos**: Fácil cambio de proveedores de DB
- **Testabilidad**: 90%+ cobertura de código en capas core
- **Mantenibilidad**: Separación clara de responsabilidades
- **Escalabilidad**: Arquitectura preparada para crecimiento

### 🔒 Principios Aplicados

- **Dependency Inversion**: Interfaces definidas en Application, implementadas en Infrastructure
- **Single Responsibility**: Cada clase/función tiene una única responsabilidad
- **Open/Closed**: Extensible sin modificar código existente
- **Interface Segregation**: Interfaces específicas y cohesivas

## 🤝 Contribuir

### Flujo de Desarrollo

1. **Fork el proyecto**
2. **Crear rama feature** (`git checkout -b feature/nueva-caracteristica`)
3. **Seguir convenciones de arquitectura** (ver docs/CLEAN_ARCHITECTURE.md)
4. **Escribir tests** para nuevas funcionalidades
5. **Commit con mensajes descriptivos** (usar Conventional Commits)
6. **Push a la rama** (`git push origin feature/nueva-caracteristica`)
7. **Crear Pull Request**

### Convenciones de Código

- **ESLint**: Configurado para enforar reglas de arquitectura
- **Prettier**: Formateo automático de código
- **TypeScript**: Tipado estricto requerido
- **Testing**: Tests requeridos para use cases y controladores

## 📈 Roadmap

### 🎯 V1.0 - Core Platform (Q1 2025)
- [x] Arquitectura limpia implementada
- [ ] Sistema de autenticación completo
- [ ] Gestión básica de cursos
- [ ] Dashboard para instructores
- [ ] Reproductor de contenido

### 🚀 V1.1 - AI Features (Q2 2025)
- [ ] Recomendaciones personalizadas con IA
- [ ] Asistente virtual para estudiantes
- [ ] Evaluaciones adaptativas
- [ ] Análisis de sentimiento en feedback

### 🌟 V2.0 - Advanced Features (Q3 2025)
- [ ] Realidad virtual/aumentada
- [ ] Blockchain para certificaciones
- [ ] API pública para integraciones
- [ ] Mobile app nativa

## 📄 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE) - ver el archivo LICENSE para más detalles.

## 🙋‍♂️ Soporte

- **Documentación**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/aluna-ai/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/aluna-ai/discussions)
- **Email**: soporte@aluna-ai.com

---

**Desarrollado con ❤️ siguiendo Clean Architecture principles**

## 📚 **Documentación Adicional**

- **SENA**: Documentación del proyecto educativo en `/docs/SENA/`
- **ROADMAP.yml**: Plan detallado del proyecto

## 🌱 **Contributing**

¡Las contribuciones son bienvenidas! Este proyecto busca crear tecnología consciente que honre tanto la innovación moderna como la sabiduría ancestral.

---

*Construido con 🌱 consciencia y 💚 respeto por la Madre Tierra*
