import errImage from "../assets/1.gif"
import infiniteScroll from 'vue-infinite-scroll'

const defineDirective = (app) => {
    app.directive('lazy', {
        mounted(el, binding){
            const observe = new IntersectionObserver(([{isIntersecting}])=>{
                if (isIntersecting){
                    el.src = binding.value
                    observe.unobserve(el)
                    el.onerror = () => {
                        el.src = errImage
                    }
                }
            })
            observe.observe(el)
        },
        updated(el, binding){
            //console.log("update", binding.value)
            el.src = binding.value
            el.onerror = () => {
                el.src = errImage
            }
        }
    });
    app.directive('infinite-scroll', {
        mounted(el, binding, vnode){
            infiniteScroll.bind(el, binding, vnode)
        },
        updated(el, binding, vnode){
            infiniteScroll.unbind(el)
            infiniteScroll.bind(el, binding, vnode)
        },
        beforeUnmount(el){
            infiniteScroll.unbind(el)
        }
    })
}

export default {
    install(app){
        defineDirective(app)
    }
}