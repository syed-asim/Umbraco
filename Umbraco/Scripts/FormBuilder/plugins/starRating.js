/**
 * Star rating class - show 5 stars with the ability to select a rating
 */

// configure the class for runtime loading
if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Star rating class
     */
    class controlStarRating extends controlClass {

        /**
         * Class configuration - return the icons & label related to this control
         * @returndefinition object
         */
        static get definition() {
            return {
                icon: '★',
                i18n: {
                    default: 'Star Rating'
                }
            };
        }

        /**
         * javascript & css to load
         */
        configure() {
            this.js = '//cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.js';
            this.css = '//cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.css';
        }

        /**
         * build a text DOM element, supporting other jquery text form-control's
         * @return {Object} DOM Element to be injected into the form.
         */
        build() {
            return this.markup('span', null, { id: this.config.name });
        }

        /**
         * onRender callback
         */
        onRender() {
            const value = this.config.value || 3;
            
            $('#' + this.config.name).rateYo({
                rating: value,
                numStars: this.config.noStars || 5,
                fullStar: true,
                multiColor: {
                    "startColor": "#FF0000", //RED
                    "endColor": "#00FF00"  //GREEN
                },
                starWidth: (this.config.size || 40 ) + 'px',
                //starSvg: ``
            });
        }
    }

    // register this control for the following types & text subtypes
    controlClass.register('starRating', controlStarRating);
    return controlStarRating;
});
