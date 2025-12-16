import { onMounted, ref } from "vue";

export function useFetch(url) {

    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const fetchData = async () => {
        loading.value = true
        error.value = null
        const res = await fetch(url.value)
        try {
            if (!res.ok) {
                throw new Error('Error en la peticio: ' + res.status)
            }
            data.value = await res.json()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
    onMounted(fetchData)

    return { data, error, loading, fetchData }
}