var moduleMap = {
    "assets/internal/index.js": function assetsInternalIndexJs() {
        return require("assets/internal/index.js");
    },
    "assets/resources/index.js": function assetsResourcesIndexJs() {
        return require("assets/resources/index.js");
    },
    "assets/main/index.js": function assetsMainIndexJs() {
        return require("assets/main/index.js");
    }
};

window.__cocos_require__ = function(moduleName) {
    var func = moduleMap[moduleName];
    if (!func) {
        throw new Error("cannot find module " + moduleName);
    }
    return func();
};