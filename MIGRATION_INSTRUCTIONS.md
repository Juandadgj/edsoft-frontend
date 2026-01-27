# Instrucciones de Migración GraphQL → REST para Claude Haiku

Este documento contiene instrucciones paso a paso para migrar los componentes del frontend de Apollo GraphQL a la nueva API RESTful. Ejecutar estas tareas una por una.

---

## 📋 Resumen de la Migración

### Archivos Base Creados
- `lib/apiClient.ts` - Cliente HTTP base
- `lib/useApi.ts` - Hooks genéricos (useQuery, useMutation, useLazyQuery)
- `types/api.types.ts` - Tipos TypeScript para la API
- `services/api.service.ts` - Servicios REST por módulo
- `hooks/useRestApi.ts` - Hooks que reemplazan los de Apollo

### Mapeo de Endpoints REST

| GraphQL Query/Mutation | REST Endpoint | Método |
|------------------------|---------------|--------|
| signIn | POST /users/login | POST |
| areas | GET /areas | GET |
| createArea | POST /areas | POST |
| updateArea | PUT /areas | PUT |
| deleteArea | DELETE /areas/:id | DELETE |
| students | GET /students | GET |
| studentByID | GET /students/:id | GET |
| studentsByGroup | GET /students/group/:id | GET |
| createStudent | POST /students | POST |
| updateStudent | PUT /students | PUT |
| deleteStudent | DELETE /students/:id | DELETE |
| teachers | GET /teachers | GET |
| teacherByID | GET /teachers/:id | GET |
| createTeacher | POST /teachers | POST |
| updateTeacher | PUT /teachers | PUT |
| deleteTeacher | DELETE /teachers/:id | DELETE |
| courses | GET /courses | GET |
| courseByID | GET /courses/:id | GET |
| createCourse | POST /courses | POST |
| updateCourse | PUT /courses | PUT |
| deleteCourse | DELETE /courses/:id | DELETE |
| studentDefinitives | GET /courses/definitives | GET |
| updateDefitinives | PUT /courses/definitives | PUT |
| groups | GET /groups | GET |
| groupByID | GET /groups/:id | GET |
| createGroup | POST /groups | POST |
| updateGroup | PUT /groups | PUT |
| deleteGroup | DELETE /groups/:id | DELETE |
| achievements | GET /achievements | GET |
| studentQualifications | GET /achievements/qualifications | GET |
| createAchievement | POST /achievements | POST |
| updateAchievement | PUT /achievements | PUT |
| updateQualifications | PUT /achievements/qualifications | PUT |
| deleteAchievement | DELETE /achievements/:id | DELETE |
| enrollments | GET /enrollments | GET |
| createEnrollment | POST /enrollments | POST |
| updateEnrollment | PUT /enrollments | PUT |
| deleteEnrollment | DELETE /enrollments/:id | DELETE |
| scholarYears | GET /scholar-years | GET |
| scholearYearSelected | GET /scholar-years/selected | GET |
| createScholarYear | POST /scholar-years | POST |
| updateScholarYear | PUT /scholar-years | PUT |
| selectScholarYear | PUT /scholar-years/:id/select | PUT |
| deleteScholarYear | DELETE /scholar-years/:id | DELETE |
| typeQualifications | GET /type-qualifications | GET |
| createTypeQualification | POST /type-qualifications | POST |
| deleteTypeQualification | DELETE /type-qualifications/:id | DELETE |
| institutions | GET /institutions | GET |
| featured | GET /featured | GET |
| createFeatured | POST /featured | POST |
| deleteFeatured | DELETE /featured/:id | DELETE |
| absences | GET /absences | GET |
| createAbsence | POST /absences | POST |
| updateAbsence | PUT /absences | PUT |
| deleteAbsence | DELETE /absences/:id | DELETE |

---

## 🔧 TAREA 1: Migrar páginas de login.tsx

**Archivo:** `frontend/pages/login.tsx`

**Instrucciones:**

1. Cambiar el import de:
```typescript
import { useSignInLazyQuery } from "@/generated/graphql";
```

A:
```typescript
import { authService } from "@/services/api.service";
import { useState } from "react";
```

2. Reemplazar el hook `useSignInLazyQuery` por estado manual:
```typescript
// ANTES:
const [getUser, { data, loading, error }] = useSignInLazyQuery();

// DESPUÉS:
const [data, setData] = useState<{ token?: string; role?: string } | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);

const getUser = async (signInInput: { user: string; password: string; id_institution: number }) => {
  setLoading(true);
  setError(null);
  try {
    const result = await authService.signIn(signInInput);
    setData(result);
    return result;
  } catch (err) {
    setError(err as Error);
  } finally {
    setLoading(false);
  }
};
```

