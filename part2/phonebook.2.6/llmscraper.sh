#!/bin/bash



myfunc() {
        tree . -L 1
    tree ./src/ -L 1
    find ./src/ -type f | while read -r file; do
            echo "reading file: $file"
            cat "$file"
    done
    cat package.json
}


# for string comparison, use "=="
# myfunc | tee 1>(xclip -selection clipboard) (this would be piping vs below is process substitution)
# use tee if you want to also print the info
# myfunc | tee >(xclip -selection clipboard)
if [[ "$1" == "-wc" ]]; then
myfunc | wc -l
else
myfunc | xclip -selection clipboard
fi
