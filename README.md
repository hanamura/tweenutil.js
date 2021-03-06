# tweenutil.js

## Dependencies

- [TweenJS](https://github.com/CreateJS/TweenJS/)

## tweenutil.SyncTween

A wrapper of TweenJS in a different idea.

### How to Use

Simple linear tween:

```javascript
var tween = new tweenutil.SyncTween({
	value: 0,
	duration: 1000
});
tween.dest(100); // tweens value from 0 to 100 in 1000 milliseconds
```

You can assign value by using `change` event:

```javascript
tween.addEventListener('change', function(e) {
	targetObject.value = tween.value();
});
```

Or use `target` and `set` properties (it results in `targetObject['x'] = newValue`):

```javascript
var tween = new tweenutil.SyncTween({
	value: 0,
	duration: 1000,
	target: targetObject,
	set: 'x'
});
tween.dest(100);
```

Or set function to `set`, context to `target` (it results in `targetObject.setX.call(targetObject, newValue)`):

```javascript
var tween = new tweenutil.SyncTween({
	value: 0,
	duration: 1000,
	target: targetObject,
	set: targetObject.setX
});
```

Or you can use `set` instead of using `change` event:

```javascript
var tween = new tweenutil.SyncTween({
	value: 0,
	duration: 1000,
	set: function(newValue) {
		targetObject.value = newValue;
	}
});
```

Tween options (these are passed through to TweenJS):

```javascript
var tween = new tweenutil.SyncTween({
	value: 0,
	duration: 1000,
	wait: 500,
	ease: createjs.Ease.cubicOut
});
```

Assign value immediately without tween:

```javascript
tween.dest(100)
tween.syncValue();
```

Chaining is also supported (except for initial `value`):

```javascript
var tween = new tweenutil.SyncTween({value: 0})
	.duration(1000)
	.wait(500)
	.ease(createjs.Ease.cubicOut)
	.target(targetObject)
	.set('x')
	.dest(100);
```

### APIs

**new SyncTween([options])**

Following properties are available:

- options.value
- options.duration
- options.wait
- options.ease
- options.target
- options.set

See below for the detail.

**.value()**

Gets `value`.

**.duration()**  
**.duration(milliseconds)**

Gets/sets `duration`.

**.wait()**  
**.wait(milliseconds)**

Gets/sets `wait`.

**.ease()**  
**.ease(function)**

Gets/sets `ease`.

**.target()**  
**.target(object)**

Gets/sets `target`. See “[How to Use](#how-to-use)” for more information.

**.set()**  
**.set(stringOrFunction)**

Gets/sets `set`. See “[How to Use](#how-to-use)” for more information.

**.dest()**

Gets `dest`.

**.dest(value)**

Sets `dest`. And starts tweening if `dest` and `value` are not synced.

**.synced()**

Returns `true` if current `value` equals `dest` and no tweens are working.

**.syncValue()**

Syncs `value` and `dest` immediately by changing `value`.

**.syncDest()**

Syncs `value` and `dest` immediately by changing `dest`. Same as `tween.dest(tween.value())`.

**event type: 'start'**

Dispatched on start of tween.

**event type: 'change'**

Dispatched when `value` changes.

**event type: 'end'**

Dispatched on end of tween.

**event type: 'dest'**

Dispatched when `dest` changes.

## License

MIT License
