/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // Set "noCache" to true can make the loader ignoring the html page cache while loading your resources, 
    // especially useful in Android web browsers.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.enableAutoFullScreen(false); // 关闭游戏在浏览器上自动全屏
    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.SHOW_ALL);
    // Instead of set design resolution, you can also set the real pixel resolution size
    // Uncomment the following line and delete the previous line.
    // cc.view.setRealPixelResolution(960, 640, cc.ResolutionPolicy.SHOW_ALL);
    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {

        // 说明：第1、2、13章节没有源码。
        cc.textureCache.addImage(res.sh_node_16_png);
        cc.textureCache.addImage(res.sh_node_32_png);
        cc.textureCache.addImage(res.sh_node_64_png);
        cc.textureCache.addImage(res.sh_node_128_png);
        cc.textureCache.addImage(res.sh_node_256_png);
        cc.textureCache.addImage(res.sh_node_512_png);
        cc.textureCache.addImage(res.sh_node_1024_png);

        //cc.director.runScene(new Unit03_BaseScene());
        cc.director.runScene(new Unit04_ActionScene());
        //cc.director.runScene(new Unit05_EventScene());
        //cc.director.runScene(new Unit06_AudioScene());
        //cc.director.runScene(new Unit07_DesignScene());
        //cc.director.runScene(new Unit08_DataScene());
        //cc.director.runScene(new Unit09_ParticleScene());
        //cc.director.runScene(new Unit10_UIScene());
        //cc.director.runScene(new Unit11_OptimizeScene());
        //cc.director.runScene(new Unit12_TiledMapScene());
        //cc.director.runScene(new Unit14_ChipmunkScene());
        //cc.director.runScene(new Unit15_NetworkScene());
        //cc.director.runScene(new Unit15_ChatDemoScene());
    }, this);
};
cc.game.run();