import { ref } from 'vue'

export default () => {
  const width = ref<number>(0)
  const outer = document.createElement('div')
  const inner = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)
  outer.appendChild(inner)
  width.value = outer.offsetWidth - inner.offsetWidth
  outer.parentNode?.removeChild(outer)
  return width
}
