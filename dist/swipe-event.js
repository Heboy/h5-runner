/**
 * Created by Soup Tang on 2016/5/26.
 */

window.SwipeEvent = function SwipeEvent(dom) {
    var startX = 0, startY = 0, moving = false;
    var swipeLeftToRight = new Event('swipe-left-to-right'),
        swipeRightToLeft = new Event('swipe-right-to-left'),
        swipeTopToBottom = new Event('swipe-top-to-bottom'),
        swipeBottomToTop = new Event('swipe-bottom-to-top');

    dom.addEventListener('touchstart', touchStartHandle);
    dom.addEventListener('mousedown', mouseDownHandle);
    dom.addEventListener('touchmove', touchMoveHandle);
    dom.addEventListener('mousemove', mouseMoveHandle);
    dom.addEventListener('touchend', touchEndHandle);
    dom.addEventListener('mouseup', mouseUpHandle);

    function touchStartHandle(e) {
        var touch = e.touches[0]; //获取第一个触点
        startX = Number(touch.pageX); //页面触点X坐标
        startY = Number(touch.pageY); //页面触点Y坐标
    }

    function mouseDownHandle(e) {
        startX = Number(e.pageX);
        startY = Number(e.pageY);
    }

    function touchMoveHandle(e) {
        var touch = e.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标

        //左右方向
        if (Math.abs(x - startX) > Math.abs(y - startY) && moving === false) {
            moving = true;
            if (x - startX > 0) {
                dom.dispatchEvent(swipeRightToLeft);
            }
            else {
                dom.dispatchEvent(swipeLeftToRight);
            }
        }
        //上下方向
        else if (moving === false) {
            moving = true;
            if (y - startY > 0) {
                dom.dispatchEvent(swipeTopToBottom);
            }
            else {
                dom.dispatchEvent(swipeBottomToTop);
            }
        }
    }

    function mouseMoveHandle(e) {
        var x = Number(e.pageX); //页面触点X坐标
        var y = Number(e.pageY); //页面触点Y坐标

        //左右方向
        if (Math.abs(x - startX) > Math.abs(y - startY) && moving === false) {
            moving = true;
            if (x - startX > 0) {
                dom.dispatchEvent(swipeRightToLeft);
            }
            else {
                dom.dispatchEvent(swipeLeftToRight);
            }
        }
        //上下方向
        else if (moving === false) {
            moving = true;
            if (y - startY > 0) {
                dom.dispatchEvent(swipeTopToBottom);
            }
            else {
                dom.dispatchEvent(swipeBottomToTop);
            }
        }
    }

    function touchEndHandle(e) {
        moving = false;
    }

    function mouseUpHandle(e){
        moving = false;
    }
};