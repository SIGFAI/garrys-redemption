// Garry's Redemption (codeByAlexff, MIT): play Red Dead Redemption 2 as a Garry's Mod player. Passthrough: an ASI
// plugin in RDR2 (Script Hook RDR2) and a GMod binary module + Lua addon, linked over shared memory. Story mode only.
// Rehosted on SIGFAI/garrys-redemption (standard upstream fusion), the release zip unchanged.
//
// The release zip stores its entry names with backslashes ("RDR2\GarrysRedemption.asi", folder entries such as
// "GarrysMod\garrysmod\"). The app's engine handles them: zip 8.6 `enclosed_name()` parses names as Windows paths on
// every platform, `is_dir()` accepts a trailing "\", and the engine compares `contents` after turning "\" into "/".
// So no repack: `contents` lists every file entry with forward slashes (the catalog refuses "\" in a path), folder
// entries left out, and the same zip installs into both games through `root` (RDR2/ -> {game} of rdr2, GarrysMod/ ->
// {game} of gmod). The launcher exe, README and LICENSE at the zip's top are checked, never written.
// lib.mjs `contentsOf` only drops folder entries ending in "/", hence the local helper below.
//   node library/garrys-redemption/build.mjs       (outputs: library/lib.mjs)
import { sha256, unzip } from '../../orchestrator/src/recipe.js';
import { card, dl, emit, pinned } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/codeByAlexff/garrys-redemption', tag: 'v0.1.0-beta', commit: '4ada8a12a85d6f30e2c6485970792cc1b837c6ac',
  license: 'MIT', authors: ['codeByAlexff'],
  zip: { file: 'GarrysRedemption-v0.1.0-beta.zip', sha256: '91ba4e0c48558330a7130d38469406f40b0a458e1d0fcc87fc06185ba831a3a2' }, // = GitHub digest
};
const SHRDR2 = { page: 'http://www.dev-c.com/rdr2/scripthookrdr2/', version: '1.0.1491.17' };
const ID = 'garrys-redemption', VERSION = '0.1.0', NAME = "Garry's Redemption";
const TAGLINE = "Play Red Dead Redemption 2 as a Garry's Mod player: physgun, toolgun, Q menu and GMod's guns on RDR2's people, horses and wagons, in story mode.";

/** Every file entry of a zip with "\" or "/" separators, as the engine sees it: folder entries out, paths with "/". */
const contentsOf = (data) => unzip(data)
  .filter(e => !/[\\/]$/.test(e.name))
  .map(e => ({ path: e.name.replace(/\\/g, '/'), sha256: sha256(e.data) }));

const data = await pinned(`${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`, UP.zip.sha256);
const zip = { name: UP.zip.file, data, sha256: sha256(data), size: data.length, contents: contentsOf(data) };
for (const want of ['RDR2/GarrysRedemption.asi', 'GarrysMod/garrysmod/lua/bin/gmcl_gr_win64.dll', 'GarrysMod/garrysmod/addons/garrys_redemption/lua/autorun/gr_init.lua'])
  if (!zip.contents.some(c => c.path === want)) throw new Error(`${UP.zip.file} has no ${want}`);
const assets = [zip];

const make = (urls) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: NAME,
  tagline: TAGLINE,
  kind: 'passthrough',
  games: [
    { game: 'rdr2', role: 'host', label: 'Red Dead Redemption 2', engine: 'RDR2 (RAGE) + Script Hook RDR2 ASI plugin (C++)',
      apps: { steam: '1174180' }, runtime: 'story mode; tested on 1.0.1491.50 (Rockstar launcher, Vulkan); Steam, Rockstar or Epic', mode: 'story mode only' },
    { game: 'gmod', role: 'guest', label: "Garry's Mod", engine: "Garry's Mod x86-64 branch (gmod_win64.exe) + binary module and Lua addon",
      apps: { steam: '4000' }, runtime: 'x86-64 beta branch, tested on 2026.09.17' },
  ],
  requires: [
    { id: 'scripthookrdr2', version: SHRDR2.version, page: SHRDR2.page, license: 'Alexander Blade: no redistribution',
      note: 'copy ScriptHookRDR2.dll and dinput8.dll (the ASI loader) from its zip next to RDR2.exe' },
    { id: 'gmod-x86-64', note: "Steam > Garry's Mod > Properties > Betas: pick x86-64 (the 64-bit gmod_win64.exe)" },
  ],
  install: [
    { game: 'rdr2', strategy: 'game-dir-snapshot', loader: 'scripthookrdr2', files: [
      { src: zip.name, dst: '{game}', root: 'RDR2', unpack: true, contents: zip.contents, ...dl(zip, urls) },
    ] },
    { game: 'gmod', strategy: 'game-dir-snapshot', files: [
      { src: zip.name, dst: '{game}', root: 'GarrysMod', unpack: true, contents: zip.contents, ...dl(zip, urls) },
    ] },
  ],
  // RDR2 first (story mode loaded), then GMod: what upstream's launcher and play_gmod.bat do. No port to wait on.
  launch: [
    { game: 'rdr2', args: [] },
    { game: 'gmod', exe: 'gmod_win64.exe', args: ['-windowed', '-novid', '-condebug', '+maxplayers', '1', '+map', 'gm_flatgrass'] },
  ],
  files: assets.map(a => ({ name: a.name, ...dl(a, urls) })),
  source: { repo: UP.repo, license: 'MIT', upstream_license: UP.license, tag: UP.tag, commit: UP.commit, hosted: `https://github.com/SIGFAI/${ID}` },
  media: {},
  built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-05T00:00:00.000Z',
  ...card(UP.repo),
  notes: [
    "You need both games on PC: Red Dead Redemption 2 (Steam, Rockstar or Epic) and Garry's Mod (Steam). Windows 64-bit.",
    `Install Script Hook RDR2 yourself (${SHRDR2.page}): copy ScriptHookRDR2.dll and dinput8.dll next to RDR2.exe. It may not be redistributed, so the app does not ship it.`,
    "Switch Garry's Mod to the x86-64 branch (Steam, Properties, Betas) so gmod_win64.exe exists.",
    'Set RDR2 to windowed borderless (or windowed). On NVIDIA with RDR2 filling the monitor: NVIDIA Control Panel > Manage 3D settings > Red Dead Redemption 2 > Vulkan/OpenGL present method: Prefer layered on DXGI Swapchain (or run RDR2 on DirectX 12).',
    "Press Play: RDR2 starts first; load story mode and wait for \"Garry's Redemption: waiting for GMod\". Then Garry's Mod starts (gmod_win64.exe, windowed, gm_flatgrass, 1 player); if it does not, run play_gmod.bat in the Garry's Mod folder. GMod's window hides itself once linked. F9 hands the player to RDR2 and back.",
    "Story mode only: the plugin switches itself off in any online session, and Script Hook RDR2 closes the game if you go online.",
    "The app writes GarrysRedemption.asi into the RDR2 folder and the module, addon and play_gmod.bat into the Garry's Mod folder; Restore removes them. The author's own launcher (GarrysRedemptionPassthrough.exe) is not installed.",
    'Beta, played on one PC (Windows 11, NVIDIA, Vulkan): look stutter, no exclusive fullscreen, untested on AMD and DX12. Report bugs to the author on the upstream issue tracker.',
  ],
});

emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
