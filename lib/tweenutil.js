(function() {
  var SyncTween, createjs, tweenutil, _tweenutil,
    _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _tweenutil = this.tweenutil;

  this.tweenutil = tweenutil = {};

  tweenutil.noConflict = function() {
    _this.tweenutil = _tweenutil;
    return tweenutil;
  };

  createjs = this.createjs;

  tweenutil.SyncTween = SyncTween = (function() {
    SyncTween.prototype.value = function() {
      return this._value;
    };

    SyncTween.prototype.dest = function(dest) {
      if (dest !== void 0) {
        if (this._dest !== dest) {
          this._dest = dest;
          this._check();
          this.dispatchEvent({
            type: 'dest'
          });
        }
        return this;
      } else {
        return this._dest;
      }
    };

    SyncTween.prototype.target = function(target) {
      if (target !== void 0) {
        this._target = target;
        return this;
      } else {
        return this._target;
      }
    };

    SyncTween.prototype.set = function(set) {
      if (set !== void 0) {
        this._set = set;
        return this;
      } else {
        return this._set;
      }
    };

    SyncTween.prototype.wait = function(wait) {
      if (wait !== void 0) {
        this._wait = wait;
        return this;
      } else {
        return this._wait;
      }
    };

    SyncTween.prototype.duration = function(duration) {
      if (duration !== void 0) {
        this._duration = duration;
        return this;
      } else {
        return this._duration;
      }
    };

    SyncTween.prototype.ease = function(ease) {
      if (ease !== void 0) {
        this._ease = ease;
        return this;
      } else {
        return this._ease;
      }
    };

    function SyncTween(options) {
      this._onComplete = __bind(this._onComplete, this);
      this._onChange = __bind(this._onChange, this);
      this._value = this._dest = (options != null ? options.value : void 0) || 0;
      this._target = (options != null ? options.target : void 0) || null;
      this._set = (options != null ? options.set : void 0) || null;
      this._wait = (options != null ? options.wait : void 0) || 0;
      this._duration = (options != null ? options.duration : void 0) || 0;
      this._ease = (options != null ? options.ease : void 0) || createjs.Ease.linear;
      this._tween = null;
    }

    SyncTween.prototype.synced = function() {
      return this._value === this._dest;
    };

    SyncTween.prototype.syncValue = function() {
      if (!this.synced()) {
        this._value = this._dest;
        this._apply();
        this.dispatchEvent({
          type: 'change'
        });
        this._check();
      }
      return this;
    };

    SyncTween.prototype.syncDest = function() {
      return this.dest(this.value());
    };

    SyncTween.prototype._check = function() {
      var o;
      if (this._value === this._dest) {
        if (this._tween) {
          this._destroy(this._tween);
          this._tween = null;
          return this.dispatchEvent({
            type: 'end'
          });
        }
      } else {
        o = this._tween;
        o && this._destroy(o);
        this._tween = createjs.Tween.get({
          _: this._value
        }).wait(this._wait).to({
          _: this._dest
        }, this._duration, this._ease).call(this._onComplete);
        this._tween.addEventListener('change', this._onChange);
        return o || this.dispatchEvent({
          type: 'start'
        });
      }
    };

    SyncTween.prototype._destroy = function(tween) {
      tween.removeEventListener('change', this._onChange);
      tween.setPaused(true);
      return createjs.Tween.removeTweens(tween.target);
    };

    SyncTween.prototype._apply = function() {
      if (typeof this._set === 'function') {
        if (this._target) {
          return this._set.call(this._target, this._value);
        } else {
          return this._set(this._value);
        }
      } else if (this._target && typeof this._set === 'string') {
        return this._target[this._set] = this._value;
      }
    };

    SyncTween.prototype._onChange = function() {
      this._value = this._tween.target._;
      this._apply();
      this.dispatchEvent({
        type: 'change'
      });
    };

    SyncTween.prototype._onComplete = function() {
      this._onChange();
      this._destroy(this._tween);
      this._tween = null;
      return this.dispatchEvent({
        type: 'end'
      });
    };

    return SyncTween;

  })();

  createjs.EventDispatcher.initialize(SyncTween.prototype);

}).call(this);
