# Usage

```
tmpl.compile('asdfasfd {{1+2}} {{test}} {{true == false}} {{some.thing}}', {
  test: 'string',
  some: {
    thing: 'something'
  }
}));
```

This will output:

```
asdfasfd 3 string false something
```