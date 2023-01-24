---
layout: '../../layouts/SnippetPost.astro'
title: 'Command line stuff'
description: 'Usefull Command line, bash, SSH stuff'
pubDate: 'Jan 6 2023'
---

##### Command line

| command                                               | Explanation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cd -`                                                | go back                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `mkdir -p './oneleve/{a,b,c}/{c,d}'`                  | Create folder hierarchy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `rm -rf dirname`                                      | Remove dir with contents                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `find . -name testfile.txt`                           | Find a file called testfile.txt in current and sub-directories.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `find /home -name *.jpg`                              | Find all .jpg files in the /home and sub-directories.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `find . -type f -empty`                               | Find an empty file within the current directory.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `find /home -user exampleuser -mtime -7 -iname ".db"` | Find all .db files (ignoring text case) modified in the last 7 days by a user named exampleuser.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `find . -name "*.bak" -delete`                        | Careful!! To delete the files that end up matching your search, you can add -delete at the end of the expression. Do this only when you are positive the results will only match the files you wish to delete.                                                                                                                                                                                                                                                                                                                |
| `find . -type f -exec grep "example" '{}' \; -print`  | This searches every object in the current directory hierarchy (.) that is a file (-type f) and then runs the command grep "example" for every file that satisfies the conditions. The files that match are printed on the screen (-print). The curly braces ({}) are a placeholder for the find match results. The {} are enclosed in single quotes (') to avoid handing grep a malformed file name. The -exec command is terminated with a semicolon (;), which should be escaped (\;) to avoid interpretation by the shell. |

##### Package mnagement

You probably have unused packages.

`NPX depcheck` scans your entire codebase for unuswed packages
`NPX depcheck --online` is convenient to remove them with
`npm unistall [packages]`

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

## CURL

Get request with curl

`curl <url>`

Get headers

`curl -v <url>`

Have curl follow redirect

`curl -L <url>`
