<template>
    <div>
        <v-text-field
                label="N" v-model="n"
        ></v-text-field>
        <v-btn @click="model">Запустить</v-btn>
        <div>{{json}}</div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Home",
        data() {
            return {
                n: 1,
                tableRows: 50,
                json: [],
                headers: [],
                loading: true,
            }
        },
        methods: {
            model(){
                axios.post('http://192.168.0.100:9090/modeling/start', {n: this.n});
                this.getOutput();
            },
            getOutput() {
                axios
                    .get('http://192.168.0.100:9090/modeling/output')
                    .then(response => {
                        var data = response.data;
                        this.json = data;
                        while(axios.get('http://192.168.0.100:9090/modeling/status') === true)
                        {
                            this.getOutput();
                        }
                    }).catch(error => {
                    if (error.response.status === 500) {
                        this.getOutput();
                    }
                });
            }
        },
        created() {
            this.getOutput();
        }
    }
</script>

<style scoped>

</style>