3. Actualizar el onClick del botón:
```typescript
// ANTES:
getUser({
  variables: {
    signInInput: {
      password: password,
      user: username,
      id_institution: 1059,
    },
  },
});

// DESPUÉS:
getUser({
  password: password,
  user: username,
  id_institution: Number(id),
});
```

4. Actualizar el useEffect para manejar la respuesta:
```typescript
// ANTES:
if (data) {
  const token = data.signIn.token;
  ...
}

// DESPUÉS:
if (data) {
  const token = data.token;
  if (token) {
    sessionStorage.setItem("userToken", token);
    router.push("/dashboard");
  }
}
```

---

## 🔧 TAREA 2: Migrar components/MainComponents/Areas.tsx

**Archivo:** `frontend/components/MainComponents/Areas.tsx`

**Instrucciones:**

1. Cambiar imports de:
```typescript
import {
  useGetAreasLazyQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} from "../../generated/graphql";
```

A:
```typescript
import {
  useGetAreasLazyQuery,
  useDeleteAreaMutation,
} from "@/hooks/useRestApi";
```

2. La lógica de los hooks se mantiene igual porque los hooks en `useRestApi.ts` replican la interfaz de Apollo.

3. Actualizar las variables de DeleteArea si hay diferencias:
```typescript
// Verificar que el patrón de variables sea correcto
DeleteArea({
  variables: { idArea: area?.id_area },
})
```

---

## 🔧 TAREA 3: Migrar hooks/useSchoolYear.tsx

**Archivo:** `frontend/hooks/useSchoolYear.tsx`

**Instrucciones:**

1. Cambiar import de:
```typescript
import { useScholearYearSelectedQuery, useSelectScholarYearMutation } from "@/generated/graphql";
```

A:
```typescript
import { useScholearYearSelectedQuery, useSelectScholarYearMutation } from "@/hooks/useRestApi";
```

2. Actualizar el acceso a los datos:
```typescript
// ANTES:
year: scholarYear?.scholearYearSelected.id_year,

// DESPUÉS (el hook REST retorna directamente el objeto):
year: scholarYear?.id_year,
```

---

## 🔧 TAREA 4: Migrar components/MainComponents/Subjects.tsx

**Archivo:** `frontend/components/MainComponents/Subjects.tsx`

**Instrucciones:**

1. Buscar todos los imports de `@/generated/graphql` o `../../generated/graphql`
2. Reemplazar por imports equivalentes de `@/hooks/useRestApi`
3. Actualizar el acceso a data si es necesario (los hooks REST no envuelven en un objeto adicional)

Patrón general:
```typescript
// ANTES (Apollo):
const { data } = useCoursesQuery();
// data.courses contiene el array

// DESPUÉS (REST):
const { data } = useCoursesQuery();
// data contiene directamente el array
```

---

## 🔧 TAREA 5: Migrar components/MainComponents/Teachers.tsx

**Archivo:** `frontend/components/MainComponents/officers/teacher/Teachers.tsx`

**Instrucciones similares a Areas:**

1. Cambiar imports de generated/graphql a hooks/useRestApi
2. Verificar el patrón de variables en mutations
3. Actualizar acceso a data si usa `.teachers` o similar

---

## 🔧 TAREA 6: Actualizar _app.tsx (Opcional - Fase Final)

**Archivo:** `frontend/pages/_app.tsx`

**NOTA:** Esta tarea solo debe ejecutarse cuando TODOS los componentes estén migrados.

**Instrucciones:**

1. Eliminar imports de Apollo:
```typescript
// ELIMINAR:
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
```

2. Eliminar la configuración de Apollo Client:
```typescript
// ELIMINAR todo esto:
const SERVER_URI = ...
const httpLink = ...
const authLink = ...
const client = ...
```

3. Simplificar el componente App:
```typescript
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverColor: "#fff",
            itemHoverBg: "#0055a6",
            itemSelectedBg: "#fff",
            itemSelectedColor: "#0055a6",
            itemActiveBg: "#0055a6",
            itemHeight: 30,
          },
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
```

---

## 🔧 TAREA 7: Migrar Componentes de Reportes

**Archivos en:** `frontend/components/MainComponents/Reports/`

**Instrucciones generales:**

1. Para cada archivo que use hooks de reportes:
   - Importar `reportService` de `@/services/api.service`
   - Reemplazar queries GraphQL por llamadas al servicio

