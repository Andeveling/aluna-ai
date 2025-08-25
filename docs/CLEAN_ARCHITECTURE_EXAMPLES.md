# Ejemplos Prácticos de Clean Architecture para Aluna AI

## 🎯 Casos de Uso Específicos para Aluna AI

### 1. Gestión de Usuarios y Autenticación

#### Modelo de Usuario
```typescript
// src/entities/models/user.ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['student', 'instructor', 'admin']),
  avatar: z.string().url().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.pick({
  email: true,
  name: true,
  role: true,
}).extend({
  password: z.string().min(8).max(100),
});

export type CreateUser = z.infer<typeof createUserSchema>;
```

#### Use Case: Crear Usuario
```typescript
// src/application/use-cases/users/create-user.use-case.ts
import { ConflictError } from '@/src/entities/errors/common';
import { User, CreateUser } from '@/src/entities/models/user';
import type { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import type { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import type { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

export type ICreateUserUseCase = ReturnType<typeof createUserUseCase>;

export const createUserUseCase =
  (
    instrumentationService: IInstrumentationService,
    usersRepository: IUsersRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (input: CreateUser): Promise<User> => {
    return await instrumentationService.startSpan(
      { name: 'createUser Use Case', op: 'function' },
      async () => {
        // Verificar si el usuario ya existe
        const existingUser = await usersRepository.getUserByEmail(input.email);
        if (existingUser) {
          throw new ConflictError('User with this email already exists');
        }

        // Generar ID único
        const userId = authenticationService.generateUserId();

        // Crear usuario
        const newUser = await usersRepository.createUser({
          ...input,
          id: userId,
        });

        return newUser;
      }
    );
  };
```

### 2. Sistema de Cursos

#### Modelos de Curso
```typescript
// src/entities/models/course.ts
import { z } from 'zod';

export const courseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(200),
  description: z.string().max(2000),
  instructorId: z.string().uuid(),
  thumbnail: z.string().url().optional(),
  price: z.number().min(0),
  currency: z.string().length(3).default('USD'),
  status: z.enum(['draft', 'published', 'archived']),
  category: z.string(),
  tags: z.array(z.string()),
  duration: z.number().min(1), // en minutos
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Course = z.infer<typeof courseSchema>;

export const createCourseSchema = courseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateCourse = z.infer<typeof createCourseSchema>;

// Modelo para Lecciones
export const lessonSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string().min(3).max(200),
  content: z.string(),
  videoUrl: z.string().url().optional(),
  duration: z.number().min(1),
  order: z.number().min(1),
  isPreview: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Lesson = z.infer<typeof lessonSchema>;
```

#### Use Case: Crear Curso
```typescript
// src/application/use-cases/courses/create-course.use-case.ts
import { UnauthorizedError } from '@/src/entities/errors/auth';
import { InputParseError } from '@/src/entities/errors/common';
import { Course, CreateCourse } from '@/src/entities/models/course';
import type { ICoursesRepository } from '@/src/application/repositories/courses.repository.interface';
import type { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import type { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';

export type ICreateCourseUseCase = ReturnType<typeof createCourseUseCase>;

export const createCourseUseCase =
  (
    instrumentationService: IInstrumentationService,
    coursesRepository: ICoursesRepository,
    usersRepository: IUsersRepository
  ) =>
  async (input: CreateCourse, userId: string): Promise<Course> => {
    return await instrumentationService.startSpan(
      { name: 'createCourse Use Case', op: 'function' },
      async () => {
        // Verificar autorización: solo instructores pueden crear cursos
        const user = await usersRepository.getUser(userId);
        if (!user) {
          throw new UnauthorizedError('User not found');
        }
        
        if (user.role !== 'instructor' && user.role !== 'admin') {
          throw new UnauthorizedError('Only instructors can create courses');
        }

        // Validaciones de negocio
        if (input.price < 0) {
          throw new InputParseError('Price cannot be negative');
        }

        if (input.duration < 30) {
          throw new InputParseError('Course must be at least 30 minutes long');
        }

        // Crear curso
        const course = await coursesRepository.createCourse({
          ...input,
          instructorId: userId,
        });

        return course;
      }
    );
  };
```

### 3. Sistema de Inscripciones

