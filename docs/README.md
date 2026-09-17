# Website wiki

How to maintain the Euphemia marketing site.

## Where things are

- Copy (all wording): `content/site.ts`
- Science references: `REFERENCES.md`
- Design tokens: `app/theme.ts` and `app/globals.css`
- Animations: `components/`
- Git workflow: repo `README.md`

## Pages

- [Development](development.md): run it and change stuff
- [Science](science.md): keep the science correct

## Wiki mirror

The GitHub wiki mirrors this folder. After editing a page here, sync it:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\sync-wiki.ps1
```
