# Vim cheatsheet

The following list describes a very useful set of vim commands. With knowledge of this set, you will be able to make good use of Vim's power. Once you are familar with these, you will also be in a good position to decide if you wish to develop more specialised proficiency in any of these areas.</p>

|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Keystrokes                      | Effect                                                                                                                                |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Cursor movement                 |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| h                               | Move left                                                                                                                             |
| j                               | Move down                                                                                                                             |
| k                               | Move up                                                                                                                               |
| l                               | Move right                                                                                                                            |
| w                               | Move forward one word (words delimited by spaces and special characters)                                                              |
| W                               | Move forward one word (words delimited by spaces only)                                                                                |
| b                               | Move back one word (words delimited by spaces and special characters)                                                                 |
| B                               | Move back one word (words delimited by spaces only)                                                                                   |
| e                               | Move forward one word (go to end of word) (words delimited by spaces and special characters)                                          |
| E                               | Move forward one word (go to end of word) (words delimited by spaces only)                                                            |
| H                               | Move cursor to head line                                                                                                              |
| M                               | Move cursor to middle line                                                                                                            |
| L                               | Move cursor to last line                                                                                                              |
| CTRL+u                          | Page up half a screen                                                                                                                 |
| CTRL+d                          | Page down half a screen                                                                                                               |
| gg                              | Go to first line                                                                                                                      |
| G                               | Go to last line                                                                                                                       |
| 0                               | Go to start of current line                                                                                                           |
| $                               | Go to end of current line                                                                                                             |
| ^                               | Go to start of current line (first character that is not whitespace)                                                                  |
| %                               | Go to brace or bracket that matches the one that is currently selected                                                                |
| 3w                              | Fowards 3 words
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|                                                                                                                       |
| Screen movement                 |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| CTRL+y                          | Move screen up one line, keeping cursor in current position                                                                           |
| CTRL+e                          | Move screen down one line, keeping cursor in current position                                                                         |
| zt                              | Move screen so that the current line is at the top                                                                                    |
| zb                              | Move screen so that the current line is at the bottom                                                                                 |
| zz                              | Move screen so that the current line is in the middle                                                                                 |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Modes                           |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| i                               | Go into insert mode in a position after the current position                                                                          |
| a                               | Go into insert mode in a position before the current position                                                                         |
| I                               | Go into insert mode at the beginning of the current line                                                                              |
| A                               | Go into insert mode at the end of the current line                                                                                    |
| o                               | Go into insert mode in a new line below the current line                                                                              |
| O                               | Go into insert mode in a new line above the current line                                                                              |
| ESC                             | Come out of insert mode, and go back into normal mode                                                                                 |
| V                               | Go into visual line mode                                                                                                              |
| CTRL+v                          | Go into visual block mode                                                                                                             |
| :                               | Enter a single command (terminated by pressing return)                                                                                |
| Q                               | Go into permanent command mode (aka ex mode). (exited by entering the command "visual")                                               |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Deleting                        |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| x                               | Delete the character under the cursor                                                                                                 |
| X                               | Delete the character before the cursor                                                                                                |
| dd                              | Delete the current line                                                                                                               |
| dj                              | Delete the line above                                                                                                                 |
| dk                              | Delete the line below                                                                                                                 |
| d5j                             | Delete the 5 lines immediately below                                                                                                  |
| dw                              | Delete word (words delimited by spaces and special characters)                                                                        |
| dW                              | Delete word (words delimited by spaces only)                                                                                          |
| db                              | Delete previous word                                                                                                                  |
| d$                              | Delete to the end of current line                                                                                                     |
| d0                              | Delete to start of current line                                                                                                       |
| dap                             | Delete (around) paragraph                                                                                                             |
| Editing                         |
| rx                              | Replace the current character with character x. x is arbitrary. i.e. ry would replace the current character with y.                   |
| cw                              | Go into insert mode, replacing from the current position to the end of the word.                                                      |
| c$ | C                          | Go into insert mode, replacing from the current position to the end of the line.                                                      |
| u                               | (When in visual mode, having made a selection) Convert selected content to lowercase                                                  |
| U                               | (When in visual mode, having made a selection) Convert selected content to uppercase                                                  |
| ~                               | (When in visual mode, having made a selection) Convert selected content to contracase                                                 |
| u                               | Undo                                                                                                                                  |
| CTRL+r                          | Redo                                                                                                                                  |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Finding / Finding and replacing |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| /                               | find next match of what is typed next                                                                                                 |
| ?                               | Find previous match of what is typed next                                                                                             |
| n                               | Go to next match                                                                                                                      |
| N                               | Go to previous match                                                                                                                  |
| fx                              | Go to next x character on the current line. x is arbitrary. i.e. fy would move to character y.                                        |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Yanking and putting             |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| yy                              | Yank current line (to unnamed register)                                                                                               |
| yw                              | Yank word (to unnamed register)                                                                                                       |
| p                               | Put value from unnamed register after cursor or current line                                                                          |
| P                               | Put value from unnamed register before cursor or current line                                                                         |
| "qyy                            | Yank current line to register q                                                                                                       |
| "qp                             | Put value from register q after cursor or current line                                                                                |
| "qP                             | Put value from register q before cursor or current line                                                                               |
| y                               | (When in visual mode, having made a selection) Yanks current selection to unnamed buffer                                              |
| "qy                             | (When in visual mode, having made a selection) Yanks current selection to buffer q                                                    |
| "+gP                            | Paste from system clipboard                                                                                                           |
| "+yy                            | Yank current line into system clipboard                                                                                               |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Buffers                         |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| :edit foo.txt                   | Opens a file called foo.txt for edting. It may be a new file or an existing file.                                                     |
| :q                              | Close buffer. Quits vim if no more buffers are left open.                                                                             |
| :q!                             | Aggressive quit. i.e. quit even if there are unsaved changes.                                                                         |
| :w                              | Save                                                                                                                                  |
| :w!                             | Aggressive save.                                                                                                                      |
| :wq                             | Combo: Save and then quit.                                                                                                            |
| :wa                             | Save all open buffers (files).                                                                                                        |
| :sav newfilename.txt            | Saves the current file as newfilename.txt, and opens the new file for editing.                                                        |
| :w newfilename.txt              | Saves the current file as newfilename.txt, but does not switch to that new fileee.                                                    |
| gf                              | Opens the file at the path currently under the cursor, if it exists. Supports a variety of protocols, including http on most systems. |
| :!ls                            | List files in current working directory                                                                                               |
| :ls                             | Lists all open buffers                                                                                                                |
| :b 1                            | Opens buffer 1                                                                                                                        |
| :b foo.txt                      | Opens buffer with name of foo.txt                                                                                                     |
| :bd 1                           | Closes buffer 1                                                                                                                       |
| Splits                          |
| :sp                             | Open horizontal split                                                                                                                 |
| :vs                             | Open vertical split                                                                                                                   |
| CTRL+wl                         | Move to split on the right                                                                                                            |
| CTRL+wh                         | Move to split on the left                                                                                                             |
| CTRL+wj                         | Move to split below                                                                                                                   |
| CTRL+wk                         | Move to split above                                                                                                                   |
| CTRL+w<                         | Make split smaller                                                                                                                    |
| CTRL+w>                         | Make split bigger                                                                                                                     |
| 20CTRL+w<                       | Make split smaller by 20 columns                                                                                                      |
| 20CTRL+w>                       | Make split bigger by 20 columns                                                                                                       |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Folds                           |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| zf                              | (When in visual mode, having made a selection) Create fold consisting of selected content                                             |
| zo                              | Opens current fold                                                                                                                    |
| zd                              | Deletes current fold                                                                                                                  |
| zR                              | Open all folds                                                                                                                        |
| zE                              | Delete all folds                                                                                                                      |
| zj                              | Go to next fold                                                                                                                       |
| zk                              | Go to previous fold                                                                                                                   |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Marks                           |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| ma                              | Create a mark position in this file in registry a                                                                                     |
| mA                              | Create a global mark position in registry A                                                                                           |
| 'a                              | Go to mark a                                                                                                                          |
| 'A                              | Go to mark A                                                                                                                          |
| ]'                              | Go to next lowercase mark                                                                                                             |
| ['                              | Go to previous lowercase mark                                                                                                         |
| ]`                              | Go to previous uppercase mark                                                                                                         |
| `[                              | Go to next upercase mark                                                                                                              |
| :!delmarks                      | Delete all lowercase marks for current buffer                                                                                         |
| `.                              | Go to special mark: Last modified postion                                                                                             |
| ''                              | Go back to last position after jumping                                                                                                |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Autocompletion                  |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| CTRL+n                          | Opens autocomplete dropdown and changes text to the next match.                                                                       |
| CTRL+p                          | Opens autocomplete dropdown and changes text to the previous match.                                                                   |
| TAB                             | Autocompletes the output text with the macro that matches the typed characters. (Snipmate plugin must be installed.)                  |
| Macros                          |
| qa                              | Begins recording macro into registry "a". Recording ends when escape is pressed.                                                      |
| @a                              | Replays macro into registry "a".                                                                                                      |
| 5@a                             | Replays macro into registry "a" five times.                                                                                           |
| CTRL+r=i                        | Echos out variable named "i" when in insert mode.                                                                                     |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Misc commands                   |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| :let i = 1                      | Create a variable called i with a value of 1                                                                                          |
| :let i = i + 1                  | Increase the value of the variable i by 1                                                                                             |
| :scriptnames                    | Prints out a list of all the scripts that have been loaded into the VIM environment (and are affecting its behaviour).                |
| :echo $MYVIMRC                  | Prints the location of the vimrc file.                                                                                                |
| :edit $MYVIMRC                  | A convenient way to edit the vimrc file.                                                                                              |
| :source $MYVIMRC                | Reloads the contents of the vimrc file.                                                                                               |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|