# syntax = docker/dockerfile:1

# This repo is both a gem (shadcn-ui) and the Rails app that documents it, which shapes
# the build in three ways that a generated Dockerfile would get wrong:
#
#   1. The Gemfile uses `gemspec`, so bundler evaluates shadcn-ui.gemspec during
#      `bundle install`, and that gemspec builds spec.files from `git ls-files`. There is
#      no .git here -- Coolify strips it from the build context -- so the list comes back
#      empty, the path gem's gemspec stops matching the lockfile, and frozen mode aborts
#      with "The gemspecs for path gems changed". The install therefore runs unfrozen.
#      Versions are still pinned by Gemfile.lock; only the path gem's file list differs.
#      The same gemspec is re-evaluated by bundler/setup at boot, so git ships in the
#      runtime image too. Building spec.files with Dir.glob instead would remove both
#      needs, but that changes what a released gem packages, so it is left alone here.
#   2. Tailwind is built from config/shadcn.tailwind.js, which requires real npm packages
#      (@tailwindcss/forms, typography, aspect-ratio, container-queries, tailwindcss-animate).
#      app/assets/builds is gitignored, so the CSS does not exist until it is built here.
#   3. Rails 7.0, so precompilation wants SECRET_KEY_BASE rather than SECRET_KEY_BASE_DUMMY.

ARG RUBY_VERSION=3.2.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim AS base

WORKDIR /rails

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test"


FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential git pkg-config libsqlite3-dev nodejs npm && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# The gemspec is evaluated at bundle time and requires lib/shadcn-ui/shadcn-ui.rb.
COPY Gemfile Gemfile.lock shadcn-ui.gemspec ./
COPY lib lib
RUN bundle config set --local frozen false && \
    bundle install && \
    rm -rf ~/.bundle "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Tailwind plugins are real npm packages, needed before the CSS build.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN bundle exec bootsnap precompile app/ lib/

# Builds Tailwind (tailwindcss-rails hooks tailwindcss:build into this) and digests assets.
RUN SECRET_KEY_BASE=dummy ./bin/rails assets:precompile


FROM base

# git is needed at RUNTIME as well as at build time: the Gemfile's `gemspec` directive
# makes bundler/setup re-evaluate shadcn-ui.gemspec on every boot, and that gemspec shells
# out to `git ls-files`. Without the binary every process dies in config/boot.rb with
# "There was an error while loading shadcn-ui.gemspec: No such file or directory - git".
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl git libsqlite3-0 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# No persistent volume: every model here is ActiveModel, there are no migrations and no
# schema, so the SQLite file is an empty artefact Rails never writes to.
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log tmp public app/assets/builds
USER 1000:1000

EXPOSE 3000
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
