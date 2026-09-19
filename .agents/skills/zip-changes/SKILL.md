---
name: zip-changes
description: Zip changed files across the main repository or a worktree (.worktrees/ or .claude/worktrees/) into <project-root>/YYYY-MM-DD-HHMM-changes-[worktree].zip preserving path hierarchy. Use when packaging uncommitted/committed changes for sharing or review.
---

Zip changed files in a git worktree into an archive placed at the project root, preserving original directory structure.

## Workflow

Run the steps in order.

**1. Identify the target worktree.**
Read the user's prompt or argument:

- If a worktree name or path is given (`/zip-changes <name>` or `--path <name>`), resolve it against the known worktree locations:
  1. Direct path or relative path
  2. `<project-root>/.worktrees/<name>`
  3. `<project-root>/.claude/worktrees/<name>`
  4. Registered git worktrees via `git worktree list`
- If no argument is provided, target `main` (the main repository root).
  _Done when_ you hold the verified absolute path of the target worktree and its label (`main` or worktree folder name).

**2. Preview changed files.**
Run the script with `--dry-run` to verify which files will be included:

```bash
.agents/skills/zip-changes/scripts/zip-changes.sh --path <target> --dry-run
```

Inspect the output to confirm tracked modifications, staged files, and untracked files are captured, and noise (`.DS_Store`, existing `*.zip`) is excluded.
_Done when_ you have verified the list of files to be archived.

**3. Generate the zip archive.**
Execute the bundled script:

```bash
.agents/skills/zip-changes/scripts/zip-changes.sh --path <target>
```

For `main`, omitting `--path` defaults to the primary repository root:

```bash
.agents/skills/zip-changes/scripts/zip-changes.sh
```

The script outputs `<project-root>/YYYY-MM-DD-HHMM-changes-[worktree].zip` (e.g. `2026-09-18-1349-changes-main.zip` or `2026-09-18-1349-changes-backward-chaining-episode-13dc19.zip`).
_Done when_ the script exits 0 and the archive exists at the project root.

**4. Report the created archive.**
State the final archive path, file size, and count of included files to the user, providing a file link to the generated zip.
_Done when_ the user receives the archive path and summary.

---

## Reference

### Worktree search precedence

When a worktree identifier is provided to `--path <name>`, resolution checks in order:

1. Exact directory path on disk
2. `<project-root>/<name>`
3. `<project-root>/.worktrees/<name>`
4. `<project-root>/.claude/worktrees/<name>`
5. `git worktree list --porcelain`

### Script flags

The helper script lives at `.agents/skills/zip-changes/scripts/zip-changes.sh`:

| Flag                      | Purpose                                                       |
| ------------------------- | ------------------------------------------------------------- |
| `-p, --path <path\|name>` | Target worktree directory or folder name (default: main repo) |
| `-n, --name <name>`       | Override `[worktree]` label in the output filename            |
| `-b, --base <ref>`        | Base git ref to diff against (default: `main`)                |
| `-u, --uncommitted-only`  | Only zip uncommitted changes (skips commits on the branch)    |
| `-o, --output <file>`     | Explicit output file destination                              |
| `-d, --dry-run`           | Print files and destination without writing zip               |
| `-h, --help`              | Display script usage                                          |

### Naming format

All archives are placed directly in the primary project root:

- Main worktree: `<project-root>/YYYY-MM-DD-HHMM-changes-main.zip`
- Linked worktree: `<project-root>/YYYY-MM-DD-HHMM-changes-[worktree].zip`
