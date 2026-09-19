#!/usr/bin/env bash
#
# zip-changes.sh
#
# Zips all changed files in a git worktree (defaults to main), preserving
# their original directory structure, and outputs the archive to the project root,
# named starting with YYYY-MM-DD-HHMM-changes-[worktree].zip.
#

set -euo pipefail

show_help() {
  cat <<'EOF'
Usage: zip-changes.sh [OPTIONS]

Zips all changed files in a git worktree, preserving original directory structure,
and outputs the zip to the project root.

Options:
  -p, --path <path|name>    Path to worktree, or worktree folder name (default: main worktree)
  -n, --name <name>         Override [worktree] name in filename (default: derived from worktree)
  -b, --base <ref>          Base git ref to compare against (default: main)
  -u, --uncommitted-only    Only include uncommitted changes (skip committed branch changes)
  -o, --output <file>       Explicit output zip file path
  -d, --dry-run             List files that would be zipped without creating the zip
  -h, --help                Show this help message

Default output:
  <project-root>/YYYY-MM-DD-HHMM-changes-[worktree].zip
  (e.g. <project-root>/YYYY-MM-DD-HHMM-changes-main.zip)

Worktree search locations:
  1. Direct path or relative to current directory
  2. <project-root>/<name>
  3. <project-root>/.worktrees/<name>
  4. <project-root>/.claude/worktrees/<name>
  5. git worktree list
EOF
}

# Resolve the primary repository root (where .git common dir lives)
get_project_root() {
  local target_dir="${1:-.}"
  if ! git -C "$target_dir" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Error: Directory '$target_dir' is not inside a git repository." >&2
    exit 1
  fi
  local common_dir
  common_dir="$(git -C "$target_dir" rev-parse --path-format=absolute --git-common-dir 2>/dev/null)"
  (cd "$(dirname "$common_dir")" && pwd)
}

# Resolve target worktree directory from path or name
resolve_worktree() {
  local target="$1"
  local project_root="$2"

  if [ -z "$target" ]; then
    echo "$project_root"
    return 0
  fi

  # 1. Direct path check
  if [ -d "$target" ]; then
    (cd "$target" && pwd)
    return 0
  fi

  # 2. Relative to project root check
  if [ -d "$project_root/$target" ]; then
    (cd "$project_root/$target" && pwd)
    return 0
  fi

  # 3. Inside .worktrees/
  if [ -d "$project_root/.worktrees/$target" ]; then
    (cd "$project_root/.worktrees/$target" && pwd)
    return 0
  fi

  # 4. Inside .claude/worktrees/
  if [ -d "$project_root/.claude/worktrees/$target" ]; then
    (cd "$project_root/.claude/worktrees/$target" && pwd)
    return 0
  fi

  # 5. Search git worktree list
  local found_path=""
  while IFS= read -r line; do
    if [[ "$line" =~ ^worktree[[:space:]]+(.*)$ ]]; then
      local candidate="${BASH_REMATCH[1]}"
      local bname
      bname="$(basename "$candidate")"
      if [ "$candidate" = "$target" ] || [ "$bname" = "$target" ] || [[ "$bname" == *"$target"* ]]; then
        found_path="$candidate"
        break
      fi
    fi
  done < <(git -C "$project_root" worktree list --porcelain)

  if [ -n "$found_path" ] && [ -d "$found_path" ]; then
    echo "$found_path"
    return 0
  fi

  echo "Error: Worktree '$target' not found." >&2
  echo "Checked locations:" >&2
  echo "  - $target" >&2
  echo "  - $project_root/$target" >&2
  echo "  - $project_root/.worktrees/$target" >&2
  echo "  - $project_root/.claude/worktrees/$target" >&2
  echo "Available worktrees from git:" >&2
  git -C "$project_root" worktree list >&2
  exit 1
}

