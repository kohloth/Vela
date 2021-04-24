# Bash cheatsheet

Bash is a Unix shell and command language written by Brian Fox for the GNU Project as a free software replacement for
the Bourne shell. First released in 1989, it has been distributed widely as the default login shell for most Linux
distributions and Apples macOS (formerly OS X). A version is also available for Windows 10. It is also the default user
shell in Solaris 11.

# Basic I/O

`tail -f /var/log/mylog.txt`
Watch log interactively

# Terminal config

`black|blue|green|cyan|red|magenta|yellow|white|default`
Accepted humanly-readable colour identifiers

`setterm -term linux -back (colour) -fore (colour)`
Changes colours of terminal

`tput init`
Resets colours of terminal

# Getting system info

`hostname`
Print computers name succinctly

`lsb_release -a`
Print OS version

`ip addr show`
Print net work addresses

`ifconfig`
Print network adaptor information

`ls /etc/init.d`
List services

# Network tools

`ping www.google.com`
Check internet connection speed with specified host

`dig hostname.com`
Get the IP address for the specified domain

# Managing email I/O

`mail -s "A subject" foo@bar.com &lt; file.txt`
Send an email with file.txt as the email body

`echo "This is a test" | mail -s "A test email" foo@bar.com`
Send stdin to specified address

# Rsync

`a`
Flag. Archive mode. Combines flags rlptgoD. Recurses, follows symlinks etc.

`v`
Flag. Verbose output mode.

`P`
Flag. Combo of flags --progress and --partial. Shows progress during transfer, and keeps partially transferred
files.

`n`
Flag. Dry run.

`--delete`
Flag. Deletes files from the destination directory that are not in the source directory.