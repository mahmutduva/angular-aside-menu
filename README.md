###[Live Demo](http://plnkr.co/edit/Q0WNFYmqrGSB6QKQtCp3?p=preview)

# angular-aside-menu
Side menu for website


### Bower
```
$ bower install --save angular-aside-menu
```

### Module
```javascript
angular.module('yourApp', ['asideModule']);
```

### Example

```html
<aside-menu id="menu-1" side="left" width="400px" is-backdrop="true" push-content="false">
    <ul class="list-group">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
    </ul>
</aside-menu>
```
```html
<aside-menu-content>
    <div style="display: table; margin: 200px auto">
        <button type="button" aside-menu-toggle="menu-1" class="btn btn-default">Left</button>
    </div>
</aside-menu-content>
```