#### Modelo de Inscripción
```typescript
// src/entities/models/enrollment.ts
import { z } from 'zod';

export const enrollmentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  enrolledAt: z.date(),
  completedAt: z.date().optional(),
  progress: z.number().min(0).max(100).default(0),
  lastAccessedAt: z.date().optional(),
  status: z.enum(['active', 'completed', 'cancelled']).default('active'),
});

export type Enrollment = z.infer<typeof enrollmentSchema>;

export const createEnrollmentSchema = enrollmentSchema.pick({
  userId: true,
  courseId: true,
});

export type CreateEnrollment = z.infer<typeof createEnrollmentSchema>;
```

#### Use Case: Inscribir Usuario
```typescript
// src/application/use-cases/enrollments/enroll-user.use-case.ts
import { ConflictError, NotFoundError } from '@/src/entities/errors/common';
import { UnauthorizedError } from '@/src/entities/errors/auth';
import { Enrollment, CreateEnrollment } from '@/src/entities/models/enrollment';
import type { IEnrollmentsRepository } from '@/src/application/repositories/enrollments.repository.interface';
import type { ICoursesRepository } from '@/src/application/repositories/courses.repository.interface';
import type { IPaymentService } from '@/src/application/services/payment.service.interface';

export type IEnrollUserUseCase = ReturnType<typeof enrollUserUseCase>;

export const enrollUserUseCase =
  (
    instrumentationService: IInstrumentationService,
    enrollmentsRepository: IEnrollmentsRepository,
    coursesRepository: ICoursesRepository,
    paymentService: IPaymentService
  ) =>
  async (
    input: CreateEnrollment,
    paymentMethodId?: string
  ): Promise<Enrollment> => {
    return await instrumentationService.startSpan(
      { name: 'enrollUser Use Case', op: 'function' },
      async () => {
        // Verificar que el curso existe y está disponible
        const course = await coursesRepository.getCourse(input.courseId);
        if (!course) {
          throw new NotFoundError('Course not found');
        }

        if (course.status !== 'published') {
          throw new UnauthorizedError('Course is not available for enrollment');
        }

        // Verificar si ya está inscrito
        const existingEnrollment = await enrollmentsRepository.getEnrollment(
          input.userId,
          input.courseId
        );
        
        if (existingEnrollment) {
          throw new ConflictError('User is already enrolled in this course');
        }

        // Procesar pago si el curso no es gratuito
        if (course.price > 0) {
          if (!paymentMethodId) {
            throw new UnauthorizedError('Payment method is required for paid courses');
          }

          await paymentService.processPayment({
            amount: course.price,
            currency: course.currency,
            paymentMethodId,
            description: `Enrollment in course: ${course.title}`,
            metadata: {
              courseId: course.id,
              userId: input.userId,
            },
          });
        }

        // Crear inscripción
        const enrollment = await enrollmentsRepository.createEnrollment(input);

        return enrollment;
      }
    );
  };
```

### 4. Sistema de Progreso y Completación

#### Use Case: Actualizar Progreso
```typescript
// src/application/use-cases/progress/update-lesson-progress.use-case.ts
import { NotFoundError } from '@/src/entities/errors/common';
import { UnauthorizedError } from '@/src/entities/errors/auth';
import type { IProgressRepository } from '@/src/application/repositories/progress.repository.interface';
import type { IEnrollmentsRepository } from '@/src/application/repositories/enrollments.repository.interface';
import type { ILessonsRepository } from '@/src/application/repositories/lessons.repository.interface';

export type IUpdateLessonProgressUseCase = ReturnType<typeof updateLessonProgressUseCase>;

export const updateLessonProgressUseCase =
  (
    instrumentationService: IInstrumentationService,
    progressRepository: IProgressRepository,
    enrollmentsRepository: IEnrollmentsRepository,
    lessonsRepository: ILessonsRepository
  ) =>
  async (
    lessonId: string,
    userId: string,
    completedPercentage: number
  ): Promise<void> => {
    return await instrumentationService.startSpan(
      { name: 'updateLessonProgress Use Case', op: 'function' },
      async () => {
        // Obtener la lección
        const lesson = await lessonsRepository.getLesson(lessonId);
        if (!lesson) {
          throw new NotFoundError('Lesson not found');
        }

        // Verificar que el usuario está inscrito en el curso
        const enrollment = await enrollmentsRepository.getEnrollment(
          userId,
          lesson.courseId
        );
        
        if (!enrollment || enrollment.status !== 'active') {
          throw new UnauthorizedError('User is not enrolled in this course');
        }

        // Actualizar progreso de la lección
        await progressRepository.updateLessonProgress({
          lessonId,
          userId,
          completedPercentage,
          completedAt: completedPercentage >= 100 ? new Date() : null,
        });

        // Calcular y actualizar progreso general del curso
        const overallProgress = await progressRepository.calculateCourseProgress(
          userId,
          lesson.courseId
        );

        await enrollmentsRepository.updateProgress(
          enrollment.id,
          overallProgress
        );

        // Si el curso está completado, marcar la inscripción como completada
        if (overallProgress >= 100) {
          await enrollmentsRepository.markAsCompleted(enrollment.id);
        }
      }
    );
  };
```

