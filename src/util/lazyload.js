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

}

export default {
    install(app){
        defineDirective(app)
    }
}