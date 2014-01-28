 define([
    'backbone',
    'text!login-page/templates/login.html',
    'underscore',
    'jquery'
], function(Backbone, template, _) {

    return Backbone.View.extend({

        el: 'body',

        template: _.template(template),

        initialize: function(options) {
            _.bindAll(this, 'login');

            this.options = options;

            this.render();
        },

        render: function() {
            var usernameParam = /[&?]username=([^&]+)/.exec(window.location.search);
            var errorParam = /[&?]error=([^&]+)/.exec(window.location.search);

            this.$el.html(this.template({
                error: errorParam && i18n['login.error.' + errorParam[1]],
                strings: this.options.strings,
                url: this.options.url,
                username: usernameParam && decodeURIComponent(usernameParam[1])
            }));

            this.$('input').on('keypress change', function(e) {
                var element = $(e.currentTarget);

                if(element.val()) {
                    element.closest('.control-group').removeClass('error')
                           .closest('form').find('.alert-error').remove();
                }
            });

            this.$('button').on('click', this.login);

            this.$('#username').focus();
        },

        login: function(e) {
            e.preventDefault();

            var element = $(e.currentTarget);
            var valid = true;

            _.each(this.$('input'), function(input) {
                input = $(input);

                if(!input.val()) {
                    input.closest('.control-group').addClass('error');
                    valid = false;
                }
            });

            if(valid) {
                element.closest('form').submit();
            }
        }

    });

});