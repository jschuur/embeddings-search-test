# OpenAI Embedding Based Search

An experiment for [LearnByVideo.dev](https://github.com/jschuur/learnbyvideo.dev) using Postgres, [pgvector](https://github.com/pgvector/pgvector), [node-pgvector](https://github.com/pgvector/pgvector-node) and [Drizzle](https://orm.drizzle.team/).

Conclusion: Works well enough, but need a way to weigh the search based on video views and understand what the threshold is for matches that should be shown at all.

Note: Drizzle support for node-pgvector is not yet published, so this [uses the repo directly](https://github.com/pgvector/pgvector-node/issues/10#issuecomment-1622391607) as the dependency.

\- [Joost Schuur](https://joostschuur.com) ([@joostschuur](https://twitter.com/joostschuur))
