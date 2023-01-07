---
layout: '../../layouts/SnippetPost.astro'
title: 'SSH'
description: 'Usefull SSH stuff'
pubDate: 'Jan 6 2023'
---

## SSH

## List rsa file connected to repo localy

ssh-add -L (<-- or -l)

### Add rsa to local repository

ssh-add -K ~/.ssh/id_skf

### Generating a new ssh key (macos)

<https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agentx>§

## Have multiple Git accounts

### In ssh config

```bash
# Personal account, - the default config
Host github.com-personal github account
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_ed25519

# Work account
Host workSKF github account
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_skf
```

### In global git config

```text
[alias]
 lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
[user]
 email = nicolas@hervy.se
 name = Nicolas Hervy
[includeIf "gitdir:~/Documents/SKF/"]
    path = ~/Documents/SKF/.gitconfig
```

### In git config in local folder

```text
[alias]
 lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
[user]
 email = nicolas.hervy@skf.com
 name = Nicolas Hervy
```

Then clone with `git clone workSKF:skfccoe/rep-document-bundles.git`

<https://gist.github.com/jexchan/2351996/>
<https://www.section.io/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/>
<https://gist.github.com/bgauduch/06a8c4ec2fec8fef6354afe94358c89e>
