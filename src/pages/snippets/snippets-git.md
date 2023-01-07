---
layout: '../../layouts/SnippetPost.astro'
title: 'Git stuff'
description: 'Usefull git commands'
pubDate: 'Jan 6 2023'
---

#### "Restart" git after git ingore updated

```bash
  git rm -rf --cached .
  git add .
```

#### Visa alla brancher som innehåller branch

`git branch --contains [branch/tag/commit]`

## Rensa upp

#### Rensa locala brancher som tagits bort på remote.

`git fetch upstream --prune`

#### Rensa remote på brancher som tagits bort lokalt.

`git remote prune origin --dry-run`
`git remote prune origin`

#### Rensa Working directory

`git clean -i`

#### Undvik uppdatera stagade filer

`git checkout -- app/public/libs/flex_slider`
`git clean -i`

## Ångra

#### Ångra commits

`git reflog map-gui`
`git reset --hard map-gui{4}`
(Use --soft to copy changes from another branch)

#### Ta bort modifikation i workdir

`git checkout -- [filnamn]`

#### Visa filer i en commit

`git show --numstat`

#### Flow

`git push -u origin dialog-styling`
`git fetch upstream/dev-2.8`
`git checkout -b upstream/dev-2.8 new_branch`
`git diff upstream/release/3.1`

#### Create branch

`git fetch origin`
`git checkout origin/main -b [new branch]`

### Pull branch from remote

```bash
git fetch origin
git branch -v -a
git switch -c test origin/test
```

(more info on switch ->) man git-switch

_prior to git 2.23_

`git checkout --track origin/daves_branch`

#### Checkout or diff between two branches on specific file

`git diff [branch1] [branch2] -- [filepath]`

#### Update submodule

`git submodule update`

#### Uppdatera master

`git fetch --all`
`git checkout main`
`git pull origin main`

#### Flytta master downstream (framåt)

`git checkout [branch mest upstream (bak)]`
`git merge [downstream branch] --ff-only`

#### Flytta lokal master upstream

`git reset --hard origin/master`

#### Uppdatera origin

`git pull upstream master`
`git push origin master (-f)`
`git fetch --prune upstream`

#### Rename local & remote branches

`git branch -m old-name new-name`
`git push origin :old-name new-name`

#### reset upstream branch for the new-name

`git push origin -u new-name`

#### Squash merge commit

`git checkout master`
`git merge --squash bugfix`
`git commit`

#### Squash rebase

`git rebase -i HEAD~4`

#### Squash all your commits (in your branch) and reset the index to maincode

```bash
git checkout yourBranch
git reset $(git merge-base master $(git rev-parse --abbrev-ref HEAD))
git add -A
git commit -m "one commit on yourBranch"
```

#### Search in commits

`git log -S [search string]`

#### Titta gammal kod

`git show [branch]:[fill]>temp.txt`

#### Add remote upstream

`git remote <- check`
`git remote -v`
`git remote add upstream [clone repo from github]`
`git fetch upstream`

#### Tag

`add: git tag -f [tagname]`
`delete: git push upstream :[tagname]`
`push: git push (-f) upstream [tagname]`

#### Update from upstream/master

`git reset --hard upstream/master`

#### Ångra rebase (ej pushad)

`git checkout [branch som ska flyttas]`
`git reset [origin/branch] --hard`

#### Go back in history

`git reflog HEAD@{2}`
`git reset HEAD --hard`

#### Flytta flera commits i grupp

`git rebase [branch1] [branch2] --onto [branch att flytta ovanpå]`

#### Checka ut branch

`git checkout -b [branch name] upstream/[branch name]`

#### Delete branch on remote

`git push upstream :[branch]`
`git push upstream --delete [branch]`

#### Push branch and delete local

`git push upstream [branch] -d`

#### Undo reset --hard

Only the changes to branch and HEAD can be undone, this way

`git reset --hard <expr> # do`
`git reset HEAD@{1} #undo`
`git stash`

If you made lot of things after your git reset --hard, then you should search your commit using reflog

#### git reflog for HEAD:

`git reflog`

#### git reflog for any branch:

`git reflog <branchname>`

#### Find the commit sha, and use it on git reset:

`git reset <SHA>`
`git stash`

#### Commit empty commits

`git commit --allow-empty -m "This is empty"`

#### Automate the cleanup of my feature branch with Git Autosquash

`git commit --fixup [sha of commit to merge with later]`

#### more commits, instead of giving sha do search of where [word] is in comit msg

`git commit --fixup :/update <- if update is a word in your merge target cmt msg.`

## Finally

`git commit --fixup :/update`
`git rebase -i --autosquash [sha that covers some commits]`

## VIM

```text
i = insert mode
esc = gå ur insert mode
:x = spara och stäng
:q = stäng
```

## Terminal

#### List and kill process

```bash
lsof -i :[port number] // replace with port number.
kill [pid]             // replace with process id.
```

#### Clear screen and back buffer

`clear && echo -en "\e[3J"`

or store in a alias

`alias cls='clear && echo -en "\e[3J"'`

#### List your aliases

`git config --get-regexp alias`

My current aliases:

```bash
alias.lg log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
alias.next checkout
```

#### Partial cherry-pick

Credits to https://stackoverflow.com/a/5717615/7193150

```bash
git cherry-pick -n $1
git reset HEAD
git add src/
git checkout .
git commit -C $1
```

#### List unused typescript exports

`npx ts-prune | grep -v 'used in module'`

#### Delete node_modules recursively in workdirectory (not git)

Print out a list of directories to be deleted:

`find . -name 'node_modules' -type d -prune`

Delete directories from the current working directory

`find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +`
