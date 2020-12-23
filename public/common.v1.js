!(function(e, n) {
  "function" == typeof define && (define.amd || define.cmd)
    ? define(function() {
        return n(e);
      })
    : n(e, !0);
})(this, function(e, n) {
  function i(n, i, t) {
    e.WeixinJSBridge
      ? WeixinJSBridge.invoke(n, o(i), function(e) {
          c(n, e, t);
        })
      : u(n, t);
  }
  function t(n, i, t) {
    e.WeixinJSBridge
      ? WeixinJSBridge.on(n, function(e) {
          t && t.trigger && t.trigger(e), c(n, e, i);
        })
      : t
      ? u(n, t)
      : u(n, i);
  }
  function o(e) {
    return (
      (e = e || {}),
      (e.appId = C.appId),
      (e.verifyAppId = C.appId),
      (e.verifySignType = "sha1"),
      (e.verifyTimestamp = C.timestamp + ""),
      (e.verifyNonceStr = C.nonceStr),
      (e.verifySignature = C.signature),
      e
    );
  }
  function r(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1",
    };
  }
  function a(e) {
    return (
      (e.postalCode = e.addressPostalCode),
      delete e.addressPostalCode,
      (e.provinceName = e.proviceFirstStageName),
      delete e.proviceFirstStageName,
      (e.cityName = e.addressCitySecondStageName),
      delete e.addressCitySecondStageName,
      (e.countryName = e.addressCountiesThirdStageName),
      delete e.addressCountiesThirdStageName,
      (e.detailInfo = e.addressDetailInfo),
      delete e.addressDetailInfo,
      e
    );
  }
  function c(e, n, i) {
    "openEnterpriseChat" == e && (n.errCode = n.err_code),
      delete n.err_code,
      delete n.err_desc,
      delete n.err_detail;
    var t = n.errMsg;
    t || ((t = n.err_msg), delete n.err_msg, (t = s(e, t)), (n.errMsg = t)),
      (i = i || {})._complete && (i._complete(n), delete i._complete),
      (t = n.errMsg || ""),
      C.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n);
    }
    i.complete && i.complete(n);
  }
  function s(e, n) {
    var i = e,
      t = v[i];
    t && (i = t);
    var o = "ok";
    if (n) {
      var r = n.indexOf(":");
      "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
        "failed" == o && (o = "fail"),
        -1 != o.indexOf("failed_") && (o = o.substring(7)),
        -1 != o.indexOf("fail_") && (o = o.substring(5)),
        ("access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) &&
          "no permission to execute" != o) ||
          (o = "permission denied"),
        "config" == i && "function not exist" == o && (o = "ok"),
        "" == o && (o = "fail");
    }
    return (n = i + ":" + o);
  }
  function d(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
          o = h[t];
        o && (e[n] = o);
      }
      return e;
    }
  }
  function u(e, n) {
    if (!(!C.debug || (n && n.isInnerInvoke))) {
      var i = v[e];
      i && (e = i),
        n && n._complete && delete n._complete,
        console.log('"' + e + '",', n || "");
    }
  }
  function l(e) {
    if (!(k || w || C.debug || x < "6.0.2" || V.systemType < 0)) {
      var n = new Image();
      (V.appId = C.appId),
        (V.initTime = A.initEndTime - A.initStartTime),
        (V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime),
        N.getNetworkType({
          isInnerInvoke: !0,
          success: function(e) {
            V.networkType = e.networkType;
            var i =
              "https://open.weixin.qq.com/sdk/report?v=" +
              V.version +
              "&o=" +
              V.isPreVerifyOk +
              "&s=" +
              V.systemType +
              "&c=" +
              V.clientVersion +
              "&a=" +
              V.appId +
              "&n=" +
              V.networkType +
              "&i=" +
              V.initTime +
              "&p=" +
              V.preVerifyTime +
              "&u=" +
              V.url;
            n.src = i;
          },
        });
    }
  }
  function p() {
    return new Date().getTime();
  }
  function f(n) {
    T &&
      (e.WeixinJSBridge
        ? n()
        : S.addEventListener &&
          S.addEventListener("WeixinJSBridgeReady", n, !1));
  }
  function m() {
    N.invoke ||
      ((N.invoke = function(n, i, t) {
        e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t);
      }),
      (N.on = function(n, i) {
        e.WeixinJSBridge && WeixinJSBridge.on(n, i);
      }));
  }
  function g(e) {
    if ("string" == typeof e && e.length > 0) {
      var n = e.split("?")[0],
        i = e.split("?")[1];
      return (n += ".html"), void 0 !== i ? n + "?" + i : n;
    }
  }
  if (!e.jWeixin) {
    var h = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest",
        openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
        startSearchBeacons: "startMonitoringBeacons",
        stopSearchBeacons: "stopMonitoringBeacons",
        onSearchBeacons: "onBeaconsInRange",
        consumeAndShareCard: "consumedShareCard",
        openAddress: "editAddress",
      },
      v = (function() {
        var e = {};
        for (var n in h) e[h[n]] = n;
        return e;
      })(),
      S = e.document,
      I = S.title,
      y = navigator.userAgent.toLowerCase(),
      _ = navigator.platform.toLowerCase(),
      k = !(!_.match("mac") && !_.match("win")),
      w = -1 != y.indexOf("wxdebugger"),
      T = -1 != y.indexOf("micromessenger"),
      M = -1 != y.indexOf("android"),
      P = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"),
      x = (function() {
        var e =
          y.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
          y.match(/micromessenger\/(\d+\.\d+)/);
        return e ? e[1] : "";
      })(),
      A = {
        initStartTime: p(),
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0,
      },
      V = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: P ? 1 : M ? 2 : -1,
        clientVersion: x,
        url: encodeURIComponent(location.href),
      },
      C = {},
      L = { _completes: [] },
      B = { state: 0, data: {} };
    f(function() {
      A.initEndTime = p();
    });
    var O = !1,
      E = [],
      N = {
        config: function(e) {
          (C = e), u("config", e);
          var n = !1 !== C.check;
          f(function() {
            if (n)
              i(
                h.config,
                { verifyJsApiList: d(C.jsApiList) },
                (function() {
                  (L._complete = function(e) {
                    (A.preVerifyEndTime = p()), (B.state = 1), (B.data = e);
                  }),
                    (L.success = function(e) {
                      V.isPreVerifyOk = 0;
                    }),
                    (L.fail = function(e) {
                      L._fail ? L._fail(e) : (B.state = -1);
                    });
                  var e = L._completes;
                  return (
                    e.push(function() {
                      l();
                    }),
                    (L.complete = function(n) {
                      for (var i = 0, t = e.length; i < t; ++i) e[i]();
                      L._completes = [];
                    }),
                    L
                  );
                })()
              ),
                (A.preVerifyStartTime = p());
            else {
              B.state = 1;
              for (var e = L._completes, t = 0, o = e.length; t < o; ++t)
                e[t]();
              L._completes = [];
            }
          }),
            m();
        },
        ready: function(e) {
          0 != B.state ? e() : (L._completes.push(e), !T && C.debug && e());
        },
        error: function(e) {
          x < "6.0.2" || (-1 == B.state ? e(B.data) : (L._fail = e));
        },
        checkJsApi: function(e) {
          var n = function(e) {
            var n = e.checkResult;
            for (var i in n) {
              var t = v[i];
              t && ((n[t] = n[i]), delete n[i]);
            }
            return e;
          };
          i(
            "checkJsApi",
            { jsApiList: d(e.jsApiList) },
            ((e._complete = function(e) {
              if (M) {
                var i = e.checkResult;
                i && (e.checkResult = JSON.parse(i));
              }
              e = n(e);
            }),
            e)
          );
        },
        onMenuShareTimeline: function(e) {
          t(
            h.onMenuShareTimeline,
            {
              complete: function() {
                i(
                  "shareTimeline",
                  {
                    title: e.title || I,
                    desc: e.title || I,
                    img_url: e.imgUrl || "",
                    link: e.link || location.href,
                    type: e.type || "link",
                    data_url: e.dataUrl || "",
                  },
                  e
                );
              },
            },
            e
          );
        },
        onMenuShareAppMessage: function(e) {
          t(
            h.onMenuShareAppMessage,
            {
              complete: function(n) {
                "favorite" === n.scene
                  ? i("sendAppMessage", {
                      title: e.title || I,
                      desc: e.desc || "",
                      link: e.link || location.href,
                      img_url: e.imgUrl || "",
                      type: e.type || "link",
                      data_url: e.dataUrl || "",
                    })
                  : i(
                      "sendAppMessage",
                      {
                        title: e.title || I,
                        desc: e.desc || "",
                        link: e.link || location.href,
                        img_url: e.imgUrl || "",
                        type: e.type || "link",
                        data_url: e.dataUrl || "",
                      },
                      e
                    );
              },
            },
            e
          );
        },
        onMenuShareQQ: function(e) {
          t(
            h.onMenuShareQQ,
            {
              complete: function() {
                i(
                  "shareQQ",
                  {
                    title: e.title || I,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href,
                  },
                  e
                );
              },
            },
            e
          );
        },
        onMenuShareWeibo: function(e) {
          t(
            h.onMenuShareWeibo,
            {
              complete: function() {
                i(
                  "shareWeiboApp",
                  {
                    title: e.title || I,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href,
                  },
                  e
                );
              },
            },
            e
          );
        },
        onMenuShareQZone: function(e) {
          t(
            h.onMenuShareQZone,
            {
              complete: function() {
                i(
                  "shareQZone",
                  {
                    title: e.title || I,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href,
                  },
                  e
                );
              },
            },
            e
          );
        },
        updateTimelineShareData: function(e) {
          i(
            "updateTimelineShareData",
            { title: e.title, link: e.link, imgUrl: e.imgUrl },
            e
          );
        },
        updateAppMessageShareData: function(e) {
          i(
            "updateAppMessageShareData",
            { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl },
            e
          );
        },
        startRecord: function(e) {
          i("startRecord", {}, e);
        },
        stopRecord: function(e) {
          i("stopRecord", {}, e);
        },
        onVoiceRecordEnd: function(e) {
          t("onVoiceRecordEnd", e);
        },
        playVoice: function(e) {
          i("playVoice", { localId: e.localId }, e);
        },
        pauseVoice: function(e) {
          i("pauseVoice", { localId: e.localId }, e);
        },
        stopVoice: function(e) {
          i("stopVoice", { localId: e.localId }, e);
        },
        onVoicePlayEnd: function(e) {
          t("onVoicePlayEnd", e);
        },
        uploadVoice: function(e) {
          i(
            "uploadVoice",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
            },
            e
          );
        },
        downloadVoice: function(e) {
          i(
            "downloadVoice",
            {
              serverId: e.serverId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
            },
            e
          );
        },
        translateVoice: function(e) {
          i(
            "translateVoice",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
            },
            e
          );
        },
        chooseImage: function(e) {
          i(
            "chooseImage",
            {
              scene: "1|2",
              count: e.count || 9,
              sizeType: e.sizeType || ["original", "compressed"],
              sourceType: e.sourceType || ["album", "camera"],
            },
            ((e._complete = function(e) {
              if (M) {
                var n = e.localIds;
                try {
                  n && (e.localIds = JSON.parse(n));
                } catch (e) {}
              }
            }),
            e)
          );
        },
        getLocation: function(e) {},
        previewImage: function(e) {
          i(h.previewImage, { current: e.current, urls: e.urls }, e);
        },
        uploadImage: function(e) {
          i(
            "uploadImage",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
            },
            e
          );
        },
        downloadImage: function(e) {
          i(
            "downloadImage",
            {
              serverId: e.serverId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
            },
            e
          );
        },
        getLocalImgData: function(e) {
          !1 === O
            ? ((O = !0),
              i(
                "getLocalImgData",
                { localId: e.localId },
                ((e._complete = function(e) {
                  if (((O = !1), E.length > 0)) {
                    var n = E.shift();
                    wx.getLocalImgData(n);
                  }
                }),
                e)
              ))
            : E.push(e);
        },
        getNetworkType: function(e) {
          var n = function(e) {
            var n = e.errMsg;
            e.errMsg = "getNetworkType:ok";
            var i = e.subtype;
            if ((delete e.subtype, i)) e.networkType = i;
            else {
              var t = n.indexOf(":"),
                o = n.substring(t + 1);
              switch (o) {
                case "wifi":
                case "edge":
                case "wwan":
                  e.networkType = o;
                  break;
                default:
                  e.errMsg = "getNetworkType:fail";
              }
            }
            return e;
          };
          i(
            "getNetworkType",
            {},
            ((e._complete = function(e) {
              e = n(e);
            }),
            e)
          );
        },
        openLocation: function(e) {
          i(
            "openLocation",
            {
              latitude: e.latitude,
              longitude: e.longitude,
              name: e.name || "",
              address: e.address || "",
              scale: e.scale || 28,
              infoUrl: e.infoUrl || "",
            },
            e
          );
        },
        getLocation: function(e) {
          (e = e || {}),
            i(
              h.getLocation,
              { type: e.type || "wgs84" },
              ((e._complete = function(e) {
                delete e.type;
              }),
              e)
            );
        },
        hideOptionMenu: function(e) {
          i("hideOptionMenu", {}, e);
        },
        showOptionMenu: function(e) {
          i("showOptionMenu", {}, e);
        },
        closeWindow: function(e) {
          i("closeWindow", {}, (e = e || {}));
        },
        hideMenuItems: function(e) {
          i("hideMenuItems", { menuList: e.menuList }, e);
        },
        showMenuItems: function(e) {
          i("showMenuItems", { menuList: e.menuList }, e);
        },
        hideAllNonBaseMenuItem: function(e) {
          i("hideAllNonBaseMenuItem", {}, e);
        },
        showAllNonBaseMenuItem: function(e) {
          i("showAllNonBaseMenuItem", {}, e);
        },
        scanQRCode: function(e) {
          i(
            "scanQRCode",
            {
              needResult: (e = e || {}).needResult || 0,
              scanType: e.scanType || ["qrCode", "barCode"],
            },
            ((e._complete = function(e) {
              if (P) {
                var n = e.resultStr;
                if (n) {
                  var i = JSON.parse(n);
                  e.resultStr = i && i.scan_code && i.scan_code.scan_result;
                }
              }
            }),
            e)
          );
        },
        openAddress: function(e) {
          i(
            h.openAddress,
            {},
            ((e._complete = function(e) {
              e = a(e);
            }),
            e)
          );
        },
        openProductSpecificView: function(e) {
          i(
            h.openProductSpecificView,
            {
              pid: e.productId,
              view_type: e.viewType || 0,
              ext_info: e.extInfo,
            },
            e
          );
        },
        addCard: function(e) {
          for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
            var a = n[o],
              c = { card_id: a.cardId, card_ext: a.cardExt };
            t.push(c);
          }
          i(
            h.addCard,
            { card_list: t },
            ((e._complete = function(e) {
              var n = e.card_list;
              if (n) {
                for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                  var o = n[i];
                  (o.cardId = o.card_id),
                    (o.cardExt = o.card_ext),
                    (o.isSuccess = !!o.is_succ),
                    delete o.card_id,
                    delete o.card_ext,
                    delete o.is_succ;
                }
                (e.cardList = n), delete e.card_list;
              }
            }),
            e)
          );
        },
        chooseCard: function(e) {
          i(
            "chooseCard",
            {
              app_id: C.appId,
              location_id: e.shopId || "",
              sign_type: e.signType || "SHA1",
              card_id: e.cardId || "",
              card_type: e.cardType || "",
              card_sign: e.cardSign,
              time_stamp: e.timestamp + "",
              nonce_str: e.nonceStr,
            },
            ((e._complete = function(e) {
              (e.cardList = e.choose_card_info), delete e.choose_card_info;
            }),
            e)
          );
        },
        openCard: function(e) {
          for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
            var a = n[o],
              c = { card_id: a.cardId, code: a.code };
            t.push(c);
          }
          i(h.openCard, { card_list: t }, e);
        },
        consumeAndShareCard: function(e) {
          i(
            h.consumeAndShareCard,
            { consumedCardId: e.cardId, consumedCode: e.code },
            e
          );
        },
        chooseWXPay: function(e) {
          i(h.chooseWXPay, r(e), e);
        },
        openEnterpriseRedPacket: function(e) {
          i(h.openEnterpriseRedPacket, r(e), e);
        },
        startSearchBeacons: function(e) {
          i(h.startSearchBeacons, { ticket: e.ticket }, e);
        },
        stopSearchBeacons: function(e) {
          i(h.stopSearchBeacons, {}, e);
        },
        onSearchBeacons: function(e) {
          t(h.onSearchBeacons, e);
        },
        openEnterpriseChat: function(e) {
          i(
            "openEnterpriseChat",
            { useridlist: e.userIds, chatname: e.groupName },
            e
          );
        },
        launchMiniProgram: function(e) {
          i(
            "launchMiniProgram",
            {
              targetAppId: e.targetAppId,
              path: g(e.path),
              envVersion: e.envVersion,
            },
            e
          );
        },
        miniProgram: {
          navigateBack: function(e) {
            (e = e || {}),
              f(function() {
                i(
                  "invokeMiniProgramAPI",
                  { name: "navigateBack", arg: { delta: e.delta || 1 } },
                  e
                );
              });
          },
          navigateTo: function(e) {
            f(function() {
              i(
                "invokeMiniProgramAPI",
                { name: "navigateTo", arg: { url: e.url } },
                e
              );
            });
          },
          redirectTo: function(e) {
            f(function() {
              i(
                "invokeMiniProgramAPI",
                { name: "redirectTo", arg: { url: e.url } },
                e
              );
            });
          },
          switchTab: function(e) {
            f(function() {
              i(
                "invokeMiniProgramAPI",
                { name: "switchTab", arg: { url: e.url } },
                e
              );
            });
          },
          reLaunch: function(e) {
            f(function() {
              i(
                "invokeMiniProgramAPI",
                { name: "reLaunch", arg: { url: e.url } },
                e
              );
            });
          },
          postMessage: function(e) {
            f(function() {
              i(
                "invokeMiniProgramAPI",
                { name: "postMessage", arg: e.data || {} },
                e
              );
            });
          },
          getEnv: function(n) {
            f(function() {
              n({ miniprogram: "miniprogram" === e.__wxjs_environment });
            });
          },
        },
      },
      b = 1,
      R = {};
    return (
      S.addEventListener(
        "error",
        function(e) {
          if (!M) {
            var n = e.target,
              i = n.tagName,
              t = n.src;
            if (
              ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) &&
              -1 != t.indexOf("wxlocalresource://")
            ) {
              e.preventDefault(), e.stopPropagation();
              var o = n["wx-id"];
              if ((o || ((o = b++), (n["wx-id"] = o)), R[o])) return;
              (R[o] = !0),
                wx.ready(function() {
                  wx.getLocalImgData({
                    localId: t,
                    success: function(e) {
                      n.src = e.localData;
                    },
                  });
                });
            }
          }
        },
        !0
      ),
      S.addEventListener(
        "load",
        function(e) {
          if (!M) {
            var n = e.target,
              i = n.tagName;
            n.src;
            if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
              var t = n["wx-id"];
              t && (R[t] = !1);
            }
          }
        },
        !0
      ),
      n && (e.wx = e.jWeixin = N),
      N
    );
  }
});
!(function(self) {
  let query = {};
  location.search
    .substr(1, location.search.length - 1)
    .split("&")
    .forEach((item) => {
      let [key, value] = item.split("=");
      query[key] = value ? decodeURI(value) : "";
    });
  self.location.query = query;

  var e = {},
    o = [],
    s = /uni-app/i.test(navigator.userAgent),
    d = "__uniapp__service",
    w = "WEB_INVOKE_APPSERVICE",
    i = function(e, i) {
      if (0 === o.length && s) {
        var n = plus.webview.currentWebview();
        if (!n) throw new Error("plus.webview.currentWebview() is undefined");
        var t = n.parent();
        if (!t)
          throw new Error(
            "plus.webview.currentWebview().parent() is undefined"
          );
        o.push(t.id);
      }
      var a = {
        options: {
          timestamp: +new Date(),
        },
        name: e,
        arg: i,
      };
      if (s) {
        var r = JSON.stringify(a);
        plus.webview.getWebviewById(d)
          ? plus.webview.postMessageToUniNView(
              {
                type: w,
                args: {
                  data: a,
                  webviewIds: o,
                },
              },
              d
            )
          : plus.webview
              .getLaunchWebview()
              .evalJS(
                'UniPlusBridge.subscribeHandler("' +
                  w +
                  '",' +
                  r +
                  "," +
                  JSON.stringify(o) +
                  ");"
              );
      } else
        window.parent.postMessage(
          {
            type: w,
            data: a,
            pageId: "",
          },
          "*"
        );
    };
  (e.navigateTo = function() {
    var e = (0 < arguments.length && void 0 !== arguments[0]
      ? arguments[0]
      : {}
    ).url;
    i("navigateTo", {
      url: encodeURI(e),
    });
  }),
    (e.navigateBack = function() {
      var e = (0 < arguments.length && void 0 !== arguments[0]
        ? arguments[0]
        : {}
      ).delta;
      i("navigateBack", {
        delta: parseInt(e) || 1,
      });
    }),
    (e.switchTab = function() {
      var e = (0 < arguments.length && void 0 !== arguments[0]
        ? arguments[0]
        : {}
      ).url;
      i("switchTab", {
        url: encodeURI(e),
      });
    }),
    (e.reLaunch = function() {
      var e = (0 < arguments.length && void 0 !== arguments[0]
        ? arguments[0]
        : {}
      ).url;
      i("reLaunch", {
        url: encodeURI(e),
      });
    }),
    (e.redirectTo = function() {
      var e = (0 < arguments.length && void 0 !== arguments[0]
        ? arguments[0]
        : {}
      ).url;
      i("redirectTo", {
        url: encodeURI(e),
      });
    }),
    (e.getEnv = function(e) {
      e(
        s
          ? {
              plus: !0,
            }
          : {
              h5: !0,
            }
      );
    }),
    (e.postMessage = function() {
      var e =
        0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      i("postMessage", e.data || {});
    });
  var n = {};
  "undefined" != typeof wx &&
    wx.miniProgram &&
    ((n.navigateTo = wx.miniProgram.navigateTo),
    (n.navigateBack = wx.miniProgram.navigateBack),
    (n.switchTab = wx.miniProgram.switchTab),
    (n.reLaunch = wx.miniProgram.reLaunch),
    (n.redirectTo = wx.miniProgram.redirectTo),
    (n.postMessage = wx.miniProgram.postMessage),
    (n.getEnv = wx.miniProgram.getEnv));
  var t = {};
  -1 < navigator.userAgent.indexOf("AlipayClient") &&
    "undefined" != typeof my &&
    ((t.navigateTo = my.navigateTo),
    (t.navigateBack = my.navigateBack),
    (t.switchTab = my.switchTab),
    (t.reLaunch = my.reLaunch),
    (t.redirectTo = my.redirectTo),
    (t.postMessage = my.postMessage),
    (t.getEnv = my.getEnv));
  var a = {};
  "undefined" != typeof swan &&
    swan.webView &&
    ((a.navigateTo = swan.webView.navigateTo),
    (a.navigateBack = swan.webView.navigateBack),
    (a.switchTab = swan.webView.switchTab),
    (a.reLaunch = swan.webView.reLaunch),
    (a.redirectTo = swan.webView.redirectTo),
    (a.postMessage = swan.webView.postMessage),
    (a.getEnv = swan.webView.getEnv));
  var r = {};
  "undefined" != typeof tt &&
    tt.miniProgram &&
    ((r.navigateTo = tt.miniProgram.navigateTo),
    (r.redirectTo = tt.miniProgram.redirectTo),
    (r.reLaunch = tt.miniProgram.reLaunch),
    (r.switchTab = tt.miniProgram.switchTab),
    (r.navigateBack = tt.miniProgram.navigateBack));
  var g = navigator.userAgent,
    c = /uni-app/i.test(g),
    v = /micromessenger/i.test(g),
    u = /AlipayClient/.test(g),
    p = /swan/i.test(g),
    m = /toutiaomicroapp/i.test(g),
    l = {},
    b = function() {
      window.UniAppJSBridge = !0;
      document.dispatchEvent(
        new CustomEvent("UniAppJSBridgeReady", {
          bubbles: !0,
          cancelable: !0,
        })
      );
    };
  if (c) {
    self.uni = e;
    window.plus && /complete|loaded|interactive/.test(document.readyState)
      ? b()
      : document.addEventListener("plusready", b);
  } else if (query["platform"] == "h5") {
    self.uni = u ? t : p ? a : m ? r : e;
    /complete|loaded|interactive/.test(document.readyState)
      ? b()
      : document.addEventListener("DOMContentLoaded", b);
  } else {
    self.uni = n;
    window.WeixinJSBridge && WeixinJSBridge.invoke
      ? b()
      : document.addEventListener("WeixinJSBridgeReady", b);
  }
})(this);

