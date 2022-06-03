function getTemplate(state){
    return `
        <div class="slider__before" style="width: ${state.width}px; background-image:url(${state.before})">
            <div class="slider__resize" data-type="resize"></div>
        </div>
        <div class="slider__after" style="background-image:url(${state.after})"></div>
    `
}

class Slider {
    constructor(selector , state){
        this.$slider = document.getElementById(selector)
        this.state = {
            ...state,
            width: state.width || 512
        }
        this.#render(this.state)
        this.#listen()
    }

    #render(state){
        this.$slider.innerHTML = getTemplate(state)
    }
    #update(props){
        this.state = {
            ...this.state,
            ...props
        }
        this.#render(this.state)
    }
    #listen(){
        this.mouseDownHandler = this.mouseDownHandler.bind(this)
        this.mouseUpHandler = this.mouseUpHandler.bind(this)
        this.moveHandler = this.moveHandler.bind(this)
        this.$slider.addEventListener('mousedown',this.mouseDownHandler)
        this.$slider.addEventListener('mouseup',this.mouseUpHandler)
    }

    mouseDownHandler(event){
        if(event.target.dataset.type === 'resize'){
            this.$slider.addEventListener('mousemove', this.moveHandler)
            this.currentClientX = event.clientX
        }
    }
    mouseUpHandler(event){
        this.$slider.removeEventListener('mousemove', this.moveHandler)
        
    }
    moveHandler(event){
        let NewClientX = this.currentClientX - event.clientX
        this.#update({width:this.state.width - NewClientX})
        this.currentClientX = event.clientX
    }
}

const slider = new Slider('slider',{
    after: './assets/after.jpg',
    before: './assets/before.jpg'
})