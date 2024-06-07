<!-- <template>
    <div id="app">
        <div class="input-container">
            <input v-model="inputValue"
                :class="{ 'is-invalid': inputValue.length < 5 && inputValue !== '', 'is-valid': inputValue.length >= 5, 'is-ultravalid': inputValue.length > 10 }"
                @input="validateInput" />
            <p v-if="inputValue === ''" class="error-message">This field is required.</p>
        </div>

        <div>
            <span>Multiline message is:</span>
            <p style="white-space: pre-line;">{{ message }}</p>
            <br>
            <textarea v-model="message" placeholder="add multiple lines"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputValue: '',
            message: ''
        };
    },
    methods: {
        validateInput() {
            // This method can be used to perform additional validation if needed
        }
    }
}
</script>

<style>
.input-container {
    margin: 20px;
}

input {
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 4px;
    outline: none;
}

input.is-invalid {
    border-color: red;
}

input.is-valid {
    border-color: green;
}

input.is-ultravalid {
    border-color: black;
}

.error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
}
</style> -->




<template>
    <div>
        <input type="file" @change="onFileChange" :value="selectedFile" />
        <div v-if="error" class="error">{{ error }}</div>
        <div v-else-if="selectedFile">
            <p>File selected: {{ selectedFile.name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedFile: null,
            error: null,
        };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            this.error = null;

            if (file) {
                if (file.size > 400 * 1024) { // 400KB in bytes
                    this.error = "File not accepted. The file size exceeds 400KB.";
                    this.selectedFile = null;
                } else {
                    this.selectedFile = file;
                }
            }
        },
    },
};
</script>

<style>
.error {
    color: red;
}
</style>