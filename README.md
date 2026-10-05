# April's Portfolio

A static, white "heaven" themed portfolio: gate-opening loading screen, yellow cursor glow, animated buttons, and a dashboard with About me, Communities, and Contact me.

## Files
- `index.html` page structure
- `style.css` theme and animations
- `script.js` **your info lives here** (communities, roles, pictures, contacts)
- `vercel.json` security headers and caching
- `images/` your pictures

## Edit in VS Code (Windows)
1. Install VS Code from code.visualstudio.com.
2. File > Open Folder > choose this folder.
3. Install the **Live Server** extension, right-click `index.html` > Open with Live Server.

## Customize
- In `script.js`, replace `YOUR_USERNAME`, `YOUR_DISCORD_ID`, and `you@example.com`.
- Add a picture: copy the file into `images/`, then set `image: "images/bloxcrow.png"` for that community. Empty = "No pictures found" is shown.
- Change roles by editing the `role:` text.

## Deploy free on Vercel
1. Create a free GitHub account and a new repository; upload this folder's files (or use GitHub Desktop).
2. Go to vercel.com, sign up with GitHub, click **Add New > Project**, import the repo.
3. Framework Preset: **Other**. Leave build settings empty. Click **Deploy**.
4. Every time you push changes to GitHub, Vercel redeploys automatically.

## Security and DDoS: what is real
- The site is **fully static**: no server, database, forms, or login, so there is almost nothing to attack.
- Vercel's network provides automatic DDoS mitigation on every plan, including free. No code can add more than that.
- `vercel.json` adds a strict Content-Security-Policy, HSTS (forces HTTPS), anti-clickjacking, anti-MIME-sniffing, and a locked-down Permissions-Policy.
- All links to other sites use `rel="noopener noreferrer"`. User-facing text is inserted safely (no `innerHTML`).
- Extra steps in the Vercel dashboard: turn on **Attack Challenge Mode** (Project > Firewall) if you ever get hit, and enable 2FA on GitHub and Vercel.
- If you want to show images from other websites, add that domain to `img-src` in `vercel.json`.
