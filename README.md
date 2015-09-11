# Cortex

[![Build Status](https://magnum.travis-ci.com/cbdr/cortex.svg?token=sAtZ4frpstZnGHoeyxTz&branch=master)](https://magnum.travis-ci.com/cbdr/cortex)

Cortex is an identity, content distribution/management and reporting platform built by [Content Enablement][cb-ce-github]. Its purpose is to provide central infrastructure for next-generation applications; exposing a single point of management while enabling quicker build-out of new software.

### Initial Setup

Copy the example .env file and modify

```sh
$ cp .env.example .env
```

### Setup - OS X

**Prerequisites:** Xcode, Ruby ([rvm](https://rvm.io/) or [rbenv](https://github.com/sstephenson/rbenv)), [Homebrew](http://brew.sh/)

1. Install all homebrew managed dependencies from the `Brewfile` via `$ brew install $(cat Brewfile|grep -v "#")`
2. Start servers with `launchctl` or [lunchy](https://github.com/eddiezane/lunchy): `$ lunchy start elasticsearch`
3. Install Bundler and dependencies `$ gem install bundler && bundle install`
4. Install Bower and its dependencies `$ npm install -g bower && bundle exec rake bower:install:development`
4. Copy .env.example to .env and edit it to update APP_PATH to current path
5. Create databases by running `rake db:create:all`
6. Run migrations `$ rake db:migrate`
7. Seed database:

```sh
$ rake db:seed
$ rake cortex:create_categories
$ rake cortex:onet:fetch_and_provision
```
Finally, start Cortex: `$ rails s`

### Applications

- [Advice and Resources](https://github.com/cbdr/advice-and-resources) - Redesigned Workbuzz/Advice & Resources platform

[cb-ce-github]: https://github.com/cb-talent-development "Content Enablement on GitHub"
