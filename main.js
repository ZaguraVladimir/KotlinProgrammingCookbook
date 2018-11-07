new Vue({
    el: '#chapters',
    data: {
        shownIDs: new Set()
    },
    methods: {
        shown: function (ID) {
            return !this.shownIDs.has(ID);
        },
        showHide: function (event) {
            let ID = event.target.parentElement.id;
            if (this.shownIDs.has(ID)) {
                this.shownIDs.delete(ID)
            } else {
                this.shownIDs.add(ID);
            }
        }
    }
});
