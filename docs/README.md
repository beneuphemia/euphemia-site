# Website wiki

How to maintain the Euphemia marketing site.

## Where things are

- Copy (all wording): `content/site.ts`
- Science claims and references: [Science](science.md)
- Design tokens (colors, fonts): `app/globals.css`
- Animations: `components/`
- Git workflow and review rules: repo `README.md`
- Agent rules: repo `AGENTS.md` (euph-site-agent)

## Pages

- [Development](development.md): run it and change stuff
- [Science](science.md): keep the science correct

## Wiki mirror

The GitHub wiki mirrors this folder. After editing a page here, sync it:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\sync-wiki.ps1
```
