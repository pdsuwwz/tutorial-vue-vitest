import { nextTick } from 'vue'
import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'

import HelloWorld from './src/components/HelloWorld.vue'

describe('Test Vue components', () => {
  test('Test Vue Running', async () => {
    
    const textMsg = '测试'
    // TODO: 讲解快照的意义，并紧接着介绍 shallowMount
    const instance = shallowMount(HelloWorld, {
      props: {
        msg: textMsg
      }
    })

    expect(instance.html()).toMatchSnapshot()
  
    const refBtn = instance.find({
      ref: 'refBtn'
    })
    
    const isExists = refBtn.exists()
  
    expect(isExists).toBe(true)
    expect(isExists).toBeTruthy()

    await refBtn.trigger('click')

    // await nextTick()

    expect(refBtn.text()).toBe('count is 1')
  
    expect(instance.text()).toContain(textMsg)
  })
})
