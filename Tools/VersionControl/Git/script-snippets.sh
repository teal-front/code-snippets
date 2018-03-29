#!/usr/bin/env bash

## list git oldest branch
for branch in `git branch -r | grep -v HEAD`;
do
    echo -e `git show --format="%ci %cr" $branch | head -1` \\t$branch; 
done | sort -r


  