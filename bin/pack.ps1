npm run build
remove-item -re www
new-item -it d www
new-item -it d www/app
copy-item -re dist/* www/app
compress-archive -force www venus-data.zip
remove-item -re www
