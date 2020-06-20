# Mirror

## About
This project was originally created because I needed a better way of managing my DotFiles repo. I originally considered symlinking all my managed dotfiles to a repo somewhere on my filesystem, but ended up not loving that idea (becasue some folders such as .config/fish may have both tracked/untracked files), so I created this utility which easily manages difference-handling while copying a file. It verifies with the user that the difference is expected, and overwrites upon verification. It can also be used as a very quick diff tool by using the -d option. The following is the output of --help:
```
Usage: mirror [options] <srcFile> <dstFile>

Mirror srcFile with dstFile, showing differences and prompting for user input before overwriting

Options:
  -V, --version              output the version number
  -d, --diff                 Only show a diff; do not attempt to replace dstFile
  -f, --force                Force overwrite; do not prompt for confirmation
  -m, --method [diffMethod]  Diffing method to use, options: chars, words, lines (default: "chars")
  -h, --help                 display help for command
```