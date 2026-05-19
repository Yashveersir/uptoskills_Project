# Contributing to UpToSkills Project

Welcome to the team! This guide will help you get started with the project and outline our workflow for collaboration.

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Git](https://git-scm.com/)

### 2. Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yashveersir/uptoskills_Project.git
   cd uptoskills_Project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add any necessary environment variables. (Ask the project lead for the current keys).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🛠 Workflow

### 1. Branching Strategy
We use a feature-branch workflow. Never work directly on the `main` branch.

- **Feature branches:** `feature/short-description`
- **Bug fixes:** `fix/short-description`
- **Hotfixes:** `hotfix/description`

To create a new branch:
```bash
git checkout -b feature/your-feature-name
```

### 2. Pulling Updates
Before starting any work, ensure your local `main` branch is up to date:
```bash
git checkout main
git pull origin main
```

### 3. Committing Changes
Use descriptive commit messages:
```bash
git add .
git commit -m "feat: add user profile section"
```

### 4. Pushing and Pull Requests
1. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Go to the repository on GitHub and open a **Pull Request (PR)**.
3. Wait for at least one team member to review and approve your changes before merging.

## 🎨 Coding Standards
- Follow the existing folder structure.
- Use functional components and hooks for React.
- Ensure all components are responsive using Tailwind CSS.
- Run `npm run lint` before committing to ensure code quality.

## 💬 Communication
If you have questions or need help, reach out on our project communication channel.

Happy coding!
