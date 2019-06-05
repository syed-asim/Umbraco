/**
 * Star rating class - show 5 stars with the ability to select a rating
 */

// configure the class for runtime loading
if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Star rating class
     */
    class controlemoRating extends controlClass {

        /**
         * Class configuration - return the icons & label related to this control
         * @returndefinition object
         */
        static get definition() {
            return {
                icon: '&#x1F60A;',
                i18n: {
                    default: 'Emoji Rating'
                }
            };
        }

        /**
         * javascript & css to load
         */
        configure() {
            this.js = '/scripts/FormBuilder/plugins/js/emotion-ratings.min.js';
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
            //var emotionsArray = {
            //    angry: "&#x1F620;",
            //    disappointed: "&#x1F61E;",
            //    meh: "&#x1F610;",
            //    happy: "&#x1F60A;",
            //    smile: "&#x1F603;",
            //    wink: "&#x1F609;",
            //    laughing: "&#x1F606;",
            //    inLove: "&#x1F60D;",
            //    heart: "&#x2764;",
            //    crying: "&#x1F622;",
            //    star: "&#x2B50;",
            //};
            const value = this.config.value || 4;
            var emotionsArray = ['angry', 'disappointed', 'meh', 'happy', 'smile'];
            $('#' + this.config.name).emotionsRating({
                initialRating: value,
                emotionSize: 50,
                bgEmotion: 'happy',
                emotions: emotionsArray,
                color: 'gold'
            });
        }
    }

    // register this control for the following types & text subtypes
    controlClass.register('emoRating', controlemoRating);
    return controlemoRating;
});
