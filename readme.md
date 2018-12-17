This is a back end system design for a legacy front end component code base.
The server is built Express, Nodejs. 
Rendering is done on the server side.
Choice of database is MongoDB.
Performance metrics are below.

The full application requires multiple services to be deployed and up. Since they are not, their respective code are commented out.
At production, all data exist in the cloud. At development, we will use MongoDB at localhost to serve our data size(100000).


To run:

cd into service
npm install
Note: This removes all documents inside 'products' collection) npm start

cd into proxy
npm install
npm start

Application is on: localhost:3000/buy/:productID  (product######)


Main:
====================================================
![Alt text](imgs/Main.png?raw=true "Main")
====================================================

NewRelic:
====================================================
![Alt text](imgs/NewRelic.png?raw=true "NewRelic")
====================================================

JMeter:
====================================================
![Alt text](imgs/JMeter.png?raw=true "JMeter")
====================================================