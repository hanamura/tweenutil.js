_tweenutil = @tweenutil
@tweenutil = tweenutil = {}

tweenutil.noConflict = =>
	@tweenutil = _tweenutil
	tweenutil

createjs = @createjs

tweenutil.SyncTween = class SyncTween
	# properties
	value: -> @_value

	dest: (dest) ->
		if dest != undefined
			if @_dest != dest
				@_dest = dest
				@_check()
				@dispatchEvent(type: 'dest')
			@
		else
			@_dest

	target: (target) ->
		if target != undefined
			@_target = target
			@
		else
			@_target

	set: (set) ->
		if set != undefined
			@_set = set
			@
		else
			@_set

	wait: (wait) ->
		if wait != undefined
			@_wait = wait
			@
		else
			@_wait

	duration: (duration) ->
		if duration != undefined
			@_duration = duration
			@
		else
			@_duration

	ease: (ease) ->
		if ease != undefined
			@_ease = ease
			@
		else
			@_ease

	# init
	constructor: (options) ->
		@_value = @_dest = options?.value or 0
		@_target = options?.target or null
		@_set = options?.set or null
		@_wait = options?.wait or 0
		@_duration = options?.duration or 0
		@_ease = options?.ease or createjs.Ease.linear
		@_tween = null

	# sync
	synced: -> @_value == @_dest

	syncValue: ->
		if not @synced()
			@_value = @_dest
			@_apply()
			@dispatchEvent(type: 'change')
			@_check()
		@

	syncDest: -> @dest(@value())

	# check
	_check: ->
		if @_value == @_dest
			if @_tween
				@_destroy(@_tween)
				@_tween = null
				@dispatchEvent(type: 'end')
		else
			o = @_tween
			o and @_destroy(o)

			@_tween = createjs.Tween.get(_: @_value)
				.wait(@_wait)
				.to({_: @_dest}, @_duration, @_ease)
				.call(@_onComplete)
			@_tween.addEventListener('change', @_onChange)

			o or @dispatchEvent(type: 'start')

	# shortcut
	_destroy: (tween) ->
		tween.removeEventListener('change', @_onChange)
		tween.setPaused(true)
		createjs.Tween.removeTweens(tween.target)

	_apply: ->
		if typeof @_set == 'function'
			if @_target
				@_set.call(@_target, @_value)
			else
				@_set(@_value)
		else if @_target and typeof @_set == 'string'
			@_target[@_set] = @_value

	# on
	_onChange: =>
		@_value = @_tween.target._
		@_apply()
		@dispatchEvent(type: 'change')
		return

	_onComplete: =>
		@_onChange()
		@_destroy(@_tween)
		@_tween = null
		@dispatchEvent(type: 'end')

createjs.EventDispatcher.initialize(SyncTween.prototype)
