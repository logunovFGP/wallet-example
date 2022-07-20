#!/bin/sh

if [ "$5" = "--migrate" ] ; then
  migrate=1
fi

ssh -t -t root@$1 <<EOF
cd $2
git pull origin $3
npm i

if [ "$migrate" == "1" ] ; then
   npm run db:migrate
fi

systemctl restart $4
exit
EOF