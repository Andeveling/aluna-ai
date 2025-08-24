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
- [ ] Setup infraestructura (Next.js 15 + Supabase)
- [ ] Identidad visual inspirada en cosmovisión Kogui
- [ ] Asistente AI básico con prompt engineering
- [ ] Landing page y registro early adopters
- [ ] Onboarding con fortalezas personales

### **Q2 - Experiencia del Usuario** 🎯
- [ ] Historial de decisiones por usuario
- [ ] Recomendaciones estructuradas (3 opciones + pros/contras)
- [ ] Dashboard simple con visualizaciones
- [ ] Sistema de feedback post-decisión
- [ ] Test cerrado con 30 emprendedores colombianos

### **Q3 - Escalabilidad y Comunidad** 🌍
- [ ] Sistema multi-perfil para equipos
- [ ] Fine-tuning del modelo AI con datos reales
- [ ] Analytics avanzado de impacto en decisiones
- [ ] Lanzamiento beta pública
- [ ] Contenido educativo sobre fortalezas

### **Q4 - Consolidación y Expansión** 💰
- [ ] Integraciones (Calendarios, Notion, Slack)
- [ ] Gamificación con badges y logros
- [ ] App móvil (PWA + React Native)
- [ ] Modelo freemium y consultoría especializada
- [ ] Expansión a México y Perú

## 🛠️ **Stack Tecnológico**

### **Frontend**
- **Next.js 15** - Framework React de última generación
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Diseño responsive y moderno
- **Shadcn/ui** - Componentes accesibles y elegantes

### **Backend & Database**
- **Supabase** - Backend como servicio con PostgreSQL
- **Prisma** - ORM type-safe para base de datos
- **NextAuth.js** - Autenticación segura y flexible

### **AI & Analytics**
- **OpenAI GPT-4** - Motor de inteligencia artificial
- **Langchain** - Framework para aplicaciones LLM
- **Vercel Analytics** - Métricas de rendimiento
- **PostHog** - Analytics de producto y comportamiento

### **DevOps & Deployment**
- **Vercel** - Deployment y hosting optimizado
- **GitHub Actions** - CI/CD automatizado
- **Docker** - Containerización para desarrollo

## 📦 **Instalación y Setup**

### **Prerrequisitos**
```bash
node --version  # v22.0.0+
npm --version   # v11.0.0+
```

### **Clonar el repositorio**
```bash
git clone https://github.com/Andeveling/aluna-ai.git
cd aluna-ai
```

### **Instalar dependencias**
```bash
pnpm install
```

### **Variables de entorno**
Crea un archivo `.env.local` basado en `.env.example`:

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# AI Services
OPENAI_API_KEY="sk-..."

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

### **Setup de base de datos**
```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
pnpm dlx prisma db seed  # Datos de ejemplo
```

### **Ejecutar en desarrollo**
```bash
pnpm run dev
# La aplicación estará disponible en http://localhost:3000
```

## 🧪 **Testing**

```bash
# Tests unitarios
pnpm run test

# Tests de integración
pnpm run test:integration

# Tests end-to-end
pnpm run test:e2e

# Coverage
pnpm run test:coverage
```

## 📁 **Estructura del Proyecto**

```
aluna-ai/
├── 📁 app/                     # App Router (Next.js 13+)
│   ├── 📁 (auth)/             # Rutas de autenticación
│   ├── 📁 dashboard/          # Panel de usuario
│   ├── 📁 chat/               # Interfaz del asistente AI
│   └── 📁 api/                # API Routes
├── 📁 components/             # Componentes React reutilizables
│   ├── 📁 ui/                 # Componentes base (shadcn/ui)
│   ├── 📁 forms/              # Formularios y validaciones
│   └── 📁 charts/             # Visualizaciones de datos
├── 📁 lib/                    # Utilidades y configuraciones
│   ├── 📁 ai/                 # Lógica de IA y prompts
│   ├── 📁 db/                 # Configuración de base de datos
│   └── 📁 utils/              # Funciones auxiliares
├── 📁 prisma/                 # Schema y migraciones de DB
├── 📁 public/                 # Assets estáticos
└── 📁 tests/                  # Suite de tests
```

