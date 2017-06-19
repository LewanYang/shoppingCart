/**
 * Created by benz on 2017/6/18.
 */
Vue.filter("money", function (value, type) {
    return "￥" + value.toFixed(2) + type;
})

var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curProduct: ''
    },
    filters: {
        formatMoney: function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods: {
        //读取数据
        cartView: function () {
            var _this = this;
            this.$http.get("data/cartData.json", {"id": 123}).then(function (res) {
                _this.productList = res.data.result.list;
                // _this.totalMoney = res.data.result.totalMoney;
            })
        },
        //购买数量的增加减少
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                //不可以在少了，否者负了
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        //实现单选功能
        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                //如果没有item.checked这个属性，那我们就利用Vue.set(object,key,value)这个方法，设置这个key
                Vue.set(item, 'checked', true);//这是全局方法
                //this.$set(item,'checked',true); 这是局部方法
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        //实现全选或全不选
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    Vue.set(item, 'checked', _this.checkAllFlag);//这是全局方法
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        //实现总金额计算
        calcTotalPrice: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },
        //确定要删除的是哪个商品，找到它的index
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        //删除商品
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
});



