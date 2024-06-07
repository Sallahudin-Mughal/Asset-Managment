<template>
    <div>
        <div class="header">
            <h1 style="color: lightcoral;">Asset Management</h1>
            <input v-model="searchQuery" placeholder="Search assets" @input="searchAssets" class="search-input" />

            <div class="drop-down">
                <h2 style="color: lightcoral;">Sort</h2>
                <select v-model="sortKey" @change="sortAssets" class="Sort-down">
                    <option disabled>--Sort by--</option>
                    <option value="name">Name</option>
                    <option value="Type">Type</option>
                    <option value="description">Description</option>
                    <option value="Status">Status</option>
                    <option value="purchaseDate">Purchase Date</option>
                </select>
            </div>

            <ButtonComponent buttonText="Add New Item" @click="addNewItem" backColor="lightcoral">
                <i class="fa-solid fa-plus"></i>
            </ButtonComponent>
        </div>
    </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
import { LocalStorageMixin } from '../mixins/LocalStorageMixin.js';
export default {
    name: 'Header',
    mixins: [LocalStorageMixin],
    components: {
        ButtonComponent,
    },
    data() {
        return {
            searchQuery: '',
            sortKey: '--Sort by--',
            filterAsset: '',
            Assets: [],
        }
    },
    methods: {
        /**
     * @param none
     * @return none
     * 
     * this mehtod redirect to form add item
     */
        addNewItem() {
            // this.$router.push('/add')
            
        },


        /**
     * 
     * @param none
     * @return Array of objects
     * 
     * the method getAllAssets get all asset from localStorage  
     */
        getAllAssets() {
            const Assets = this.getItemFromLocalStorage('assetRecorde');
            if (Assets) {
                this.Assets = Assets;
                this.filterAsset = Assets;
            }
            // console.log(Assets);
        },


        /**
         * 
         * @params none
         * @return search result 
         * 
         * the method searchAssets search by name and type
         */
        searchAssets() {
            const query = this.searchQuery.toLowerCase();
            this.filterAsset = this.Assets.filter(Asset => Asset.name.toLowerCase().includes(query) || Asset.Type.toLowerCase().includes(query));
            // console.log(this.filterAsset);
        },



        /**
     * 
     * @param none
     * @return sorted Array
     * 
     * this method sortAssest by all keys accept image 
     * by ascending  order
     */

        sortAssets() {
            const key = this.sortKey;
            this.filterAsset.sort((a, b) => {
                // console.log(this.filterAsset);

                let aValue = a[key].toLowerCase()
                let bValue = b[key].toLowerCase()
                if (aValue > bValue) {
                    return 1
                }
                else {
                    return -1
                }
            });

        },
    },



    /**
   * 
   * @param none
   * @return 
   * 
   * all data mounted with actual DOM
   */
    mounted() {
        this.getAllAssets()
    }
}
</script>

<style scoped>
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
}



.search-input {
    width: 300px;
    padding: 12px;
    border-radius: 20px;
    outline: none;
    border: 0.5px solid lightcoral;
}

.Sort-down {
    width: 150px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid lightcoral;
}

.drop-down {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 210px;
}
</style>