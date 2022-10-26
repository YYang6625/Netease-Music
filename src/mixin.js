// 复用的方法以及数据
export const mixinFuc = {
    methods: {
        changePlayCount(num) {
            if (num > 100000000) {
                return (num / 100000000).toFixed(1) + "亿"; //取小数后一位
            } else if (num > 10000) {
                return (num / 10000).toFixed(1) + "万"; //取小数后一位
            }
        },
    }
}   