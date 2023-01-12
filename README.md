Node
npm start -- -p 'PORT' -m 'MODE'
node index.js -p 'PORT' -m 'MODE'

Nodemon
npm run nodemon -- -p 'PORT' -m 'MODE'
nodemon index.js -p 'PORT' -m 'MODE'

Forever
forever -w start index.js -- -p 'PORT' -m 'MODE'

PM2
pm2 start index.js --watch --name 'SERVER-NAME' -- -- -p 'PORT' -m 'MODE'
