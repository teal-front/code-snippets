```bash
#!/bin/bash

# author: teal
# time: 20170908

apps=('app-node' 'app-node-cps' 'app-node-cps-pc' 'app-node-agent' 'app-node-weshop' 'app-node-shop')

for app in ${apps[@]}; do
        pm2 delete "/data/$app/$app.json"
        echo '-----------------------------------------'
        echo "- $app - had been DELETE."
        pm2 start "/data/$app/$app.json"
        echo '-----------------------------------------'
        echo "- $app - had been START."
done


exit 0
```