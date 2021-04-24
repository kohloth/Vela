# Installation and configuration

``` 
// First time set up
git config --global user.name "John Doe"
git config --global user.email johndoe@example.co
git config --global core.editor emacs

// View config
git conifg --list
git config user.name
```

# Help and info

``` 
git help  / man git 
git status
git status -s // less verbose version
git diff // show diff between working directory and staged
git diff --staged / git diff --cached // show diff between staged and last commit
git difftool // view differences in currently nominated diff tool.
git difftool --tool-help // view available diff tools.
git mergetool --tool-help // view available merge tools.
git log // view all commits
git log -3 // only view 3 latest commits
git log -p // view difference between commits
git log --stat // only show the files that were changed between commits
git log --pretty=oneline // shorter format showing files that were changed between commits
git log --pretty=format:"%h - %an, %ar : %s" // custom format showing files that were changed between commits
git log --graph // view commit history as branch/merge graph
git log -p -S  // only show commits that added or removed  within the code
git log --stat <path expression> // only show commits that added or removed code to files within the path expression
git log --oneline --decorate --graph --all // it will print out the history of your commits, showing where your branch pointers are and how your history has diverged.
git remote // view remote repos that are configured for this git repo. "origin" is the default name git gives to the server you cloned from, if applicable.
git remote -v // also show remote server address
git remote show // show remote data, including which remote branches your don't have, and which branches you have that remote does not have etc.
git tag // view all git tags, in alphabetical order
git tag -l 'foobar*' // show all tags that match the pattern specified
git show  // displays full tag info for 
git branch // view all branches
git branch -a // view all branches, include remote branches
git branch -v // view all branches, verbose mode
git branch --merged / git branch --no-merged // shows a list of branches that are, or are not, merged into the branch you are currently on
```

# Initialising a local repo

``` 
// New
git init
git add -a .
git commit -m "Initial"

// Clone from server ( may be ssh address i.e. user@domain/project.git)
git clone  [<local target dir>]
```

# The working directory

``` 
git checkout -- <file expression> // discards changes in working directory to file, and overwrites them with how they are in the last commit.
git reset --hard HEAD // discards all changes in working directory, and overwrites them with how they are in the last commit.
git reset --hard f414f31 // discards all changes in working directory, and overwrites them with how they are in commit f414f31
```

# The staging area

``` 
// Adding files
git add file1.txt file2.txt file3.txt...
git add *.txt
git add myDir
git add myDir*.txt
git add -u . // all modified files
git add -a . // all new files
git add -f . // all files even if they meet the ignore criteria

// Removing files
git rm <file expression> // removes file from working area, if it is still present there, and stages the file to be deleted. (It will not be present in the next commited snapshot.)
git rm -f <file expression> // even removes files that are already staged / indexed
git rm --cached <file expression> // removes file from staging area (and next commit?), but keeps it within your working directory

// Moving files
git mv  
-or-
mv  
git rm 
gita add 

// Unstaging staged files
git reset HEAD <file expression>
```

# Committing files

``` 
git commit / git commit -m "Message..."
git commit -v // adds the diff to the top of the editor in a comment to help you see what has changed
git commit -a // adds all TRACKED files to the staging area and commits in one step
git commit --ament // Overwrites the last commit with the contents of the current staging area, and lets you retype your commit message.
```

# Branches

``` 
git branch ; git checkout  / git checkout -b  // create branch and set it as the current working one
git branch -d  // deletes branch. Useful for once a temporary branch has been merged into master.
git checkout master; git merge hotfix // merges hotfix branch into master.
git push origin --delete serverfix // delete remote branch

To fix a merge conflict:
1a. Use git status to see which files are in a conflicted state.
1b. Or use `git diff --name-only --diff-filter=U`

2. Edit the files manually, removing the merge conflict markers in each section, replacing them with the desired code. (You can also use git mergetool)
3. Use git add to mark the file as conflict-resolved.
4. Commit.

To rebase:

1. First checkout the branch you want to replay commits onto: git checkout 

2, Next, reapply the commits from  onto it: git rebase master
```

# Tags

``` 
git tag -a  -m "Annotation message..."
git tag -a  -m "Annotation message..." <commit hash> // tag old commit
git push origin  // push specific tag only
```

# Git ignore

``` 
The rules for the patterns you can put in the .gitignore file are as follows:

* Blank lines or lines starting with # are ignored.
* Standard glob patterns work.
* You can start patterns with a forward slash ( / ) to avoid recursivity.
* You can end patterns with a forward slash ( / ) to specify a directory.
* You can negate a pattern by starting it with an exclamation point ( ! ).

Examples:

# no .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory
doc/**/*.pdf

A good source for sample .gitignore files: https://github.com/github/gitignore
```

# Remote repos

``` 
git remote add   // add a remote
git remote rename  
git remote rm 
git fetch [] // pulls all data from  server. Note that this is safe, and does not merge or overwrite anything. It just makes it available.
git pull [] // pulls data from server AND tries to merge with your current code.
git push  [] // pushes local commits to remote branch on remote server. NB if someone has pushed before you, this will be rejected - you must pull first.
git push origin --tags // general push, with all tags
```

# Clustom aliases

``` 
// adding custom aliases
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

# Gotchas

``` 
When using file globbing expressions on the command line, be sure to escape special characters from being parsed by the cli,
so that the expression goes straight to the git program.
i.e. git rm log/\*.log.

This command overwrites what is in your working directory. Use with caution.
git checkout -- <file expression>

HEAD == the currently checked out branch
```
