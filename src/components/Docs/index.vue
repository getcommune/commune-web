<script setup lang="ts">
import { ref } from 'vue';
// import Toggle from '../Toggle/index.vue';
// import DelayedToggle from '../DelayedToggle/index.vue';
import Group from '../Group/index.vue';
// import Hover from '../Hover/index.vue';
// import Focus from '../Focus/index.vue';
// import LongPress from '../LongPress/index.vue';
import Click from '../Click/index.vue';
// import Collapsible from '../Collapsible/index.vue';
import Intersection from '../Intersection/index.vue';
import Img from '../Img/index.vue';
import Switch from '../Switch/index.vue';
import Overlay from '../Overlay/index.vue';
import Sheet from '../Sheet/index.vue';
// import Toast from '../Toast/index.vue';
import Radio from '../Radio/index.vue';
import Checkbox from '../Checkbox/index.vue';
import RadioGroup from '../RadioGroup/index.vue';
import CheckboxGroup from '../CheckboxGroup/index.vue';
import Position from '../Position/index.vue';
import Tab from '../Tab/index.vue';
// import EditableText from '../EditableText/index.vue';
// import Countdown_ from "./utils/countdown"

// window.Countdown = Countdown_

const toggled = ref(false)
const delayedToggle = ref(false)
const group = ref([])
const focus = ref(false)
const hover = ref(false)

const position = ref('bottom' as Placement)

const popperId = ref('id1')
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { Placement } from '@popperjs/core';

export default defineComponent({
  name: "app",
  directives: {
  }
})
</script>


