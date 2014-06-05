define('module/home/index', ['backbone'], function(reuqire) {
    var Backbone = reuqire('backbone');
    App.Models.Home = Backbone.Model.extend({});

    App.Collections.Home = Backbone.Collection.extend({
        model: App.Models.Home
    });

    App.Views.Home = Backbone.View.extend({
        el: '#container',
        initialize: function(c) {
            this.Collections = c;
            this.render();
        },
        render: function() {
            var html = '';
            this.Collections.each(function(m) {
                html += '<div><a href="' + m.get('link') + '">' + m.get('name') + '</a></div>';
            });
            this.$el.html(html);
        }
    })

    return function() {
        //ģ������
        var hc = new App.Collections.Home();
        hc.add([
            {'name': '����ģ��A', 'link': '#at/m/a/name:moduleA/other:nothing'},
            {'name': '����ģ��B', 'link': '#at/m/b'}
        ]);
        new App.Views.Home(hc);
    }
});