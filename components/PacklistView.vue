<template>
  <div class="min-h-screen bg-base-100 flex flex-col items-center justify-start px-4 py-10">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold">🎒 Deine Packliste</h1>
      <p class="text-base-content mt-2">Hier ist deine Liste basierend auf deinen Reisedaten.</p>
    </div>

    <div class="card w-full max-w-xl shadow-lg bg-base-200">
      <div class="card-body space-y-4">
        <div>
          <h2 class="text-xl font-semibold">Ziel: {{ information.destination }}</h2>
          <p><strong>Dauer:</strong> {{ information.duration }} Tage</p>
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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useInformation } from '@/composables/useInformation'

const { information, loadFromLocalStorage } = useInformation()

const formattedDate = computed(() => {
  if (!information.travelDate) return '—'
  return new Date(information.travelDate).toLocaleDateString()
})

const checklist = ref<{ text: string; checked: boolean }[]>([])

const generatePacklist = () => {
  const items: string[] = [
    'Reisepass / Ausweis',
    'Zahnbürste & Hygieneartikel',
    'Ladekabel & Powerbank',
    'Unterwäsche & Socken'
  ]

  if (information.duration <= 4) {
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
