```bash
#!/bin/bash

# create test directory
createDir() {
        for i in `seq 1 3`; do
           mkdir test$i
           touch test$i/file
        done
}

# gzip the backup directory
uglify() {
        path=/data/backup/*
        for f in $path; do
                if [ -d $f ]; then
                        tar -czf "$f".tar.gz $f
                        echo $f gzip ok
                        rm -rf $f
                fi
        done
}

# rename  a:b:c.tar.gz to a.b.c.tar.gz
changeFileName() {
        for f in /data/backup/*.tar.gz; do
                rename : . $f
        done
}

case $1 in
        changeFileName)
                changeFileName
                ;;
        createDir)
                createDir
                ;;
        uglify)

                uglify
                ;;
        *)
                uglify
                ;;
esac

exit 0
```