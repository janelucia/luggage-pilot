<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center justify-start px-4 py-10">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold mb-2">Willkommen 👋</h1>
      <p class="text-base-content text-lg max-w-xl mx-auto">
        Wir erstellen deine Packliste basierend auf deinen Angaben zur Reise. Füll einfach das Formular aus – wir kümmern uns um den Rest ✈️🧳
      </p>
    </div>

    <div class="card w-full max-w-xl shadow-lg bg-base-100">
      <div class="card-body space-y-4">
        <div class="card-body space-y-6"> <!-- vorher: space-y-4 -->
          <div class="form-control">
            <label class="label mb-2">
              <span class="label-text font-semibold">🌍 Wohin geht die Reise?</span>
            </label>
            <input v-model="information.destination" type="text" class="input input-bordered" placeholder="z. B. Norwegen" />
          </div>

          <div class="form-control">
            <label class="label mb-2">
              <span class="label-text font-semibold">📅 Wie viele Tage bleibst du?</span>
            </label>
            <input v-model.number="information.duration" type="number" min="1" class="input input-bordered" placeholder="Tage" />
          </div>

          <div class="form-control">
            <label class="label mb-2">
              <span class="label-text font-semibold">🗓️ Reisedatum</span>
            </label>
            <input v-model="information.travelDate" type="date" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label mb-2">
              <span class="label-text font-semibold">🏞️ Was wirst du dort machen?</span>
            </label>
            <div class="flex flex-wrap gap-2">
              <label
                  v-for="option in activityOptions"
                  :key="option"
                  class="btn btn-sm btn-outline"
              >
                <input type="checkbox" v-model="information.activities" :value="option" class="hidden" />
                <span :class="{ 'font-bold underline': information.activities.includes(option) }">
          {{ option }}
        </span>
              </label>
            </div>
          </div>
        </div>


        <div class="pt-4">
          <button class="btn btn-primary w-full" @click="goToPackList">Packliste generieren</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInformation } from '@/composables/useInformation'
const emit = defineEmits<{
  (e: 'generated'): void
}>()

const { information, resetInformation } = useInformation()

const activityOptions = [
  'Wandern',
  'Stadtbesichtigung',
  'Strand',
  'Sport',
  'Arbeit',
  'Feiern',
  'Relaxen'
]


const goToPackList = () => {
  if (!information.destination || !information.duration || !information.travelDate) {
    alert('Bitte fülle alle Pflichtfelder aus.')
    return
  }

  emit('generated')
}


onMounted(() => {
  resetInformation()
})

</script>
