Cucumberly
==========

Cucumberly is a cucumber features editor but for "Muggles".

### Run

Make a copy of config_sample.json -> config.json and change the params you need.

```
npm start
```

### Run tests

Make sure you have a mongodb instance running.
Launch manually the server and ...

```
npm run acceptance
```


{
    items: [{}, {}, {}],
    _links: {
        {
            self: {
                'uri': '/api/me',
                method: 'GET'
            }
            createScenario: {
                uri: 'my-app.com/api/features/scenario'
                method: 'POST'
            }
            createFeature: {
                uri: 'my-app2.com/api/features'
                method: 'POST'
            }
        }
    }
}
