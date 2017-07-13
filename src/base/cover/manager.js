const getModal = function () {
   let modalDom=null;
  // if (manager.hasModal === false) {
  //   manager.hasModal = true;
    modalDom = document.createElement('div');
    manager.modalDom = modalDom;
    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault();
      event.stopPropagation();
    });
    modalDom.style = "position:fixed;height: 100%; width: 100%;top: 0;left: 0;background: rgba(0,0,0,0.4);opcity:0.4"
    modalDom.addEventListener('click', function () {
      manager.modelClick && manager.modelClick();
    });
  // }
  return modalDom;
};

let instances = {};
let manager = {
  hasModal: false,
  zIndex: 2000,
  modalStack: [],
  getInstance: function (id) {
    return instances[id];
  },
  register: function (id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister: function (id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex: function () {
    return manager.zIndex++;
  },
  open: function (id, zIndex,dom) {
    if (!id || zIndex === undefined){return;};
    if (this.modalStack.findIndex((item,i) => {
        return item.id == id;
      }) > -1) {
      return;
    }
    let modalDom = getModal();
    if (dom && dom.parentNode && dom.parentNode.nodeType!== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.querySelector('body').appendChild(modalDom);
    }
    modalDom.style.zIndex = zIndex;
    modalDom.style.display = '';
    this.modalStack.push({id:id,zIndex: zIndex,modalDom:modalDom});
  },
  close: function (id) {
       const modalStack = this.modalStack;
      const index = modalStack.findIndex((item,i)=>{
         return id==item.id;
      });
      if(index>-1){
        let modalDom= modalStack[index];
        modalDom.modalDom.parentNode.removeChild(modalDom.modalDom);
        modalStack.splice(index,1);
      }
  },
  modelClick(){
    const item = manager.modalStack[manager.modalStack.length - 1];
    if (!item) return;
    const instance = manager.getInstance(item.id);
    if (instance && instance.modelClick) {
      instance._close();
    }
  }
};
export default manager;
