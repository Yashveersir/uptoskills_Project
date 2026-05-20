# Frontend API Layer

The frontend API layer communicates with the backend via a shared Axios client.

## 📂 Structure

```
src/api/
├── axios.js            # Base client with interceptors
├── authApi.js          # Auth & user profile calls
├── courseApi.js        # Public course calls
├── enrollmentApi.js    # Enrollment calls
├── adminApi.js         # Admin-only calls
└── index.js            # Barrel export
```

## 🧠 Core Features

### 1. Auto JWT Injection
`axios.js` automatically reads the token from `localStorage` (via `utils/tokenStorage.js`) and attaches it as an `Authorization: Bearer <token>` header to every request.

### 2. Auto Payload Unwrapping
The backend returns responses wrapped in `{ success: true, data: { ... } }`.
Our API files automatically unwrap this so your UI components receive the inner payload directly.

### 3. Centralised Error Handling
Axios interceptors catch 401s (session expired) and redirect to `/login`.
For UI errors, always wrap API calls in try/catch and use the `getErrorMessage` utility:

```js
import { getErrorMessage } from "../utils/errorHandler";
import { loginUser } from "../api";
import toast from "react-hot-toast";

try {
  await loginUser(credentials);
} catch (err) {
  toast.error(getErrorMessage(err, "Login failed."));
}
```

## 📥 Importing

Always import from the root `api/` folder. The `index.js` file re-exports everything so you don't need to guess which file a function lives in.

**Do this:**
```js
import { getCourses, enrollCourse } from "../api";
```

**Not this:**
```js
import { getCourses } from "../api/courseApi";
import { enrollCourse } from "../api/enrollmentApi";
```
