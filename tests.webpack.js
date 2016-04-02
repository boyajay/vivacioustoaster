const clientContext = require.context('./client', true, /-test\.jsx?$/);
clientContext.keys().forEach(clientContext);
