<template>
  <div>
    <viewer :images="images">
      //photo 一定要一个数组，否则报错
      <img
          v-for="(src,index) in photo"
          :src="src"
          :key="index"
      >
    </viewer>

    <!-- api -->
    <button type="button" @click="show">Click to show</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ],
      images: [
        "https://picsum.photos/200/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/250/200"
      ]
    }
  },
  methods: {
    show() {
      this.$viewerApi({
        images: this.images,
      })
    },
  },
}
</script>
