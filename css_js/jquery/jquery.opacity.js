/*
 * Opacity function for jQuery
 *
 * @name   .opacity
 * @cat    Plugins/Effects
 * @author Woody Gilk/woody.gilk@gmail.com
 *
 * @example $(this).opacity(.2);
 */


$.fn.opacity = function(amount) {
        if (amount > 1) amount = 1;
        if (amount < 0) amount = 0;
        if ($.browser.msie) {
                amount = (parseFloat(amount) * 100);
                this.css('filter', 'alpha(opacity='+amount+')');
        } else {
                this.css('opacity', amount);
                this.css('-moz-opacity', amount);
        }
        return this;
}