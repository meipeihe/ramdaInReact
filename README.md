## Describe

This is react web command app implemented with elegant ramda.
I take part in a interview and ask me to write this app with react,
I think the code is beautiful when I use ramda.
Hope you like it, too.

## Install

```bash
$ git clone https://timzhou1227@bitbucket.org/timzhou1227/react-table-command.git
$ cd react-table-command && npm install
$ npm start
$ open http://127.0.0.1:8080
```

## Test

```bash
$ npm run test
```


## How to use
Now, you visit http://127.0.0.1:8080/, and should see a react table commander app.

You can input 'C 5 6' into the command and press enter to create a 5 rows and 6 coloums' table.

Input 'N 1 3 89' to input 89 to the x1,y3 in the table.

Input 'N 1 4 11' to input 11 to the x1,y4 in the table.

Input 'S 1 3 1 4 1 6' to get the sum of the values in the x1,y3 and x1,y4

Input 'Q' to exit
