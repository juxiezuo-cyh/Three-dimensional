$(document).ready(function() {
    var camera, scene, renderer;
    var pano = document.getElementById('pano');
    var target = new THREE.Vector3();
    var lon = 90, lat = 0;
    var phi = 0, theta = 0;
    var touchX, touchY;
    var tc_bg_switch = true,switch_fm = true,switch_dengta = true,switch_jiangtai = true,switch_chuan = true,switch_feiji = true,switch_chengshi = true,switch_gaotie = true,switch_huojian = true;

    var video_fm = document.getElementById('video_fm');
    var mp3_dangzhang_19 = document.getElementById('dangzhang_19_mp3');
    var video_dengta = document.getElementById('video_dengta');
    var video_jiangtai = document.getElementById('video_jiangtai');
    var video_chuan = document.getElementById('video_chuan');
    var video_feiji = document.getElementById('video_feiji');
    var video_chengshi = document.getElementById('video_chengshi');
    var video_gaotie = document.getElementById('video_gaotie');
    var video_huojian = document.getElementById('video_huojian');
    mp3_dangzhang_19.volume = 1;
    video_fm.style["object-position"]= "0px -60px";
    video_dengta.style["object-position"]= "0px -60px";
    video_jiangtai.style["object-position"]= "0px -60px";
    video_chuan.style["object-position"]= "0px -60px";
    video_feiji.style["object-position"]= "0px -60px";
    video_chengshi.style["object-position"]= "0px -60px";
    video_gaotie.style["object-position"]= "0px -60px";
    video_huojian.style["object-position"]= "0px -60px";

    var shareArr_list = ['我第一次进入人民大会堂，竟是以这样的方式','我已受邀到人民大会堂听报告，想来快点！','从未想到，我以这样的方式看报告'];
    var shareArr = Math.floor((Math.random()*shareArr_list.length));
    $('.share-title').text(shareArr_list[shareArr]);

    //创建一个加载
    var loader = new window.PxLoader(),
        baseUrl = './';
    var fileList = [
        'video/fm_video1.mp4',
        'music/bg.mp3',
        'music/dangzhang_19.mp3',
        'images/controlIcon.png',
        'images/controlIconae.png',
        'images/fenxiang.jpg',
        'images/fm_bg.jpg',
        'images/fm_bt.png',
        'images/fm_start.png',
        'images/next.png',
        'images/qj_btn_img.png',
        'images/panorama.back.jpg',
        'images/panorama.top.jpg',
        'images/panorama.left.jpg',
        'images/panorama.right.jpg',
        'images/panorama.front.jpg',
        'images/panorama.bottom.jpg',
        'images/yuandian.png',
        'images/tc_bg.png',
        'images/tc_bg_pc.png',
        'images/cztd_bg.png',
        'images/cztd_btn.png',
        'images/cztd_close.png',
        'images/cztd_img.png',
        'images/dangzhang_move.png'
    ];

    for(var i = 0; i < fileList.length; i++) {
        var pxImage = new PxLoaderImage(baseUrl + fileList[i]);
        pxImage.imageNumber = i + 1;
        loader.add(pxImage);
    }

    //加载的进度...
    loader.addProgressListener(function(e) {
        var num = Math.floor((e.completedCount / e.totalCount) * 100);
        $('#loading_p').find('p').text(num+'%');
    });
    //加载完成执行...
    loader.addCompletionListener(function() {
       setTimeout(function(){
           $('#loading').fadeOut(1000);
       },1200);
       setTimeout(function () {
           $('#fm_bt').addClass('animated fadeInUp').show();
       },2200);
        setTimeout(function () {
            $('#fm_start').addClass('animated fadeInUp').show();
            $('#fm').bind('touchstart',function () {
                $('#fm').fadeOut();
                $('#fm_video_box').show();
                video_fm.play();
                $('.yuandian_move').addClass('animated hinges infinite pulse');
            });
            $('#fm_cp').addClass('animated fadeInUp').show();
        },3000);
    });
    //开始加载loader...
    loader.start();

    //封面视频结束
    video_fm.addEventListener('timeupdate',function() {
        if(this.currentTime > 18 && switch_fm){
            $('#qj_btn').show();
            switch_fm = false;
        }else if(this.currentTime > 45 && switch_dengta){
            switch_dengta = false;
        }else if(this.currentTime > 76 && switch_jiangtai){
            switch_jiangtai = false;
        }else if(this.currentTime > 98 && switch_chuan){
            switch_chuan = false;
        }else if(this.currentTime > 125 && switch_feiji){
            switch_feiji = false;
        }else if(this.currentTime > 169 && switch_chengshi){
            switch_chengshi = false;
        }else if(this.currentTime > 215 && switch_gaotie){
            switch_gaotie = false;
        }
        if (this.ended) {
            video_fm.load();
            $('#fm_video_box').hide();
            // video_fm.pause();
            $('#tc_bg').show();
            setTimeout(function () {
                $('#tc_bg').hide();
            },3000);
        }
        // if (this.currentTime > 3) {
        //     $('#fm_video_box').fadeOut();
        //     video_fm.pause();
        //     $('.yuandian_move').addClass('animated hinges infinite pulse');
        //     // $('#aud2').get(0).play();
        // }
    });

    //点击qj_btn
    $('#qj_btn').bind('touchstart',function () {
        close_video();
        if(tc_bg_switch){
            $('#tc_bg').show();
            setTimeout(function () {
                $('#tc_bg').hide();
            },3000);
        }
        tc_bg_switch = false;
        $(this).hide();
        video_fm.pause();
        $('#fm_video_box').hide();
        $('#video_dengta_box').hide();
    });

    video_dengta.addEventListener("x5videoexitfullscreen", function(){
        this.load();
        // this.currentTime = 0;
        // this.pause();
    });
    video_jiangtai.addEventListener("x5videoexitfullscreen", function(){
        this.load();
        // this.currentTime = 0;
        // this.pause();
    });
    video_chuan.addEventListener("x5videoexitfullscreen", function(){
        this.load();
        // this.currentTime = 0;
        // this.pause();
    });
    video_feiji.addEventListener("x5videoexitfullscreen", function(){
        this.load();
        // this.currentTime = 0;
        // this.pause();
    });
    video_chengshi.addEventListener("x5videoexitfullscreen", function(){
        this.load();
        // this.currentTime = 0;
        // this.pause();
    });
    video_gaotie.addEventListener("x5videoexitfullscreen", function(){
        this.load();
        // this.currentTime = 0;
        // this.pause();
    });
    video_huojian.addEventListener("x5videoexitfullscreen", function(){
        this.load();
        // this.currentTime = 0;
        // this.pause();
    });

    //点击dengta_yuandian
    $('#dengta_yuandian').bind('touchstart',function () {
        mp3_dangzhang_19.currentTime = 0;
        mp3_dangzhang_19.pause();
        $('#aud2').get(0).play();
        $('#dengta_yuandian').removeClass('animated hinges infinite pulse');
        $('#qj_btn,#video_dengta_box').show();
        video_dengta.play();
    });
    //点击jiangtai_yuandian
    $('#jiangtai_yuandian').bind('touchstart',function () {
        mp3_dangzhang_19.currentTime = 0;
        mp3_dangzhang_19.pause();
        $('#aud2').get(0).play();
        switch_dengta = false;switch_fm = false;
        switch_jiangtai = true;
        $('#jiangtai_yuandian').removeClass('animated hinges infinite pulse');
        $('#qj_btn,#video_jiangtai_box').show();
        video_jiangtai.play();
    });
    //点击chuan_yuandian
    $('#chuan_yuandian').bind('touchstart',function () {
        mp3_dangzhang_19.currentTime = 0;
        mp3_dangzhang_19.pause();
        $('#aud2').get(0).play();
        switch_jiangtai = false;switch_dengta = false;switch_fm = false;
        switch_chuan = true;
        $('#chuan_yuandian').removeClass('animated hinges infinite pulse');
        $('#qj_btn,#video_chuan_box').show();
        video_chuan.play();
    });
    //点击feiji_yuandian
    $('#feiji_yuandian').bind('touchstart',function () {
        mp3_dangzhang_19.currentTime = 0;
        mp3_dangzhang_19.pause();
        $('#aud2').get(0).play();
        switch_chuan = false;switch_jiangtai = false;switch_dengta = false;switch_fm = false;
        switch_feiji = true;
        $('#feiji_yuandian').removeClass('animated hinges infinite pulse');
        $('#qj_btn,#video_feiji_box').show();
        video_feiji.play();
    });
    //点击chengshi_yuandian
    $('#chengshi_yuandian').bind('touchstart',function () {
        mp3_dangzhang_19.currentTime = 0;
        mp3_dangzhang_19.pause();
        $('#aud2').get(0).play();
        switch_feiji = false;switch_chuan = false;switch_jiangtai = false;switch_dengta = false;switch_fm = false;
        switch_chengshi = true;
        $('#chengshi_yuandian').removeClass('animated hinges infinite pulse');
        $('#qj_btn,#video_chengshi_box').show();
        video_chengshi.play();
    });
    //点击gaotie_yuandian
    $('#gaotie_yuandian').bind('touchstart',function () {
        mp3_dangzhang_19.currentTime = 0;
        mp3_dangzhang_19.pause();
        $('#aud2').get(0).play();
        switch_chengshi = false;switch_chuan = false;switch_feiji = false;switch_jiangtai =false;switch_dengta =false;switch_fm = false;
        switch_gaotie = true;
        $('#gaotie_yuandian').removeClass('animated hinges infinite pulse');
        $('#qj_btn,#video_gaotie_box').show();
        video_gaotie.play();
    });
    //点击huojian_yuandian
    $('#huojian_yuandian').bind('touchstart',function () {
        mp3_dangzhang_19.currentTime = 0;
        mp3_dangzhang_19.pause();
        $('#aud2').get(0).play();
        switch_gaotie = false;switch_chengshi =false;switch_chuan =false;switch_feiji =false;switch_jiangtai =false;switch_dengta =false;switch_fm =false;
        switch_huojian = true;
        $('#huojian_yuandian').removeClass('animated hinges infinite pulse');
        $('#qj_btn,#video_huojian_box').show();
        video_huojian.play();
    });
    //点击dangzhang_yuandian
    $('#dangzhang_yuandian').bind('touchstart',function () {
        $('#dangzhang_move').addClass('animated fadeInUp').show();
        $('#dangzhang_yuandian').removeClass('animated hinges infinite pulse');
        $('#aud2').get(0).load();
        mp3_dangzhang_19.volume = 1;
        mp3_dangzhang_19.load();
        mp3_dangzhang_19.play();
        mp3_dangzhang_19.volume = 1;
    });

    //dangzhang_19_mp3监听
    mp3_dangzhang_19.addEventListener('timeupdate',function () {
        if(this.ended){
            mp3_dangzhang_19.currentTime = 0;
            mp3_dangzhang_19.pause();
            $('#aud2').get(0).play();
        }
    });

    //点击创作团队
    $('#cztd_btn').bind('touchstart',function () {
        $('#cztd').fadeIn();
    });
    $('#cztd_close').bind('touchstart',function () {
        $('#cztd').fadeOut();
    });

    init();
    animate();
    function init() {
        /**
         * 添加相机
         * @type {THREE.PerspectiveCamera}
         */
        camera = new THREE.PerspectiveCamera(
            90, // 相机视角的夹角
            window.innerWidth / window.innerHeight,  // 相机画幅比
            100, // 最近焦距
            1000 // 最远焦距
        );

        /**
         * 创建场景
         * @type {THREE.Scene}
         */
        scene = new THREE.Scene();

        /**
         *正方体的6个面的资源及相关（坐标、旋转等）设置
         */
        var flipAngle = Math.PI, // 180度
            rightAngle = flipAngle / 2, // 90度
            tileWidth = 636;
        var sides = [{
            url: "images/panorama.right.jpg", //right
            position: [-tileWidth, 0, 0],
            rotation: [0, rightAngle, 0]
        }, {
            url: "images/panorama.left.jpg", //left
            position: [tileWidth, 0, 0],
            rotation: [0, -rightAngle, 0]
        }, {
            url: "images/panorama.top.jpg", //top
            position: [0, tileWidth, 0],
            rotation: [rightAngle, 0, Math.PI]
        }, {
            url: "images/panorama.bottom.jpg", //bottom
            position: [0, -tileWidth, 0],
            rotation: [-rightAngle, 0, Math.PI]
        }, {
            url: "images/panorama.front.jpg", //front
            position: [0, 0, tileWidth],
            rotation: [0, Math.PI, 0]
        }, {
            url: "images/panorama.back.jpg", //back
            position: [0, 0, -tileWidth],
            rotation: [0, 0, 0]
        }];

        for ( var i = 0; i < sides.length; i ++ ) {
            var side = sides[ i ];
            var element = document.getElementById("bg_section_"+i);
            element.width = 1273;
            element.height = 1273; // 2 pixels extra to close the gap.
            // 添加一个渲染器
            var object = new THREE.CSS3DObject( element );
            object.position.fromArray( side.position );
            object.rotation.fromArray( side.rotation );
            scene.add( object );

        }

        renderer = new THREE.CSS3DRenderer(); // 定义渲染器
        renderer.setSize( window.innerWidth, window.innerHeight ); // 定义尺寸
        pano.appendChild( renderer.domElement ); // 将场景到加入页面中

        initDevices();
        initMouseControl();

    }
    // 初始化控制器
    function initMouseControl() {
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'wheel', onDocumentMouseWheel, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
        window.addEventListener( 'resize', onWindowResize, false );
    }

    var controlsBtn= document.getElementById("controlBtn"); // 控制陀螺仪开关的按钮
    var isDeviceing = true; // 陀螺仪状态
    controlsBtn.addEventListener("touchend", controlDevice, true);
    // isDeviceing == true ? $("#controlBtn").addClass("controlIconae") : $("#controlBtn").addClass("controlIcon");
    // 初始化陀螺仪
    function initDevices() {
        deviceControl = new THREE.DeviceOrientationControls(camera);
    }
    /* 控制陀螺仪 */
    function controlDevice(event) {
        if (isDeviceing == true) {
            isDeviceing = false;
            //关闭陀螺仪
            $("#controlBtn").removeClass("controlIcon").addClass("controlIconae");
        } else {
            isDeviceing = true;
            //开启陀螺仪
            $("#controlBtn").removeClass("controlIconae").addClass("controlIcon");
        }
    }
    /**
     * 窗体大小改变
     */
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    /*
     相机焦点跟着鼠标或手指的操作移动
     */
    function onDocumentMouseDown( event ) {
        event.preventDefault();
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );

    }
    function onDocumentMouseMove( event ) {
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        lon -= movementX * 0.1;
        lat += movementY * 0.1;
    }
    function onDocumentMouseUp( event ) {
        document.removeEventListener( 'mousemove', onDocumentMouseMove );
        document.removeEventListener( 'mouseup', onDocumentMouseUp );
    }
    /**
     * 鼠标滚轮改变相机焦距
     */
    function onDocumentMouseWheel( event ) {
        camera.fov += event.deltaY * 0.05;
        camera.updateProjectionMatrix();
    }
    function onDocumentTouchStart( event ) {
        event.preventDefault();
        var touch = event.touches[ 0 ];
        touchX = touch.screenX;
        touchY = touch.screenY;

    }
    function onDocumentTouchMove( event ) {
        event.preventDefault();
        var touch = event.touches[ 0 ];
        lon -= ( touch.screenX - touchX ) * 0.1;
        lat += ( touch.screenY - touchY ) * 0.1;
        touchX = touch.screenX;
        touchY = touch.screenY;

    }
    /**
     * 实时渲染函数
     */
    function animate() {
        requestAnimationFrame(animate);
//        lon = Math.max(-180, Math.min(180, lon));//限制固定角度内旋转
//         lon -= 0.1;//横向自动旋转
//         lat += 0.1;//纵向自动旋转
        lat = Math.max(-70, Math.min(70, lat)); //限制固定角度内旋转
        phi = THREE.Math.degToRad(100 - lat);
        theta = THREE.Math.degToRad(lon);
        target.x = Math.sin(phi) * Math.cos(theta);
        target.y = Math.cos(phi);
        target.z = Math.sin(phi) * Math.sin(theta);
        camera.lookAt( target );
        camera.updateProjectionMatrix();
        isDeviceing == false ? initMouseControl() : deviceControl.update();
        renderer.render(scene, camera);
    }

    function close_video() {
        $('.video_box').hide();
        video_dengta.load();
        // video_dengta.currentTime = 0;
        // video_dengta.pause();
        video_jiangtai.load();
        // video_jiangtai.currentTime = 0;
        // video_jiangtai.pause();
        video_chuan.load();
        // video_chuan.currentTime = 0;
        // video_chuan.pause();
        video_feiji.load();
        // video_feiji.currentTime = 0;
        // video_feiji.pause();
        video_chengshi.load();
        // video_chengshi.currentTime = 0;
        // video_chengshi.pause();
        video_gaotie.load();
        // video_gaotie.currentTime = 0;
        // video_gaotie.pause();
        video_huojian.load();
        // video_huojian.currentTime = 0;
        // video_huojian.pause();
    }

    //music
    $("#viose").click(function () {
        if($("#aud2").get(0).paused == false){
            $(this).addClass("no").find("img").attr("src","images/close.png");
            $("#aud2").get(0).pause();
        }else{
            $(this).removeClass("no").find("img").attr("src","images/open.png");
            $("#aud2").get(0).play();
        }
    });
});