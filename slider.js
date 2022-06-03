function getTemplate(state){
    return `
        <div class="slider__before">
            <div class="slider__resize" data-type="resize"></div>
        </div>
        <div class="slider__after"></div>
    `
}

class Slider {
    constructor(selector , state){
        this.$slider = document.getElementById(selector)
        this.state = state
        this.#render(this.state)
        this.#listen()
    }

    #render(state){
        this.$slider.innerHTML = getTemplate(state)
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
            console.log('down');
        }
    }
    mouseUpHandler(event){
        this.$slider.removeEventListener('mousemove', this.moveHandler)
        console.log('up');
        
    }
    moveHandler(event){
        
    }
}

const slider = new Slider('slider',{})