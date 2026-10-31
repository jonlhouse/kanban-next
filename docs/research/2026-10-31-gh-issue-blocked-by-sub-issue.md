# gh issue sub-issue and blocked-by flags

Keywords: gh, issue edit, sub-issue, blocked-by, parent, version
Verified: 2026-10-31 against gh 2.103.2 and the cli/cli v2.94.0 release
Re-check when: gh major upgrade, or a sub-issue or blocking command fails

## Findings

- `gh issue edit --add-sub-issue` and `gh issue edit --add-blocked-by` were first released in gh v2.94.0 (2026-06-10), through PR cli/cli#13057. Neither exists in v2.93.0. [release notes](https://github.com/cli/cli/releases/tag/v2.94.0), [PR](https://github.com/cli/cli/pull/13057), [edit.go at v2.94.0](https://github.com/cli/cli/blob/v2.94.0/pkg/cmd/issue/edit/edit.go)
- The same release added `gh issue edit --remove-blocked-by`, `--add-blocking`, `--remove-blocking`, `--remove-sub-issue`, `--parent` and `--remove-parent`, and `gh issue create --parent`, `--blocked-by` and `--blocking`. [edit.go at v2.94.0](https://github.com/cli/cli/blob/v2.94.0/pkg/cmd/issue/edit/edit.go), [create.go at v2.94.0](https://github.com/cli/cli/blob/v2.94.0/pkg/cmd/issue/create/create.go)
- So the "`gh` 2.94+" notes in `docs/agents/issue-tracker.md` hold; with gh 2.94 or later, the older `gh api` fallbacks there aren't needed.

## Open

- None
