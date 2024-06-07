<template>
    <div>
        <div class="card">
            <img :src="asset.image" class="card-image">
            <h3>{{ asset.name }}</h3>
            <p>{{ asset.Type }}</p>
            <p>{{ asset.Status }}</p>
            <p>{{ asset.description }}</p>
            <p>{{ asset.purchaseDate }}</p>
            <div class="btns">

                <ButtonComponent buttonWidth="40px" backColor="red" @click="$emit('delete-Asset', asset.id)">
                    <i class="fa-solid fa-trash"></i>
                </ButtonComponent>
                <ButtonComponent buttonWidth="40px" @click="openModal(asset)">
                    <i class="fa-solid fa-pen-to-square"></i>
                </ButtonComponent>
            </div>
        </div>
        <div>
            <Modal :show="isModalVisible" :data="dataToEdit" @save="handleSave" @close="isModalVisible = false"></Modal>
        </div>
    </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
import Modal from './Modal.vue';
import { LocalStorageMixin } from '../mixins/LocalStorageMixin.js'

export default {
    name: 'AssetCard',
    mixins: [LocalStorageMixin],
    components: {
        ButtonComponent,
        Modal,
    },
    props: {
        asset: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isModalVisible: false,
            dataToEdit: {},
        };
    },
    methods: {
        /**
         * 
         * @param asset 
         * @returns boolean 
         * 
         * this method takes assest object then
         * store in dataToEdit
         */
        openModal(asset) {
            this.dataToEdit = asset;
            this.isModalVisible = true;
        },



        /**
         * 
         * @param updatedData 
         * @return Array of objects
         * 
         * this method get data from localStorage
         */
        handleSave(updatedData) {

            let assets = this.getItemFromLocalStorage('assetRecorde');

            // Find the index of the asset to update
            const index = assets.findIndex(asset => asset.id === updatedData.id);

            if (index !== -1) {

                assets[index] = updatedData; // Update the asset

                this.setItemInLocalStorage('assetRecorde', assets); // Save the updated assets array back to localStorage
            }
            this.isModalVisible = false;
        },


        /**
         * 
         * @param id 
         * @return none
         * 
         * emit delete-Asset custom event and id
         */
        onDelete(id) {
            this.$emit('delete-Asset', id);
        },
    },
};
</script>

<style scoped>
.card {
    height: fit-content;
    width: 224px;
    box-shadow: 1px 1px 10px rgba(255, 178, 178, 0.123);
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
    border: 0.5px solid rgba(240, 128, 128, 0.584);
}

.btns {
    display: flex;
    margin: 0 10px;
    justify-content: flex-end;
    align-items: center;
}

.card-image {
    width: 100%;
}
</style>
