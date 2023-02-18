import { reactive, watchEffect, watch, computed, render, h } from './src'
/** @jsx h */
const rootDom: HTMLElement | null = document.querySelector('#root');

const data = reactive({
    count: 0,
    arr: [1],
    obj: {
        a: {}
    }
});


(window as any).data = data;


const computed1 = computed(() => {
    console.log('????')
    return data.count + '@';
});


watchEffect(() => {
    console.log('render 1')
    if (!rootDom) return
    rootDom.innerHTML = `
        <p> count当前的值为： ${ data.count }</p>
    `;
});


watchEffect(() => {
    console.log('render 2')
    document.querySelector("#cmr").innerHTML = `
        <p> arr当前的值为： ${ data.arr }</p>
    `;
});


watch(computed1, (newValue, oldValue) => {
    console.log('我是watch', newValue, oldValue, computed1)
    document.querySelector('#watch').innerHTML = `
        新值：${newValue}; 旧值：${oldValue}
    `
});

watch([() => data.count, () => data.arr], (newValue, oldValue) => {
    console.log('我是watch2', newValue, oldValue, computed1)
    document.querySelector('#watch').innerHTML = `
        新值111：${data.count}; 旧值：${data.arr}
    `
});

const Test = (
    <div>
        <p>111</p>
        <p>2222</p>
    </div>
)

console.log(Test)

render({
    template: `
        <div>
        render ---------------
            <p>{{ count }}</p>
            <p>{{ arr }}</p>
            <p>${computed1.value}</p>
        </div> 
    `,
    proxy: data,
}, document.querySelector('#body'));
