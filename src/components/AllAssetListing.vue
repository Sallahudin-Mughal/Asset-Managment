<template>
  <div>
    <div>
      <!-- header section includes Title search bar and filter dropdowm 
          and button component for add items -->
      <div class="header">
        <h1 style="color: lightcoral;">Asset Management</h1>
        <input v-model="searchQuery" placeholder="Search assets" class="search-input" />

        <div class="drop-down">
          <h2 style="color: lightcoral;">Sort</h2>
          <select v-model.trim="sortKey" @change="sortAssets" class="Sort-down">
            <option disabled value="--Sort by--">--Sort by--</option>
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



      <div class="displayAssets">
        <AssetCard :asset="asset" v-for="asset in filterAsset" :key="asset.id" @delete-Asset="deleteAsset" />
        <div v-if="filterAsset.length === 0" class="not-found">Not Found</div>
      </div>

    </div>
    < </div>
</template>


<script>
import ButtonComponent from './ButtonComponent.vue';

import AssetCard from './AssetCard.vue';
import { LocalStorageMixin } from '../mixins/LocalStorageMixin.js'
export default {
  name: 'AllAssetListing',
  mixins: [LocalStorageMixin],
  components: {
    AssetCard,
    ButtonComponent,
  },
  data() {
    return {
      searchQuery: '',
      sortKey: '-- Sort Key--',
      filterAsset: '',
      Assets: []
    }
  },
  watch: {
    /**
     * the method searchAssets search by name and type
     * 
     * @params none
     * @return search result 
     * 
     */
    searchQuery(value) {
      if (value) {
        const query = this.searchQuery.toLowerCase();
        this.filterAsset = this.Assets.filter(Asset => Asset.name.toLowerCase().includes(query) || Asset.Type.toLowerCase().includes(query));
      }
      else {
        this.filterAsset = this.Assets
      }
    },
  },

  methods: {
    /**
     * this mehtod redirect to form add item

     * @param none
     * @return none
     * 
     */
    addNewItem() {
      this.$router.push('/add')
      // this.$router.push('/input')
    },




    /**
     * the method getAllAssets get all asset from localStorage  
     * 
     * @param none
     * @return Array of objects
     * 
     */
    getAllAssets() {
      const Assets = this.getItemFromLocalStorage('assetRecorde');
      if (Assets) {
        this.Assets = Assets;
        this.filterAsset = Assets;
      }
    },





    /**
     * the method searchAssets search by name and type
     * 
     * @params none
     * @return search result 
     * 
     */
    // searchAssets() {
    //   const query = this.searchQuery.toLowerCase().trim();

    //   this.filterAsset = this.Assets.filter(Asset => Asset.name.toLowerCase().trim(' ').includes(query) || Asset.Type.toLowerCase().includes(query));
    // },





    /**
     * this method is filter of localStorage Array
     * and set updated array in localstorage 
     * 
     * @param id 
     * @return Array of Objects
     * 
     */
    deleteAsset(id) {
      if (confirm('Are you Sure!')) {
        this.filterAsset = this.Assets.filter((Asset) => Asset.id !== id)
        this.setItemInLocalStorage('assetRecorde', this.filterAsset)
      }
    },




    /**
     * this method sortAssest by all keys accept image 
     * by ascending  order
     * 
     * @param none
     * @return sorted Array
     * 
     */

    sortAssets() {
      const key = this.sortKey;
      this.filterAsset.sort((a, b) => {
        let aValue = a[key].toLowerCase()
        let bValue = b[key].toLowerCase()
        if (aValue > bValue) {
          return 1
        }
        else {
          return -1
        }
        // return 0;
      });
    },
  },



  /**
   * all data mounted with actual DOM
   * 
   * @param none
   * @return 
   * 
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

.displayAssets {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px 100px;

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

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  width: 100%;
  height: 300px;
  color: rgb(141, 140, 140);
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>
