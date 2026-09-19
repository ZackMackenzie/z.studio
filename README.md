# tender-insurance-576350.framer.app

An exact copy of the published site, in a Next.js project.

```bash
npm install
npm run dev
```

## What this is

Every page is a file under `public/`, copied from the published site and served
byte for byte by a rewrite in `next.config.mjs`. It renders exactly as Framer
published it, including the parts a rebuild cannot reach - a WebGL canvas, a
component driven frame by frame - because nothing here was interpreted.

3 routes:

- `/`
- `/projects`
- `/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar.`

## What this is not

Source you can edit. The markup is Framer's, minified, alongside its runtime -
you can host it, put your domain on it and add pages of your own around it, but
changing the design means changing it in Framer and exporting again.

For source you can edit, export the React / Next.js tier instead: it rebuilds
the same pages as components with their own stylesheet. It is readable, and it
is not pixel-identical.

## Adding your own pages

Anything you add under `app/` works normally, as long as its route is not one
of the rewrites above - those are answered by the copy before Next sees them.
