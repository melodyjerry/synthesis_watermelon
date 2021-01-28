var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

!function i(a, c, u) {
    function s(t, e) {
        if (!c[t]) {
            if (!a[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (l) return l(t, !0);
                var r = new Error("Cannot find module '" + t + "'");
                throw r.code = "MODULE_NOT_FOUND", r;
            }
            var o = c[t] = {
                exports: {}
            };
            a[t][0].call(o.exports, function(e) {
                return s(a[t][1][e] || e);
            }, o, o.exports, i, a, c, u);
        }
        return c[t].exports;
    }
    for (var l = "function" == typeof require && require, e = 0; e < u.length; e++) {
        s(u[e]);
    }
    return s;
}({
    1: [ function(e, t, n) {}, {} ],
    2: [ function(e, t, n) {
        "use strict";
        var r = window.fsUtils, o = r.getUserDataPath, i = r.readJsonSync, c = r.makeDirSync, a = r.writeFileSync, s = r.copyFile, l = r.downloadFile, u = r.writeFile, f = r.deleteFile, d = r.rmdirSync, p = r.unzip, h = !1, m = null, v = !1, g = [], y = [], b = !1, w = /the maximum size of the file storage/, _ = 0, E = /^https?:\/\/.*/, x = {
            cacheDir: "gamecaches",
            cachedFileName: "cacheList.json",
            cacheEnabled: !0,
            autoClear: !0,
            cacheInterval: 500,
            deleteInterval: 500,
            writeFileInterval: 2e3,
            outOfStorage: !1,
            tempFiles: null,
            cachedFiles: null,
            cacheQueue: {},
            version: "1.0",
            getCache: function getCache(e) {
                return this.cachedFiles.has(e) ? this.cachedFiles.get(e).url : "";
            },
            getTemp: function getTemp(e) {
                return this.tempFiles.has(e) ? this.tempFiles.get(e) : "";
            },
            init: function init() {
                this.cacheDir = o() + "/" + this.cacheDir;
                var e = this.cacheDir + "/" + this.cachedFileName, t = i(e);
                t instanceof Error || !t.version ? (t instanceof Error || d(this.cacheDir, !0), 
                this.cachedFiles = new cc.AssetManager.Cache(), c(this.cacheDir, !0), a(e, JSON.stringify({
                    files: this.cachedFiles._map,
                    version: this.version
                }), "utf8")) : this.cachedFiles = new cc.AssetManager.Cache(t.files), this.tempFiles = new cc.AssetManager.Cache();
            },
            updateLastTime: function updateLastTime(e) {
                this.cachedFiles.has(e) && (this.cachedFiles.get(e).lastTime = Date.now());
            },
            _write: function _write() {
                v = !(m = null), u(this.cacheDir + "/" + this.cachedFileName, JSON.stringify({
                    files: this.cachedFiles._map,
                    version: this.version
                }), "utf8", function() {
                    v = !1;
                    for (var e = 0, t = y.length; e < t; e++) {
                        y[e]();
                    }
                    y.length = 0, y.push.apply(y, g), g.length = 0;
                });
            },
            writeCacheFile: function writeCacheFile(e) {
                m ? e && y.push(e) : (m = setTimeout(this._write.bind(this), this.writeFileInterval), 
                !0 === v ? e && g.push(e) : e && y.push(e));
            },
            _cache: function _cache() {
                var t = this;
                for (var n in this.cacheQueue) {
                    var e = function e(_e) {
                        if (h = !1, _e) {
                            if (w.test(_e.message)) return t.outOfStorage = !0, void (t.autoClear && t.clearLRU());
                        } else t.cachedFiles.add(n, {
                            bundle: a,
                            url: u,
                            lastTime: c
                        }), delete t.cacheQueue[n], t.writeCacheFile();
                        cc.js.isEmptyObject(t.cacheQueue) || (h = !0, setTimeout(t._cache.bind(t), t.cacheInterval));
                    }, r = this.cacheQueue[n], o = r.srcUrl, i = r.isCopy, a = r.cacheBundleRoot, c = Date.now().toString(), u = "", u = a ? "".concat(this.cacheDir, "/").concat(a, "/").concat(c).concat(_++).concat(cc.path.extname(n)) : "".concat(this.cacheDir, "/").concat(c).concat(_++).concat(cc.path.extname(n));
                    return void (i ? s(o, u, e) : l(o, u, null, e));
                }
                h = !1;
            },
            cacheFile: function cacheFile(e, t, n, r, o) {
                !(n = void 0 !== n ? n : this.cacheEnabled) || this.cacheQueue[e] || this.cachedFiles.has(e) || (this.cacheQueue[e] = {
                    srcUrl: t,
                    cacheBundleRoot: r,
                    isCopy: o
                }, h || (h = !0, this.outOfStorage ? h = !1 : setTimeout(this._cache.bind(this), this.cacheInterval)));
            },
            clearCache: function clearCache() {
                var t = this;
                d(this.cacheDir, !0), this.cachedFiles = new cc.AssetManager.Cache(), c(this.cacheDir, !0);
                var e = this.cacheDir + "/" + this.cachedFileName;
                this.outOfStorage = !1, a(e, JSON.stringify({
                    files: this.cachedFiles._map,
                    version: this.version
                }), "utf8"), cc.assetManager.bundles.forEach(function(e) {
                    E.test(e.base) && t.makeBundleFolder(e.name);
                });
            },
            clearLRU: function clearLRU() {
                if (!b) {
                    b = !0;
                    var n = [], r = this;
                    if (this.cachedFiles.forEach(function(e, t) {
                        "internal" !== e.bundle && (r._isZipFile(t) && cc.assetManager.bundles.has(e.bundle) || n.push({
                            originUrl: t,
                            url: e.url,
                            lastTime: e.lastTime
                        }));
                    }), n.sort(function(e, t) {
                        return e.lastTime - t.lastTime;
                    }), n.length = Math.floor(this.cachedFiles.count / 3), 0 !== n.length) {
                        for (var e = 0, t = n.length; e < t; e++) {
                            this.cachedFiles.remove(n[e].originUrl);
                        }
                        this.writeCacheFile(function() {
                            setTimeout(function e() {
                                var t = n.pop();
                                r._isZipFile(t.originUrl) ? (d(t.url, !0), r._deleteFileCB()) : f(t.url, r._deleteFileCB.bind(r)), 
                                0 < n.length ? setTimeout(e, r.deleteInterval) : b = !1;
                            }, r.deleteInterval);
                        });
                    }
                }
            },
            removeCache: function removeCache(e) {
                var t, n;
                this.cachedFiles.has(e) && (n = (t = this).cachedFiles.remove(e).url, this.writeCacheFile(function() {
                    t._isZipFile(e) ? (d(n, !0), t._deleteFileCB()) : f(n, t._deleteFileCB.bind(t));
                }));
            },
            _deleteFileCB: function _deleteFileCB(e) {
                e || (this.outOfStorage = !1);
            },
            makeBundleFolder: function makeBundleFolder(e) {
                c(this.cacheDir + "/" + e, !0);
            },
            unzipAndCacheBundle: function unzipAndCacheBundle(t, e, n, r) {
                var o = Date.now().toString(), i = "".concat(this.cacheDir, "/").concat(n, "/").concat(o).concat(_++), a = this;
                c(i, !0), p(e, i, function(e) {
                    return e ? (d(i, !0), void (r && r(e))) : (a.cachedFiles.add(t, {
                        bundle: n,
                        url: i,
                        lastTime: o
                    }), a.writeCacheFile(), void (r && r(null, i)));
                });
            },
            _isZipFile: function _isZipFile(e) {
                return ".zip" === e.slice(-4);
            }
        };
        cc.assetManager.cacheManager = t.exports = x;
    }, {} ],
    3: [ function(e, t, n) {
        "use strict";
        var o, i, f = e("../cache-manager"), r = window.fsUtils, d = r.fs, p = r.downloadFile, a = r.readText, c = r.readArrayBuffer, u = r.readJson, h = r.loadSubpackage, m = r.getUserDataPath, v = /^https?:\/\/.*/, s = cc.assetManager.downloader, l = cc.assetManager.parser, g = cc.assetManager.presets, y = __globalAdapter.isSubContext;
        s.maxConcurrency = 8, s.maxRequestsPerFrame = 64, g.scene.maxConcurrency = 10, g.scene.maxRequestsPerFrame = 64;
        var b = {}, w = {};
        function _(e, t, n) {
            "function" == typeof t && (n = t, t = null), v.test(e) ? n && n(new Error("Can not load remote scripts")) : (__cocos_require__(e), 
            n && n(null));
        }
        function E(e, t, n) {
            "function" == typeof t && (n = t, t = null);
            var r = document.createElement("audio");
            r.src = e, n && n(null, r);
        }
        function x(r, t, o, e, i) {
            var n = F(r, o);
            n.inLocal ? t(n.url, o, i) : n.inCache ? (f.updateLastTime(r), t(n.url, o, function(e, t) {
                e && f.removeCache(r), i(e, t);
            })) : p(r, null, o.header, e, function(e, n) {
                e ? i(e, null) : t(n, o, function(e, t) {
                    e || (f.tempFiles.add(r, n), f.cacheFile(r, n, o.cacheEnabled, o.__cacheBundleRoot__, !0)), 
                    i(e, t);
                });
            });
        }
        function S(e, t, n) {
            c(e, n);
        }
        function T(e, t, n) {
            a(e, n);
        }
        function N(e, t, n) {
            u(e, n);
        }
        var O = y ? function(e, t, n) {
            e = (e = F(e, t).url).slice(o.length + 1);
            var r = __cocos_require__(cc.path.changeExtname(e, ".js"));
            n && n(null, r);
        } : function(e, t, n) {
            x(e, N, t, t.onFileProgress, n);
        }, M = y ? function(e, t, n) {
            n(null, "Arial");
        } : function(e, t, n) {
            n(null, __globalAdapter.loadFont(e) || "Arial");
        };
        function A(e, t, n) {
            n(null, e);
        }
        function C(e, t, n) {
            x(e, A, t, t.onFileProgress, n);
        }
        function D(e, n, r) {
            c(e, function(e, t) {
                return e ? r(e) : void R(t, n, r);
            });
        }
        function P(e, n, r) {
            c(e, function(e, t) {
                return e ? r(e) : void I(t, n, r);
            });
        }
        var R = l.parsePVRTex, I = l.parsePKMTex;
        var j = y ? function(e, t, n) {
            n(null, e = F(e, t).url);
        } : C;
        s.downloadDomAudio = E, s.downloadScript = _, l.parsePVRTex = D, l.parsePKMTex = P, 
        s.register({
            ".js": _,
            ".mp3": C,
            ".ogg": C,
            ".wav": C,
            ".m4a": C,
            ".png": j,
            ".jpg": j,
            ".bmp": j,
            ".jpeg": j,
            ".gif": j,
            ".ico": j,
            ".tiff": j,
            ".image": j,
            ".webp": j,
            ".pvr": C,
            ".pkm": C,
            ".font": C,
            ".eot": C,
            ".ttf": C,
            ".woff": C,
            ".svg": C,
            ".ttc": C,
            ".txt": C,
            ".xml": C,
            ".vsh": C,
            ".fsh": C,
            ".atlas": C,
            ".tmx": C,
            ".tsx": C,
            ".plist": C,
            ".fnt": C,
            ".json": O,
            ".ExportJson": C,
            ".binary": C,
            ".bin": C,
            ".dbbin": C,
            ".skel": C,
            ".mp4": C,
            ".avi": C,
            ".mov": C,
            ".mpg": C,
            ".mpeg": C,
            ".rm": C,
            ".rmvb": C,
            bundle: function bundle(e, u, s) {
                var t, l, n, r = cc.path.basename(e), o = u.version || cc.assetManager.downloader.bundleVers[r];
                b[r] ? (n = "subpackages/".concat(r, "/config.").concat(o ? o + "." : "", "json"), 
                h(r, u.onFileProgress, function(e) {
                    e ? s(e, null) : O(n, u, function(e, t) {
                        t && (t.base = "subpackages/".concat(r, "/")), s(e, t);
                    });
                })) : (v.test(e) || !y && e.startsWith(m()) ? (l = e, t = "src/scripts/".concat(r, "/index.js"), 
                f.makeBundleFolder(r)) : w[r] ? (l = "".concat(i, "remote/").concat(r), t = "src/scripts/".concat(r, "/index.js"), 
                f.makeBundleFolder(r)) : (l = "assets/".concat(r), t = "assets/".concat(r, "/index.js")), 
                __cocos_require__(t), u.__cacheBundleRoot__ = r, n = "".concat(l, "/config.").concat(o ? o + "." : "", "json"), 
                O(n, u, function(e, o) {
                    var t, n, r, i, a, c;
                    e ? s && s(e) : o.isZip ? (t = o.zipVersion, n = "".concat(l, "/res.").concat(t ? t + "." : "", "zip"), 
                    r = n, i = u, a = function a(e, t) {
                        var n, r;
                        e ? s && s(e) : (o.base = t + "/res/", (n = cc.sys).platform === n.ALIPAY_GAME && n.os === n.OS_ANDROID && (r = t + "res/", 
                        d.accessSync({
                            path: r
                        }) && (o.base = r)), s && s(null, o));
                    }, (c = f.cachedFiles.get(r)) ? (f.updateLastTime(r), a && a(null, c.url)) : v.test(r) ? p(r, null, i.header, i.onFileProgress, function(e, t) {
                        e ? a && a(e) : f.unzipAndCacheBundle(r, t, i.__cacheBundleRoot__, a);
                    }) : f.unzipAndCacheBundle(r, r, i.__cacheBundleRoot__, a)) : (o.base = l + "/", 
                    s && s(null, o));
                }));
            },
            default: function _default(e, t, n) {
                x(e, T, t, t.onFileProgress, n);
            }
        }), l.register({
            ".png": s.downloadDomImage,
            ".jpg": s.downloadDomImage,
            ".bmp": s.downloadDomImage,
            ".jpeg": s.downloadDomImage,
            ".gif": s.downloadDomImage,
            ".ico": s.downloadDomImage,
            ".tiff": s.downloadDomImage,
            ".image": s.downloadDomImage,
            ".webp": s.downloadDomImage,
            ".pvr": D,
            ".pkm": P,
            ".font": M,
            ".eot": M,
            ".ttf": M,
            ".woff": M,
            ".svg": M,
            ".ttc": M,
            ".mp3": E,
            ".ogg": E,
            ".wav": E,
            ".m4a": E,
            ".txt": T,
            ".xml": T,
            ".vsh": T,
            ".fsh": T,
            ".atlas": T,
            ".tmx": T,
            ".tsx": T,
            ".fnt": T,
            ".plist": function plist(e, t, r) {
                a(e, function(e, t) {
                    var n = null;
                    e || (n = cc.plistParser.parse(t)) || (e = new Error("parse failed")), r && r(e, n);
                });
            },
            ".binary": S,
            ".bin": S,
            ".dbbin": S,
            ".skel": S,
            ".ExportJson": N
        });
        var L, F = y ? function(e, t) {
            return v.test(e) || (e = o + "/" + e), {
                url: e
            };
        } : function(e, t) {
            var n, r, o = !1, i = !1;
            return !e.startsWith(m()) && v.test(e) ? t.reload || ((n = f.cachedFiles.get(e)) ? (i = !0, 
            e = n.url) : (r = f.tempFiles.get(e)) && (o = !0, e = r)) : o = !0, {
                url: e,
                inLocal: o,
                inCache: i
            };
        };
        y ? (L = cc.assetManager.init, cc.assetManager.init = function(e) {
            L.call(cc.assetManager, e), o = e.subContextRoot || "";
        }) : (cc.assetManager.transformPipeline.append(function(e) {
            for (var t = e.output = e.input, n = 0, r = t.length; n < r; n++) {
                var o = t[n], i = o.options;
                if (o.config) i.__cacheBundleRoot__ = o.config.name; else {
                    if ("bundle" === o.ext) continue;
                    i.cacheEnabled = void 0 !== i.cacheEnabled && i.cacheEnabled;
                }
            }
        }), L = cc.assetManager.init, cc.assetManager.init = function(e) {
            L.call(cc.assetManager, e), e.subpackages && e.subpackages.forEach(function(e) {
                return b[e] = "subpackages/" + e;
            }), e.remoteBundles && e.remoteBundles.forEach(function(e) {
                return w[e] = !0;
            }), (i = e.server || "") && !i.endsWith("/") && (i += "/"), f.init();
        });
    }, {
        "../cache-manager": 2
    } ],
    4: [ function(e, t, n) {
        "use strict";
        var r, o = cc._Audio;
        o && (r = o.prototype.getDuration, Object.assign(o.prototype, {
            _createElement: function _createElement() {
                var e = this._src._nativeAsset;
                this._element || (this._element = __globalAdapter.createInnerAudioContext()), this._element.src = e.src;
            },
            destroy: function destroy() {
                this._element && (this._element.destroy(), this._element = null);
            },
            setCurrentTime: function setCurrentTime(e) {
                var t = this;
                this._src && this._src._ensureLoaded(function() {
                    t._element.seek(e);
                });
            },
            stop: function stop() {
                var e = this;
                this._src && this._src._ensureLoaded(function() {
                    e._element.seek(0), e._element.stop(), e._unbindEnded(), e.emit("stop"), e._state = o.State.STOPPED;
                });
            },
            _bindEnded: function _bindEnded() {
                var e = this._element;
                e && e.onEnded && e.onEnded(this._onended);
            },
            _unbindEnded: function _unbindEnded() {
                var e = this._element;
                e && e.offEnded && e.offEnded();
            },
            getDuration: function getDuration() {
                return r.call(this) || (this._element ? this._element.duration : 0);
            },
            _touchToPlay: function _touchToPlay() {},
            _forceUpdatingState: function _forceUpdatingState() {}
        }));
    }, {} ],
    5: [ function(e, t, n) {
        "use strict";
        cc && cc.audioEngine && (cc.audioEngine._maxAudioInstance = 10);
    }, {} ],
    6: [ function(e, t, n) {
        "use strict";
        var r = cc.internal.inputManager, o = window.__globalAdapter;
        Object.assign(r, {
            setAccelerometerEnabled: function setAccelerometerEnabled(e) {
                var t = cc.director.getScheduler();
                t.enableForTarget(this), e ? (this._registerAccelerometerEvent(), t.scheduleUpdate(this)) : (this._unregisterAccelerometerEvent(), 
                t.unscheduleUpdate(this));
            },
            _registerAccelerometerEvent: function _registerAccelerometerEvent() {
                this._accelCurTime = 0;
                var t = this;
                this._acceleration = new cc.Acceleration(), o.startAccelerometer(function(e) {
                    t._acceleration.x = e.x, t._acceleration.y = e.y, t._acceleration.z = e.y;
                });
            },
            _unregisterAccelerometerEvent: function _unregisterAccelerometerEvent() {
                this._accelCurTime = 0, o.stopAccelerometer();
            }
        });
    }, {} ],
    7: [ function(e, t, n) {
        "use strict";
        var r = cc.internal.inputManager, o = cc.renderer, i = cc.game, a = cc.dynamicAtlasManager, c = i.run;
        Object.assign(i, {
            _banRunningMainLoop: __globalAdapter.isSubContext,
            _firstSceneLaunched: !1,
            run: function run() {
                var e = this;
                cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function() {
                    e._firstSceneLaunched = !0;
                }), c.apply(this, arguments);
            },
            setFrameRate: function setFrameRate(e) {
                this.config.frameRate = e, __globalAdapter.setPreferredFramesPerSecond ? __globalAdapter.setPreferredFramesPerSecond(e) : (this._intervalId && window.cancelAnimFrame(this._intervalId), 
                this._intervalId = 0, this._paused = !0, this._setAnimFrame(), this._runMainLoop());
            },
            _runMainLoop: function _runMainLoop() {
                var e, _t, n, r, o, i;
                this._banRunningMainLoop || (n = (e = this).config, r = cc.director, o = !0, i = n.frameRate, 
                cc.debug.setDisplayStats(n.showFPS), _t = function t() {
                    if (!e._paused) {
                        if (e._intervalId = window.requestAnimFrame(_t), 30 === i && !__globalAdapter.setPreferredFramesPerSecond && (o = !o)) return;
                        r.mainLoop();
                    }
                }, e._intervalId = window.requestAnimFrame(_t), e._paused = !1);
            },
            _initRenderer: function _initRenderer() {
                var e, t;
                this._rendererInitialized || (this.frame = this.container = document.createElement("DIV"), 
                e = __globalAdapter.isSubContext ? window.sharedCanvas || __globalAdapter.getSharedCanvas() : canvas, 
                this.canvas = e, this._determineRenderType(), this.renderType === this.RENDER_TYPE_WEBGL && (t = {
                    stencil: !0,
                    antialias: cc.macro.ENABLE_WEBGL_ANTIALIAS,
                    alpha: cc.macro.ENABLE_TRANSPARENT_CANVAS,
                    preserveDrawingBuffer: !1
                }, o.initWebGL(e, t), this._renderContext = o.device._gl, !cc.macro.CLEANUP_IMAGE_CACHE && a && (a.enabled = !0)), 
                this._renderContext || (this.renderType = this.RENDER_TYPE_CANVAS, o.initCanvas(e), 
                this._renderContext = o.device._ctx), this._rendererInitialized = !0);
            },
            _initEvents: function _initEvents() {
                this.config.registerSystemEvent && r.registerSystemEvent(this.canvas);
                var t = !1;
                function e() {
                    t || (t = !0, i.emit(i.EVENT_HIDE));
                }
                function n(e) {
                    t && (t = !1, i.emit(i.EVENT_SHOW, e));
                }
                __globalAdapter.onAudioInterruptionEnd && __globalAdapter.onAudioInterruptionEnd(n), 
                __globalAdapter.onAudioInterruptionBegin && __globalAdapter.onAudioInterruptionBegin(e), 
                __globalAdapter.onShow && __globalAdapter.onShow(n), __globalAdapter.onHide && __globalAdapter.onHide(e), 
                this.on(i.EVENT_HIDE, function() {
                    i.pause();
                }), this.on(i.EVENT_SHOW, function() {
                    i.resume();
                });
            },
            end: function end() {}
        });
    }, {} ],
    8: [ function(e, t, n) {
        "use strict";
        var r = cc.internal.inputManager, o = {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
        r && Object.assign(r, {
            _updateCanvasBoundingRect: function _updateCanvasBoundingRect() {},
            registerSystemEvent: function registerSystemEvent() {
                if (!this._isRegisterEvent) {
                    this._glView = cc.view;
                    var n = this, r = {
                        onTouchStart: this.handleTouchesBegin,
                        onTouchMove: this.handleTouchesMove,
                        onTouchEnd: this.handleTouchesEnd,
                        onTouchCancel: this.handleTouchesCancel
                    };
                    for (var e in r) {
                        !function(e) {
                            var t = r[e];
                            __globalAdapter[e](function(e) {
                                e.changedTouches && t.call(n, n.getTouchesByEvent(e, o));
                            });
                        }(e);
                    }
                    this._isRegisterEvent = !0;
                }
            }
        });
    }, {} ],
    9: [ function(e, t, n) {
        "use strict";
        Object.assign(cc.screen, {
            autoFullScreen: function autoFullScreen() {}
        });
    }, {} ],
    10: [ function(e, t, n) {
        "use strict";
        var r = cc.Texture2D;
        r && Object.assign(r.prototype, {
            initWithElement: function initWithElement(e) {
                e && (this._image = e, this.handleLoadedTexture());
            }
        });
    }, {} ],
    11: [ function(e, t, n) {
        "use strict";
        t.exports = function(e, t) {
            t = t || __globalAdapter.getSystemInfoSync(), e.isNative = !1, e.isBrowser = !1, 
            e.isMobile = !0, e.language = t.language.substr(0, 2), e.languageCode = t.language.toLowerCase();
            var n = t.system.toLowerCase(), r = t.platform;
            "android" === (r = r.toLowerCase()) ? e.os = e.OS_ANDROID : "ios" === r && (e.os = e.OS_IOS), 
            "android p" === n && (n = "android p 9.0");
            var o = /[\d\.]+/.exec(n);
            e.osVersion = o ? o[0] : n, e.osMainVersion = parseInt(e.osVersion), e.browserType = null, 
            e.browserVersion = null;
            var i = t.windowWidth, a = t.windowHeight, c = t.pixelRatio || 1;
            e.windowPixelResolution = {
                width: c * i,
                height: c * a
            }, e.localStorage = window.localStorage;
            var u = !__globalAdapter.isSubContext, s = !1;
            try {
                s = document.createElement("canvas").toDataURL("image/webp").startsWith("data:image/webp");
            } catch (e) {}
            e.capabilities = {
                canvas: !0,
                opengl: !!u,
                webp: s
            }, e.__audioSupport = {
                ONLY_ONE: !1,
                WEB_AUDIO: !1,
                DELAY_CREATE_CTX: !1,
                format: [ ".mp3" ]
            };
        };
    }, {} ],
    12: [ function(e, t, n) {
        "use strict";
        t.exports = function(e) {
            e._setupContainer = function(e, t, n) {
                var r, o = e._devicePixelRatio = 1;
                e.isRetinaEnabled() && (o = e._devicePixelRatio = Math.min(e._maxPixelRatio, window.devicePixelRatio || 1)), 
                __globalAdapter.isSubContext || (t *= o, n *= o, (r = cc.game.canvas).width === t && r.height === n || (r.width = t, 
                r.height = n));
            };
        };
    }, {} ],
    13: [ function(e, t, n) {
        "use strict";
        t.exports = function(e) {
            Object.assign(e, {
                _adjustViewportMeta: function _adjustViewportMeta() {},
                setRealPixelResolution: function setRealPixelResolution(e, t, n) {
                    this.setDesignResolutionSize(e, t, n);
                },
                enableAutoFullScreen: function enableAutoFullScreen() {
                    cc.warn("cc.view.enableAutoFullScreen() is not supported on minigame platform.");
                },
                isAutoFullScreenEnabled: function isAutoFullScreenEnabled() {
                    return !1;
                },
                setCanvasSize: function setCanvasSize() {
                    cc.warn("cc.view.setCanvasSize() is not supported on minigame platform.");
                },
                setFrameSize: function setFrameSize() {
                    cc.warn("frame size is readonly on minigame platform.");
                },
                _initFrameSize: function _initFrameSize() {
                    var e, t = this._frameSize;
                    __globalAdapter.isSubContext ? (e = window.sharedCanvas || __globalAdapter.getSharedCanvas(), 
                    t.width = e.width, t.height = e.height) : (t.width = window.innerWidth, t.height = window.innerHeight);
                }
            });
        };
    }, {} ],
    14: [ function(e, t, n) {
        "use strict";
        var r = window.__globalAdapter;
        Object.assign(r, {
            adaptSys: e("./BaseSystemInfo"),
            adaptView: e("./View"),
            adaptContainerStrategy: e("./ContainerStrategy")
        });
    }, {
        "./BaseSystemInfo": 11,
        "./ContainerStrategy": 12,
        "./View": 13
    } ],
    15: [ function(e, t, n) {
        "use strict";
        e("./Audio"), e("./AudioEngine"), e("./DeviceMotionEvent"), e("./Editbox"), e("./Game"), 
        e("./InputManager"), e("./AssetManager"), e("./Screen"), e("./Texture2D"), e("./misc");
    }, {
        "./AssetManager": 3,
        "./Audio": 4,
        "./AudioEngine": 5,
        "./DeviceMotionEvent": 6,
        "./Editbox": 1,
        "./Game": 7,
        "./InputManager": 8,
        "./Screen": 9,
        "./Texture2D": 10,
        "./misc": 16
    } ],
    16: [ function(e, t, n) {
        "use strict";
        cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;
    }, {} ],
    17: [ function(e, t, n) {
        "use strict";
        t.exports = {
            cloneMethod: function cloneMethod(e, t, n, r) {
                t[n] && (e[r = r || n] = t[n].bind(t));
            }
        };
    }, {} ],
    18: [ function(e, t, n) {
        "use strict";
        function r(e) {
            this.options = e || {
                locator: {}
            };
        }
        function l() {
            this.cdata = !1;
        }
        function f(e, t) {
            t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
        }
        function d(e) {
            if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
        }
        function o(e, t, n) {
            return "string" == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
        }
        function p(e, t) {
            e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
        }
        r.prototype.parseFromString = function(e, t) {
            var n = this.options, r = new m(), o = n.domBuilder || new l(), i = n.errorHandler, a = n.locator, c = n.xmlns || {}, u = /\/x?html?$/.test(t), s = u ? h.entityMap : {
                lt: "<",
                gt: ">",
                amp: "&",
                quot: '"',
                apos: "'"
            };
            return a && o.setDocumentLocator(a), r.errorHandler = function(r, e, o) {
                if (!r) {
                    if (e instanceof l) return e;
                    r = e;
                }
                var i = {}, a = r instanceof Function;
                function t(t) {
                    var n = r[t];
                    !n && a && (n = 2 == r.length ? function(e) {
                        r(t, e);
                    } : r), i[t] = n ? function(e) {
                        n("[xmldom " + t + "]\t" + e + d(o));
                    } : function() {};
                }
                return o = o || {}, t("warning"), t("error"), t("fatalError"), i;
            }(i, o, a), r.domBuilder = n.domBuilder || o, u && (c[""] = "http://www.w3.org/1999/xhtml"), 
            c.xml = c.xml || "http://www.w3.org/XML/1998/namespace", e ? r.parse(e, c, s) : r.errorHandler.error("invalid doc source"), 
            o.doc;
        }, l.prototype = {
            startDocument: function startDocument() {
                this.doc = new i().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
            },
            startElement: function startElement(e, t, n, r) {
                var o = this.doc, i = o.createElementNS(e, n || t), a = r.length;
                p(this, i), this.currentElement = i, this.locator && f(this.locator, i);
                for (var c = 0; c < a; c++) {
                    var e = r.getURI(c), u = r.getValue(c), n = r.getQName(c), s = o.createAttributeNS(e, n);
                    this.locator && f(r.getLocator(c), s), s.value = s.nodeValue = u, i.setAttributeNode(s);
                }
            },
            endElement: function endElement() {
                var e = this.currentElement;
                e.tagName;
                this.currentElement = e.parentNode;
            },
            startPrefixMapping: function startPrefixMapping() {},
            endPrefixMapping: function endPrefixMapping() {},
            processingInstruction: function processingInstruction(e, t) {
                var n = this.doc.createProcessingInstruction(e, t);
                this.locator && f(this.locator, n), p(this, n);
            },
            ignorableWhitespace: function ignorableWhitespace() {},
            characters: function characters(e, t, n) {
                var r;
                (e = o.apply(this, arguments)) && (r = this.cdata ? this.doc.createCDATASection(e) : this.doc.createTextNode(e), 
                this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), 
                this.locator && f(this.locator, r));
            },
            skippedEntity: function skippedEntity() {},
            endDocument: function endDocument() {
                this.doc.normalize();
            },
            setDocumentLocator: function setDocumentLocator(e) {
                (this.locator = e) && (e.lineNumber = 0);
            },
            comment: function comment(e, t, n) {
                e = o.apply(this, arguments);
                var r = this.doc.createComment(e);
                this.locator && f(this.locator, r), p(this, r);
            },
            startCDATA: function startCDATA() {
                this.cdata = !0;
            },
            endCDATA: function endCDATA() {
                this.cdata = !1;
            },
            startDTD: function startDTD(e, t, n) {
                var r, o = this.doc.implementation;
                o && o.createDocumentType && (r = o.createDocumentType(e, t, n), this.locator && f(this.locator, r), 
                p(this, r));
            },
            warning: function warning(e) {
                console.warn("[xmldom warning]\t" + e, d(this.locator));
            },
            error: function error(e) {
                console.error("[xmldom error]\t" + e, d(this.locator));
            },
            fatalError: function fatalError(e) {
                throw console.error("[xmldom fatalError]\t" + e, d(this.locator)), e;
            }
        }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
            l.prototype[e] = function() {
                return null;
            };
        });
        var h = e("./entities"), m = e("./sax").XMLReader, i = n.DOMImplementation = e("./dom").DOMImplementation;
        n.XMLSerializer = e("./dom").XMLSerializer, n.DOMParser = r;
    }, {
        "./dom": 19,
        "./entities": 20,
        "./sax": 21
    } ],
    19: [ function(e, t, n) {
        "use strict";
        function d(e) {
            return (d = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function r(e, t) {
            for (var n in e) {
                t[n] = e[n];
            }
        }
        function o(e, t) {
            var n = e.prototype;
            if (!(n instanceof t)) {
                var r = function r() {};
                for (var o in r.prototype = t.prototype, r = new r(), n) {
                    r[o] = n[o];
                }
                e.prototype = n = r;
            }
            n.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), 
            n.constructor = e);
        }
        var g = "http://www.w3.org/1999/xhtml", i = {}, y = i.ELEMENT_NODE = 1, b = i.ATTRIBUTE_NODE = 2, w = i.TEXT_NODE = 3, _ = i.CDATA_SECTION_NODE = 4, E = i.ENTITY_REFERENCE_NODE = 5, x = (i.ENTITY_NODE = 6, 
        i.PROCESSING_INSTRUCTION_NODE = 7), S = i.COMMENT_NODE = 8, T = i.DOCUMENT_NODE = 9, N = i.DOCUMENT_TYPE_NODE = 10, O = i.DOCUMENT_FRAGMENT_NODE = 11, a = (i.NOTATION_NODE = 12, 
        {}), c = {};
        a.INDEX_SIZE_ERR = (c[1] = "Index size error", 1), a.DOMSTRING_SIZE_ERR = (c[2] = "DOMString size error", 
        2), a.HIERARCHY_REQUEST_ERR = (c[3] = "Hierarchy request error", 3), a.WRONG_DOCUMENT_ERR = (c[4] = "Wrong document", 
        4), a.INVALID_CHARACTER_ERR = (c[5] = "Invalid character", 5), a.NO_DATA_ALLOWED_ERR = (c[6] = "No data allowed", 
        6), a.NO_MODIFICATION_ALLOWED_ERR = (c[7] = "No modification allowed", 7), a.NOT_FOUND_ERR = (c[8] = "Not found", 
        8), a.NOT_SUPPORTED_ERR = (c[9] = "Not supported", 9), a.INUSE_ATTRIBUTE_ERR = (c[10] = "Attribute in use", 
        10), a.INVALID_STATE_ERR = (c[11] = "Invalid state", 11), a.SYNTAX_ERR = (c[12] = "Syntax error", 
        12), a.INVALID_MODIFICATION_ERR = (c[13] = "Invalid modification", 13), a.NAMESPACE_ERR = (c[14] = "Invalid namespace", 
        14), a.INVALID_ACCESS_ERR = (c[15] = "Invalid access", 15);
        function u(e, t) {
            var n;
            return t instanceof Error ? n = t : (n = this, Error.call(this, c[e]), this.message = c[e], 
            Error.captureStackTrace && Error.captureStackTrace(this, u)), n.code = e, t && (this.message = this.message + ": " + t), 
            n;
        }
        function p() {}
        function s(e, t) {
            this._node = e, this._refresh = t, l(this);
        }
        function l(e) {
            var t = e._node._inc || e._node.ownerDocument._inc;
            if (e._inc != t) {
                var n = e._refresh(e._node);
                for (var r in Z(e, "length", n.length), n) {
                    e[r] = n[r];
                }
                e._inc = t;
            }
        }
        function h() {}
        function f(e, t) {
            for (var n = e.length; n--; ) {
                if (e[n] === t) return n;
            }
        }
        function m(e, t, n, r) {
            var o, i, a, c;
            r ? t[f(t, r)] = n : t[t.length++] = n, !e || (o = (n.ownerElement = e).ownerDocument) && (r && R(o, e, r), 
            a = e, c = n, (i = o) && i._inc++, "http://www.w3.org/2000/xmlns/" == c.namespaceURI && (a._nsMap[c.prefix ? c.localName : ""] = c.value));
        }
        function v(e, t, n) {
            var r = f(t, n);
            if (!(0 <= r)) throw u(8, new Error(e.tagName + "@" + n));
            for (var o, i = t.length - 1; r < i; ) {
                t[r] = t[++r];
            }
            t.length = i, !e || (o = e.ownerDocument) && (R(o, e, n), n.ownerElement = null);
        }
        function M(e) {
            if (this._features = {}, e) for (var t in e) {
                this._features = e[t];
            }
        }
        function A() {}
        function C(e) {
            return ("<" == e ? "&lt;" : ">" == e && "&gt;") || "&" == e && "&amp;" || '"' == e && "&quot;" || "&#" + e.charCodeAt() + ";";
        }
        function D(e, t) {
            if (t(e)) return 1;
            if (e = e.firstChild) do {
                if (D(e, t)) return 1;
            } while (e = e.nextSibling);
        }
        function P() {}
        function R(e, t, n) {
            e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""];
        }
        function I(e, t, n) {
            if (e && e._inc) {
                e._inc++;
                var r = t.childNodes;
                if (n) r[r.length++] = n; else {
                    for (var o = t.firstChild, i = 0; o; ) {
                        o = (r[i++] = o).nextSibling;
                    }
                    r.length = i;
                }
            }
        }
        function j(e, t) {
            var n = t.previousSibling, r = t.nextSibling;
            return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, 
            I(e.ownerDocument, e), t;
        }
        function L(e, t, n) {
            var r = t.parentNode;
            if (r && r.removeChild(t), t.nodeType === O) {
                var o = t.firstChild;
                if (null == o) return t;
                var i = t.lastChild;
            } else o = i = t;
            var a = n ? n.previousSibling : e.lastChild;
            for (o.previousSibling = a, i.nextSibling = n, a ? a.nextSibling = o : e.firstChild = o, 
            null == n ? e.lastChild = i : n.previousSibling = i; o.parentNode = e, o !== i && (o = o.nextSibling); ) {}
            return I(e.ownerDocument || e, e), t.nodeType == O && (t.firstChild = t.lastChild = null), 
            t;
        }
        function F() {
            this._nsMap = {};
        }
        function k() {}
        function H() {}
        function U() {}
        function B() {}
        function V() {}
        function W() {}
        function z() {}
        function G() {}
        function q() {}
        function $() {}
        function X() {}
        function K() {}
        function Y(e, t) {
            var n, r = [], o = 9 == this.nodeType && this.documentElement || this, i = o.prefix, a = o.namespaceURI;
            return a && null == i && null == (i = o.lookupPrefix(a)) && (n = [ {
                namespace: a,
                prefix: null
            } ]), Q(this, r, e, t, n), r.join("");
        }
        function J(e, t, n) {
            var r = e.prefix || "", o = e.namespaceURI;
            if ((r || o) && ("xml" !== r || "http://www.w3.org/XML/1998/namespace" !== o) && "http://www.w3.org/2000/xmlns/" != o) {
                for (var i = n.length; i--; ) {
                    var a = n[i];
                    if (a.prefix == r) return a.namespace != o;
                }
                return 1;
            }
        }
        function Q(e, t, n, r, o) {
            if (r) {
                if (!(e = r(e))) return;
                if ("string" == typeof e) return void t.push(e);
            }
            switch (e.nodeType) {
              case y:
                o = o || [];
                var i = e.attributes, a = i.length, c = e.firstChild, u = e.tagName;
                n = g === e.namespaceURI || n, t.push("<", u);
                for (var s = 0; s < a; s++) {
                    "xmlns" == (l = i.item(s)).prefix ? o.push({
                        prefix: l.localName,
                        namespace: l.value
                    }) : "xmlns" == l.nodeName && o.push({
                        prefix: "",
                        namespace: l.value
                    });
                }
                for (var l, f, d, p, s = 0; s < a; s++) {
                    J(l = i.item(s), 0, o) && (f = l.prefix || "", d = l.namespaceURI, p = f ? " xmlns:" + f : " xmlns", 
                    t.push(p, '="', d, '"'), o.push({
                        prefix: f,
                        namespace: d
                    })), Q(l, t, n, r, o);
                }
                if (J(e, 0, o) && (f = e.prefix || "", d = e.namespaceURI, p = f ? " xmlns:" + f : " xmlns", 
                t.push(p, '="', d, '"'), o.push({
                    prefix: f,
                    namespace: d
                })), c || n && !/^(?:meta|link|img|br|hr|input)$/i.test(u)) {
                    if (t.push(">"), n && /^script$/i.test(u)) for (;c; ) {
                        c.data ? t.push(c.data) : Q(c, t, n, r, o), c = c.nextSibling;
                    } else for (;c; ) {
                        Q(c, t, n, r, o), c = c.nextSibling;
                    }
                    t.push("</", u, ">");
                } else t.push("/>");
                return;

              case T:
              case O:
                for (c = e.firstChild; c; ) {
                    Q(c, t, n, r, o), c = c.nextSibling;
                }
                return;

              case b:
                return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, C), '"');

              case w:
                return t.push(e.data.replace(/[<&]/g, C));

              case _:
                return t.push("<![CDATA[", e.data, "]]>");

              case S:
                return t.push("\x3c!--", e.data, "--\x3e");

              case N:
                var h, m = e.publicId, v = e.systemId;
                return t.push("<!DOCTYPE ", e.name), void (m ? (t.push(' PUBLIC "', m), v && "." != v && t.push('" "', v), 
                t.push('">')) : v && "." != v ? t.push(' SYSTEM "', v, '">') : ((h = e.internalSubset) && t.push(" [", h, "]"), 
                t.push(">")));

              case x:
                return t.push("<?", e.target, " ", e.data, "?>");

              case E:
                return t.push("&", e.nodeName, ";");

              default:
                t.push("??", e.nodeName);
            }
        }
        function Z(e, t, n) {
            e[t] = n;
        }
        u.prototype = Error.prototype, r(a, u), p.prototype = {
            length: 0,
            item: function item(e) {
                return this[e] || null;
            },
            toString: function toString(e, t) {
                for (var n = [], r = 0; r < this.length; r++) {
                    Q(this[r], n, e, t);
                }
                return n.join("");
            }
        }, s.prototype.item = function(e) {
            return l(this), this[e];
        }, o(s, p), h.prototype = {
            length: 0,
            item: p.prototype.item,
            getNamedItem: function getNamedItem(e) {
                for (var t = this.length; t--; ) {
                    var n = this[t];
                    if (n.nodeName == e) return n;
                }
            },
            setNamedItem: function setNamedItem(e) {
                var t = e.ownerElement;
                if (t && t != this._ownerElement) throw new u(10);
                var n = this.getNamedItem(e.nodeName);
                return m(this._ownerElement, this, e, n), n;
            },
            setNamedItemNS: function setNamedItemNS(e) {
                var t, n = e.ownerElement;
                if (n && n != this._ownerElement) throw new u(10);
                return t = this.getNamedItemNS(e.namespaceURI, e.localName), m(this._ownerElement, this, e, t), 
                t;
            },
            removeNamedItem: function removeNamedItem(e) {
                var t = this.getNamedItem(e);
                return v(this._ownerElement, this, t), t;
            },
            removeNamedItemNS: function removeNamedItemNS(e, t) {
                var n = this.getNamedItemNS(e, t);
                return v(this._ownerElement, this, n), n;
            },
            getNamedItemNS: function getNamedItemNS(e, t) {
                for (var n = this.length; n--; ) {
                    var r = this[n];
                    if (r.localName == t && r.namespaceURI == e) return r;
                }
                return null;
            }
        }, M.prototype = {
            hasFeature: function hasFeature(e, t) {
                var n = this._features[e.toLowerCase()];
                return !(!n || t && !(t in n));
            },
            createDocument: function createDocument(e, t, n) {
                var r, o = new P();
                return o.implementation = this, o.childNodes = new p(), (o.doctype = n) && o.appendChild(n), 
                t && (r = o.createElementNS(e, t), o.appendChild(r)), o;
            },
            createDocumentType: function createDocumentType(e, t, n) {
                var r = new W();
                return r.name = e, r.nodeName = e, r.publicId = t, r.systemId = n, r;
            }
        }, A.prototype = {
            firstChild: null,
            lastChild: null,
            previousSibling: null,
            nextSibling: null,
            attributes: null,
            parentNode: null,
            childNodes: null,
            ownerDocument: null,
            nodeValue: null,
            namespaceURI: null,
            prefix: null,
            localName: null,
            insertBefore: function insertBefore(e, t) {
                return L(this, e, t);
            },
            replaceChild: function replaceChild(e, t) {
                this.insertBefore(e, t), t && this.removeChild(t);
            },
            removeChild: function removeChild(e) {
                return j(this, e);
            },
            appendChild: function appendChild(e) {
                return this.insertBefore(e, null);
            },
            hasChildNodes: function hasChildNodes() {
                return null != this.firstChild;
            },
            cloneNode: function cloneNode(e) {
                return function e(t, n, r) {
                    var o = new n.constructor();
                    for (var i in n) {
                        var a = n[i];
                        "object" != d(a) && a != o[i] && (o[i] = a);
                    }
                    n.childNodes && (o.childNodes = new p());
                    o.ownerDocument = t;
                    switch (o.nodeType) {
                      case y:
                        var c = n.attributes, u = o.attributes = new h(), s = c.length;
                        u._ownerElement = o;
                        for (var l = 0; l < s; l++) {
                            o.setAttributeNode(e(t, c.item(l), !0));
                        }
                        break;

                      case b:
                        r = !0;
                    }
                    if (r) for (var f = n.firstChild; f; ) {
                        o.appendChild(e(t, f, r)), f = f.nextSibling;
                    }
                    return o;
                }(this.ownerDocument || this, this, e);
            },
            normalize: function normalize() {
                for (var e = this.firstChild; e; ) {
                    var t = e.nextSibling;
                    t && t.nodeType == w && e.nodeType == w ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), 
                    e = t);
                }
            },
            isSupported: function isSupported(e, t) {
                return this.ownerDocument.implementation.hasFeature(e, t);
            },
            hasAttributes: function hasAttributes() {
                return 0 < this.attributes.length;
            },
            lookupPrefix: function lookupPrefix(e) {
                for (var t = this; t; ) {
                    var n = t._nsMap;
                    if (n) for (var r in n) {
                        if (n[r] == e) return r;
                    }
                    t = t.nodeType == b ? t.ownerDocument : t.parentNode;
                }
                return null;
            },
            lookupNamespaceURI: function lookupNamespaceURI(e) {
                for (var t = this; t; ) {
                    var n = t._nsMap;
                    if (n && e in n) return n[e];
                    t = t.nodeType == b ? t.ownerDocument : t.parentNode;
                }
                return null;
            },
            isDefaultNamespace: function isDefaultNamespace(e) {
                return null == this.lookupPrefix(e);
            }
        }, r(i, A), r(i, A.prototype), P.prototype = {
            nodeName: "#document",
            nodeType: T,
            doctype: null,
            documentElement: null,
            _inc: 1,
            insertBefore: function insertBefore(e, t) {
                if (e.nodeType != O) return null == this.documentElement && e.nodeType == y && (this.documentElement = e), 
                L(this, e, t), e.ownerDocument = this, e;
                for (var n = e.firstChild; n; ) {
                    var r = n.nextSibling;
                    this.insertBefore(n, t), n = r;
                }
                return e;
            },
            removeChild: function removeChild(e) {
                return this.documentElement == e && (this.documentElement = null), j(this, e);
            },
            importNode: function importNode(e, t) {
                return function e(t, n, r) {
                    var o;
                    switch (n.nodeType) {
                      case y:
                        (o = n.cloneNode(!1)).ownerDocument = t;

                      case O:
                        break;

                      case b:
                        r = !0;
                    }
                    o = o || n.cloneNode(!1);
                    o.ownerDocument = t;
                    o.parentNode = null;
                    if (r) for (var i = n.firstChild; i; ) {
                        o.appendChild(e(t, i, r)), i = i.nextSibling;
                    }
                    return o;
                }(this, e, t);
            },
            getElementById: function getElementById(t) {
                var n = null;
                return D(this.documentElement, function(e) {
                    if (e.nodeType == y && e.getAttribute("id") == t) return n = e, !0;
                }), n;
            },
            createElement: function createElement(e) {
                var t = new F();
                return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new p(), 
                (t.attributes = new h())._ownerElement = t;
            },
            createDocumentFragment: function createDocumentFragment() {
                var e = new $();
                return e.ownerDocument = this, e.childNodes = new p(), e;
            },
            createTextNode: function createTextNode(e) {
                var t = new U();
                return t.ownerDocument = this, t.appendData(e), t;
            },
            createComment: function createComment(e) {
                var t = new B();
                return t.ownerDocument = this, t.appendData(e), t;
            },
            createCDATASection: function createCDATASection(e) {
                var t = new V();
                return t.ownerDocument = this, t.appendData(e), t;
            },
            createProcessingInstruction: function createProcessingInstruction(e, t) {
                var n = new X();
                return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, 
                n;
            },
            createAttribute: function createAttribute(e) {
                var t = new k();
                return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, 
                t;
            },
            createEntityReference: function createEntityReference(e) {
                var t = new q();
                return t.ownerDocument = this, t.nodeName = e, t;
            },
            createElementNS: function createElementNS(e, t) {
                var n = new F(), r = t.split(":"), o = n.attributes = new h();
                return n.childNodes = new p(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, 
                n.namespaceURI = e, 2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, 
                o._ownerElement = n;
            },
            createAttributeNS: function createAttributeNS(e, t) {
                var n = new k(), r = t.split(":");
                return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 
                2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n;
            }
        }, o(P, A), P.prototype.getElementsByTagName = (F.prototype = {
            nodeType: y,
            hasAttribute: function hasAttribute(e) {
                return null != this.getAttributeNode(e);
            },
            getAttribute: function getAttribute(e) {
                var t = this.getAttributeNode(e);
                return t && t.value || "";
            },
            getAttributeNode: function getAttributeNode(e) {
                return this.attributes.getNamedItem(e);
            },
            setAttribute: function setAttribute(e, t) {
                var n = this.ownerDocument.createAttribute(e);
                n.value = n.nodeValue = "" + t, this.setAttributeNode(n);
            },
            removeAttribute: function removeAttribute(e) {
                var t = this.getAttributeNode(e);
                t && this.removeAttributeNode(t);
            },
            appendChild: function appendChild(e) {
                return e.nodeType === O ? this.insertBefore(e, null) : function(e, t) {
                    var n = t.parentNode;
                    n && (r = e.lastChild, n.removeChild(t), r = e.lastChild);
                    var r = e.lastChild;
                    return t.parentNode = e, t.previousSibling = r, t.nextSibling = null, r ? r.nextSibling = t : e.firstChild = t, 
                    e.lastChild = t, I(e.ownerDocument, e, t), t;
                }(this, e);
            },
            setAttributeNode: function setAttributeNode(e) {
                return this.attributes.setNamedItem(e);
            },
            setAttributeNodeNS: function setAttributeNodeNS(e) {
                return this.attributes.setNamedItemNS(e);
            },
            removeAttributeNode: function removeAttributeNode(e) {
                return this.attributes.removeNamedItem(e.nodeName);
            },
            removeAttributeNS: function removeAttributeNS(e, t) {
                var n = this.getAttributeNodeNS(e, t);
                n && this.removeAttributeNode(n);
            },
            hasAttributeNS: function hasAttributeNS(e, t) {
                return null != this.getAttributeNodeNS(e, t);
            },
            getAttributeNS: function getAttributeNS(e, t) {
                var n = this.getAttributeNodeNS(e, t);
                return n && n.value || "";
            },
            setAttributeNS: function setAttributeNS(e, t, n) {
                var r = this.ownerDocument.createAttributeNS(e, t);
                r.value = r.nodeValue = "" + n, this.setAttributeNode(r);
            },
            getAttributeNodeNS: function getAttributeNodeNS(e, t) {
                return this.attributes.getNamedItemNS(e, t);
            },
            getElementsByTagName: function getElementsByTagName(r) {
                return new s(this, function(t) {
                    var n = [];
                    return D(t, function(e) {
                        e === t || e.nodeType != y || "*" !== r && e.tagName != r || n.push(e);
                    }), n;
                });
            },
            getElementsByTagNameNS: function getElementsByTagNameNS(r, o) {
                return new s(this, function(t) {
                    var n = [];
                    return D(t, function(e) {
                        e === t || e.nodeType !== y || "*" !== r && e.namespaceURI !== r || "*" !== o && e.localName != o || n.push(e);
                    }), n;
                });
            }
        }).getElementsByTagName, P.prototype.getElementsByTagNameNS = F.prototype.getElementsByTagNameNS, 
        o(F, A), k.prototype.nodeType = b, o(k, A), H.prototype = {
            data: "",
            substringData: function substringData(e, t) {
                return this.data.substring(e, e + t);
            },
            appendData: function appendData(e) {
                e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
            },
            insertData: function insertData(e, t) {
                this.replaceData(e, 0, t);
            },
            appendChild: function appendChild() {
                throw new Error(c[3]);
            },
            deleteData: function deleteData(e, t) {
                this.replaceData(e, t, "");
            },
            replaceData: function replaceData(e, t, n) {
                n = this.data.substring(0, e) + n + this.data.substring(e + t), this.nodeValue = this.data = n, 
                this.length = n.length;
            }
        }, o(H, A), U.prototype = {
            nodeName: "#text",
            nodeType: w,
            splitText: function splitText(e) {
                var t = (n = this.data).substring(e), n = n.substring(0, e);
                this.data = this.nodeValue = n, this.length = n.length;
                var r = this.ownerDocument.createTextNode(t);
                return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
            }
        }, o(U, H), B.prototype = {
            nodeName: "#comment",
            nodeType: S
        }, o(B, H), V.prototype = {
            nodeName: "#cdata-section",
            nodeType: _
        }, o(V, H), W.prototype.nodeType = N, o(W, A), z.prototype.nodeType = 12, o(z, A), 
        G.prototype.nodeType = 6, o(G, A), q.prototype.nodeType = E, o(q, A), $.prototype.nodeName = "#document-fragment", 
        $.prototype.nodeType = O, o($, A), X.prototype.nodeType = x, o(X, A), K.prototype.serializeToString = function(e, t, n) {
            return Y.call(e, t, n);
        }, A.prototype.toString = Y;
        try {
            Object.defineProperty && (Object.defineProperty(s.prototype, "length", {
                get: function get() {
                    return l(this), this.$$length;
                }
            }), Object.defineProperty(A.prototype, "textContent", {
                get: function get() {
                    return function e(t) {
                        switch (t.nodeType) {
                          case y:
                          case O:
                            var n = [];
                            for (t = t.firstChild; t; ) {
                                7 !== t.nodeType && 8 !== t.nodeType && n.push(e(t)), t = t.nextSibling;
                            }
                            return n.join("");

                          default:
                            return t.nodeValue;
                        }
                    }(this);
                },
                set: function set(e) {
                    switch (this.nodeType) {
                      case y:
                      case O:
                        for (;this.firstChild; ) {
                            this.removeChild(this.firstChild);
                        }
                        (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                        break;

                      default:
                        this.data = e, this.value = e, this.nodeValue = e;
                    }
                }
            }), Z = function Z(e, t, n) {
                e["$$" + t] = n;
            });
        } catch (e) {}
        n.DOMImplementation = M, n.XMLSerializer = K;
    }, {} ],
    20: [ function(e, t, n) {
        "use strict";
        n.entityMap = {
            lt: "<",
            gt: ">",
            amp: "&",
            quot: '"',
            apos: "'",
            Agrave: "À",
            Aacute: "Á",
            Acirc: "Â",
            Atilde: "Ã",
            Auml: "Ä",
            Aring: "Å",
            AElig: "Æ",
            Ccedil: "Ç",
            Egrave: "È",
            Eacute: "É",
            Ecirc: "Ê",
            Euml: "Ë",
            Igrave: "Ì",
            Iacute: "Í",
            Icirc: "Î",
            Iuml: "Ï",
            ETH: "Ð",
            Ntilde: "Ñ",
            Ograve: "Ò",
            Oacute: "Ó",
            Ocirc: "Ô",
            Otilde: "Õ",
            Ouml: "Ö",
            Oslash: "Ø",
            Ugrave: "Ù",
            Uacute: "Ú",
            Ucirc: "Û",
            Uuml: "Ü",
            Yacute: "Ý",
            THORN: "Þ",
            szlig: "ß",
            agrave: "à",
            aacute: "á",
            acirc: "â",
            atilde: "ã",
            auml: "ä",
            aring: "å",
            aelig: "æ",
            ccedil: "ç",
            egrave: "è",
            eacute: "é",
            ecirc: "ê",
            euml: "ë",
            igrave: "ì",
            iacute: "í",
            icirc: "î",
            iuml: "ï",
            eth: "ð",
            ntilde: "ñ",
            ograve: "ò",
            oacute: "ó",
            ocirc: "ô",
            otilde: "õ",
            ouml: "ö",
            oslash: "ø",
            ugrave: "ù",
            uacute: "ú",
            ucirc: "û",
            uuml: "ü",
            yacute: "ý",
            thorn: "þ",
            yuml: "ÿ",
            nbsp: " ",
            iexcl: "¡",
            cent: "¢",
            pound: "£",
            curren: "¤",
            yen: "¥",
            brvbar: "¦",
            sect: "§",
            uml: "¨",
            copy: "©",
            ordf: "ª",
            laquo: "«",
            not: "¬",
            shy: "­­",
            reg: "®",
            macr: "¯",
            deg: "°",
            plusmn: "±",
            sup2: "²",
            sup3: "³",
            acute: "´",
            micro: "µ",
            para: "¶",
            middot: "·",
            cedil: "¸",
            sup1: "¹",
            ordm: "º",
            raquo: "»",
            frac14: "¼",
            frac12: "½",
            frac34: "¾",
            iquest: "¿",
            times: "×",
            divide: "÷",
            forall: "∀",
            part: "∂",
            exist: "∃",
            empty: "∅",
            nabla: "∇",
            isin: "∈",
            notin: "∉",
            ni: "∋",
            prod: "∏",
            sum: "∑",
            minus: "−",
            lowast: "∗",
            radic: "√",
            prop: "∝",
            infin: "∞",
            ang: "∠",
            and: "∧",
            or: "∨",
            cap: "∩",
            cup: "∪",
            int: "∫",
            there4: "∴",
            sim: "∼",
            cong: "≅",
            asymp: "≈",
            ne: "≠",
            equiv: "≡",
            le: "≤",
            ge: "≥",
            sub: "⊂",
            sup: "⊃",
            nsub: "⊄",
            sube: "⊆",
            supe: "⊇",
            oplus: "⊕",
            otimes: "⊗",
            perp: "⊥",
            sdot: "⋅",
            Alpha: "Α",
            Beta: "Β",
            Gamma: "Γ",
            Delta: "Δ",
            Epsilon: "Ε",
            Zeta: "Ζ",
            Eta: "Η",
            Theta: "Θ",
            Iota: "Ι",
            Kappa: "Κ",
            Lambda: "Λ",
            Mu: "Μ",
            Nu: "Ν",
            Xi: "Ξ",
            Omicron: "Ο",
            Pi: "Π",
            Rho: "Ρ",
            Sigma: "Σ",
            Tau: "Τ",
            Upsilon: "Υ",
            Phi: "Φ",
            Chi: "Χ",
            Psi: "Ψ",
            Omega: "Ω",
            alpha: "α",
            beta: "β",
            gamma: "γ",
            delta: "δ",
            epsilon: "ε",
            zeta: "ζ",
            eta: "η",
            theta: "θ",
            iota: "ι",
            kappa: "κ",
            lambda: "λ",
            mu: "μ",
            nu: "ν",
            xi: "ξ",
            omicron: "ο",
            pi: "π",
            rho: "ρ",
            sigmaf: "ς",
            sigma: "σ",
            tau: "τ",
            upsilon: "υ",
            phi: "φ",
            chi: "χ",
            psi: "ψ",
            omega: "ω",
            thetasym: "ϑ",
            upsih: "ϒ",
            piv: "ϖ",
            OElig: "Œ",
            oelig: "œ",
            Scaron: "Š",
            scaron: "š",
            Yuml: "Ÿ",
            fnof: "ƒ",
            circ: "ˆ",
            tilde: "˜",
            ensp: " ",
            emsp: " ",
            thinsp: " ",
            zwnj: "‌",
            zwj: "‍",
            lrm: "‎",
            rlm: "‏",
            ndash: "–",
            mdash: "—",
            lsquo: "‘",
            rsquo: "’",
            sbquo: "‚",
            ldquo: "“",
            rdquo: "”",
            bdquo: "„",
            dagger: "†",
            Dagger: "‡",
            bull: "•",
            hellip: "…",
            permil: "‰",
            prime: "′",
            Prime: "″",
            lsaquo: "‹",
            rsaquo: "›",
            oline: "‾",
            euro: "€",
            trade: "™",
            larr: "←",
            uarr: "↑",
            rarr: "→",
            darr: "↓",
            harr: "↔",
            crarr: "↵",
            lceil: "⌈",
            rceil: "⌉",
            lfloor: "⌊",
            rfloor: "⌋",
            loz: "◊",
            spades: "♠",
            clubs: "♣",
            hearts: "♥",
            diams: "♦"
        };
    }, {} ],
    21: [ function(e, t, n) {
        "use strict";
        var r = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, o = new RegExp("[\\-\\.0-9" + r.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), i = new RegExp("^" + r.source + o.source + "*(?::" + r.source + o.source + "*)?$"), C = 0, D = 1, P = 2, R = 3, I = 4, j = 5, L = 6, F = 7;
        function a() {}
        function k(e, t) {
            return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
        }
        function H(e, t, n) {
            for (var r = e.tagName, o = null, i = e.length; i--; ) {
                var a = e[i], c = a.qName, u = a.value, s = 0 < (f = c.indexOf(":")) ? (l = a.prefix = c.slice(0, f), 
                d = c.slice(f + 1), "xmlns" === l && d) : (l = null, "xmlns" === (d = c) && "");
                a.localName = d, !1 !== s && (null == o && (o = {}, h(n, n = {})), n[s] = o[s] = u, 
                a.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(s, u));
            }
            for (var l, i = e.length; i--; ) {
                (l = (a = e[i]).prefix) && ("xml" === l && (a.uri = "http://www.w3.org/XML/1998/namespace"), 
                "xmlns" !== l && (a.uri = n[l || ""]));
            }
            var f, d = 0 < (f = r.indexOf(":")) ? (l = e.prefix = r.slice(0, f), e.localName = r.slice(f + 1)) : (l = null, 
            e.localName = r), p = e.uri = n[l || ""];
            if (t.startElement(p, d, r, e), !e.closed) return e.currentNSMap = n, e.localNSMap = o, 
            1;
            if (t.endElement(p, d, r), o) for (l in o) {
                t.endPrefixMapping(l);
            }
        }
        function h(e, t) {
            for (var n in e) {
                t[n] = e[n];
            }
        }
        function U(e) {}
        a.prototype = {
            parse: function parse(e, t, n) {
                var r = this.domBuilder;
                r.startDocument(), h(t, t = {}), function(n, e, r, o, i) {
                    function a(e) {
                        var t = e.slice(1, -1);
                        return t in r ? r[t] : "#" === t.charAt(0) ? function(e) {
                            if (65535 < e) {
                                var t = 55296 + ((e -= 65536) >> 10), n = 56320 + (1023 & e);
                                return String.fromCharCode(t, n);
                            }
                            return String.fromCharCode(e);
                        }(parseInt(t.substr(1).replace("x", "0x"))) : (i.error("entity not found:" + e), 
                        e);
                    }
                    function t(e) {
                        var t;
                        h < e && (t = n.substring(h, e).replace(/&#?\w+;/g, a), f && c(h), o.characters(t, 0, e - h), 
                        h = e);
                    }
                    function c(e, t) {
                        for (;s <= e && (t = l.exec(n)); ) {
                            u = t.index, s = u + t[0].length, f.lineNumber++;
                        }
                        f.columnNumber = e - u + 1;
                    }
                    var u = 0, s = 0, l = /.*(?:\r\n?|\n)|.*$/g, f = o.locator, d = [ {
                        currentNSMap: e
                    } ], p = {}, h = 0;
                    for (;;) {
                        try {
                            var m, v, g = n.indexOf("<", h);
                            if (g < 0) return n.substr(h).match(/^\s*$/) || (m = o.doc, v = m.createTextNode(n.substr(h)), 
                            m.appendChild(v), o.currentElement = v);
                            switch (h < g && t(g), n.charAt(g + 1)) {
                              case "/":
                                var y = n.indexOf(">", g + 3), b = n.substring(g + 2, y), w = d.pop();
                                y < 0 ? (b = n.substring(g + 2).replace(/[\s<].*/, ""), i.error("end tag name: " + b + " is not complete:" + w.tagName), 
                                y = g + 1 + b.length) : b.match(/\s</) && (b = b.replace(/[\s<].*/, ""), i.error("end tag name: " + b + " maybe not complete"), 
                                y = g + 1 + b.length);
                                var _ = w.localNSMap, E = w.tagName == b;
                                if (E || w.tagName && w.tagName.toLowerCase() == b.toLowerCase()) {
                                    if (o.endElement(w.uri, w.localName, b), _) for (var x in _) {
                                        o.endPrefixMapping(x);
                                    }
                                    E || i.fatalError("end tag name: " + b + " is not match the current start tagName:" + w.tagName);
                                } else d.push(w);
                                y++;
                                break;

                              case "?":
                                f && c(g), y = function(e, t, n) {
                                    var r = e.indexOf("?>", t);
                                    if (r) {
                                        var o = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                                        if (o) {
                                            o[0].length;
                                            return n.processingInstruction(o[1], o[2]), r + 2;
                                        }
                                        return -1;
                                    }
                                    return -1;
                                }(n, g, o);
                                break;

                              case "!":
                                f && c(g), y = function(e, t, n, r) {
                                    switch (e.charAt(t + 2)) {
                                      case "-":
                                        if ("-" !== e.charAt(t + 3)) return -1;
                                        var o = e.indexOf("--\x3e", t + 4);
                                        return t < o ? (n.comment(e, t + 4, o - t - 4), o + 3) : (r.error("Unclosed comment"), 
                                        -1);

                                      default:
                                        if ("CDATA[" == e.substr(t + 3, 6)) {
                                            o = e.indexOf("]]>", t + 9);
                                            return n.startCDATA(), n.characters(e, t + 9, o - t - 9), n.endCDATA(), o + 3;
                                        }
                                        var i = function(e, t) {
                                            var n, r = [], o = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                                            o.lastIndex = t, o.exec(e);
                                            for (;n = o.exec(e); ) {
                                                if (r.push(n), n[1]) return r;
                                            }
                                        }(e, t), a = i.length;
                                        if (1 < a && /!doctype/i.test(i[0][0])) {
                                            var c = i[1][0], u = 3 < a && /^public$/i.test(i[2][0]) && i[3][0], s = 4 < a && i[4][0], l = i[a - 1];
                                            return n.startDTD(c, u && u.replace(/^(['"])(.*?)\1$/, "$2"), s && s.replace(/^(['"])(.*?)\1$/, "$2")), 
                                            n.endDTD(), l.index + l[0].length;
                                        }
                                    }
                                    return -1;
                                }(n, g, o, i);
                                break;

                              default:
                                f && c(g);
                                var S = new U(), T = d[d.length - 1].currentNSMap, y = function(e, t, n, r, o, i) {
                                    var a, c = ++t, u = C;
                                    for (;;) {
                                        var s = e.charAt(c);
                                        switch (s) {
                                          case "=":
                                            if (u === D) a = e.slice(t, c), u = R; else {
                                                if (u !== P) throw new Error("attribute equal must after attrName");
                                                u = R;
                                            }
                                            break;

                                          case "'":
                                          case '"':
                                            if (u === R || u === D) {
                                                if (u === D && (i.warning('attribute value must after "="'), a = e.slice(t, c)), 
                                                t = c + 1, !(0 < (c = e.indexOf(s, t)))) throw new Error("attribute value no end '" + s + "' match");
                                                l = e.slice(t, c).replace(/&#?\w+;/g, o), n.add(a, l, t - 1), u = j;
                                            } else {
                                                if (u != I) throw new Error('attribute value must after "="');
                                                l = e.slice(t, c).replace(/&#?\w+;/g, o), n.add(a, l, t), i.warning('attribute "' + a + '" missed start quot(' + s + ")!!"), 
                                                t = c + 1, u = j;
                                            }
                                            break;

                                          case "/":
                                            switch (u) {
                                              case C:
                                                n.setTagName(e.slice(t, c));

                                              case j:
                                              case L:
                                              case F:
                                                u = F, n.closed = !0;

                                              case I:
                                              case D:
                                              case P:
                                                break;

                                              default:
                                                throw new Error("attribute invalid close char('/')");
                                            }
                                            break;

                                          case "":
                                            return i.error("unexpected end of input"), u == C && n.setTagName(e.slice(t, c)), 
                                            c;

                                          case ">":
                                            switch (u) {
                                              case C:
                                                n.setTagName(e.slice(t, c));

                                              case j:
                                              case L:
                                              case F:
                                                break;

                                              case I:
                                              case D:
                                                "/" === (l = e.slice(t, c)).slice(-1) && (n.closed = !0, l = l.slice(0, -1));

                                              case P:
                                                u === P && (l = a), u == I ? (i.warning('attribute "' + l + '" missed quot(")!!'), 
                                                n.add(a, l.replace(/&#?\w+;/g, o), t)) : ("http://www.w3.org/1999/xhtml" === r[""] && l.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + l + '" missed value!! "' + l + '" instead!!'), 
                                                n.add(l, l, t));
                                                break;

                                              case R:
                                                throw new Error("attribute value missed!!");
                                            }
                                            return c;

                                          case "":
                                            s = " ";

                                          default:
                                            if (s <= " ") switch (u) {
                                              case C:
                                                n.setTagName(e.slice(t, c)), u = L;
                                                break;

                                              case D:
                                                a = e.slice(t, c), u = P;
                                                break;

                                              case I:
                                                var l = e.slice(t, c).replace(/&#?\w+;/g, o);
                                                i.warning('attribute "' + l + '" missed quot(")!!'), n.add(a, l, t);

                                              case j:
                                                u = L;
                                            } else switch (u) {
                                              case P:
                                                n.tagName;
                                                "http://www.w3.org/1999/xhtml" === r[""] && a.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + a + '" missed value!! "' + a + '" instead2!!'), 
                                                n.add(a, a, t), t = c, u = D;
                                                break;

                                              case j:
                                                i.warning('attribute space is required"' + a + '"!!');

                                              case L:
                                                u = D, t = c;
                                                break;

                                              case R:
                                                u = I, t = c;
                                                break;

                                              case F:
                                                throw new Error("elements closed character '/' and '>' must be connected to");
                                            }
                                        }
                                        c++;
                                    }
                                }(n, g, S, T, a, i), N = S.length;
                                if (!S.closed && function(e, t, n, r) {
                                    var o = r[n];
                                    null == o && ((o = e.lastIndexOf("</" + n + ">")) < t && (o = e.lastIndexOf("</" + n)), 
                                    r[n] = o);
                                    return o < t;
                                }(n, y, S.tagName, p) && (S.closed = !0, r.nbsp || i.warning("unclosed xml attribute")), 
                                f && N) {
                                    for (var O = k(f, {}), M = 0; M < N; M++) {
                                        var A = S[M];
                                        c(A.offset), A.locator = k(f, {});
                                    }
                                    o.locator = O, H(S, o, T) && d.push(S), o.locator = f;
                                } else H(S, o, T) && d.push(S);
                                "http://www.w3.org/1999/xhtml" !== S.uri || S.closed ? y++ : y = function(e, t, n, r, o) {
                                    if (/^(?:script|textarea)$/i.test(n)) {
                                        var i = e.indexOf("</" + n + ">", t), a = e.substring(t + 1, i);
                                        if (/[&<]/.test(a)) return /^script$/i.test(n) || (a = a.replace(/&#?\w+;/g, r)), 
                                        o.characters(a, 0, a.length), i;
                                    }
                                    return t + 1;
                                }(n, y, S.tagName, a, o);
                            }
                        } catch (e) {
                            i.error("element parse error: " + e), y = -1;
                        }
                        h < y ? h = y : t(Math.max(g, h) + 1);
                    }
                }(e, t, n, r, this.errorHandler), r.endDocument();
            }
        }, U.prototype = {
            setTagName: function setTagName(e) {
                if (!i.test(e)) throw new Error("invalid tagName:" + e);
                this.tagName = e;
            },
            add: function add(e, t, n) {
                if (!i.test(e)) throw new Error("invalid attribute:" + e);
                this[this.length++] = {
                    qName: e,
                    value: t,
                    offset: n
                };
            },
            length: 0,
            getLocalName: function getLocalName(e) {
                return this[e].localName;
            },
            getLocator: function getLocator(e) {
                return this[e].locator;
            },
            getQName: function getQName(e) {
                return this[e].qName;
            },
            getURI: function getURI(e) {
                return this[e].uri;
            },
            getValue: function getValue(e) {
                return this[e].value;
            }
        }, n.XMLReader = a;
    }, {} ],
    22: [ function(e, t, n) {
        "use strict";
        var r = GameGlobal, o = r.__globalAdapter = {};
        Object.assign(o, {
            init: function init() {
                e("./wrapper/builtin"), r.DOMParser = e("../../common/xmldom/dom-parser").DOMParser, 
                e("./wrapper/unify"), e("./wrapper/fs-utils"), e("../../common/engine/globalAdapter"), 
                e("./wrapper/systemInfo");
            },
            adaptEngine: function adaptEngine() {
                e("./wrapper/error-reporter"), e("../../common/engine"), e("./wrapper/engine"), 
                e("./wrapper/sub-context-adapter");
            }
        });
    }, {
        "../../common/engine": 15,
        "../../common/engine/globalAdapter": 14,
        "../../common/xmldom/dom-parser": 18,
        "./wrapper/builtin": 45,
        "./wrapper/engine": 52,
        "./wrapper/error-reporter": 54,
        "./wrapper/fs-utils": 55,
        "./wrapper/sub-context-adapter": 1,
        "./wrapper/systemInfo": 56,
        "./wrapper/unify": 57
    } ],
    23: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r, i = (r = e("./HTMLAudioElement")) && r.__esModule ? r : {
            default: r
        };
        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        function u(e, t, n) {
            return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                var r = function(e, t) {
                    for (;!Object.prototype.hasOwnProperty.call(e, t) && null !== (e = f(e)); ) {}
                    return e;
                }(e, t);
                if (r) {
                    var o = Object.getOwnPropertyDescriptor(r, t);
                    return o.get ? o.get.call(n) : o.value;
                }
            })(e, t, n || e);
        }
        function s(e, t) {
            return (s = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function l(i) {
            var a = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }();
            return function() {
                var e, t, n, r, o = f(i);
                return t = a ? (e = f(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), 
                n = this, !(r = t) || "object" !== c(r) && "function" != typeof r ? function(e) {
                    if (void 0 !== e) return e;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }(n) : r;
            };
        }
        function f(e) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        var d = 0, p = 1, h = 2, m = 3, v = 4, g = 1, y = {}, o = function() {
            !function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && s(e, t);
            }(o, i["default"]);
            var e, t, n, r = l(o);
            function o(e) {
                var t;
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, o), (t = r.call(this))._$sn = g++, t.HAVE_NOTHING = d, t.HAVE_METADATA = p, 
                t.HAVE_CURRENT_DATA = h, t.HAVE_FUTURE_DATA = m, t.HAVE_ENOUGH_DATA = v, t.readyState = d;
                var n = wx.createInnerAudioContext();
                return y[t._$sn] = n, t._canplayEvents = [ "load", "loadend", "canplay", "canplaythrough", "loadedmetadata" ], 
                n.onCanplay(function() {
                    t._loaded = !0, t.readyState = t.HAVE_CURRENT_DATA, t._canplayEvents.forEach(function(e) {
                        t.dispatchEvent({
                            type: e
                        });
                    });
                }), n.onPlay(function() {
                    t._paused = y[t._$sn].paused, t.dispatchEvent({
                        type: "play"
                    });
                }), n.onPause(function() {
                    t._paused = y[t._$sn].paused, t.dispatchEvent({
                        type: "pause"
                    });
                }), n.onEnded(function() {
                    t._paused = y[t._$sn].paused, !1 === y[t._$sn].loop && t.dispatchEvent({
                        type: "ended"
                    }), t.readyState = v;
                }), n.onError(function() {
                    t._paused = y[t._$sn].paused, t.dispatchEvent({
                        type: "error"
                    });
                }), e ? t.src = e : t._src = "", t._loop = n.loop, t._autoplay = n.autoplay, t._paused = n.paused, 
                t._volume = n.volume, t._muted = !1, t;
            }
            return e = o, (t = [ {
                key: "addEventListener",
                value: function value(e, t, n) {
                    var r = 2 < arguments.length && void 0 !== n ? n : {};
                    u(f(o.prototype), "addEventListener", this).call(this, e, t, r), e = String(e).toLowerCase(), 
                    this._loaded && -1 !== this._canplayEvents.indexOf(e) && this.dispatchEvent({
                        type: e
                    });
                }
            }, {
                key: "load",
                value: function value() {}
            }, {
                key: "play",
                value: function value() {
                    y[this._$sn].play();
                }
            }, {
                key: "resume",
                value: function value() {
                    y[this._$sn].resume();
                }
            }, {
                key: "pause",
                value: function value() {
                    y[this._$sn].pause();
                }
            }, {
                key: "stop",
                value: function value() {
                    y[this._$sn].stop();
                }
            }, {
                key: "destroy",
                value: function value() {
                    y[this._$sn].destroy();
                }
            }, {
                key: "canPlayType",
                value: function value(e) {
                    var t = 0 < arguments.length && void 0 !== e ? e : "";
                    return "string" == typeof t && (-1 < t.indexOf("audio/mpeg") || t.indexOf("audio/mp4")) ? "probably" : "";
                }
            }, {
                key: "cloneNode",
                value: function value() {
                    var e = new o();
                    return e.loop = this.loop, e.autoplay = this.autoplay, e.src = this.src, e;
                }
            }, {
                key: "currentTime",
                get: function get() {
                    return y[this._$sn].currentTime;
                },
                set: function set(e) {
                    y[this._$sn].seek(e);
                }
            }, {
                key: "duration",
                get: function get() {
                    return y[this._$sn].duration;
                }
            }, {
                key: "src",
                get: function get() {
                    return this._src;
                },
                set: function set(e) {
                    this._src = e, this._loaded = !1, this.readyState = this.HAVE_NOTHING, y[this._$sn].src = e;
                }
            }, {
                key: "loop",
                get: function get() {
                    return this._loop;
                },
                set: function set(e) {
                    this._loop = e, y[this._$sn].loop = e;
                }
            }, {
                key: "autoplay",
                get: function get() {
                    return this.autoplay;
                },
                set: function set(e) {
                    this._autoplay = e, y[this._$sn].autoplay = e;
                }
            }, {
                key: "paused",
                get: function get() {
                    return this._paused;
                }
            }, {
                key: "volume",
                get: function get() {
                    return this._volume;
                },
                set: function set(e) {
                    this._volume = e, this._muted || (y[this._$sn].volume = e);
                }
            }, {
                key: "muted",
                get: function get() {
                    return this._muted;
                },
                set: function set(e) {
                    this._muted = e, y[this._$sn].volume = e ? 0 : this._volume;
                }
            } ]) && a(e.prototype, t), n && a(e, n), o;
        }();
        n.default = o, t.exports = n.default;
    }, {
        "./HTMLAudioElement": 31
    } ],
    24: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = function() {
            var e = wx.createCanvas();
            e.type = "canvas";
            e.getContext;
            return e.getBoundingClientRect = function() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }, e.style = {
                top: "0px",
                left: "0px",
                width: r.innerWidth + "px",
                height: r.innerHeight + "px"
            }, e.addEventListener = function(e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                document.addEventListener(e, t, n);
            }, e.removeEventListener = function(e, t) {
                document.removeEventListener(e, t);
            }, e.dispatchEvent = function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                console.log("canvas.dispatchEvent", e.type, e);
            }, Object.defineProperty(e, "clientWidth", {
                enumerable: !0,
                get: function get() {
                    return r.innerWidth;
                }
            }), Object.defineProperty(e, "clientHeight", {
                enumerable: !0,
                get: function get() {
                    return r.innerHeight;
                }
            }), e;
        };
        var r = e("./WindowProperties");
        t.exports = n.default;
    }, {
        "./WindowProperties": 42
    } ],
    25: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r, o = (r = e("./Node")) && r.__esModule ? r : {
            default: r
        };
        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(i) {
            var a = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }();
            return function() {
                var e, t, n, r, o = u(i);
                return t = a ? (e = u(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), 
                n = this, !(r = t) || "object" !== c(r) && "function" != typeof r ? function(e) {
                    if (void 0 !== e) return e;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }(n) : r;
            };
        }
        function u(e) {
            return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        var s = function() {
            !function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && i(e, t);
            }(n, o["default"]);
            var t = a(n);
            function n() {
                var e;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, n), (e = t.call(this)).className = "", e.children = [], e;
            }
            return n;
        }();
        n.default = s, t.exports = n.default;
    }, {
        "./Node": 39
    } ],
    26: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        n.default = function e() {
            !function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e);
        }, t.exports = n.default;
    }, {} ],
    27: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = e("../util/index.js");
        function o(e) {
            !function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, o), this.touches = [], this.targetTouches = [], this.changedTouches = [], 
            this.preventDefault = r.noop, this.stopPropagation = r.noop, this.type = e, this.target = window.canvas, 
            this.currentTarget = window.canvas;
        }
        function i(n) {
            return function(e) {
                var t = new o(n);
                t.touches = e.touches, t.targetTouches = Array.prototype.slice.call(e.touches), 
                t.changedTouches = e.changedTouches, t.timeStamp = e.timeStamp, document.dispatchEvent(t);
            };
        }
        n.default = o, wx.onTouchStart(i("touchstart")), wx.onTouchMove(i("touchmove")), 
        wx.onTouchEnd(i("touchend")), wx.onTouchCancel(i("touchcancel")), t.exports = n.default;
    }, {
        "../util/index.js": 49
    } ],
    28: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), Object.defineProperty(n, "TouchEvent", {
            enumerable: !0,
            get: function get() {
                return r.default;
            }
        }), Object.defineProperty(n, "MouseEvent", {
            enumerable: !0,
            get: function get() {
                return o.default;
            }
        });
        var r = i(e("./TouchEvent")), o = i(e("./MouseEvent"));
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
    }, {
        "./MouseEvent": 26,
        "./TouchEvent": 27
    } ],
    29: [ function(e, t, n) {
        "use strict";
        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var i = new WeakMap(), r = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e), i.set(this, {});
            }
            var t, n, r;
            return t = e, (n = [ {
                key: "addEventListener",
                value: function value(e, t, n) {
                    var r = 2 < arguments.length && void 0 !== n ? n : {}, o = i.get(this);
                    o || (o = {}, i.set(this, o)), o[e] || (o[e] = []), o[e].push(t), r.capture, r.once, 
                    r.passive;
                }
            }, {
                key: "removeEventListener",
                value: function value(e, t) {
                    var n = i.get(this);
                    if (n) {
                        var r = n[e];
                        if (r && 0 < r.length) for (var o = r.length; o--; ) {
                            if (r[o] === t) {
                                r.splice(o, 1);
                                break;
                            }
                        }
                    }
                }
            }, {
                key: "dispatchEvent",
                value: function value(e) {
                    var t = 0 < arguments.length && void 0 !== e ? e : {}, n = i.get(this)[t.type];
                    if (n) for (var r = 0; r < n.length; r++) {
                        n[r](t);
                    }
                }
            } ]) && o(t.prototype, n), r && o(t, r), e;
        }();
        n.default = r, t.exports = n.default;
    }, {} ],
    30: [ function(e, t, n) {
        "use strict";
        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
            }
            var t, n, r;
            return t = e, (n = [ {
                key: "construct",
                value: function value() {}
            } ]) && o(t.prototype, n), r && o(t, r), e;
        }();
        n.default = r, t.exports = n.default;
    }, {} ],
    31: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r, o = (r = e("./HTMLMediaElement")) && r.__esModule ? r : {
            default: r
        };
        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(i) {
            var a = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }();
            return function() {
                var e, t, n, r, o = u(i);
                return t = a ? (e = u(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), 
                n = this, !(r = t) || "object" !== c(r) && "function" != typeof r ? function(e) {
                    if (void 0 !== e) return e;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }(n) : r;
            };
        }
        function u(e) {
            return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        var s = function() {
            !function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && i(e, t);
            }(t, o["default"]);
            var e = a(t);
            function t() {
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, t), e.call(this, "audio");
            }
            return t;
        }();
        n.default = s, t.exports = n.default;
    }, {
        "./HTMLMediaElement": 35
    } ],
    32: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = o(e("./Canvas"));
        o(e("./HTMLElement"));
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        GameGlobal.screencanvas = GameGlobal.screencanvas || new r.default();
        var i = GameGlobal.screencanvas.constructor;
        n.default = i, t.exports = n.default;
    }, {
        "./Canvas": 24,
        "./HTMLElement": 33
    } ],
    33: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r, i = (r = e("./Element")) && r.__esModule ? r : {
            default: r
        }, a = e("./util/index.js"), c = e("./WindowProperties");
        function u(e) {
            return (u = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function s(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        function l(e, t) {
            return (l = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function f(i) {
            var a = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }();
            return function() {
                var e, t, n, r, o = d(i);
                return t = a ? (e = d(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), 
                n = this, !(r = t) || "object" !== u(r) && "function" != typeof r ? function(e) {
                    if (void 0 !== e) return e;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }(n) : r;
            };
        }
        function d(e) {
            return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        var o = function() {
            !function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && l(e, t);
            }(o, i["default"]);
            var e, t, n, r = f(o);
            function o() {
                var e, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, o), (e = r.call(this)).className = "", e.childern = [], e.style = {
                    width: "".concat(c.innerWidth, "px"),
                    height: "".concat(c.innerHeight, "px")
                }, e.insertBefore = a.noop, e.innerHTML = "", e.tagName = t.toUpperCase(), e;
            }
            return e = o, (t = [ {
                key: "setAttribute",
                value: function value(e, t) {
                    this[e] = t;
                }
            }, {
                key: "getAttribute",
                value: function value(e) {
                    return this[e];
                }
            }, {
                key: "getBoundingClientRect",
                value: function value() {
                    return {
                        top: 0,
                        left: 0,
                        width: c.innerWidth,
                        height: c.innerHeight
                    };
                }
            }, {
                key: "focus",
                value: function value() {}
            }, {
                key: "clientWidth",
                get: function get() {
                    var e = parseInt(this.style.fontSize, 10) * this.innerHTML.length;
                    return Number.isNaN(e) ? 0 : e;
                }
            }, {
                key: "clientHeight",
                get: function get() {
                    var e = parseInt(this.style.fontSize, 10);
                    return Number.isNaN(e) ? 0 : e;
                }
            } ]) && s(e.prototype, t), n && s(e, n), o;
        }();
        n.default = o, t.exports = n.default;
    }, {
        "./Element": 25,
        "./WindowProperties": 42,
        "./util/index.js": 49
    } ],
    34: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r;
        (r = e("./HTMLElement")) && r.__esModule;
        var o = wx.createImage().constructor;
        n.default = o, t.exports = n.default;
    }, {
        "./HTMLElement": 33
    } ],
    35: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r, i = (r = e("./HTMLElement")) && r.__esModule ? r : {
            default: r
        };
        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        function u(e, t) {
            return (u = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function s(i) {
            var a = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }();
            return function() {
                var e, t, n, r, o = l(i);
                return t = a ? (e = l(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), 
                n = this, !(r = t) || "object" !== c(r) && "function" != typeof r ? function(e) {
                    if (void 0 !== e) return e;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }(n) : r;
            };
        }
        function l(e) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        var o = function() {
            !function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && u(e, t);
            }(o, i["default"]);
            var e, t, n, r = s(o);
            function o(e) {
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, o), r.call(this, e);
            }
            return e = o, (t = [ {
                key: "addTextTrack",
                value: function value() {}
            }, {
                key: "captureStream",
                value: function value() {}
            }, {
                key: "fastSeek",
                value: function value() {}
            }, {
                key: "load",
                value: function value() {}
            }, {
                key: "pause",
                value: function value() {}
            }, {
                key: "play",
                value: function value() {}
            } ]) && a(e.prototype, t), n && a(e, n), o;
        }();
        n.default = o, t.exports = n.default;
    }, {
        "./HTMLElement": 33
    } ],
    36: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r, o = (r = e("./HTMLMediaElement")) && r.__esModule ? r : {
            default: r
        };
        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(i) {
            var a = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }();
            return function() {
                var e, t, n, r, o = u(i);
                return t = a ? (e = u(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), 
                n = this, !(r = t) || "object" !== c(r) && "function" != typeof r ? function(e) {
                    if (void 0 !== e) return e;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }(n) : r;
            };
        }
        function u(e) {
            return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        var s = function() {
            !function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && i(e, t);
            }(t, o["default"]);
            var e = a(t);
            function t() {
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, t), e.call(this, "video");
            }
            return t;
        }();
        n.default = s, t.exports = n.default;
    }, {
        "./HTMLMediaElement": 35
    } ],
    37: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = function() {
            return wx.createImage();
        };
        var r;
        (r = e("./HTMLImageElement")) && r.__esModule;
        t.exports = n.default;
    }, {
        "./HTMLImageElement": 34
    } ],
    38: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        n.default = function e() {
            !function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e);
        }, t.exports = n.default;
    }, {} ],
    39: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r, i = (r = e("./EventTarget.js")) && r.__esModule ? r : {
            default: r
        };
        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        function u(e, t) {
            return (u = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function s(i) {
            var a = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }();
            return function() {
                var e, t, n, r, o = l(i);
                return t = a ? (e = l(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), 
                n = this, !(r = t) || "object" !== c(r) && "function" != typeof r ? function(e) {
                    if (void 0 !== e) return e;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }(n) : r;
            };
        }
        function l(e) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        var o = function() {
            !function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && u(e, t);
            }(o, i["default"]);
            var e, t, n, r = s(o);
            function o() {
                var e;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, o), (e = r.call(this)).childNodes = [], e;
            }
            return e = o, (t = [ {
                key: "appendChild",
                value: function value(e) {
                    this.childNodes.push(e);
                }
            }, {
                key: "cloneNode",
                value: function value() {
                    var e = Object.create(this);
                    return Object.assign(e, this), e;
                }
            }, {
                key: "removeChild",
                value: function value(t) {
                    var e = this.childNodes.findIndex(function(e) {
                        return e === t;
                    });
                    return -1 < e ? this.childNodes.splice(e, 1) : null;
                }
            } ]) && a(e.prototype, t), n && a(e, n), o;
        }();
        n.default = o, t.exports = n.default;
    }, {
        "./EventTarget.js": 29
    } ],
    40: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        n.default = function e() {
            !function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e);
        }, t.exports = n.default;
    }, {} ],
    41: [ function(e, t, n) {
        "use strict";
        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var i = new WeakMap(), o = function() {
            function o(e) {
                var t = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
                if (!function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, o), this.binaryType = "", this.bufferedAmount = 0, this.extensions = "", 
                this.onclose = null, this.onerror = null, this.onmessage = null, this.onopen = null, 
                this.protocol = "", this.readyState = 3, "string" != typeof e || !/(^ws:\/\/)|(^wss:\/\/)/.test(e)) throw new TypeError("Failed to construct 'WebSocket': The URL '".concat(e, "' is invalid"));
                this.url = e, this.readyState = o.CONNECTING;
                var r = wx.connectSocket({
                    url: e,
                    protocols: Array.isArray(n) ? n : [ n ],
                    tcpNoDelay: !0
                });
                return i.set(this, r), r.onClose(function(e) {
                    t.readyState = o.CLOSED, "function" == typeof t.onclose && t.onclose(e);
                }), r.onMessage(function(e) {
                    "function" == typeof t.onmessage && t.onmessage(e);
                }), r.onOpen(function() {
                    t.readyState = o.OPEN, "function" == typeof t.onopen && t.onopen();
                }), r.onError(function(e) {
                    "function" == typeof t.onerror && t.onerror(new Error(e.errMsg));
                }), this;
            }
            var e, t, n;
            return e = o, (t = [ {
                key: "close",
                value: function value(e, t) {
                    this.readyState = o.CLOSING, i.get(this).close({
                        code: e,
                        reason: t
                    });
                }
            }, {
                key: "send",
                value: function value(e) {
                    if (!("string" == typeof e || e instanceof ArrayBuffer || ArrayBuffer.isView(e))) throw new TypeError("Failed to send message: The data ".concat(e, " is invalid"));
                    i.get(this).send({
                        data: e
                    });
                }
            } ]) && r(e.prototype, t), n && r(e, n), o;
        }();
        (n.default = o).CONNECTING = 0, o.OPEN = 1, o.CLOSING = 2, o.CLOSED = 3, t.exports = n.default;
    }, {} ],
    42: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.ontouchend = n.ontouchmove = n.ontouchstart = n.performance = n.screen = n.devicePixelRatio = n.innerHeight = n.innerWidth = void 0;
        var r = wx.getSystemInfoSync(), o = r.screenWidth, i = r.screenHeight, a = r.devicePixelRatio;
        n.devicePixelRatio = a;
        var c = o, u = i, s = {
            width: o,
            height: i,
            availWidth: n.innerWidth = c,
            availHeight: n.innerHeight = u,
            availLeft: 0,
            availTop: 0
        };
        n.screen = s;
        var l = {
            now: Date.now
        };
        n.performance = l;
        n.ontouchstart = null;
        n.ontouchmove = null;
        n.ontouchend = null;
    }, {} ],
    43: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r, o = (r = e("./EventTarget.js")) && r.__esModule ? r : {
            default: r
        };
        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        function a(e, t) {
            return (a = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function s(i) {
            var a = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }();
            return function() {
                var e, t, n, r, o = u(i);
                return t = a ? (e = u(this).constructor, Reflect.construct(o, arguments, e)) : o.apply(this, arguments), 
                n = this, !(r = t) || "object" !== c(r) && "function" != typeof r ? l(n) : r;
            };
        }
        function l(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }
        function u(e) {
            return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        var f = new WeakMap(), d = new WeakMap(), p = new WeakMap(), h = new WeakMap(), m = new WeakMap();
        function v(e) {
            if ("function" == typeof this["on".concat(e)]) {
                for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) {
                    n[r - 1] = arguments[r];
                }
                this["on".concat(e)].apply(this, n);
            }
        }
        function g(e) {
            this.readyState = e, v.call(this, "readystatechange");
        }
        var y = function() {
            !function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && a(e, t);
            }(u, o["default"]);
            var e, t, n, r = s(u);
            function u() {
                var e;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, u), (e = r.call(this)).timeout = 0, e.onabort = null, e.onerror = null, 
                e.onload = null, e.onloadstart = null, e.onprogress = null, e.ontimeout = null, 
                e.onloadend = null, e.onreadystatechange = null, e.readyState = 0, e.response = null, 
                e.responseText = null, e.responseType = "", e.responseXML = null, e.status = 0, 
                e.statusText = "", e.upload = {}, e.withCredentials = !1, p.set(l(e), {
                    "content-type": "application/x-www-form-urlencoded"
                }), h.set(l(e), {}), e;
            }
            return e = u, (t = [ {
                key: "abort",
                value: function value() {
                    var e = m.get(this);
                    e && e.abort();
                }
            }, {
                key: "getAllResponseHeaders",
                value: function value() {
                    var t = h.get(this);
                    return Object.keys(t).map(function(e) {
                        return "".concat(e, ": ").concat(t[e]);
                    }).join("\n");
                }
            }, {
                key: "getResponseHeader",
                value: function value(e) {
                    return h.get(this)[e];
                }
            }, {
                key: "open",
                value: function value(e, t) {
                    d.set(this, e), f.set(this, t), g.call(this, u.OPENED);
                }
            }, {
                key: "overrideMimeType",
                value: function value() {}
            }, {
                key: "send",
                value: function value(e) {
                    var c = this, t = 0 < arguments.length && void 0 !== e ? e : "";
                    if (this.readyState !== u.OPENED) throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
                    var n = wx.request({
                        data: t,
                        url: f.get(this),
                        method: d.get(this),
                        header: p.get(this),
                        dataType: "other",
                        responseType: "arraybuffer" === this.responseType ? "arraybuffer" : "text",
                        timeout: this.timeout || void 0,
                        success: function success(e) {
                            var t = e.data, n = e.statusCode, r = e.header;
                            switch (c.status = n, h.set(c, r), v.call(c, "loadstart"), g.call(c, u.HEADERS_RECEIVED), 
                            g.call(c, u.LOADING), c.responseType) {
                              case "json":
                                c.responseText = t;
                                try {
                                    c.response = JSON.parse(t);
                                } catch (e) {
                                    c.response = null;
                                }
                                break;

                              case "":
                              case "text":
                                c.responseText = c.response = t;
                                break;

                              case "arraybuffer":
                                c.response = t, c.responseText = "";
                                for (var o = new Uint8Array(t), i = o.byteLength, a = 0; a < i; a++) {
                                    c.responseText += String.fromCharCode(o[a]);
                                }
                                break;

                              default:
                                c.response = null;
                            }
                            g.call(c, u.DONE), v.call(c, "load"), v.call(c, "loadend");
                        },
                        fail: function fail(e) {
                            var t = e.errMsg;
                            -1 !== t.indexOf("abort") ? v.call(c, "abort") : -1 !== t.indexOf("timeout") ? v.call(c, "timeout") : v.call(c, "error", t), 
                            v.call(c, "loadend");
                        }
                    });
                    m.set(this, n);
                }
            }, {
                key: "setRequestHeader",
                value: function value(e, t) {
                    var n = p.get(this);
                    n[e] = t, p.set(this, n);
                }
            }, {
                key: "addEventListener",
                value: function value(e, t) {
                    var n;
                    "function" == typeof t && (n = this, this["on" + e] = function(e) {
                        t.call(n, e);
                    });
                }
            } ]) && i(e.prototype, t), n && i(e, n), u;
        }();
        (n.default = y).UNSEND = 0, y.OPENED = 1, y.HEADERS_RECEIVED = 2, y.LOADING = 3, 
        y.DONE = 4, t.exports = n.default;
    }, {
        "./EventTarget.js": 29
    } ],
    44: [ function(e, t, n) {
        "use strict";
        function a(e) {
            return (a = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = function(e) {
            if (e && e.__esModule) return e;
            if (null === e || "object" !== a(e) && "function" != typeof e) return {
                default: e
            };
            var t = f();
            if (t && t.has(e)) return t.get(e);
            var n = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e) {
                var i;
                Object.prototype.hasOwnProperty.call(e, o) && ((i = r ? Object.getOwnPropertyDescriptor(e, o) : null) && (i.get || i.set) ? Object.defineProperty(n, o, i) : n[o] = e[o]);
            }
            n.default = e, t && t.set(e, n);
            return n;
        }(e("./window")), o = l(e("./HTMLElement")), i = l(e("./HTMLVideoElement")), c = l(e("./Image")), u = l(e("./Audio")), s = l(e("./Canvas"));
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function f() {
            if ("function" != typeof WeakMap) return null;
            var e = new WeakMap();
            return f = function f() {
                return e;
            }, e;
        }
        e("./EventIniter/index.js");
        var d = {}, p = {
            readyState: "complete",
            visibilityState: "visible",
            documentElement: r,
            hidden: !1,
            style: {},
            location: r.location,
            ontouchstart: null,
            ontouchmove: null,
            ontouchend: null,
            head: new o.default("head"),
            body: new o.default("body"),
            createElement: function createElement(e) {
                return "canvas" === e ? new s.default() : "audio" === e ? new u.default() : "img" === e ? new c.default() : "video" === e ? new i.default() : new o.default(e);
            },
            createElementNS: function createElementNS(e, t) {
                return this.createElement(t);
            },
            getElementById: function getElementById(e) {
                return e === r.canvas.id ? r.canvas : null;
            },
            getElementsByTagName: function getElementsByTagName(e) {
                return "head" === e ? [ p.head ] : "body" === e ? [ p.body ] : "canvas" === e ? [ r.canvas ] : [];
            },
            getElementsByName: function getElementsByName(e) {
                return "head" === e ? [ p.head ] : "body" === e ? [ p.body ] : "canvas" === e ? [ r.canvas ] : [];
            },
            querySelector: function querySelector(e) {
                return "head" === e ? p.head : "body" === e ? p.body : "canvas" === e || e === "#".concat(r.canvas.id) ? r.canvas : null;
            },
            querySelectorAll: function querySelectorAll(e) {
                return "head" === e ? [ p.head ] : "body" === e ? [ p.body ] : "canvas" === e ? [ r.canvas ] : [];
            },
            addEventListener: function addEventListener(e, t) {
                d[e] || (d[e] = []), d[e].push(t);
            },
            removeEventListener: function removeEventListener(e, t) {
                var n = d[e];
                if (n && 0 < n.length) for (var r = n.length; r--; ) {
                    if (n[r] === t) {
                        n.splice(r, 1);
                        break;
                    }
                }
            },
            dispatchEvent: function dispatchEvent(e) {
                var t = d[e.type];
                if (t) for (var n = 0; n < t.length; n++) {
                    t[n](e);
                }
            }
        };
        n.default = p, t.exports = n.default;
    }, {
        "./Audio": 23,
        "./Canvas": 24,
        "./EventIniter/index.js": 28,
        "./HTMLElement": 33,
        "./HTMLVideoElement": 36,
        "./Image": 37,
        "./window": 50
    } ],
    45: [ function(e, t, n) {
        "use strict";
        function a(e) {
            return (a = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
                return typeof e === "undefined" ? "undefined" : _typeof(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
            })(e);
        }
        var c = function(e) {
            if (e && e.__esModule) return e;
            if (null === e || "object" !== a(e) && "function" != typeof e) return {
                default: e
            };
            var t = s();
            if (t && t.has(e)) return t.get(e);
            var n = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e) {
                var i;
                Object.prototype.hasOwnProperty.call(e, o) && ((i = r ? Object.getOwnPropertyDescriptor(e, o) : null) && (i.get || i.set) ? Object.defineProperty(n, o, i) : n[o] = e[o]);
            }
            n.default = e, t && t.set(e, n);
            return n;
        }(e("./window")), u = r(e("./document"));
        r(e("./HTMLElement"));
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function s() {
            if ("function" != typeof WeakMap) return null;
            var e = new WeakMap();
            return s = function s() {
                return e;
            }, e;
        }
        var l = GameGlobal;
        GameGlobal.__isAdapterInjected || (GameGlobal.__isAdapterInjected = !0, function() {
            c.document = u.default, c.addEventListener = function(e, t) {
                c.document.addEventListener(e, t);
            }, c.removeEventListener = function(e, t) {
                c.document.removeEventListener(e, t);
            }, c.dispatchEvent = c.document.dispatchEvent;
            var e = wx.getSystemInfoSync().platform;
            if ("undefined" == typeof __devtoolssubcontext && "devtools" === e) {
                for (var t in c) {
                    var n = Object.getOwnPropertyDescriptor(l, t);
                    n && !0 !== n.configurable || Object.defineProperty(window, t, {
                        value: c[t]
                    });
                }
                for (var r in c.document) {
                    var o = Object.getOwnPropertyDescriptor(l.document, r);
                    o && !0 !== o.configurable || Object.defineProperty(l.document, r, {
                        value: c.document[r]
                    });
                }
                window.parent = window;
            } else {
                for (var i in c) {
                    l[i] = c[i];
                }
                l.window = c, window = l, window.top = window.parent = window;
            }
        }());
    }, {
        "./HTMLElement": 33,
        "./document": 44,
        "./window": 50
    } ],
    46: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = {
            get length() {
                return wx.getStorageInfoSync().keys.length;
            },
            key: function key(e) {
                return wx.getStorageInfoSync().keys[e];
            },
            getItem: function getItem(e) {
                return wx.getStorageSync(e);
            },
            setItem: function setItem(e, t) {
                return wx.setStorageSync(e, t);
            },
            removeItem: function removeItem(e) {
                wx.removeStorageSync(e);
            },
            clear: function clear() {
                wx.clearStorageSync();
            }
        };
        n.default = r, t.exports = n.default;
    }, {} ],
    47: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = {
            href: "game.js",
            reload: function reload() {}
        };
        n.default = r, t.exports = n.default;
    }, {} ],
    48: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = e("./util/index.js"), o = wx.getSystemInfoSync();
        console.log(o);
        var i = o.system, a = o.platform, c = o.language, u = o.version, s = -1 !== i.toLowerCase().indexOf("android") ? "Android; CPU ".concat(i) : "iPhone; CPU iPhone OS ".concat(i, " like Mac OS X"), l = "Mozilla/5.0 (".concat(s, ") AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/").concat(u, " MiniGame NetType/WIFI Language/").concat(c), f = {
            platform: a,
            language: c,
            appVersion: "5.0 (".concat(s, ") AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"),
            userAgent: l,
            onLine: !0,
            geolocation: {
                getCurrentPosition: r.noop,
                watchPosition: r.noop,
                clearWatch: r.noop
            }
        };
        wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
            f.onLine = e.isConnected;
        }), n.default = f, t.exports = n.default;
    }, {
        "./util/index.js": 49
    } ],
    49: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.noop = function() {};
    }, {} ],
    50: [ function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = {
            canvas: !0,
            setTimeout: !0,
            setInterval: !0,
            clearTimeout: !0,
            clearInterval: !0,
            requestAnimationFrame: !0,
            cancelAnimationFrame: !0,
            navigator: !0,
            XMLHttpRequest: !0,
            WebSocket: !0,
            Image: !0,
            ImageBitmap: !0,
            Audio: !0,
            FileReader: !0,
            HTMLElement: !0,
            HTMLImageElement: !0,
            HTMLCanvasElement: !0,
            HTMLMediaElement: !0,
            HTMLAudioElement: !0,
            HTMLVideoElement: !0,
            WebGLRenderingContext: !0,
            TouchEvent: !0,
            MouseEvent: !0,
            DeviceMotionEvent: !0,
            localStorage: !0,
            location: !0
        };
        Object.defineProperty(n, "navigator", {
            enumerable: !0,
            get: function get() {
                return i.default;
            }
        }), Object.defineProperty(n, "XMLHttpRequest", {
            enumerable: !0,
            get: function get() {
                return a.default;
            }
        }), Object.defineProperty(n, "WebSocket", {
            enumerable: !0,
            get: function get() {
                return c.default;
            }
        }), Object.defineProperty(n, "Image", {
            enumerable: !0,
            get: function get() {
                return u.default;
            }
        }), Object.defineProperty(n, "ImageBitmap", {
            enumerable: !0,
            get: function get() {
                return s.default;
            }
        }), Object.defineProperty(n, "Audio", {
            enumerable: !0,
            get: function get() {
                return l.default;
            }
        }), Object.defineProperty(n, "FileReader", {
            enumerable: !0,
            get: function get() {
                return f.default;
            }
        }), Object.defineProperty(n, "HTMLElement", {
            enumerable: !0,
            get: function get() {
                return d.default;
            }
        }), Object.defineProperty(n, "HTMLImageElement", {
            enumerable: !0,
            get: function get() {
                return p.default;
            }
        }), Object.defineProperty(n, "HTMLCanvasElement", {
            enumerable: !0,
            get: function get() {
                return h.default;
            }
        }), Object.defineProperty(n, "HTMLMediaElement", {
            enumerable: !0,
            get: function get() {
                return m.default;
            }
        }), Object.defineProperty(n, "HTMLAudioElement", {
            enumerable: !0,
            get: function get() {
                return v.default;
            }
        }), Object.defineProperty(n, "HTMLVideoElement", {
            enumerable: !0,
            get: function get() {
                return g.default;
            }
        }), Object.defineProperty(n, "WebGLRenderingContext", {
            enumerable: !0,
            get: function get() {
                return y.default;
            }
        }), Object.defineProperty(n, "TouchEvent", {
            enumerable: !0,
            get: function get() {
                return b.TouchEvent;
            }
        }), Object.defineProperty(n, "MouseEvent", {
            enumerable: !0,
            get: function get() {
                return b.MouseEvent;
            }
        }), Object.defineProperty(n, "DeviceMotionEvent", {
            enumerable: !0,
            get: function get() {
                return b.DeviceMotionEvent;
            }
        }), Object.defineProperty(n, "localStorage", {
            enumerable: !0,
            get: function get() {
                return w.default;
            }
        }), Object.defineProperty(n, "location", {
            enumerable: !0,
            get: function get() {
                return _.default;
            }
        }), n.cancelAnimationFrame = n.requestAnimationFrame = n.clearInterval = n.clearTimeout = n.setInterval = n.setTimeout = n.canvas = void 0;
        var o = x(e("./Canvas")), i = x(e("./navigator")), a = x(e("./XMLHttpRequest")), c = x(e("./WebSocket")), u = x(e("./Image")), s = x(e("./ImageBitmap")), l = x(e("./Audio")), f = x(e("./FileReader")), d = x(e("./HTMLElement")), p = x(e("./HTMLImageElement")), h = x(e("./HTMLCanvasElement")), m = x(e("./HTMLMediaElement")), v = x(e("./HTMLAudioElement")), g = x(e("./HTMLVideoElement")), y = x(e("./WebGLRenderingContext")), b = e("./EventIniter/index.js"), w = x(e("./localStorage")), _ = x(e("./location")), E = e("./WindowProperties");
        function x(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.keys(E).forEach(function(e) {
            "default" !== e && "__esModule" !== e && (Object.prototype.hasOwnProperty.call(r, e) || Object.defineProperty(n, e, {
                enumerable: !0,
                get: function get() {
                    return E[e];
                }
            }));
        }), GameGlobal.screencanvas = GameGlobal.screencanvas || new o.default();
        var S = GameGlobal.screencanvas;
        n.canvas = S;
        var T = GameGlobal, N = T.setTimeout, O = T.setInterval, M = T.clearTimeout, A = T.clearInterval, C = T.requestAnimationFrame, D = T.cancelAnimationFrame;
        n.cancelAnimationFrame = D, n.requestAnimationFrame = C, n.clearInterval = A, n.clearTimeout = M, 
        n.setInterval = O, n.setTimeout = N;
    }, {
        "./Audio": 23,
        "./Canvas": 24,
        "./EventIniter/index.js": 28,
        "./FileReader": 30,
        "./HTMLAudioElement": 31,
        "./HTMLCanvasElement": 32,
        "./HTMLElement": 33,
        "./HTMLImageElement": 34,
        "./HTMLMediaElement": 35,
        "./HTMLVideoElement": 36,
        "./Image": 37,
        "./ImageBitmap": 38,
        "./WebGLRenderingContext": 40,
        "./WebSocket": 41,
        "./WindowProperties": 42,
        "./XMLHttpRequest": 43,
        "./localStorage": 46,
        "./location": 47,
        "./navigator": 48
    } ],
    51: [ function(e, t, n) {
        "use strict";
        var g, y, b, r, o;
        cc && cc.VideoPlayer && cc.VideoPlayer.Impl && __globalAdapter.createVideo && (g = cc.Mat4, 
        y = cc.mat4(), b = cc.mat4(), r = cc.VideoPlayer.Impl, o = cc.VideoPlayer.Impl.prototype, 
        cc.VideoPlayer.prototype._updateVideoSource = function() {
            var t = this, n = this._clip;
            this.resourceType === cc.VideoPlayer.ResourceType.REMOTE ? this._impl.setURL(this.remoteURL, this._mute || 0 === this._volume) : n && (n._nativeAsset ? this._impl.setURL(n._nativeAsset, this._mute || 0 === this._volume) : cc.assetManager.postLoadNative(n, function(e) {
                e ? console.error(e.message, e.stack) : t._impl.setURL(n._nativeAsset, t._mute || 0 === t._volume);
            }));
        }, o._bindEvent = function() {
            var e = this._video, t = this;
            e && (e.onPlay(function() {
                t._video === e && (t._playing = !0, t._dispatchEvent(r.EventType.PLAYING));
            }), e.onEnded(function() {
                t._video === e && (t._playing = !1, t._currentTime = t._duration, t._dispatchEvent(r.EventType.COMPLETED));
            }), e.onPause(function() {
                t._video === e && (t._playing = !1, t._dispatchEvent(r.EventType.PAUSED));
            }), e.onTimeUpdate(function(e) {
                t._duration = e.duration, t._currentTime = e.position;
            }));
        }, o._unbindEvent = function() {
            var e = this._video;
            e && (e.offPlay(), e.offEnded(), e.offPause(), e.offTimeUpdate());
        }, o.setVisible = function(e) {
            var t = this._video;
            t && this._visible !== e && (t.width = e && this._actualWidth || 0, this._visible = e);
        }, o.createDomElementIfNeeded = function() {
            __globalAdapter.createVideo ? this._video || (this._video = __globalAdapter.createVideo(), 
            this._video.showCenterPlayBtn = !1, this._video.controls = !1, this._duration = 0, 
            this._currentTime = 0, this._loaded = !1, this.setVisible(!1), this._bindEvent()) : cc.warn("VideoPlayer not supported");
        }, o.setURL = function(e) {
            var t, n = this._video;
            n && n.src !== e && (n.stop(), this._unbindEvent(), n.autoplay = !0, n.src = e, 
            n.muted = !0, (t = this)._loaded = !1, n.onPlay(function() {
                n.offPlay(), t._bindEvent(), n.stop(), n.muted = !1, t._loaded = !0, t._playing = !1, 
                t._currentTime = 0, t._dispatchEvent(r.EventType.READY_TO_PLAY), n.autoplay = !1;
            }));
        }, o.getURL = function() {
            var e = this._video;
            return e ? e.src : "";
        }, o.play = function() {
            var e = this._video;
            e && this._visible && !this._playing && e.play();
        }, o.setStayOnBottom = function(e) {}, o.pause = function() {
            var e = this._video;
            this._playing && e && e.pause();
        }, o.resume = function() {
            var e = this._video;
            !this._playing && e && e.play();
        }, o.stop = function() {
            var t = this, e = this._video;
            e && this._visible && e.stop().then(function(e) {
                !e.errMsg || e.errMsg.includes("ok") ? (t._currentTime = 0, t._playing = !1, t._dispatchEvent(r.EventType.STOPPED)) : console.error("failed to stop video player");
            });
        }, o.setVolume = function(e) {}, o.seekTo = function(e) {
            var t = this._video;
            t && this._loaded && t.seek(e);
        }, o.isPlaying = function() {
            return this._playing;
        }, o.duration = function() {
            return this._duration;
        }, o.currentTime = function() {
            return this._currentTime;
        }, o.setKeepAspectRatioEnabled = function(e) {
            console.warn("On wechat game videoPlayer is always keep the aspect ratio");
        }, o.isKeepAspectRatioEnabled = function() {
            return !0;
        }, o.isFullScreenEnabled = function() {
            return this._fullScreenEnabled;
        }, o.setFullScreenEnabled = function(e) {
            var t = this._video;
            t && this._fullScreenEnabled !== e && (e ? t.requestFullScreen() : t.exitFullScreen(), 
            this._fullScreenEnabled = e);
        }, o.enable = function() {
            this.setVisible(!0);
        }, o.disable = function() {
            this._playing && this._video.pause(), this.setVisible(!1);
        }, o.destroy = function() {
            this.disable(), this._unbindEvent(), this._video && (this._video.destroy(), this._video = void 0);
        }, o.updateMatrix = function(e) {
            var t, n, r, o, i, a, c, u, s, l, f, d, p, h, m, v;
            this._video && this._visible && (t = cc.Camera.findCamera(e)) && (e.getWorldMatrix(y), 
            this._m00 === y.m[0] && this._m01 === y.m[1] && this._m04 === y.m[4] && this._m05 === y.m[5] && this._m12 === y.m[12] && this._m13 === y.m[13] && this._w === e._contentSize.width && this._h === e._contentSize.height || (this._m00 = y.m[0], 
            this._m01 = y.m[1], this._m04 = y.m[4], this._m05 = y.m[5], this._m12 = y.m[12], 
            this._m13 = y.m[13], this._w = e._contentSize.width, this._h = e._contentSize.height, 
            t.getWorldToScreenMatrix2D(b), g.multiply(b, b, y), n = cc.view._scaleX, r = cc.view._scaleY, 
            n /= o = cc.view._devicePixelRatio, r /= o, i = b.m[0] * n, a = b.m[5] * r, c = this._w * i, 
            u = this._h * a, s = c * e._anchorPoint.x, l = u * e._anchorPoint.y, d = (f = cc.view._viewportRect).x / o, 
            p = f.y / o, h = b.m[12] * n - s + d, m = b.m[13] * r - l + p, v = cc.view.getFrameSize().height, 
            this._video.x = h, this._video.y = v - u - m, this._actualWidth = this._video.width = c, 
            this._video.height = u));
        });
    }, {} ],
    52: [ function(e, t, n) {
        "use strict";
        e("./VideoPlayer"), e("./pc-adapter");
    }, {
        "./VideoPlayer": 51,
        "./pc-adapter": 53
    } ],
    53: [ function(e, t, n) {
        "use strict";
        var r = wx.getSystemInfoSync(), i = cc.internal.inputManager, a = cc.internal.eventManager, c = cc.Event.EventKeyboard, u = cc.Event.EventMouse, o = {
            backspace: 8,
            tab: 9,
            enter: 13,
            shift: 16,
            control: 17,
            alt: 18,
            pause: 19,
            capslock: 20,
            escape: 27,
            " ": 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            arrowleft: 37,
            arrowup: 38,
            arrowright: 39,
            arrowdown: 40,
            insert: 45,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            "*": 106,
            "+": 107,
            "-": 109,
            "/": 111,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            numlock: 144,
            scrolllock: 145,
            ";": 186,
            "=": 187,
            ",": 188,
            ".": 190,
            "`": 192,
            "[": 219,
            "\\": 220,
            "]": 221,
            "'": 222
        }, s = {
            Delete: 46,
            Digit0: 48,
            Digit1: 49,
            Digit2: 50,
            Digit3: 51,
            Digit4: 52,
            Digit5: 53,
            Digit6: 54,
            Digit7: 55,
            Digit8: 56,
            Digit9: 57,
            Numpad0: 96,
            Numpad1: 97,
            Numpad2: 98,
            Numpad3: 99,
            Numpad4: 100,
            Numpad5: 101,
            Numpad6: 102,
            Numpad7: 103,
            Numpad8: 104,
            Numpad9: 105,
            NumpadDecimal: 110
        };
        function l(e) {
            var t = e.key.toLowerCase(), n = e.code;
            return /^\d$/.test(t) || "delete" === t ? s[n] : o[t] || 0;
        }
        __globalAdapter.isSubContext || "windows" !== r.platform || (i.registerSystemEvent = function() {
            var o;
            function e(e, n, r) {
                wx[e](function(e) {
                    var t = i.getMouseEvent(e, o, n);
                    t.setButton(e.button || 0), r(e, t), a.dispatchEvent(t);
                });
            }
            this._isRegisterEvent || (this._glView = cc.view, wx.onKeyDown(function(e) {
                return a.dispatchEvent(new c(l(e), !0));
            }), wx.onKeyUp(function(e) {
                return a.dispatchEvent(new c(l(e), !1));
            }), o = {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }, e("onMouseDown", u.DOWN, function(e, t) {
                i._mousePressed = !0, i.handleTouchesBegin([ i.getTouchByXY(e.x, e.y, o) ]);
            }), e("onMouseUp", u.UP, function(e, t) {
                i._mousePressed = !1, i.handleTouchesEnd([ i.getTouchByXY(e.x, e.y, o) ]);
            }), e("onMouseMove", u.MOVE, function(e, t) {
                i.handleTouchesMove([ i.getTouchByXY(e.x, e.y, o) ]), i._mousePressed || t.setButton(null);
            }), e("onWheel", u.SCROLL, function(e, t) {
                t.setScrollData(0, -e.deltaY);
            }), this._isRegisterEvent = !0);
        });
    }, {} ],
    54: [ function(e, t, n) {
        "use strict";
        wx.onError && wx.onError(function e(t) {
            wx.offError && wx.offError(e);
            var n, r, o, i, a = Math.random() < .01;
            !__globalAdapter.isSubContext && a && (!(n = wx.getSystemInfoSync()) || (r = cc.Canvas.instance.node) && ((o = new cc.Node()).color = cc.Color.BLACK, 
            i = o.addComponent(cc.Label), o.height = r.height - 60, o.width = r.width - 60, 
            i.overflow = cc.Label.Overflow.SHRINK, i.horizontalAlign = cc.Label.HorizontalAlign.LEFT, 
            i.verticalAlign = cc.Label.VerticalAlign.TOP, i.fontSize = 24, i.string = "出错了，请截屏发送给游戏开发者（Please send this screenshot to the game developer）\nPlatform: WeChat " + n.version + "\nEngine: Cocos Creator v" + window.CocosEngine + "\nDevice: " + n.brand + " " + n.model + " System: " + n.system + "\nError:\n" + t.message, 
            cc.LabelOutline && (o.addComponent(cc.LabelOutline).color = cc.Color.WHITE), o.once("touchend", function() {
                o.destroy(), setTimeout(function() {
                    cc.director.resume();
                }, 1e3);
            }), o.parent = r, cc.director.pause()));
        });
    }, {} ],
    55: [ function(e, t, n) {
        "use strict";
        var o = wx.getFileSystemManager ? wx.getFileSystemManager() : null, c = {
            fs: o,
            getUserDataPath: function getUserDataPath() {
                return wx.env.USER_DATA_PATH;
            },
            checkFsValid: function checkFsValid() {
                return !!o || (console.warn("can not get the file system!"), !1);
            },
            deleteFile: function deleteFile(t, n) {
                o.unlink({
                    filePath: t,
                    success: function success() {
                        n && n(null);
                    },
                    fail: function fail(e) {
                        console.warn("Delete file failed: path: ".concat(t, " message: ").concat(e.errMsg)), 
                        n && n(new Error(e.errMsg));
                    }
                });
            },
            downloadFile: function downloadFile(t, e, n, r, o) {
                var i = {
                    url: t,
                    success: function success(e) {
                        200 === e.statusCode ? o && o(null, e.tempFilePath || e.filePath) : (e.filePath && c.deleteFile(e.filePath), 
                        console.warn("Download file failed: path: ".concat(t, " message: ").concat(e.statusCode)), 
                        o && o(new Error(e.statusCode), null));
                    },
                    fail: function fail(e) {
                        console.warn("Download file failed: path: ".concat(t, " message: ").concat(e.errMsg)), 
                        o && o(new Error(e.errMsg), null);
                    }
                };
                e && (i.filePath = e), n && (i.header = n);
                var a = wx.downloadFile(i);
                r && a.onProgressUpdate(r);
            },
            saveFile: function saveFile(t, e, n) {
                wx.saveFile({
                    tempFilePath: t,
                    filePath: e,
                    success: function success() {
                        n && n(null);
                    },
                    fail: function fail(e) {
                        console.warn("Save file failed: path: ".concat(t, " message: ").concat(e.errMsg)), 
                        n && n(new Error(e.errMsg));
                    }
                });
            },
            copyFile: function copyFile(t, e, n) {
                o.copyFile({
                    srcPath: t,
                    destPath: e,
                    success: function success() {
                        n && n(null);
                    },
                    fail: function fail(e) {
                        console.warn("Copy file failed: path: ".concat(t, " message: ").concat(e.errMsg)), 
                        n && n(new Error(e.errMsg));
                    }
                });
            },
            writeFile: function writeFile(t, e, n, r) {
                o.writeFile({
                    filePath: t,
                    encoding: n,
                    data: e,
                    success: function success() {
                        r && r(null);
                    },
                    fail: function fail(e) {
                        console.warn("Write file failed: path: ".concat(t, " message: ").concat(e.errMsg)), 
                        r && r(new Error(e.errMsg));
                    }
                });
            },
            writeFileSync: function writeFileSync(t, e, n) {
                try {
                    return o.writeFileSync(t, e, n), null;
                } catch (e) {
                    return console.warn("Write file failed: path: ".concat(t, " message: ").concat(e.message)), 
                    new Error(e.message);
                }
            },
            readFile: function readFile(t, e, n) {
                o.readFile({
                    filePath: t,
                    encoding: e,
                    success: function success(e) {
                        n && n(null, e.data);
                    },
                    fail: function fail(e) {
                        console.warn("Read file failed: path: ".concat(t, " message: ").concat(e.errMsg)), 
                        n && n(new Error(e.errMsg), null);
                    }
                });
            },
            readDir: function readDir(t, n) {
                o.readdir({
                    dirPath: t,
                    success: function success(e) {
                        n && n(null, e.files);
                    },
                    fail: function fail(e) {
                        console.warn("Read directory failed: path: ".concat(t, " message: ").concat(e.errMsg)), 
                        n && n(new Error(e.errMsg), null);
                    }
                });
            },
            readText: function readText(e, t) {
                c.readFile(e, "utf8", t);
            },
            readArrayBuffer: function readArrayBuffer(e, t) {
                c.readFile(e, "", t);
            },
            readJson: function readJson(r, o) {
                c.readFile(r, "utf8", function(t, e) {
                    var n = null;
                    if (!t) try {
                        n = JSON.parse(e);
                    } catch (e) {
                        console.warn("Read json failed: path: ".concat(r, " message: ").concat(e.message)), 
                        t = new Error(e.message);
                    }
                    o && o(t, n);
                });
            },
            readJsonSync: function readJsonSync(t) {
                try {
                    var e = o.readFileSync(t, "utf8");
                    return JSON.parse(e);
                } catch (e) {
                    return console.warn("Read json failed: path: ".concat(t, " message: ").concat(e.message)), 
                    new Error(e.message);
                }
            },
            makeDirSync: function makeDirSync(t, e) {
                try {
                    return o.mkdirSync(t, e), null;
                } catch (e) {
                    return console.warn("Make directory failed: path: ".concat(t, " message: ").concat(e.message)), 
                    new Error(e.message);
                }
            },
            rmdirSync: function rmdirSync(t, e) {
                try {
                    o.rmdirSync(t, e);
                } catch (e) {
                    return console.warn("rm directory failed: path: ".concat(t, " message: ").concat(e.message)), 
                    new Error(e.message);
                }
            },
            exists: function exists(e, t) {
                o.access({
                    path: e,
                    success: function success() {
                        t && t(!0);
                    },
                    fail: function fail() {
                        t && t(!1);
                    }
                });
            },
            loadSubpackage: function loadSubpackage(t, e, n) {
                var r = wx.loadSubpackage({
                    name: t,
                    success: function success() {
                        n && n();
                    },
                    fail: function fail(e) {
                        console.warn("Load Subpackage failed: path: ".concat(t, " message: ").concat(e.errMsg)), 
                        n && n(new Error("Failed to load subpackage ".concat(t, ": ").concat(e.errMsg)));
                    }
                });
                return e && r.onProgressUpdate(e), r;
            },
            unzip: function unzip(t, e, n) {
                o.unzip({
                    zipFilePath: t,
                    targetPath: e,
                    success: function success() {
                        n && n(null);
                    },
                    fail: function fail(e) {
                        console.warn("unzip failed: path: ".concat(t, " message: ").concat(e.errMsg)), n && n(new Error("unzip failed: " + e.errMsg));
                    }
                });
            }
        };
        window.fsUtils = t.exports = c;
    }, {} ],
    56: [ function(e, t, n) {
        "use strict";
        var a = window.__globalAdapter, r = wx.getSystemInfoSync(), o = a.adaptSys;
        Object.assign(a, {
            adaptSys: function adaptSys(e) {
                var t;
                o.call(this, e), "windows" === r.platform ? (e.isMobile = !1, e.os = e.OS_WINDOWS) : a.isDevTool && (-1 < (t = r.system.toLowerCase()).indexOf("android") ? e.os = e.OS_ANDROID : -1 < t.indexOf("ios") && (e.os = e.OS_IOS)), 
                wx.getOpenDataContext ? e.platform = e.WECHAT_GAME : e.platform = e.WECHAT_GAME_SUB, 
                e.glExtension = function(e) {
                    return "OES_texture_float" !== e && !!cc.renderer.device.ext(e);
                }, e.getSafeAreaRect = function() {
                    var e = cc.view, t = a.getSafeArea(), n = e.getFrameSize(), r = new cc.Vec2(t.left, t.bottom), o = new cc.Vec2(t.right, t.top), i = {
                        left: 0,
                        top: 0,
                        width: n.width,
                        height: n.height
                    };
                    return e.convertToLocationInView(r.x, r.y, i, r), e.convertToLocationInView(o.x, o.y, i, o), 
                    e._convertPointWithScale(r), e._convertPointWithScale(o), cc.rect(r.x, r.y, o.x - r.x, o.y - r.y);
                };
            }
        });
    }, {} ],
    57: [ function(e, t, n) {
        "use strict";
        var u, s, r, l, f, o, a, i = e("../../../common/utils");
        window.__globalAdapter && (u = window.__globalAdapter, r = (s = wx.getSystemInfoSync()).windowWidth, 
        l = s.windowHeight, f = l < r, u.isSubContext = void 0 === wx.getOpenDataContext, 
        u.isDevTool = "devtools" === s.platform, i.cloneMethod(u, wx, "getSystemInfoSync"), 
        i.cloneMethod(u, wx, "onTouchStart"), i.cloneMethod(u, wx, "onTouchMove"), i.cloneMethod(u, wx, "onTouchEnd"), 
        i.cloneMethod(u, wx, "onTouchCancel"), i.cloneMethod(u, wx, "createInnerAudioContext"), 
        i.cloneMethod(u, wx, "onAudioInterruptionEnd"), i.cloneMethod(u, wx, "onAudioInterruptionBegin"), 
        i.cloneMethod(u, wx, "createVideo"), i.cloneMethod(u, wx, "setPreferredFramesPerSecond"), 
        i.cloneMethod(u, wx, "showKeyboard"), i.cloneMethod(u, wx, "hideKeyboard"), i.cloneMethod(u, wx, "updateKeyboard"), 
        i.cloneMethod(u, wx, "onKeyboardInput"), i.cloneMethod(u, wx, "onKeyboardConfirm"), 
        i.cloneMethod(u, wx, "onKeyboardComplete"), i.cloneMethod(u, wx, "offKeyboardInput"), 
        i.cloneMethod(u, wx, "offKeyboardConfirm"), i.cloneMethod(u, wx, "offKeyboardComplete"), 
        i.cloneMethod(u, wx, "getOpenDataContext"), i.cloneMethod(u, wx, "onMessage"), i.cloneMethod(u, wx, "getSharedCanvas"), 
        i.cloneMethod(u, wx, "loadFont"), i.cloneMethod(u, wx, "onShow"), i.cloneMethod(u, wx, "onHide"), 
        i.cloneMethod(u, wx, "onError"), i.cloneMethod(u, wx, "offError"), o = !1, a = 1, 
        wx.onDeviceOrientationChange && wx.onDeviceOrientationChange(function(e) {
            "landscape" === e.value ? a = 1 : "landscapeReverse" === e.value && (a = -1);
        }), Object.assign(u, {
            startAccelerometer: function startAccelerometer(i) {
                o ? wx.startAccelerometer && wx.startAccelerometer({
                    fail: function fail(e) {
                        console.error("start accelerometer failed", e);
                    }
                }) : (o = !0, wx.onAccelerometerChange && wx.onAccelerometerChange(function(e) {
                    var t, n = {}, r = e.x, o = e.y;
                    f && (t = r, r = -o, o = t), n.x = r * a, n.y = o * a, n.z = e.z, i && i(n);
                }));
            },
            stopAccelerometer: function stopAccelerometer() {
                wx.stopAccelerometer && wx.stopAccelerometer({
                    fail: function fail(e) {
                        console.error("stop accelerometer failed", e);
                    }
                });
            }
        }), u.getSafeArea = function() {
            var e, t = s.safeArea, n = t.top, r = t.left, o = t.bottom, i = t.right, a = t.width, c = t.height;
            return "ios" === s.platform && !u.isDevTool && f && (n = l - (e = [ i, n, r, o, a, c ])[0], 
            r = e[1], o = l - e[2], i = e[3], c = e[4], a = e[5]), {
                top: n,
                left: r,
                bottom: o,
                right: i,
                width: a,
                height: c
            };
        });
    }, {
        "../../../common/utils": 17
    } ]
}, {}, [ 22 ]);