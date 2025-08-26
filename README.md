# Koder-Frontend

A modern, cloud-based code editor and coding challenge platform built with Next.js, supporting 15+ programming languages, instant code execution, and a curated library of coding problems. No setup required—start coding instantly in your browser.

**Live Demo:** [https://koder-frontend.vercel.app/](https://koder-frontend.vercel.app/)

![alt text](/public/image.png)

## Features and Functionality

*   **Cloud-Based Code Editor:** Write and execute code directly in your browser.
*   **Multi-Language Support:** Supports 15+ programming languages, including JavaScript, Python, Java, C++, and more (see `config/languageOptions.ts`).
*   **Instant Code Execution:** Real-time code execution using an external API (`https://emkc.org/api/v2/piston/execute`).
*   **Coding Challenges:**  Solve coding problems with automated testing.
*   **Submission History:** Track your submissions and review your code (`app/submissions/page.tsx`).
*   **User Authentication:** Secure signup, login, and password reset functionality.
*   **Profile Management:** Update your profile information and security settings.
*   **Dashboard:** View your progress, language statistics, and recent submissions (`app/u/[username]/page.tsx`).
*   **Responsive Design:**  Works seamlessly on various screen sizes.
*   **Theming:** Choose from multiple editor themes (`config/theme.ts`, `themes/dracula.themes.ts`, `themes/solarized.themes.ts`).

## Technology Stack

*   **Next.js:**  React framework for building server-rendered applications.
*   **React:**  JavaScript library for building user interfaces.
*   **Axios:**  HTTP client for making API requests.
*   **Lucide React:**  Icon library.
*   **Monaco Editor:**  Code editor component.
*   **Tailwind CSS:**  CSS framework for styling.
*   **react-hot-toast:** For displaying toast notifications
*   **react-resizable-panels:** For resizable panels in the problem page.
*   **dayjs:** For formatting relative time

## Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

## Installation Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/mohit-bhandari45/Koder-Frontend.git
    cd Koder-Frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Configure environment variables:

    Create a `.env.local` file in the root directory and configure the necessary environment variables. Example:

    ```
    # Example .env.local
    NEXT_PUBLIC_BASE_URL=https://koder-backend-ry19.onrender.com
    ```
    or
    ```
    NEXT_PUBLIC_BASE_URL=http://localhost:4000
    ```

    Refer to the backend repository documentation for the required environment variables.

4.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage Guide

1.  **Landing Page:**  Access the landing page at the root URL (`/`) to explore the platform.  It includes a code editor preview, statistics, and links to sign up or log in (`app/page.tsx`).

2.  **Code Editor:** Navigate to `/code-editor` to access the code editor. Select a language and theme from the dropdown menus. Write your code in the editor and click the "Run Code" button to execute it. The output will be displayed in the output panel (`app/code-editor/page.tsx`).

3.  **Problems:**  Browse coding challenges at `/problems`.  Click on a problem to view its description, examples, and constraints. Submit your solution and track your progress (`app/problems/page.tsx`, `app/problems/[id]/page.tsx`).

4.  **Authentication:**
    *   **Signup:** Create a new account at `/auth/signup` (`app/auth/signup/page.tsx`).
    *   **Login:** Log in to your existing account at `/auth/login` (`app/auth/login/page.tsx`).
    *   **Forgot Password:**  Reset your password at `/auth/forgot-password` (`app/auth/forgot-password/page.tsx`).
    *   **Verify Email:** Verify your email using the code sent to your email address at `/auth/verify-email` (`app/auth/verify-email/page.tsx`).
    *   **Username Selection:** Choose a username after email verification at `/auth/username` (`app/auth/username/page.tsx`).
    *   **Logout:** Log out from the settings page.

5.  **Profile:** Manage your profile and security settings at `/settings` (`app/settings/page.tsx`).  Update your username, full name, and profile picture. Change your password or set a new password.

6.  **Submissions:** View your submissions and their details at `/submissions` and `/submissions/[id]` (`app/submissions/page.tsx` and `app/submissions/[id]/page.tsx`).

7.  **User Profile:** Access user profile pages at `/u/[username]`. This page shows user stats, recent activity, languages and skills (`app/u/[username]/page.tsx`).

## API Documentation

*   The Koder Frontend interacts with the backend API endpoints defined in `lib/api.lib.ts` and the dashboard API in `lib/dashboardApi.lib.ts`.

*   **Authentication Endpoints:**

    *   `POST /auth/signup`:  Signup (`SIGNUP_ENDPOINT`)
    *   `POST /auth/login`:  Login (`LOGIN_ENDPOINT`)
    *   `POST /auth/verify-email`:  Verify Email (`VERIFY_EMAIL_ENDPOINT`)
    *   `POST /auth/resend-otp`: Resend OTP for verification (`RESEND_OTP_ENDPOINT`)
    *   `POST /auth/forgot-password`: Initiate forgot password process (`FORGOT_PASSWORD`)
    *   `POST /auth/verify-reset-otp`: Verify reset OTP  (`VERIFY_RESET_OTP_ENDPOINT`)
    *   `POST /auth/reset-password`: Reset password (`RESET_PASSWORD_ENDPOINT`)

*   **User Endpoints:**

    *   `GET /api/user/me`:  Get User Profile (`GET_OWN_PROFILE_ENDPOINT`)
    *   `POST /api/user/username`: Add username (`ADD_USERNAME_ENDPOINT`)
    *   `PATCH /api/user/me`: Update user profile
    *   `POST /api/user/change-password`: Change user password

*   **Problem Endpoints:**

    *   `GET /api/problem`: Get all problems
    *   `GET /api/problem/{id}`: Get problem by id

*   **Submission Endpoints:**
    *   `POST /api/submission/add`: Add submission (`ADD_SUBMISSION_ENDPOINT`)
    *   `GET /api/submission/problem/{problemId}/all`: Get all submissions for a problem  (`GET_ALL_PROBLEM_SUBMISSION_ENDPOINT`)
    *   `GET /api/submission/all`: Get all submissions (`GET_ALL_SUBMISSIONS_ENDPOINT`)
*   **Dashboard API Endpoints:**

    *   `GET /dashboard/progress-summary`:  Get User's Progress Summary (`GET_PROGRESS_SUMMARY`)
    *   `GET /dashboard/language-stats`:  Get User's Language Statistics (`GET_LANGUAGE_STATS`)
    *   `GET /dashboard/skill-stats`:  Get User's Skill Statistics (`GET_SKILL_STATS`)
    *   `GET /dashboard/recent-submissions`:  Get User's Recent Submissions (`GET_RECENT_SUBMISSIONS`)

## Contributing Guidelines

Contributions are welcome!  To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Test your changes thoroughly.
5.  Submit a pull request.

## License Information

License not specified.

## Contact/Support Information

For questions or support, please contact:

[mohit.bhandari45@gmail.com](mailto:mohit.bhandari45@gmail.com)
