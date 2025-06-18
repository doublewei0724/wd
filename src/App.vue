<template>
  <div class="relative text-center font-serif">
    <img src="/bg.jpg" alt="背景圖" class="absolute top-0 left-0 w-full h-full object-cover z-0"
      style="object-fit: fill; object-position: top; pointer-events: none;" />

    <div class="relative z-10 mx-auto px-4 py-6">
      <!-- 標題 -->
      <h1 class="text-4xl font-bold text-pink-600 font-popgothicB">我們要結婚了！</h1>
      <p class="mt-4 text-xl text-gray-700 font-popgothic">
        <span class="font-bold text-blue-500">惟誠</span> & <span class="font-bold text-pink-500">羽麗</span>
      </p>
      <p class="text-gray-700 mt-1">誠摯邀請您一同見證我們的幸福時刻</p>

      <!-- 倒數/提示文字 -->
      <div class="my-8 text-xl font-semibold font-popgothicB">
        <div v-if="isWeddingDay">就是今天！快來參加我們的婚禮！</div>
        <div v-else-if="isAfterWedding">新人已結婚囉，感謝大家的祝福！</div>
        <div v-else>
          <div class="flex flex-wrap justify-center items-center gap-2 max-w-full text-center">
            <template v-for="(val, key) in timeParts" :key="key">
              <div
                class="text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl
                      bg-black/30 shadow-lg backdrop-blur-sm">
                {{ String(val).padStart(2, '0') }}
              </div>
              <span class="text-white text-sm">{{ labelMap[key] }}</span>
            </template>
          </div>
        </div>
      </div>

      <!-- 婚禮時間 -->
      <div class="my-6">
        <h2 class="text-lg font-bold text-gray-800">婚禮時間</h2>
        <p class="text-gray-700">2025年10月19日（星期日）中午12:00 入席</p>
      </div>

      <!-- 婚禮地點 -->
      <div class="my-6">
        <h2 class="text-lg font-bold text-gray-800">婚禮地點</h2>
        <p class="text-gray-700">板橋彭園新板館</p>
        <p class="text-gray-700">新北市板橋區中山路一段161號1樓</p>
        <a href="https://www.google.com/maps?q=220%E6%96%B0%E5%8C%97%E5%B8%82%E6%9D%BF%E6%A9%8B%E5%8D%80%E4%B8%AD%E5%B1%B1%E8%B7%AF%E4%B8%80%E6%AE%B5161%E8%99%9F1%E6%A8%93"
          target="_blank" class="inline-block mt-2 text-blue-600 no-underline">
          點我開啟地圖導航
        </a>
      </div>

      <!-- 祝福語 -->
      <div class="my-10 max-w-xl mx-auto">
        <p class="mt-2 text-gray-700 leading-relaxed">
          「我們在這一天啟程，迎向人生全新的篇章，誠摯邀請您來分享這份喜悅，感謝您一直以來的祝福與陪伴。」
        </p>
      </div>

      <!-- 相本區 -->
      <div class="relative mt-10">
        <h2 class="text-xl font-semibold text-gray-800 my-4">婚紗照片</h2>
        <p class="absolute right-[-5%] top-0 text-pink-600 text-sm font-popgothicB -rotate-[8deg] origin-top-left -translate-x-3 -translate-y-2 mt-4">
          點圖片可放大唷！
        </p>
        <div class="grid grid-cols-3 gap-4 relative max-w-xl mx-auto">
          <img v-for="(src, index) in photoList" :key="index" :src="src"
            class="w-full aspect-square object-cover rounded shadow-md cursor-pointer" :class="photoClassList[index]"
            @click="previewImage(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { showImagePreview } from 'vant'

const baseUrl = import.meta.env.BASE_URL;
const now = new Date()
const labelMap = {
  days: '天',
  hours: '時',
  minutes: '分',
  seconds: '秒'
}
const photoList = [
  baseUrl + '/photo1.jpg',
  baseUrl + '/photo3.jpg',
  baseUrl + '/photo2.jpg',
  baseUrl + '/photo4.jpg',
  baseUrl + '/photo6.jpg',
  baseUrl + '/photo5.jpg',
]
const photoClassList = [
  'rotate-[3deg]',
  '-rotate-[4deg] translate-y-1',
  'rotate-[2deg]',
  '-rotate-[5deg] translate-y-[2px]',
  'rotate-[4deg]',
  '-rotate-[3deg] translate-y-[3px]'
]
const weddingDate = new Date('2025-10-19T00:00:00')
const weddingEnd = new Date('2025-10-20T00:00:00')
const timeParts = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })

const previewImage = (index) => {
  showImagePreview({
    images: photoList,
    startPosition: index,
    closeable: true,
    showIndex: true,
    closeOnPopstate: true,
  })
}

const updateCountdown = () => {
  const now = new Date()
  const diff = weddingDate.getTime() - now.getTime()
  if (diff <= 0) return

  const totalSeconds = Math.floor(diff / 1000)
  timeParts.value = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const timeUntilWedding = computed(() => {
  const diff = weddingDate.getTime() - Date.now()
  return diff > 0 ? diff : 0
})

// 當天判斷
const isWeddingDay = computed(() => {
  const today = new Date()
  return (
    today.getFullYear() === 2025 &&
    today.getMonth() === 9 && // October 是 9（從 0 開始）
    today.getDate() === 19
  )
})

// 結婚後
const isAfterWedding = computed(() => now > weddingEnd)

onMounted(() => {
  updateCountdown()
  setInterval(updateCountdown, 1000)
})
</script>

<style scoped>
.aspect-w-1 {
  aspect-ratio: 1 / 1;
}
</style>