## 🔧 Configuración de Inyección de Dependencias

### Módulo de Cursos
```typescript
// di/modules/courses.module.ts
import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '@/di/types';

// Use Cases
import { createCourseUseCase } from '@/src/application/use-cases/courses/create-course.use-case';
import { getCourseUseCase } from '@/src/application/use-cases/courses/get-course.use-case';
import { updateCourseUseCase } from '@/src/application/use-cases/courses/update-course.use-case';

// Controllers
import { createCourseController } from '@/src/interface-adapters/controllers/courses/create-course.controller';
import { getCourseController } from '@/src/interface-adapters/controllers/courses/get-course.controller';

// Repositories
import { CoursesRepository } from '@/src/infrastructure/repositories/courses.repository';
import { MockCoursesRepository } from '@/src/infrastructure/repositories/courses.repository.mock';

export function createCoursesModule() {
  const coursesModule = createModule();

  // Repository
  if (process.env.NODE_ENV === 'test') {
    coursesModule.bind(DI_SYMBOLS.ICoursesRepository).toClass(MockCoursesRepository);
  } else {
    coursesModule
      .bind(DI_SYMBOLS.ICoursesRepository)
      .toClass(CoursesRepository, [
        DI_SYMBOLS.IInstrumentationService,
        DI_SYMBOLS.ICrashReporterService,
      ]);
  }

  // Use Cases
  coursesModule
    .bind(DI_SYMBOLS.ICreateCourseUseCase)
    .toHigherOrderFunction(createCourseUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ICoursesRepository,
      DI_SYMBOLS.IUsersRepository,
    ]);

  coursesModule
    .bind(DI_SYMBOLS.IGetCourseUseCase)
    .toHigherOrderFunction(getCourseUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ICoursesRepository,
    ]);

  // Controllers
  coursesModule
    .bind(DI_SYMBOLS.ICreateCourseController)
    .toHigherOrderFunction(createCourseController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.ICreateCourseUseCase,
    ]);

  coursesModule
    .bind(DI_SYMBOLS.IGetCourseController)
    .toHigherOrderFunction(getCourseController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IGetCourseUseCase,
    ]);

  return coursesModule;
}
```

## 🧪 Ejemplos de Testing

### Test de Use Case con Mocks
```typescript
// tests/unit/application/use-cases/courses/create-course.use-case.test.ts
import { expect, it, beforeEach } from 'vitest';
import { getInjection } from '@/di/container';
import { UnauthorizedError } from '@/src/entities/errors/auth';
import { InputParseError } from '@/src/entities/errors/common';

const createCourseUseCase = getInjection('ICreateCourseUseCase');
const createUserUseCase = getInjection('ICreateUserUseCase');

it('creates course when user is instructor', async () => {
  // Crear un instructor de prueba
  const instructor = await createUserUseCase({
    email: 'instructor@test.com',
    name: 'Test Instructor',
    role: 'instructor',
    password: 'password123',
  });

  const courseData = {
    title: 'Test Course',
    description: 'A test course for learning',
    price: 99.99,
    currency: 'USD',
    status: 'draft' as const,
    category: 'Programming',
    tags: ['javascript', 'testing'],
    duration: 120,
    level: 'intermediate' as const,
  };

  const course = await createCourseUseCase(courseData, instructor.id);

  expect(course).toMatchObject({
    title: courseData.title,
    description: courseData.description,
    instructorId: instructor.id,
    price: courseData.price,
    status: courseData.status,
  });
});

it('throws error when user is student', async () => {
  const student = await createUserUseCase({
    email: 'student@test.com',
    name: 'Test Student',
    role: 'student',
    password: 'password123',
  });

  const courseData = {
    title: 'Test Course',
    description: 'A test course',
    price: 0,
    currency: 'USD',
    status: 'draft' as const,
    category: 'Programming',
    tags: [],
    duration: 60,
    level: 'beginner' as const,
  };

  await expect(
    createCourseUseCase(courseData, student.id)
  ).rejects.toThrow(UnauthorizedError);
});
```

