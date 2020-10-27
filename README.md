# Trading frontend

## Getting started

### Install the necessary NPM modules:
```
npm install
```

### Start the application:
```
npm run serve
```

## Choice of technologies

### Vue.js
To create an application like user experience where the user doesn't have to reload pages the
framework Vue.js was chosen. Vue makes it possible to organize the application in different components and manage state as
well as routing.

### Chart.js
To show the change in price over time the library Chart.js has been used.
For each item there is a Chart.js graph showing the prices.
To begin with I was trying to implement the graphs using Rickshaw but I found
Rickshaw's documentation to be very poor and thus it was difficult to solve the
problem using Rickshaw. I found Chart.js and decided to use that instead.
The documentation for Chart.js seemed much clearer than Rickshaw's.

### Socket.io
To get data from the socket-server the Socket.io package for Vue, Vue-socket.io
has been used. Vue-socket.io performs the task of listening to messages from the server well
and allows the app to get a continuous inflow of pricedata for the different items on the market.
It seems like Vue-socket.io requires a Vuex store to be used, because of that a Vuex store has been implemented
to manage the data related to the price information. This store also manages data for the charts, beacause the Charts get
their new data from the socket-service.
