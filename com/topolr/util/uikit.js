/**
 * @packet util.uikit;
 * @css util.style.uikit;
 * @icon util.icons;
 */
$.showDate = function (time) {
    var a = new Date(parseInt(time));
    var b = ["Jan", "Feb", "Mar", "Apr", "May ", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (a.getDate() || "") + " " + (b[a.getMonth()] || "") + " " + (a.getFullYear() || "");
};
$.toast = function (text) {
    $("<div class='toast'><div class='toast_text'>" + text + "</div></div>").appendTo("body").transition().set("-all-transform").done(function () {
        this.transition().removeAll().set("opacity", {time: 1000}).delay(2000).then(function () {
            this.css("opacity", 0);
        }).delay(1000).done(function () {
            this.remove();
        }).resolve();
    }).scope().transform().y(-250);
};
$.loadingbar = function () {
    var a = $("#loadingbar");
    if (a.length === 0) {
        a = $("<div id='loadingbar'>" +
            "<div class='loadingbar-bg'></div>" +
            "<div class='loadingbar-desc'></div></div>").appendTo("body");
    }
    return new loadingbar(a);
};
var loadingbar = function (dom) {
    this.dom = dom;
};
loadingbar.prototype.showLoading = function (text) {
    this.dom.children(1).html("<svg class='t-icon t-icon-spin'><use xlink:href='#t-icon-autorenew'></use></svg> " + (text || 'Loading...'));
    return this;
};
loadingbar.prototype.showError = function (text) {
    var ps = $.promise(), ths = this;
    setTimeout(function () {
        ths.close();
        ps.resolve();
    }, 2000);
    this.dom.children(1).html("<svg class='t-icon'><use xlink:href='#t-icon-error'></use></svg> " + (text || '操作错误'));
    return ps;
};
loadingbar.prototype.showSuccess = function (text) {
    var ps = $.promise(), ths = this;
    setTimeout(function () {
        ths.close();
        ps.resolve();
    }, 2000);
    this.dom.children(1).html("<svg class='t-icon'><use xlink:href='#t-icon-check_circle'></use></svg>> " + (text || '操作成功'));
    return ps;
};
loadingbar.prototype.close = function () {
    this.dom.remove();
};