### Test de Controlador
```typescript
// tests/unit/interface-adapters/controllers/courses/create-course.controller.test.ts
import { expect, it } from 'vitest';
import { getInjection } from '@/di/container';
import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { InputParseError } from '@/src/entities/errors/common';

const createCourseController = getInjection('ICreateCourseController');
const signInUseCase = getInjection('ISignInUseCase');
const createUserUseCase = getInjection('ICreateUserUseCase');

it('creates course with valid input', async () => {
  // Crear y autenticar instructor
  const instructor = await createUserUseCase({
    email: 'instructor@test.com',
    name: 'Test Instructor',
    role: 'instructor',
    password: 'password123',
  });

  const { session } = await signInUseCase({
    email: 'instructor@test.com',
    password: 'password123',
  });

  const courseData = {
    title: 'Advanced JavaScript',
    description: 'Learn advanced JavaScript concepts',
    price: 149.99,
    category: 'Programming',
    tags: ['javascript', 'advanced'],
    duration: 300,
    level: 'advanced',
  };

  const result = await createCourseController(courseData, session.id);

  expect(result).toHaveProperty('id');
  expect(result.title).toBe(courseData.title);
  expect(result.instructorId).toBe(instructor.id);
});

it('throws error with invalid input', async () => {
  const { session } = await signInUseCase({
    email: 'instructor@test.com',
    password: 'password123',
  });

  const invalidCourseData = {
    title: '', // Título vacío
    description: 'Description',
  };

  await expect(
    createCourseController(invalidCourseData, session.id)
  ).rejects.toThrow(InputParseError);
});
```

## 📱 Integración con Server Actions

### Server Actions para Cursos
```typescript
// app/(dashboard)/courses/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { 
  UnauthenticatedError,
  UnauthorizedError 
} from '@/src/entities/errors/auth';
import { 
  InputParseError,
  NotFoundError 
} from '@/src/entities/errors/common';

export async function createCourse(formData: FormData) {
  const instrumentationService = getInjection('IInstrumentationService');
  
  return await instrumentationService.instrumentServerAction(
    'createCourse',
    { recordResponse: true },
    async () => {
      try {
        const data = Object.fromEntries(formData.entries());
        const sessionId = cookies().get(SESSION_COOKIE)?.value;
        
        const createCourseController = getInjection('ICreateCourseController');
        const course = await createCourseController(data, sessionId);
        
        revalidatePath('/dashboard/courses');
        return { success: true, courseId: course.id };
        
      } catch (err) {
        if (err instanceof InputParseError) {
          return { error: err.message };
        }
        if (err instanceof UnauthenticatedError) {
          return { error: 'You must be logged in to create a course' };
        }
        if (err instanceof UnauthorizedError) {
          return { error: 'Only instructors can create courses' };
        }
        
        const crashReporterService = getInjection('ICrashReporterService');
        crashReporterService.report(err);
        
        return {
          error: 'An error occurred while creating the course. Please try again.',
        };
      }
    }
  );
}

export async function enrollInCourse(courseId: string, paymentMethodId?: string) {
  try {
    const sessionId = cookies().get(SESSION_COOKIE)?.value;
    const enrollUserController = getInjection('IEnrollUserController');
    
    await enrollUserController({
      courseId,
      paymentMethodId,
    }, sessionId);
    
    revalidatePath('/dashboard/my-courses');
    redirect('/dashboard/my-courses');
    
  } catch (err) {
    // Manejo de errores similar
  }
}
```

## 🎨 Componentes React Limpios

### Componente de Lista de Cursos
```typescript
// app/(dashboard)/courses/page.tsx
import { getInjection } from '@/di/container';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/config';
import { CourseCard } from './course-card';
import { CreateCourseButton } from './create-course-button';

async function getCourses(sessionId?: string) {
  const getCoursesController = getInjection('IGetCoursesController');
  return await getCoursesController(sessionId);
}

export default async function CoursesPage() {
  const sessionId = cookies().get(SESSION_COOKIE)?.value;
  const courses = await getCourses(sessionId);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <CreateCourseButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
```

Esta implementación práctica muestra cómo aplicar Clean Architecture específicamente para el contexto de Aluna AI, un sistema de gestión de aprendizaje, manteniendo la separación de responsabilidades y la testabilidad del código.