main() {
  local input_path=""
  local custom_name=""
  local base_ref="main"
  local uncommitted_only=false
  local output_file=""
  local dry_run=false

  while [[ $# -gt 0 ]]; do
    case "$1" in
      -p|--path)
        input_path="$2"
        shift 2
        ;;
      --path=*)
        input_path="${1#*=}"
        shift
        ;;
      -n|--name)
        custom_name="$2"
        shift 2
        ;;
      --name=*)
        custom_name="${1#*=}"
        shift
        ;;
      -b|--base)
        base_ref="$2"
        shift 2
        ;;
      --base=*)
        base_ref="${1#*=}"
        shift
        ;;
      -u|--uncommitted-only)
        uncommitted_only=true
        shift
        ;;
      -o|--output)
        output_file="$2"
        shift 2
        ;;
      --output=*)
        output_file="${1#*=}"
        shift
        ;;
      -d|--dry-run)
        dry_run=true
        shift
        ;;
      -h|--help)
        show_help
        exit 0
        ;;
      *)
        echo "Error: Unknown option '$1'" >&2
        echo "Run '$0 --help' for usage." >&2
        exit 1
        ;;
    esac
  done

  # Determine project root (main repo)
  local project_root
  project_root="$(get_project_root ".")"

  # Resolve worktree path
  local worktree_path
  worktree_path="$(resolve_worktree "$input_path" "$project_root")"

  # Verify worktree is valid
  if ! git -C "$worktree_path" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Error: '$worktree_path' is not a git worktree." >&2
    exit 1
  fi

  # Determine [worktree] label for filename
  local worktree_label
  if [ -n "$custom_name" ]; then
    worktree_label="$custom_name"
  elif [ "$worktree_path" = "$project_root" ]; then
    worktree_label="main"
  else
    worktree_label="$(basename "$worktree_path")"
  fi
  # Sanitize label for filesystem safety
  worktree_label="$(echo "$worktree_label" | tr '/' '-')"

  # Determine output file path
  # Format: <project-root>/YYYY-MM-DD-HHMM-changes-[worktree].zip
  if [ -z "$output_file" ]; then
    local date_str
    date_str="$(date +%Y-%m-%d-%H%M)"
    local filename="${date_str}-changes-${worktree_label}"
    output_file="${project_root}/${filename}.zip"
  else
    # If output_file is relative, place relative to project root
    if [[ "$output_file" != /* ]]; then
      output_file="${project_root}/${output_file}"
    fi
  fi

  # Determine comparison base
  local diff_target="HEAD"
  if [ "$uncommitted_only" = false ]; then
    local merge_base
    merge_base="$(git -C "$worktree_path" merge-base "$base_ref" HEAD 2>/dev/null || true)"
    if [ -n "$merge_base" ]; then
      diff_target="$merge_base"
    fi
  fi

  # Collect changed and untracked files
  local files=()
  while IFS= read -r -d "" f; do
    [ -z "$f" ] && continue
    # Skip noise: OS files, any zip files at root, or the output zip itself
    [[ "$f" == *".DS_Store" ]] && continue
    [[ "$f" == *".zip" ]] && continue
    [ ! -f "$worktree_path/$f" ] && continue
    files+=("$f")
  done < <(
    {
      git -C "$worktree_path" diff "$diff_target" -z --name-only --diff-filter=d 2>/dev/null || true
      git -C "$worktree_path" ls-files -z --others --exclude-standard
    } | sort -zu
  )

  local count="${#files[@]}"

  echo "Worktree:      $worktree_path"
  echo "Target name:   $worktree_label"
  echo "Changed files: $count"
  echo "Output zip:    $output_file"
  echo ""

  if [ "$count" -eq 0 ]; then
    echo "No changed or untracked files found. Nothing to zip."
    exit 0
  fi

  if [ "$dry_run" = true ]; then
    echo "Files that would be zipped (preserving paths):"
    for f in "${files[@]}"; do
      echo "  $f"
    done
    echo ""
    echo "(Dry run complete. No zip archive created.)"
    exit 0
  fi

  # Ensure destination directory exists
  mkdir -p "$(dirname "$output_file")"
  # Remove existing zip if present to avoid merging with old content
  rm -f "$output_file"

  # Zip files preserving their original relative directory paths
  (
    cd "$worktree_path"
    printf "%s\n" "${files[@]}" | zip -q -@ "$output_file"
  )

  if [ -f "$output_file" ]; then
    local size
    size="$(du -h "$output_file" | cut -f1)"
    echo "Successfully created zip archive ($size):"
    echo "  $output_file"
  else
    echo "Error: Failed to create zip file." >&2
    exit 1
  fi
}

main "$@"
