# Garry's Redemption

Play Red Dead Redemption 2 as a Garry's Mod player: physgun, toolgun, Q menu and GMod's guns on RDR2's people, horses and wagons, in story mode.

**Garry's Redemption is made by [codeByAlexff](https://github.com/codeByAlexff).** All credit for the mod goes to them.

- Original project: https://github.com/codeByAlexff/garrys-redemption
- Report bugs and ask questions there: https://github.com/codeByAlexff/garrys-redemption/issues
- Upstream release packaged here: [v0.1.0-beta](https://github.com/codeByAlexff/garrys-redemption/releases/tag/v0.1.0-beta) (commit [`4ada8a1`](https://github.com/codeByAlexff/garrys-redemption/tree/4ada8a12a85d6f30e2c6485970792cc1b837c6ac))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Red Dead Redemption 2** ([Steam](https://store.steampowered.com/app/1174180/)): story mode; tested on 1.0.1491.50 (Rockstar launcher, Vulkan); Steam, Rockstar or Epic.
- **Garry's Mod** ([Steam](https://store.steampowered.com/app/4000/)): x86-64 beta branch, tested on 2026.09.17.
- scripthookrdr2 1.0.1491.17: copy ScriptHookRDR2.dll and dinput8.dll (the ASI loader) from its zip next to RDR2.exe (http://www.dev-c.com/rdr2/scripthookrdr2/).
- gmod-x86-64: Steam > Garry's Mod > Properties > Betas: pick x86-64 (the 64-bit gmod_win64.exe).
- Windows and the [SIGF app](https://sigf.ai). The app installs  for you.

## Install

In the SIGF app, open **Garry's Redemption** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v0.1.0`](../../releases/tag/v0.1.0).

### Good to know

- You need both games on PC: Red Dead Redemption 2 (Steam, Rockstar or Epic) and Garry's Mod (Steam). Windows 64-bit.
- Install Script Hook RDR2 yourself (http://www.dev-c.com/rdr2/scripthookrdr2/): copy ScriptHookRDR2.dll and dinput8.dll next to RDR2.exe. It may not be redistributed, so the app does not ship it.
- Switch Garry's Mod to the x86-64 branch (Steam, Properties, Betas) so gmod_win64.exe exists.
- Set RDR2 to windowed borderless (or windowed). On NVIDIA with RDR2 filling the monitor: NVIDIA Control Panel > Manage 3D settings > Red Dead Redemption 2 > Vulkan/OpenGL present method: Prefer layered on DXGI Swapchain (or run RDR2 on DirectX 12).
- Press Play: RDR2 starts first; load story mode and wait for "Garry's Redemption: waiting for GMod". Then Garry's Mod starts (gmod_win64.exe, windowed, gm_flatgrass, 1 player); if it does not, run play_gmod.bat in the Garry's Mod folder. GMod's window hides itself once linked. F9 hands the player to RDR2 and back.
- Story mode only: the plugin switches itself off in any online session, and Script Hook RDR2 closes the game if you go online.
- The app writes GarrysRedemption.asi into the RDR2 folder and the module, addon and play_gmod.bat into the Garry's Mod folder; Restore removes them. The author's own launcher (GarrysRedemptionPassthrough.exe) is not installed.
- Beta, played on one PC (Windows 11, NVIDIA, Vulkan): look stutter, no exclusive fullscreen, untested on AMD and DX12. Report bugs to the author on the upstream issue tracker.

## What this repository holds

1. The upstream source tree at tag `v0.1.0-beta`, commit [`4ada8a12a85d6f30e2c6485970792cc1b837c6ac`](https://github.com/codeByAlexff/garrys-redemption/tree/4ada8a12a85d6f30e2c6485970792cc1b837c6ac), every file unchanged (same git blobs). Upstream's own `README.md` is there, unchanged; GitHub shows this file (`.github/README.md`) first.
2. Added by SIGF in the same commit: this file, `THIRD-PARTY.md` (licenses and sources of the third-party files in the release), and `sigf/` (the scripts that built the release assets, for reference: they run inside the SIGF repository).
3. `mashup.json`, the SIGF app recipe (the next commit).
4. The release `v0.1.0` (its tag is the first commit):

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `GarrysRedemption-v0.1.0-beta.zip` | 567342 B | `91ba4e0c48558330a7130d38469406f40b0a458e1d0fcc87fc06185ba831a3a2` | upstream's release file, unchanged (sha256 `91ba4e0c...a3a2`); the app places its `RDR2/` folder into Red Dead Redemption 2 and its `GarrysMod/` folder into Garry's Mod. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| Garry's Redemption (all of the upstream tree and the release zip) | MIT, Copyright Garry's Redemption contributors | `LICENSE` |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes Garry's Redemption installable in one click, credited to codeByAlexff. If you are the author and want anything changed or taken down, open an issue here.
