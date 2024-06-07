<template>
  <div>
    <div class="form-container">
      <h1>Add Asset</h1>

      <div class="container">
        <form action="" @submit.prevent="validateForm">

          <div>
            <div>
              <label for="assetImage">Image</label>
            </div>
            <div>
              <input type="file" name="assetImage" placeholder="Add Image" @change="onFileChange" ref="fileInput">
            </div>
          </div>
          <div v-if="errors.assetImage" class="error"> {{ errors.assetImage }}</div>
          <div v-else-if="imageFile">File selected: {{ imageFile.name }}</div>


          <div>
            <div>
              <label for="assetName"><span>* </span>Name</label>
            </div>
            <div>
              <input v-model="assetName" type="text" name="assetName" placeholder="Asset name..">
            </div>
            <div class="error">{{ errors.assetName }} {{ assetName.length }}</div>
          </div>


          <div>
            <div>
              <label for="assetType"><span>* </span>Type</label>
            </div>
            <div>
              <input v-model="assetType" type="text" name="assetType"
                placeholder="e.g. Hardware, Software, Furniture...">
            </div>
          </div>
          <div class="error">{{ errors.assetType }}</div>
          <div>
            <div>
              <label for="status"><span>* </span>Status</label>
            </div>
            <div>
              <select v-model="Status" id="status" name="Status">
                <option disabled value="Active">--Status--</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div class="error">{{ errors.Status }}</div>

          <div>
            <div>
              <label for="description">Description</label>
            </div>
            <div>
              <textarea v-model="description" id="description" name="description" placeholder="Asset description ...."
                style="height:150px"></textarea>
            </div>
          </div>
          <div>
            <div>
              <label for="status">purchase Date</label>
            </div>
            <div>
              <input type="date" v-model="purchaseDate" class="calender" :max="maxDate">
            </div>
          </div>
          <div>
            <input type="submit" value="Submit">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { LocalStorageMixin } from '../mixins/LocalStorageMixin.js'
export default {
  name: 'Addassets',
  mixins: [LocalStorageMixin],
  components: {
  },
  data() {
    return {
      assetName: '',
      assetType: '',
      Status: '',
      description: '',
      purchaseDate: '',

      maxDate: '',

      errors: {
        assetName: '',
        assetType: '',
        Status: '',
        assetImage: ''
      },
      selectedFile: '',
      assetRecorde: [],

    }
  },
  watch: {
    assetName(value) {
      if (value) {
        this.errors.assetName = '';
      }
    },
    assetType(value) {
      if (value) {
        this.errors.assetType = '';
      }
    },
    status(value) {
      if (value) {
        this.errors.Status = '';
      }
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
     * 
     * @params none
     * @return return number, string
     * 
     * this method create id of each record
     */
    getNewId() {
      const assetsInStorage = this.getItemFromLocalStorage("assetRecorde");
      if (assetsInStorage && assetsInStorage.length) {
        const firstPostId = Number(assetsInStorage[0].id);
        return String(firstPostId + 1);

      }
      else {
        return "1";
      }
    },


    /**
     * @param none 
     * @return void 
     * 
     * this method create for new item asset 
     * create an object when new data is coming and pass to updateAsset function
     * if iten added then push back to home page 
     */
    CreateAsset() {
      const asset = {
        id: this.getNewId(),
        name: this.assetName,
        Type: this.assetType,
        Status: this.Status,
        description: this.description,
        purchaseDate: this.purchaseDate,
        image: this.imageFile,
      }

      this.updatAssets(asset)

      alert('Add Asset successfully')
      this.$router.push('/')


    },


    /**
     * 
     * @param asset 
     * @return Array, Objects,String
     * 
     * this function take asset as an input and check localStorage 
     * if the assetRecorde array in localStorage then append new 
     * asset in array if not or array is blank 
     * then unshift new asset in array
     */

    updatAssets(asset) {
      // let localAsset = JSON.parse(localStorage.getItem('assetRecorde'));
      let localAsset = this.getItemFromLocalStorage('assetRecorde');

      if (localAsset && localAsset.length) {
        localAsset.unshift(asset)
        localStorage.setItem('assetRecorde', JSON.stringify(localAsset))
      }
      else {
        localStorage.setItem('assetRecorde', JSON.stringify([asset]))
      }
    },

    /**
     * 
     * @param event 
     * @return image URL
     * 
     * method get image from users device and convert into URL 
     */
    // onFileChange(event) {
    //   const file = event.target.files[0];

    //   if (file) {
    //     if (file.size > 2 * (1024 * 1024)) {
    //       this.errors.assetImage = "file is greater"
    //       this.imageFile = ''
    //     } else {
    //       const reader = new FileReader();
    //       reader.onload = (e) => {
    //         this.imageFile = e.target.result;
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   }


    // },



    onFileChange(event) {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      if (file) {
        if (file.size > 2 * (1024 * 1024)) { // 2MB limit
          this.errors.assetImage = "File size exceeds 2MB";
          // Clear the file input
          fileInput.value = '';
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageFile = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      } else {
        // If no file is selected, ensure the error state is reset
        this.errors.assetImage = '';
        this.imageFile = '';
      }
    },


    /**
     * @param none
     * @return none
     * 
     * this function check validation 
     * if any field is not filled throw an error
     * when all fields are filled then call CreateAsset method
     */
    validateForm() {

      this.resetErrors();

      if (!this.assetName) {
        this.errors.assetName = 'Name is required';
      }
      if (!this.assetType) {
        this.errors.assetType = 'Type is required';
      }
      if (!this.Status) {
        this.errors.Status = 'Status is required';
      }

      if (!this.errors.assetName && !this.errors.assetType && !this.errors.Status) {
        // If no errors, submit the form or proceed with your logic
        this.CreateAsset();
        // alert('Form submitted successfully');
      }
    },
    resetErrors() {
      this.errors = {
        assetName: '',
        assetType: '',
        Status: ''
      };
      // If all checks pass, submit the form
    },
  }
}
</script>

<style scoped>
.form-container {
  width: 600px;
  height: fit-content;
  max-width: 600px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  margin: auto;
  border-radius: 15px;
}

h1 {
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid navy;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Style inputs, select elements and textareas */
input[type=text],
input[type=number],
input[type=date],
input[type=file],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

/* Style the submit button */
input[type=submit] {
  background-color: #04aa44;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin: 20px auto;
  box-sizing: border-box;
  font-weight: 600;
}

/* Style the container */
.container {
  border-radius: 5px;
  padding: 20px;
  height: fit-content;
}

.error {
  color: red;
  font-size: 0.9em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 5px 0 0 10px;
}

span {
  color: red;
}
</style>