Ejemplo:
```typescript
// ANTES:
const { data } = useGenerateReportAreaQuery({ variables: { ... } });

// DESPUÉS:
const [data, setData] = useState<Report | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  reportService.area({ id_group, id_student, report_options })
    .then(setData)
    .finally(() => setLoading(false));
}, [id_group, id_student]);
```

---

## 🔧 TAREA 8: Migrar Formularios

**Archivos en:** `frontend/components/MainComponents/forms/`

Lista de archivos a migrar:
- `AreaForm.tsx`
- `CourseForm.tsx`
- `TeacherForm.tsx`
- `SecretarieForm.tsx`
- `SetYearForm.tsx`
- `SubjectForm.tsx`
- `AchievementsForm.tsx`
- `QualificationTypeForm.tsx`

**Patrón de migración para cada formulario:**

1. Cambiar import de mutations:
```typescript
// ANTES:
import { useCreateXMutation, useUpdateXMutation } from "@/generated/graphql";

// DESPUÉS:
import { useCreateXMutation, useUpdateXMutation } from "@/hooks/useRestApi";
```

2. Verificar que las variables se pasen correctamente:
```typescript
// El patrón de variables debe ser:
mutation({
  variables: { /* datos */ }
})
```

---

## 🔧 TAREA 9: Migrar Enrollment Components

**Archivos en:** `frontend/components/MainComponents/Enrollment/`

- `StudentsPerCourse.tsx`
- `SearchStudent.tsx`
- `StudentLastYear.tsx`
- `NewStudent.tsx`
- `NotRegistered.tsx`

Seguir el mismo patrón de migración: cambiar imports y verificar acceso a data.

---

## 🔧 TAREA 10: Migrar Qualification.tsx

**Archivo:** `frontend/components/MainComponents/Qualification.tsx`

Este componente usa:
- `useGetStudentQualificationsQuery` o `useGetStudentQualificationsLazyQuery`
- `useUpdateQualificationsMutation`

Migrar siguiendo el patrón establecido.

---

## 🔧 TAREA 11: Migrar Achievements.tsx

**Archivo:** `frontend/components/MainComponents/Achievements.tsx`

Usa hooks de achievements. Migrar imports y verificar data access.

---

## 🔧 TAREA 12: Migrar CourseComponent.tsx

**Archivo:** `frontend/components/MainComponents/CourseComponent.tsx`

Migrar hooks de courses.

---

## 🔧 TAREA 13: Actualizar instituciones.tsx

**Archivo:** `frontend/pages/instituciones.tsx`

Migrar `useGetInstitutionsQuery` o similar.

---

## 🔧 TAREA 14: Migrar Dashboard Components

**Archivos:**
- `frontend/pages/dashboard/index.tsx`
- `frontend/pages/dashboard/estudiante/[id].tsx`

---

## 🔧 TAREA 15: Migrar Layaout.tsx

**Archivo:** `frontend/components/Layaout.tsx`

---

## 📝 Notas Importantes para Cada Migración

### Diferencias Clave entre Apollo y REST hooks:

1. **Acceso a datos:**
   - Apollo: `data?.queryName?.field`
   - REST: `data?.field` (sin el nombre del query intermedio)

2. **Variables en mutations:**
   - El patrón se mantiene: `{ variables: { ... } }`

3. **Refetch:**
   - Apollo: `refetch()`
   - REST: `refetch()` (mismo patrón)

4. **Loading y Error:**
   - Mismo patrón: `{ loading, error }`

### Verificaciones Post-Migración:

1. Verificar que no haya imports de `@/generated/graphql`
2. Verificar que no haya imports de `@apollo/client` (excepto en _app.tsx hasta fase final)
3. Probar CRUD completo de cada entidad
4. Verificar que los tokens se envíen correctamente

---

## 🚀 Orden de Ejecución Recomendado

1. Migrar `login.tsx` primero (es crítico para autenticación)
2. Migrar `useSchoolYear.tsx` (hook compartido)
3. Migrar componentes simples (Areas, Subjects)
4. Migrar componentes complejos (Enrollment, Qualifications)
5. Migrar reportes
6. **Último:** Actualizar `_app.tsx` para remover Apollo

---

## ✅ Checklist de Verificación Final

- [ ] Login funciona con API REST
- [ ] Listar áreas funciona
- [ ] CRUD de estudiantes funciona
- [ ] CRUD de profesores funciona
- [ ] CRUD de cursos funciona
- [ ] CRUD de grupos funciona
- [ ] Calificaciones funcionan
- [ ] Reportes se generan correctamente
- [ ] Año escolar se puede seleccionar
- [ ] No hay errores en consola relacionados con GraphQL
- [ ] Apollo Client removido de _app.tsx
