new Vue({
    el: "#cartList",
    data: {
        shopListArr: [],
        isSelectAll: false,
        totalPrice: 0,
    },
    mounted() {
        this.getLocalData();
    },
    filters: {
        moneyFormat(money) {
            return '¥' + parseInt(money).toFixed(2);
        }
    },
    methods: {
        //请求本地数据
        getLocalData() {
            this.$http.get('data/allShops.json').then(response => {
                const res = response.body
                if (res) {
                    this.shopListArr = res.allShops.shopList;
                }
            }, response => {
                alert("请求失败!")
            })
        },
        isSelectAlla(flag) {
            this.isSelectAll = !flag;
            this.shopListArr.forEach(element => {
                if (typeof element.checked === "undefined") {
                    this.$set(element, 'checked', !flag)
                } else {
                    element.checked = !flag;
                }
            });
            this.getAllshopPrice();
        },
        //商品单个数量加减
        ShopReAdd(shop, flag) {
            if (flag) {
                shop.shopNumber += 1;
            } else {
                shop.shopNumber -= 1;
                if (shop.shopNumber <= 1) {
                    shop.shopNumber = 1;
                }
            }
            this.getAllshopPrice();
        },
        getAllshopPrice() {
            let totalPrice = 0;
            this.shopListArr.forEach((shop, index) => {
                if (shop.checked) {
                    totalPrice += shop.shopNumber * shop.shopPrice;
                }
                this.totalPrice = totalPrice;
            });
        },
        singerShopPrice(shop) {
            if (typeof shop.checked === "undefined") {
                this.$set(shop, 'checked', true)
            } else {
                shop.checked = !shop.checked;
            }
            this.getAllshopPrice();
        },
    }
});

function delShop() {
    var r = confirm("确认删除这件商品?");
    if (r == true) {
        //
    } else {
        //
    }
};