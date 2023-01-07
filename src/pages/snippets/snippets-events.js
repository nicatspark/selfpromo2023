/**
 * Event handling helper, always bind and unbind correctly.
 * The type/listener/options need to be exact the same to be 
 * able to unbind. The listener needs to be the same by reference.
 * An anonymous function will therefor never unbind. This wrapper 
 * fixes that.
 */
export default function bind(target, {type, listener, options}){
    target.addEventlistener(type, listener, options)
    return function unbind(){
        target.removeEventlistener(type, listener, option)
    }
}