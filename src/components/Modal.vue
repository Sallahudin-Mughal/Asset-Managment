<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times</span>
            <h2>Edit Asset</h2>
            <form @submit.prevent="saveData">
                <div class="form-group">
                    <div>

                        <label for="Image">Image:</label>
                        <input type="file" name="assetImage" placeholder="Add Image" @change="onFileChange" />
                        <div></div>
                    </div>
                    <img :src="formData.image" alt="" class="edit-image">
                </div>
                <div class="form-group">
                    <label for="name">
                        <span>* </span> Name:
                    </label>
                    <input type="text" v-model="formData.name" id="name" />
                </div>

                <div class="form-group">

                    <label for="type">
                        <span>* </span> Type:
                    </label>
                    <input type="text" v-model="formData.Type" id="type" />
                </div>

                <div class="form-group">

                    <label for="status">
                        <span>* </span> Status:
                    </label>
                    <input type="text" v-model="formData.Status" id="status" />
                </div>

                <div class="form-group">

                    <label for="description">Description:</label>
                    <textarea v-model="formData.description" id="description"></textarea>
                </div>

                <div class="form-group">
                    <label for="purchaseDate">Purchase Date:</label>
                    <input type="date" v-model="formData.purchaseDate" id="purchaseDate" :max="maxDate" />
                </div>


                <button class="Modal-btn" type="submit">Update</button>

            </form>
        </div>
    </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';

export default {
    name: 'Modal',
    components: {
        ButtonComponent,
    },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            formData: this.data,
            maxDate: '',
            // disableFutureDates: true
        };
    },
    watch: {
        data: {
            handler(newData) {
                this.formData = newData;
            },
        },
    },
    created() {
        this.setMaxDate()
    },
    methods: {
        setMaxDate() {
            const today = new Date().toISOString().split('T')[0];
            this.maxDate = today;
        },
        /**
         * @param none
         * @return none
         * 
         * this method emit custom event 'save' and Object formData
         */
        saveData() {
            this.$emit('save', this.formData);
        },

        /**
         * 
         * @param {Object} event
         * 
         * get from when user Enter and check the filesize
         * in Bytes and create the file reader 
         *
         */
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 400 * 1024) {
                    alert("file is greater than 400KB");
                }
                const reader = new FileReader(); // create new object of fileReader
                reader.onload = (e) => {
                    this.formData.image = e.target.result;
                };
                reader.readAsDataURL(file);// convert file to URL
            }
        },
    },
};
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
}

.close {
    float: right;
    font-size: 28px;
    cursor: pointer;
    font-weight: 800;
    color: red;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.edit-image {
    width: 20%;
}

.Modal-btn {
    width: 100%;
    padding: 7px;
    border-radius: 5px;
    background-color: green;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 15px;
}
</style>
