import manager from './manager'
let idSeed=1;
const getDOM=function(dom){
  if(dom.nodeType===3){
    dom=dom.nextElementSibling||dom.nextSibling;
    getDOM(dom);
  }
  return dom;
};
export default {
  data(){
    return{
      visible:false
    }
  },
  props:{
    value:{
      type:Boolean,
      default:false
    },
    showModel:{
      type:Boolean,
      default:false
    },
    modelClick:{
      type:Boolean,
      default:false
    }
  },
  beforeMount() {
    this._modelid='model-'+idSeed++;
    manager.register(this._modelid,this);
  },
  beforeDestroy(){
    manager.deregister(this._modelid);
    this._close();
  },
  methods:{
    _open(){
      this.visible=true;
      this.$emit('input', true);
      let dom = getDOM(this.$el);
      manager.open(this._modelid,manager.nextZIndex(),dom);
      this.$el.style.zIndex=manager.nextZIndex();
    },
    _close(){
      this.visible=false;
      this.$emit("input",false)
      manager.close(this._modelid);
      this.close&&this.close();
    }
  },
  watch:{
    visible(val){
      this.$emit("input",val)
    },
    value(val){
      if(val){
        if(!this.showModel)return;
        this._open();
      }else{
        this._close();
      }
    }
  }
}
