<template>
  <div>
    Nuxt module playground!
    dasdasdasd
    <p v-for="(page, index) in pages" :key="index">
      {{ page }}
    </p>
  </div>
</template>

<script setup>
const user = {
  name: "Sheryl",
  given_name: "Sheryl",
  email: "benshez@gmail.com",
  picture: "",
  email_verified: true,
  sub: "benshez@gmail.com",
}

const database = await useFirebaseDatabase(user)

const pages = await useFirebaseQuery(database)

</script>
