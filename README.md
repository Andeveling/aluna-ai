<div align="center">

# 🛠️ GitHub Tools

*A comprehensive toolkit for modern development workflows with TypeScript, React, Next.js, and Prisma*

[![GitHub stars](https://img.shields.io/github/stars/Andeveling/github-tools?style=flat-square)](https://github.com/Andeveling/github-tools)
[![GitHub issues](https://img.shields.io/github/issues/Andeveling/github-tools?style=flat-square)](https://github.com/Andeveling/github-tools/issues)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[Features](#features) • [Getting Started](#getting-started) • [Usage](#usage) • [Examples](#examples) • [Contributing](#contributing)

</div>

This repository contains a curated collection of tools, instructions, prompts, and configurations designed to streamline development workflows with modern web technologies. It's built to integrate seamlessly with VS Code Copilot and AI-assisted development environments.

## Features

- 🎯 **AI-Optimized Instructions** - Load-on-demand instruction files for TypeScript, React, Next.js, Prisma, and Markdown
- 🤖 **Custom Chat Modes** - Specialized AI assistants for planning, mentoring, code review, and project management
- 📝 **Smart Prompts** - Ready-to-use prompts for README generation, implementation planning, and GitHub issue creation
- 🔧 **Issue Templates** - Standardized templates for bug reports, feature requests, and documentation
- ⚡ **Development Best Practices** - Curated guidelines based on industry experts like Matt Pocock's Total TypeScript

## Getting Started

### Prerequisites

- [VS Code](https://code.visualstudio.com/) with GitHub Copilot extension
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Andeveling/github-tools.git
   cd github-tools
   ```

2. **Copy to your project:**
   ```bash
   # Copy the entire .github folder to your project
   cp -r .github /path/to/your/project/
   ```

3. **Or fork this repository** to customize it for your specific needs.

## Usage

### AI-Powered Instructions

The instruction files are automatically loaded by VS Code when working with specific file types:

- **TypeScript/JavaScript** (`*.ts`, `*.tsx`, `*.js`, `*.jsx`) - Loads TypeScript best practices
- **React Components** - Loads React development guidelines
- **Next.js Projects** - Loads Next.js 2025 best practices
- **Prisma Schemas** (`*.prisma`) - Loads database and ORM guidelines
- **Markdown Files** (`*.md`) - Loads documentation standards

> [!TIP]
> These instructions are loaded on-demand thanks to VS Code's v1.102+ "Load instruction files on demand" feature.

### Custom Chat Modes

Access specialized AI assistants through VS Code Chat:

- **Planner** - Generate implementation plans and project roadmaps
- **Mentor** - Get learning guidance and code explanations
- **PRD** - Create product requirement documents
- **Janitor** - Code cleanup and refactoring assistance
- **Beast Mode** - Advanced development assistance with GPT-4.1

### Smart Prompts

Use the prompt files for common development tasks:

```bash
# Generate a README for your project
# Use: .github/prompts/create-readme.prompt.md

# Create implementation plans
# Use: .github/prompts/create-implementation-plan.prompt.md

# Generate GitHub issues from specifications
# Use: .github/prompts/create-github-issues-*.prompt.md
```

## Examples

### Setting Up a New TypeScript Project

1. Copy the `.github` folder to your project
2. Open your TypeScript files in VS Code
3. The TypeScript instructions will automatically load, providing:
   - Strict mode configuration
   - Branded types patterns
   - Type safety guidelines
   - React best practices

### Using Chat Modes for Planning

1. Open VS Code Chat
2. Select the "Planner" mode
3. Ask: "Create an implementation plan for a user authentication system"
4. Get a structured, actionable plan with tasks and priorities

### Creating Standardized Issues

1. Use the issue templates in `.github/ISSUE_TEMPLATE/`
2. Templates available for:
   - Bug reports
   - Feature requests
   - Documentation updates
   - Specification implementations

## Project Structure

```
.github/
├── instructions/           # AI instruction files (auto-loaded)
│   ├── typescript.instructions.md
│   ├── react-best-practices.instructions.md
│   ├── nextjs-best-practices.instructions.md
│   ├── prisma.instructions.md
│   └── markdown-best-practices.instructions.md
├── chatmodes/             # Custom AI chat assistants
│   ├── Planner.chatmode.md
│   ├── Mentor.chatmode.md
│   ├── PRD.chatmode.md
│   └── ...
├── prompts/               # Reusable AI prompts
│   ├── create-readme.prompt.md
│   ├── create-implementation-plan.prompt.md
│   └── ...
└── ISSUE_TEMPLATE/        # GitHub issue templates
    ├── bug_report.yml
    ├── feature_request.yml
    └── ...
```

## Tech Stack Coverage

This toolkit provides optimized workflows for:

- **Frontend**: React, Next.js, TypeScript
- **Backend**: Node.js, Prisma, PostgreSQL
- **Tools**: VS Code, GitHub Copilot, Git
- **Documentation**: Markdown, GitHub Pages

## Best Practices Included

- **TypeScript**: Based on Matt Pocock's Total TypeScript methodology
- **React**: Modern hooks, component patterns, and performance optimization
- **Next.js**: App Router, Server Components, and 2025 best practices
- **Prisma**: Schema design, security, and performance guidelines
- **Documentation**: GFM standards and accessibility guidelines

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot)
- [Total TypeScript by Matt Pocock](https://www.totaltypescript.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

<div align="center">

Made with ❤️ for modern development workflows

[⭐ Star this repo](https://github.com/Andeveling/github-tools) if you find it useful!

</div>