<template>
<p>welcome</p>
</template>

<script>
import { getMenus } from '@/api/power.js'
export default {
  mounted () {
    getMenus().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang="less" scoped>

</style>
