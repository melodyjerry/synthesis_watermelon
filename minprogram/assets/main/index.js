var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

window.__require = function t(e, o, n) {
    function r(a, c) {
        if (!o[a]) {
            if (!e[a]) {
                var s = a.split("/");
                if (s = s[s.length - 1], !e[s]) {
                    var l = "function" == typeof __require && __require;
                    if (!c && l) return l(s, !0);
                    if (i) return i(s, !0);
                    throw new Error("Cannot find module '" + a + "'");
                }
                a = s;
            }
            var d = o[a] = {
                exports: {}
            };
            e[a][0].call(d.exports, function(t) {
                return r(e[a][1][t] || t);
            }, d, d.exports, t, e, o, n);
        }
        return o[a].exports;
    }
    for (var i = "function" == typeof __require && __require, a = 0; a < n.length; a++) {
        r(n[a]);
    }
    return r;
}({
    AnySdkHelper: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "69528ind7xNiY1g1jyWw/ua", "AnySdkHelper");
        var n = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = t("./PlatformType"), i = t("./ttAdSdk"), a = t("./oppoAdSdk"), c = t("./qqAdSdk"), s = t("./wechatAdSdk"), l = t("./ucAdSdk"), d = cc._decorator, p = d.ccclass, h = (d.property, 
        function() {
            function t() {
                this.adSdk = null;
            }
            return t.setPlatform = function(t) {
                switch (this.platform_type = t, console.log("平台==", this.platform_type), this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk = new i.default();
                    break;

                  case r.PlatformType.WEB_OPPO:
                    this.adSdk = new a.default(), this.adSdk.oppoAdInit();
                    break;

                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk = new s.default();
                    break;

                  case r.PlatformType.WEB_QQ:
                    this.adSdk = new c.default();
                    break;

                  case r.PlatformType.WEB_UC:
                    this.adSdk = new l.default();
                    break;

                  case r.PlatformType.NATIVE_VIVO:
                }
            }, t.showBannerAd = function(t) {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    console.log("显示头条Banner"), this.adSdk.ttShowBannerAd(t);
                    break;

                  case r.PlatformType.WEB_OPPO:
                    console.log("显示OPPO-Banner"), this.adSdk.oppoShowBannerAd(t);
                    break;

                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                    break;

                  case r.PlatformType.WEB_QQ:
                    this.adSdk.qqShowBannerAd(t);
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatShowBannerAd(t);
                    break;

                  case r.PlatformType.WEB_UC:
                    this.adSdk.ucShowBannerAd(t);
                }
            }, t.hideBannerAd = function() {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttHideBannerAd();
                    break;

                  case r.PlatformType.WEB_OPPO:
                    this.adSdk.oppoHideBannerAd();
                    break;

                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                    break;

                  case r.PlatformType.WEB_QQ:
                    this.adSdk.qqHideBannerAd();
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatHideBannerAd();
                    break;

                  case r.PlatformType.WEB_UC:
                    this.adSdk.ucHideBannerAd();
                }
            }, t.showVideoRewardedAd = function(t, e) {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttShowRewardedVideoAd(t, e);
                    break;

                  case r.PlatformType.WEB_OPPO:
                    this.adSdk.oppoShowRewardedVideoAd(t, e);
                    break;

                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                    break;

                  case r.PlatformType.WEB_QQ:
                    this.adSdk.qqShowRewardedVideoAd(t, e);
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatShowRewardedVideoAd(t, e);
                    break;

                  case r.PlatformType.WEB_UC:
                    this.adSdk.ucShowRewardedVideoAd(t, e);
                }
            }, t.hideVideoRewardedAd = function() {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                  case r.PlatformType.WEB_WX:
                }
            }, t.onLoadGridAd = function() {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatOnLoadCreateGridAd();
                }
            }, t.showGridAd = function() {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatShowCreateGridAd();
                }
            }, t.hideGridAd = function() {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.hideGridAd();
                }
            }, t.showInterstitialAd = function() {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatShowInterstitialAd();
                }
            }, t.startRecordVideo = function(t, e, o) {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttStartRecordVideo(t, e, o);
                    break;

                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                  case r.PlatformType.WEB_WX:
                }
            }, t.showNativeAd = function(t, e) {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    break;

                  case r.PlatformType.WEB_OPPO:
                    this.adSdk.oppoShowNativeAd(t, e);
                    break;

                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                  case r.PlatformType.WEB_WX:
                }
            }, t.pauseVideoRecord = function(t) {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttPauseVideoRecord(t);
                    break;

                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                  case r.PlatformType.WEB_WX:
                }
            }, t.resumeVideoRecord = function(t) {
                switch (this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttResumeVideoRecord(t);
                    break;

                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                  case r.PlatformType.WEB_WX:
                }
            }, t.shareVideoRecord = function(t, e) {
                switch (void 0 === e && (e = null), this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttShareVideoRecord(t, e);
                    break;

                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                  case r.PlatformType.WEB_QQ:
                  case r.PlatformType.WEB_WX:
                }
            }, t.shareText = function(t, e) {
                switch (void 0 === e && (e = null), this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttShareText(t, e);
                    break;

                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                    break;

                  case r.PlatformType.WEB_QQ:
                    this.adSdk.qqShareText(t, e);
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatShareText(t, e);
                }
            }, t.ShowShareMenu = function(t, e) {
                switch (void 0 === e && (e = null), this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttShareText(t, e);
                    break;

                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                    break;

                  case r.PlatformType.WEB_QQ:
                    this.adSdk.qqShowShareMenu(t, e);
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatShowShareMenu(t, e);
                }
            }, t.ShareTimeline = function(t, e) {
                switch (void 0 === e && (e = null), this.platform_type) {
                  case r.PlatformType.WEB_TT:
                    this.adSdk.ttShareText(t, e);
                    break;

                  case r.PlatformType.WEB_OPPO:
                  case r.PlatformType.WEB_VIVO:
                  case r.PlatformType.WEB_BD:
                    break;

                  case r.PlatformType.WEB_QQ:
                    this.adSdk.qqShowShareMenu(t, e);
                    break;

                  case r.PlatformType.WEB_WX:
                    this.adSdk.wechatShareTimeline(t, e);
                }
            }, t.platform_type = -1, n([ p ], t);
        }());
        o.default = h, cc._RF.pop();
    }, {
        "./PlatformType": "PlatformType",
        "./oppoAdSdk": "oppoAdSdk",
        "./qqAdSdk": "qqAdSdk",
        "./ttAdSdk": "ttAdSdk",
        "./ucAdSdk": "ucAdSdk",
        "./wechatAdSdk": "wechatAdSdk"
    } ],
    BallItem: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "f981ag3V75CbJjfAC5q+Bms", "BallItem");
        var _n, r = this && this.__extends || (_n = function n(t, e) {
            return (_n = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var o in e) {
                    e.hasOwnProperty(o) && (t[o] = e[o]);
                }
            })(t, e);
        }, function(t, e) {
            function o() {
                this.constructor = t;
            }
            _n(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
            new o());
        }), i = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var a = t("./GameConfig"), c = cc._decorator, s = c.ccclass, l = c.property, d = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.label = null, e.ballSpr = null, e.ballSprFrame = [], e.effectSpr = null, 
                e.effectSprFrame = [], e.ballIndex = -1, e;
            }
            return r(e, t), e.prototype.onLoad = function() {}, e.prototype.start = function() {}, 
            e.prototype.initBall = function(t) {
                this.setBallIndex(t), this.label.string = t.toString(), this.node.width = a.default.BallSize[t], 
                this.node.height = a.default.BallSize[t], this.ballSpr.spriteFrame = this.ballSprFrame[t], 
                this.rigidBody = this.getComponent(cc.RigidBody), this.collider = this.getComponent(cc.PhysicsCircleCollider), 
                this.collider.radius = this.node.width / 2, this.collider.apply(), this.isTouchedGround = !1, 
                this.isHit = !0, this.isTouchDieLine = !1;
            }, e.prototype.setBallIndex = function(t) {
                this.ballIndex = t;
            }, e.prototype.getBallIndex = function() {
                return this.ballIndex;
            }, e.prototype.createEffect = function(t) {
                var e = this;
                this.effectSpr.node.active = !0, this.effectSpr.spriteFrame = this.effectSprFrame[t], 
                this.effectSpr.node.scale = 0, this.effectSpr.node.runAction(cc.sequence(cc.scaleTo(.1, .9), cc.fadeOut(.1), cc.callFunc(function() {
                    e.effectSpr.node.active = !1;
                })));
            }, e.prototype.createEffect1 = function(t) {
                var e = this;
                this.ballSpr.node.active = !1, this.effectSpr.node.active = !0, this.effectSpr.spriteFrame = this.effectSprFrame[t], 
                this.effectSpr.node.scale = 0, this.effectSpr.node.runAction(cc.sequence(cc.scaleTo(.1, .9), cc.fadeOut(.1), cc.callFunc(function() {
                    e.effectSpr.node.active = !1, e.destroyBall();
                })));
            }, e.prototype.destroyBall = function() {
                this.node.destroy();
            }, e.prototype.onBeginContact = function(t, e, o) {
                if (o.node.name == e.node.name) {
                    var n = o.node.getComponent("BallItem"), r = e.node.getComponent("BallItem");
                    0 == r.isHit && 0 == n.isHit || 10 == r.getBallIndex() && 10 == n.getBallIndex() || 10 == r.getBallIndex() && 11 == n.getBallIndex() || 11 == r.getBallIndex() && 10 == n.getBallIndex() || 11 == r.getBallIndex() && 11 == n.getBallIndex() || (11 != r.getBallIndex() && 11 != n.getBallIndex() || (11 == r.getBallIndex() ? this._main.createNewBall(e.node.getPosition(), n.getBallIndex() + 1) : 11 == n.getBallIndex() && this._main.createNewBall(e.node.getPosition(), r.getBallIndex() + 1), 
                    r.destroyBall(), n.destroyBall(), r.isHit = !1, n.isHit = !1), r.getBallIndex() === n.getBallIndex() && (console.log("可以消除了"), 
                    this._main.createNewBall(e.node.getPosition(), r.getBallIndex() + 1), r.destroyBall(), 
                    n.destroyBall(), r.isHit = !1, n.isHit = !1));
                }
            }, e.prototype.onEndContact = function() {}, e.prototype.onPreSolve = function() {}, 
            e.prototype.onPostSolve = function() {
                this._main.isCheckFinish();
            }, i([ l(cc.Label) ], e.prototype, "label", void 0), i([ l(cc.Sprite) ], e.prototype, "ballSpr", void 0), 
            i([ l(cc.SpriteFrame) ], e.prototype, "ballSprFrame", void 0), i([ l(cc.Sprite) ], e.prototype, "effectSpr", void 0), 
            i([ l(cc.SpriteFrame) ], e.prototype, "effectSprFrame", void 0), i([ s ], e);
        }(cc.Component);
        o.default = d, cc._RF.pop();
    }, {
        "./GameConfig": "GameConfig"
    } ],
    CurrentBall: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "527edjcbqZDrpzVTRmGhT9A", "CurrentBall");
        var _n2, r = this && this.__extends || (_n2 = function n(t, e) {
            return (_n2 = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var o in e) {
                    e.hasOwnProperty(o) && (t[o] = e[o]);
                }
            })(t, e);
        }, function(t, e) {
            function o() {
                this.constructor = t;
            }
            _n2(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
            new o());
        }), i = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var a = t("./GameConfig"), c = cc._decorator, s = c.ccclass, l = c.property, d = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.ballSpr = null, e.ballSprFrame = [], e;
            }
            return r(e, t), e.prototype.onLoad = function() {}, e.prototype.start = function() {}, 
            e.prototype.initBall = function(t) {
                console.log(t), this.node.scale = 0, this.node.runAction(cc.scaleTo(.5, 1).easing(cc.easeBackOut())), 
                this.node.width = a.default.BallSize[t], this.node.height = a.default.BallSize[t], 
                this.ballSpr.spriteFrame = this.ballSprFrame[t], 11 == t && this.node.runAction(cc.repeatForever(cc.rotateBy(.1, 10)));
            }, i([ l(cc.Sprite) ], e.prototype, "ballSpr", void 0), i([ l(cc.SpriteFrame) ], e.prototype, "ballSprFrame", void 0), 
            i([ s ], e);
        }(cc.Component);
        o.default = d, cc._RF.pop();
    }, {
        "./GameConfig": "GameConfig"
    } ],
    FinishView: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "d10f64MAXlG4LHcByy8VrWX", "FinishView");
        var _n3, r = this && this.__extends || (_n3 = function n(t, e) {
            return (_n3 = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var o in e) {
                    e.hasOwnProperty(o) && (t[o] = e[o]);
                }
            })(t, e);
        }, function(t, e) {
            function o() {
                this.constructor = t;
            }
            _n3(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
            new o());
        }), i = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var a = t("./GameConfig"), c = t("./sdk/AnySdkHelper"), s = t("./tips/TipsHelper"), l = cc._decorator, d = l.ccclass, p = l.property, h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.score = null, e.light = null, e;
            }
            return r(e, t), e.prototype.onLoad = function() {
                this.node.scale = 0, this.light.runAction(cc.repeatForever(cc.rotateBy(1, 10))), 
                this.node.runAction(cc.scaleTo(.2, 1).easing(cc.easeBackOut())), c.default.showInterstitialAd();
            }, e.prototype.start = function() {
                this.score.string = "本局得分：" + a.default.gameScore.toString();
            }, e.prototype.initScore = function() {}, e.prototype.rankButtonCallback = function() {}, 
            e.prototype.shareButtonCallback = function() {
                c.default.shareText(function() {}, function() {});
            }, e.prototype.restGameButtonCallback = function() {
                var t = this;
                c.default.showVideoRewardedAd(function() {
                    t._main.restGame(), a.default.isFinish = !1, t.node.destroy();
                }, function() {
                    s.default.showTip("播放视频失败");
                });
            }, e.prototype.closeButtonCallback = function() {
                a.default.isFinish = !1, a.default.gameScore = 0, this.node.destroy(), this._main.gameOver();
            }, i([ p(cc.Label) ], e.prototype, "score", void 0), i([ p(cc.Node) ], e.prototype, "light", void 0), 
            i([ d ], e);
        }(cc.Component);
        o.default = h, cc._RF.pop();
    }, {
        "./GameConfig": "GameConfig",
        "./sdk/AnySdkHelper": "AnySdkHelper",
        "./tips/TipsHelper": "TipsHelper"
    } ],
    GameConfig: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "62bc2NzQlhDIIsOlQHC3KhZ", "GameConfig");
        var n = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator, i = r.ccclass, a = (r.property, function() {
            function t() {}
            return t.BallSize = [ 50, 80, 100, 120, 170, 200, 220, 250, 300, 380, 400, 80 ], 
            t.gameScore = 0, t.isFinish = !1, n([ i ], t);
        }());
        o.default = a, cc._RF.pop();
    }, {} ],
    MainLayer: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "0d6bcdM/qpJG6J8Roq/Dz8n", "MainLayer");
        var _n4, r = this && this.__extends || (_n4 = function n(t, e) {
            return (_n4 = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var o in e) {
                    e.hasOwnProperty(o) && (t[o] = e[o]);
                }
            })(t, e);
        }, function(t, e) {
            function o() {
                this.constructor = t;
            }
            _n4(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
            new o());
        }), i = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var a = t("./sdk/AnySdkHelper"), c = cc._decorator, s = c.ccclass, l = c.property, d = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.ball = null, e;
            }
            return r(e, t), e.prototype.onLoad = function() {
                this.ball.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, .9), cc.scaleTo(1, 1))));
            }, e.prototype.start = function() {}, e.prototype.startButtonCallback = function() {
                var t = this;
                this.node.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function() {
                    t.node.active = !1;
                })));
            }, e.prototype.rankButtonCallback = function() {}, e.prototype.shareButtonCallback = function() {
                a.default.shareText(function() {}, function() {});
            }, i([ l(cc.Node) ], e.prototype, "ball", void 0), i([ s ], e);
        }(cc.Component);
        o.default = d, cc._RF.pop();
    }, {
        "./sdk/AnySdkHelper": "AnySdkHelper"
    } ],
    MainScene: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "f73c10dxZxM1K9VIxdObIgV", "MainScene");
        var _n5, r = this && this.__extends || (_n5 = function n(t, e) {
            return (_n5 = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var o in e) {
                    e.hasOwnProperty(o) && (t[o] = e[o]);
                }
            })(t, e);
        }, function(t, e) {
            function o() {
                this.constructor = t;
            }
            _n5(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
            new o());
        }), i = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var a = t("./GameConfig"), c = t("./music/MusicHelper"), s = t("./sdk/AnySdkHelper"), l = t("./sdk/PlatformType"), d = t("./tips/TipsHelper"), p = cc._decorator, h = p.ccclass, u = p.property, f = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.ballPre = null, e.ballContent = null, e.mainLayer = null, e.touchlContent = null, 
                e.currentBall = null, e.score = null, e.finishPre = null, e.currentIndex = 0, e.ballPosY = 500, 
                e.touchTime = !0, e.autoBallLabel = null, e.magnetLabel = null, e.currentAutoNum = 5, 
                e.currentMagnetNum = 3, e;
            }
            return r(e, t), e.prototype.onLoad = function() {
                s.default.setPlatform(l.PlatformType.WEB_WX), s.default.ShowShareMenu(function() {}), 
                this.score.string = "0", a.default.isFinish = !1;
                var t = cc.director.getPhysicsManager();
                t.enabled = !0, t.gravity = cc.v2(0, -1200), this.touchlContent.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this), 
                this.touchlContent.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this), this.touchlContent.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this), 
                this.touchlContent.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
            }, e.prototype.start = function() {
                this.currentAutoNum = 5, this.currentMagnetNum = 3, this.autoBallLabel.string = this.currentAutoNum.toString() + "/5", 
                this.magnetLabel.string = this.currentMagnetNum.toString() + "/3", this.currentBall.getComponent("CurrentBall").initBall(this.currentIndex), 
                this.score.string = a.default.gameScore.toString(), s.default.showBannerAd(function() {
                    console.log("展示Banner广告");
                });
            }, e.prototype.touchBegan = function(t) {
                if (0 != this.touchTime) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation());
                    this.ballAction = this.currentBall.runAction(cc.moveTo(.2, e.x, this.ballPosY));
                }
            }, e.prototype.touchMove = function(t) {
                if (0 != this.touchTime) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation());
                    e.x > 355 || e.x < -355 || (this.currentBall.x = e.x);
                }
            }, e.prototype.touchEnd = function() {
                0 != this.touchTime && (this.touchTime = !1, this.createBall(this.currentBall.getPosition()), 
                this.currentBall.stopAction(this.ballAction), this.scheduleOnce(function() {
                    this.touchTime = !0;
                }, .5));
            }, e.prototype.setScore = function(t) {
                1 != a.default.isFinish && (a.default.gameScore = a.default.gameScore + t, this.score.string = a.default.gameScore.toString());
            }, e.prototype.initScore = function() {
                this.score.string = a.default.gameScore.toString();
            }, e.prototype.setAutoBallLabel = function() {
                this.autoBallLabel.string = this.currentAutoNum.toString() + "/5";
            }, e.prototype.setMagnetLabel = function() {
                this.magnetLabel.string = this.currentMagnetNum.toString() + "/3";
            }, e.prototype.nextBall = function() {
                var t = Math.round(3 * Math.random());
                this.currentIndex = t, this.currentBall.x = 0, this.currentBall.getComponent("CurrentBall").initBall(t);
            }, e.prototype.createBall = function(t) {
                var e = cc.instantiate(this.ballPre), o = e.getComponent("BallItem");
                o._main = this, o.initBall(this.currentIndex), e.setPosition(t), this.ballContent.addChild(e), 
                this.currentBall.active = !1, this.scheduleOnce(function() {
                    this.currentBall.active = !0, this.nextBall();
                }, .5);
            }, e.prototype.createNewBall = function(t, e) {
                this.setScore(e), c.default.playEffectMusic("music/hit.mp3");
                var o = cc.instantiate(this.ballPre), n = o.getComponent("BallItem");
                o.scale = .3, o.runAction(cc.scaleTo(.3, 1).easing(cc.easeBackOut())), n._main = this, 
                n.initBall(e), n.createEffect(e), o.setPosition(t), this.ballContent.addChild(o);
            }, e.prototype.autoBall = function() {
                this.currentIndex = 11, this.currentBall.x = 0, this.currentBall.getComponent("CurrentBall").initBall(11);
            }, e.prototype.autoBallButtonCallback = function() {
                var t = this;
                t.currentAutoNum > 0 ? s.default.showVideoRewardedAd(function() {
                    t.autoBall(), t.currentAutoNum -= 1, t.autoBallLabel.string = t.currentAutoNum.toString() + "/5";
                }, function() {
                    d.default.showTip("播放视频失败");
                }) : d.default.showTip("次数用完了");
            }, e.prototype.magnetBallButtonCallback = function() {
                var t = this;
                t.currentMagnetNum > 0 ? s.default.showVideoRewardedAd(function() {
                    t.isCheckDestroy(), t.currentMagnetNum -= 1, t.magnetLabel.string = t.currentMagnetNum.toString() + "/3";
                }, function() {
                    d.default.showTip("播放视频失败");
                }) : d.default.showTip("次数用完了");
            }, e.prototype.restGame = function() {
                for (var t = 0; t < this.ballContent.children.length; t++) {
                    for (var e = t + 1; e < this.ballContent.children.length; e++) {
                        var o = this.ballContent.children[t], n = this.ballContent.children[e];
                        if (null != o && null != n && o.getComponent("BallItem").getBallIndex() < 9 && n.getComponent("BallItem").getBallIndex() < 9 && o.getComponent("BallItem").getBallIndex() === n.getComponent("BallItem").getBallIndex()) {
                            o.getComponent("BallItem").destroyBall(), n.getComponent("BallItem").destroyBall();
                            break;
                        }
                    }
                }
            }, e.prototype.isCheckDestroy = function() {
                for (var t = 0; t < this.ballContent.children.length; t++) {
                    for (var e = t + 1; e < this.ballContent.children.length; e++) {
                        var o = this.ballContent.children[t], n = this.ballContent.children[e];
                        if (null != o && null != n && o.getComponent("BallItem").getBallIndex() === n.getComponent("BallItem").getBallIndex()) return this.createNewBall(o.getPosition(), o.getComponent("BallItem").getBallIndex() + 1), 
                        o.getComponent("BallItem").destroyBall(), void n.getComponent("BallItem").destroyBall();
                    }
                }
            }, e.prototype.isCheckFinish = function() {
                for (var t = 0; t < this.ballContent.children.length; t++) {
                    if (this.ballContent.children[t].y > this.ballPosY + 30 && 0 == a.default.isFinish) {
                        var e = cc.instantiate(this.finishPre);
                        return e.getComponent("FinishView")._main = this, this.node.addChild(e), a.default.isFinish = !0, 
                        !0;
                    }
                }
            }, e.prototype.gameOver = function() {
                this.score.string = a.default.gameScore.toString(), this.currentAutoNum = 5, this.currentMagnetNum = 3, 
                this.autoBallLabel.string = this.currentAutoNum.toString() + "/5", this.magnetLabel.string = this.currentMagnetNum.toString() + "/3";
                for (var t = 0; t < this.ballContent.children.length; t++) {
                    var e = this.ballContent.children[t];
                    e.getComponent("BallItem").createEffect1(e.getComponent("BallItem").getBallIndex());
                }
            }, i([ u(cc.Prefab) ], e.prototype, "ballPre", void 0), i([ u(cc.Node) ], e.prototype, "ballContent", void 0), 
            i([ u(cc.Node) ], e.prototype, "mainLayer", void 0), i([ u(cc.Node) ], e.prototype, "touchlContent", void 0), 
            i([ u(cc.Node) ], e.prototype, "currentBall", void 0), i([ u(cc.Label) ], e.prototype, "score", void 0), 
            i([ u(cc.Prefab) ], e.prototype, "finishPre", void 0), i([ u(cc.Label) ], e.prototype, "autoBallLabel", void 0), 
            i([ u(cc.Label) ], e.prototype, "magnetLabel", void 0), i([ h ], e);
        }(cc.Component);
        o.default = f, cc._RF.pop();
    }, {
        "./GameConfig": "GameConfig",
        "./music/MusicHelper": "MusicHelper",
        "./sdk/AnySdkHelper": "AnySdkHelper",
        "./sdk/PlatformType": "PlatformType",
        "./tips/TipsHelper": "TipsHelper"
    } ],
    MusicHelper: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "65e735CKctEDphhKimV3Q3I", "MusicHelper");
        var _n6, r = this && this.__extends || (_n6 = function n(t, e) {
            return (_n6 = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var o in e) {
                    e.hasOwnProperty(o) && (t[o] = e[o]);
                }
            })(t, e);
        }, function(t, e) {
            function o() {
                this.constructor = t;
            }
            _n6(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
            new o());
        }), i = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var a = cc._decorator, c = a.ccclass, s = (a.property, function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this;
            }
            return r(e, t), e.prototype.start = function() {}, e.playEffectMusic = function(t) {
                cc.loader.loadRes(t, function(t, e) {
                    cc.audioEngine.play(e, !1, 1);
                });
            }, i([ c ], e);
        }(cc.Component));
        o.default = s, cc._RF.pop();
    }, {} ],
    PlatformType: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "54192auI5NAhKg6NwEGG3yc", "PlatformType"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.PlatformType = void 0, function(t) {
            t[t.WEB_H5 = 0] = "WEB_H5", t[t.WEB_TT = 1] = "WEB_TT", t[t.WEB_WX = 2] = "WEB_WX", 
            t[t.WEB_BD = 3] = "WEB_BD", t[t.WEB_VIVO = 4] = "WEB_VIVO", t[t.WEB_OPPO = 5] = "WEB_OPPO", 
            t[t.WEB_QQ = 6] = "WEB_QQ", t[t.WEB_UC = 7] = "WEB_UC", t[t.NATIVE_VIVO = 8] = "NATIVE_VIVO";
        }(o.PlatformType || (o.PlatformType = {})), cc._RF.pop();
    }, {} ],
    TipsHelper: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "93912ah7MBBwq5lb7qL2ErQ", "TipsHelper");
        var _n7, r = this && this.__extends || (_n7 = function n(t, e) {
            return (_n7 = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var o in e) {
                    e.hasOwnProperty(o) && (t[o] = e[o]);
                }
            })(t, e);
        }, function(t, e) {
            function o() {
                this.constructor = t;
            }
            _n7(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
            new o());
        }), i = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var a = cc._decorator, c = a.ccclass, s = (a.property, function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this;
            }
            return r(e, t), e.prototype.start = function() {}, e.showTip = function(t) {
                var e = cc.find("Canvas");
                e ? cc.loader.loadRes("prefab/tips/Tips", function(o, n) {
                    if (o) cc.log("Prefab error:" + o); else if (n instanceof cc.Prefab) {
                        var r = cc.instantiate(n);
                        e.addChild(r), r.setPosition(0, 0), r.getComponent("Tips").initTips(t);
                    } else cc.log("Prefab error");
                }) : cc.log("find Canvas error");
            }, i([ c ], e);
        }(cc.Component));
        o.default = s, cc._RF.pop();
    }, {} ],
    Tips: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "b5ba9mmMzhMQbSp71qIUs+A", "Tips");
        var _n8, r = this && this.__extends || (_n8 = function n(t, e) {
            return (_n8 = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(t, e) {
                t.__proto__ = e;
            } || function(t, e) {
                for (var o in e) {
                    e.hasOwnProperty(o) && (t[o] = e[o]);
                }
            })(t, e);
        }, function(t, e) {
            function o() {
                this.constructor = t;
            }
            _n8(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
            new o());
        }), i = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var a = cc._decorator, c = a.ccclass, s = a.property, l = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.label = null, e;
            }
            return r(e, t), e.prototype.start = function() {
                this.node.zIndex = 999;
            }, e.prototype.initTips = function(t) {
                this.node.opacity = 0;
                var e = this;
                this.node.runAction(cc.fadeIn(.5)), this.label.string = t, this.scheduleOnce(function() {
                    this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function() {
                        e.node.destroy();
                    })));
                }, 3);
            }, i([ s(cc.Label) ], e.prototype, "label", void 0), i([ c ], e);
        }(cc.Component);
        o.default = l, cc._RF.pop();
    }, {} ],
    oppoAdSdk: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "dc519DJdoZDBbAt0286a8DI", "oppoAdSdk");
        var n = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator, i = r.ccclass, a = (r.property, function() {
            function t() {
                this.BannerAd = null, this.NativeBannerAd = null, this.Interstitial = null, this.Video = null, 
                this.isShowNativeAd = !1;
            }
            return t.prototype.oppoAdInit = function() {
                window.qg.initAdService({
                    appId: "30452613",
                    isDebug: !0,
                    success: function success() {
                        console.log("initAdService success");
                    },
                    fail: function fail(t) {
                        console.log("initAdService fail:", t.code, t.msg);
                    },
                    complete: function complete() {
                        console.log("initAdService complete");
                    }
                });
            }, t.prototype.bannerDestroy = function() {
                window.gg && this.BannerAd && (this.BannerAd.destroy(), this.BannerAd = null);
            }, t.prototype.oppoShowBannerAd = function() {
                console.log("显示广告OPPO"), this.BannerAd && this.oppoHideBannerAd();
                var t = window.qg.getSystemInfoSync();
                t.screenWidth, t.screenHeight, this.BannerAd = window.qg.createBannerAd({
                    adUnitId: "277250",
                    style: {
                        left: 0,
                        top: t.screenHeight - 100 - 10,
                        width: t.screenWidth,
                        height: 50
                    }
                }), this.BannerAd.onError(function(t) {
                    cc.log("this.bannerAd   onError", t);
                }), this.BannerAd.onResize(function(e) {
                    this.BannerAd.style.top = t.screenHeight - e.height - 10, this.BannerAd.show();
                }.bind(this));
            }, t.prototype.oppoHideBannerAd = function() {
                this.BannerAd && (this.BannerAd.hide(), this.BannerAd.destroy(), this.BannerAd = null);
            }, t.prototype.oppoShowNativeAd = function() {
                var t = this;
                if (null == this.NativeBannerAd) {
                    if (this.NativeBannerAd = window.qg.createNativeAd({
                        adUnitId: "277678"
                    }), console.log("===showNativeAd===", this.NativeBannerAd), null == this.NativeBannerAd || null == this.NativeBannerAd) return;
                    this.NativeBannerAd.load(), this.NativeBannerAd.onLoad(function(e) {
                        console.error("===showNativeAd=onLoad:", e);
                        var o = null;
                        if (e && e.adList && (o = e.adList.pop()), null != o && null != o) {
                            var n = o;
                            t.NativeBannerAd.reportAdShow({
                                adId: n.adId
                            });
                        } else t.hideNativeBannerAd();
                    }), this.NativeBannerAd.onError(function(e) {
                        console.error("===showNativeAd=onError:", e), t.hideNativeBannerAd();
                    });
                }
            }, t.prototype.hideNativeBannerAd = function() {
                null != this.NativeBannerAd && (this.NativeBannerAd.destroy(), this.NativeBannerAd = null);
            }, t.prototype.oppoShowInterstitialAd = function() {}, t.prototype.oppoShowRewardedVideoAd = function(t, e) {
                var o = this, n = new Date().getTime();
                if (this.ClickTime) {
                    if (n - this.ClickTime < 2e3) return;
                } else this.ClickTime = n;
                this.ClickTime = n, this.Video && (this.Video.destroy(), this.Video = null), this.Video = window.qg.createRewardedVideoAd({
                    posId: "277255"
                }), this.Video.onLoad(function() {
                    o.Video.show();
                }), this.Video.onError(function(t) {
                    console.log(t);
                }), this.Video.onClose(function(o) {
                    1 == o.isEnded ? t && t() : e && e();
                }), this.Video.load();
            }, t.prototype.oppoShareText = function(t, e) {
                void 0 === e && (e = null);
            }, t.prototype.sendToDesktop = function(t) {
                window.qg.installShortcut({
                    success: function success() {
                        t && (t.active = !1);
                    },
                    fail: function fail() {},
                    complete: function complete() {}
                });
            }, t.prototype.oppoLogin = function() {}, t.prototype.oppoRank = function() {}, 
            n([ i ], t);
        }());
        o.default = a, cc._RF.pop();
    }, {} ],
    qqAdSdk: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "07666+7QzJCbqob3fZcEuXH", "qqAdSdk");
        var n = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator, i = r.ccclass, a = (r.property, function() {
            function t() {
                this.BannerAd = null, this.NativeBannerAd = null, this.Interstitial = null, this.Video = null, 
                this.isShowNativeAd = !1;
            }
            return t.prototype.qqShowBannerAd = function(t) {
                var e = this;
                console.log("是否进入了QQ 广告"), this.BannerAd && this.BannerAd.destroy();
                var o = qq.getSystemInfoSync(), n = o.screenWidth, r = o.screenHeight;
                this.BannerAd = window.qq.createBannerAd({
                    adUnitId: "395b22db5497c4c4071a18085c786551",
                    style: {
                        left: n / 2 - 150,
                        top: r - 100,
                        height: 100,
                        width: 200
                    }
                }), this.BannerAd.onResize(function() {
                    e.BannerAd.style.left = n / 2 - 150, e.BannerAd.style.top = r - 100, e.BannerAd.show().then(function() {
                        console.log("bannerAd show ok"), t && t();
                    }).catch(function(t) {
                        console.log("bannerAd show error", t);
                    });
                }), this.BannerAd.onError(function(t) {
                    console.log("bannerAd onError", t);
                }), this.BannerAd.onLoad(function(t) {
                    console.log("bannerAd onLoad", t);
                });
            }, t.prototype.qqHideBannerAd = function() {
                this.BannerAd && (this.BannerAd.hide(), this.BannerAd.destroy(), this.BannerAd = null);
            }, t.prototype.oppoShowInterstitialAd = function() {}, t.prototype.qqShowRewardedVideoAd = function(t, e) {
                var o = this;
                this.Video || (this.Video = qq.createRewardedVideoAd({
                    adUnitId: "04b8f53428a07a69047b7dfaf14ecb53"
                }), this.Video.onError(function(t) {
                    console.log("videoAd onError", t);
                }), this.Video.onLoad(function(t) {
                    console.log("videoAd onLoad", t);
                }), this.Video.onClose(function(t) {
                    t.isEnded ? this.Video.success && this.Video.success() : this.Video.failed && this.Video.failed();
                }.bind(this))), this.Video.success = t, this.Video.failed = e, this.Video.show().catch(function() {
                    o.Video.load().then(function() {
                        return o.Video.show();
                    }).catch(function() {
                        console.log("激励视频 广告显示失败"), e && e();
                    });
                });
            }, t.prototype.qqShareText = function(t, e) {
                void 0 === e && (e = null), console.log("分享QQ"), qq.shareAppMessage({
                    title: "欢乐消不停，一起合西瓜!",
                    imageUrl: "http://simg.chuanglinggame.com/share.png"
                });
            }, t.prototype.qqShowShareMenu = function(t, e) {
                void 0 === e && (e = null), qq.showShareMenu({
                    showShareItems: [ "qq", "qzone", "wechatFriends", "wechatMoment" ],
                    withShareTicket: !0
                });
            }, t.prototype.oppoLogin = function() {}, t.prototype.oppoRank = function() {}, 
            n([ i ], t);
        }());
        o.default = a, cc._RF.pop();
    }, {} ],
    ttAdSdk: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "93038/szAdO37d4hQ4MZWAe", "ttAdSdk");
        var n = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator, i = r.ccclass, a = (r.property, function() {
            function t() {
                this.BannerAd = null, this.Interstitial = null, this.Video = null, this.isPassive = null, 
                this.Recorder = null, this.RecordStatus = 0, this.RecordPath = null;
            }
            return t.prototype.bannerDestroy = function() {
                window.tt && this.BannerAd && (this.BannerAd.destroy(), this.BannerAd = null);
            }, t.prototype.ttShowBannerAd = function(t) {
                if (console.log("显示头条Sdk==Banner"), window.tt) {
                    this.bannerDestroy();
                    var e = tt.getSystemInfoSync(), o = e.screenWidth, n = e.screenHeight, r = {
                        top: n - 112.5,
                        left: o / 2 - 100,
                        width: 200
                    };
                    this.BannerAd = tt.createBannerAd({
                        adUnitId: "2ltbthpl1efjfygfa1",
                        adIntervals: 31,
                        style: r
                    }), this.BannerAd.onLoad(function() {
                        this.BannerAd.show().then(function() {
                            t && t();
                        }).catch(function() {});
                    }.bind(this)), this.BannerAd.onResize(function(t) {
                        0 != t.width && 0 != t.height && 200 != t.width && (this.BannerAd.style.top = n - t.height, 
                        this.BannerAd.style.left = (o - t.width) / 2);
                    }.bind(this));
                }
            }, t.prototype.ttHideBannerAd = function() {
                window.tt && (console.log(this.BannerAd), this.BannerAd.hide());
            }, t.prototype.ttShowInterstitialAd = function(t) {
                window.tt && (this.Interstitial && (this.Interstitial.destroy(), this.Interstitial = null), 
                this.Interstitial = tt.createInterstitialAd({
                    adUnitId: "ebs360bfngt2qety80"
                }), this.Interstitial.onLoad(function() {}.bind(this)), this.Interstitial.onClose(function() {
                    this.Interstitial.close && this.Interstitial.close();
                }.bind(this)), this.Interstitial.onError(function() {
                    this.Interstitial.close && this.Interstitial.close();
                }.bind(this)), this.Interstitial.close = t, this.Interstitial.load().then(function() {
                    this.Interstitial.show().then(function() {}.bind(this)).catch(function() {
                        this.Interstitial.close && this.Interstitial.close();
                    }.bind(this));
                }.bind(this)).catch(function() {
                    this.Interstitial.close && this.Interstitial.close();
                }.bind(this)));
            }, t.prototype.ttShowRewardedVideoAd = function(t, e) {
                this.Video || (this.Video = tt.createRewardedVideoAd({
                    adUnitId: "7a9je29d0kl5jtr7ho"
                }), this.Video.onError(function(t) {
                    Number(t.errCode), this.Video.failed && this.Video.failed();
                }.bind(this)), this.Video.onClose(function(t) {
                    t.isEnded ? this.Video.success && this.Video.success() : this.Video.failed && this.Video.failed();
                }.bind(this))), this.Video.success = t, this.Video.failed = e, this.Video.show().then(function() {}.bind(this)).catch(function() {
                    this.Video.load().then(function() {
                        return this.Video.show();
                    }.bind(this));
                }.bind(this));
            }, t.prototype.ttStartRecordVideo = function(t, e, o) {
                window.tt && (this.Recorder = null, null == this.Recorder && (this.Recorder = tt.getGameRecorderManager(), 
                this.Recorder.onStart(function() {
                    this.isPassive = !1, this.RecordStatus = 3, e && e();
                }.bind(this)), this.Recorder.onStop(function(t) {
                    this.RecordStatus = 1, this.isPassive || (this.RecordPath = t.videoPath, o && o());
                }.bind(this)), this.Recorder.onError(function() {}.bind(this))), this.Recorder.start({
                    duration: t
                }));
            }, t.prototype.ttPauseVideoRecord = function(t) {
                var e = this;
                window.tt && (this.Recorder.onPause(function() {
                    e.RecordStatus = 2, t && t();
                }), this.Recorder.pause());
            }, t.prototype.ttResumeVideoRecord = function(t) {
                var e = this;
                window.tt && (this.Recorder.onResume(function() {
                    e.RecordStatus = 3, t && t();
                }), this.Recorder.resume());
            }, t.prototype.ttShareVideoRecord = function(t, e) {
                void 0 === e && (e = null), window.tt && null != this.Recorder && "" != this.RecordPath && (console.log(this.Recorder), 
                tt.shareAppMessage({
                    channel: "video",
                    title: "谁才是真正的消除大师",
                    imageUrl: "",
                    query: "",
                    extra: {
                        videoPath: this.RecordPath,
                        videoTopics: [ "开启智慧的大脑" ]
                    },
                    success: function success() {
                        t && t();
                    },
                    fail: function fail(t) {
                        var o = t.errMsg.split(" ")[0].split(":")[1];
                        "cancel" !== o ? "fail" === o && e && e("分享失败") : e && e("分享被取消");
                    }
                }));
            }, t.prototype.ttShareText = function(t, e) {
                void 0 === e && (e = null), window.tt && tt.shareAppMessage({
                    templateId: "fb97a745da4127epn3",
                    query: "",
                    title: "消除大师",
                    desc: "这小游戏还挺有意思，点击就能玩",
                    imageUrl: "",
                    success: function success() {
                        t && t(), console.log("分享成功");
                    },
                    fail: function fail(t) {
                        var o = t.errMsg.split(" ")[0].split(":")[1];
                        "cancel" !== o ? "fail" === o && e && e("分享失败") : e && e("分享被取消");
                    }
                });
            }, t.prototype.stopVideoRecord = function(t, e) {
                var o = this;
                void 0 === e && (e = null), window.tt && (this.isPassive = t, this.Recorder && (this.Recorder.onStop(function(t) {
                    o.RecordStatus = 1, o.RecordPath = t.videoPath, e && e();
                }), this.Recorder.stop()));
            }, n([ i ], t);
        }());
        o.default = a, cc._RF.pop();
    }, {} ],
    ucAdSdk: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "088b5qjiDpIVaF0ad5d2x69", "ucAdSdk");
        var n = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator, i = r.ccclass, a = (r.property, function() {
            function t() {
                this.BannerAd = null, this.Interstitial = null, this.Video = null;
            }
            return t.prototype.ucShowBannerAd = function() {
                console.log("bannerAd 广告加载 start ");
                var t = uc.getSystemInfoSync();
                if ("string" == typeof t) try {
                    t = JSON.parse(t);
                } catch (n) {}
                var e = (t.screenWidth > t.screenHeight ? t.screenHeight : t.screenWidth) / 2, o = 194 * e / 345;
                this.BannerAd = uc.createBannerAd({
                    style: {
                        width: e,
                        height: o,
                        gravity: 7
                    }
                }), this.BannerAd.onError(function(t) {
                    console.log("bannerAd 广告加载出错", t);
                }), this.BannerAd.onLoad(function() {
                    console.log("bannerAd 广告加载成功");
                }), this.BannerAd.show();
            }, t.prototype.ucHideBannerAd = function() {
                this.BannerAd && (this.BannerAd.hide(), this.BannerAd.destroy(), this.BannerAd = null);
            }, t.prototype.ucShowInterstitialAd = function() {}, t.prototype.ucShowRewardedVideoAd = function(t, e) {
                var o = uc.createRewardVideoAd();
                o.onLoad(function() {
                    console.log("激励视频-广告加载成功");
                }), o.onError(function(t) {
                    console.log("激励视频-广告加载失败", t);
                }), o.onClose(function(t) {
                    t && t.isEnded ? (console.log("正常播放结束，可以下发游戏奖励 res: ", t), o.success && o.success()) : (o.failed && o.failed(), 
                    console.log("播放中途退出，不下发游戏奖励 res : ", t));
                }), o.success = t, o.failed = e, o.show().then().catch(function(t) {
                    return console.log(t);
                });
            }, t.prototype.qqShareText = function(t, e) {
                void 0 === e && (e = null), console.log("分享QQ"), qq.shareAppMessage({
                    title: "欢乐消不停，一起合西瓜!",
                    imageUrl: "http://simg.chuanglinggame.com/share.png"
                });
            }, t.prototype.oppoLogin = function() {}, t.prototype.oppoRank = function() {}, 
            n([ i ], t);
        }());
        o.default = a, cc._RF.pop();
    }, {} ],
    wechatAdSdk: [ function(t, e, o) {
        "use strict";
        cc._RF.push(e, "1a3beCUKqhA+ZldbdZ/bPvg", "wechatAdSdk");
        var n = this && this.__decorate || function(t, e, o, n) {
            var r, i = arguments.length, a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
            if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) {
                (r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
            }
            return i > 3 && a && Object.defineProperty(e, o, a), a;
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator, i = r.ccclass, a = (r.property, function() {
            function t() {
                this.BannerAd = null, this.NativeBannerAd = null, this.Interstitial = null, this.Video = null, 
                this.isShowNativeAd = !1, this.gridAd = null;
            }
            return t.prototype.oppoAdInit = function() {}, t.prototype.wechatShowBannerAd = function() {
                cc.sys.platform == cc.sys.WECHAT_GAME && (this.BannerAd && this.BannerAd.destroy(), 
                this.BannerAd = wx.createBannerAd({
                    adUnitId: "adunit-e9cf6285aae0052d",
                    style: {
                        left: wx.getSystemInfoSync().screenWidth / 2 - 150,
                        top: wx.getSystemInfoSync().screenHeight - wx.getSystemInfoSync().screenWidth / 320 * 94,
                        width: 300
                    }
                }), this.BannerAd.show(), this.BannerAd.onError(function(t) {
                    this.BannerAd.offError(), t.errCode, t.errCode, t.errCode;
                }));
            }, t.prototype.wechatHideBannerAd = function() {
                this.BannerAd && (this.BannerAd.hide(), this.BannerAd.destroy(), this.BannerAd = null);
            }, t.prototype.wechatShowInterstitialAd = function() {
                var t = null;
                wx.createInterstitialAd && ((t = wx.createInterstitialAd({
                    adUnitId: "adunit-79461ec538f9b4e6"
                })).onError(function(t) {
                    console.log("videoAd onError", t);
                }), t.onLoad(function(t) {
                    console.log("videoAd onLoad", t);
                })), t && t.show().catch(function(t) {
                    console.error(t);
                });
            }, t.prototype.wechatShowRewardedVideoAd = function(t, e) {
                var o = this;
                if (!this.Video) {
                    if ("undefined" == wx.createRewardedVideoAd) return;
                    console.log("开始创建视频广告"), this.Video = wx.createRewardedVideoAd({
                        adUnitId: "adunit-d7bdde77e1bb4d8d"
                    }), this.Video.onError(function(t) {
                        console.log("videoAd onError", t);
                    }), this.Video.onLoad(function(t) {
                        console.log("videoAd onLoad", t);
                    }), this.Video.onClose(function(t) {
                        t.isEnded ? this.Video.success && this.Video.success() : this.Video.failed && this.Video.failed();
                    }.bind(this));
                }
                this.Video.success = t, this.Video.failed = e, this.Video.show().catch(function() {
                    o.Video.load().then(function() {
                        return o.Video.show();
                    }).catch(function() {
                        console.log("激励视频 广告显示失败"), e && e();
                    });
                });
            }, t.prototype.wechatOnLoadCreateGridAd = function() {
                this.gridAd = wx.createGridAd({
                    adUnitId: "adunit-58a5b4d2a5a0e575",
                    adTheme: "white",
                    gridCount: 5,
                    style: {
                        left: 0,
                        top: 0,
                        width: 430,
                        opacity: .8
                    }
                }), this.gridAd.onError(function(t) {
                    console.log("videoAd onError", t);
                }), this.gridAd.onLoad(function(t) {
                    console.log("videoAd onLoad", t);
                });
            }, t.prototype.wechatShowCreateGridAd = function() {
                this.gridAd = wx.createGridAd({
                    adUnitId: "adunit-58a5b4d2a5a0e575",
                    adTheme: "white",
                    gridCount: 5,
                    style: {
                        left: 0,
                        top: 0,
                        width: 430,
                        opacity: .8
                    }
                }), this.gridAd.onError(function(t) {
                    console.log("videoAd onError", t);
                }), this.gridAd.onLoad(function(t) {
                    console.log("videoAd onLoad", t);
                }), this.gridAd.show();
            }, t.prototype.wechatHideCreateGridAd = function() {
                this.gridAd && this.gridAd.hide();
            }, t.prototype.wechatShareText = function(t, e) {
                void 0 === e && (e = null), wx.shareAppMessage({
                    title: "欢乐消不停，合成大西瓜!",
                    imageUrl: "http://simg.chuanglinggame.com/share.png"
                });
            }, t.prototype.wechatShareTimeline = function(t, e) {
                void 0 === e && (e = null), console.log("分享朋友圈"), wx.onShareTimeline(function() {
                    return {
                        title: "欢乐消不停，合成大西瓜!",
                        imageUrl: "http://simg.chuanglinggame.com/share.png",
                        query: "a=1&b=2"
                    };
                }), wx.offShareTimeline();
            }, t.prototype.wechatShowShareMenu = function(t, e) {
                void 0 === e && (e = null), wx.showShareMenu({
                    withShareTicket: !0,
                    menus: [ "shareAppMessage", "shareTimeline" ]
                });
            }, t.prototype.oppoLogin = function() {}, t.prototype.oppoRank = function() {}, 
            n([ i ], t);
        }());
        o.default = a, cc._RF.pop();
    }, {} ]
}, {}, [ "BallItem", "CurrentBall", "FinishView", "GameConfig", "MainLayer", "MainScene", "MusicHelper", "AnySdkHelper", "PlatformType", "oppoAdSdk", "qqAdSdk", "ttAdSdk", "ucAdSdk", "wechatAdSdk", "Tips", "TipsHelper" ]);