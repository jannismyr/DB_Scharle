<template>
  <nav>
    <ul>
        <router-link to="/StartSeite">
            <li><a href="#">Startseite</a></li>
        </router-link>

        <router-link to="/neue_anzeige">
            <li><a href="#">Neue Anzeige</a></li>
        </router-link>

       
    </ul>
</nav>
</template>


<script>
export default {
    name: "NavBar",
    data() {
        return{}
    }
}
</script>