## 🎨 **Filosofía de Diseño**

### **Inspiración Kogui**
- **Colores naturales**: Paleta inspirada en la Sierra Nevada
- **Formas orgánicas**: Geometría que refleja la naturaleza
- **Equilibrio**: Balance entre tradición y modernidad

### **Principios UX**
- **Simplicidad consciente**: Interfaces limpias que facilitan la reflexión
- **Accesibilidad**: Diseño inclusivo para todos los usuarios
- **Retroalimentación**: Comunicación clara del estado del sistema

## 🤝 **Contribuir al Proyecto**

¡Nos encanta recibir contribuciones! Aquí te explicamos cómo participar:

### **1. Fork del repositorio**
```bash
# Crear fork en GitHub, luego:
git clone https://github.com/tu-usuario/aluna-ai.git
cd aluna-ai
git remote add upstream https://github.com/Andeveling/aluna-ai.git
```

### **2. Crear rama para tu feature**
```bash
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/corregir-bug
```

### **3. Desarrollar y testear**
```bash
# Hacer tus cambios
pnpm run test      # Verificar que pasen los tests
pnpm run lint      # Revisar código
pnpm run build     # Verificar que compile
```

### **4. Commit siguiendo convenciones**
```bash
git commit -m "feat: agregar dashboard de fortalezas"
git commit -m "fix: corregir error en chat AI"
git commit -m "docs: actualizar README con nuevas instrucciones"
```

### **5. Pull Request**
- Abre un PR describiendo los cambios
- Incluye screenshots si hay cambios visuales
- Referencia issues relacionados

### **Tipos de contribuciones bienvenidas:**
- 🐛 **Bug fixes**
- ✨ **Nuevas features**
- 📚 **Mejoras en documentación**
- 🎨 **Mejoras de diseño/UX**
- 🧪 **Tests adicionales**
- 🌍 **Traducciones**

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🙏 **Agradecimientos**

### **Inspiración Cultural**
- **Pueblo Kogui** - Por su sabiduría ancestral y visión holística del mundo
- **Sierra Nevada de Santa Marta** - Territorio sagrado que inspira nuestro diseño

### **Comunidad Técnica**
- **Next.js Team** - Por el framework que potencia nuestra aplicación
- **Vercel** - Por la infraestructura de deployment
- **Supabase** - Por simplificar nuestro backend
- **OpenAI** - Por democratizar el acceso a IA avanzada

### **Early Adopters**
Gracias a todos los emprendedores colombianos que están probando Aluna AI en sus primeras versiones y compartiendo feedback valioso.

## 📞 **Contacto y Soporte**

### **Creador**
- **GitHub**: [@Andeveling](https://github.com/Andeveling)
- **Email**: contacto@aluna-ai.com
- **LinkedIn**: [Perfil del fundador]

### **Comunidad**
- **Discord**: [Servidor de la comunidad]
- **Twitter**: [@AlunaAI_co]
- **Blog**: [blog.aluna-ai.com]

### **Soporte Técnico**
- **Issues**: [GitHub Issues](https://github.com/Andeveling/aluna-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Andeveling/aluna-ai/discussions)
- **Wiki**: [Documentación técnica](https://github.com/Andeveling/aluna-ai/wiki)

---

## 🌱 **Únete a la Revolución de las Decisiones Conscientes**

Aluna AI no es solo una herramienta tecnológica, es un puente entre la sabiduría ancestral y las posibilidades del futuro. Te invitamos a ser parte de esta comunidad que busca tomar decisiones más conscientes, auténticas y alineadas con nuestras fortalezas naturales.

**¿Listo para conectar con tu Aluna interior?** 

[🚀 **Probar Demo**](https://aluna-ai.vercel.app) | [📧 **Newsletter**](https://aluna-ai.com/newsletter) | [💬 **Discord**](https://discord.gg/aluna-ai)

---

<div align="center">
  <sub>Hecho con 💜 desde Colombia para el mundo</sub><br>
  <sub>Inspirado en la sabiduría Kogui • Potenciado por IA moderna</sub>
</div>