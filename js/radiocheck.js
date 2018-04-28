/* ============================================================
 * flatui-radiocheck v0.1.0
 * ============================================================ */

+function (global, $) {
    'use strict';

    var Radiocheck = function (element, options) {
        this.init('radiocheck', element, options);
    };

    Radiocheck.DEFAULTS = {
        checkboxClass: 'custom-checkbox',
        radioClass: 'custom-radio',
        checkboxTemplate: '<i class="icon"></i><i class="icon-to-fade"></i>',
        radioTemplate: '<i class="icon"></i><i class="icon-to-fade"></i>'
    };

    Radiocheck.prototype.init = function (type, element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Radiocheck.DEFAULTS, this.$element.data(), options);
        if (this.$element.attr('type') == 'checkbox') {
            this.$element.addClass(this.options.checkboxClass);
            this.$element.after(this.options.checkboxTemplate);
        } else if (this.$element.attr('type') == 'radio') {
            this.$element.addClass(this.options.radioClass);
            this.$element.after(this.options.radioTemplate);
        }

        var that = this;

        if (this.$element.prop("checked")) {
            this.$element.parent().addClass("checked");
        }

        this.$element.parent().off("radiocheck")
            .on("mouseover.radiocheck", function () {
                if (!$(this).hasClass("checked")) {
                    $(this).addClass("hover");
                }
            }).on("mouseout.radiocheck", function () {
            if (!$(this).hasClass("checked")) {
                $(this).removeClass("hover");
            }
        });

        this.$element.off("click.radiocheck")
            .on("click.radiocheck", function () {
                if (that.$element.attr('type') == 'radio') {
                    that.check();
                }else if(that.$element.attr('type') == 'checkbox'){
                    that.toggle();
                }
            });
    },

        Radiocheck.prototype.check = function () {
            this.$element.prop('checked', true);
            this.$element.parent().addClass("checked").toggleClass("hover",false);
            if (this.$element.attr('type') == 'radio') {
                this.$element.parent().siblings().children("[name='" + this.$element.attr("name") + "']").radiocheck("uncheck");
            }
            this.$element.trigger('change.radiocheck').trigger('checked.radiocheck');
        },

        Radiocheck.prototype.uncheck = function () {
            this.$element.prop('checked', false);
            this.$element.parent().removeClass("checked").toggleClass("hover",false);
            this.$element.trigger('change.radiocheck').trigger('unchecked.radiocheck');
        },

        Radiocheck.prototype.toggle = function () {
            this.$element.trigger('change.radiocheck').trigger('toggled.radiocheck');
            return this.$element.parent().hasClass("checked") ? this.uncheck() : this.check();
        },

        Radiocheck.prototype.indeterminate = function () {
            this.$element.prop('indeterminate', true);
            this.$element.parent().addClass("indeterminate");
            this.$element.trigger('change.radiocheck').trigger('indeterminated.radiocheck');
        },

        Radiocheck.prototype.determinate = function () {
            this.$element.prop('indeterminate', false);
            this.$element.parent().removeClass("indeterminate");
            this.$element.trigger('change.radiocheck').trigger('determinated.radiocheck');
        },

        Radiocheck.prototype.disable = function () {
            this.$element.prop('disabled', true);
            this.$element.parent().addClass("disabled");
            this.$element.trigger('change.radiocheck').trigger('disabled.radiocheck');
        },

        Radiocheck.prototype.enable = function () {
            this.$element.prop('disabled', false);
            this.$element.parent().removeClass("disabled");
            this.$element.trigger('change.radiocheck').trigger('enabled.radiocheck');
        },

        Radiocheck.prototype.destroy = function () {
            this.$element.removeData().removeClass(this.options.checkboxClass + ' ' + this.options.radioClass).next('.icons').remove();
            this.$element.trigger('destroyed.radiocheck');
        };

    // RADIOCHECK PLUGIN DEFINITION
    // ============================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('radiocheck');
            var options = typeof option == 'object' && option;

            if (!data && option == 'destroy') { return; }
            if (!data) {
                $this.data('radiocheck', (data = new Radiocheck(this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }

            // Adding 'nohover' class for mobile devices

            var mobile = /mobile|tablet|phone|ip(ad|od)|android|silk|webos/i.test(global.navigator.userAgent);

            if (mobile === true) {
                $this.parent().hover(function () {
                    $this.addClass('nohover');
                }, function () {
                    $this.removeClass('nohover');
                });
            }
        });
    }

    var old = $.fn.radiocheck;

    $.fn.radiocheck             = Plugin;
    $.fn.radiocheck.Constructor = Radiocheck;

    // RADIOCHECK NO CONFLICT
    // ======================

    $.fn.radiocheck.noConflict = function () {
        $.fn.radiocheck = old;
        return this;
    };

}(this, jQuery);
