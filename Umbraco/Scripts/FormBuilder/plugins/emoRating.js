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
                icon: '&#x2B50;&#x1F60A;&#9829;&#x1F44D;&#x1F60D;',
                i18n: {
                    default: 'Rating'
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
            var emotionsArray = {
                angry: "&#x1F620;",
                disappointed: "&#x1F61E;",
                meh: "&#x1F610;",
                happy: "&#x1F60A;",
                smile: "&#x1F603;",
                wink: "&#x1F609;",
                laughing: "&#x1F606;",
                inlove: "&#x1F60D;",
                heart: "&#9829;",
                crying: "&#x1F622;",
                star: "&#x2B50;",
                poop: "&#x1F4A9;",
                cat: "&#x1F63A;",
                like: "&#x1F44D;",
                dislike: "&#x1F44E;",
                redHeart: "&#9829;"
            };

            var emotionsArray = [];
            var bgEmo = "";
            var bgColor;
            switch (this.config.emojiType) {
                case "Emojis":
                    emotionsArray = ['angry', 'disappointed', 'meh', 'happy', 'inlove'];
                    bgEmo = 'happy';
                    break;
                case "Star":
                    emotionsArray = ['star'];
                    bgEmo = 'star';
                    break;
                case "ThumbsUp":
                    emotionsArray = ['like'];
                    bgEmo = 'like';
                    break;
                case "Hearts":
                    emotionsArray = ['heart'];
                    bgEmo = 'heart';
                    bgColor = 'red';
                    break;
                case "Poop":
                    emotionsArray = ['poop'];
                    bgEmo = 'poop';
                    break;
                case "Excited":
                    emotionsArray = ['laughing'];
                    bgEmo = 'laughing';
                    break;
                default:
                    emotionsArray = ['angry', 'disappointed', 'meh', 'happy', 'inlove'];
                    bgEmo = 'happy';
                    break;

            }
            $("#"+ this.config.name).emotionsRating({
                initialRating: this.config.value || 4,
                emotionSize: this.config.emojiSize || 50,
                emotions: emotionsArray,
                color: bgColor|| 'gold',
                bgEmotion: bgEmo,// 'happy',
                inputName: "rating-" + this.config.name,
            });
        }
    }

    // register this control for the following types & text subtypes
    controlClass.register('emoRating', controlemoRating);
    return controlemoRating;
});
