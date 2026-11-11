# AGENTS.md — Funautic

## Project purpose

Funautic is a Minecraft 1.21.1 NeoForge modpack distributed from a Packwiz repository. The repository supports client/server flavor selection and exports for MultiMC/Prism Launcher and Modrinth. `unsup` consumes the published Packwiz source for automatic updates.

## Repository layout

- `modpack/pack.toml` — Packwiz pack metadata and Minecraft/NeoForge versions.
- `modpack/index.toml` — Packwiz file index and hashes. Treat as generated metadata; update it through Packwiz rather than hand-editing hashes.
- `modpack/mods/*.pw.toml` — one Packwiz metafile per managed mod JAR.
- `modpack/config/`, `modpack/config-server/`, `modpack/config-client/` — managed configuration files and config metafiles.
- `modpack/unsup.toml` — unsup flavor definitions and Packwiz metafile flavor assignments.
- `mrpack/overrides/unsup.ini` — unsup configuration shipped with the Modrinth export.
- `mmcpack/minecraft/unsup.ini` — unsup configuration shipped with the MultiMC export.
- `docs/` — distribution documentation.
- `CHANGELOG.md` — human-readable repository changes.
- `mrpack/` and `mmcpack/` — exported/distribution artifacts; do not edit these manually when the source Packwiz tree is authoritative.

## Source of truth and generated files

1. Make mod and configuration changes under `modpack/` first.
2. Keep `modpack/pack.toml`, `modpack/index.toml`, and all `modpack/mods/*.pw.toml` internally consistent.
3. Treat exported `mrpack/` and `mmcpack/` contents as generated outputs unless the task explicitly targets an export.
4. Never hand-edit a Packwiz hash, download URL, or `index.toml` entry to conceal a mismatch.
5. Preserve exact literal versions, including `beta`, build numbers, loader suffixes, and commit/hash suffixes. Do not replace a missing version with `None`, `unknown`, or `${version}`.
6. Compare mods by embedded JAR identity (`modId` and declared version) when auditing instances; filenames are only a fallback.

## Packwiz workflow

Before changing the pack:

- Confirm the working tree and target branch with `git status --short --branch`.
- Read the relevant metafile and `modpack/pack.toml` before editing.
- Check that the target is Minecraft 1.21.1 and the intended NeoForge version.
- Keep client-only, server-only, and both-side mods correctly marked with `side`.

For a normal mod update:

1. Run the Packwiz command from the `modpack/` directory.
2. Prefer the official Modrinth/CurseForge Packwiz subcommands instead of manually downloading and renaming JARs.
3. Review the generated `.pw.toml` diff, especially `name`, `filename`, `side`, source URL, update metadata, and hash.
4. Refresh the Packwiz index only when the source tree is intentionally changed.
5. Inspect the final diff for accidental removals, duplicate mod identities, or changes to unrelated configuration.

Useful commands, when Packwiz is installed:

```text
cd modpack
packwiz refresh
packwiz update
packwiz serve
```

Use export commands only when a distribution artifact is requested. Do not run a command that rewrites the entire pack or updates every mod without explicit scope.

## unsup rules

- `unsup.ini` points at the published Packwiz `pack.toml`; keep that URL synchronized with the intended deployment branch/site.
- `source_format=packwiz`, `source`, `preset`, `behavior`, branding, and flavor prompts are deployment-sensitive. Change them deliberately and document why.
- Keep flavor IDs referenced by `modpack/unsup.toml` valid. A metafile assigned to a nonexistent flavor silently breaks the intended variant.
- Treat `modpack/unsup.toml` as the source for flavor assignments. The copied `unsup.ini` files in exports should be regenerated or synchronized, not independently drifted.
- When changing a flavor, verify both sides: the flavor group definition and every `[metafile.<name>]` assignment.
- Do not expose signing keys, private endpoints, or credentials in this repository.

## Validation checklist

For every modpack metadata change:

- Parse changed TOML files with a TOML parser.
- Verify every `modpack/mods/*.pw.toml` path is present in `modpack/index.toml`.
- Verify every indexed `mods/` path has a corresponding metafile.
- Check for duplicate mod IDs or duplicate filenames.
- Confirm every download URL, hash, filename, and side field is present and plausible.
- Check that `modpack/unsup.toml` references existing metafiles/flavors.
- Review `git diff --check` and `git diff --stat`.
- For an actual release, test installation/update with the intended installer and at least one client/server flavor combination.

A lightweight structural audit can be run from the repository root with Python/TOML tooling. It must not mutate files. Packwiz refresh/export commands are state-changing and should be run separately, reviewed, and committed only after inspecting their diff.

## Modpack compatibility rules

- NeoForge mods must target Minecraft 1.21.1 unless the mod explicitly documents compatibility.
- Do not mix Fabric-only and NeoForge-only builds merely because their filenames look similar. Sinytra/Connector-based mods require an explicit compatibility decision.
- Keep libraries paired with the mods that require them; update dependent libraries together when their metadata requires it.
- For performance mods and Create/Sable integrations, change one overlapping optimizer at a time and test client rendering and server tick behavior separately.
- A partial `update/` folder is a patch bundle, not proof that absent mods are deleted. Confirm deletions against the complete development inventory and Packwiz source.

## Changelog conventions

Use deterministic, metadata-backed entries. For machine-readable setup-to-development reports, use exactly one line per change:

```text
updated <name> <old> => <new>
downgraded <name> <setup> => <development>
added <name> <version>
deleted <name> <version>
```

Use stable mod IDs internally, even if the display name is shown to users. Report malformed or missing versions separately instead of silently guessing.

## Git and CI discipline

- Keep commits focused: source metadata, configuration, and exports should not be mixed without need.
- Never commit downloaded JARs when the project expects Packwiz metafiles only.
- Before commit, inspect `git diff`, `git diff --check`, and the Packwiz/index audit.
- Do not rewrite history, force-push, or publish a release unless explicitly requested.
- Do not claim an export, deployment, or successful update until the resulting files and hashes have been verified.

## Communication

Explain changes and validation in concise Bahasa Indonesia by default. Separate confirmed findings from fuzzy name matches or assumptions. When a requested source is unavailable, say so and use the repository's actual metadata rather than inventing versions.
