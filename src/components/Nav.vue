<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item to="/home">
                    <v-list-item-action>
                        <v-icon></v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Оболочки</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                app
                clipped-left
                elevation="0"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Математическое моделирование</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        data() {
            return {drawer: null}
        },
        name: "Nav"
    }
</script>

<style scoped>

</style>