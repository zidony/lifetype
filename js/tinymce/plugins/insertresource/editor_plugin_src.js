/**
 * editor_plugin_src.js
 *
 * Copyright 2010, Lifetype Team, http://www.lifetype.net
 * Released under GPLv2 License.
 */

(function() {
    tinymce.PluginManager.requireLangPack('insertresource');
    tinymce.create('tinymce.plugins.InsertResourcePlugin', {
        init : function(ed, url) {
            var t = this;
                t.ed = ed;
                t.url = url;

            ed.onBeforeSetContent.add(function(ed, o) {
                o.content = t._insertToEditor(t, o.content);
            });

            ed.onPostProcess.add(function(ed, o) {
                if (o.set){
                    o.content = t._insertToEditor(t, o.content);
                }
                if (o.get){
                    o.content = t._getFromEditor(t, o.content);
                }
            });

            ed.addCommand('mceInsertResource', function() {
                ed.windowManager.open({
                    file : url + '../../../../../admin.php?op=resourceList&mode=1', // Relative to theme
                    width : 500,
                    height : 450,
                    inline : 1
                }, {
                    plugin_url : url
                });
            });

            // Register insertresource button
            ed.addButton('insertresource', {
                title : 'insertresource.desc',
                cmd : 'mceInsertResource',
                image : url + '/img/insertresource.gif'
            });

            ed.onInit.add(function() {
                if (ed.settings.content_css !== false)
                    ed.dom.loadCSS(url + "/css/content.css");
            });
        },

        getInfo : function() {
            return {
                longname : 'Insert Resource',
                author : 'LifeType Team',
                authorurl : 'http://www.lifetype.net',
                infourl : 'http://www.lifetype.net',
                version : tinymce.majorVersion + "." + tinymce.minorVersion
            };
        },

        _insertToEditor : function(t,content){
            // Parse all object[class=ltPlayer] tags and replace them with img
            cdom = tinymce.DOM.create('div');
            tinymce.DOM.setHTML(cdom, content);
            elems = tinymce.DOM.select('object[class=ltPlayer]', cdom);

            tinymce.each(elems, function(e) {
                html = e.innerHTML;
                result = html.match(/.*file=([a-zA-Z0-9\-\/:._%]*)/i);
                src = (result ? result[1] : 0);
                if (src) {
                    height = (e.height? e.height : 20);
                    width = (e.width ? e.width : 320);
                    imgHTML = t._getImgPlayerHTML(src, height, width);
                    tinymce.DOM.setOuterHTML(e, imgHTML);
                }
            });

            content = cdom.innerHTML;
            tinymce.DOM.remove(cdom);

            return content;
        },

        _getFromEditor : function(t, content) {
            // Parse all img[class=ltFlashPlayer] tags and replace them with object+embed
            cdom = tinymce.DOM.create('div');
            tinymce.DOM.setHTML(cdom, content);
            elems = tinymce.DOM.select('img[class=ltFlashPlayer]', cdom);

            tinymce.each(elems, function(e) {
                src = e.alt;
                if (src) {
                    height = (e.height? e.height : 20);
                    width = (e.width ? e.width : 320);
                    embedHTML = getFlashPlayerHTML(src, height, width);
                    tinymce.DOM.setOuterHTML(e, embedHTML);
                }
            });

            content = cdom.innerHTML;
            tinymce.DOM.remove(cdom);

            return content;
        },

        _getImgPlayerHTML : function(src, height, width) {
            html = '<img width="' + width + '" height="' + height + '"' +
                   ' src="' + this.url + '/img/spacer.gif' + '" title="' + src + '"' +
                   ' alt="' + src + '" class="ltFlashPlayer" />';

            return html;
        }
    });
    // Register plugin
    tinymce.PluginManager.add('insertresource', tinymce.plugins.InsertResourcePlugin);
})();