<template>
  <div>
    <!-- <Toggle tag="section" #default="{ toggle }" v-model="toggled">
      <div @click="toggle">
        {{ toggled || 'false' }}
      </div>
    </Toggle> -->

    <!-- <DelayedToggle v-model="delayedToggle" #default="{ on, off, toggle, waiting }" delay="2000">
      <div class="box" @mouseenter="on" @mouseleave="off" @click="toggle">
        {{ delayedToggle }}
      </div>

      <div>
        wait: {{ waiting }}
      </div>

      <div>
        {{ delayedToggle }}
      </div>
    </DelayedToggle> -->

    <Group v-model="group" #default="{ add, isActive, remove }" allow-repeated multiple>
      <div>
        {{ group }}
      </div>

      <button v-for="i in 5" :key="i" @click="add({ foo: i })" style="background-color: blue;">
        {{ isActive({ foo: i }) }}
      </button>

      <button v-for="i in 5" :key="i" @click="remove({ foo: i })" style="background-color: red;">
        {{ isActive({ foo: i }) }}
      </button>
    </Group>

    <!-- <Hover v-model="hover" #default="{ events }">
      <div class="box" v-on="events">
        Hover me
      </div>

      <div>
        {{ hover }}
      </div>
    </Hover> -->

    <!-- <Focus v-model="focus">
      <div tabindex="0">
        {{ focus }}
      </div>
    </Focus> -->

    <!-- <LongPress #default="{ active, willChange, events }">
      <div class="box" v-on="events">
        Longpress
      </div>

      <div>
        active: {{ active }}
        will-change: {{ willChange }}
      </div>
    </LongPress> -->

    <Click #default="{ active }" :range="200">
      <div class="box">
        Click:
        {{ active }}
      </div>
    </Click>

    <Group #default="{ isActive, toggle }">
      <template v-for="i in 3" :key="i">
        <button @click="toggle(i)">
          Collapse {{ isActive(i) }}
        </button>


        <!-- <Collapsible :open="isActive(i)">
          <div class="box" @click="toggle(i)">
            {{ i }}

            <div v-for="ii in 2 * i">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque quae placeat quos tenetur voluptatibus
              obcaecati consequatur qui eaque, veritatis reiciendis, impedit consectetur laboriosam id, quis molestias
              nesciunt ipsa deleniti rerum!
            </div>
          </div>
        </Collapsible> -->
      </template>
    </Group>
  </div>

  <Intersection #default="{ isIntersecting, ratio }" :threshold-length="300">
    <div style="height: 500px;margin-top: 500px;margin-bottom: 500px;" class="box">
      {{ ratio }}

      <div class="box" :style="{ opacity: ratio }">
        HELLO
      </div>
    </div>
  </Intersection>

  <Img load-effect="fade" height="200" src="https://picsum.photos/500/500" alt="Hello">
  <template #prepend="{ loading, loaded, error, refresh }">
    <div style="margin-top: 100px" @click="refresh">
      loading: {{ loading }}
      loaded: {{ loaded }}
      error: {{ error }}
    </div>
  </template>
  </Img>

  <div>
    <Switch track-class="tracks" thumb-class="thumb">
      <template #prepend="{ id }">
        <label :for="id">
          Toggle
        </label>
      </template>
    </Switch>
  </div>


  <Overlay closeOnClickOutside z-index-offset="10" always-render custom-transition>
    <template #trigger="{ active, toggle, attrs }">
      <button v-bind="attrs" @click.stop="toggle">
        Overlay: {{ active }}
      </button>
    </template>

    <template #default="{ close, transitionEvents, active }">
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;">
        <UiTransition appear>
          <div v-if="active" @click="close"
            style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgb(0,0,0,0.5)"></div>
        </UiTransition>

        <UiTransition appear v-on="transitionEvents" :config="['slideY', 'fade']">
          <div v-if="active" tabindex="0" style="position:relative;background-color: aliceblue;">
            <div>
              Hello world
            </div>

            <div>
              Hii
            </div>

            <Overlay closeOnClickOutside>
              <template #trigger="inner">
                <button  @click.stop="inner.toggle">
                  foo
                </button>
              </template>

              <div>
                Hello world
              </div>
            </Overlay>
          </div>
        </UiTransition>
      </div>
    </template>
  </Overlay>

  <Sheet from="left" snap-mandatory close-on-click>
    <template #trigger="{ active, toggle, attrs }">
      <button v-bind="attrs" @click="toggle">
        Sheet {{ active }}
      </button>
    </template>

    <template #prepend="{ ratio, active, }">
      <UiTransition :config="{ enter: 'fade', leave: `fade(0, ${ratio})` }">
        <div v-if="active" style="background-color: rgb(0,0,0,0.6); inset:0; position:fixed; pointer-events: none;"
          :style="{ opacity: ratio }">
        </div>
      </UiTransition>
    </template>

    <template #default="{ transitionEvents, active }">
      <UiTransition v-on="transitionEvents" :config="['slideX(100)', 'fade']" spring="gentle">
        <div v-if="active" style="background: white; height:calc(100% - 32px);width:400px; border-radius: 8px; margin:16px 16px 0 0;" @click.stop>
          <div style="padding:20px">
            Hello world
          </div>
        </div>
      </UiTransition>
    </template>
  </Sheet>

  <!-- <Toast duration="15s">
    <template #trigger="{ active, toggle }">
      <button @click="toggle">
        Toast: {{ active }}
      </button>
    </template>

    <template #default="{ hover, countdown }">
      <div>
        TOAST! {{ hover }} {{ countdown }}

        <div style="background:red;width:100vw;height:2px; margin: 1rem 0;transform-origin: left;" :style="{
          transform: `scale3d(${Math.abs(countdown.value - 1)},1,1)`
        }"></div>
      </div>
    </template>
  </Toast> -->

  <!-- <Countdown duration="1s" #default="{ value, start, pause, stop, restart, touched, step }">
    <div>
      {{ touched ? step(0, 100).toFixed(0) : 0 }}
    </div>

    <button @click="start">
      start
    </button>

    <button @click="pause">
      pause
    </button>

    <button @click="stop">
      stop
    </button>

    <button @click="restart">
      restart
    </button>
  </Countdown> -->

  <div style="display:flex; margin: 3rem 0">
    <Radio>
      <template #prepend="{ id, active }">
        <label :for="id">
          Radio label {{ active }}
        </label>
      </template>

      <template #default="{ active }">
        <div style="height:16px;width:16px;border-radius:16px;background:red;transition: .4s;"
          :style="{ transform: `scale3d(${active ? 1 : 0}, ${active ? 1 : 0}, 1)` }"></div>
      </template>
    </Radio>

    <Checkbox>
      <template #append="{ id, active }">
        <label :for="id">
          Checkbox label {{ active }}
        </label>
      </template>

      <template #default="{ active }">
        <div style="height:16px;width:16px;border-radius:16px;background:red;transition: .4s;"
          :style="{ transform: `scale3d(${active ? 1 : 0}, ${active ? 1 : 0}, 1)` }"></div>
      </template>
    </Checkbox>

    <RadioGroup :option="[1, 2, 3]" #default="{ items }" :initial="1">
      <Radio v-for="{ attrs, item } in items" :key="item" v-bind="attrs">
        <template #prepend="{ id, active }">
          <label :for="id">
            Radio label {{ active }} {{ item }}
          </label>
        </template>

        <template #default="{ active }">
          <div style="height:16px;width:16px;border-radius:16px;background:red;transition: .4s;"
            :style="{ transform: `scale3d(${active ? 1 : 0}, ${active ? 1 : 0}, 1)` }"></div>
        </template>
      </Radio>
    </RadioGroup>

    <CheckboxGroup :option="[1, 2, 3]" #default="{ items, intermediate, selectAll, reset, allChecked }" :initial="1">
      <button @click="allChecked ? reset() : selectAll()">
        {{ allChecked ? 'Clear' : 'Select all' }}
      </button>

      <Checkbox v-for="{ attrs, item } in items" :key="item" v-bind="attrs">
        <template #prepend="{ id, active }">
          <label :for="id">
            Checkbox label {{ active }} {{ item }}
          </label>
        </template>

        <template #default="{ active }">
          <div style="height:16px;width:16px;border-radius:16px;background:red;transition: .4s;"
            :style="{ transform: `scale3d(${active ? 1 : 0}, ${active ? 1 : 0}, 1)` }"></div>
        </template>
      </Checkbox>
    </CheckboxGroup>
  </div>

  <button id="id1">
    Hello popper
  </button>

  <button id="id2">
    Hello popper
  </button>

  {{ position }}

  <input v-model.lazy="position">

  <input v-model.lazy="popperId">

  <div style="margin: 4rem 0">
    <Position :trigger="`#${popperId}`" :placement="position" :offset="[0, 10]" flip>
      <template #trigger="{ ref, toggle, setPosition }">
        <button @click.prevent="toggle" @mouseenter="setPosition">
          Hello popper trigger
        </button>
      </template>

      <template #default="{ transitionEvents, contentAttrs, active, ref, arrowAttrs }">
        <UiTransition v-on="transitionEvents" :config="[`scale(0.75)`, 'fade']" :spring="{
          enter: 'wobbly', leave: 'default'
        }">
          <div v-if="active" :ref="ref" style="position:relative; background-color: black;color: white;">
            Positioned!

            <div v-bind="arrowAttrs" style="--size: 8px; background: #000"></div>
          </div>
        </UiTransition>
      </template>
    </Position>
  </div>

  <div style="margin: 4rem 0">
    <Tab :option="[{ title: 'Hello' }, { title: 'Adele' }, { title: 'Biggie' }]" vertical loop>
      <template #default="{ items, select }">
        <div v-for="{ item, attrs, active } in items" :key="item.title" v-bind="attrs" @click="select(item)">
          {{ item.title }}:{{ active }}
        </div>
      </template>

      <template #content="{ items }">
        <UiTransition :config="['slideX(-5)', 'fade']" :spring="{ enter: 'wobbly' }">
          <template v-for="{ item, active, attrs } in items" :key="item.title">
            <p v-if="active" v-bind="attrs">
            <p><strong>{{ item.title }}</strong></p>

            <br>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non architecto reiciendis quaerat sunt nihil
            dolorum, doloribus quasi laboriosam eos sit saepe culpa voluptas dolores itaque distinctio, nam perspiciatis
            unde necessitatibus.
            </p>
          </template>
        </UiTransition>
      </template>
    </Tab>
  </div>

  <!-- <EditableText value='Hello world' /> -->
</template>
