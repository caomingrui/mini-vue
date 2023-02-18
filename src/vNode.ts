

const createBaseVNode = <T = any>(type, props, children) => {
    const VNode = {
        type,
        props,
        key: props?.key,
        ref: props?.ref,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        dynamicChildren: null,
        appContext: null,
    }
    return VNode;
}

export default createBaseVNode;
