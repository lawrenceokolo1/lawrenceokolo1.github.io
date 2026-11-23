# Moving the site to lawrenceokolo.com

The site is hosted on GitHub Pages. Moving it to a custom domain takes four steps. Do them in order:
if the code switches before DNS is ready, the site goes offline until DNS catches up.

## 1. Buy the domain

Register `lawrenceokolo.com` with any registrar (Cloudflare, Namecheap, Porkbun, Google Domains'
successor Squarespace). Turn on auto-renew and WHOIS privacy.

## 2. Point DNS at GitHub Pages

In the registrar's DNS settings, add these records and remove any default "parking" records:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `lawrenceokolo1.github.io` |

Check it from a terminal (it can take minutes to a few hours):

```zsh
dig +short lawrenceokolo.com      # should list the four 185.199.x.153 addresses
dig +short www.lawrenceokolo.com  # should show lawrenceokolo1.github.io
```

## 3. Switch the site over

1. **Verify the domain on GitHub** (prevents anyone else claiming it on Pages): GitHub → your
   profile Settings → Pages → Add a verified domain, then add the TXT record it gives you.
2. **Change the site address in code**: in `prerender.js`, set
   `const SITE = 'https://lawrenceokolo.com'`. That one line updates the canonical tags, link
   previews, structured data, sitemap and robots.txt on every page.
3. **Add the CNAME file**: create `public/CNAME` containing just `lawrenceokolo.com`.
4. Commit and push. GitHub Actions rebuilds and deploys.
5. In the repo: Settings → Pages → Custom domain → `lawrenceokolo.com` → Save. Once the
   certificate is issued (up to an hour), tick **Enforce HTTPS**.

Old `lawrenceokolo1.github.io` links keep working: GitHub permanently redirects them to the new
domain, and Google transfers their ranking.

## 4. Get it into Google

1. Open [Google Search Console](https://search.google.com/search-console) → Add property →
   **Domain** → `lawrenceokolo.com`, and add the TXT record it shows to your DNS.
2. Sitemaps → submit `https://lawrenceokolo.com/sitemap.xml`.
3. URL inspection → enter the homepage and About page → **Request indexing**.
4. Optionally add the old `https://lawrenceokolo1.github.io/` property too and use **Change of
   address** to tell Google about the move.

Google usually shows the site within days to a couple of weeks. Check **Performance** in Search
Console to see which searches bring people in.

## Ranking at the top for "Lawrence Okolo"

The site is already set up for this: every page is prerendered HTML (Google reads it without
running JavaScript), each page has its own title and description, there's a sitemap, and the
homepage carries `Person` structured data (name, job, employers, education, location and linked
profiles).

What moves a name search to the top is other sites pointing at this one:

- **Put `lawrenceokolo.com` everywhere you have a profile**: LinkedIn (Contact info → Website),
  GitHub profile, Hugging Face, X, Google Scholar.
- **Link it from your own projects**: the vasi.ca team bio, the AgenticROS README and agenticros.com,
  fery.ca, and your repo READMEs.
- **Ask event organisers to link it**: BC + AI, the Voxel51 workshop and any future talk pages.
- **Keep the name consistent**: always "Lawrence Okolo", the same photo, the same one-line bio.
- **Keep publishing**: every new field note is another page Google can rank.

Other people share the name, so no one can promise the #1 spot. These steps make this site the
strongest result for it.
