import { reactive, Watcher, watch, computed, render } from './src'

const rootDom = document.querySelector('#root');

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


new Watcher(() => {
    console.log('render 1')
    rootDom.innerHTML = `
        <p> count当前的值为： ${ data.count }</p>
    `;
});


new Watcher(() => {
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
