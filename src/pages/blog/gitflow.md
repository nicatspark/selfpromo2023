---
layout: '../../layouts/BlogPost.astro'
title: 'Use Gitflow to standardize your development'
description: ''
pubDate: 'Apr 11 2023'
#heroImage: '/assets/blog/typefaces.webp'
---

Git flow is a branching model for Git version control system, which is designed to help streamline the process of software development. It was created by Vincent Driessen and has since become a popular model for managing large and complex software projects.

The Git flow model uses two main branches: `master` and `develop`. The master branch represents the production-ready code, while the develop branch is used for ongoing development work.

In addition to the master and develop branches, Git flow also defines several types of supporting branches, including feature branches, release branches, and hotfix branches. Feature branches are used to develop new features, release branches are used to prepare a new version of the software for release, and hotfix branches are used to fix critical bugs in the production code.

Git flow provides a clear and well-defined set of rules for managing the branching and merging of code changes, which helps to reduce the risk of conflicts and errors during the development process. By following these rules, teams can work more efficiently and effectively, with each member knowing exactly what they are responsible for and what steps they need to take to contribute to the project.

### Gitflow cheat sheet

#### Initialize

Start using git-flow by initializing it inside an existing git repository.

`git flow init`

You'll have to answer a few questions regarding the naming conventions for your branches.
It's recommended to use the default values.

#### Start a new feature

Development of new features starting from the 'develop' branch.
Start developing a new feature with

`git flow feature start MYFEATURE`

This action creates a new feature branch based on 'develop' and switches to it.

#### Finish up a feature

Finish the development of a feature. This action performs the following

- Merges MYFEATURE into 'develop'
- Removes the feature branch
- Switches back to 'develop' branch

`git flow feature finish MYFEATURE`

#### Publish a feature

Are you developing a feature in collaboration?
Publish a feature to the remote server so it can be used by other users.

`git flow feature publish MYFEATURE`

#### Getting a published feature

Get a feature published by another user.

`git flow feature pull origin MYFEATURE`

You can track a feature on origin by using

`git flow feature track MYFEATURE`

### Make a release

#### Start a release

To start a release, use the git flow release command. It creates a release branch created from the 'develop' branch.

`git flow release start RELEASE [BASE]`

You can optionally supply a [BASE] commit sha-1 hash to start the release from. The commit must be on the 'develop' branch.

It's wise to publish the release branch after creating it to allow release commits by other developers. Do it similar to feature publishing with the command:

`git flow release publish RELEASE`

(You can track a remote release with the `git flow release track RELEASE command`)

#### Finish up a release

Finishing a release is one of the big steps in git branching. It performs several actions:

- Merges the release branch back into 'master'
- Tags the release with its name
- Back-merges the release into 'develop'
- Removes the release branch

`git flow release finish RELEASE`

Don't forget to push your tags with `git push origin --tags`

### Hotfixes

Hotfixes arise from the necessity to act immediately upon an undesired state of a live production version
May be branched off from the corresponding tag on the master branch that marks the production version.

`git flow hotfix start`

Like the other git flow commands, a hotfix is started with

`git flow hotfix start VERSION [BASENAME]`

The version argument hereby marks the new hotfix release name. Optionally you can specify a basename to start from.

#### Finish a hotfix

By finishing a hotfix it gets merged back into develop and master. Additionally the master merge is tagged with the hotfix version.

`git flow hotfix finish VERSION`

### Finally

- Not all available commands are covered here, only the most important ones.
- You can still use git and all its commands normally as you know them, git flow is only a tooling collection.
- The 'support' feature is still beta, using it is not advised.
- If you'd like to supply translations I'd be happy to integrate them.
