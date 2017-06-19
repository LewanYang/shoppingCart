/**
 * Created by benz on 2017/6/19.
 */
//new一个vue
new Vue({
    el: '.container',
    data: {
        limitNum: 3,
        addressList: [],
        currentIndex: 0,
        shippingMethod:1
    },
    mounted: function () {
        //一定要用这个，去看api，是个初始化方法
        this.$nextTick(function () {
            this.getAddressList()
        });
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        //获取json数据
        getAddressList: function () {
            var _this = this;
            this.$http.get('data/address.json').then(function (response) {
                var res = response.data;
                if (res.status == '0') {
                    _this.addressList = res.result;
                }
            })
        },
        //加载更多
        loadMore: function () {
            this.limitNum = this.addressList.length;
        },
        //设置默认
        setDefault: function (addressId) {
            this.addressList.forEach(function (item, index) {
                if (item.addressId == addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
        },
        //删除地址
        delAddress: function(item){
            var index= this.addressList.indexOf(item);
            this.addressList.splice(index,1);
        }
    }
})