import { useParams } from "react-router-dom";
import { BackLink } from "./navigation.jsx";
import { POSTS } from "./posts.jsx";

export default function Post() {
  const { slug } = useParams();
  const i = POSTS.findIndex((p) => p.slug === slug);
  const post = POSTS[i];
  if (!post) return <NotFound />;
  const { Body } = post;
  const newer = POSTS[i - 1];
  const older = POSTS[i + 1];

  return (
    <article className="page">
      <div className="wrap page__wrap">
        <BackLink fallback="/notes/" />
        <p className="page__meta">
          <a href="/notes/">Field notes</a>
          <time>{post.date}</time>
        </p>
        <h1 className="page__title">{post.title}</h1>
        <div className="prose">
          <Body />
        </div>
        <nav className="page__pager" aria-label="More field notes">
          {older ? <a href={`/notes/${older.slug}/`}><span>Older</span>{older.title}</a> : <span />}
          {newer ? <a href={`/notes/${newer.slug}/`} className="page__pager--next"><span>Newer</span>{newer.title}</a> : <span />}
        </nav>
        <p className="page__byline">
          Written by <a href="/about/">Lawrence Okolo</a>, machine learning engineer and co-founder of VASI Systems.
        </p>
      </div>
    </article>
  );
}

export function NotFound() {
  return (
    <section className="page">
      <div className="wrap page__wrap">
        <h1 className="page__title">Page not found.</h1>
        <p className="prose"><a href="/">Back to the homepage</a></p>
      </div>
    </section>
  );
}

export function NotesIndex() {
  return (
    <section className="page">
      <div className="wrap page__wrap">
        <BackLink />
        <p className="page__meta"><a href="/">Lawrence Okolo</a><span>Field notes</span></p>
        <h1 className="page__title">Field notes from the lab and the stage.</h1>
        <ol className="notes-index">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <time>{p.date}</time>
              <a href={`/notes/${p.slug}/`}>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
