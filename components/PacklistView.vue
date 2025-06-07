<template>
  <div class="min-h-screen bg-base-100 flex flex-col items-center justify-start px-4 py-10">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold">🎒 {{ duration }} Tage {{ information.destination }}</h1>
      <p class="text-base-content mt-2">Hier ist deine Liste basierend auf deinen Reisedaten.</p>
    </div>

    <div class="w-full max-w-xl space-y-6">
      <div>
        <p><strong>Datum:</strong> {{ formattedDate }}</p>
        <p><strong>Aktivitäten:</strong> {{ information.activities.join(', ') || 'Keine angegeben' }}</p>
      </div>

      <div>
        <h3 class="text-lg font-semibold mt-4">📋 Packliste:</h3>
        <ul class="space-y-2 pl-4">
          <li v-for="item in checklist" :key="item.text" class="flex items-center gap-2">
            <input type="checkbox" v-model="item.checked" class="checkbox checkbox-sm" />
            <span :class="{ 'line-through text-gray-500': item.checked }">{{ item.text }}</span>
          </li>
        </ul>
      </div>

      <div class="pt-4">
        <button class="btn btn-secondary w-full" @click="$emit('reset')">Remove Journey</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useInformation } from '@/composables/useInformation'

const { information, loadFromLocalStorage } = useInformation()

const formattedDate = computed(() => {
  if (!information.travelDate?.start || !information.travelDate?.end) return '—'
  const start = new Date(information.travelDate.start).toLocaleDateString()
  const end = new Date(information.travelDate.end).toLocaleDateString()
  return `${start} – ${end}`
})

const duration = computed(() => {
  if (!information.travelDate?.start || !information.travelDate?.end) return 0
  const start = new Date(information.travelDate.start)
  const end = new Date(information.travelDate.end)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
})

const checklist = ref<{ text: string; checked: boolean }[]>([])

const generatePacklist = () => {
  const items: string[] = [
    'Reisepass / Ausweis',
    'Zahnbürste & Hygieneartikel',
    'Ladekabel & Powerbank',
    'Unterwäsche & Socken'
  ]

  if (duration.value <= 4) {
    items.push('3–4 Shirts', '1 Hose')
  } else {
    items.push('6–7 Shirts', '2 Hosen')
  }

  if (information.activities.includes('Wandern')) {
    items.push('Wanderschuhe', 'Regenjacke')
  }
  if (information.activities.includes('Strand')) {
    items.push('Badeanzug / Bikini', 'Handtuch')
  }
  if (information.activities.includes('Arbeit')) {
    items.push('Laptop', 'Ladegerät', 'Notizbuch')
  }
  if (information.activities.includes('Feiern')) {
    items.push('Ausgeh-Outfit', 'Make-up / Schmuck')
  }

  checklist.value = items.map(item => ({ text: item, checked: false }))
}

onMounted(() => {
  loadFromLocalStorage()
  generatePacklist()
})
</script>
