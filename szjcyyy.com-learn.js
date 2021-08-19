// ==UserScript==
// @name         szjcyyy.com 学习 油猴脚本
// @namespace    https://github.com/mengyou658/szjcyyy.com-learn
// @version      1.0.0
// @description  szjcyyy.com 学习 油猴脚本
// @author       yunchaoq/mengyou658
// @license      GPL License
// @match        *://*.szjcyyy.com/*
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/layer.min.js
// @resource     layerCss https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/theme/default/layer.min.css
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getResourceText
// ==/UserScript==
(function () {
  'use strict';
  GM_addStyle(GM_getResourceText('layerCss'))
  // GM_addStyle(GM_getResourceText('layuiCss'))
  var location = window.location.href;
  // 首页
  let homePageFlag = location.indexOf("https://px.szjcyyy.com/#/pc") > -1 && location.indexOf('https://px.szjcyyy.com/#/pc/video') === -1;
  // 播放页
  let playPageFlag = location.indexOf("https://px.szjcyyy.com/#/pc/video") > -1;
  if (homePageFlag || playPageFlag) {
    init();
  }

  insertScript('https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js')
  function init() {

    if (homePageFlag) {
      // 首页
      homePageInit();
    }
    if (playPageFlag) {
      // 播放页
      detailPageInit();
    }

  }

  function homePageInit() {
    showMsg('szjcyyy.com-learn 当前访问主页面')
    // 首页
    $('#app > div.indexpc > div.con > div.daohang-pc > div.dh-button.dh-checked').click()
    setTimeout(function () {
      var tmp = jQuery('.bofang:contains("播放")')
      tmp[tmp.length -1].click()
    }, 1000);
  }

  function detailPageInit() {
    var ppt = $(".pc-down-title").text()
    let msgPre = 'szjcyyy.com-learn ' + ppt;
    var msg = msgPre + ': 正在学习';
    showMsg(msg)
    if (window.tmpInterval) {
      clearInterval(window.tmpInterval)
      window.tmpInterval = null
    }
    if (window.tmpInterval1) {
      clearInterval(window.tmpInterval1)
      window.tmpInterval1 = null
    }
    // 播放页
    window.tmpInterval = setInterval(function () {
      document.getElementsByClassName('dplayer-play-icon')[0].click()
      document.getElementsByClassName('dplayer-play-icon')[0].click()
      var msg = msgPre + ', 定时启动关闭';
      showMsg(msg)
    }, 300000);

    window.tmpInterval1 = setInterval(function () {
      layer.msg('szjcyyy.com-learn ' + ppt + ' 开始校验：, 是否学习结束')
      var p = $('.dplayer-time .dplayer-ptime').text()
      var t = $('.dplayer-time .dplayer-dtime').text()
      if (p == t) {
        showMsg(msg + ' 校验结果：, 学习结束', function () {
          parent.location.reload()
          window.close()
        });
      } else {
        showMsg(msg + ' 校验结果：, 继续学习中')
      }
    }, 60000);


  }

  function showMsg(msg, callback) {
    console.log(msg)
    layer.msg(msg, callback)
  }

  function insertScript(src) {
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = src;
    document.body.appendChild(newScript);
  }
})();
