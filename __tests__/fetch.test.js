import { describe, vi, beforeEach, it, expect } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import FetchDemo from './src/components/FetchDemo.vue'


describe('Test FetchDemo', () => {
  
  // beforeEach() 所注册的回调会在当前 describe 上下文中的每个测试运行之前被调用一次
  beforeEach(() => {
    // 定义全局方法，使每个 it 都能用到此方法
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ])
    })
  })
  
  it('组件正常渲染', () => {
    const wrapper = mount(FetchDemo)
    
    expect(wrapper.find('h2').text()).toBe('Hello')
    expect(wrapper.findAll('li')).toHaveLength(0)
    expect(wrapper.find('button').text()).toBe('Fetch Data')
  })

  it('fetch 数据 + 渲染列表', async () => {
    const wrapper = mount(FetchDemo)

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data')

    
    await flushPromises()
    
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('li')).toHaveLength(3)
    expect(wrapper.findAll('li')[0].text()).toBe('Item 1')
    expect(wrapper.findAll('li')[1].text()).toBe('Item 2')
    expect(wrapper.findAll('li')[2].text()).toBe('Item 3')
  })

  it('item 点击测试', async () => {
    const wrapper = mount(FetchDemo)

    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')

    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data')
    expect(global.fetch).toHaveBeenCalledTimes(4)


    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()


    await wrapper.findAll('li')[1].trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h2').text()).toBe('Selected item 2')
  })
})
