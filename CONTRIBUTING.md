# Contributing to UpToSkills Project

Welcome! This guide provides a detailed, step-by-step walkthrough for setting up the project and collaborating with the team.

---

## 🚀 Phase 1: Local Setup

Follow these steps to get the project running on your machine.

### Step 1: Clone the Repository
Download the project code from GitHub to your local computer.
```bash
git clone https://github.com/Yashveersir/uptoskills_Project.git
cd uptoskills_Project
```
*   **What this does:** `git clone` creates a copy of the repository. `cd` moves you into the project folder.

### Step 2: Install Dependencies
Install all the necessary libraries and packages defined in `package.json`.
```bash
npm install
```
*   **What this does:** This command reads the `package.json` file and downloads all required libraries into a `node_modules` folder.

### Step 3: Configure Environment Variables
The application needs certain "secrets" or configuration keys to run (like API URLs).
1.  Create a new file named `.env` in the root directory.
2.  Ask the project lead for the current environment variables and paste them there.
*   **Why?** We don't commit `.env` files to GitHub for security reasons.

### Step 4: Start the Development Server
Launch the application locally to see your changes in real-time.
```bash
npm run dev
```
*   **What this does:** This starts the Vite development server. It will usually give you a link (like `http://localhost:5173`) to view the app in your browser.

---

## 🛠 Phase 2: Collaboration Workflow

We use a **Branching Strategy** to ensure the main code stays stable.

### 1. Update your local code
Before starting new work, always get the latest changes from the team.
```bash
git checkout main
git pull origin main
```
*   **git checkout main:** Switches you to the main branch.
*   **git pull origin main:** Downloads and merges the latest changes from GitHub.

### 2. Create a Feature Branch
Never work directly on `main`. Create a "sandbox" for your changes.
```bash
git checkout -b feature/your-feature-name
```
*   **What this does:** Creates a new branch and switches you to it immediately. Use descriptive names like `feature/login-ui` or `fix/header-mobile`.

### 3. Save your work (Commit)
As you write code, save snapshots of your progress.
```bash
git add .
git commit -m "feat: add descriptive message"
```
*   **git add .:** Stages all your changes, telling Git which files you want to include in the snapshot.
*   **git commit -m "..."**: Saves the staged changes with a message. A good message explains *what* changed (e.g., `feat: add search bar to courses page`).

### 4. Share your work (Push)
Upload your branch to GitHub so others can see it.
```bash
git push origin feature/your-feature-name
```
*   **What this does:** Sends your local branch to the GitHub server.

### 5. Open a Pull Request (PR)
1.  Go to the [GitHub Repository](https://github.com/Yashveersir/uptoskills_Project).
2.  You will see a "Compare & pull request" button for your branch. Click it.
3.  Describe what you did and submit it.
4.  **Review:** A team member will review your code. Once approved, it can be merged into the `main` branch.

---

## 🎨 Coding Standards
*   **Framework:** React (Functional Components + Hooks).
*   **Styling:** Tailwind CSS (Mobile-first approach).
*   **Consistency:** Follow the existing folder structure in `src/`.
*   **Verification:** Run `npm run lint` before pushing to check for errors.

---

## ❓ Need Help?
If you're stuck, reach out on our project's communication channel or open an issue on GitHub. 

Happy coding!
