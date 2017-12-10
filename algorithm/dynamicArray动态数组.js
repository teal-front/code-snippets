var dynamicArray = {
    array: [1, 3, 5, 6, 8, 10, 11],
    tick: function () {
        var i = 0;
        for (; i < this.array.length; i++) {
            console.log(this.array, this.array[i]);
            if (!this.timer()) {
                this.array.splice(i--, 1);
            } else {
                this.array.splice(i, 1, true);
            }
        }
    },
    timer: function () {//50% percent
        return 0 === Math.floor(Math.random() / .5);
    }
};

dynamicArray.tick();