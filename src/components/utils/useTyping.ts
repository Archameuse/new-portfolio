import { ref, onMounted, onUnmounted } from "vue"
import type { Ref } from "vue"

type textType = {
    text: string,
    callback?: () => void
}

export default (target:Ref<HTMLElement|undefined>, text:textType[], delay:{base?:number,window?:number,start?:number,between?:number,repeats?:number, delayRepeats?:number}={base:30,window:120,start:0,between:50,repeats:1,delayRepeats: 0}, type:'click'|'mount'='mount') => {
    const timeout = ref<number>()
    const initialtext = ref<string>('')
    if(timeout.value) clearTimeout(timeout.value)
    if(type==='mount') {
        onMounted(async () => {
            if(!target.value) return
            // target.value.innerText = ''
            if(delay.start) {
                await new Promise(resolve => timeout.value=setTimeout(resolve, delay.start))
                timeout.value = undefined
            }
            initialtext.value = target.value.innerText
            if(!delay.repeats) delay.repeats = 1
            for(let i = 0; (i < delay.repeats) || delay.repeats <= 0; i++) {
                for(const obj of text) {
                    const str = obj.text
                    const func = obj.callback
                    // deleting characters untill strings are equal
                    let i = str.length
                    let j = initialtext.value.length
                    while(str.substring(0,i)!==initialtext.value.substring(0,j)) {
                        if(i>j) {
                            // if passed text is longer than initial text
                            // "remove" 1 character from end of it and try again
                            i--
                        } else if(j>i) {
                            // if passed text is smaller then initial text
                            // actually remove 1 character from end of it
                            // and await for some time before continue to make delay
                            await new Promise(resolve => timeout.value=setTimeout(resolve, calcTime()))
                            j--
                            target.value.innerText = initialtext.value.substring(0,j)
                        } else {
                            // or if substring still not equal but both are equal in length
                            // then decrease both and remove 1 char from end of text
                            await new Promise(resolve => timeout.value=setTimeout(resolve, calcTime()))
                            i--
                            j--
                            target.value.innerText = initialtext.value.substring(0,j)
                        }
                    }
                    i = Math.max(i,0)
                    j = Math.max(j,0)
                    //test j=4
                    //teardrop i=8
                    //j=4 i=7 (teardro); j=4 i=6 (teardr); j=4 i=5 (teard);
                    //j=4 i=4 (tear); j=3 (tes) i=3(tea); j=2(te) i=2(te)++++

                    for(;i<=str.length;i++) {
                        await new Promise(resolve => timeout.value=setTimeout(resolve, calcTime()))
                        target.value.innerText = str.substring(0,i)
                    }
                    initialtext.value = target.value.innerText
                    if(func) func()
                    if(delay.between) {
                        await new Promise(resolve => timeout.value = setTimeout(resolve, delay.between))
                    }
                    // for(let char of str) {
                    //     await new Promise(resolve => {
                    //         timeout.value = setTimeout(resolve, Math.floor(Math.random() * (delay.base??0) + (delay.window??0)))
                    //     })
                    //     target.value.innerText+=char
                    // }
                }
                // here delay delayrepeats
                if(delay.delayRepeats) await new Promise(resolve => setTimeout(resolve, delay.delayRepeats))
            }
        })
        onUnmounted(() => {
            if(timeout.value) clearTimeout(timeout.value)
            timeout.value = undefined
        })
    }
    function calcTime() {
        return Math.floor(Math.random() * (delay.base??0) + (delay.window??0))
    }
    return
}
