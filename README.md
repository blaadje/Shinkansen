# Shinkansen

Shinkansen is a secure and fast deploy interface

- stack : react, material UI
- compte utilisateur
- ajouter/delete 1 app
- liste d'apps enregistree de l'utilisateur
- 1 app peut controler : deploy, rollback, voir toute la liste de deploys

```js
// data model
const users = {
  user1: {
    name: 'jean',
    mail: 'jean@jean.fr'
  },
  user2: {
    name: 'jack',
    mail: 'jean@jack.fr'
  }
}

const apps = {
  user1: {
    app1: {
      name: 'mon app',
      repository: 'foobar'
    },
    app2: {
      name: 'mon app2',
      repository: 'barfoo'
    }
  }
}

const deploys: {
  app1: {
    deploy1: {
      status: 'success',
      date: date
    }
  }
}
```