location.get = function(key = "", defVal = "") {
  return location.query[key] || defVal;
};

var ua = navigator.userAgent.toLowerCase();
var inWechat = ua.match(/MicroMessenger/i) == "micromessenger";

var isDebug = /\d+\.\d+\.\d+\.\d+/.test(location.hostname);

var env = "mp";
document.addEventListener("UniAppJSBridgeReady", function() {
  uni.getEnv(function(res) {
    //console.log(res);
    console.log(res);
    if (res.plus) {
      env = "plus";
    } else if (res.h5) {
      env = "h5";
    } else if (res.miniprogram === false) {
      env = "h5";
    } else {
      env = "mp";
    }
  });
});

var Custom = {
  on(action, callback) {
    window.addEventListener("message", function(event) {
      if (event.data && event.data.action == action) {
        console.log("Get message from custom:", event);
        callback.call(this, event.data.data);
      }
    });
  },
  fire(action, data = {}) {
    console.log("Post message to custom:", data);
    document.getElementById("iframe").contentWindow.postMessage(
      {
        action,
        data,
      },
      "*"
    );
  },
};
var Main = {
  on(action, callback) {
    if (env == "plus") {
      window.addEventListener("custom-message", function(event) {
        if (event.detail && event.detail.action == action) {
          console.log("Get message from main:", event);
          return callback.call(this, event.detail.data);
        }
      });
    } else if (env == "h5") {
      window.addEventListener("message", function(event) {
        if (event.data && event.data.action == action) {
          console.log("Get message from main:", event);
          return callback.call(this, event.data.data);
        }
      });
    } else {
      window.addEventListener(
        "hashchange",
        function() {
          if (location.hash) {
            let data = {};
            location.hash
              .substr(1)
              .split("&")
              .forEach((item) => {
                let [key, value] = item.split("=");
                data[key] = value;
              });
            if (data.action == action) {
              console.log("Get message from main:", data);
              return callback.call(this, JSON.parse(data.data));
            }
          }
        },
        false
      );
    }
  },
  fire(action, data = {}) {
    console.log("Post message to main:", data);
    if (env == "plus") {
      try {
        plus.webview.postMessageToUniNView(
          {
            action,
            data,
          },
          "__uniapp__service"
        );
      } catch (e) {
        plus.webview.postMessageToUniNView(
          {
            action,
            data,
          },
          plus.webview.getLaunchWebview().id
        );
      }
    } else if (env == "h5") {
      window.parent.postMessage(
        {
          action,
          data,
        },
        "*"
      );
    } else {
    }
  },
};
