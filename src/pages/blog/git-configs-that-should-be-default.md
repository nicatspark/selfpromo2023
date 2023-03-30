---
layout: '../../layouts/BlogPost.astro'
title: 'Three git configurations that should be default'
description: 'Three configurations that should be standard for anyone using git.'
pubDate: 'Mar 30 2023'
#heroImage: '/assets/blog/typefaces.webp'
---

Three configurations that should be standard for anyone using git.

```bash
git config --global pull.rebase true
git config --global fetch.prune true
git config --global diff.colorMoved zebra
```

### Pull with Rebase

This configuration will make pull commands rebase instead of merge:

```bash
git config --global pull.rebase true
```

When there are remote changes that are not on your local branch, they need to be resolved. The default Git behavior is merging, which will create a new commit on your local branch that resolves those changes.

This configuration switches that behavior to the rebasing strategy. With rebasing, new commits will be created for the changes on your local branch that start after the changes on the remote branch. To learn more, I’d suggest Git Merging vs. Rebasing: The Beginner’s Guide.

Working with a pair? Rebasing when pulling makes the branch history cleaner. And you can avoid merge commits when pulling in your pair’s work from remote to your local branch.

### Prune on Fetch

This configuration will automatically clean Git objects in your repository locally whenever you fetch changes from remote.

```bash
git config --global fetch.prune true
```

If this configuration is set, running git fetch will also run git remote prune afterwards. git remote prune will delete inaccessible Git objects in your local repository that aren’t on remote. Deleting branches on remote but not locally will generate these inaccessible Git objects.

Having this option enabled minimizes the number of branches I have on my local machine. Any autocomplete feature that uses this list of branches is much easier to use with limited branches hanging around.

### Differentiate Moved Lines

This configuration adds extra colors when running git diff to show blocks of lines that remain unchanged but have moved in the file.

```bash
git config --global diff.colorMoved zebra
```

By default, the diff expresses the changes as additions and deletions, with green and red denoting the operation done to a line. The additional colors help differentiate actual changes and lines moving around due to those changes.

Since turning on this configuration, I’ve found diffs much easier to read. I’m able to focus on the lines of code that actually changed and brush over blocks of code that are just moving around. Diffs are much more meaningful when I have a way to focus on what really changes.

### Bonus

Set `git config –global push.default simple` if you want to only push current branch.
