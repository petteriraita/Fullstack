#!/bin/bash

myfunc() {
    # find ./* \( -type d ! -iname "node*" -prune -print -printf '  << pruned directory\n' \) -o \( -type f -print -printf '  << actual file \n' \) | while read file; do
    find ./* \( -type d ! -iname "node*" -prune \) -o \( ! -iname "*lock*" -type f \) | while read file; do
    if [[ -f "$file" ]]; then
        echo -e "\n\n<<<FILE_START name=$file>>>\n"
        cat "$file"
        echo -e "\n\n<<<FILE_END>>>\n"
        fi
    done
}

myfunc | xclip -selection clipboard